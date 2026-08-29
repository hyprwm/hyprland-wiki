---
weight: 30
title: Notifications
---

Hyprland has simple built-in notification system.
Notifications are simple text boxes, with an optional icon, positioned in the top-right corner of the active monitor.
**They are not meant to handle your system notifications.**

## Parameters

| Name | Description | Type | Default | Limits |
| --- | --- | --- | --- | --- |
| text | Text of the notification | str | [[Empty]] | |
| timeout | Timeout/duration in ms | int | [[Required]] | |
| icon | Icon type, see [below](#icon)| str | `"none"` | |
| color | Notification color. `0` means "default color for icon" | color | 0 | |
| font_size | Size of the font used to display the notification | int | 13 | |

### Icon

Icon can be one of the following, selected by either Lua name or hyprctl ID:
| Name | Lua name | hyprctl ID | Default color |
| --- | --- | --- | --- |
| None | none | -1 | <code style="background-color:#000000;color:#FFFFFF">#000000</code> |
| Warning | warn/warning | 0 | <code style="background-color:#FFCC66;color:#000000">#FFCC66</code> |
| Info | info | 1 | <code style="background-color:#80FFFF;color:#000000">#80FFFF</code> |
| Hint | hint | 2 | <code style="background-color:#B3FFCC;color:#000000">#B3FFCC</code> |
| Error | err/error | 3 | <code style="background-color:#FF4D4D;color:#000000">#FF4D4D</code> |
| Confused | confused/question | 4 | <code style="background-color:#FFCC99;color:#000000">#FFCC99</code> |
| Ok | ok | 5 | <code style="background-color:#80FF80;color:#000000">#80FF80</code> |

## Creating a notification

### Lua

```lua
-- Just push a notification
hl.notification.create({ text = "Hello from Lua!", timeout = 15000, icon = "info", font_size = 20 })

-- Assign "HL.Notification" object to "somevar" for later use and push the notification
local somevar = hl.notification.create({ text = "Please store me", timeout = 228638, icon = "hint" })

-- Get a table of all active notifications as "HL.Notification" objects
hl.notification.get()
```

### Hyprctl

To create a notification from hyprctl, you can use `hyprctl notify` command.
It takes the same information as `hl.notification.create()`, but in a slightly different format.
See more about it [here](../using-hyprctl#notify).
