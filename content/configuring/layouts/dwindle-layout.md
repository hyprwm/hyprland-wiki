---
weight: 10
title: Dwindle layout
---

Dwindle is a BSPWM-like layout, where every window on a workspace is a member of a binary tree.

<video width="1024" height="566" autoplay muted loop>
  <source src="https://dl.hypr.land/wiki/demo_dwindle.mp4" type="video/mp4">
</video>

## Quirks

Dwindle splits are NOT PERMANENT.
The split is determined dynamically with the W/H ratio of the parent node.
If W > H, it's side-by-side.
If H > W, it's top-and-bottom.
You can make them permanent by enabling `preserve_split`.

## Config

Path: `dwindle`

| Name | Description | Type | Default | Limits |
| --- | --- | --- | --- | --- |
| force_split | 0 - split follows mouse, 1 - always split to the left (new = left or top), 2 - always split to the right (new = right or bottom) | int | `0` | [0 - 2] |
| preserve_split | If enabled, the split (side/top) will not change regardless of what happens to the container | bool | `false` | |
| smart_split | If enabled, allows a more precise control over the window split direction based on the cursor's position. The window is conceptually divided into four triangles, and cursor's triangle determines the split direction. This feature also turns on `preserve_split` | bool | `false` | |
| smart_resizing | If enabled, resizing direction will be determined by the mouse's position on the window (nearest to which corner). Otherwise, it is based on the window's tiling position | bool | `true` | |
| permanent_direction_override | If enabled, makes the preselect direction persist until either this mode is turned off, another direction is specified, or a non-direction is specified (anything other than `l`, `r`, `u`/`t`, `d`/`b`) | bool | `false` | |
| special_scale_factor | Specifies the scale factor of windows on the special workspace | float | `1` | [0 - 1] |
| split_width_multiplier | Specifies the auto-split width multiplier. Multiplying window size is useful on widescreen monitors where window W > H even after several splits | float | `1.0` | [0.1 - 3.0] |
| use_active_for_splits | Whether to prefer the active window or the mouse position for splits | bool | `true` | |
| default_split_ratio | The default split ratio on window open. 1 means an even 50/50 split | float | `1.0` | [0.1 - 1.9] |
| split_bias | Specifies which window will receive the split ratio. 0 - directional (the top or left window), 1 - the current window | int | `0` | [0 - 1] |
| precise_mouse_move | Dragging and dropping windows will place them more precisely, based on where your mouse is | bool | `false` | |

## Dispatchers

| Dispatcher | Description | Params |
| --- | --- | --- |
| window.pseudo | Toggles the given window's pseudo mode | Left empty/`"active"` for current, or `"window"` for a specific window | |

## Layout messages

<!-- TODO: we should make a petition to rework all layoutmsgs for Lua, current syntax is just AWFUL -->

Dispatcher `hl.dsp.layout()` arguments:

| Param | Description | Args |
| --- | --- | --- |
| movetoroot | Moves the window to the root of the workspace tree. See the note [below](#movetoroot) | window?, "unstable"? |
| preselect | A one-time override for the split direction, valid for the next window to be opened, only works on tiled windows | direction |
| rotatesplit | Rotates the split of the current window by an optionally specified angle. Angle must be a multiple of 90. Positive is clockwise, negative is counter-clockwise | int? = 90 |
| splitratio | Changes the split ratio. See the note [below](#splitratio) | float |
| swapsplit | Swaps the two halves of the split of the current window | None |
| togglesplit | Toggles the split (top/side) of the current window. `preserve_split` must be enabled for toggling to work | None |

### movetoroot

Make the specified window a child of its most immediate root node on the workspace.
If the window is already a direct child of the root node, a warning is produced instead.

The default behavior is "stable" in that the focused window remains on the same side of screen.
Adding `unstable` as the second argument will instead swap the positions of the root node's immediate children (i.e. which side of the screen they're on).

Note that `movetoroot unstable` is *not* valid, but `movetoroot active unstable` is the proper way to achieve this.

### splitratio

`splitratio` uses delta value by default, add `exact` after a value to set it instead.
A positive delta is used by default.
To specify direction, prefix the value with plus (`+`) or minus (`-`) sign.

Values outside of the [0.1 - 1.9] range will be clamped to the nearest limit.

{{% details title="Examples" closed="true" %}}

```lua
-- Use movetoroot on window with "imcool" class
hl.bind("SUPER + A", hl.dsp.layout("movetoroot class:imcool"))

hl.bind("SUPER + A", hl.dsp.layout("togglesplit"))

-- Set split ratio to 1.2
hl.bind("SUPER + A", hl.dsp.layout("splitratio 1.2 exact"))

-- Make split ratio 0.8 after previous dispatch
hl.bind("SUPER + A", hl.dsp.layout("splitratio -0.4"))
```

{{% /details %}}
