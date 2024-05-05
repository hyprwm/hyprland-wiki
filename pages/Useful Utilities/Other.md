---
weight: 10
title: Other
---

Here you will find links to some other projects that may not fit into any of the
above categories.

### Workspace management

[hyprsome](https://github.com/sopa0/hyprsome) by _sopa0_: Awesome-like
workspaces for Hyprland.

### Keyboard layout management

[hyprland-per-window-layout](https://github.com/coffebar/hyprland-per-window-layout/)
by _MahouShoujoMivutilde and coffebar_: Per window keyboard layouts for
Hyprland.

### Editor support for config files

[HyprLS](https://github.com/hyprland-community/hyprls) by _ewen-lbh_: A LSP server to provide auto-completion and more for Hyprland's configuration files in neovim, VS Code & others

### IPC wrappers

[hyprland-rs](https://github.com/yavko/hyprland-rs) by _yavko_: A neat wrapper
for Hyprland's IPC written in Rust.

### Screen shaders/color temperature

[hyprshade](https://github.com/loqusion/hyprshade) by _loqusion_: Utility for
swapping and scheduling screen shaders; also functions as an
[automatic color temperature shifter](https://en.wikipedia.org/wiki/F.lux).

### Wireless settings
- [iwgtk](https://github.com/J-Lentz/iwgtk) by _Jesse Lentz_: WiFi settings frontend for `iwd` in GTK
- [blueberry](https://github.com/linuxmint/blueberry) by _Linux Mint_: Bluetooth settings frontend in GTK
- [Overskride](https://github.com/kaii-lb/overskride) by _kaii-lb_: A simple yet powerful bluetooth client in GTK4
- [nm-applet](https://gitlab.gnome.org/GNOME/network-manager-applet) by _GNOME_: Applet for interfacing with NetworkManager in GTK

### Automatically Mounting Using `udiskie`

_Starting method:_ manual ('exec-once')

USB mass storage devices, like thumb drives, mobile phones, digital cameras,
etc. do not mount automatically to the file system.

Typically, we have to manually mount them, often using root and `umount` to do so.

Many popular DEs automatically handle this by using `udisks2` wrappers.

`udiskie` is a udisks2 front-end that allows to manage removable media such as
CDs or flash drives from userspace.

Install `udiskie` via your repositories, or
[build manually](https://github.com/coldfix/udiskie/wiki/installation)

Head over to your `~/.config/hypr/hyprland.conf` and add the following lines:

```ini
exec-once = udiskie &
```

This launches `udiskie` and the `&` argument launches it in the
background.

[See more uses here](https://github.com/coldfix/udiskie/wiki/Usage).
