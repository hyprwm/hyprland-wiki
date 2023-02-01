# Table of contents

{{< toc >}}

# General

Animations are declared with the `animation` keyword.

```ini
animation=NAME,ONOFF,SPEED,CURVE,STYLE
or
animation=NAME,ONOFF,SPEED,CURVE
```

`ONOFF` can be either 0 or 1, 0 to disable, 1 to enable.

`SPEED` is the amount of ds (1ds = 100ms) the animation will take

`CURVE` is the bezier curve name, see [curves](#curves).

`STYLE` (optional) is the animation style

The animations are a tree. If an animation is unset, it will inherit its
parent's values. See [the animation tree](#animation-tree).

## Examples

```ini
animation=workspaces,1,8,default
animation=windows,1,10,myepiccurve,slide
```

## Animation tree

```txt
global
  ↳ windows - styles: slide, popin
    ↳ windowsIn - window open
    ↳ windowsOut - window close
    ↳ windowsMove - everything in between, moving, dragging, resizing.
  ↳ fade
    ↳ fadeIn - fade in (open) -> layers and windows
    ↳ fadeOut - fade out (close) -> layers and windows
    ↳ fadeSwitch - fade on changing activewindow and its opacity
    ↳ fadeShadow - fade on changing activewindow for shadows
    ↳ fadeDim - the easing of the dimming of inactive windows
  ↳ border - for animating the border's color switch speed
  ↳ borderangle - for animating the border's gradient angle - styles: once (default), loop
  ↳ workspaces - styles: slide, slidevert, fade
    ↳ specialWorkspace - styles: same as workspaces
```

# Curves

Defining your own Bezier curve can be done with the `bezier` keyword:

```ini
bezier=NAME,X0,Y0,X1,Y1
```

where `NAME` is the name, and the rest are two points for the Cubic Bezier. A
good website to design your bezier can be found
[here, on cssportal.com](https://www.cssportal.com/css-cubic-bezier-generator/), but
if you want to instead choose from a list of beziers, you can check out [easings.net](https://easings.net).

## Example

```ini
bezier=overshot,0.05,0.9,0.1,1.1
```

# Extras

For animation style `popin` in `windows`, you can specify a minimum percentage
to start from. For example:

```ini
animation=windows,1,8,default,popin 80%
```

will make the animation 80% -> 100% of the size.
