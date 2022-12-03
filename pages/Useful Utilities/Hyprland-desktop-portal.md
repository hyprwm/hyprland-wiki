An XDG Desktop Portal (later called XDP) is a program that lets other
applications communicate swiftly with the compositor through D-Bus.

It's used for stuff like e.g. opening file pickers, screen sharing.

On Wayland, it also requires an implementation. For Hyprland,
you'd usually use `xdg-desktop-portal-wlr` (later called XDPW)

Unfortunately, due to various reasons the -wlr portal is inferior
to the KDE or Gnome ones.

In order to bridge the gap, Hyprland has its own fork of XDPW that
has more features, called [xdg-desktop-portal-hyprland](https://github.com/hyprwm/xdg-desktop-portal-hyprland).
(later called XDPH)

{{< hint type=important >}}
You don't **need** XDPH. Hyprland will work with XDPW, but XDPH has more features, like e.g.
region sharing.
{{< /hint >}}

## Installing

See [The Github repo's readme](https://github.com/hyprwm/xdg-desktop-portal-hyprland).

Make sure to disable XDPW from starting to avoid conflicts.

For a nuclear option, you can use this script and `exec-once` it:
```sh
#!/bin/bash
sleep 1
killall xdg-desktop-portal-hyprland
killall xdg-desktop-portal-wlr
killall xdg-desktop-portal
/usr/lib/xdg-desktop-portal-hyprland &
sleep 2
/usr/lib/xdg-desktop-portal &
```
