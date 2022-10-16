Dwindle is a BSPWM-like layout, where every window on a workspace is a member
of a binary tree.

# Quirks

Dwindle splits are NOT PERMANENT. The split is determined dynamically with the
W/H ratio of the parent node. If W > H, it's side-by-side. If H > W, it's
top-and-bottom. You can make them permanent by enabling `preserve_split`.

## Grouped (tabbed) windows

Dwindle allows you to make a group with the `togglegroup` bind dispatcher, and
cycle through it with `changegroupactive`.

A group is like i3wm's "tabbed" container. It takes the space of one window, and
you can change the window to the next one in the tabbed "group".

When creating the group, a group will be made from the current active window,
and all children (recursively!) of the parent node. The new group's border
colors are configurable with the appropriate `col.` settings in the config
section below.

_Grouping example (make, add, toggle, remove)_

![groupExampleSmaller](https://user-images.githubusercontent.com/43317083/163003581-69d7a5d0-5757-4183-83f1-256cdc99c96a.gif)

Closing windows within the groups is allowed, however, since the groups in the
backend are still a tree, if you remove a node that makes the original node
container get removed, the group will be broken back to its dwindle form.

# Config

category name: `dwindle`

| name | description | type | default |
|---|---|---|---|---|
| pseudotile | enable pseudotiling. Pseudotiled windows retain their floating size when tiled. | bool | false |
| col.group_border | inactive (out of focus) group border color | color | 0x66777700 |
| col.group_border_active | active group border color | color | 0x66ffff00 |
| force_split | 0 -> split follows mouse, 1 -> always split to the left (new = left or top) 2 -> always split to the right (new = right or bottom) | int | 0 |
| preserve_split | if enabled, the split (side/top) will not change regardless of what happens to the container. | bool | false |
| special_scale_factor | 0 - 1 -> specifies the scale factor of windows on the special workspace | float | 0.8 |
| split_width_multiplier | specifies the auto-split width multiplier | float | 1.0 |
| no_gaps_when_only | whether to apply gaps when there is only one window on a workspace, aka. smart gaps. | bool | false |
| use_active_for_splits | whether to prefer the active window or the mouse position for splits | bool | true |

## Bind Dispatchers

| dispatcher | description | params |
|---|---|---|
| togglegroup | toggles the current window and its siblings (recursively) into a group | none |
| changegroupactive | switches to the next window in a group. | b - back, f - forward. |
| togglesplit | toggles the split (top/side) of the current window | none |
