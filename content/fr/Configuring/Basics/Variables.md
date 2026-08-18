---
weight: 2
title: Variables
---

> [!NOTE]
> Vous cherchez l'ancienne syntaxe hyprlang ? Consultez les [pages du wiki 0.54](https://wiki.hypr.land/0.54.0/).
> Depuis Hyprland 0.55, hyprlang est devenu obsolète au profit de lua.

Cette page documente toutes les « options » d'Hyprland. Pour les raccourcis, moniteurs,
animations, etc. voir la barre latérale.

Gardez à l'esprit que certaines options spécifiques à une disposition seront documentées dans
les pages de disposition et non ici. (Voir la barre latérale pour les dispositions Dwindle et Master)

## Syntaxe

```lua
hl.config({
   category = {
       value = ...
   },
   category2 = {
       value2 = ...
   }
})
```

Vous pouvez faire plusieurs appels à `hl.config()`, chacun mettra à jour uniquement ce que vous lui passez.

Ceci est totalement valide :

```lua
function updateSomeVar()
    hl.config({ cat = { val = 12 } })
end
```

## Types de variables

| type | description |
| --- | --- |
| int | entier |
| bool | booléen (`true` ou `false`) |
| float | nombre à virgule flottante |
| color | couleur (voir la note ci-dessous pour les infos sur les couleurs) |
| vec2 | vecteur avec 2 valeurs flottantes (par ex. `{ 20, 20 }`) |
| str | une chaîne de caractères (entourée de "", par ex. : `"dwindle"`) |
| gradient | un gradient, accepte une couleur, ou `{ colors = { "rgba(...)", "rgba(...)" }, angle? = 45 }` |
| font_weight | un entier entre 100 et 1000, ou l'un des préréglages suivants : `"thin"` `"ultralight"` `"light"` `"semilight"` `"book"` `"normal"` `"medium"` `"semibold"` `"bold"` `"ultrabold"` `"heavy"` `"ultraheavy"` |
| css_gaps | un entier, ou `{ top?, left?, right?, bottom? }` |

> [!NOTE] **Couleurs**
> 
> Vous avez 4 options :
> - hash de style web, par ex. `"#fafc21"` ou `"#ddd"` ou `"#fa3d7bff"` (ordre rgba)
> - rgba(), par ex. `"rgba(b3ff1aee)"`, ou l'équivalent décimal `"rgba(179,255,26,0.933)"`
> (les valeurs rgba/rgb décimales ne doivent pas comporter d'espaces entre les nombres)
> - rgb(), par ex. `"rgb(b3ff1a)"`, ou l'équivalent décimal `"rgb(179,255,26)"`
> - ancien format, par ex. `0xeeb3ff1a` -> ordre ARGB

## Sections

### General (Général)

| nom | description | type | par défaut |
|---|---|---|---|
| border_size | taille de la bordure autour des fenêtres | int | `1` |
| gaps_in | espacements entre les fenêtres | css_gaps | `5` |
| gaps_out | espacements entre les fenêtres et les bords du moniteur | css_gaps | `20` |
| float_gaps | espacements entre les fenêtres et les bords du moniteur pour les fenêtres flottantes, `-1` signifie par défaut | css_gaps | `0` |
| gaps_workspaces | espacements entre les espaces de travail. S'ajoute à gaps_out. | int | `0` |
| col.inactive_border | couleur de bordure pour les fenêtres inactives | gradient | `0xff444444` |
| col.active_border | couleur de bordure pour la fenêtre active | gradient | `0xffffffff` |
| col.nogroup_border | couleur de bordure inactive pour une fenêtre qui ne peut pas être ajoutée à un groupe (voir le dispatcher `hl.dsp.window.deny_from_group`) | gradient | `0xffffaaff` |
| col.nogroup_border_active | couleur de bordure active pour une fenêtre qui ne peut pas être ajoutée à un groupe | gradient | `0xffff00ff` |
| layout | quelle disposition utiliser. \[`"dwindle"`/`"master"`/`"scrolling"`/`"monocle"`\] | str | `"dwindle"` |
| no_focus_fallback | si vrai, ne reviendra pas à la prochaine fenêtre disponible lors du déplacement du focus dans une direction où aucune fenêtre n'a été trouvée | bool | `false` |
| resize_on_border | active le redimensionnement des fenêtres en cliquant et glissant sur les bordures et les espacements | bool | `false` |
| extend_border_grab_area | étend la zone autour de la bordure sur laquelle vous pouvez cliquer et glisser, utilisé uniquement quand `general.resize_on_border` est activé. | int | `15` |
| hover_icon_on_border | affiche une icône de curseur au survol des bordures, utilisé uniquement quand `general.resize_on_border` est activé. | bool | `true` |
| allow_tearing | interrupteur maître pour autoriser le tearing. Voir [la page Tearing](../../Advanced-and-Cool/Tearing). | bool | `false` |
| resize_corner | force les fenêtres flottantes à utiliser un coin spécifique lors du redimensionnement (1-4 dans le sens horaire depuis le coin supérieur gauche, 0 pour désactiver) | int | `0` |
| modal_parent_blocking | si les fenêtres parentes des modales seront interactives | bool | `true` |
| locale | remplace la locale système (par ex. `"en_US"`, `"es"`) | str | \[\[Vide\]\] |

#### Snap (Accrochage)

*Sous-catégorie `general.snap.`*

| nom | description | type | par défaut |
| --- | --- | --- | --- |
| enabled | active l'accrochage pour les fenêtres flottantes | bool | `false` |
| window_gap | espace minimum en pixels entre les fenêtres avant l'accrochage | int | `10` |
| monitor_gap | espace minimum en pixels entre la fenêtre et les bords du moniteur avant l'accrochage | int | `10` |
| border_overlap | si vrai, les fenêtres s'accrochent de sorte qu'il n'y ait qu'une seule épaisseur de bordure entre elles | bool | `false` |
| respect_gaps | si vrai, l'accrochage respectera les espacements entre les fenêtres (défini dans general:gaps_in) | bool | `false` |

### Decoration (Décoration)

| nom | description | type | par défaut |
| --- | --- | --- | --- |
| rounding | rayon d'arrondi des coins (en px de disposition) | int | `0` |
| rounding_power | ajuste la courbe utilisée pour l'arrondi des coins, plus grand est plus lisse, 2.0 est un cercle, 4.0 est un « squircle ». [2.0 - 10.0] | float | `2.0` |
| active_opacity | opacité des fenêtres actives. [0.0 - 1.0] | float | `1.0`|
| inactive_opacity | opacité des fenêtres inactives. [0.0 - 1.0] | float | `1.0` |
| fullscreen_opacity | opacité des fenêtres en plein écran. [0.0 - 1.0] | float | `1.0` |
| dim_modal | active l'assombrissement des parents des fenêtres modales | bool | `true` |
| dim_inactive | active l'assombrissement des fenêtres inactives | bool | `false` |
| dim_strength | à quel point les fenêtres inactives doivent être assombries [0.0 - 1.0] | float | `0.5` |
| dim_special | à quel point le reste de l'écran doit être assombri lorsqu'un espace de travail spécial est ouvert. [0.0 - 1.0] | float | `0.2 `|
| dim_around | à quel point la règle de fenêtre `dim_around` doit assombrir. [0.0 - 1.0] | float | `0.4` |
| screen_shader | chemin vers un shader personnalisé à appliquer à la fin du rendu. Voir `examples/screenShader.frag` pour un exemple. | str | \[\[Vide\]\] |
| border_part_of_window | si la bordure de fenêtre doit faire partie de la fenêtre | bool | `true` |

#### Blur (Flou)

*Sous-catégorie `decoration.blur.`*

| nom | description | type | par défaut |
| --- | --- | --- | --- |
| enabled | active le flou d'arrière-plan kawase des fenêtres | bool | `true` |
| size | taille du flou (distance) | int | `8` |
| passes | le nombre de passes à effectuer | int | `1` |
| ignore_opacity | fait ignorer par la couche de flou l'opacité de la fenêtre | bool | `true` |
| new_optimizations | s'il faut activer des optimisations supplémentaires du flou. Il est recommandé de laisser activé, car cela améliorera considérablement les performances. | bool | `true` |
| xray | si activé, les fenêtres flottantes ignoreront les fenêtres en mosaïque dans leur flou. Disponible uniquement si new_optimizations est vrai. Réduira considérablement la charge du flou flottant. | bool | `false` |
| noise | quantité de bruit à appliquer. [0.0 - 1.0] | float | `0.0117` |
| contrast | modulation du contraste pour le flou. [0.0 - 2.0] | float | `0.8916` |
| brightness | modulation de la luminosité pour le flou. [0.0 - 2.0] | float | `1.0` |
| vibrancy | augmente la saturation des couleurs floutées. [0.0 - 1.0] | float | `0.1696` |
| vibrancy_darkness | à quel point l'effet de `vibrancy` est fort sur les zones sombres. [0.0 - 1.0] | float | `0.0` |
| special | s'il faut flouter derrière l'espace de travail spécial (note : coûteux) | bool | `false` |
| popups | s'il faut flouter les popups (par ex. les menus clic droit) | bool | `false` |
| popups_ignorealpha | fonctionne comme ignore_alpha dans les règles de calque. Si l'opacité du pixel est en dessous de la valeur définie, il ne sera pas flouté. [0.0 - 1.0] | float | `0.2` |
| input_methods | s'il faut flouter les méthodes de saisie (par ex. fcitx5) | bool | `false` |
| input_methods_ignorealpha | fonctionne comme ignore_alpha dans les règles de calque. Si l'opacité du pixel est en dessous de la valeur définie, il ne sera pas flouté. [0.0 - 1.0] | float | `0.2` |

> [!NOTE]
> `blur.size` et `blur.passes` doivent être d'au moins 1.
> 
> Augmenter `blur.passes` est nécessaire pour éviter que le flou paraisse mal rendu à des valeurs
> `blur.size` élevées, mais souvenez-vous qu'un `blur.passes` plus élevé nécessitera plus
> d'efforts pour le GPU.

#### Shadow (Ombre)

*Sous-catégorie `decoration.shadow.`*

| nom | description | type | par défaut |
| --- | --- | --- | --- |
| enabled | active les ombres portées sur les fenêtres | bool | `true` |
| range | portée de l'ombre (« taille ») en px de disposition | int | `4` |
| render_power | avec quelle puissance rendre l'atténuation (plus de puissance, plus l'atténuation est rapide) [1 - 4] | int | `3` |
| sharp | si activé, rendra les ombres nettes, comme une puissance de rendu infinie | bool | `false` |
| color | couleur de l'ombre. L'alpha détermine l'opacité de l'ombre. | gradient | `0xee1a1a1a` |
| color_inactive | couleur d'ombre inactive. (si non défini, reviendra à color) | gradient | non défini |
| offset | décalage de rendu de l'ombre. | vec2 | `{0, 0}` |
| scale | échelle de l'ombre. [0.0 - 1.0] | float | `1.0` |

#### Glow (Lueur)

*Sous-catégorie `decoration.glow.`*

| nom | description | type | par défaut |
| --- | --- | --- | --- |
| enabled | active la lueur intérieure sur les fenêtres | bool | `false` |
| range | portée de la lueur (« taille ») en px de disposition | int | `10` |
| render_power | avec quelle puissance rendre l'atténuation (plus de puissance, plus l'atténuation est rapide) [1 - 4] | int | `3` |
| color | couleur de la lueur. L'alpha détermine l'opacité de la lueur. | gradient | `0xee33ccff` |
| color_inactive | couleur de lueur inactive. (si non défini, reviendra à color) | gradient | non défini |


#### Motion blur (Flou de mouvement)

*Sous-catégorie `decoration.motion_blur.`*

| nom | description | type | par défaut |
| --- | --- | --- | --- |
| enabled | active le flou de mouvement sur les fenêtres en déplacement / redimensionnement | bool | `false` |
| samples | le nombre d'échantillons à rendre. Plus il y en a, plus le flou est net, au prix de plus de calcul. | int | `7` |

#### Wobble (Effet de rebond)

*Sous-catégorie `decoration.wobble.`*

| nom | description | type | par défaut |
| --- | --- | --- | --- |
| enabled | active l'effet wobble sur les fenêtres en déplacement / redimensionnement | bool | `false` |
| mesh | nombre de sommets du maillage wobble par bord | int | `12` |
| stiffness | rigidité du ressort pour la déformation wobble | float | `200` |
| damping | amortissement du ressort pour la déformation wobble | float | `12` |
| mass | masse du ressort pour la déformation wobble | float | `1` |
| intensity | multiplicateur d'impulsion de déformation wobble | float | `0.2` |
| value_epsilon | epsilon de position en dessous duquel le wobble est considéré stable | float | `0.25` |
| velocity_epsilon | epsilon de vitesse en dessous duquel le wobble est considéré stable | float | `2` |

### Animations

| nom | description | type | par défaut |
| --- | --- | --- | --- |
| enabled | active les animations | bool | `true` |
| workspace_wraparound | active le rebouclage des espaces de travail, ce qui fait que les animations directionnelles d'espace de travail s'animent comme si le premier et le dernier espace de travail étaient adjacents | bool | `false` |

> [!NOTE]
> *[En savoir plus sur les Animations](../../Advanced-and-Cool/Animations).*

### Input (Entrée)

| nom | description | type | par défaut |
|---|---|---|---|
| kb_model | Paramètre XKB de keymap approprié. Voir la note ci-dessous. | str | \[\[Vide\]\] |
| kb_layout | Paramètre XKB de keymap approprié | str | `"us"` |
| kb_variant | Paramètre XKB de keymap approprié | str | \[\[Vide\]\] |
| kb_options | Paramètre XKB de keymap approprié | str | \[\[Vide\]\] |
| kb_rules | Paramètre XKB de keymap approprié | str | \[\[Vide\]\] |
| kb_file | Si vous préférez, vous pouvez utiliser un chemin vers votre fichier .xkb personnalisé. | str | \[\[Vide\]\] |
| numlock_by_default | Active le verrouillage numérique par défaut. | bool | `false` |
| resolve_binds_by_sym | Détermine comment les raccourcis clavier se comportent quand plusieurs dispositions sont utilisées. Si faux, les raccourcis clavier se comporteront toujours comme si la première disposition spécifiée était active. Si vrai, les raccourcis clavier spécifiés par des symboles s'activent quand vous tapez le symbole correspondant avec la disposition actuelle. | bool | `false` |
| repeat_rate | Le taux de répétition pour les touches maintenues, en répétitions par seconde. | int | `25` |
| repeat_delay | Délai avant qu'une touche maintenue soit répétée, en millisecondes. | int | `600` |
| sensitivity | Définit la sensibilité de l'entrée souris. La valeur est limitée à la plage -1.0 à 1.0. [libinput#pointer-acceleration](https://wayland.freedesktop.org/libinput/doc/latest/pointer-acceleration.html#pointer-acceleration) | float | `0.0` |
| accel_profile | Définit le profil d'accélération du curseur. Peut être `"adaptive"` ou `"flat"`. Peut aussi être `"custom"`, voir [ci-dessous](#accel_profile). Laissez vide pour utiliser le mode par défaut de `libinput` pour votre périphérique d'entrée. [libinput#pointer-acceleration](https://wayland.freedesktop.org/libinput/doc/latest/pointer-acceleration.html#pointer-acceleration) \[`"adaptive"`/`"flat"`/`"custom"`\]| str | \[\[Vide\]\] |
| force_no_accel | Force l'absence d'accélération du curseur. Cela contourne la plupart de vos paramètres de pointeur pour obtenir un signal aussi brut que possible. **Il n'est pas recommandé d'activer ceci en raison d'une possible désynchronisation du curseur.** | bool | `false` |
| rotation | Définit la rotation d'un périphérique en degrés dans le sens horaire par rapport à la position neutre logique. La valeur est limitée à la plage 0 à 359. | int | `0` |
| left_handed | Échange RMB et LMB | bool | `false` |
| scroll_points | Définit le profil d'accélération du défilement, quand `accel_profile` est défini à `"custom"`. Doit être sous la forme `"<step> <points>"`. Laissez vide pour avoir une courbe de défilement plate. | str | \[\[Vide\]\] |
| scroll_method | Définit la méthode de défilement. Peut être `"2fg"` (2 doigts), `"edge"`, `"on_button_down"`, `"no_scroll"`. [libinput#scrolling](https://wayland.freedesktop.org/libinput/doc/latest/scrolling.html) [`"2fg"`/`"edge"`/`"on_button_down"`/`"no_scroll"`] | str | \[\[Vide\]\] |
| scroll_button | Définit le bouton de défilement. Doit être un int, ne peut pas être une chaîne. Vérifiez `wev` en cas de doute concernant l'ID. 0 signifie par défaut. | int | `0` |
| scroll_button_lock | Si le verrouillage du bouton de défilement est activé, le bouton n'a pas besoin d'être maintenu. Appuyer puis relâcher le bouton bascule le verrouillage du bouton, qui logiquement maintient le bouton enfoncé ou le relâche. Tant que le bouton est logiquement maintenu, les événements de mouvement sont convertis en événements de défilement. | bool | `false` |
| scroll_factor | Multiplicateur ajouté au mouvement de défilement pour les souris externes. Notez qu'il existe un paramètre séparé pour le [scroll_factor du touchpad](#touchpad). | float | `1.0` |
| natural_scroll | Inverse le sens du défilement. Quand activé, le défilement déplace le contenu directement, plutôt que de manipuler une barre de défilement. | bool | `false` |
| follow_mouse | Spécifie si et comment le mouvement du curseur doit affecter le focus de fenêtre. Voir la note ci-dessous. [`0`/`1`/`2`/`3`] | int | `1` |
| follow_mouse_shrink | Réduit les hitboxes des fenêtres inactives utilisées pour la détection de focus du nombre de pixels spécifié. Cela crée une zone morte dans les espacements entre les fenêtres où déplacer le curseur ne changera pas le focus. Fonctionne uniquement avec follow_mouse = 1. | int | `0` |
| follow_mouse_threshold | La plus petite distance en pixels logiques que la souris doit parcourir pour que la fenêtre en dessous reçoive le focus. Fonctionne uniquement avec follow_mouse = 1. | float | `0.0` |
| focus_on_close | Contrôle le comportement du focus de fenêtre quand une fenêtre est fermée. Défini à 0, le focus se déplacera vers la prochaine fenêtre candidate. Défini à 1, le focus se déplacera vers la fenêtre sous le curseur. Défini à 2, le focus se déplacera vers la fenêtre la plus récemment utilisée/active. [`0`/`1`/`2`] | int | `0` |
| mouse_refocus | Si désactivé, le focus de la souris ne changera pas vers la fenêtre survolée à moins que la souris ne traverse une limite de fenêtre quand `follow_mouse=1`. | bool | `true` |
| float_switch_override_focus | Si activé (1 ou 2), le focus changera vers la fenêtre sous le curseur lors du passage de mosaïque à flottant et vice versa. Si 2, le focus suivra aussi la souris lors des transitions flottant-à-flottant. | int | `1` |
| special_fallthrough | si activé, avoir uniquement des fenêtres flottantes dans l'espace de travail spécial ne bloquera pas le focus des fenêtres dans l'espace de travail normal. | bool | `false` |
| off_window_axis_events | Gère les événements d'axe autour (espacements/bordure pour mosaïque, zone de glissement/bordure pour flottant) d'une fenêtre focalisée. `0` ignore les événements d'axe, `1` envoie des coordonnées hors limites, `2` simule des coordonnées de pointeur au point le plus proche à l'intérieur de la fenêtre, `3` déplace le curseur au point le plus proche à l'intérieur de la fenêtre | int | `1` |
| emulate_discrete_scroll | Émule le défilement discret à partir d'événements de défilement haute résolution. `0` le désactive, `1` active la gestion des événements non standards uniquement, et `2` force l'activation de la gestion de tous les événements de molette de défilement | int | `1` |

> [!NOTE] **Paramètres XKB**
>
> Vous pouvez trouver une liste de modèles, dispositions, variantes et options dans
> [`/usr/share/X11/xkb/rules/evdev.lst`](file:///usr/share/X11/xkb/rules/evdev.lst).
> Sinon, vous pouvez utiliser la commande `localectl` pour découvrir ce qui est disponible
> sur votre système.
> 
> Pour les configurations de clavier commutables, jetez un œil à
> [l'entrée de la page des raccourcis](../Binds/#switchable-keyboard-layouts).

> [!NOTE] **Suivre le curseur de la souris**
> - 0 - Le mouvement du curseur ne changera pas le focus.
> - 1 - Le mouvement du curseur changera toujours le focus vers la fenêtre sous le curseur.
> - 2 - Le focus du curseur sera détaché du focus clavier. Cliquer sur une fenêtre
>   déplacera le focus clavier vers cette fenêtre.
> - 3 - Le focus du curseur sera complètement séparé du focus clavier. Cliquer sur
>   une fenêtre ne changera pas le focus clavier.

> [!NOTE] **Profils d'accélération personnalisés**
> 
> #### `accel_profile`
> 
> `custom <step> <points...>`
> 
> Exemple : `custom 200 0.0 0.5`
> 
> #### `scroll_points`
> 
> NOTE : Ne fonctionne que quand `accel_profile` est défini à `custom`.
> 
> `<step> <points...>`
> 
> Exemple : `0.2 0.0 0.5 1 1.2 1.5`
> 
> Pour imiter les courbes d'accélération de Windows, jetez un œil à
> [ce script](https://gist.github.com/fufexan/de2099bc3086f3a6c83d61fc1fcc06c9).
> 
> Voir
> [la doc libinput](https://wayland.freedesktop.org/libinput/doc/latest/pointer-acceleration.html)
> pour plus de détails sur son fonctionnement.

#### Touchpad (Pavé tactile)

*Sous-catégorie `input.touchpad.`*

| nom | description | type | par défaut |
| --- | --- | --- | --- |
| disable_while_typing | Désactive le pavé tactile pendant la frappe. | bool | `true` |
| natural_scroll | Inverse le sens du défilement. Quand activé, le défilement déplace le contenu directement, plutôt que de manipuler une barre de défilement. | bool | `false` |
| scroll_factor | Multiplicateur appliqué à la quantité de mouvement de défilement. | float | `1.0` |
| middle_button_emulation | Envoyer LMB et RMB simultanément sera interprété comme un clic du milieu. Cela désactive toute zone du touchpad qui enverrait normalement un clic du milieu selon la position. [libinput#middle-button-emulation](https://wayland.freedesktop.org/libinput/doc/latest/middle-button-emulation.html) | bool | `false` |
| tap_button_map | Définit le mappage de bouton pour l'émulation de bouton du touchpad. Peut être `"lrm"` (par défaut) ou `"lmr"` (boutons gauche, milieu, droit). [`"lrm"`/`"lmr"`] | str | \[\[Vide\]\] |
| clickfinger_behavior | Les pressions de bouton avec 1, 2 ou 3 doigts seront mappées respectivement sur LMB, RMB et MMB. Cela désactive l'interprétation des clics selon la position sur le touchpad. [libinput#clickfinger-behavior](https://wayland.freedesktop.org/libinput/doc/latest/clickpad-softbuttons.html#clickfinger-behavior) | bool | `false` |
| tap_to_click | Tapoter le touchpad avec 1, 2 ou 3 doigts enverra respectivement LMB, RMB et MMB. | bool | `true` |
| drag_lock | Quand activé, lever le doigt pendant un glissement ne relâchera pas l'élément glissé. 0 -> désactivé, 1 -> activé avec délai, 2 -> activé collant. [libinput#tap-and-drag](https://wayland.freedesktop.org/libinput/doc/latest/tapping.html#tap-and-drag) | int | `0` |
| tap_and_drag | Définit le mode taper-glisser pour le touchpad | bool | `true` |
| flip_x | inverse le mouvement horizontal du touchpad | bool | `false` |
| flip_y | inverse le mouvement vertical du touchpad | bool | `false` |
| drag_3fg | active le glisser à trois doigts, 0 -> désactivé, 1 -> 3 doigts, 2 -> 4 doigts [libinput#drag-3fg](https://wayland.freedesktop.org/libinput/doc/latest/drag-3fg.html) | int | `0` |

#### Touchdevice (Périphérique tactile)

*Sous-catégorie `input.touchdevice.`*

| nom | description | type | par défaut |
| --- | --- | --- | --- |
| transform | Transforme l'entrée des périphériques tactiles. Les transformations possibles sont les mêmes que [celles des moniteurs](../Monitors/#rotating). | int | `0` |
| output | Le moniteur auquel lier les périphériques tactiles. Par défaut : auto-détection. Pour arrêter l'auto-détection, utilisez une chaîne vide. | string | \[\[Auto\]\] |
| enabled | Si l'entrée est activée pour les périphériques tactiles. | bool | `true` |

#### Virtualkeyboard (Clavier virtuel)

*Sous-catégorie `input.virtualkeyboard.`*

| nom | description | type | par défaut |
| --- | --- | --- | --- |
| share_states | Unifie les états d'appui de touche et les états de modificateur avec les autres claviers. 0 -> non, 1 -> oui, 2 -> oui sauf pour un client IME | int | `2` |
| release_pressed_on_close | Relâche toutes les touches enfoncées par le clavier virtuel à la fermeture. | bool | `false` |

#### Tablet (Tablette)

*Sous-catégorie `input.tablet.`*

| nom | description | type | par défaut |
| --- | --- | --- | --- |
| transform | transforme l'entrée des tablettes. Les transformations possibles sont les mêmes que [celles des moniteurs](../Monitors/#rotating). | int | `0` |
| output | le moniteur auquel lier les tablettes. Peut être `"current"` ou un nom de moniteur. Laissez vide pour mapper sur tous les moniteurs. | string | \[\[Vide\]\] |
| region_position | position de la zone mappée dans la disposition du moniteur relativement au coin supérieur gauche du moniteur lié ou de tous les moniteurs. | vec2 | `{0, 0}` |
| absolute_region_position | s'il faut traiter `region_position` comme une position absolue dans la disposition du moniteur. S'applique uniquement quand `output` est vide. | bool | `false` |
| region_size | taille de la zone mappée. Quand cette variable est définie, l'entrée de la tablette sera mappée à la zone. `{0, 0}` ou une taille invalide signifie non défini. | vec2 | `{0, 0}` |
| relative_input | si l'entrée doit être relative | bool | `false` |
| left_handed | si activé, la tablette sera tournée de 180 degrés | bool | `false` |
| active_area_size | taille de la zone active de la tablette en mm | vec2 | `{0, 0}` |
| active_area_position | position de la zone active en mm | vec2 | `{0, 0}` |

#### Tablettool (Outil de tablette)

*Sous-catégorie `input.tablettool.`*

| nom | description | type | par défaut |
| --- | --- | --- | --- |
| eraser_button_mode | Change le comportement du bouton gomme sur l'outil. Défini à `0`, utilise le comportement matériel par défaut de l'outil. Défini à `1`, le bouton gomme sur l'outil envoie plutôt un événement de bouton. | int | 0 |
| eraser_button_override | Définit un bouton pour être un événement de bouton quand eraser_button_mode est défini à `1`. Doit être un int, ne peut pas être une chaîne. Doit être un bouton valide (par ex. BTN_STYLUS) excluant les faux boutons (par ex. BTN_TOOL_*) et les touches (KEY_*). Vérifiez wev en cas de doute concernant l'ID. `0` signifie par défaut. | int | 0 |
| pressure_range_min | Définit la plage de pression minimale pour l'outil, un nombre négatif définira la valeur de pression minimale par défaut. C'est généralement `0.0` | float | -1.0 |
| pressure_range_max | Définit la plage de pression maximale pour l'outil, un nombre négatif définira la valeur de pression maximale par défaut. C'est généralement `1.0` | float | -1.0 |

### Configuration d'entrée par périphérique

Décrite [ici](../../Advanced-and-Cool/Devices).

### Gestures (Gestes)

*Sous-catégorie `gestures.`*

| nom | description | type | par défaut |
| --- | --- | --- | --- |
| workspace_swipe_distance | en px, la distance du geste sur le touchpad | int | `300` |
| workspace_swipe_touch | active le balayage d'espace de travail depuis le bord d'un écran tactile | bool | `false` |
| workspace_swipe_invert | inverse la direction (touchpad uniquement) | bool | `true` |
| workspace_swipe_touch_invert | inverse la direction (écran tactile uniquement) | bool | `false` |
| workspace_swipe_min_speed_to_force | vitesse minimale en px par point temporel pour forcer le changement en ignorant `cancel_ratio`. Définir à `0` désactivera ce mécanisme. | int | `30` |
| workspace_swipe_cancel_ratio | à quel point le balayage doit progresser pour se déclencher. (0.7 -> si > 0.7 * distance, bascule, si moins, revient en arrière) [0.0 - 1.0] | float | `0.5` |
| workspace_swipe_create_new | si un balayage vers la droite sur le dernier espace de travail doit en créer un nouveau. | bool | `true` |
| workspace_swipe_direction_lock | si activé, le sens de bascule sera verrouillé lorsque vous balayez au-delà de `direction_lock_threshold` (touchpad uniquement). | bool | `true` |
| workspace_swipe_direction_lock_threshold | en px, la distance à balayer avant que le verrouillage de direction s'active (touchpad uniquement). | int | `10` |
| workspace_swipe_forever | si activé, le balayage ne se limitera pas aux espaces de travail voisins mais continuera vers les suivants. | bool | `false` |
| workspace_swipe_use_r | si activé, le balayage utilisera le préfixe `r` au lieu du préfixe `m` pour trouver les espaces de travail. | bool | `false` |
| close_max_timeout | le délai pour qu'une fenêtre se ferme lors de l'utilisation d'un geste 1:1, en ms | int | `1000` |

#### Scrolling (Défilement)

*Sous-catégorie `gestures.scrolling.`*

| nom | description | type | par défaut |
| --- | --- | --- | --- |
| move_snap_to_grid | à la fin du geste de déplacement par défilement, s'il faut essayer de s'accrocher à la grille | bool | `true` |
| move_snap_cursor | à la fin du geste de déplacement par défilement, s'il faut faire accrocher le curseur à la fenêtre nouvellement focalisée | bool | `true` |

> [!NOTE]
> `workspace_swipe`, `workspace_swipe_fingers` et `workspace_swipe_min_fingers` ont été supprimés au profit du nouveau système de gestes.
> 
> Vous pouvez ajouter cette configuration de geste pour reproduire la fonctionnalité de balayage avec 3 doigts. Voir la page [gestures](../../Advanced-and-Cool/Gestures) pour plus d'infos.
> 
> ```lua
> hl.gesture({
>    fingers = 3,
>    direction = "horizontal",
>    action = "workspace"
> })
> ```

### Group (Groupe)

*Sous-catégorie `group.`*

| nom | description | type | par défaut |
| --- | --- | --- | --- |
| auto_group | si les nouvelles fenêtres seront automatiquement groupées dans le groupe déverrouillé focalisé. *Note : si vous voulez désactiver auto_group uniquement pour des fenêtres spécifiques, utilisez plutôt [la règle de fenêtre "group barred"](../Window-Rules/#group-window-rule-options).* | bool | `true` |
| insert_after_current | si les nouvelles fenêtres dans un groupe apparaissent après la fenêtre actuelle ou à la fin du groupe | bool | `true` |
| focus_removed_window | si Hyprland doit donner le focus à la fenêtre qui vient d'être retirée du groupe | bool | `true` |
| drag_into_group | si glisser une fenêtre dans un groupe déverrouillé les fusionnera. Options : `0` (désactivé), `1` (activé), `2` (uniquement en glissant dans la groupbar) | int | `1` |
| merge_groups_on_drag | si les groupes de fenêtres peuvent être glissés dans d'autres groupes | bool | `true` |
| merge_groups_on_groupbar | si un groupe sera fusionné avec un autre lorsqu'il est glissé dans sa groupbar. *Note : activer cette option ne fonctionne que combiné avec `drag_into_group = 2` et `merge_groups_on_drag = true`* | bool | `true` |
| merge_floated_into_tiled_on_groupbar | si glisser une fenêtre flottante dans la groupbar d'une fenêtre en mosaïque les fusionnera | bool | `false` |
| group_on_movetoworkspace | si utiliser movetoworkspace[silent] fusionnera la fenêtre dans le groupe déverrouillé solitaire de l'espace de travail | bool | `false` |
| col.border_active | couleur de bordure de groupe actif | gradient | `0x66ffff00` |
| col.border_inactive | couleur de bordure de groupe inactif (hors focus) | gradient | `0x66777700` |
| col.border_locked_active | couleur de bordure de groupe verrouillé actif | gradient | `0x66ff5500` |
| col.border_locked_inactive | couleur de bordure de groupe verrouillé inactif | gradient | `0x66775500` |

#### Groupbar (Barre de groupe)

*Sous-catégorie `group.groupbar.`*

| nom | description | type | par défaut |
| --- | --- | --- | --- |
| enabled | active les groupbars | bool | `true` |
| disable_when_only | désactive si contient une seule fenêtre. Considéré uniquement si enabled == true | bool | `false` |
| font_family | police utilisée pour afficher les titres de la groupbar, utilise `misc.font_family` si non spécifié | string | \[\[Vide\]\] |
| font_size | taille de police du titre de la groupbar | int | `8` |
| font_weight_active | graisse de police du titre de la groupbar active | font_weight | `"normal"` |
| font_weight_inactive | graisse de police du titre de la groupbar inactive | font_weight | `"normal"` |
| gradients | active les gradients | bool | `false` |
| height | hauteur de la groupbar | int | `14` |
| indicator_gap | hauteur de l'espace entre l'indicateur de groupbar et le titre | int | `0` |
| indicator_height | hauteur de l'indicateur de groupbar | int | `3` |
| stacked | rend la groupbar sous forme de pile verticale | bool | `false` |
| priority | définit la priorité de décoration pour les groupbars | int | `3` |
| render_titles | s'il faut rendre les titres dans la décoration de la barre de groupe | bool | `true` |
| text_offset | ajuste la position verticale des titres | int | `0` |
| text_padding | définit le padding horizontal des titres | int | `0` |
| scrolling | si défiler dans la groupbar change la fenêtre active du groupe | bool | `true` |
| rounding | à quel point arrondir l'indicateur | int | `1` |
| rounding_power |  ajuste la courbe utilisée pour arrondir les coins de la groupbar, plus grand est plus lisse, 2.0 est un cercle, 4.0 est un « squircle ». [2.0 - 10.0] | float |  `2.0` |
| gradient_rounding | à quel point arrondir les gradients | int | `2` |
| gradient_rounding_power | ajuste la courbe utilisée pour arrondir les coins des gradients, plus grand est plus lisse, 2.0 est un cercle, 4.0 est un « squircle ». [2.0 - 10.0] | float | `2.0` |
| round_only_edges | arrondit uniquement les bords de l'indicateur de toute la groupbar | bool | `true` |
| gradient_round_only_edges | arrondit uniquement les bords du gradient de toute la groupbar | bool | `true` |
| text_color | couleur des titres de fenêtre dans la groupbar | color | `0xffffffff` |
| text_color_inactive | couleur des titres des fenêtres inactives dans la groupbar (si non défini, revient à text_color) | color | non défini |
| text_color_locked_active | couleur du titre de la fenêtre active dans un groupe verrouillé (si non défini, revient à text_color) | color | non défini |
| text_color_locked_inactive | couleur des titres des fenêtres inactives dans les groupes verrouillés (si non défini, revient à text_color_inactive) | color | non défini |
| col.active | couleur d'arrière-plan de la barre de groupe active | gradient | `0x66ffff00` |
| col.inactive | couleur d'arrière-plan de la barre de groupe inactive (hors focus) | gradient | `0x66777700` |
| col.locked_active | couleur d'arrière-plan de la barre de groupe verrouillé active | gradient | `0x66ff5500` |
| col.locked_inactive | couleur d'arrière-plan de la barre de groupe verrouillé inactive | gradient | `0x66775500` |
| gaps_in | taille de l'espacement entre les gradients | int | `2` |
| gaps_out | taille de l'espacement entre les gradients et la fenêtre | int | `2` |
| keep_upper_gap | ajoute ou retire l'espacement supérieur | bool | `true` |
| middle_click_close | si cliquer avec le bouton du milieu sur la groupbar ferme la fenêtre cliquée | bool | `true` |
| blur | applique le flou aux indicateurs et gradients de la groupbar | bool | `false` |

### Misc (Divers)

*Sous-catégorie `misc.`*

| nom | description | type | par défaut |
|---|---|---|---|
| disable_hyprland_logo | désactive le logo Hyprland aléatoire / le fond d'écran de fille d'anime. :( | bool | `false` |
| disable_splash_rendering | désactive le rendu du splash de Hyprland. (nécessite un rechargement du moniteur pour prendre effet) | bool | `false` |
| disable_scale_notification | désactive la notification popup quand un moniteur échoue à définir une échelle adaptée | bool | `false` |
| col.splash | Change la couleur du texte du splash (nécessite un rechargement du moniteur pour prendre effet). | color | `0x55ffffff` |
| font_family | Définit la police par défaut globale pour rendre le texte, y compris les fps de débogage/notification, les messages d'erreur de configuration, etc., sélectionnée parmi les polices système. | string | `"Sans"` |
| splash_font_family | Change la police utilisée pour rendre le texte du splash, sélectionnée parmi les polices système (nécessite un rechargement du moniteur pour prendre effet). | string | \[\[Vide\]\] |
| force_default_wallpaper | Force l'un des 3 fonds d'écran par défaut. Définir ceci à `0` ou `1` désactive le fond d'écran anime. `-1` signifie « aléatoire ». [-1/0/1/2] | int | `-1` |
| vrr | contrôle le VRR (Adaptive Sync) de vos moniteurs. 0 - désactivé, 1 - activé, 2 - plein écran uniquement, 3 - plein écran avec un type de contenu `video` ou `game` [0/1/2/3] | int | `0` |
| mouse_move_enables_dpms | Si DPMS est défini sur off, réveille les moniteurs si la souris bouge. | bool | `false` |
| key_press_enables_dpms | Si DPMS est défini sur off, réveille les moniteurs si une touche est pressée. | bool | `false` |
| name_vk_after_proc | Nomme les claviers virtuels d'après les processus qui les créent. Par ex. /usr/bin/fcitx5 aura hl-virtual-keyboard-fcitx5. | bool | `true` |
| always_follow_on_dnd | Fera suivre le focus de la souris au curseur lors du glisser-déposer. Recommandé de laisser activé, particulièrement pour les personnes utilisant le focus suit la souris à 0. | bool | `true` |
| layers_hog_keyboard_focus | Si vrai, fera que les calques interactifs au clavier gardent leur focus lors du déplacement de la souris (par ex. wofi, bemenu) | bool | `true` |
| animate_manual_resizes | Si vrai, animera les redimensionnements/déplacements manuels de fenêtre | bool | `false` |
| animate_mouse_windowdragging | Si vrai, animera les fenêtres glissées à la souris, notez que cela peut causer un comportement étrange sur certaines courbes | bool | `false` |
| disable_autoreload | Si vrai, la configuration ne se rechargera pas automatiquement à l'enregistrement, et devra plutôt être rechargée avec `hyprctl reload`. Peut économiser de la batterie. | bool | `false` |
| enable_swallow | Active l'avalage de fenêtre (swallowing) | bool | `false` |
| swallow_regex | La regex de *classe* à utiliser pour les fenêtres qui devraient être avalées (généralement, un terminal). Pour en savoir plus sur la liste des regex utilisables, [utilisez cet aide-mémoire](https://github.com/ziishaned/learn-regex/blob/master/README.md). | str | \[\[Vide\]\] |
| swallow_exception_regex | La regex de *titre* à utiliser pour les fenêtres qui ne devraient *pas* être avalées par les fenêtres spécifiées dans swallow_regex (par ex. wev). La regex est comparée au titre de la fenêtre parente (par ex. Kitty) en supposant qu'il change en fonction du processus en cours d'exécution. | str | \[\[Vide\]\] |
| focus_on_activate | Si Hyprland doit donner le focus à une application qui en fait la demande (une requête `activate`) | bool | `false` |
| mouse_move_focuses_monitor | Si déplacer la souris vers un moniteur différent doit lui donner le focus | bool | `true` |
| allow_session_lock_restore | si vrai, permettra de redémarrer une application d'écran de verrouillage en cas de plantage | bool | `false` |
| session_lock_xray | si vrai, continue de rendre les espaces de travail sous votre écran de verrouillage | bool | `false` |
| session_lock_blur | Active le flou pour l'écran de verrouillage. `session_lock_xray` doit être activé. | bool | `false` |
| background_color | change la couleur d'arrière-plan. (nécessite `disable_hyprland_logo` activé) | color | `0x111111` |
| close_special_on_empty | ferme l'espace de travail spécial si la dernière fenêtre est retirée | bool | `true` |
| on_focus_under_fullscreen | s'il y a une fenêtre en plein écran ou maximisée, décide si une fenêtre en mosaïque dont le focus est demandé doit la remplacer, rester derrière ou désactiver l'état plein écran/maximisé. 0 - ignore la demande de focus (garde le focus sur la fenêtre plein écran), 1 - prend le dessus, 2 - annule le plein écran/la maximisation [0/1/2] | int | `2` |
| exit_window_retains_fullscreen | si fermer une fenêtre en plein écran fait que la prochaine fenêtre focalisée passe en plein écran. 0 - désactivé, 1 - activé, 2 - uniquement en fermant une fenêtre groupée, 3 - uniquement en fermant une fenêtre non groupée [0/1/2/3] | int | `0` |
| initial_workspace_tracking | si activé, les fenêtres s'ouvriront sur l'espace de travail où elles ont été invoquées. 0 - désactivé, 1 - à usage unique, 2 - persistant (tous les enfants aussi) | int | `1` |
| initial_workspace_token_timeout | le temps en secondes qu'une fenêtre a pour s'ouvrir sur son espace de travail invoqué avant que le jeton de suivi n'expire. | int | `10` |
| middle_click_paste | s'il faut activer le collage par clic du milieu (aussi appelé sélection primaire) | bool | `true` |
| render_unfocused_fps | la limite maximale de fps pour les fenêtres render_unfocused en arrière-plan (voir aussi [Window-Rules](../Window-Rules/#dynamic-effects) - `render_unfocused`)| int | `15` |
| disable_xdg_env_checks | désactive l'avertissement si l'environnement XDG est géré de manière externe | bool | `false` |
| disable_hyprland_guiutils_check | désactive l'avertissement si hyprland-guiutils n'est pas installé | bool | `false` |
| lockdead_screen_delay | délai après lequel l'écran « lockdead » apparaîtra dans le cas où une application d'écran de verrouillage ne parvient pas à couvrir toutes les sorties (5 secondes max) | int | `1000` |
| enable_anr_dialog | s'il faut activer la boîte de dialogue ANR (application ne répond pas) quand vos applications se figent | bool | `true` |
| anr_missed_pings | nombre de pings manqués avant d'afficher la boîte de dialogue ANR | int | `5` |
| size_limits_tiled | s'il faut appliquer les règles min_size et max_size aux fenêtres en mosaïque | bool | `false` |
| screencopy_force_8b | force la capture d'écran en 8 bits | bool | `true` |
| disable_watchdog_warning | s'il faut désactiver l'avertissement de ne pas utiliser start-hyprland | bool | `false` |
| bell_sound | chemin vers une cloche système personnalisée wav/ogg. « none » ou une chaîne vide la coupe. « default » utilise celle actuelle du système. | str | `"default"` |
| float_force_onscreen | si/comment les fenêtres flottantes existantes doivent être contraintes de rester à l'écran. 0 - aucune contrainte, 1 - doit être partiellement à l'écran, 2 - doit être entièrement à l'écran [0/1/2] | int | `0` |
| new_float_force_onscreen | identique à `float_force_onscreen`, mais spécifiquement pour les fenêtres flottantes nouvellement créées [0/1/2] | int | `2` |

### Layout (Disposition)

*Sous-catégorie `layout.`*

| nom | description | type | par défaut |
|---|---|---|---|
| single_window_aspect_ratio | quand une seule fenêtre est affichée sur un écran, ajoute du padding pour qu'elle respecte le rapport d'aspect spécifié. Une valeur comme `4 3` sur un écran 16:9 en fera une fenêtre 4:3 au centre avec du padding sur les côtés. | Vec2D | `{0, 0}` |
| single_window_aspect_ratio_tolerance | définit une tolérance pour `single_window_aspect_ratio`, de sorte que si le padding qui aurait été ajouté est inférieur à la fraction spécifiée de la hauteur ou de la largeur de l'écran, il n'essaiera pas d'ajuster la taille de la fenêtre [0 - 1] | int | `0.1` | 

### Binds (Raccourcis)

*Sous-catégorie `binds.`*

| nom | description | type | par défaut |
| --- | --- | --- | --- |
| pass_mouse_when_bound | si désactivé, ne transmettra pas les événements souris aux applications / au glissement de fenêtres si un raccourci clavier a été déclenché. | bool | `false` |
| scroll_event_delay | en ms, combien de temps attendre après un événement de défilement avant d'en autoriser un autre pour les raccourcis. | int | `300` |
| workspace_back_and_forth | Si activé, une tentative de passer à l'espace de travail actuellement focalisé passera plutôt à l'espace de travail précédent. Similaire à l'*auto_back_and_forth* d'i3. | bool | `false` |
| hide_special_on_workspace_change | Si activé, changer l'espace de travail actif (même vers lui-même) masquera l'espace de travail spécial sur le moniteur où réside le nouvel espace de travail actif. | bool | `false` |
| allow_workspace_cycles | Si activé, les espaces de travail n'oublient pas leur espace de travail précédent, donc des cycles peuvent être créés en passant au premier espace de travail d'une séquence, puis en allant sans fin vers l'espace de travail précédent. | bool | `false` |
| workspace_center_on | Si changer d'espace de travail doit centrer le curseur sur l'espace de travail (0) ou sur la dernière fenêtre active de cet espace de travail (1) | int | `1` |
| focus_preferred_method | définit la méthode de recherche de focus préférée lors de l'utilisation de `hl.dsp.focus({ direction })`/`hl.dsp.window.move({ direction })`/etc. 0 - historique (les plus récentes ont priorité), 1 - longueur (les bords partagés les plus longs ont priorité) | int | `0` |
| ignore_group_lock | Si activé, des dispatchers comme `hl.dsp.window.move({ into_group })` et `hl.dsp.window.move({ out_of_group })` ignoreront le verrouillage par groupe. | bool | `false` |
| movefocus_cycles_fullscreen | Si activé, sur une fenêtre en plein écran, `hl.dsp.focus({ direction })` parcourra le plein écran, sinon, il déplacera le focus dans une direction. | bool | `false` |
| movefocus_cycles_groupfirst | Si activé, dans une fenêtre groupée, `hl.dsp.focus({ direction })` parcourra d'abord les fenêtres dans les groupes, puis à chaque extrémité des onglets, passera aux autres fenêtres/groupes | bool | `false` |
| window_direction_monitor_fallback | Si activé, déplacer une fenêtre ou le focus par-delà le bord d'un moniteur dans une direction le déplacera vers le prochain moniteur dans cette direction. | bool | `true` |
| disable_keybind_grabbing | Si activé, les applications qui demandent que les raccourcis clavier soient désactivés (par ex. les VM) ne pourront pas le faire. | bool | `false` |
| allow_pin_fullscreen | Si activé, autorise le plein écran pour les fenêtres épinglées, et restaure leur statut épinglé ensuite | bool | `false` |
| drag_threshold | Seuil de mouvement en pixels pour le glissement de fenêtre et les flags de raccourci c/g. 0 pour désactiver et saisir dès le clic. | int | `0` |
| drag_center_window | Si activé, glisser une fenêtre en mosaïque ou en plein écran la centrera sur le curseur quand elle devient flottante. | bool | `true` | "

### XWayland

*Sous-catégorie `xwayland.`* 

| nom | description | type | par défaut |
| --- | --- | --- | --- |
| enabled | autorise l'exécution d'applications utilisant X11 | bool | `true` |
| use_nearest_neighbor | utilise le filtrage au plus proche voisin pour les applications xwayland, les rendant pixellisées plutôt que floues | bool | `true` |
| force_zero_scaling | force une échelle de 1 sur les fenêtres xwayland sur les écrans mis à l'échelle. | bool | `false` |
| create_abstract_socket | Crée le [socket Unix abstrait](../../Advanced-and-Cool/XWayland/#abstract-unix-domain-socket) pour les connexions XWayland. (un redémarrage de XWayland est requis pour que les changements prennent effet ; Linux uniquement) | bool | `false` |

### OpenGL

*Sous-catégorie `opengl.`* 

| nom | description | type | par défaut |
| --- | --- | --- | --- |
| nvidia_anti_flicker | réduit le scintillement sur nvidia au prix de possibles chutes d'images sur les GPU d'entrée de gamme. Sur non-nvidia, ceci est ignoré. | bool | `true` |

### Render (Rendu)

*Sous-catégorie `render.`* 

| nom | description | type | par défaut |
| --- | --- | --- | --- |
| direct_scanout | Active le scanout direct. Le scanout direct tente de réduire la latence quand il n'y a qu'une seule application en plein écran sur un écran (par ex. un jeu). Il est aussi recommandé de définir ceci à false si l'application en plein écran affiche des artefacts graphiques. 0 - désactivé, 1 - activé, 2 - auto (activé avec le type de contenu 'game') | int | `0` |
| expand_undersized_textures | S'il faut étendre les textures sous-dimensionnées le long du bord, ou plutôt étirer la texture entière. | bool | `true` |
| xp_mode | Désactive le rendu du back buffer et de la couche inférieure. | bool | `false` |
| ctm_animation | S'il faut activer une animation de fondu pour les changements de CTM (hyprsunset). 2 signifie « auto » ce qui les désactive sur Nvidia. | int | `2` |
| cm_enabled | Si le pipeline de gestion des couleurs doit être activé ou non (nécessite un redémarrage de Hyprland pour prendre pleinement effet) | bool | `true` |
| send_content_type | Signale le type de contenu pour permettre le changement automatique de profil du moniteur (peut résulter en un écran noir pendant le changement) | bool | `true` |
| cm_auto_hdr | Bascule automatiquement en HDR en plein écran quand nécessaire. 0 - désactivé, 1 - bascule vers `cm, hdr`, 2 - bascule vers `cm, hdredid` | int | `1` |
| new_render_scheduling | Utilise automatiquement le triple buffering quand nécessaire, améliore les FPS sur les appareils peu puissants. | bool | `false` |
| non_shader_cm | Active la gestion des couleurs sans shader. 0 - désactivé, 1 - dès que possible, 2 - DS et passthrough uniquement, 3 - désactivé et ignore les problèmes de gestion des couleurs | int | `3` |
| non_shader_cm_interop | 0 - le ctm externe (hyprsunset, etc.) est désactivé en plein écran, 1 - le ctm externe est activé en plein écran, 2 - le ctm externe est désactivé pour les types de contenu photo/vidéo/jeu en plein écran | int | `2` |
| cm_sdr_eotf | Fonction de transfert par défaut pour l'affichage des applications SDR. `"default"` - utilise la valeur par défaut (sRGB), `"gamma22"` - traite le non spécifié comme Gamma 2.2, `"gamma22force"` - traite le non spécifié et le sRGB comme Gamma 2.2, `"srgb"` - traite le non spécifié comme sRGB| str | `"default"` |
| commit_timing_enabled | Active le proto de timing de commit. Nécessite un redémarrage | bool | `true` |
| use_fp16 | Utilise des buffers FP16 en interne. 0 - désactivé, 1 - activé, 2 - activé en mode hdr | int | `2` |
| keep_unmodified_copy | Garde une copie de trame SDR non modifiée pour le partage d'écran. 0 - désactivé, 1 - activé, 2 - auto (activé en HDR avec des modificateurs SDR). Définir à 1 si les captures d'écran sont transparentes. | int | `2` |
| use_shader_blur_blend | Utilise le mélange de flou d'arrière-plan expérimental (glitché sur les écrans tournés). Définir à true si le flou est manquant avec fp16 ou keep_unmodified_copy | bool | `false` |
| icc_vcgt_enabled | Active l'envoi des rampes VCGT vers KMS avec des profils ICC | bool | `true` |
| fp16_sdr_tf | Fonction de transfert du tampon de travail interne pour fp16 en mode SDR. 0 - moniteur, 1 - linéaire | int | `0` |
| not_shown_fifo_lock | Contrôle le verrouillage fifo pour les surfaces non affichées. always - utilise le verrouillage fifo pour toute surface, ignore_unfocused - ignore les fenêtres render_unfocused, never - saute le verrouillage des surfaces invisibles | int | `0` |

`cm_auto_hdr` nécessite l'option mpv `--target-colorspace-hint-mode=source` pour fonctionner avec les versions de mpv supérieures à v0.40.0

### Cursor (Curseur)

*Sous-catégorie `cursor.`* 

| nom | description | type | par défaut |
| --- | --- | --- | --- |
| invisible | ne rend pas les curseurs | bool | `false` |
| sync_gsettings_theme | synchronise le thème xcursor avec gsettings, applique cursor-theme et cursor-size au chargement du thème vers gsettings, faisant que la plupart des clients basés sur CSD gtk utilisent le même thème et la même taille xcursor. | bool | `true` |
| no_hardware_cursors | désactive les curseurs matériels. 0 - utilise les curseurs hw si possible, 1 - n'utilise pas les curseurs hw, 2 - auto (désactive lors du tearing) | int | `2` |
| no_break_fs_vrr | désactive la planification de nouvelles trames lors du mouvement du curseur pour les applications en plein écran avec VRR activé, pour éviter les pics de fréquence d'image (peut nécessiter no_hardware_cursors = true) 0 - désactivé, 1 - activé, 2 - auto (activé avec le type de contenu 'game') | int | `2` |
| min_refresh_rate | taux de rafraîchissement minimal pour le mouvement du curseur quand `no_break_fs_vrr` est actif. Définissez au taux de rafraîchissement minimal pris en charge ou plus | int | `24` |
| hotspot_padding | le padding, en px logiques, entre les bords de l'écran et le curseur | int | `0` |
| inactive_timeout | en secondes, après combien de secondes d'inactivité du curseur le masquer. Définir à `0` pour jamais. | float | `0` |
| no_warps | si vrai, ne téléportera pas le curseur dans de nombreux cas (focus, raccourcis, etc.) | bool | `false` |
| persistent_warps | Quand une fenêtre reçoit à nouveau le focus, le curseur revient à sa dernière position relative à cette fenêtre, plutôt qu'au centre. | bool | `false` |
| warp_on_change_workspace | Déplace le curseur vers la dernière fenêtre focalisée après un changement d'espace de travail. Options : 0 (désactivé), 1 (activé), 2 (forcé - ignore l'option cursor:no_warps) | int | `0` |
| warp_on_monitor_change | Déplace le curseur vers la dernière fenêtre focalisée en donnant le focus à un moniteur différent. Options : -1 (suit la valeur de `cursor:warp_on_change_workspace`), 0 (désactivé), 1 (activé), 2 (forcé - ignore `cursor:no_warps`) | int | `-1` |
| warp_on_toggle_special | Déplace le curseur vers la dernière fenêtre focalisée lors du basculement d'un espace de travail spécial. Options : 0 (désactivé), 1 (activé), 2 (forcé - ignore l'option cursor:no_warps) | int | `0` |
| default_monitor | le nom d'un moniteur par défaut pour lequel le curseur sera défini au démarrage (voir `hyprctl monitors` pour les noms) | str | \[\[Vide\]\] |
| zoom_factor | le facteur de zoom autour du curseur. Comme une loupe. Minimum 1.0 (signifiant aucun zoom) | float | `1.0` |
| zoom_rigid | si le zoom doit suivre le curseur de façon rigide (le curseur est toujours centré si possible) ou de façon souple | bool | `false` |
| zoom_detached_camera | détache la caméra de la souris en zoom, ne déplaçant la caméra que pour garder la souris en vue quand elle dépasse le bord de l'écran | bool | `true` |
| enable_hyprcursor | s'il faut activer le support hyprcursor | bool | `true` |
| hide_on_key_press | Masque le curseur quand vous appuyez sur une touche jusqu'à ce que la souris soit déplacée. | bool | `false` |
| hide_on_touch | Masque le curseur quand la dernière entrée était tactile jusqu'à ce qu'une entrée souris soit effectuée. | bool | `true` |
| hide_on_tablet | Masque le curseur quand la dernière entrée provenait d'une tablette jusqu'à ce qu'une entrée souris soit effectuée. | bool | `false` |
| use_cpu_buffer | Fait que les curseurs matériels utilisent un tampon CPU. Requis sur Nvidia pour avoir des curseurs matériels. 0 - désactivé, 1 - activé, 2 - auto (nvidia uniquement) | int | `2` |
| warp_back_after_non_mouse_input | Ramène le curseur là où il était après avoir utilisé une entrée autre que la souris pour le déplacer, puis en revenant à la souris. | bool | `false` |
| zoom_disable_aa | désactive l'anticrénelage lors du zoom, ce qui signifie que les choses seront pixellisées plutôt que floues | bool | `false` |

### Ecosystem (Écosystème)

*Sous-catégorie `ecosystem.`*

| nom | description                                                              | type | par défaut |
| --- |--------------------------------------------------------------------------| --- | --- |
| no_update_news | désactive la popup qui apparaît quand vous mettez à jour hyprland vers une nouvelle version. | bool | `false` |
| no_donation_nag | désactive la popup qui apparaît deux fois par an encourageant à faire un don.      | bool | `false` |
| enforce_permissions | s'il faut activer le [contrôle des permissions](../../Advanced-and-Cool/Permissions).                  | bool | `false` |

### Quirks (Bizarreries)

*Sous-catégorie `quirks.`*

| nom | description | type | par défaut |
| --- | --- | --- | --- |
| prefer_hdr | Signale le mode HDR comme préféré. 0 - désactivé, 1 - toujours, 2 - gamescope uniquement | int | `0` |
| skip_non_kms_dmabuf_formats | ne signale pas les formats dmabuf qui ne peuvent pas être importés dans KMS | bool | `false` |

Certains clients s'attendent à ce que le moniteur soit en mode HDR avant le démarrage du client. Cela casse l'activation automatique du HDR et peut causer un écran blanc et du scintillement. Utilisez `prefer_hdr` pour corriger cela.

### Debug (Débogage)

*Sous-catégorie `debug.`*

> [!WARNING]
> Réservé aux développeurs.

| nom | description | type | par défaut |
| --- | --- | --- | --- |
| overlay | affiche la surcouche de débogage des performances. Désactivez le VFR pour des résultats précis. | bool | `false` |
| damage_blink | (avertissement épilepsie !) fait clignoter les zones mises à jour par le suivi des dommages (damage tracking) | bool | `false` |
| gl_debugging | active le débogage OpenGL avec glGetError et EGL_KHR_debug, nécessite un redémarrage après changement. | bool | `false` |
| vfr | contrôle le statut VFR de Hyprland. Fortement recommandé de laisser activé pour économiser des ressources. | bool | `true` |
| disable_logs | désactive la journalisation dans un fichier | bool | `true` |
| disable_time | désactive la journalisation temporelle | bool | `true` |
| damage_tracking | ne redessine que les portions nécessaires de l'affichage. Ne **pas** changer. (par défaut : full - 2) monitor - 1, none - 0 | int | `2` |
| enable_stdout_logs | active la journalisation vers stdout | bool | `false` |
| manual_crash | définir à 1 puis revenir à 0 pour faire planter Hyprland. | int | `0` |
| suppress_errors | si vrai, n'affiche pas les erreurs d'analyse du fichier de configuration. | bool | `false` |
| log_damage | active la journalisation des dommages (damage). | bool | `false` |
| disable_scale_checks | désactive la vérification des facteurs d'échelle. Résultera en des erreurs d'alignement de pixels et d'arrondi. | bool | `false` |
| error_limit | limite le nombre d'erreurs d'analyse du fichier de configuration affichées. | int | `5` |
| error_position | définit la position de la barre d'erreur. haut - 0, bas - 1 | int | `0` |
| colored_stdout_logs | active les couleurs dans les journaux stdout. | bool | `true` |
| pass | active le débogage des passes de rendu. | bool | `false` |
| full_cm_proto | revendique le support de toutes les fonctionnalités du proto cm (nécessite un redémarrage) | bool | `false` |
| ds_handle_same_buffer | cas particulier pour le scanout direct avec un tampon non modifié | bool | `true` |
| ds_handle_same_buffer_fifo | cas particulier pour le scanout direct avec un tampon non modifié débloquant fifo | bool | `true` |
| fifo_pending_workaround | contournement fifo pour une liste en attente vide | bool | `false` |
| render_solitary_wo_damage | rend une fenêtre solitaire avec des dommages vides | bool | `false` |
| invalidate_fp16 | Autorise l'invalidation de tampon fp16 (l'invalidation augmente les performances mais produit des artefacts sur certains systèmes). 0 - non autorisé, 1 - autorisé, 2 - non autorisé sur nvidia | int | `1` |

### Experimental (Expérimental)

*Sous-catégorie `experimental.`*

| nom | description | type | par défaut |
| --- | --- | --- | --- |
| wp_cm_1_2 | autorise wp-cm-v1 version 2 | bool | `false` |

### Input Capture (Capture d'entrée)

*Sous-catégorie `input-capture.`*

| nom | description | type | par défaut |
| --- | --- | --- | --- |
| capture_modifiers | si activé, les modificateurs sont aussi capturés et envoyés au programme | bool | `false` |
| enforce_barriers | si activé, lève une erreur wayland quand une barrière invalide est reçue | bool | `true` |

### More (Plus)

Il existe d'autres options de configuration décrites dans d'autres pages, qui sont spécifiques à une
disposition ou à une circonstance. Voir la barre latérale pour plus de pages.
