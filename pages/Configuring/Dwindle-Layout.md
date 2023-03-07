Dwindle is a BSPWM-like layout, where every window on a workspace is a member
of a binary tree.

# Quirks

Dwindle splits are NOT PERMANENT. The split is determined dynamically with the
W/H ratio of the parent node. If W > H, it's side-by-side. If H > W, it's
top-and-bottom. You can make them permanent by enabling `preserve_split`.

# Config

category name: `dwindle`

| name | description | type | default |
|---|---|---|---|---|
| pseudotile | enable pseudotiling. Pseudotiled windows retain their floating size when tiled. | bool | false |
| force_split | 0 -> split follows mouse, 1 -> always split to the left (new = left or top) 2 -> always split to the right (new = right or bottom) | int | 0 |
| preserve_split | if enabled, the split (side/top) will not change regardless of what happens to the container. | bool | false |
| special_scale_factor | 0 - 1 -> specifies the scale factor of windows on the special workspace | float | 0.8 |
| split_width_multiplier | specifies the auto-split width multiplier | float | 1.0 |
| no_gaps_when_only | whether to apply gaps when there is only one window on a workspace, aka. smart gaps. | bool | false |
| use_active_for_splits | whether to prefer the active window or the mouse position for splits | bool | true |
| default_split_ratio | the default split ratio on window open. 1 means even 50/50 split. 0.1 - 1.9 | float | 1.0 |

# Bind Dispatchers

| dispatcher | description | params |
|---|---|---|
| togglesplit | toggles the split (top/side) of the current window. `preserve_split` must be enabled for toggling to work. | none |
| pseudo | toggles the focused window's pseudo mode | none |
