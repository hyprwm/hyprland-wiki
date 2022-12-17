The master layout makes one window be the "master", taking (by default) the left part of the
screen, and tiles the rest on the right. You can change the orientation on per-workspace basis
if you want to use anything other than the default left/right split.

# Quirks

The right, "slave" windows will always be split uniformly. You cannot change
their size.

![master1](https://user-images.githubusercontent.com/43317083/179357849-321f042c-f536-44b3-9e6f-371df5321836.gif)

However, you can resize the master window.

![master2](https://user-images.githubusercontent.com/43317083/179357863-928b0b5a-ff10-4edc-aa76-3ff88c59c980.gif)

# Config

_category name `master`_

| name | description | type | default |
|---|---|---|---|
| special_scale_factor | (0.0 - 1.0) the scale of the special workspace windows | float | 0.8 |
| new_is_master | whether a newly open window should replace the master or join the slaves. | bool | true |
| new_on_top | whether a newly open window should be on the top of the stack | bool | false |
| no_gaps_when_only | whether to apply gaps when there is only one window on a workspace, aka. smart gaps. | bool | false |
| orientation | default placement of the master area, can be left, right, top or bottom | string | left |
| inherit_fullscreen | inherit fullscreen status when cycling/swapping to another window (e.g. monocle layout) | bool | true |

# Dispatchers

`layoutmsg` params:

| param | description |
| --- | --- |
| swapwithmaster | swaps the current window with master. If the current window is the master, swaps it with the first child. |
| focusmaster | focuses the master window. If the current window is the master, focuses the first child. |
| cyclenext | focuses the next window respecting the layout |
| cycleprev | focuses the previous window respecting the layout |
| swapnext | swaps the focused window with the next window respecting the layout |
| swapprev | swaps the focused window with the previous window respecting the layout |
| addmaster | adds a master to the master side. That will be the active window, if it's not a master, or the first non-master window. |
| removemaster | removes a master from the master side. That will be the active window, if it's a master, or the last master window. |
| orientationleft | sets the orientation for the current workspace to left (master area left, slave windows to the right, vertically stacked) |
| orientationright | sets the orientation for the current workspace to right (master area right, slave windows to the left, vertically stacked) |
| orientationtop | sets the orientation for the current workspace to top (master area top, slave windows to the bottom, horizontally stacked) |
| orientationbottom | sets the orientation for the current workspace to bottom (master area bottom, slave windows to the top, horizontally stacked) |
| orientationnext | cycle to the next orientation for the current workspace (clockwise) |
| orientationprev | cycle to the previous orientation for the current workspace (counter-clockwise) |

{{< hint type=info >}}
example usage:

```ini
bind=MOD,KEY,layoutmsg,cyclenext
```

{{< /hint >}}
