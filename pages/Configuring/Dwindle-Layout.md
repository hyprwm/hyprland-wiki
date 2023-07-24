Dwindle is a BSPWM-like layout, where every window on a workspace is a member
of a binary tree.

# Quirks

Dwindle splits are NOT PERMANENT. The split is determined dynamically with the
W/H ratio of the parent node. If W > H, it's side-by-side. If H > W, it's
top-and-bottom. You can make them permanent by enabling `preserve_split`.

# Config

category name: `dwindle`

| name | description | type | default |
|---|---|---|---|
| pseudotile | enable pseudotiling. Pseudotiled windows retain their floating size when tiled. | bool | false |
| force_split | 0 -> split follows mouse, 1 -> always split to the left (new = left or top) 2 -> always split to the right (new = right or bottom) | int | 0 |
| preserve_split | if enabled, the split (side/top) will not change regardless of what happens to the container. | bool | false |
| smart_split | if enabled, allows a more precise control over the window split direction based on the cursor's position. The window is conceptually divided into four triangles, and cursor's triangle determines the split direction. This feature also turns on preserve_split. | bool | false |
| smart_resizing | if enabled, resizing direction will be determined by the mouse's position on the window (nearest to which corner). Else, it is based on the window's tiling position. | bool | true |
| permanent_direction_override | if enabled, makes the preselect direction persist until either this mode is turned off, another direction is specified, or a non-direction is specified (anything other than l,r,u/t,d/b)  | bool | false | 
| special_scale_factor | 0 - 1 -> specifies the scale factor of windows on the special workspace | float | 0.8 |
| split_width_multiplier | specifies the auto-split width multiplier | float | 1.0 |
| no_gaps_when_only | whether to apply gaps when there is only one window on a workspace, aka. smart gaps. (default: disabled - 0) no border - 1, with border - 2 | int | 0 |
| use_active_for_splits | whether to prefer the active window or the mouse position for splits | bool | true |
| default_split_ratio | the default split ratio on window open. 1 means even 50/50 split. 0.1 - 1.9 | float | 1.0 |

# Bind Dispatchers

| dispatcher | description | params |
|---|---|---|
| pseudo | toggles the focused window's pseudo mode | none |

# Layout messages

Dispatcher `layoutmsg` params:

| param | description | args |
|---|---|---|
| togglesplit | toggles the split (top/side) of the current window. `preserve_split` must be enabled for toggling to work. | none |
| preselect | A onetime override for the split direction. (valid for the next window to be opened, only works on tiled windows) | direction |

e.g.:
```ini
bind = SUPER, A, layoutmsg, preselect l
```
