---
title: Monitor modes
weight: 30
---

## Mode

Monitor mode is a combination of resolution and refresh rate.
To see available modes, run `hyprctl monitors` and find `availableModes` field.
Modes are sorted by resolution in  descending order.
Some modes may be duplicated or may have a skewed refresh rate.

### Modes
Predefined modes can not be combined, only one can be selected.

- `preferred` - use the display's preferred size and refresh rate.
- `highres` - use the highest supported resolution.
- `highrr` - use the highest supported refresh rate.
- `maxwidth` - use the widest supported resolution.

## Custom modelines

You can set up a custom modeline by passing a modeline string as the `mode` field:

```lua
hl.monitor({
  output = "DP-1",
  mode = "modeline 1071.101 3840 3848 3880 3920 2160 2263 2271 2277 +hsync -vsync",
})
```

More about modeline can be read [here](https://wikipedia.org/wiki/XFree86_Modeline) and [here](https://wikipedia.org/wiki/Coordinated_Video_Timings)

## Mirrored displays

If you want to mirror a display, use the `mirror` field:

```lua
hl.monitor({ output = "DP-3", mode = "1920x1080@60", position = "0x0", scale = 1, mirror = "DP-2" })
hl.monitor({ output = "", mode = "preferred", position = "auto", scale = 1, mirror = "DP-1" })
```

Please remember that mirroring displays will not "re-render" everything for your second monitor, so if mirroring a 1080p screen onto a 4K one, the resolution will still be 1080p on the 4K display.
This also means squishing and stretching will occur on aspect ratios that differ (e.g 16:9 and 16:10).

## VRR

VRR can be enabled globally and on a per-display basis

Per-display VRR can be configured with the `vrr` field in `hl.monitor()` call, global config can be found in
[config options](../../config-options).

Available values:
 - `-1` - follow global switch
 - `0` - off
 - `1` - on
 - `2` - fullscreen only
 - `3` - fullscreen with `video` or `game` content type

```lua
hl.monitor({ output = "DP-1", vrr = 3 })
```
