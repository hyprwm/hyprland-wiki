---
weight: 10
title: Gestures
---

## General

Hyprland supports 1:1 gestures for the trackpad for some operations. The basic syntax looks like this:

```ini
gesture = fingers, direction, action, options
```

Various actions may have their own options, or none. You can drop the options altogether and end
on the action arg if the action takes none.

You can also restrict gestures to a modifier by adding `, mod: [MODMASK]` after `direction`,
or scale the animation's speed by a float by adding `scale: [SCALE]`.

Examples:

```ini
gesture = 3, down, mod: ALT, close
gesture = 3, up, mod: SUPER, scale: 1.5, fullscreen
gesture = 3, left, scale: 1.5, float
```

### Directions

The following directions are supported:
- `swipe` -> any swipe
- `horizontal` -> horizontal swipe
- `vertical` -> vertical swipe
- `left`, `right`, `up`, `down` -> swipe directions
- `pinch` -> any pinch
- `pinchin`, `pinchout` -> directional pinch 

## Available gestures

Specifying `unset` as the gesture will unset a specific gesture that was previously set. Please note it needs to exactly match everything
from the original gesture including direction, mods, fingers and scale.

| gesture | description | arguments |
| -- | -- | -- |
| dispatcher | the most basic, executes a dispatcher once the gesture ends | `dispatcher, params` |
| workspace | workspace swipe gesture, for switching workspaces |
| move | moves the active window | none |
| resize | resizes the active window | none |
| special | toggles a special workspace | special workspace without the `special:`, e.g. `mySpecialWorkspace` |
| close | closes the active window | none |
| fullscreen | fullscreens the active window | none for fullscreen, `maximize` for maximize |
| float | floats the active window | none for toggle, `float` or `tile` for one-way | 

