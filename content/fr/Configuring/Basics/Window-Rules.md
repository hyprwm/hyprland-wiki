---
weight: 7
title: Règles de fenêtre
---

> [!NOTE]
> Vous cherchez l'ancienne syntaxe hyprlang ? Consultez les [pages du wiki 0.54](https://wiki.hypr.land/0.54.0/).
> Depuis Hyprland 0.55, hyprlang est devenu obsolète au profit de lua.

> [!WARNING]
> Les règles sont évaluées de haut en bas, donc l'ordre dans lequel elles sont écrites a de l'importance !
> Plus d'infos dans [Notes](#notes)

## Règles de fenêtre

Vous pouvez définir des règles de fenêtre pour obtenir différents comportements de fenêtre en fonction
de leurs propriétés.

### Syntaxe

Syntaxe de base d'une règle nommée :

```lua
hl.window_rule({
  name = "apply-something",
  match = {
    class = "my-window"
  },
  border_size = 10
})
```

Syntaxe de base d'une règle anonyme :

```lua
hl.window_rule({ match = { class = "my-window" }, border_size = 10 })
```

Les règles sont divisées en deux catégories de paramètres : les *props* et les *effets*. Les props
sont les champs à l'intérieur de la table `match`, qui sont utilisés pour déterminer si une fenêtre
doit recevoir la règle. Les effets sont ce qui est appliqué.

*Toutes* les props doivent correspondre pour qu'une règle soit appliquée.

Vous pouvez avoir autant de props et d'effets par règle que vous le souhaitez, dans n'importe quel ordre, tant que :
- il n'y en a qu'un seul de chaque type (par ex. spécifier `match.class` deux fois est invalide)
- il y a au moins une *prop*

### Props

Les champs pris en charge pour la table `match` sont :

| Champ | Argument | Description |
| -------------- | --------------- | --- |
| class | \[RegEx\] | Fenêtres dont la `class` correspond à `RegEx`. |
| title | \[RegEx\] | Fenêtres dont le `title` correspond à `RegEx`. |
| initial_class | \[RegEx\] | Fenêtres dont `initialClass` correspond à `RegEx`. |
| initial_title | \[RegEx\] | Fenêtres dont `initialTitle` correspond à `RegEx`. |
| tag | \[name\] | Fenêtres ayant un `tag` correspondant. |
| xwayland | \[bool\] | Fenêtres Xwayland. |
| float | \[bool\] | Fenêtres flottantes. |
| fullscreen | \[bool\] | Fenêtres en plein écran (couvrant ou non). |
| pin | \[bool\] | Fenêtres épinglées. |
| focus | \[bool\] | Fenêtre actuellement focalisée. |
| group | \[bool\] | Fenêtres groupées. |
| modal | \[bool\] | Fenêtres modales (par ex. les popups « Êtes-vous sûr ») |
| fullscreen_state_client | \[int\] | Fenêtres avec un `fullscreenstate` correspondant. `0` - aucun, `1` - maximisé, `2` - plein écran, `3` - maximisé et plein écran. |
| fullscreen_state_internal | \[int\] | Fenêtres avec un `fullscreenstate` correspondant. `0` - aucun, `1` - maximisé, `2` - plein écran, `3` - maximisé et plein écran. |
| workspace | \[workspace\] | Fenêtres sur l'espace de travail correspondant. Peut être un `id`, `"name:string"` ou un sélecteur d'espace de travail. |
| content | \[string\] | Fenêtres avec le type de contenu spécifié (none, photo, video, game). |
| xdg_tag | \[RegEx\] | Fait correspondre une fenêtre par son xdgTag (voir `hyprctl clients` pour vérifier si elle en a un). |

Gardez à l'esprit que vous *devez* déclarer au moins un champ, mais pas tous.

> [!NOTE]
> Pour obtenir plus d'informations sur la classe, le titre, le statut XWayland ou la
> taille d'une fenêtre, vous pouvez utiliser `hyprctl clients`.

> [!NOTE]
> Dans la sortie de la commande `hyprctl clients` :
> `fullscreen` fait référence à `fullscreen_state_internal` et
> `fullscreenClient` fait référence à `fullscreen_state_client`

### Écriture de RegEx

Notez que Hyprland utilise [RE2 de Google](https://github.com/google/re2) pour
analyser les RegEx. Cela signifie que toutes les opérations nécessitant un temps polynomial
pour être calculées ne fonctionneront pas. Consultez le [wiki de RE2](https://github.com/google/re2/wiki/Syntax)
pour les extensions prises en charge.

Si vous voulez *nier* une RegEx, c'est-à-dire ne passer que lorsque la RegEx *échoue*, vous
pouvez la préfixer avec `negative:`, par ex. : `"negative:kitty"`.

## Effets

### Effets statiques

Les effets statiques sont évalués une fois lorsque la fenêtre est ouverte et jamais plus.
Cela signifie essentiellement que ce sont toujours `initialTitle` et `initialClass`
qui seront trouvés lors de la correspondance sur `title` et `class`, respectivement.

> [!WARNING]
> Il n'est pas possible de rendre `float` (ou d'appliquer toute autre règle statique) sur une
> fenêtre à la suite d'un changement du `title` après la création de la fenêtre. Cela s'applique à tous
> les effets statiques listés ici.
> À la place, utilisez un [dispatch](../Dispatchers#window-1) déclenché par un
> écouteur d'[événement](../../Advanced-and-Cool/Expanding-functionality#events) pour
> appliquer l'effet après la création de la fenêtre :
> ```lua
> hl.on("window.title", function(w)
>     if w ~= nil and w.title == "foo" then
>         hl.dispatch(hl.dsp.window.float({ action = "set" }))
>     end
> end)
> ```

| Effet | Argument | Description |
| ---- | ----------- | --- |
| float | boolean | Rend une fenêtre flottante. |
| tile | boolean | Met une fenêtre en mosaïque. |
| fullscreen | boolean | Met une fenêtre en plein écran. |
| maximize | boolean | Maximise une fenêtre. |
| fullscreen_state | string | Définit le mode plein écran, par ex. `"1 2"` (interne client). Valeurs : `0` aucun, `1` maximisé, `2` plein écran, `3` maximisé et plein écran. |
| move | string | Déplace une fenêtre flottante vers une coordonnée donnée, locale au moniteur. Par ex. `{100, 200}` ou `{"(cursor_x-(window_w*0.5))", "(cursor_y-(window_h*0.5))"}`. |
| size | string | Redimensionne une fenêtre flottante. Par ex. `{800, 600}` ou `{"(monitor_w*0.5)", "(monitor_h*0.5)"}`. |
| center | boolean | Si la fenêtre est flottante, la centrera sur le moniteur. |
| pseudo | boolean | Pseudo-tuile une fenêtre. |
| monitor | string | Définit le moniteur sur lequel une fenêtre doit s'ouvrir. Par ex. `"1"` ou `"DP-1"`. Peut être suffixé par `" silent"` |
| workspace | string | Définit l'espace de travail sur lequel une fenêtre doit s'ouvrir. Peut aussi être `"unset"` ou suffixé par `" silent"`. |
| no_initial_focus | boolean | Désactive le focus initial sur la fenêtre. |
| pin | boolean | Épingle la fenêtre (c.-à-d. l'affiche sur tous les espaces de travail). *Note : l'épinglage est ignoré pour les fenêtres non flottantes. Vous voudrez probablement utiliser ceci avec `float = true`*. |
| group | string | Définit les propriétés de groupe de fenêtre. Voir les [options de groupe](#group-window-rule-options) ci-dessous. |
| suppress_event | string | Ignore des événements spécifiques. Séparés par des espaces : `"fullscreen"`, `"maximize"`, `"activate"`, `"activatefocus"`, `"fullscreenoutput"`, `"x11configurerequest"`. |
| content | string | Définit le type de contenu : `"none"`, `"photo"`, `"video"`, ou `"game"`. |
| no_close_for | integer | Rend la fenêtre non fermable avec `killactive` pendant un nombre donné de ms à l'ouverture. |
| scrolling_width | number | Définit la largeur de colonne pour la fenêtre au démarrage sur un espace de travail avec la disposition scrolling. |

#### Expressions

Les expressions sont utilisées avec `move` et `size`. Elles sont séparées par des espaces (pas
d'espaces à l'intérieur de chaque expression). Toutes les variables de position sont locales au moniteur.

- `monitor_w` et `monitor_h` pour la taille du moniteur
- `window_x` et `window_y` pour la position de la fenêtre
- `window_w` et `window_h` pour la taille de la fenêtre
- `cursor_x` et `cursor_y` pour la position du curseur

Exemples d'expressions :

```lua
move = {"window_w * 0.5", "(monitor_h / 2) + 17"}
size = {"monitor_w * 0.5", "monitor_h * 0.5"}
```

### Effets dynamiques

Les effets dynamiques sont réévalués chaque fois qu'une propriété change.

| Effet | Argument | Description |
| ---- | ----------- | --- |
| persistent_size | boolean | Pour les fenêtres flottantes, stocke leur taille en interne. Quand une nouvelle fenêtre flottante s'ouvre avec la même classe et le même titre, restaure la taille sauvegardée. |
| no_max_size | boolean | Supprime les limitations de taille maximale. |
| stay_focused | boolean | Force le focus sur la fenêtre tant qu'elle est visible. |
| animation | string | Force une animation sur une fenêtre avec un style optionnel. Par ex. `"popin"` ou `"popin 80%"`. |
| border_color | gradient | Force la couleur de bordure. Accepte une couleur, un gradient, ou deux gradients (actif/inactif). Par ex. `"rgb(FF0000)"` ou `{ colors = {"rgba(33ccffee)", "rgba(00ff99ee)"}, angle = 45 }`. |
| idle_inhibit | string | Définit une règle d'inhibition d'inactivité. Modes : `"none"`, `"always"`, `"focus"`, `"fullscreen"`. |
| opacity | string | Multiplicateur d'opacité additionnel. Par ex. `"0.8"` (global), `"0.9 0.7"` (actif/inactif), `"1.0 0.8 0.9"` (actif/inactif/plein écran). Ajoutez `" override"` après chaque valeur pour la définir en absolu plutôt qu'en multiplicateur. |
| tag | string | Applique un tag. Utilisez le préfixe `+`/`-` pour définir/retirer, ou aucun préfixe pour basculer. Par ex. `"+myTag"`. |
| max_size | vec2 | Définit la taille maximale pour les fenêtres flottantes. Par ex. `{ 800, 600 }`. |
| min_size | vec2 | Définit la taille minimale pour les fenêtres flottantes. Par ex. `{ 200, 150 }`. |
| border_size | integer | Définit la taille de bordure. |
| rounding | integer | Force X pixels d'arrondi, en ignorant la valeur par défaut. |
| rounding_power | number | Remplace la puissance d'arrondi pour la fenêtre. |
| allows_input | boolean | Force une fenêtre XWayland à recevoir des entrées même si elle demande le contraire. |
| dim_around | boolean | Assombrit tout ce qui entoure la fenêtre. Destiné aux fenêtres flottantes. |
| decorate | boolean | Si les décorations de fenêtre doivent être dessinées. (par défaut : `true`) |
| focus_on_activate | boolean | Si Hyprland doit donner le focus à une application qui en fait la demande. |
| keep_aspect_ratio | boolean | Force le rapport d'aspect lors d'un redimensionnement à la souris. |
| nearest_neighbor | boolean | Force le filtrage au plus proche voisin. |
| no_anim | boolean | Désactive les animations pour la fenêtre. |
| no_blur | boolean | Désactive le flou pour la fenêtre. |
| no_dim | boolean | Désactive l'assombrissement pour la fenêtre. |
| no_focus | boolean | Désactive le focus sur la fenêtre. |
| no_follow_mouse | boolean | Empêche la fenêtre de recevoir le focus quand la souris passe dessus lorsque `input.follow_mouse=1` est défini. |
| no_shadow | boolean | Désactive les ombres pour la fenêtre. |
| no_wobble | boolean | Désactive l'effet « wobble » pour la fenêtre. |
| no_shortcuts_inhibit | boolean | Interdit à l'application d'inhiber vos raccourcis. |
| no_screen_share | boolean | Masque la fenêtre et ses popups du partage d'écran en dessinant des rectangles noirs à leur place. |
| no_vrr | boolean | Désactive le VRR pour la fenêtre. Ne fonctionne que lorsque `misc.vrr` est défini à `2` ou `3`. |
| no_auto_hdr | boolean | Désactive l'AutoHDR pour la fenêtre. Utile pour empêcher des programmes comme `foot` de déclencher l'AutoHDR quand ils passent en plein écran. |
| opaque | boolean | Force la fenêtre à être opaque. |
| force_rgbx | boolean | Force Hyprland à ignorer totalement le canal alpha. |
| sync_fullscreen | boolean | Si le mode plein écran doit toujours être le même que celui envoyé à la fenêtre. |
| immediate | boolean | Force la fenêtre à autoriser le tearing. |
| xray | boolean | Définit le mode xray du flou pour la fenêtre. |
| render_unfocused | boolean | Force la fenêtre à penser qu'elle est rendue même si elle n'est pas visible. |
| scroll_mouse | number | Force la fenêtre à remplacer `input.scroll_factor`. |
| scroll_touchpad | number | Force la fenêtre à remplacer `input.touchpad.scroll_factor`. |
| confine_pointer | boolean | Verrouille le curseur de la souris à la fenêtre. Surtout utile pour garder le curseur de la souris verrouillé sur un moniteur en jouant. |
| tonemap | string | Comportement de tonemapping : `on` (par défaut), `off` désactive le tonemapping, `clamp` limite la luminance source à la cible, `limited` utilise une courbe dynamique pour ne tonemapper que le contenu au-delà des limites hautes. |
| no_xdg_drags | boolean | Si vrai, désactivera les glissements pilotés par XDG pour la fenêtre (par ex. glisser une barre supérieure CSD) |

Tous les effets dynamiques peuvent être définis avec `set_prop`.

### Options de règle de fenêtre `group`

L'effet `group` prend une chaîne avec des options séparées par des espaces :

- `"set"` \[`"always"`\] - Ouvre la fenêtre en tant que groupe.
- `"new"` - Raccourci pour `"barred set"`.
- `"lock"` \[`"always"`\] - Verrouille le groupe. À combiner avec `"set"` ou `"new"`.
- `"barred"` - Ne pas grouper automatiquement dans le groupe déverrouillé focalisé.
- `"deny"` - N'autorise pas la fenêtre à être basculée en tant que groupe ou ajoutée à un groupe.
- `"invade"` - Force l'ouverture de la fenêtre dans le groupe verrouillé.
- `"override"` \[autres options\] - Remplace les autres règles `group`.
- `"unset"` - Efface toutes les règles `group`.

> [!NOTE]
> `group` sans options est un raccourci pour `group = "set"`.
>
> Par défaut, `set` et `lock` n'affectent les nouvelles fenêtres qu'une seule fois. Le qualificatif `always`
> les rend toujours effectifs.

### Tags

Les tags de fenêtre peuvent être statiques ou dynamiques. Les tags dynamiques ont un suffixe `*`.
Vérifiez les tags de fenêtre avec `hyprctl clients`.

Utilisez le dispatcher `tagwindow` pour ajouter un tag statique à une fenêtre :

```bash
hyprctl dispatch 'hl.dsp.window.tag({ tag = "+code" })'     # Add tag to current window.
hyprctl dispatch 'hl.dsp.window.tag({ tag = "-code" })'     # Remove tag from current window.
hyprctl dispatch 'hl.dsp.window.tag({ tag = "code" })'      # Toggle the tag of current window.

# Or target windows:
hyprctl dispatch 'hl.dsp.window.tag({ tag = "+music", window = "class:Celluloid" })'
```

Utilisez l'effet `tag` pour ajouter un tag dynamique à une fenêtre :

```lua
hl.window_rule({ match = { class = "footclient" }, tag = "+term" })   -- Add dynamic tag `term*`
hl.window_rule({ match = { class = "footclient" }, tag = "term" })    -- Toggle dynamic tag `term*`
hl.window_rule({ match = { tag = "cpp" },          tag = "+code" })   -- Add `code*` to windows tagged `cpp`
hl.window_rule({ match = { tag = "code" },         opacity = "0.8" }) -- Set opacity for tag `code` or `code*`
hl.window_rule({ match = { tag = "cpp" },          opacity = "0.7" }) -- `cpp`-tagged windows match both; last wins
hl.window_rule({ match = { tag = "term*" },        opacity = "0.6" }) -- Match `term*` only, not bare `term`
hl.window_rule({ match = { tag = "term" },         tag = "-code" })   -- Remove dynamic tag `code*` from `term`/`term*`
```

Ou avec un raccourci clavier pour plus de commodité :

```lua
hl.bind("SUPER + CTRL + 2", hl.dsp.window.tag({ tag = "alpha_0.2" }))
hl.bind("SUPER + CTRL + 4", hl.dsp.window.tag({ tag = "alpha_0.4" }))
hl.window_rule({ match = { tag = "alpha_0.2" }, opacity = "0.2 override" })
hl.window_rule({ match = { tag = "alpha_0.4" }, opacity = "0.4 override" })
```

L'effet `tag` ne peut manipuler que les tags dynamiques, et le dispatcher `tagwindow`
ne fonctionne qu'avec les tags statiques (les tags dynamiques sont effacés quand le
dispatcher est appelé).

### Exemples de règles

```lua
-- Move kitty to 100 100 and add an anim style (named rule)
hl.window_rule({
  name      = "move-kitty",
  match     = { class = "kitty" },
  move      = {100, 100},
  animation = "popin",
})

-- Disable blur for firefox
hl.window_rule({ match = { class = "firefox" }, no_blur = true })

-- Move kitty to the center of the cursor
hl.window_rule({
  match = { class = "kitty" },
  move  = {"cursor_x-(window_w*0.5)", "cursor_y-(window_h*0.5)"},
})

-- Set border color to red if window is fullscreen
hl.window_rule({
  match        = { fullscreen = true },
  border_color = "rgb(FF0000) rgb(880808)",
})

-- Set border color to yellow when title contains Hyprland
hl.window_rule({
  match        = { title = ".*Hyprland.*" },
  border_color = "rgb(FFFF00)",
})

-- Set opacity to 1.0 active, 0.5 inactive and 0.8 fullscreen for kitty
hl.window_rule({
  match   = { class = "kitty" },
  opacity = "1.0 override 0.5 override 0.8 override",
})

-- Set rounding to 10 for kitty
hl.window_rule({ match = { class = "kitty" }, rounding = 10 })

-- Fix pinentry losing focus
hl.window_rule({
  match       = { class = "(pinentry-)(.*)" },
  stay_focused = true,
})
```

### Notes

Les effets marqués comme *Dynamiques* sont réévalués chaque fois que la propriété correspondante
de la fenêtre change. Par exemple, si une règle change `border_color`
quand une fenêtre est flottante, la couleur revient à sa valeur par défaut lorsqu'elle redevient en mosaïque.

Les effets sont traités de haut en bas - la *dernière* correspondance a la priorité :

```lua
hl.window_rule({ match = { class = "kitty" },        opacity = "0.8 0.8" })
hl.window_rule({ match = { float = true },           opacity = "0.5 0.5" })
```

Ici, toutes les fenêtres kitty non plein écran ont `opacity 0.8`, sauf lorsqu'elles sont
flottantes - celles-ci obtiennent `0.5`. Toutes les autres fenêtres flottantes obtiennent `0.5`.

```lua
hl.window_rule({ match = { float = true },           opacity = "0.5 0.5" })
hl.window_rule({ match = { class = "kitty" },        opacity = "0.8 0.8" })
```

Ici, toutes les fenêtres kitty obtiennent `opacity 0.8`, même flottantes. Les autres fenêtres
flottantes obtiennent `0.5`.

> [!IMPORTANT]
> Les règles nommées ont la priorité sur les règles anonymes. Les règles sont évaluées de haut
> en bas, mais toutes les règles nommées sont évaluées en premier, puis toutes les anonymes.

> [!NOTE]
> L'opacité est un PRODUIT de toutes les opacités par défaut. Par exemple, définir
> `active_opacity` à `0.5` et `opacity` à `0.5` donne un total de
> `0.25`. Des opacités supérieures à `1.0` sont autorisées, mais tout produit dépassant `1.0`
> causera des artefacts graphiques.
>
> Utilisez `" override"` après une valeur d'opacité pour la définir comme une valeur exacte plutôt
> qu'un multiplicateur :
>
> ```lua
> -- Active 0.8, inactive 0.8, fullscreen 1.0 regardless of other rules:
> hl.window_rule({
>   match   = { class = "kitty" },
>   opacity = "0.8 override 0.8 override 1.0 override",
> })
> ```

### Activer / désactiver / modifier des règles dynamiquement

Seules les règles nommées peuvent être modifiées, activées ou désactivées dynamiquement.
`hl.window_rule()` retourne un objet handle :

```lua
local myRule = hl.window_rule({
  name  = "my-rule",
  match = { class = "kitty" },
  border_size = 5,
})

myRule:set_enabled(false)  -- disable
myRule:set_enabled(true)   -- re-enable
myRule:is_enabled()        -- query status
```

## Règles de calque (Layer Rules)

Certains éléments dans Wayland ne sont pas des fenêtres, mais des calques (layers) - lanceurs d'applications, barres
d'état, fonds d'écran, etc. Ceux-ci ont des règles séparées utilisant `hl.layer_rule()`.
La syntaxe est la même que celle de `hl.window_rule()`.

### Props

| Champ | Argument | Description |
| -------------- | --------------- | --- |
| namespace | \[RegEx\] | Namespace du calque. Vérifiez avec `hyprctl layers`. |

### Effets

| Effet | Argument | Description |
| ---- | ----------- | --- |
| no_anim | boolean | Désactive les animations. |
| blur | boolean | Active le flou pour le calque. |
| blur_popups | boolean | Active le flou pour les popups. |
| ignore_alpha | number | Fait ignorer au flou les pixels avec une opacité de `a` ou moins. Flottant de `0` à `1`. |
| dim_around | boolean | Assombrit tout ce qui se trouve derrière le calque. |
| xray | boolean | Définit le mode xray du flou pour le calque. |
| animation | string | Définit un style d'animation spécifique pour ce calque. |
| order | integer | Définit l'ordre relatif aux autres calques. Un `n` plus élevé = plus proche du bord du moniteur. Peut être négatif. |
| above_lock | integer | Si différent de zéro, affiche le calque au-dessus de l'écran de verrouillage. `2` = interactif sur l'écran de verrouillage. |
| no_screen_share | boolean | Masque le calque du partage d'écran. |

### Exemples

```lua
-- Enable blur for waybar
hl.layer_rule({ match = { namespace = "waybar" }, blur = true })

-- Named layer rule
local selectionRule = hl.layer_rule({
  name      = "no-anim-for-selection",
  match     = { namespace = "selection" },
  no_anim   = true,
})

-- Enable blur and ignore_alpha for rofi
hl.layer_rule({
  match        = { namespace = "rofi" },
  blur         = true,
  ignore_alpha = 0.5,
})
```

Les règles de calque retournent également un handle avec `set_enabled()` / `is_enabled()` :

```lua
local myLayerRule = hl.layer_rule({
  name  = "my-layer-rule",
  match = { namespace = "waybar" },
  blur  = true,
})
myLayerRule:set_enabled(false)
```
