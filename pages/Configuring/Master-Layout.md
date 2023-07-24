The master layout makes one (or more) window(s) be the "master", taking (by default) the left part of the
screen, and tiles the rest on the right. You can change the orientation on per-workspace basis
if you want to use anything other than the default left/right split.

![master1](https://user-images.githubusercontent.com/43317083/179357849-321f042c-f536-44b3-9e6f-371df5321836.gif)

# Config

_category name `master`_

| name | description | type | default |
|---|---|---|---|
| allow_small_split | enable adding additional master windows in a horizontal split style | bool | false |
| special_scale_factor | (0.0 - 1.0) the scale of the special workspace windows | float | 0.8 |
| mfact | (0.0 - 1.0) master split factor, the ratio of master split| float | 0.55 |
| new_is_master | whether a newly open window should replace the master or join the slaves. | bool | true |
| new_on_top | whether a newly open window should be on the top of the stack | bool | false |
| no_gaps_when_only | whether to apply gaps when there is only one window on a workspace, aka. smart gaps. (default: disabled - 0) no border - 1, with border - 2 | int | 0 |
| orientation | default placement of the master area, can be left, right, top, bottom or center | string | left |
| inherit_fullscreen | inherit fullscreen status when cycling/swapping to another window (e.g. monocle layout) | bool | true |
| always_center_master | when using orientation=center, keep the master window centered, even when it is the only window in the workspace. | bool | false |


# Dispatchers

`layoutmsg` commands:

| command | description | params |
| --- | --- | --- |
| swapwithmaster | swaps the current window with master. If the current window is the master, swaps it with the first child. | either `master` (new focus is the new master window), `child` (new focus is the new child) or `auto` (which is the default, keeps the focus of the previously focused window) |
| focusmaster | focuses the master window. | either `master` (focus stays at master, even if it was selected before) or `auto` (which is the default, if the current window is the master, focuses the first child.) |
| cyclenext | focuses the next window respecting the layout | none |
| cycleprev | focuses the previous window respecting the layout | none |
| swapnext | swaps the focused window with the next window respecting the layout | none |
| swapprev | swaps the focused window with the previous window respecting the layout | none |
| addmaster | adds a master to the master side. That will be the active window, if it's not a master, or the first non-master window. | none |
| removemaster | removes a master from the master side. That will be the active window, if it's a master, or the last master window. | none |
| orientationleft | sets the orientation for the current workspace to left (master area left, slave windows to the right, vertically stacked) | none |
| orientationright | sets the orientation for the current workspace to right (master area right, slave windows to the left, vertically stacked) | none |
| orientationtop | sets the orientation for the current workspace to top (master area top, slave windows to the bottom, horizontally stacked) | none |
| orientationbottom | sets the orientation for the current workspace to bottom (master area bottom, slave windows to the top, horizontally stacked) | none |
| orientationcenter | sets the orientation for the current workspace to center (master area center, slave windows alternate to the left and right, vertically stacked) | none |
| orientationnext | cycle to the next orientation for the current workspace (clockwise) | none |
| orientationprev | cycle to the previous orientation for the current workspace (counter-clockwise) | none |

params for the commands are separated by a single space

{{< hint type=info >}}
example usage:

```ini
bind=MOD,KEY,layoutmsg,cyclenext
# behaves like xmonads promote feature (https://hackage.haskell.org/package/xmonad-contrib-0.17.1/docs/XMonad-Actions-Promote.html)
bind=MOD,KEY,layoutmsg,swapwithmaster master
```

{{< /hint >}}
