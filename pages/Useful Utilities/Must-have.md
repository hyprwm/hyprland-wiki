This page documents software that is __strongly__ recommended to have running for a smooth Hyprland experience.

DEs like Plasma or Gnome will take care of this automatically.
Hyprland will not, as you might want to use something else.

### A notification daemon
_Starting method:_ most likely manual (`exec-once`)

Many apps (e.g. Discord) may freeze without one running.

Use e.g. `dunst`, `mako`, `swaync`, etc.

### Pipewire
_Starting method:_ Automatic on Systemd, manual otherwise

Pipewire is not necessarily required, but screensharing will not work without it.

Install `pipewire` and `wireplumber` (**not** `pipewire-media-session`)
#### Non-systemd distros
Since here is no truly standardized way (outside of systemd) to load PipeWire when starting
a graphical shell[^1] non-systemd distros like Gentoo or Artix provide a decicated launcher.

It can be usually found by running `whereis <distro>-pipewire-launcher`.
If such file does not exist on your install please refer to your distro's documentation for help.

[^1]: https://wiki.gentoo.org/wiki/PipeWire#OpenRC

### XDG Desktop Portal
_Starting method:_ Automatic on Systemd, manual otherwise

XDG Desktop Portal handles a lot of stuff for your desktop, like file pickers,
screensharing, etc.

See the [Hyprland Desktop Portal Page](../Hyprland-desktop-portal)

### Authentication Agent
_Starting method:_ manual (`exec-once`)

Authentication agents are the things that pop up a window asking you for a password whenever
an app wants to elevate its privileges.

Our recommendation is the KDE one. For arch, it's `polkit-kde-agent`.

You can autostart it with `exec-once=/usr/lib/polkit-kde-authentication-agent-1`.
On some distributions you might have to use a different path `/usr/libexec/polkit-kde-authentication-agent-1`.

On other distributions that use a more recent version, such as Gentoo, it may be necessary to use `exec-once=/usr/lib64/libexec/polkit-kde-authentication-agent-1` instead.

### Qt Wayland Support
_Starting method:_ none (just a library)

Install `qt5-wayland` and `qt6-wayland`.


