
This page documents software that is critical / very important to have running for a smooth
Wayland / Hyprland experience.

DEs like KDE / Gnome will do this automatically, Hyprland will not (because you might want to use something else)

### A notification daemon
_Starting method:_ most likely manual (`exec-once`)

Many apps (e.g. Discord) may freeze without one running.

Use e.g. `dunst`, `mako`, etc.

### Pipewire
_Starting method:_ automatic

Pipewire is not necessairly required, but screensharing will not work
without it.

Install `pipewire` and `wireplumber` (**not** `pipewire-media-session`)

### XDG Desktop Portal
_Starting method:_ Automatic on Systemd, manual otherwise

XDG Desktop Portal handles a lot of stuff for your desktop, like file pickers,
screensharing, etc.

See [The Hyprland Desktop Portal Page](../Hyprland-desktop-portal)

### Authentication Agent
_Starting method:_ manual (`exec-once`)

Authentication agents are the things that pop up a window asking you for a password whenever
an app wants to elevate its privileges.

Our recommendation is the KDE one. For arch, it's `polkit-kde-agent`.

You can autostart it with `exec-once=/usr/lib/polkit-kde-authentication-agent-1`.
On some distributions you might have to use a different path `/usr/libexec/polkit-kde-authentication-agent-1`.

On other distributions that use a more recent version, such as Gentoo, it may be necessary to use `exec-once=/usr/lib64/libexec/polkit-kde-authentication-agent-1` instead.

### QT Wayland Support
_Starting method:_ none (just a library)

Install `qt5-wayland` and `qt6-wayland`.


