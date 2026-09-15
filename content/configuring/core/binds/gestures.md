---
weight: 70
title: Gestures
---

## General

Hyprland supports 1:1 trackpad gestures for some operations.
The basic syntax looks like this:

```lua
hl.gesture({
    action = "...",
    direction = "...",
    fingers = int,
})
```

You can restrict gestures to a modifier with `mods`, or scale the animation speed with `scale`:

```lua
hl.gesture({ fingers = 3, direction = "horizontal", action = "workspace" })
hl.gesture({ fingers = 3, direction = "down", mods = "ALT", action = "close" })
hl.gesture({ fingers = 3, direction = "up", mods = "SUPER", scale = 1.5, action = "fullscreen" })
hl.gesture({ fingers = 3, direction = "left", scale = 1.5, action = "float" })
```

### Fields
<!-- SORT: fingers after direction because it is a required field -->
| Field | Description | Type | Limits |
| --- | --- | --- | --- |
| action | Action to perform | string | |
| direction | Gesture direction | string | |
| fingers | Number of fingers | int | [2 - 9] |
| disable_inhibit | If true, allows the gesture to bypass shortcut inhibitors | bool | |
| mods | MOD mask, e.g. `"SUPER"` or `"ALT SHIFT"` | string | |
| scale | Gesture delta multiplier | float | [0.1 - 10.0]|

Some gestures might have their own additional fields, which are described in the [Actions](#actions) table.

### Directions

The following directions are supported:
<!-- SORT: Grouped by: swipe, direction, pinch. Directions are sorted by, I guess, vibe? -->
| Direction | Description |
| --- | --- |
| swipe | Any swipe |
| horizontal | Horizontal swipe |
| vertical | Vertical swipe |
| left | Leftward swipe |
| right | Rightward swipe |
| up | Upward swipe |
| down | Downward swipe |
| pinch | Any pinch |
| pinchin | Inward pinch |
| pinchout | Outward pinch |

### Actions

Specifying `unset` as the action will unset a specific gesture that was previously set.
Please note it needs to exactly match everything from the original gesture including direction, mods, fingers and scale.

<!-- SORT: Lua functions are at the top because they're fancy -->
| Action | Description | Additional arguments |
| --- | --- | --- |
| _lua function_ | Executes a named Lua function or Lua lambda function. See below | none |
| close | Closes the active window | none |
| cursor_zoom | Zooms into the cursor | `zoom_level` for a zoom factor, `mode` of `"mult"` to use a multiplier or `"live"` to update continuously during the pinch |
| float | Floats the active window | `mode` can be `"float"` or `"tile"` to force a direction of floating |
| fullscreen | Fullscreens the active window | `mode` can be `"maximize"` to do maximize instead of fullscreen |
| move | Moves the active window | none |
| resize | Resizes the active window | none |
| scroll_move | Scrolls the tape, if the current layout is scrolling | none |
| special | Toggles a special workspace | Special workspace name |
| workspace | Workspace swipe gesture, for switching workspaces | none |

#### cursor_zoom

Examples:

```lua
hl.gesture({ fingers = 2, direction = "pinch", action = "cursor_zoom", zoom_level = 2 })
hl.gesture({ fingers = 2, direction = "pinch", action = "cursor_zoom", zoom_level = 1.2, mode = "mult" })
hl.gesture({ fingers = 2, direction = "pinch", action = "cursor_zoom", zoom_level = 1, mode = "live" })
```

`cursor_zoom` toggles by default.
`mult` multiplies the current zoom value.
`live` adjusts the zoom continuously to the pinch scale and keeps the zoom anchored to the cursor position at the start of the gesture.
The numeric argument is unused in `live` mode, so `1` is a reasonable placeholder.

#### Lua functions

The Lua function can be named or a lambda.

An example with a lambda:

```lua
hl.gesture({
    fingers = 3,
    direction = "up",
    action = function()
        hl.notification.create({ text = "I just swiped on my trackpad!", timeout = 5000, icon = "ok" })
    end
})
```

An example with a named function:
<!-- TODO: im lazy to boot my laptop and test if it actually works right now, i will remove this comment later -->
```lua
local function swipe()
    hl.notification.create({ text = "I just swiped on my trackpad!", timeout = 5000, icon = "ok" })
end

hl.gesture({
    fingers = 3,
    direction = "up",
    action = swipe
})
```

#### Live Lua gestures

For live gestures, i.e. ones that react to the gesture state, pass a table instead of a lambda, which has `start`, `update` and `finish` methods.

The `start` and `update` methods are passed a table with the following fields:

| Field | Description | Type |
| --- | --- | --- |
| delta.x | Horizontal motion relative to the last update. Right motion is positive, left is negative | float |
| delta.y | Vertical motion relative to the last update. Downwards motion is positive, upwards is negative | float |
| fingers | Number of fingers (2–9) | int |
| rotation | The change in angle of the finger arrangement, relative to the last update. Clockwise is positive, counterclockwise is negative. `Nil` if the gesture type is not `pinch` | float |
| scale | The change in size of the finger arrangement, relative to the start of the gesture. Spread is positive, pinch is negative. `Nil` if the gesture type is not `pinch` | float |
| time_ms | The timestamp at which the even occurred, measured from when the system was booted | int |
| type | Either `swipe` or `pinch` | string |

The `finish` method is passed a table with the following fields:

| Field | Description | Type |
| --- | --- | --- |
| cancelled | True if the gesture was ended abnormally by the backend. False otherwise | bool |
| time_ms | The timestamp at which the even occurred, measured from when the system was booted | int |
| type | Either `swipe` or `pinch` | string |

{{% details title="Examples" closed="true" %}}

```lua
-- Run a Lua lambda function, open a terminal with a 4-finger swipe up:
hl.gesture({ fingers = 4, direction = "up", action = function() hl.exec_cmd("kitty") end })

-- Toggle a special workspace with a 4-finger swipe down, only when holding SUPER, bypassing inhibitors:
hl.gesture({ fingers = 4, direction = "down", mods = "SUPER", action = "special", workspace_name = "scratchpad", disable_inhibit = true })

-- Zoom into the cursor with a pinch, using a multiplier instead of a fixed zoom level:
hl.gesture({ fingers = 2, direction = "pinchin", action = "cursor_zoom", zoom_level = 2.0, mode = "mult" })

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

{{% /details %}}
