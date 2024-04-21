---
weight: 5
title: Hyprland Desktop Portal
---

An XDG Desktop Portal (later called XDP) is a program that lets other
applications communicate swiftly with the compositor through D-Bus.

It's used for things like opening file pickers or screen sharing.

On Wayland, it also requires an implementation. For Hyprland, you'd usually use
`xdg-desktop-portal-wlr` (later called XDPW)

Unfortunately, due to various reasons the -wlr portal is inferior to the KDE or
GNOME ones.

In order to bridge the gap, Hyprland has its own fork of XDPW that has more
features, called
[xdg-desktop-portal-hyprland](https://github.com/hyprwm/xdg-desktop-portal-hyprland).
(later called XDPH)

{{< callout >}}

You don't **need** XDPH. Hyprland will work with XDPW, but XDPH has more
features, such as window sharing.

XDPH will work on other wlroots-based compositors, although limited to the XDPW
features (other will be disabled).

{{< /callout >}}

## Installing

{{< tabs items="Arch Linux,Gentoo,Manual" >}}

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
dev-qt/qtbase
dev-qt/qtwayland
dev-qt/qtdeclarative
dev-qt/qtshadertools
```

## Apply necessary useflags

### /etc/portage/package.use

```plain
dev-qt/qtbase opengl egl eglfs gles2-only
dev-qt/qtdeclarative opengl
sys-apps/xdg-desktop-portal screencast
```

## Unmask dependencies and xdph

### /etc/portage/package.accept_keywords

```plain
gui-libs/xdg-desktop-portal-hyprland 
dev-qt/qtbase
dev-qt/qtwayland
dev-qt/qtdeclarative
dev-qt/qtshadertools
```

btw those are the useflags that I have tested, you could also test others.

## Installation

```sh
eselect repository enable guru
emaint sync -r guru
emerge --ask --verbose gui-libs/xdg-desktop-portal-hyprland
```

{{< /tab >}}

{{< tab "Manual" >}}

See
[The Github repo's readme](https://github.com/hyprwm/xdg-desktop-portal-hyprland).

{{</ tab >}}

{{< /tabs >}}

{{< callout type=info >}}

XDPH doesn't implement a file picker. For that, I recommend installing
`xdg-desktop-portal-gtk` alongside XDPH.

{{< /callout >}}

## Usage

Should start automatically.

The most basic way of seeing if everything is OK is by trying to screenshare
anything, or by opening OBS and selecting the PipeWire source. If XDPH is running, a Qt menu
will pop up asking you what to share.

If it doesn't, or if, for example, `slurp` gets opened instead, then XDPW is launching. In that case, try
removing XDPW.

XDPH will work on other wlroots compositors, but features available only on
Hyprland will not work (e.g. window sharing).

For a nuclear option, you can use this script and `exec-once` it:

```sh
#!/usr/bin/env bash
sleep 1
killall -e xdg-desktop-portal-hyprland
killall -e xdg-desktop-portal-wlr
killall xdg-desktop-portal
/usr/lib/xdg-desktop-portal-hyprland &
sleep 2
/usr/lib/xdg-desktop-portal &
```

Adjust the paths if they're incorrect.

## Share picker doesn't use the system theme

Try one or both:

```sh
dbus-update-activation-environment --systemd --all
systemctl --user import-environment QT_QPA_PLATFORMTHEME
```

If it works, add it to your config in `exec-once`.

## Using the KDE file picker with XDPH

XDPH does not implement a file picker and uses the GTK one as a fallback by default (see `/usr/share/xdg-desktop-portal/hyprland-portals.conf`). If you want to use the KDE file picker but let XDPH handle everything else, create a file `~/.config/xdg-desktop-portal/hyprland-portals.conf` with the following content:
```properties
[preferred]
default=hyprland;gtk
org.freedesktop.impl.portal.FileChooser=kde
```
You can read more about this in the [xdg-desktop-portal documentation in the Arch Wiki](https://wiki.archlinux.org/title/XDG_Desktop_Portal). Note that some applications like Firefox may require additional configuration to use the KDE file picker.

## Debugging

If you get long app launch times, or screensharing does not work, consult the
logs.

`systemctl --user status xdg-desktop-portal-hyprland`

If you see a crash, it's likely you are missing either `qt6-wayland` or
`qt5-wayland`.
