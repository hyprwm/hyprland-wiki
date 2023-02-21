Grouped (tabbed) windows

Hyprland allows you to make a group with the togglegroup bind dispatcher, and cycle through it with changegroupactive.

A group is like i3wm’s “tabbed” container. It takes the space of one window, and you can change the window to the next one in the tabbed “group”.

When creating the group, a group will be made from the current active window. The new group’s border colors are configurable with the appropriate col. settings in the config section below.

Locking a group let you manage windows in the same workspace as the group.

# Config

category name: `general`

| name | description | type | default |
|---|---|---|---|
| col.group_border | inactive (out of focus) group border color | gradient | 0x66777700 |
| col.group_border_active | active group border color | gradient | 0x66ffff00 |

# Bind Dispatchers

| dispatcher | description | params |
|---|---|---|
| togglegroup | toggles the current window and its siblings (recursively) into a group | none |
| changegroupactive | switches to the next window in a group. | b - back, f - forward. |
| lockgroups | Locks the groups (groups will not accept new windows) | `lock` for locking, `unlock` for unlocking |
