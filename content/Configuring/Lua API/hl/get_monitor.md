# hl.get_monitor

#### hl.get_monitor(selector)

Get a monitor by selector.

## Signature

```text
hl.get_monitor(selector: HL.MonitorSelector): HL.Monitor | nil
```

## Parameters

selector
: Monitor selector. May be a monitor output name, numeric monitor ID, or
  existing [`HL.Monitor`](../../objects/HL.Monitor#hlmonitor) object.

## Returns

monitor
: Matching monitor object, or `nil` if no monitor matches `selector`.

## Examples

Get a monitor by output name:

```lua
local monitor = hl.get_monitor("DP-1")

if monitor then
    print(monitor.description)
end
```

Get a monitor by ID:

```lua
local monitor = hl.get_monitor(0)
```

## See also

[`HL.MonitorSelector`](../../types/HL.MonitorSelector#hlmonitorselector)
: Accepted selector values.

[`HL.Monitor`](../../objects/HL.Monitor#hlmonitor)
: Runtime monitor object returned by this function.

[`hl.get_monitors()`](../get_monitors#hlget_monitors)
: Get all current monitor objects.

[`hl.get_active_monitor()`](../get_active_monitor#hlget_active_monitor)
: Get the currently active monitor.

[`hl.monitor()`](../monitor#hlmonitor)
: Configure a monitor.
