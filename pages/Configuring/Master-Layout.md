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
| pseudotile | enable pseudotiling. Pseudotiled windows retain their floating size when tiled. | bool | false |
| col.group_border | inactive (out of focus) group border color | color | 0x66777700 |
| col.group_border_active | active group border color | color | 0x66ffff00 |
| force_split | 0 -> split follows mouse, 1 -> always split to the left (new = left or top) 2 -> always split to the right (new = right or bottom) | int | 0 |
| preserve_split | if enabled, the split (side/top) will not change regardless of what happens to the container. | bool | false |
| special_scale_factor | 0 - 1 -> specifies the scale factor of windows on the special workspace | float | 0.8 |
| split_width_multiplier | specifies the auto-split width multiplier | float | 1.0 |
| no_gaps_when_only | whether to apply gaps when there is only one window on a workspace, aka. smart gaps. | bool | false |
| use_active_for_splits | whether to prefer the active window or the mouse position for splits | bool | true |

# Dispatchers

`layoutmsg` params:

| dispatcher | description | params |
|---|---|---|
| togglegroup | toggles the current window and its siblings (recursively) into a group | none |
| changegroupactive | switches to the next window in a group. | b - back, f - forward. |
| togglesplit | toggles the split (top/side) of the current window | none |

{{< hint type=info >}}
example usage:

```ini
bind=MOD,KEY,layoutmsg,cyclenext
```

{{< /hint >}}
