---
weight: 40
title: Colors and colorspaces
---

## Color management presets

Use the `cm` field to change the default sRGB output preset:

```lua
hl.monitor({ output = "eDP-1", cm = "wide" })
```

Supported presets are:

```plain
auto    - srgb for 8bpc, wide for 10bpc if supported (recommended)
srgb    - sRGB primaries (default)
dcip3   - DCI P3 primaries
dp3     - Apple P3 primaries
adobe   - Adobe RGB primaries
wide    - wide color gamut, BT2020 primaries
edid    - primaries from edid (known to be inaccurate)
hdr     - wide color gamut and HDR PQ transfer function (experimental)
hdredid - same as hdr with edid primaries (experimental)
```

Fullscreen HDR is possible without the `hdr` cm setting if `render:cm_auto_hdr` is enabled.

Use `sdrbrightness` and `sdrsaturation` to control SDR brightness and saturation in HDR mode.
The default for both values is `1.0`. Typical brightness value should be in the `1.0 ... 2.0` range.

```lua
hl.monitor({
  output = "eDP-1",
  cm = "hdr",
  sdrbrightness = 1.2,
  sdrsaturation = 0.98,
})
```

The default transfer function assumed to be in use on an SDR display for sRGB content is defined by `sdr_eotf`.
The default (`"default"`) follows `render:cm_sdr_eotf`.
This can be changed to piecewise sRGB with `"srgb"`, or Gamma 2.2 with `"gamma22"`.

It is recommended to set `bitdepth = 10` for better colorspace handling.

## 10 bit support

> [!WARNING]
> Some monitors may state they have 10bit support, but in reality they emulate it with 8bit+[FRC](https://wikipedia.org/wiki/Frame_rate_control).
> Be aware that this may cause serious eye strain.

Colors registered in Hyprland (e.g. the border color) do _not_ support 10 bit.
Some applications do _not_ support screen capture with 10 bit enabled.

If you want to enable 10 bit support for your display, set `bitdepth = 10`:

```lua
hl.monitor({ output = "DP-1", bitdepth = 10 })
```

## ICC Profiles

You can load an ICC profile via the `icc` field (path must be absolute):

```lua
hl.monitor({ output = "DP-1", icc = "/path/to/icc.icm" })
```

Please note:
- Path needs to be absolute.
- Having an ICC applied will automatically force `sdr_eotf` to `sRGB` for that monitor (for color accuracy).
- Having an ICC applied overrides the CM preset.
- ICCs are fundamentally incompatible with HDR gaming. Funky stuff may happen.
