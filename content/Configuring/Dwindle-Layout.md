---
weight: 11
title: Dwindle Layout
---

Dwindle is a BSPWM-like layout, where every window on a workspace is a member of
a binary tree.

## Quirks

Dwindle splits are NOT PERMANENT. The split is determined dynamically with the
W/H ratio of the parent node. If W > H, it's side-by-side. If H > W, it's
top-and-bottom. You can make them permanent by enabling `preserve_split`.

## Config

category name: `dwindle`

| name | description | type | default |
| --- | --- | --- | --- |
| pseudotile | enable pseudotiling. Pseudotiled windows retain their floating size when tiled. | bool | false |
| force_split | 0 -> split follows mouse, 1 -> always split to the left (new = left or top) 2 -> always split to the right (new = right or bottom) | int | 0 |
| preserve_split | if enabled, the split (side/top) will not change regardless of what happens to the container. | bool | false |
| smart_split | if enabled, allows a more precise control over the window split direction based on the cursor's position. The window is conceptually divided into four triangles, and cursor's triangle determines the split direction. This feature also turns on preserve_split. | bool | false |
| smart_resizing | if enabled, resizing direction will be determined by the mouse's position on the window (nearest to which corner). Else, it is based on the window's tiling position. | bool | true |
| permanent_direction_override | if enabled, makes the preselect direction persist until either this mode is turned off, another direction is specified, or a non-direction is specified (anything other than l,r,u/t,d/b) | bool | false |
| special_scale_factor | specifies the scale factor of windows on the special workspace [0 - 1] | float | 1 |
| split_width_multiplier | specifies the auto-split width multiplier. Multiplying window size is useful on widescreen monitors where window W > H even after several splits. | float | 1.0 |
| use_active_for_splits | whether to prefer the active window or the mouse position for splits | bool | true |
| default_split_ratio | the default split ratio on window open. 1 means even 50/50 split. [0.1 - 1.9] | float | 1.0 |
| split_bias | specifies which window will receive the larger half of a split. positional - 0, current window - 1, opening window - 2 [0/1/2] | int | 0 |
| precise_mouse_move | bindm movewindow will drop the window more precisely depending on where your mouse is. | bool | false |
| single_window_aspect_ratio | whenever only a single window is shown on a screen, add padding so that it conforms to the specified aspect ratio. A value like `4 3` on a 16:9 screen will make it a 4:3 window in the middle with padding to the sides. | Vec2D | 0 0 |
| single_window_aspect_ratio_tolerance | sets a tolerance for `single_window_aspect_ratio`, so that if the padding that would have been added is smaller than the specified fraction of the height or width of the screen, it will not attempt to adjust the window size [0 - 1] | int | 0.1 | 

## Bind Dispatchers

| dispatcher | description | params |
| --- | --- | --- |
| pseudo | toggles the given window's pseudo mode | left empty / `active` for current, or `window` for a specific window |

## Layout messages

Dispatcher `layoutmsg` params:

| param | description | args |
| --- | --- | --- |
| togglesplit | toggles the split (top/side) of the current window. `preserve_split` must be enabled for toggling to work. | none |
| swapsplit | swaps the two halves of the split of the current window. | none |
| preselect | A one-time override for the split direction. (valid for the next window to be opened, only works on tiled windows) | direction |
| movetoroot | moves the selected window (active window if unspecified) to the root of its workspace tree. The default behavior maximizes the window in its current subtree. If `unstable` is provided as the second argument, the window will be swapped with the other subtree instead. It is not possible to only provide the second argument, but `movetoroot active unstable` will achieve the same result. | [window, [ string ]] |

e.g.:

```ini
bind = SUPER, A, layoutmsg, preselect l
```
