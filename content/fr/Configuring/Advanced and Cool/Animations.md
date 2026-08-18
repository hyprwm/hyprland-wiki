---
weight: 9
title: Animations
---

> [!NOTE]
> Vous cherchez l'ancienne syntaxe hyprlang ? Consultez les [pages du wiki 0.54](https://wiki.hypr.land/0.54.0/).
> Depuis Hyprland 0.55, hyprlang est devenu obsolète au profit de lua.

## Général

Les animations sont déclarées avec la méthode `hl.animation()`.

Exemple :
```lua
hl.animation({ leaf = STRING, enabled = BOOLEAN, speed = FLOAT, curve = STRING[, style = STRING] })
```
`leaf` est la portée de l'animation. Voir [Arbre d'animation](#animation-tree)

`enabled` utilisez `true` pour activer, `false` pour désactiver. _Note :_ si c'est `false`, vous
pouvez omettre les arguments suivants.

`speed` est le nombre de ds (1ds = 100ms) que l'animation prendra. Par exemple `speed = 1` = 100ms

`bezier` / `spring` est le nom de la courbe, voir [courbes](#curves).

`style` (optionnel) est le style de l'animation. Voir [Arbre d'animation](#animation-tree)

### Exemples

```lua
hl.animation({ leaf = "workspaces", enabled = true, speed = 8, bezier = "my_epic_bezier" })
hl.animation({ leaf = "windows", enabled = true, speed = 10, spring = "my_epic_spring", style = "slide"})
hl.animation({ leaf = "fade", enabled = 0 })
```

### Arbre d'animation
Les animations forment un arbre. Si une animation n'est pas définie, elle héritera des
valeurs de son parent.

```txt
global
  ↳ windows - styles: slide, popin, gnomed
    ↳ windowsIn - window open - styles: same as windows
    ↳ windowsOut - window close - styles: same as windows
    ↳ windowsMove - everything in between, moving, dragging, resizing.
  ↳ layers - styles: slide, popin, fade
    ↳ layersIn - layer open
    ↳ layersOut - layer close
  ↳ fade
    ↳ fadeIn - fade in for window open
    ↳ fadeOut - fade out for window close
    ↳ fadeSwitch - fade on changing activewindow and its opacity
    ↳ fadeShadow - fade on changing activewindow for shadows
    ↳ fadeGlow - fade on changing activewindow for glow
    ↳ fadeDim - the easing of the dimming of inactive windows
    ↳ fadeLayers - for controlling fade on layers
      ↳ fadeLayersIn - fade in for layer open
      ↳ fadeLayersOut - fade out for layer close
    ↳ fadePopups - for controlling fade on wayland popups
      ↳ fadePopupsIn - fade in for wayland popup open
      ↳ fadePopupsOut - fade out for wayland popup close
    ↳ fadeDpms - for controlling fade when dpms is toggled
  ↳ border - for animating the border's color switch speed
  ↳ borderangle - for animating the border's gradient angle - styles: once (default), loop
  ↳ shadowangle - for animating the shadow's gradient angle - styles: once (default), loop
  ↳ glowangle - for animating the glow's gradient angle - styles: once (default), loop
  ↳ workspaces - styles: slide, slidevert, fade, slidefade, slidefadevert
    ↳ workspacesIn - styles: same as workspaces
    ↳ workspacesOut - styles: same as workspaces
    ↳ specialWorkspace - styles: same as workspaces
      ↳ specialWorkspaceIn - styles: same as workspaces
      ↳ specialWorkspaceOut - styles: same as workspaces
  ↳ zoomFactor - animates the screen zoom
  ↳ monitorAdded - monitor added zoom animation
```

> [!WARNING]
> Utiliser le style `loop` pour les animations `*angle` nécessite que Hyprland rende _constamment_ de nouvelles frames à une fréquence égale au taux de rafraîchissement de votre écran (par ex. 60 fois par seconde pour un moniteur 60hz), ce qui peut solliciter votre CPU/GPU et impactera l'autonomie de la batterie. <br>
> Cela s'appliquera même si les animations sont désactivées ou si les décorations concernées ne sont pas visibles.

## Courbes

### Bezier

Une [courbe de Bézier](https://en.wikipedia.org/wiki/B%C3%A9zier_curve) cubique est une spline simple définie par 4 points,
dont deux (les points du milieu) sont configurables.

```lua
hl.curve( NAME, { type = "bezier", points = { {X0, Y0}, {X1, Y1} } })
```

Un bon site pour concevoir votre propre Bézier est [cssportal.com](https://www.cssportal.com/css-cubic-bezier-generator/). <br>
Si vous préférez choisir parmi une liste de Béziers déjà prêtes, vous pouvez consulter [easings.net](https://easings.net).

### Spring

Une courbe spring (ressort) est un type couramment trouvé sur les systèmes Apple, et est définie par la masse, la rigidité
et l'amortissement. Il est généralement recommandé de garder la masse à 1, et d'ajuster uniquement la rigidité et l'amortissement.

```lua
hl.curve( NAME, { type = "spring", mass = MASS, stiffness = STIFF, dampening = DAMP })
```

Plus il y a de « stiffness » (rigidité), plus il y a de vitesse, et plus il y a de « dampening » (amortissement), moins il y a de rebond.

### Exemples

```lua
hl.curve( "overshoot", { type = "bezier", points = { {0.5, 0.9}, {0.1, 1.1} } } )
hl.curve( "rubber", { type = "spring", mass = 1, stiffness = 70, dampening = 10 } )
```

### Extras

Pour le style d'animation `popin` dans `windows`, vous pouvez spécifier un pourcentage minimum
à partir duquel commencer. Par exemple, ce qui suit fera que l'animation ira de 80% à 100% de
la taille :

```lua
hl.animation({ leaf = "windows", enabled = true, speed = 8, curve = "default", style = "popin 80%" })
```

Pour les styles d'animation `slide`, `slidevert`, `slidefade` et `slidefadevert` dans `workspaces`, vous pouvez
spécifier un pourcentage de mouvement. Par exemple, ce qui suit fera que les fenêtres se déplacent de
20% de la largeur de l'écran :

```lua
hl.animation({ leaf = "workspaces", enabled = true, speed = 8, curve = "default", style = "slidefade 20%" })
```

Pour le style d'animation `slide` dans `windows` et `layers`, vous pouvez spécifier un côté forcé. <br>
Vous pouvez choisir entre `top`, `bottom`, `left` ou `right`.

```lua
hl.animation({ leaf = "windows", enabled = true, speed = 8, curve = "default", style = "slide left" })
```
