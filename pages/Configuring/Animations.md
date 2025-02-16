---
weight: 9
title: Animations
---

## General

Animations are declared with the `animation` keyword.

```ini
animation = NAME, ONOFF, SPEED, CURVE [,STYLE]
```

`ONOFF` can be either 0 or 1, 0 to disable, 1 to enable. _note:_ if it's 0, you
can omit further args.

`SPEED` is the amount of ds (1ds = 100ms) the animation will take

`CURVE` is the bezier curve name, see [curves](#curves).

`STYLE` (optional) is the animation style

The animations are a tree. If an animation is unset, it will inherit its
parent's values. See [the animation tree](#animation-tree).

### Examples

```ini
animation = workspaces, 1, 8, default
animation = windows, 1, 10, myepiccurve, slide
animation = fade, 0
```

### Animation tree

```txt
global
  ↳ windows - styles: slide, popin, gnomed
    ↳ windowsIn - window open
    ↳ windowsOut - window close
    ↳ windowsMove - everything in between, moving, dragging, resizing.
  ↳ layers - styles: slide, popin, fade
    ↳ layersIn - layer open
    ↳ layersOut - layer close
  ↳ fade
    ↳ fadeIn - fade in for window open
    ↳ fadeOut - fade out for window close
    ↳ fadeSwitch - fade on changing activewindow and its opacity
    ↳ fadeShadow - fade on changing activewindow for shadows
    ↳ fadeDim - the easing of the dimming of inactive windows
    ↳ fadeLayers - for controlling fade on layers
      ↳ fadeLayersIn - fade in for layer open
      ↳ fadeLayersOut - fade out for layer close
  ↳ border - for animating the border's color switch speed
  ↳ borderangle - for animating the border's gradient angle - styles: once (default), loop
  ↳ workspaces - styles: slide, slidevert, fade, slidefade, slidefadevert
    ↳ workspacesIn - styles: same as workspaces
    ↳ workspacesOut - styles: same as workspaces
    ↳ specialWorkspace - styles: same as workspaces
      ↳ specialWorkspaceIn - styles: same as workspaces
      ↳ specialWorkspaceOut - styles: same as workspaces
```

{{< callout type=warning >}}

Using borderangle style: loop requires Hyprland to constantly push out new frames at [your monitor's hz] times a second which might put stress on your CPU/GPU and affect battery life. This will be applied even if animation are disabled or borders are not visible.

{{</ callout >}}

## Curves

Defining your own Bezier curve can be done with the `bezier` keyword:

```ini
bezier = NAME, X0, Y0, X1, Y1
```

where `NAME` is the name, and the rest are two points for the Cubic Bezier. A
good website to design your bezier can be found
[here, on cssportal.com](https://www.cssportal.com/css-cubic-bezier-generator/),
but if you want to instead choose from a list of beziers, you can check out
[easings.net](https://easings.net).

### Example

```ini
bezier = overshot, 0.05, 0.9, 0.1, 1.1
```

### Extras

For animation style `popin` in `windows`, you can specify a minimum percentage
to start from. For example, the following will make the animation 80% -> 100% of
the size:

```ini
animation = windows, 1, 8, default, popin 80%
```

For animation styles `slidefade` and `slidefadevert` in `workspaces`, you can
specify a movement percentage. For example, the following will make windows move
20% of the screen width:

```ini
animation = workspaces, 1, 8, default, slidefade 20%
```

For animation style `slide` in windows and layers you can specify a forced side,
e.g.:

```ini
animation = windows, 1, 8, default, slide left
```

You can use `top`, `bottom`, `left` or `right`.
