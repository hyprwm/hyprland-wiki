---
weight: 10
title: Gestures
---

> [!NOTE]
> Looking for the old hyprlang syntax? Check the [0.54 wiki pages](https://wiki.hypr.land/0.54.0/).
> Since Hyprland 0.55, hyprlang is deprecated in favor of lua.

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

| action | Description | Additional arguments |
| --- | --- | --- |
| _lua function_ | Executes a named lua function or lua lambda function. See below. | none |
| workspace | Workspace swipe gesture, for switching workspaces. | none |
| move | Moves the active window. | none |
| resize | Resizes the active window. | none |
| special | Toggles a special workspace. | `workspace_name`, self-explanatory |
| close | Closes the active window. | none |
| fullscreen | Fullscreens the active window. | `mode` can be `"maximize"` to do maximize instead of fullscreen |
| float | Floats the active window. | `mode` can be `"float"` or `"tile"` to force a direction of floating |
| cursor_zoom | Zooms into the cursor. | `zoom_level` for a zoom factor, `mode` of `"mult"` to use a multiplier or `"live"` to update continuously during the pinch |
| scroll_move | Scrolls the tape, if the current layout is scrolling | none |

#### cursorZoom

Examples:

```lua
hl.gesture({ fingers = 2, direction = "pinch", action = "cursorZoom", zoom_level = 2 })
hl.gesture({ fingers = 2, direction = "pinch", action = "cursorZoom", zoom_level = 1.2, mode = "mult" })
hl.gesture({ fingers = 2, direction = "pinch", action = "cursorZoom", zoom_level = 1, mode = "live" })
```

`cursorZoom` toggles by default. `mult` multiplies the current zoom value.

`live` adjusts the zoom continuously to the pinch scale and keeps the zoom anchored to the cursor position at the start of the gesture. The numeric argument is currently unused in `live` mode, so `1` is a good placeholder.

#### Lua function

The lua function can be named or a lambda.

An example of a lambda:
```lua
hl.gesture({
  fingers = 3,
  direction = "up",
  action = function()
    hl.notification.create({ text = "I just swiped on my trackpad!", timeout = 5000, icon = "ok" })
  end
})
```

An example of a named function:
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

#### Live lua gestures

For live gestures, i.e. ones that react to the gesture state, pass a table instead of a lambda,
which has `start`, `update` and `finish` methods.

The `start` and `update` methods are passed a table with the following fields:

| Field | Type | Description |
| --- | --- | --- |
| type | string | Either `swipe` or `pinch` |
| time_ms | integer | The timestamp at which the even occurred, measured from when the system was booted |
| fingers | integer | Number of fingers (2–9) |
| delta.x | float | Horizontal motion relative to the last update. Right motion is positive, left is negative |
| delta.y | float | Vertical motion relative to the last update. Downwards motion is positive, upwards is negative |
| scale | float | The change in size of the finger arrangement, relative to the start of the gesture. Spread is positive, pinch is negative. `Nil` if the gesture type is not `pinch` |
| rotation | float | The change in angle of the finger arrangement, relative to the last update. Clockwise is positive, counterclockwise is negative. `Nil` if the gesture type is not `pinch` |

The `finish` method is passed a table with the following fields:

| Field | Type | Description |
| --- | --- | --- |
| type | string | Either `swipe` or `pinch` |
| time_ms | integer | The timestamp at which the even occurred, measured from when the system was booted |
| cancelled | boolean | True if the gesture was ended abnormally by the backend. False otherwise |

For example:

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
  fingers = 3
  direction = "vertical",
  action = {
    start = function(e) volume_gesture(-0.25 * e.delta.y) end,
    update = function(e) volume_gesture(-0.25 * e.delta.y) end
  },
})
```

### Fields

| Field | Type | Description |
| --- | --- | --- |
| fingers | integer | Number of fingers (2–9) |
| direction | string | Gesture direction (see above) |
| action | string | Action to perform (see above) |
| mods | string | Optional modifier mask, e.g. `"SUPER"` or `"ALT SHIFT"` |
| scale | float | Optional gesture delta multiplier |
| disable_inhibit | boolean | If true, allows the gesture to bypass shortcut inhibitors |

Some gestures might have their own additional fields, those were mentioned in the actions table further up.

### Examples

Run a lua lambda function, open a terminal with a 4-finger swipe up:

```lua
hl.gesture({ fingers = 4, direction = "up", action = function() hl.exec_cmd("kitty") end })
```

Toggle a special workspace with a 4-finger swipe down, only when holding SUPER, bypassing inhibitors:

```lua
hl.gesture({ fingers = 4, direction = "down", mods = "SUPER", action = "special", workspace_name = "scratchpad", disable_inhibit = true })
```

Zoom into the cursor with a pinch, using a multiplier instead of a fixed zoom level:

```lua
hl.gesture({ fingers = 2, direction = "pinchin", action = "cursorZoom", zoom_level = 2.0, mode = "mult" })
```
