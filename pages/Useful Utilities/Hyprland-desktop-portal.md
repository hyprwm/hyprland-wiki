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
window sharing.

XDPH will work on other wlroots-based compositors, although limited to the XDPW features (other
will be disabled)
{{< /hint >}}

## Installing
{{< tabs "uniqueid" >}}

{{< tab "Arch Linux" >}}
```plain
pacman -S xdg-desktop-portal-hyprland
```
or, for -git:
```plain
yay -S xdg-desktop-portal-hyprland-git
```

{{< /tab >}}
{{< tab "Gentoo" >}}
## Unmask dependencies
### /etc/portage/profile/package.unmask
```plain
=dev-qt/qtbase-6.4.0
=dev-qt/qtwayland-6.4.0
=dev-qt/qtdeclarative-6.4.0
=dev-qt/qtshadertools-6.4.0
```

## Apply necessary useflags
### /etc/portage/package.use
```plain
dev-qt/qtbase opengl egl eglfs gles2-only
dev-qt/qtdeclarative opengl
gui-libs/xdg-desktop-portal-hyprland select-window select-region
sys-apps/xdg-desktop-portal screencast
```

## Unmask dependencies and xdph
### /etc/portage/package.accept_keywords
```plain
gui-libs/xdg-desktop-portal-hyprland **
=dev-qt/qtbase-6.4.0
=dev-qt/qtwayland-6.4.0
=dev-qt/qtdeclarative-6.4.0
=dev-qt/qtshadertools-6.4.0
```

btw those are the useflags that I have tested, you could also test others. Also if the gentoo devs update the qt ebuilds without marking them as stable you'll need to check the ebuild version and update it on '/etc/portage/package.accept_keywords' and '/etc/portage/profile/package.unmask'

example: '=dev-qt/qtbase-6.5.0'

## Installation
```sh
eselect repository add useless-overlay git https://github.com/Wa1t5/useless-overlay
emaint sync -r useless-overlay
emerge --ask --verbose gui-libs/xdg-desktop-portal-hyprland
```

{{< /tab >}}
{{< tab "Manual" >}}
See [The Github repo's readme](https://github.com/hyprwm/xdg-desktop-portal-hyprland).

{{</ tab >}}

{{< /tabs >}}

{{< hint type=important >}}
It's recommended to uninstall any other portal implementations to avoid conflicts with the `-hyprland` or `-wlr` ones.

`-kde` and `-gnome` are known to cause issues.

`-kde` is unfortunately a hard dep of `plasma-integration` in Arch Linux, so if using that, you'll need to `pacman -Rnsdd xdg-desktop-portal-kde`.

both `-wlr` and `-hyprland` installed at once will also cause conflicts. Choose one and uninstall the other.
{{< /hint >}}

## Usage

Should start automatically.

The most basic way of telling everything is OK is by trying to screenshare anything, or
open OBS and select pipewire source. If XDPH is running, a qt menu will pop up asking you
what to share.

If it doesn't, and you get e.g. slurp, then XDPW is launching. In that case, try removing XDPW.

XDPH will work on other wlroots compositors, but features available only on Hyprland will not work
(e.g. window sharing)

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
adjust the paths if incorrect.

## Debugging

If you get long app launch times, or screensharing does not work, consult the logs.

`systemctl --user status xdg-desktop-portal-hyprland`

if you see a crash, it's most likely you are missing `qt6-wayland` and/or `qt5-wayland`.

if you don't, make _sure_ you don't have `-kde` or `-gnome` installed. Only `-gtk`
will work with `-hyprland` or `-wlr` on Hyprland.
