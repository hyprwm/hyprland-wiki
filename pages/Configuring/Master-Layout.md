The master layout makes one window be the "master", taking the left part of the
screen, and tiles the rest on the right.

# Quirks

The right, "slave" windows will always be split uniformly. You cannot change
their size.

![master1](https://user-images.githubusercontent.com/43317083/179357849-321f042c-f536-44b3-9e6f-371df5321836.gif)

However, you can resize the master window.

![master2](https://user-images.githubusercontent.com/43317083/179357863-928b0b5a-ff10-4edc-aa76-3ff88c59c980.gif)

# Config

_category name `master`_

| name | description | type | default |
|---|---|---|---|---|
| special_scale_factor | (0.0 - 1.0) the scale of the special workspace windows | float | 0.8 |
| new_is_master | whether a newly open window should replace the master or join the slaves. | bool | false |
| new_on_top | whether a newly open window should be on the top of the stack | bool | false |
| no_gaps_when_only | whether to apply gaps when there is only one window on a workspace, aka. smart gaps. | bool | false |

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

{{< hint type=info >}}
example usage:

```ini
bind=MOD,KEY,layoutmsg,cyclenext
```

{{< /hint >}}
