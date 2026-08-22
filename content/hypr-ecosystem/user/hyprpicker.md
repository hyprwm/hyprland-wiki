---
weight: 20
title: hyprpicker
---

[hyprpicker](https://github.com/hyprwm/hyprpicker) is a neat utility for picking a color from your screen on Hyprland.

## Configuration

Doesn't require configuration, only launch flags:

| Flag | Description | Args |
| --- | --- | --- |
| `-a`/`--autocopy` | Automatically copies the output to the clipboard (requires wl-clipboard) | [[Empty]] |
| `-f`/`--format=` | Specifies the output format | `cmyk` \| `hex` \| `rgb` \| `hsl` \| `hsv` |
| `-o`/`--output-format=` | Specifies how the output color should be formatted | string format e.g. "rgb({0}, {1}, {2})" |
| `-n`/`--notify` | Sends a desktop notification when a color is picked (requires notify-send and a notification daemon like dunst) | [[Empty]] |
| `-b`/`--no-fancy` | Disables the "fancy" (aka. colored) outputting | [[Empty]] |
| `-h`/`--help` | Shows the help message | [[Empty]] |
| `-r`/`--render-inactive` | Render (freeze) inactive displays | [[Empty]] |
| `-z`/`--no-zoom` | Disable the zoom lens | [[Empty]] |
| `-q`/`--quiet` | Disable most logs (leaves errors) | [[Empty]] |
| `-v`/`--verbose` | Enable more logs | [[Empty]] |
| `-t`/`--no-fractional` | Disable fractional scaling support | [[Empty]] |
| `-d`/`--disable-hex-preview` | Disable live preview of Hex code | [[Empty]] |
| `-l`/`--lowercase-hex` | Outputs the hexcode in lowercase | [[Empty]] |
| `-s`/`--scale=scale` | Set the zoom scale | float between 1.0 and 10.0 |
| `-u`/`--radius=radius` | Set the circle radius | int between 1 and 1000 |
| `-N`/`--name` | Copies the standard color name instead of the format if matched (requires -a) | [[Empty]] |
| `-V`/`--version` | Print version info | [[Empty]] |
