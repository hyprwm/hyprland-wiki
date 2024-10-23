---
weight: 1
title: hyprpaper
---

hyprpaper is a fast, IPC-controlled wallpaper utility for Hyprland.

## Configuration

The config file is located at `~/.config/hypr/hyprpaper.conf`. It is not
required.

Configuration is done using `preload`, which _loads_ an image into memory. Then,
the `wallpaper` keyword is used to apply the preloaded image to your monitor(s):

```ini
preload = /home/me/amongus.png
wallpaper = monitor, /home/me/amongus.png
```

`monitor` can be left empty to set to all monitors without a set wallpaper:

```ini
wallpaper = , /home/me/amongus.png
```

Monitor names can be checked with `hyprctl monitors`

Also can be used with `desc:` followed by the monitor's description without the (PORT) at the end

You may add `contain:` before the file path in `wallpaper =` to set the mode to contain instead of cover:

```ini
wallpaper = monitor, contain:/home/me/amongus.png
```

You can use `unload` to unload preloaded images. You can also specify `unload all`
to unload all images or `unload unused` to unload images that aren't being used.

Also you can use `reload` to unload preloaded image from your monitor(s),
preload another and set it to your monitor(s). It has the same syntax as
`wallpaper` keyword.

### Run at startup

To run hyprpaper at startup edit `hyprland.conf` and add: `exec-once =
hyprpaper`.

### Misc options

| variable | description | type | default |
| --- | --- | --- | --- |
| splash | enable rendering of the hyprland splash over the wallpaper | bool | false |
| splash_offset | how far (in % of height) up should the splash be displayed | float | 2.0 |
| splash_color | color to use when rendering splash | color | 55ffffff |
| ipc | whether to enable IPC | bool | true |

## IPC

hyprpaper supports IPC via `hyprctl`. Every dispatcher mentioned in
[Configuration](#configuration) can be called with
`hyprctl hyprpaper <dispatcher> <arg(s)>`.

Additionally, you can get some info about the current state of hyprpaper with
`listloaded` and `listactive`.

Examples:

```sh
hyprctl hyprpaper preload "~/Pictures/myepicpng.png"
hyprctl hyprpaper wallpaper "DP-1,~/Pictures/myepicpng.png"
```

```sh
hyprctl hyprpaper listloaded
```

Please note all paths have to be absolute (or start with `~`).
