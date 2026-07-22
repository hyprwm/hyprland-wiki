# HL.GestureSpec

#### *class* HL.GestureSpec

Table accepted by [`hl.gesture()`](../../hl/gesture#hlgesture).

## Shape

```text
{
    fingers = integer,
    direction = string,
    action = string | function,
    mods = string?,
    scale = number?,
    mode = string?,
    zoom_level = string?,
    workspace_name = string?,
    disable_inhibit = boolean?,
}
```

## Fields

fingers
: Number of fingers. Must be between `2` and `9`.

direction
: Direction string parsed by Hyprland’s gesture manager.

action
: Gesture action or callback. See [`hl.gesture()`](../../hl/gesture#hlgesture) for accepted action names.

mods
: Modifier string.

scale
: Gesture delta scale. Must be between `0.1` and `10`.

mode
: Action-specific mode string.

zoom_level
: Action-specific zoom level string.

workspace_name
: Workspace name for the `special` action.

disable_inhibit
: Disable inhibition handling for this gesture.

## Used by

[`hl.gesture()`](../../hl/gesture#hlgesture)
: Register or remove a gesture.
