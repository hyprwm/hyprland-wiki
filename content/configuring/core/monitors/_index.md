---
title: Monitors
weight: 10
---

## Fields

All fields beyond `output` are optional and fall back to sensible defaults.

| Field | Description | Type | Default |
| --- | --- | --- | --- |
| output | Output name or `desc:...` description prefix | str | [[Required]] |
| disabled | Removes the monitor from the layout | boolean | `false` |
| mode | Resolution and refresh rate, e.g. `"1920x1080@144"`. See the [note](./modes#modes) for predefined modes. Options: `mode`/`"preferred"`/`"highres"`/`"highrr"`/`"maxwidth"` | str | `"preferred"` |
| scale | Scale factor, e.g. `1.5`. `"auto"` = use monitor's PPI to decide the scale. Options: `scale`/`"auto"` |  float / str | `"auto"` |
| transform | Rotation/flip transform (0–7) | int | 0 |
| position | Position in the virtual layout, e.g. `"1920x0"` See the [note](./positioning#positions) for predefined positions | str | `"auto"` |
| mirror | Output name to mirror | str | [[Empty]] |
| bitdepth | Bit depth. Options: `8`/`10` | int | `8` |
| cm | Color management preset | str | `"srgb"` |
| sdr_eotf | SDR transfer function Options: `"default"`/`"gamma22"`/`"srgb"` | str | `"default"` |
| vrr | VRR modes | int | `0` |
| icc | Absolute path to an ICC profile | str | [[Empty]] |
| reserved_area | Reserved area: `int` for all sides or table | css_gaps | `0` |
| supports_wide_color | Force wide color gamut (-1 = off, 0 = auto, 1 = on) | int | `0` |
| supports_hdr | Force HDR support. -1 = off, 0 = auto, 1 = on. Options: [-1 - 1] | int | `0` |
| sdrbrightness | SDR brightness in HDR mode | float | `1.0` |
| sdrsaturation | SDR saturation in HDR mode | float | `1.0` |
| sdr_min_luminance | SDR minimum luminance for SDR→HDR mapping | float | `0.2` |
| sdr_max_luminance | SDR maximum luminance | int | `80` |
| min_luminance | Monitor minimum luminance | float | `-1` |
| max_luminance | Monitor maximum possible luminance | int | `-1` |
| max_avg_luminance | Monitor maximum average luminance | int | `-1` |

Leaving the `output` empty will define a fallback rule to use when no other rules match.

```lua
hl.monitor({ output = "", mode = "preferred", position = "auto", scale = 1 })
```

This will make any monitor that was not specified with an explicit rule
automatically placed on the right of the other(s), with its preferred
resolution.

## General

To list all available monitors (active and inactive), use:

```bash
hyprctl monitors all
```

<!-- TODO: example output with descriptions that describe what means what: -->

{{% details title="Example output" closed="true" %}}

```
Monitor DP-3 (ID 0):
    2560x1440@165.00000 at 0x0
    description: AOC Q27G2G3R3B RTEN1HA009998
    make: AOC
    model: Q27G2G3R3B
    physical size (mm): 600x340
    serial: RTEN1HA009998
    active workspace: 5 (5)
    special workspace: 0 ()
    reserved: 0 34 0 0
    scale: 1
    transform: 0
    focused: yes
    dpmsStatus: 1
    vrr: false
    solitary: 0
    solitaryBlockedBy: windowed mode,missing candidate
    activelyTearing: false
    tearingBlockedBy: next frame is not torn,user settings,missing candidate
    directScanoutTo: 0
    directScanoutBlockedBy: windowed mode,missing candidate
    disabled: false
    currentFormat: XRGB2101010
    mirrorOf: none
    availableModes: 2560x1440@59.95Hz 2560x1440@165.00Hz 2560x1440@143.91Hz 2560x1440@120.00Hz 1920x1080@120.00Hz 1920x1080@119.88Hz 1920x1080@60.00Hz 1920x1080@60.00Hz 1920x1080@59.94Hz 1920x1080@50.00Hz 1280x1440@59.91Hz 1280x1024@75.03Hz 1280x1024@60.02Hz 1280x720@60.00Hz 1280x720@59.94Hz 1280x720@50.00Hz 1024x768@119.93Hz 1024x768@99.99Hz 1024x768@75.03Hz 1024x768@70.07Hz 1024x768@60.00Hz 832x624@74.55Hz 800x600@119.93Hz 800x600@99.86Hz 800x600@75.00Hz 800x600@72.19Hz 800x600@60.32Hz 800x600@56.25Hz 720x576@50.00Hz 720x576@50.00Hz 720x480@60.00Hz 720x480@60.00Hz 720x480@59.94Hz 720x480@59.94Hz 640x480@119.80Hz 640x480@99.83Hz 640x480@75.00Hz 640x480@72.81Hz 640x480@66.67Hz 640x480@60.00Hz 640x480@59.94Hz 640x480@59.94Hz 720x400@70.08Hz
    colorManagementPreset: srgb
    sdrBrightness: 1
    sdrSaturation: 1
    sdrMinLuminance: 0.2
    sdrMaxLuminance: 80
    hardwareCursorsInUse: true
 ```

{{% /details %}}

### Disabling a monitor

> [!WARNING]
> Disabling a monitor will remove it from the monitor layout, moving all windows and workspaces to any remaining ones.
> If you want to disable your monitor the way a screensaver does (just turning off the monitor), use the `dpms` [dispatcher](../dispatchers).

To disable a monitor, set `disabled = true`:

```lua
hl.monitor({ output = "name", disabled = true })
```

## Custom reserved area

A reserved area is an area that remains unoccupied by tiled windows.
If your workflow requires a custom reserved area, you can add it with the `reserved_area` field.
It accepts either a single integer (all sides) or a table with individual sides:

```lua
-- all sides
hl.monitor({ output = "name", reserved_area = 10 })

-- individual sides
hl.monitor({ output = "name", reserved_area = { top = 10, bottom = 10, left = 0, right = 0 } })
```

This stacks on top of the calculated reserved area (e.g. bars), but you may only use one of these rules per monitor in the config.

## Default workspace

See [Workspace Rules](../rules/workspace-rules).

### Binding workspaces to a monitor

See [Workspace Rules](../rules/workspace-rules).
