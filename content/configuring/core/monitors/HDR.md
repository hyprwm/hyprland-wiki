---
weight: 30
title: HDR setup
---

This guide covers HDR setup and SDR brightness.

## Enable 10-bit output, wide color gamut, and HDR

See [Colors and colorspaces](../colors/) to enable 10-bit output and the `hdr` or `hdredid` color-management preset.

Check the effective monitor configuration:

```sh
hyprctl monitors all
```

Look for the HDR color-management preset and a 10-bit format such as `XRGB2101010` or `XBGR2101010`.

Leave display luminance overrides unset to use the values reported by the display in its EDID, unless you have more reliable panel data.
If detection is incorrect, `supports_hdr` and `supports_wide_color` can override capability detection for a verified HDR panel; they cannot add capabilities to an SDR panel.
ICC profiles override the color preset and are not a suitable starting point for this HDR setup.

See [Colors and colorspaces](../colors/) and [Monitor fields](../).

## Check the panel's reported luminance

See [ArchWiki: HDR](https://wiki.archlinux.org/title/HDR) for reading and checking HDR metadata with `edid-decode`.
For EDID extraction and overrides, see [ArchWiki: Kernel mode setting](https://wiki.archlinux.org/title/Kernel_mode_setting#Forcing_modes_and_EDID).
EDID luminance values are display-reported metadata, not measurements of current or sustained full-screen brightness.

Use `hyprctl` and `jq` to inspect the current Hyprland settings:

```sh
hyprctl -j monitors all | jq '.[] | {
    name,
    colorManagementPreset,
    currentFormat,
    sdrBrightness,
    sdrMinLuminance,
    sdrMaxLuminance
}'
```

These values are compositor settings, not measured panel luminance.

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
| `max_luminance` | Override for the display-reported HDR peak luminance |
| `max_avg_luminance` | Override for the display-reported maximum frame-average luminance |

## Chromium-based applications

Chrome, Chromium, and Wayland color-managed Electron applications can use a different rendering path from ordinary SDR windows.
Two separate issues need to be handled.

### Start Chrome and Electron on native Wayland

See [Force apps to use Wayland](../../../../getting-started/master-tutorial/#force-apps-to-use-wayland) and [ArchWiki: Chromium](https://wiki.archlinux.org/title/Chromium) for native Wayland startup configuration.
Some HDR Canvas tests require the following startup flag, depending on the Chromium version:

```plain
--enable-experimental-web-platform-features
```

This enables experimental web APIs; it is not a general requirement for HDR video or a brightness fix.

### Provide the client with the SDR white level

> [!WARNING]
> This plugin is an unaudited, unofficial temporary workaround.
> Plugin support belongs in its own repository, not the Hyprland support channels.

See [the reference-luminance discussion](https://github.com/hyprwm/Hyprland/discussions/14999) for context.
On Hyprland 0.56.2, `sdr_max_luminance` does not, by itself, guarantee that Chromium receives the same reference brightness in its preferred image description.
Chromium-based applications can consequently appear darker or brighter than ordinary SDR windows.

[hypr-sdr-white](https://github.com/gfhdhytghd/hypr-sdr-white) is a plugin adaptation of [Erik Bourget's preferred-client-description patch](https://github.com/erikwb/Hyprland/commit/cc0c5094ffdee16c820162a66ce9dbeb77cdbe9e) for Hyprland 0.56.2.
The patch is not included in that release.
See the plugin repository for configuration, build requirements, and compatibility information.

### Chromium window rule

If Chromium still appears darker than other windows after receiving the same SDR reference white, the following window rule can avoid the additional tone-mapping compression:

```lua
hl.window_rule({
    name = "chromium-hdr-preserve-sdr-white",
    match = { class = "(?i)^(google-chrome.*|chromium.*|chrome-.*)$" },
    tonemap = "limited",
})
```
`limited` leaves luminance below a knee unchanged, so SDR white keeps its level, and rolls HDR highlights off into the display peak instead of clipping them.

The default curve compresses from black upward, which dims SDR white; `clamp` keeps SDR white but clips highlights above the display peak.
Keep the rule scoped to affected applications.

Electron applications normally use their own window classes.
Inspect `hyprctl clients` and add confirmed classes to the expression, for example `discord` or `code-oss`.

There is no single reliable class shared by every Electron application.
See [Window rules](../../rules/window-rules/). But you may try just apply limited tonemap to all windows with ` match = { class = ".*" }`

Compare a plain white page with an ordinary SDR window after both fixes.

Use [TestUFO HDR](https://testufo.com/hdr) to test the browser's HDR and wide-color-gamut output, following the page's test instructions.

## Restore SDR brightness after enabling HDR

Hardware brightness and SDR reference brightness are independent controls.
If you want SDR content to use the panel's full sustained brightness in HDR mode, let your brightness script start raising SDR white near the end of the slider.

One example mapping is:

| Slider | Hardware brightness | Desktop and client SDR white |
| --- | --- | --- |
| 0–70% | Linear brightness range | Comfortable baseline |
| 70–100% | Remains at 100% | Baseline up to sustained full-screen luminance |

The 70% boundary is a design choice.
Use the panel's sustained full-screen luminance as the endpoint, rather than its small-window HDR peak.
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

## Screenshots under HDR

Tools with HDR screenshot support include [HyprCapture](https://github.com/gfhdhytghd/HyprCapture) and [KMShot](https://github.com/foraphe/kmshot).

## View HDR images in Hyprland

Viewers to consider include [HDRView](https://github.com/wkjarosz/hdrview) or [Simple Image Viewer](https://github.com/z16166/SimpleImageViewer).
