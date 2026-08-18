---
weight: 5
title: hyprlock
---

[hyprlock](https://github.com/hyprwm/hyprlock) est un verrou d'écran simple, mais rapide, multi-thread et accéléré par GPU
pour Hyprland.

> [!WARNING]
> Si aucun fichier de configuration n'est trouvé dans l'un des chemins recherchés, hyprlock **se ferme avec une erreur** et votre session ne sera pas verrouillée.
> 
> Vous pouvez utiliser la configuration d'exemple pour un démarrage rapide, qu'on peut trouver [ici](https://github.com/hyprwm/hyprlock/blob/main/assets/example.conf).

## Arguments en ligne de commande

Voir aussi : `hyprlock --help`.

| argument | description |
| -- | -- |
| `-v` \| `--verbose` | Active la journalisation verbeuse |
| `-q` \| `--quiet` | Désactive la journalisation |
| `-c` FILE \| `--config` FILE | Spécifie le fichier de configuration à utiliser |
| `--display` NAME | Spécifie l'affichage wayland auquel se connecter |
| `--grace` SECONDS | Définit la période de grâce en secondes avant de nécessiter l'authentification |
| `--immediate-render` | N'attend pas les ressources avant de dessiner l'arrière-plan (identique à `general:immediate_render`) |
| `--no-fade-in` | Désactive l'animation de fondu d'apparition quand l'écran de verrouillage apparaît |
| `-V` \| `--version` | Affiche les informations de version et quitte |
| `-h` \| `--help` | Affiche l'aide et quitte |

## Configuration

La configuration se fait via un fichier de configuration nommé `hyprlock.conf`. Hyprlock le recherche dans les emplacements suivants, dans l'ordre :

1. `$XDG_CONFIG_HOME/hypr/hyprlock.conf`
2. `$HOME/.config/hypr/hyprlock.conf`
3. Chaque répertoire dans `$XDG_CONFIG_DIRS`, par ex. `<dir>/hypr/hyprlock.conf`
4. `/etc/xdg/hypr/hyprlock.conf`

La première correspondance est utilisée. Vous pouvez aussi spécifier un chemin explicite avec `hyprlock --config <path>`.

### Types de variables

Hyprlock utilise les types suivants en plus des [types de variables de Hyprland](../../Configuring/Basics/Variables#variable-types).

| type | description |
| -- | -- |
| layoutxy | vec2 avec un suffixe optionnel `%`, permettant aux utilisateurs de spécifier des tailles comme pourcentages de la taille de la sortie. <br> Les flottants (par ex. 10.5) sont pris en charge, mais n'ont d'effet que lorsqu'ils sont utilisés avec `%`. <br> Les valeurs de pixels brutes seront simplement arrondies. |

### General (Général)

Variables dans la catégorie `general` :

| Variable | Description | Type | Par défaut |
| -- | -- | -- | -- |
| `hide_cursor` | Masque le curseur au lieu de le rendre visible. | bool | `false` |
| `ignore_empty_input` | Ignore la validation quand aucun mot de passe n'est fourni. | bool | `false` |
| `immediate_render` | Fait que hyprlock commence immédiatement à dessiner les widgets. <br> Les arrière-plans rendront `background:color` jusqu'à ce que leur ressource `background:path` soit disponible. | bool | `false` |
| `text_trim` | Définit si le texte doit être élagué (trim), utile pour éviter les retours à la ligne finaux dans la sortie des commandes. | bool | `true` |
| `fractional_scaling` | Si la mise à l'échelle fractionnaire doit être utilisée. <br> `0` : désactivée <br> `1` : activée <br> `2` : auto | int | `2` |
| `screencopy_mode` | Sélectionne le mode de capture d'écran : <br> `0` : accéléré GPU <br> `1` : basé CPU (lent) | int | `0` |
| `fail_timeout` | Millisecondes avant que l'UI ne se réinitialise après une tentative d'authentification échouée | int | `2000` |

### Authentication (Authentification)

Variables dans la catégorie `auth` :

| Variable | Description | Type | Par défaut |
| -- | -- | -- | -- |
| `pam:enabled` | Si l'authentification pam doit être activée. | bool | `true` |
| `pam:module` | Définit le module pam utilisé pour l'authentification. Si le module n'est pas trouvé dans `/etc/pam.d`, "su" sera utilisé comme repli. | str | `hyprlock` |
| `fingerprint:enabled` | Active l'authentification par empreinte digitale en parallèle avec fprintd. | bool | `false` |
| `fingerprint:ready_message` | Définit le message qui sera affiché quand fprintd est prêt à scanner une empreinte digitale. | str | `(Scan fingerprint to unlock)` |
| `fingerprint:present_message` | Définit le message qui sera affiché quand un doigt est placé sur le scanner. | str | `Scanning fingerprint` |
| `fingerprint:retry_delay` | Définit le délai en ms après le scan d'un doigt non reconnu avant qu'un autre doigt puisse être scanné. | int | `250` |

> [!NOTE]
> Au moins une méthode d'authentification activée est requise.

### Animations

Variables dans la catégorie `animations` :

| variable | description | type | par défaut |
| -- | -- | -- | -- |
| enabled | si les animations doivent être activées | bool | `true` |

#### Mots-clés

Les mots-clés `animation` et `bezier` peuvent être utilisés :

Par exemple :
```ini
bezier = linear, 1, 1, 0, 0
animation = fade, 1, 1.8, linear
```

Les animations disponibles peuvent être trouvées dans l'[arbre d'animation](#animation-tree).
Le paramètre `STYLE` optionnel pour le mot-clé `animation` n'est actuellement pas utilisé par hyprlock.

Consultez la [documentation des animations](../../Configuring/Advanced-and-Cool/Animations) de Hyprland pour plus d'informations.

#### Arbre d'animation

```txt
global
  ↳ fade
    ↳ fadeIn - fade to lockscreen
    ↳ fadeOut - fade back to the wayland session
  ↳ inputField
    ↳ inputFieldColors - fade between colors and gradients
    ↳ inputFieldFade - fade_on_empty animation
    ↳ inputFieldWidth - adaptive width animation
    ↳ inputFieldDots - fade in/out for individual dots in the input field
```

### Configuration système

Sur Arch Linux, par défaut, hyprlock s'intègre avec [pambase](https://archlinux.org/packages/?name=pambase) via `pam_faillock.so`, ce qui force un délai de 10 minutes après 3 déverrouillages échoués.  
Si vous voulez changer cela, référez-vous au [wiki arch linux](https://wiki.archlinux.org/title/Security#Lock_out_user_after_three_failed_login_attempts) et mettez à jour le fichier `/etc/security/faillock.conf` avec les paramètres `unlock_time`, `fail_interval`, et `deny` selon vos besoins.

## Raccourcis clavier et actions

Les touches et combinaisons de touches suivantes décrivent le comportement par défaut de hyprlock :

| entrée | description |
| -- | -- |
| `ESC` | Efface le tampon de mot de passe |
| `Ctrl + u` | Efface le tampon de mot de passe |
| `Ctrl + Backspace` | Efface le tampon de mot de passe |

Le [flag de raccourci](../../Configuring/Basics/Binds/#bind-flags) `l` peut être utilisé pour permettre à des raccourcis clavier hyprland spécifiques de continuer à fonctionner pendant que hyprlock est actif (par ex. contrôle de la luminosité/du volume/des médias).

## Widgets

L'intégralité de la configuration de l'apparence de hyprlock se fait via des widgets.

```ini
widget_name {
    monitor =
    # further options
}
```

### Sélection du moniteur
`monitor` est disponible pour tous les widgets et peut être laissé vide pour « tous les moniteurs ».

Il prend la même chaîne que celle utilisée pour référencer les moniteurs dans la configuration hyprland.
Utilisez donc soit le nom de port (par ex. `eDP-1`) soit la description du moniteur (par ex. `desc:Chimei Innolux Corporation 0x150C`).

Voir [Moniteurs](../../Configuring/Basics/Monitors).

### Substitution de variables
Les variables suivantes dans les options de texte des widgets seront substituées.

- `$USER` - nom d'utilisateur (par ex. linux-user)
- `$DESC` - description de l'utilisateur (par ex. Linux User)
- `$TIME` - heure actuelle au format 24 heures (par ex. `13:37`)
- `$TIME12` - heure actuelle au format 12 heures (par ex. `1:37 PM`)
- `$LAYOUT` - disposition de clavier actuelle
- `$ATTEMPTS` - tentatives d'authentification échouées
- `$FAIL` - dernière raison d'échec d'authentification
- `$PAMPROMPT` - dernière invite d'authentification pam
- `$PAMFAIL` - dernière raison d'échec d'authentification pam
- `$FPRINTPROMPT` - dernière invite d'authentification par empreinte digitale
- `$FPRINTFAIL` - dernière raison d'échec d'authentification par empreinte digitale

## Liste des widgets

### Remarques générales

- Tout le texte rendu prend en charge le
  [balisage pango](https://docs.gtk.org/Pango/pango_markup.html).
  - De plus, hyprlock analysera `<br/>` pour votre confort. (C'est un
    saut de ligne) N'oubliez pas d'activer les sauts de ligne dans vos spans avec
    `allow_breaks="true"`.
- Le positionnement se fait via halign, valign, position, et zindex. Position est un
  décalage ajouté au résultat de l'alignement.
  - halign : `left`, `center`, `right`, `none`. valign : `top`, `center`,
    `bottom`, `none`
  - zindex : Les widgets avec des nombres plus grands seront placés au-dessus des widgets avec des nombres plus petits. Tous les widgets valent par défaut 0, sauf background qui vaut par défaut -1.
- Toutes les options `position` et `size` peuvent être spécifiées en pixels ou en pourcentages de la taille de la sortie.
  - pixels : `10, 10` ou `10px, 10px`
  - pourcentages : `10%, 10.5%`
  - mixte : `10%, 5px`
- Les formats d'image pris en charge sont png, jpg et webp (mais pas d'animations)

### Shadowable (Peut avoir une ombre)

Certains widgets peuvent avoir une ombre (shadowable). Pour ces widgets, vous obtenez :

| Variable | Description | Type | Par défaut |
| -- | -- | -- | -- |
| `shadow_passes` | Passes pour l'ombre, 0 pour désactiver. | int | `0` |
| `shadow_size` | Taille de l'ombre. | int | `3` |
| `shadow_color` | Couleur de l'ombre. | color | `rgb(0,0,0)` |
| `shadow_boost` | Augmente l'opacité de l'ombre. | float | `1.2` |

### Clickable (Cliquable)

Certains widgets sont cliquables. À savoir `label`, `image` et `shape`.  
Vous pouvez lancer des commandes arbitraires en cliquant dessus en configurant l'option suivante à l'intérieur du widget :

| variable | description | type | par défaut |
| -- | -- | -- | -- |
| `onclick` | Commande à exécuter lors du clic. | str | vide |

### Background (Arrière-plan)

Dessine une image d'arrière-plan ou remplit avec une couleur.  
Si `path` est vide ou absent, `color` sera utilisé, sinon, l'image sera utilisée.

Si `path` vaut `screenshot`, une capture d'écran de votre bureau au lancement sera utilisée.

| Variable | Description | Type | Par défaut |
|--|--|--|--|
| `monitor` | Moniteur sur lequel dessiner. | str | vide |
| `path` | Chemin de l'image, `screenshot` ou vide pour remplir avec `color`. | str | vide |
| `color` | Couleur d'arrière-plan de repli | color | `rgba(17, 17, 17, 1.0)` |
| `blur_passes` | Le nombre de passes à effectuer. <br> `0` désactive le flou. | int | `0` |
| `blur_size` | Taille du flou (distance). | int | `7` |
| `noise` | Quantité de bruit à appliquer. | float | `0.0117` |
| `contrast` | Modulation du contraste pour le flou. | float | `0.8916` |
| `brightness` | Modulation de la luminosité pour le flou. | float | `0.8172` |
| `vibrancy` | Augmente la saturation des couleurs floutées. | float | `0.1696` |
| `vibrancy_darkness` | À quel point l'effet de vibrancy est fort sur les zones sombres. | float | `0.05` |
| `reload_time` | Secondes entre les rechargements, `0` pour recharger avec `SIGUSR2`. <br> Ignoré si `path` vaut `screenshot`. | int | `-1` |
| `reload_cmd` | Commande pour obtenir un nouveau chemin. Si vide, l'ancien chemin sera utilisé. | str | vide |
| `crossfade_time` | Temps de fondu enchaîné en secondes entre l'ancien et le nouvel arrière-plan lors du rechargement. <br> Une valeur négative signifie pas de fondu enchaîné. | float | `-1.0` |
| `zindex` | z-index du widget. | int | `-1` |

> [!NOTE]
> Les options de flou proviennent de hyprland.
> Voir [Variables/#blur](../../Configuring/Basics/Variables/#blur).

{{% details title="Example background" closed="true" %}}

```ini
background {
    monitor =
    path = screenshot
    color = rgba(25, 20, 20, 1.0)
    blur_passes = 2
}
```

{{% /details %}}

### Image

&check; Shadowable  
&check; Clickable

Dessine une image.

Si `path` est vide ou absent, rien ne sera affiché.

| Variable | Description | Type | Par défaut |
|--|--|--|--|
| `monitor` | Moniteur sur lequel dessiner | str | _vide_ |
| `path` | Chemin de l'image | str | _vide_ |
| `size` | Échelle de taille basée sur le plus petit côté de l'image. | int | `150` |
| `rounding` | Des valeurs négatives résultent en un cercle. | int | `-1` |
| `border_size` | Taille de la bordure. | int | `4` |
| `border_color` | Couleur de la bordure. | gradient | `rgba(221, 221, 221, 1.0)` |
| `rotate` | Rotation en degrés, sens antihoraire. | int | `0` |
| `reload_time` | Secondes entre les rechargements, `0` pour recharger avec `SIGUSR2`. | int | `-1` |
| `reload_cmd` | Commande pour obtenir un nouveau chemin. si vide, l'ancien chemin sera utilisé. n'exécutez pas de commandes de type "follow" comme `tail -F`. | str | _vide_ |
| `position` | Position de l'image. | layoutxy | `0, 0` |
| `halign` | Alignement horizontal. | str | `center` |
| `valign` | Alignement vertical. | str | `center` |
| `zindex` | z-index du widget. | int | `0` |

{{% details title="Example image" closed="true" %}}

```ini
image {
    monitor =
    path = /home/me/cutie.png
    size = 150
    rounding = 0 # no rounding

    position = 0, 200
    halign = center
    valign = center
}
```

{{% /details %}}

### Shape (Forme)

&check; Shadowable  
&check; Clickable

Dessine une forme.

| Variable | Description | Type | Par défaut |
|--|--|--|--|
| `monitor` | Moniteur sur lequel dessiner. | str | _vide_ |
| `size` | Taille de la forme. | layoutxy | 100, 100 |
| `color` | Couleur de la forme. | color | `rgba(17, 17, 17, 1.0)` |
| `rounding` | Des valeurs négatives résultent en un cercle. | int | `-1` |
| `rotate` | Rotation en degrés, sens antihoraire. | int | `0` |
| `border_size` | Taille de la bordure. | int | `0` |
| `border_color` | Couleur de la bordure. | gradient | `rgba(0, 207, 230, 1.0)` |
| `xray` | Si `true`, crée un « trou » dans l'arrière-plan (rectangle de la taille spécifiée, sans rotation). | bool | `false` |
| `position` | Position de la forme. | layoutxy | `0, 0` |
| `halign` | Alignement horizontal. | str | `center` |
| `valign` | Alignement vertical. | str | `center` |
| `zindex` | z-index du widget. | int | `0` |


{{% details title="Example shape" closed="true" %}}

```ini
shape {
    monitor =
    size = 360, 60
    color = rgba(0, 0, 0, 0.0) # no fill
    rounding = -1 # circle
    border_size = 4
    border_color = rgba(0, 207, 230, 1.0)

    position = 0, 80
    halign = center
    valign = center
}
```

{{% /details %}}

### Input Field (Champ de saisie)

&check; Shadowable

Dessine un champ de saisie de mot de passe.

| Variable | Description | Type | Par défaut |
|--|--|--|--|
| `monitor` | Moniteur sur lequel dessiner. | str | _vide_ |
| `size` | Taille du champ de saisie. | layoutxy | `400, 90` |
| `outline_thickness` | Épaisseur du contour. | int | `4` |
| `dots_size` | Taille des points. [0.001 - 0.8] | float | `0.25` |
| `dots_spacing` | Espacement entre les points. [-1.0 - 1.0] | float | `0.15` |
| `dots_center` | Si les points doivent être centrés. Alignés à gauche sinon.  | bool | `true` |
| `dots_rounding` | Arrondi des points. | int | `-1` |
| `dots_text_format` | Caractère(s) de texte utilisé(s) pour l'indicateur de saisie, des rectangles arrondis par défaut. | str | _vide_ |
| `outer_color` | Couleur de bordure. | gradient | `rgba(17, 17, 17, 1.0)` |
| `inner_color` | Couleur de la boîte intérieure. | color | `rgba(200, 200, 200, 1.0)` |
| `font_color` | Couleur de la police. | color | `rgba(10, 10, 10, 1.0)` |
| `font_family` | Famille de police. | str | `Noto Sans` |
| `fade_on_empty` | Fait un fondu du champ de saisie quand il est vide. | bool | `true` |
| `fade_timeout` | Millisecondes avant que `fade_on_empty` ne soit déclenché. | int | `2000` |
| `placeholder_text` | Texte rendu dans le champ de saisie quand il est vide. | str | `<i>Input Password...</i>` |
| `hide_input` | Rend un indicateur de saisie similaire à swaylock au lieu de points quand défini à `true`. | bool | `false` |
| `hide_input_base_color` | La teinte de cette couleur est tournée aléatoirement (espace de couleur oklab) pour obtenir des couleurs pour `hide_input`. | color | `rgba(153, 170, 187)` |
| `rounding` | `-1` signifie un arrondi complet (cercle/ovale). | int | `-1` |
| `check_color` | Accent de couleur en attendant le résultat de l'authentification. | gradient | `rgba(204, 136, 34, 1.0)` |
| `check_text` | Texte rendu en attendant le résultat de l'authentification. | str | _vide_ |
| `fail_color` | Accent de couleur quand l'authentification échoue. | gradient | `rgba(204, 34, 34, 1.0)` |
| `fail_text` | Texte rendu quand l'authentification échoue. | str | `<i>$FAIL <b>($ATTEMPTS)</b></i>` |
| `capslock_color` | Accent de couleur quand verr. maj. est actif. | gradient | _vide_ |
| `numlock_color` | Accent de couleur quand verr. num. est actif. | gradient | _vide_ |
| `bothlock_color` | Accent de couleur quand les deux verrous sont actifs. | gradient | _vide_ |
| `invert_numlock` | Change la couleur si verr. num. est désactivé. | bool | `false` |
| `swap_font_color` | Échange les couleurs de police et intérieure lors des événements de changement de couleur. | bool | `false` |
| `position` | Position du champ de saisie. | layoutxy | `0, 0` |
| `halign` | Alignement horizontal. | str | `center` |
| `valign` | Alignement vertical. | str | `center` |
| `zindex` | z-index du widget. | int | `0` |

> [!NOTE] **Informations sur les couleurs**
>
> Quand `outline_thickness` est défini à `0`, la couleur de la boîte intérieure sera changée à la place de celle extérieure.   
> Le comportement de `swap_font_color` est le suivant :  
> - `outline_thickness` vaut `0` : si défini, la couleur de police sera échangée avec celle intérieure lors des événements de changement de couleur (par ex. verr. maj. activé ou vérification du mot de passe).
> - `outline_thickness` ne vaut pas `0` : si défini, les couleurs de police et intérieure seront échangées lors de la vérification du mot de passe et d'un échec d'authentification.
> - `swap_font_color` réduira les couleurs d'accent d'un gradient à une seule couleur en utilisant la première couleur spécifiée.

`placeholder_text` et `fail_text` prennent tous deux en charge la [substitution de variables](#variable-substitution).

{{% details title="Example input-field" closed="true" %}}

```ini
input-field {
    monitor =
    size = 20%, 5%
    outline_thickness = 3
    inner_color = rgba(0, 0, 0, 0.0) # no fill

    outer_color = rgba(33ccffee) rgba(00ff99ee) 45deg
    check_color=rgba(00ff99ee) rgba(ff6633ee) 120deg
    fail_color=rgba(ff6633ee) rgba(ff0066ee) 40deg

    font_color = rgb(143, 143, 143)
    fade_on_empty = false
    rounding = 15

    position = 0, -20
    halign = center
    valign = center
}
```
{{% /details %}}

### Label (Étiquette)

&check; Shadowable  
&check; Clickable

Dessine une étiquette.

| Variable | Description | Type | Par défaut |
|--|--|--|--|
| `monitor` | Moniteur sur lequel dessiner. | str | _vide_ |
| `text` | Texte à rendre. | str | `Sample Text` |
| `text_align` | Alignement du texte multi-ligne à l'intérieur du conteneur d'étiquette. center/right ou toute valeur pour le défaut à gauche. | str | `center` |
| `color` | Couleur du texte. | color | `rgba(254, 254, 254, 1.0)` |
| `font_size` | Taille de la police. | int |`16` |
| `font_family` | Famille de police. | str | `Sans` |
| `rotate` | Rotation en degrés, sens antihoraire. | int | `0` |
| `position` | Position de l'étiquette. | layoutxy | `0, 0` |
| `halign` | Alignement horizontal. | str | `center` |
| `valign` | Alignement vertical. | str | `center` |


#### Étiquettes dynamiques

L'option `text` prend en charge la [substitution de variables](#variable-substitution) et le lancement de commandes shell.  
Par exemple :

```ini
text = cmd[update:1000] echo "<span foreground='##ff2222'>$(date)</span>"
```

> [!NOTE]
> - le temps `update:` est en ms.
> - une étiquette peut être forcée à se mettre à jour en spécifiant `update:<time>:1` ou `update:<time>:true` et en envoyant `SIGUSR2` à hyprlock, `<time>` peut être `0` dans ce cas.
> - le format `$ATTEMPTS[<string>]` peut être utilisé pour afficher `<string>` quand il n'y a aucune tentative échouée.  
Vous pouvez utiliser le balisage pango ici. `<string>` peut être vide pour masquer.
> - le format `$LAYOUT[<str0>,<str1>,...]` est disponible pour remplacer les dispositions indexées.  
Vous pouvez utiliser les paramètres de `hyprland.lua`, par ex. `$LAYOUT[en,ru,de]`.  
De plus, un simple caractère `!` masquera la disposition. Par ex. `$LAYOUT[!]` masquera celle par défaut (indexée 0) et affichera les autres.
> - `$TIME` et `$TIME12` utiliseront le fuseau horaire de la variable d'environnement TZ.  
S'il n'est pas défini, le fuseau horaire du système sera utilisé, se repliant sur UTC en cas d'erreurs.
> - Les variables vues ci-dessus sont analysées _avant_ que la commande ne soit exécutée.
> - **N'exécutez pas** de commandes qui ne se terminent jamais. Cela bloquera l'`AsyncResourceGatherer` et vous n'aurez pas une bonne expérience.

{{% details title="Example label" closed="true" %}}

```ini
label {
    monitor =
    text = Hi there, $USER
    color = rgba(200, 200, 200, 1.0)
    font_size = 25
    font_family = Noto Sans

    position = 0, 80
    halign = center
    valign = center
}
```

{{% /details %}}


## Signaux utilisateur

- `SIGUSR1` : Déverrouille hyprlock. Par exemple, vous pouvez basculer vers un autre tty et exécuter `pkill -USR1 hyprlock`.
- `SIGUSR2` : Met à jour les étiquettes et les images. Voir ci-dessus.
