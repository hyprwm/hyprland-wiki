---
weight: 45
title: HDR and SDR brightness
---

HDR configuration has three separate parts: the output format, the brightness of SDR content, and the color description used by applications.
Configure them in that order, then connect them to your brightness controls.

This guide uses Lua configuration.
The Chromium workaround below was tested with Hyprland **0.56.2**; its patch and plugin interfaces are version-dependent.

## Enable 10-bit output, wide color gamut, and HDR

10-bit output reduces quantization, wide color gamut expands the available colors, and HDR adds a luminance range and transfer function.
Enabling one does not automatically enable all three.

Add the appropriate fields to your **existing** monitor rule, preserving its mode, position, scale, and other settings.
Replace `DP-1` with the name from `hyprctl monitors all`.

| Goal | Monitor fields |
| --- | --- |
| 10-bit SDR | `bitdepth = 10, cm = "srgb"` |
| 10-bit Display P3 SDR | `bitdepth = 10, cm = "dp3"` |
| 10-bit HDR with a wide-gamut output | `bitdepth = 10, cm = "hdr"` |

For example, an HDR monitor rule can look like this:

```lua
hl.monitor({
    output = "DP-1",
    mode = "preferred",
    position = "0x0",
    scale = 1,
    bitdepth = 10,
    cm = "hdr",
    sdr_max_luminance = 203,
})
```

`dp3` selects Display P3; `dcip3` selects DCI-P3.
They are different presets.
`hdr` uses wide-gamut BT.2020 primaries with the PQ transfer function, so you do not also set `cm = "dp3"`.
The physical panel still determines the colors it can actually display.

Use the display's HDR mode if its on-screen settings require it.
After reloading, check the effective state:

```sh
hyprctl reload
hyprctl configerrors
hyprctl -j monitors all
```

Look for the HDR color-management preset and a 10-bit format such as `XRGB2101010` or `XBGR2101010`.
A successful readback confirms configuration, not correct application rendering or long-term stability.

Leave the display luminance overrides at their EDID-derived defaults unless you have reliable panel data.
If detection is incorrect, `supports_hdr` and `supports_wide_color` can override capability detection for a verified HDR panel; they cannot add capabilities to an SDR panel.
ICC profiles override the color preset and are not a suitable starting point for this HDR setup.

See [Colors and colorspaces](../colors/) and [Monitor fields](../).

## Choose an SDR reference brightness

In HDR mode, SDR white is mapped to a target luminance.
With the default `sdr_max_luminance = 80`, an ordinary SDR window does not use the panel's entire HDR brightness range.
This can make the desktop look dimmer after enabling HDR, even if the hardware brightness slider has not changed.

Set `sdr_max_luminance` in the monitor rule to choose the SDR white level in nits.
For example, `203` is a useful comparison point, while a lower value may be more comfortable on an OLED or in a dark room.
It is not a universal calibration value.
Keep `sdrbrightness = 1.0` initially so that a separate multiplier does not complicate the comparison.

| Setting | Purpose |
| --- | --- |
| `sdr_max_luminance` | White level for SDR-to-HDR mapping |
| `sdr_min_luminance` | Black level for SDR-to-HDR mapping; `0` can suit a verified OLED |
| `max_luminance` | Display HDR peak metadata override |
| `max_avg_luminance` | Display maximum average luminance metadata override |

Do not lower `max_luminance` to adjust the desktop's SDR white.
That changes the reported HDR capability and can change tone mapping.
For HDR, adjust the SDR white level while preserving the panel's real peak information.

## Chromium-based applications

Chrome, Chromium, and Wayland color-managed Electron applications can use a different rendering path from ordinary SDR windows.
Two separate issues need to be handled.

### Start Chrome and Electron on native Wayland

Use native Wayland so the application can receive the compositor's Wayland color-management feedback.
For Chrome/Chromium, and Electron builds that support these Chromium switches, the flags used for this setup are:

```plain
--ozone-platform=wayland
--enable-experimental-web-platform-features
```

`--ozone-platform=wayland` selects the native Wayland backend.
`--enable-experimental-web-platform-features` enables experimental web APIs, including the HDR Canvas functionality needed by some HDR test pages in the Chrome version tested here.
It is not a universal requirement for HDR video or ordinary Electron UI, and it does not fix reference-white or tone-mapping issues.
Support depends on the Chromium version bundled with the application.

You can usually put startup flags in `~/.config/<appname>-flags.conf`, one flag per line, **if the application's package launcher reads that file**.
Common examples are `~/.config/chrome-flags.conf` and `~/.config/chromium-flags.conf`.
Electron packages may read an application-specific file or a versioned `electron<version>-flags.conf`; check the package's launcher or documentation for the actual filename.
This is a packaging convention, not an automatic Chromium/Electron configuration mechanism.

If no flags file is supported, pass the flags on the command line or add them to the application's user-local `.desktop` launcher.
For example:

```sh
chromium --ozone-platform=wayland --enable-experimental-web-platform-features
```

Fully quit the application, including background processes, before restarting.
In Chrome, inspect `chrome://version` to confirm the effective command line; `hyprctl -j clients` can also confirm that the window is not using XWayland.
Keep Wayland color management enabled: remove a previous `--disable-features=WaylandWpColorManagerV1` workaround.
Do not add `--force-color-profile=hdr10` as a general brightness fix.

See [Chromium's Ozone documentation](https://chromium.googlesource.com/chromium/src/+/main/docs/ozone_overview.md) and [Electron's supported command-line switches](https://www.electronjs.org/docs/latest/api/command-line-switches).

### Provide the client with the SDR white level

> [!WARNING]
> **This plugin has not been audited or reviewed.
> It is only a temporary workaround**, not an official Hyprland fix or a stable, supported solution.
> It hooks an internal compositor function and runs inside the compositor process.
> Build it against headers matching your running Hyprland exactly, and rebuild and check compatibility after upgrading Hyprland.

The compositor's `sdr_max_luminance` does not, by itself, guarantee that Chromium receives the same reference brightness in its preferred image description.

See Erik Bourget's third-party patch: [cc0c509 — advertise gamma 2.2 sRGB as the preferred description on HDR outputs](https://github.com/erikwb/Hyprland/commit/cc0c5094ffdee16c820162a66ce9dbeb77cdbe9e).
It keeps the display's HDR output while advertising an SDR blending description to clients, with the white level derived from `sdr_max_luminance`.

The plugin currently used with this setup is [hypr-sdr-white](https://github.com/gfhdhytghd/hypr-sdr-white), a local adaptation of the preferred-client-description part of that commit for Hyprland 0.56.2.
The repository includes source, build instructions, and the license; build it against your exact running Hyprland version.

> [!NOTE]
> This patch is not included in the Hyprland 0.56.2 release used for this guide.
> It is a third-party commit, not a released configuration option.
> You may need to build a compatible patched compositor or write a plugin for your exact Hyprland version.
> Check your installed version before applying the workaround.

For plugin-specific configuration and client feedback refresh instructions, see the [hypr-sdr-white configuration guide](https://github.com/gfhdhytghd/hypr-sdr-white#configuration).

For context, see [the reference-luminance discussion](https://github.com/hyprwm/Hyprland/discussions/14999).

### Add the Chromium window rule

**Without a suitable tone-mapping rule, Chromium can still appear darker even when its reference white matches the desktop.** In the tested path, Chromium submitted PQ content with a 1000-nit peak description.
Hyprland's default tone mapping compressed it to the lower display peak, also reducing SDR white and midtones.

The tested workaround uses `clamp` for the affected applications:

```lua
hl.window_rule({
    name = "chromium-hdr-preserve-sdr-white",
    match = { class = "(?i)^(google-chrome.*|chromium.*|chrome-.*)$" },
    tonemap = "clamp",
})
```

This prevents the compression from dimming SDR white, but clips HDR highlights above the display's peak.
It is a workaround with that tradeoff, not a complete white-preserving HDR tone mapper.
Keep it scoped to the affected applications.

Electron applications normally use their own window classes.
Inspect `hyprctl -j clients` and add confirmed classes to the expression, for example `discord` or `code-oss`.
There is no single reliable class shared by every Electron application.
See [Window rules](../../rules/window-rules/).

Compare a plain white page with an ordinary SDR window after both fixes.
A browser reporting HDR display support does not prove that HDR video or HDR Canvas is rendering correctly.
Disabling Wayland color management or forcing HDR10 is not a substitute for synchronizing white levels and handling tone mapping.

## Restore SDR brightness after enabling HDR

Hardware brightness and SDR reference brightness are independent controls.
If you want SDR content to use the panel's full sustained brightness in HDR mode, let your brightness script start raising SDR white near the end of the slider.

One example mapping is:

| Slider | Hardware brightness | Desktop and client SDR white |
| --- | --- | --- |
| 0–10% | Linear low-brightness range | Comfortable baseline |
| 10–70% | Smooth curve up to hardware 100% | Comfortable baseline |
| 70–100% | Remains at 100% | Baseline up to sustained full-screen luminance |

The 70% boundary is a design choice.
Use the panel's sustained/full-screen luminance as the endpoint, rather than its small-window HDR peak.
OLED automatic brightness limiting can still reduce real output; this mapping does not bypass it.

The white-level calculation can be implemented in Lua or your existing script:

```lua
-- Example panel values: replace these with your own.
local baseline = 153
local fullScreen = 400

local function sdrWhite(level)
    local t = math.max(0, math.min(1, (level - 70) / 30))
    return math.floor(baseline + (fullScreen - baseline) * t + 0.5)
end
```

For each requested brightness level:

1. Apply the hardware brightness mapping.
2. Calculate the white level and update the monitor's `sdr_max_luminance`.
3. If using the client-white plugin, set its reference luminance to the **same** value and refresh client feedback.
4. Preserve the output's mode, position, scale, HDR preset, and panel metadata.

Only update the white-level configuration when its value changes.
Below the boundary, changing hardware brightness should not repeatedly reconfigure the HDR output.
Coalesce rapid slider requests, apply the latest target, and persist the chosen level for login and reload.
This avoids unnecessary output updates that can cause flicker or lag.

Verify both sides when crossing the boundary: the desktop and Chromium should brighten together.
If only the desktop changes, the client reference white or its feedback refresh is missing.
If Chromium stays darker with equal reference values, check that the `tonemap = "clamp"` rule matches its actual window class.

## Screenshots under HDR

We recommend [HyprCapture](https://github.com/gfhdhytghd/HyprCapture) for taking screenshots on an HDR Hyprland desktop.
It provides native HDR preview and editing, HDR HEIC export, and color-managed SDR output in one workflow.
