hyprpaper is a fast, IPC-controlled wallpaper utility for hyprland.

{{< toc >}}

## Configuration

The config file is located at `~/.config/hypr/hyprpaper.conf`. It is not required.

Configuration is done via `preload`s, which _load_ an image into memory.
Then, you use `wallpaper` keywords to apply the preloaded image to your
monitor(s):

```ini
preload = /home/me/amongus.png
wallpaper = DP-1,/home/me/amongus.png
```

For wallpaper keywords:
 - all paths have to be absolute (or start with `~`)
 - leaving the first parameter (monitor) empty will act as a wildcard
 - adding `contain:` before the path (e.g. `contain:/home/me/amongus.png`) will adjust the fitting algorithm to contain.

You can also `unload` preloaded images to free up memory. `unload all` and `unload unused` are a thing too.

### Misc options
| variable | description | type | default |
| -- | -- | -- | -- |
| splash | enable rendering of the hyprland splash over the wallpaper | bool | false |
| splash_offset | how far (in % of height) up should the splash be displayed | float | 2.0 |
| ipc | whether to enable IPC | bool | true |

## IPC

hyprpaper supports IPC via `hyprctl`. Every dispatcher mentioned in [Configuration](#Configuration)
can be called with `hyprctl hyprpaper <dispatcher> <arg(s)>`.

Additionally, you can get some info about the current state of hyprpaper with `listloaded` and `listactive`.

Examples:
```sh
hyprctl hyprpaper preload "~/Pictures/myepicpng.png"
hyprctl hyprpaper wallpaper "DP-1,~/Pictures/myepicpng.png"
```

```sh
hyprctl hyprpaper listloaded
```

Please note all paths have to be absolute (or start with `~`).
