=
Dwindle is a BSPWM-like layout, where every window on a workspace is a member of
a binary tree.

# Quirks

Dwindle splits are NOT PERMANENT. The split is determined dynamically with the
W/H ratio of the parent node. If W > H, it's side-by-side. If H > W, it's
top-and-bottom. You can make them permanent by enabling `preserve_split`.

Dwindle allows for mouse moving and resizing using the `main_mod` and the mouse
(left for move, right for resize)

_Moving (main_mod + LMB)_

![moveExampleHyprland](https://user-images.githubusercontent.com/43317083/162996595-c2b41ab1-0f3b-4680-99df-34d6dbad87f4.gif)

_Resizing (main_mod + RMB)_

![resizeExampleHyprland](https://user-images.githubusercontent.com/43317083/162996612-6341199a-eeee-4de0-85ee-f6a42c426c3f.gif)

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

`pseudotile=int` - (0/1) enable pseudotiling

`col.group_border=col` - inactive (out of focus) group border color

`col.group_border_active=col` - active group border color

`force_split=int` - 0 -> split follows mouse, 1 -> always split to the left (new
= left or top) 2 -> always split to the right (new = right or bottom)

`preserve_split=int` - (0/1) if enabled, the split (side/top) will not change
regardless of what happens to the container.

`special_scale_factor=float` - 0 - 1 -> specifies the scale factor of windows on
the special workspace

`split_width_multiplier=float` - specifies the auto-split width multiplier

`no_gaps_when_only=bool` - whether to apply gaps when there is only one window on a workspace.

## Bind Dispatchers

`togglegroup` - toggles the current window and its siblings (recursively) into a
group - params: none

`changegroupactive` - switches to the next window in a group. - params: b -
back, f - forward.

`togglesplit` - toggles the split (top/side) of the current window - params:
none
