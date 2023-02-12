Here you will find links to some other projects that may not fit into any of the above categories.

### Workspace management
[hyprsome](https://github.com/sopa0/hyprsome) by _sopa0_: Awesome-like workspaces for Hyprland.

### Keyboard layout management
[hyprland-per-window-layout](https://github.com/coffebar/hyprland-per-window-layout/) by _MahouShoujoMivutilde and coffebar_: Per window keyboard layouts for Hyprland.

### IPC wrappers
[hyprland-rs](https://github.com/yavko/hyprland-rs) by _yavko_: A neat wrapper for Hyprland's IPC written in Rust

### Automatically Mounting Using `udiskie`

_Starting method:_ manual ('exec-once')

USB Mass storage devices, like thumb drives, mobile phones, digital cameras, etc. do not mount automatically to the file system.

We generally have to manually mount it, often using root and `umount` to do so.

Many popular DEs automatically handle this by using `udisks2` wrappers.


`udiskie` is a udisks2 front-end that allows to manage removable media such as CDs or flash drives from userspace.

Install `udiskie` via your repositories, or [build manually](https://github.com/coldfix/udiskie/wiki/installation)

Head over to your `~/.config/hypr/hyprland.conf` and add the following lines:

```ini
exec-once = udiskie &
```

What this does is launches `udiskie` and `&` argument launches it in the background. 

[See more uses here](https://github.com/coldfix/udiskie/wiki/Usage) .

