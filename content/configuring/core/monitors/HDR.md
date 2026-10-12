---
weight: 30
title: HDR setup
---
This is a guide about how to configurate HDR.

## Enable 10-bit output, wide color gamut, and HDR

check [Colors and colorspaces](colors.md) for enable 10-bit and hdr/hdredid color management

an example:

```sh
hyprctl monitors all
```

Look for the HDR color-management preset and a 10-bit format such as `XRGB2101010` or `XBGR2101010`.

Leave the display luminance overrides at their EDID-derived defaults unless you have reliable panel data.
If detection is incorrect, `supports_hdr` and `supports_wide_color` can override capability detection for a verified HDR panel; they cannot add capabilities to an SDR panel.
ICC profiles override the color preset and are not a suitable starting point for this HDR setup.

See [Colors and colorspaces](../colors/) and [Monitor fields](../).

## Check the panel's reported luminance

See [ArchWiki: HDR](https://wiki.archlinux.org/title/HDR) for reading and checking HDR metadata with `edid-decode`.
For EDID extraction and overrides, see [ArchWiki: Kernel mode setting](https://wiki.archlinux.org/title/Kernel_mode_setting#Forcing_modes_and_EDID).
EDID luminance values are display-reported metadata, not measurements of current or sustained full-screen brightness.

Use below for hyprland report
```sh
hyprctl -j monitors all | jq '.[] | {
    name,
    colorManagementPreset,
    currentFormat,
    sdrBrightness,
    sdrMinLuminance,
    sdrMaxLuminance
}'
{
  "name": "DP-4",
  "col
```
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
| `max_luminance` | Display's peak brightness for a small area |
| `max_avg_luminance` | Display's maximum luminance for whole screen|

## Chromium-based applications

Chrome, Chromium, and Wayland color-managed Electron applications can use a different rendering path from ordinary SDR windows.
Two separate issues need to be handled.

### Start Chrome and Electron on native Wayland

Check [Arch wiki Chromium Page](https://wiki.archlinux.org/title/Chromium)
for how to force chromium based app using wayland
You also need this for hdr canvas enable.

```sh
--enable-experimental-web-platform-features
```

### Provide the client with the SDR white level

For context, see [the reference-luminance discussion](https://github.com/hyprwm/Hyprland/discussions/14999).

The compositor's `sdr_max_luminance` does not, by itself, guarantee that Chromium receives the same reference brightness in its preferred image description. You may notice chromium based app darker or brighter than others.

You may try this Plugin as a solution or write your own patch or plugin.
[hypr-sdr-white](https://github.com/gfhdhytghd/hypr-sdr-white), a local adaptation of the preferred-client-description part of that commit for Hyprland 0.56.2.

> [!WARNING]
> **This is an NON-OFFICIAL solution. Be responsible for your own machine. Do not seek support from Hyprland official for this plugin.**

### Chromium window rule

If chromium seems darker than other window, after the same SDR brightnedd config been passed correctly. You may need the following window rule.

```lua
hl.window_rule({
    name = "chromium-hdr-preserve-sdr-white",
    match = { class = "(?i)^(google-chrome.*|chromium.*|chrome-.*)$" },
    tonemap = "clamp",
})
```
Electron applications normally use their own window classes.
Inspect `hyprctl clients` and add confirmed classes to the expression, for example `discord` or `code-oss`.
There is no single reliable class shared by every Electron application.
See [Window rules](../../rules/window-rules/).

Compare a plain white page, with an ordinary SDR window after both fixes to check.

Use https://testufo.com/hdr to test if HDR and WCG is working in browser.

## Restore SDR brightness after enabling HDR

Hardware brightness and SDR reference brightness are independent controls.
If you want SDR content to use the panel's full sustained brightness in HDR mode, let your brightness script start raising SDR white near the end of the slider.

One example mapping is:

| Slider | Hardware brightness | Desktop and client SDR white |
| --- | --- | --- |
| 0–70% | Linear brightness range | Comfortable baseline |
| 70–100% | Remains at 100% | Baseline up to sustained full-screen luminance |

The 70% boundary is a design choice.
Use the panel's max full-screen luminance as the endpoint, rather than its small-window HDR peak.
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

[HyprCapture](https://github.com/gfhdhytghd/HyprCapture) and [KMshot]{https://github.com/foraphe/kmshot)is the only two avaslible choice so far.

## Wiew image under HDR in Hyprland
You may try [HDRview](https://github.com/wkjarosz/hdrview) or [Simple Image Viewer](https://github.com/z16166/SimpleImageViewer)