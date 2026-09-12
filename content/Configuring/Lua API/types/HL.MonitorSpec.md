# HL.MonitorSpec

#### *class* HL.MonitorSpec

Table describing one monitor configuration entry.

`HL.MonitorSpec` is passed to [`hl.monitor()`](../../hl/monitor#hlmonitor). It describes the
output to configure, its mode, position, scale, transform, mirroring,
reserved space, and optional color-management settings.

## Shape

```text
{
    output = string,

    disabled = boolean?,
    mode = string?,
    position = string?,
    scale = string | number?,
    transform = integer | boolean?,
    mirror = string?,
    bitdepth = integer | boolean?,
    vrr = integer | boolean?,

    reserved = integer | HL.CssGap?,
    reserved_area = integer | HL.CssGap?,

    cm = string?,
    icc = string?,
    supports_hdr = integer | boolean?,
    supports_wide_color = integer | boolean?,
    sdr_eotf = string?,
    sdrbrightness = number | boolean?,
    sdrsaturation = number | boolean?,
    sdr_min_luminance = number | boolean?,
    sdr_max_luminance = integer | boolean?,
    min_luminance = number | boolean?,
    max_luminance = integer | boolean?,
    max_avg_luminance = integer | boolean?,
}
```

## Fields

output
: Monitor output name. This field is required.

disabled
: Disable the monitor.

mode
: Monitor mode, usually written as resolution and refresh rate.

position
: Monitor position.

scale
: Monitor scale factor.

transform
: Monitor transform value.

mirror
: Output name of the monitor to mirror.

bitdepth
: Monitor bit depth option.

vrr
: Variable refresh rate option.

reserved
: Reserved space around the monitor.

reserved_area
: Reserved area field.

cm
: Color-management mode.

icc
: ICC profile path.

supports_hdr
: HDR capability override.

supports_wide_color
: Wide-color capability override.

sdr_eotf
: SDR transfer function option.

sdrbrightness
: SDR brightness option.

sdrsaturation
: SDR saturation option.

sdr_min_luminance
: SDR minimum luminance.

sdr_max_luminance
: SDR maximum luminance.

min_luminance
: Minimum luminance.

max_luminance
: Maximum luminance.

max_avg_luminance
: Maximum average luminance.

## Examples

Configure a normal monitor:

```lua
{
    output = "DP-1",
    mode = "2560x1440@60",
    position = "0x0",
    scale = 1,
}
```

Configure a transformed portrait monitor:

```lua
{
    output = "DP-2",
    mode = "2560x1440@60",
    position = "2560x0",
    scale = 1,
    transform = 1,
}
```

Reserve monitor space:

```lua
{
    output = "DP-1",
    reserved = {
        top = 32,
        right = 0,
        bottom = 0,
        left = 0,
    },
}
```

## Used by

[`hl.monitor()`](../../hl/monitor#hlmonitor)
: Configure a monitor from this table.

## See also

[`HL.Monitor`](../../objects/HL.Monitor#hlmonitor)
: Runtime object representing an active monitor.

[`HL.CssGap`](../HL.CssGap#hlcssgap)
: Table shape accepted by `reserved` and `reserved_area`.

[`hl.get_monitor()`](../../hl/get_monitor#hlget_monitor)
: Get a runtime monitor object by selector.

[`hl.get_monitors()`](../../hl/get_monitors#hlget_monitors)
: Get all current monitor objects.
