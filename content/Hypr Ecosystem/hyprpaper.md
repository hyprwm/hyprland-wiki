---
weight: 1
title: hyprpaper
---

hyprpaper is a fast, IPC-controlled wallpaper utility for Hyprland.

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

{{% details title="Manual" closed="true" %}}

### Dependencies
The development files of these packages need to be installed on the system for `hyprpaper` to build correctly.
(Development packages are usually suffixed with `-dev` or `-devel` in most distros' repos).

- wayland
- wayland-protocols
- pango
- cairo
- file
- libglvnd
- libglvnd-core
- libjpeg-turbo
- libwebp
- hyprlang
- hyprutils
- hyprgraphics
- hyprwayland-scanner

To install all of these in Fedora, run this command:

```sh
sudo dnf install wayland-devel wayland-protocols-devel hyprlang-devel pango-devel cairo-devel file-devel libglvnd-devel libglvnd-core-devel libjpeg-turbo-devel libwebp-devel gcc-c++ hyprutils-devel hyprwayland-scanner
```

On Arch:

```sh
sudo pacman -S ninja gcc wayland-protocols libjpeg-turbo libwebp pango cairo pkgconf cmake libglvnd wayland hyprutils hyprwayland-scanner hyprlang
```

On openSUSE:

```sh
sudo zypper install ninja gcc-c++ wayland-protocols-devel Mesa-libGLESv3-devel file-devel hyprutils-devel hyprwayland-scanner
```

### Building

Building is done via CMake:

```sh
cmake --no-warn-unused-cli -DCMAKE_BUILD_TYPE:STRING=Release -DCMAKE_INSTALL_PREFIX:PATH=/usr -S . -B ./build
cmake --build ./build --config Release --target hyprpaper -j`nproc 2>/dev/null || getconf _NPROCESSORS_CONF`
```

Install with:

```sh
cmake --install ./build
```

{{% /details %}}

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

Monitor names can be checked with `hyprctl monitors`.

Also can be used with `desc:` followed by the monitor's description without the (PORT) at the end.

You may add `contain:` or `tile:` before the file path in `wallpaper =` to set the mode to either contain or tile, respectively, instead of cover:

```ini
wallpaper = monitor, contain:/home/me/amongus.png
```

You can use `unload` to unload preloaded images. You can also specify `unload all`
to unload all images or `unload unused` to unload images that aren't being used.

### The `reload` keyword

The `reload` keyword allows you to set / change wallpapers without
having to preload them. For example, you could have a completely empty
hyprpaper config (with [IPC](#ipc) enabled!!), and run the below command to
very simply set your wallpaper (this example sets the wallpaper for
all monitors):
```
hyprctl hyprpaper reload ,"~/amogus.png"
```

Running this command again with a new wallpaper would effectively swap
the wallpaper with the new one, automating the whole preload, set,
unload old sequence.

{{< callout type=warning >}}

`Monitor Specificity` Once a monitor has a wallpaper set specifically (e.g., `hyprctl hyprpaper reload "DP-1,~/amogus.png"`),
it won't be affected by the wildcard (`hyprctl hyprpaper reload ,"~/amogus.png"`).

{{< /callout >}}

#### Using this keyword to randomize your wallpaper

You can also use this simple `reload` functionality to randomize your wallpaper. Using a simple script like so would do it very easily:

```bash
#!/usr/bin/env bash

WALLPAPER_DIR="$HOME/wallpapers/"
CURRENT_WALL=$(hyprctl hyprpaper listloaded)

# Get a random wallpaper that is not the current one
WALLPAPER=$(find "$WALLPAPER_DIR" -type f ! -name "$(basename "$CURRENT_WALL")" | shuf -n 1)

# Apply the selected wallpaper
hyprctl hyprpaper reload ,"$WALLPAPER"
```

For a multiple-monitor setup, you can use this modified script that randomizes the wallpaper of your currently focused monitor:

```bash
#!/usr/bin/env bash

WALLPAPER_DIR="$HOME/wallpapers/"
CURRENT_WALL=$(hyprctl hyprpaper listloaded)
# Get the name of the focused monitor with hyprctl
FOCUSED_MONITOR=$(hyprctl monitors -j | jq -r '.[] | select(.focused) | .name')
# Get a random wallpaper that is not the current one
WALLPAPER=$(find "$WALLPAPER_DIR" -type f ! -name "$(basename "$CURRENT_WALL")" | shuf -n 1)

# Apply the selected wallpaper
hyprctl hyprpaper reload "$FOCUSED_MONITOR","$WALLPAPER"

```

Make sure to change the `WALLPAPER_DIR` to your own wallpaper directory. You can then run this
script in your Hyprland config with a keybind.

### Run at startup

To run hyprpaper at startup edit `hyprland.conf` and add: `exec-once =
hyprpaper`. If you start Hyprland with [uwsm](../../Useful-Utilities/Systemd-start), you can also use `systemctl --user enable --now hyprpaper.service` command.

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
