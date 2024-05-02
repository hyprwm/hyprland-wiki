---
weight: 6
title: xdg-desktop-portal-hyprland
---

xdg-desktop-portal-hyprland is Hyprland's xdg-desktop-portal implementation. It
allows for screensharing, global shortcuts, etc.

## Configuration

Example:
```ini
screencopy {
    max_fps = 60
}
```

Config file `~/.config/hypr/xdph.conf` allows for these variables:

### category screencopy

| variable | description | type | default value |
| -- | -- | -- | -- |
| max_fps | Maximum fps of a screensharing session. 0 means no limit. | int | 120 |

## Troubleshooting

See the
[XDG Desktop Portal wiki page](../../Useful-Utilities/xdg-desktop-portal-hyprland).
