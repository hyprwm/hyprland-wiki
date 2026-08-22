# HL.MonitorSelector

#### *class* HL.MonitorSelector

Selector accepted by monitor query functions.

`HL.MonitorSelector` may be a monitor name, monitor ID, or an existing
[`HL.Monitor`](../../objects/HL.Monitor#hlmonitor) object.

## Accepted values

value
: Monitor output name, such as `"DP-1"` or `"HDMI-A-1"`.

value
: Numeric monitor ID.

value
: Existing runtime monitor object.

## Examples

Select a monitor by output name:

```lua
local monitor = hl.get_monitor("DP-1")
```

Select a monitor by ID:

```lua
local monitor = hl.get_monitor(0)
```

Pass an existing monitor object:

```lua
local monitor = hl.get_active_monitor()

if monitor then
    local workspace = hl.get_active_workspace(monitor)
end
```

## Used by

[`hl.get_monitor()`](../../hl/get_monitor#hlget_monitor)
: Get one monitor by selector.

[`hl.get_active_workspace()`](../../hl/get_active_workspace#hlget_active_workspace)
: Get the active workspace for a monitor.

[`hl.get_active_special_workspace()`](../../hl/get_active_special_workspace#hlget_active_special_workspace)
: Get the active special workspace for a monitor.

[`hl.get_last_workspace()`](../../hl/get_last_workspace#hlget_last_workspace)
: Get the last workspace for a monitor.
