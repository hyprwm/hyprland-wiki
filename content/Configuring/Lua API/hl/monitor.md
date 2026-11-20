# hl.monitor

#### hl.monitor(spec)

Configure a monitor.

`hl.monitor` adds one monitor configuration entry. The configuration is
described by [`HL.MonitorSpec`](../../types/HL.MonitorSpec#hlmonitorspec).

## Signature

```text
hl.monitor(spec: HL.MonitorSpec): nil
```

## Parameters

spec
: Monitor configuration table. The `output` field is required.

## Returns

nil
: This function configures Hyprland and does not return a value.

## Examples

Configure a monitor by output name:

```lua
hl.monitor({
    output = "DP-1",
    mode = "2560x1440@60",
    position = "0x0",
    scale = 1,
})
```

Disable a monitor:

```lua
hl.monitor({
    output = "HDMI-A-1",
    disabled = true,
})
```

Reserve space for a bar:

```lua
hl.monitor({
    output = "DP-1",
    reserved = {
        top = 32,
        right = 0,
        bottom = 0,
        left = 0,
    },
})
```

## See also

[`HL.MonitorSpec`](../../types/HL.MonitorSpec#hlmonitorspec)
: Table accepted by `hl.monitor`.

[`HL.Monitor`](../../objects/HL.Monitor#hlmonitor)
: Runtime monitor object returned by monitor query functions.

[`hl.get_monitor()`](../get_monitor#hlget_monitor)
: Get one monitor by selector.

[`hl.get_monitor_at()`](../get_monitor_at#hlget_monitor_at)
: Get the monitor at a position.

[`hl.get_monitor_at_cursor()`](../get_monitor_at_cursor#hlget_monitor_at_cursor)
: Get the monitor containing the cursor.

[`hl.get_monitors()`](../get_monitors#hlget_monitors)
: Get all current monitor objects.
