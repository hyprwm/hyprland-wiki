---
weight: 10
title: Gestes
---

> [!NOTE]
> Vous cherchez l'ancienne syntaxe hyprlang ? Consultez les [pages du wiki 0.54](https://wiki.hypr.land/0.54.0/).
> Depuis Hyprland 0.55, hyprlang est devenu obsolète au profit de lua.

## Général

Hyprland prend en charge les gestes 1:1 pour le trackpad pour certaines opérations. La syntaxe de base ressemble à ceci :

```lua
hl.gesture({
  fingers = 3,
  direction = "...",
  action = "...",
})
```

Vous pouvez restreindre les gestes à un modificateur avec `mods`, ou ajuster la vitesse d'animation avec `scale` :

```lua
hl.gesture({ fingers = 3, direction = "horizontal", action = "workspace" })
hl.gesture({ fingers = 3, direction = "down", mods = "ALT", action = "close" })
hl.gesture({ fingers = 3, direction = "up", mods = "SUPER", scale = 1.5, action = "fullscreen" })
hl.gesture({ fingers = 3, direction = "left", scale = 1.5, action = "float" })
```

### Directions

Les directions suivantes sont prises en charge :

| direction | Description |
| --- | --- |
| swipe | tout balayage |
| horizontal | balayage horizontal |
| vertical | balayage vertical |
| left, right, up, down | directions de balayage |
| pinch | tout pincement |
| pinchin, pinchout | pincement directionnel |

### Actions

Spécifier `unset` comme action retirera un geste spécifique précédemment défini. Notez que cela doit correspondre exactement à tout
ce qui définissait le geste original, y compris la direction, les mods, le nombre de doigts et l'échelle.

| action | Description | Arguments supplémentaires |
| --- | --- | --- |
| _fonction lua_ | Exécute une fonction lua nommée ou une fonction lambda lua. Voir ci-dessous. | aucun |
| workspace | Geste de balayage d'espace de travail, pour changer d'espace de travail. | aucun |
| move | Déplace la fenêtre active. | aucun |
| resize | Redimensionne la fenêtre active. | aucun |
| special | Bascule un espace de travail spécial. | `workspace_name`, explicite de lui-même |
| close | Ferme la fenêtre active. | aucun |
| fullscreen | Met la fenêtre active en plein écran. | `mode` peut être `"maximize"` pour maximiser au lieu de mettre en plein écran |
| float | Rend la fenêtre active flottante. | `mode` peut être `"float"` ou `"tile"` pour forcer une direction de flottement |
| cursor_zoom | Zoome sur le curseur. | `zoom_level` pour un facteur de zoom, `mode` de `"mult"` pour utiliser un multiplicateur ou `"live"` pour mettre à jour en continu pendant le pincement |
| scroll_move | Fait défiler la bande, si la disposition actuelle est scrolling | aucun |

#### cursorZoom

Exemples :

```lua
hl.gesture({ fingers = 2, direction = "pinch", action = "cursorZoom", zoom_level = 2 })
hl.gesture({ fingers = 2, direction = "pinch", action = "cursorZoom", zoom_level = 1.2, mode = "mult" })
hl.gesture({ fingers = 2, direction = "pinch", action = "cursorZoom", zoom_level = 1, mode = "live" })
```

`cursorZoom` bascule par défaut. `mult` multiplie la valeur de zoom actuelle.

`live` ajuste le zoom en continu selon l'échelle du pincement et garde le zoom ancré à la position du curseur au début du geste. L'argument numérique est actuellement inutilisé en mode `live`, donc `1` est un bon placeholder.

#### Fonction Lua

La fonction lua peut être nommée ou être une lambda.

Un exemple de lambda :
```lua
hl.gesture({
  fingers = 3,
  direction = "up",
  action = function()
    hl.notification.create({ text = "I just swiped on my trackpad!", timeout = 5000, icon = "ok" })
  end
})
```

Un exemple de fonction nommée :
```lua
local swipe = function()
  hl.notification.create({ text = "I just swiped on my trackpad!", timeout = 5000, icon = "ok" })
end

hl.gesture({
  fingers = 3,
  direction = "up",
  action = swipe
})
```

#### Gestes lua en direct (live)

Pour les gestes en direct, c.-à-d. ceux qui réagissent à l'état du geste, passez une table au lieu d'une lambda,
qui possède les méthodes `start`, `update` et `finish`.

Les méthodes `start` et `update` reçoivent une table avec les champs suivants :

| Champ | Type | Description |
| --- | --- | --- |
| type | string | Soit `swipe` soit `pinch` |
| time_ms | integer | L'horodatage auquel l'événement s'est produit, mesuré depuis le démarrage du système |
| fingers | integer | Nombre de doigts (2–9) |
| delta.x | float | Mouvement horizontal relatif à la dernière mise à jour. Le mouvement vers la droite est positif, vers la gauche est négatif |
| delta.y | float | Mouvement vertical relatif à la dernière mise à jour. Le mouvement vers le bas est positif, vers le haut est négatif |
| scale | float | Le changement de taille de l'arrangement des doigts, relatif au début du geste. L'écartement est positif, le pincement est négatif. `Nil` si le type de geste n'est pas `pinch` |
| rotation | float | Le changement d'angle de l'arrangement des doigts, relatif à la dernière mise à jour. Le sens horaire est positif, l'antihoraire est négatif. `Nil` si le type de geste n'est pas `pinch` |

La méthode `finish` reçoit une table avec les champs suivants :

| Champ | Type | Description |
| --- | --- | --- |
| type | string | Soit `swipe` soit `pinch` |
| time_ms | integer | L'horodatage auquel l'événement s'est produit, mesuré depuis le démarrage du système |
| cancelled | boolean | Vrai si le geste a été terminé anormalement par le backend. Faux sinon |

Par exemple :

```lua
-- Output all events as notifications, for testing
hl.gesture({
  fingers = 3,
  direction = "horizontal",
  action = {
    start = function(e) hl.notification.create({ text = "start: type=" .. e.type .. " time_ms=" .. e.time_ms .. " fingers=" .. e.fingers .. " delta=(" .. e.delta.x .. ", " .. e.delta.y .. ")", timeout = 1000, icon = 1}) end,
    update = function(e) hl.notification.create({ text = "update: type=" .. e.type .. " time_ms=" .. e.time_ms .. " fingers=" .. e.fingers .. " delta=(" .. e.delta.x .. ", " .. e.delta.y .. ")", timeout = 1000, icon = 1}) end,
    finish = function(e) hl.notification.create({ text = "finish: type=" .. e.type .. " time_ms=" .. e.time_ms .. " cancelled=" .. tostring(e.cancelled), timeout = 1000, icon = 1}) end
  }
})

-- Output all events as notifications, for testing
hl.gesture({
  fingers = 3,
  direction = "pinch",
  action = {
    start = function(e) hl.notification.create({ text = "start: type=" .. e.type .. " time_ms=" .. e.time_ms .. " fingers=" .. e.fingers .. " delta=(" .. e.delta.x .. ", " .. e.delta.y .. ") scale=" .. e.scale .. " rotation=" .. e.rotation, timeout = 1000, icon = 1}) end,
    update = function(e) hl.notification.create({ text = "update: type=" .. e.type .. " time_ms=" .. e.time_ms .. " fingers=" .. e.fingers .. " delta=(" .. e.delta.x .. ", " .. e.delta.y .. ") scale=" .. e.scale .. " rotation=" .. e.rotation, timeout = 1000, icon = 1}) end,
    finish = function(e) hl.notification.create({ text = "finish: type=" .. e.type .. " time_ms=" .. e.time_ms .. " cancelled=" .. tostring(e.cancelled), timeout = 1000, icon = 1}) end
  }
})

-- Adjust volume
local volume_gesture = function(change) hl.exec_cmd("wpctl set-volume @DEFAULT_AUDIO_SINK@ " .. math.abs(change) .. "%" .. (change<0 and "-" or "+")) end
hl.gesture({
  fingers = 3,
  direction = "vertical",
  action = {
    start = function(e) volume_gesture(-0.25 * e.delta.y) end,
    update = function(e) volume_gesture(-0.25 * e.delta.y) end
  }
})
```

### Champs

| Champ | Type | Description |
| --- | --- | --- |
| fingers | integer | Nombre de doigts (2–9) |
| direction | string | Direction du geste (voir ci-dessus) |
| action | string | Action à effectuer (voir ci-dessus) |
| mods | string | Masque de modificateur optionnel, par ex. `"SUPER"` ou `"ALT SHIFT"` |
| scale | float | Multiplicateur de delta de geste optionnel |
| disable_inhibit | boolean | Si vrai, permet au geste de contourner les inhibiteurs de raccourci |

Certains gestes peuvent avoir leurs propres champs supplémentaires, qui ont été mentionnés dans le tableau des actions plus haut.

### Exemples

Exécuter une fonction lambda lua, ouvrir un terminal avec un balayage à 4 doigts vers le haut :

```lua
hl.gesture({ fingers = 4, direction = "up", action = function() hl.exec_cmd("kitty") end })
```

Basculer un espace de travail spécial avec un balayage à 4 doigts vers le bas, uniquement en maintenant SUPER, en contournant les inhibiteurs :

```lua
hl.gesture({ fingers = 4, direction = "down", mods = "SUPER", action = "special", workspace_name = "scratchpad", disable_inhibit = true })
```

Zoomer sur le curseur avec un pincement, en utilisant un multiplicateur au lieu d'un niveau de zoom fixe :

```lua
hl.gesture({ fingers = 2, direction = "pinchin", action = "cursorZoom", zoom_level = 2.0, mode = "mult" })
```
