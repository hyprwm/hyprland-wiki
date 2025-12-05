---
weight: 1
title: hyprpaper
---

[hyprpaper](https://github.com/hyprwm/hyprpaper) is a fast, IPC-controlled wallpaper utility for Hyprland.

## Installation

{{% details title="Arch" closed="true" %}}

```sh
pacman -S hyprpaper
```

{{% /details %}}

{{% details title="openSUSE" closed="true" %}}

```sh
zypper install hyprpaper
```

{{% /details %}}

{{% details title="Fedora" closed="true" %}}

```sh
sudo dnf install hyprpaper
```

{{% /details %}}

## Configuration

The config file is located at `~/.config/hypr/hyprpaper.conf`. It is not
required.

### Setting wallpapers

Wallpapers are set as anonymous special categories. Monitor can be left empty for a fallback.

| variable | description | value |
| --- | --- | --- |
| `monitor` | Monitor to display this wallpaper on. If empty, will use this wallpaper as a fallback | monitor ID |
| `path` | Path to the image file | path |
| `fit_mode` | Determines how to display the image. Optional and defaults to `cover` | `contain`\|`cover`\|`tile`\|`fill` |

```ini
wallpaper {
    monitor = DP-3
    path = ~/myFile.jxl
    fit_mode = cover
}

wallpaper {
    monitor = DP-2
    path = ~/myFile2.jxl
    fit_mode = cover
}

# ...
```


### Run at Startup

To run hyprpaper at startup edit `hyprland.conf` and add: `exec-once = hyprpaper`.  
If you start Hyprland with [uwsm](../../Useful-Utilities/Systemd-start), you can also use the `systemctl --user enable --now hyprpaper.service` command.

### Misc Options

These should be set outside of the `wallpaper{...}` sections.

| variable | description | type | default |
| --- | --- | --- | --- |
| `splash` | enable rendering of the hyprland splash over the wallpaper | bool | `false` |
| `splash_offset` | how far up should the splash be displayed | float | `20` |
| `splash_opacity` | how opaque the splash is | float | `0.8` |
| `ipc` | whether to enable IPC | bool | `true` |

## IPC

hyprpaper supports IPC via `hyprctl`. You can set wallpapers like so:

```sh
hyprctl hyprpaper wallpaper '[mon], [path], [fit_mode]'
```

`fit_mode` is optional, and `mon` can be empty for a fallback, just like in the config file.
