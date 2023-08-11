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
See [The Github repo's readme](https://github.com/hyprwm/xdg-desktop-portal-hyprland).

{{</ tab >}}

{{< /tabs >}}

{{< hint type=important >}}
It's recommended to uninstall any other portal implementations to avoid conflicts with the `-hyprland` or `-wlr` ones.

`-kde` and `-gnome` portals are known to cause issues.

The `-kde` portal is unfortunately a hard dependency of `plasma-integration` in Arch Linux. To uninstall it,
run the command `pacman -Rnsdd xdg-desktop-portal-kde`, which skips all dependency checks.

Both `-wlr` and `-hyprland` installed at once will also cause conflicts. Choose one and uninstall the other.

To keep any incompatible portal installed the relvant `.portal` file can be moved out of
'/usr/share/xdg-desktop-portal/portals/' to temporarily disable the portal. A script and the `exec-once`
directive can be used to automate this process at startup:

```bash
#!/bin/sh
# usage: $0 portal-name [enable/disable]
# args:
#     portal-name: the name of the .portal file in /usr/share/xdg-desktop-portal/portals/ without the extension
#     [enable/disable]: optional - whether to move the file into $ENABLED_PORTAL_DIR to enable it,
#                              or to move it into $DISABLED_PORTAL_DIR to disable it. The portal will be toggled
#                              if this argument is omitted.

ENABLED_PORTAL_DIR="/usr/share/xdg-desktop-portal/portals"
# needs to be created manually
DISABLED_PORTAL_DIR="/usr/share/xdg-desktop-portal/disabled-portals"

function is_enabled {
  [ -f "$ENABLED_PORTAL_DIR/$1.portal" ]
}

function is_disabled {
  [ -f "$DISABLED_PORTAL_DIR/$1.portal" ]
}

function enable {
  mv "$DISABLED_PORTAL_DIR/$1.portal" "$ENABLED_PORTAL_DIR/$1.portal"
}

function disable {
  mv "$ENABLED_PORTAL_DIR/$1.portal" "$DISABLED_PORTAL_DIR/$1.portal"
}

PORTAL=$1
ENABLE=${2:-$(is_enabled $PORTAL && echo "disable" || echo "enable")}

if [ $ENABLE = "enable" ]; then
  is_disabled $PORTAL && enable $PORTAL
else
  is_enabled $PORTAL && disable $PORTAL
fi
```

The incompatible portal can then be re-enabled with the same script inside the autostart mechanisim of the intented
environment. Keep in mind that the directory for disabled portals needs to be created manually and this script needs
to have access to /usr/share/xdg-desktop-portal/portals/ and the disabled directory.
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
killall -e xdg-desktop-portal-hyprland
killall -e xdg-desktop-portal-wlr
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
