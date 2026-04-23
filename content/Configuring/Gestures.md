---
weight: 10
title: Gestures
---

## General

Hyprland supports 1:1 gestures for the trackpad for some operations. The basic syntax looks like this:

```lua
hl.gesture({
  fingers = 3,
  direction = "...",
  action = "...",
})
```

You can restrict gestures to a modifier with `mods`, or scale the animation speed with `scale`:

```lua
hl.gesture({ fingers = 3, direction = "horizontal", action = "workspace" })
hl.gesture({ fingers = 3, direction = "down", mods = "ALT", action = "close" })
hl.gesture({ fingers = 3, direction = "up", mods = "SUPER", scale = 1.5, action = "fullscreen" })
hl.gesture({ fingers = 3, direction = "left", scale = 1.5, action = "float" })
```

### Directions

The following directions are supported:

| direction | Description |
| --- | --- |
| swipe | any swipe |
| horizontal | horizontal swipe |
| vertical | vertical swipe |
| left, right, up, down | swipe directions |
| pinch | any pinch |
| pinchin, pinchout | directional pinch |

### Actions

Specifying `unset` as the action will unset a specific gesture that was previously set. Please note it needs to exactly match everything
from the original gesture including direction, mods, fingers and scale.

| action | Description | Arguments |
| --- | --- | --- |
| _lua function_ | Executes a named lua function or lua lambda function. See below. | none |
| workspace | Workspace swipe gesture, for switching workspaces. | none |
| move | Moves the active window. | none |
| resize | Resizes the active window. | none |
| special | Toggles a special workspace. | `arg` = special workspace name without `special:`, e.g. `"mySpecialWorkspace"` |
| close | Closes the active window. | none |
| fullscreen | Fullscreens the active window. | none for fullscreen, `arg = "maximize"` for maximize |
| float | Floats the active window. | none to toggle, `arg = "float"` or `arg = "tile"` for one-way |
| cursorZoom | Zooms into the cursor. | `arg` = zoom factor, add `arg2 = "mult"` for a multiplier instead of toggle |

#### Lua function

The lua function can be named or a lambda.

Example of lambda:
```lua
hl.gesture({
  fingers = 3,
  direction = "up",
  action = function()
    hl.notification.create({ text = "I just swiped on my trackpad!", duration = 5000, icon = "ok" })
  end
})
```

Example of named function:
```lua
local swipe = function()
  hl.notification.create({ text = "I just swiped on my trackpad!", duration = 5000, icon = "ok" })
end

hl.gesture({
  fingers = 3,
  direction = "up",
  action = swipe
})
```

### Fields

| Field | Type | Description |
| --- | --- | --- |
| fingers | integer | Number of fingers (2–9) |
| direction | string | Gesture direction (see above) |
| action | string | Action to perform (see above) |
| mods | string | Optional modifier mask, e.g. `"SUPER"` or `"ALT SHIFT"` |
| scale | float | Optional animation speed multiplier |
| arg | string | Optional first argument for the action |
| arg2 | string | Optional second argument for the action |
| disable_inhibit | boolean | If true, allows the gesture to bypass shortcut inhibitors |

### Examples

Run a lua lambda function, open a terminal with a 4-finger swipe up:

```lua
hl.gesture({ fingers = 4, direction = "up", action = function() hl.exec_cmd("kitty") end })
```

Toggle a special workspace with a 4-finger swipe down, only when holding SUPER, bypassing inhibitors:

```lua
hl.gesture({ fingers = 4, direction = "down", mods = "SUPER", action = "special", arg = "scratchpad", disable_inhibit = true })
```

Zoom into the cursor with a pinch, using a multiplier instead of a fixed zoom level:

```lua
hl.gesture({ fingers = 2, direction = "pinchin", action = "cursorZoom", arg = "2.0", arg2 = "mult" })
```
