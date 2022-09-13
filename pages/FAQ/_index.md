　
{{< toc format=html >}}

### Nothing renders / screen is empty / crash on opening first app

Possible causes:

> Your themes are not set up properly, making apps crash.

Use something like `qt5ct` (QT) and `lxappearance` (GTK) (\*for GTK you can also
set up themes with envvars) to set up your themes.

> Your PC is very, very old.

In that case, see the
[Installation Page](../../Getting-Started/Installation) and
try compiling with LEGACY_RENDERER

*For more info about bugs and crashes, see this*
*[wiki page](../../Crashes-and-Bugs)*

### Me cursor no render?

Are you on NVIDIA? If so, then you have been a naughty boy and haven't listened
to my tips on other pages. Use the `WLR_NO_HARDWARE_CURSORS=1` environment
variable.

### My external monitor is blank / doesn't render / receives no signal (laptop)

For Radeon graphics - unfortunately, it's a bug in wlroots, and I can't
do much about it other than wait for the wlroots devs to fix it:
[https://gitlab.freedesktop.org/wlroots/wlroots/-/issues/3451](https://gitlab.freedesktop.org/wlroots/wlroots/-/issues/3451)

For Nvidia graphics - unfortunately, it's a wlroots issue as well, most likely due to Nvidia's
lack of support and proprietary drivers.

There is a way to fix it that *might* work for you though:

**Option 1:** Use *only* the external monitor

By using `WLR_DRM_DEVICES=/dev/dri/card1` (or `card0`) you can force Hyprland to use only your dGPU,
meaning your laptop's screen will be gone but your external one will work.

**Option 2:** Use all outputs, at the cost of battery life.

By switching your laptop to only use the dGPU in the BIOS, you *might* be able to get everything to work,
at the cost of high battery usage.

*Please note these are highly model-specific and might or might not work. If they don't, you're unfortunately out of luck.*

You might try a USB-C to hdmi adapter though, maybe that could route the external monitor through the iGPU.

### How do I screenshot?

Install `grim-git` and `slurp`

Use a keybind (or execute) `grim -g $(slurp)`, select a region. A screenshot
will pop into your `~/Pictures/` (You can configure grim and slurp, see their
github pages).

For a more complete utility, try our own
[Grimblast](https://github.com/hyprwm/contrib).

### Screenshare / OBS no worky!

Check [Screensharing](../Useful-Utilities/Screen-Sharing).

### How do I change my wallpaper?

See [Wallpapers](../Useful-Utilities/Wallpapers).

### My workspace (2, 3, or any other) is like... bugged?

You did the below, unknowingly.

### My games work poorly, especially proton ones!

Use `gamescope`, tends to fix any and all issues with wayland/Hyprland.

### How heavy is this?

Not that much heavier than Xorg. If you want maximum performance, consider
turning off the blur and animations.

### Blur makes my GPU cry :(

You probably forgot to turn on `decoration:blur_new_optimizations`. Thank me
later.

### My monitor no worky!

Try changing the mode in your config. If your preferred one doesn't work, try a
lower one. A good way to list all modes is to get `wlr-randr` and do a
`wlr-randr --dryrun`

### How do I get a coredump?

*These instructions are ONLY for systemd. If you use anything else, you should
know what you're doing.*

Launch `coredumpctl` in a terminal. Press <key>END</key> on the keyboard to go
to the end. Note the **last** (the one furthest to the bottom) crash that has
`/usr/bin/Hyprland` as an executable. Remember the PID of it (the first number
after the date in a given line) exit (<key>Ctrl</key>+<key>C</key>) type
`coredumpctl info PID` where `PID` is the remembered PID. Send the entire thing
as a file.

### How do I update?

open a terminal where you cloned the repo.
`git pull && sudo make clear && sudo make install`

### Waybar popups render behind the windows??

You have misconfigured Waybar. Make sure the `layer` in the waybar config is set to `top`, and not `bottom`.

### How do I screen lock?

Use a wayland-compatible locking utility using WLR protocols, e.g. `swaylock`.

### How do I change me mouse cursor?

Use a tool like for example `lxappearance` to change the GTK cursor.

After that, add `exec-once=hyprctl setcursor [THEME] [SIZE]` to your config and
restart Hyprland.

Alternatively, change the config files manually according to the
[XDG specification (Arch Wiki link)](https://wiki.archlinux.org/title/Cursor_themes#Configuration).

Make sure to also edit `~/.config/gtk-4.0/settings.ini` and `~/.gtkrc-2.0` if
_not_ using a tool (like `lxappearance`).

Then, do a `gsettings set $gnome-schema cursor-theme 'theme-name'` and you're
all good!

If it still doesn't work...

### GTK Settings no work / whatever!

[https://github.com/swaywm/sway/wiki/GTK-3-settings-on-Wayland](https://github.com/swaywm/sway/wiki/GTK-3-settings-on-Wayland)

### My \[program name\] is freezing!

Make sure you have a notification daemon running, for example `dunst`. Autostart
it with the `exec-once` keyword.

### I want to use Waybar, but the workspaces don't work!

Check [Status bars](../Useful-Utilities/Status-Bars).

### Waybar doesn't show the active workspace!

Use the style for `#workspaces button.active`

### How do I autostart my favorite apps?

Using the window rules to assign apps to workspace you can setup a session start
script to open a bunch of applications on various workspaces. The following
method will start these apps silently (i.e. without the flickering from
workspace to workspace) and deassign the rule so that subsequent start of this
app will not start it on the initially assigned workspace (which could be a drag
if e.g. you want kitty to be started on ws 1 while you need kitty to open on any
workspace subsequently).

Put the following in your `hyprland.conf`: (example)

```plain
windowrule=workspace 1 silent,kitty
windowrule=workspace 1 silent,Subl
windowrule=workspace 3 silent,Mailspring
windowrule=workspace 4 silent,firefox
[...]
exec-once=kitty
exec-once=subl
exec-once=mailspring
exec-once=firefox
[...]
exec-once=cleanup_after_start.sh
```

where `cleanup_after_start.sh` script contains:

```sh
sleep 10
hyprctl keyword windowrule "workspace unset,kitty"
hyprctl keyword windowrule "workspace unset,Subl"
hyprctl keyword windowrule "workspace unset,Mailspring"
hyprctl keyword windowrule "workspace unset,firefox"
```

in `sleep 10`, the 10 seconds is of course only a suggestion.

### How do I move my favorite workspaces to a new monitor when I plug it in?

if you want workspaces to automatically go to a monitor upon connection, use the
following:

In hyprland.conf:

```plain
exec-once=handle_monitor_connect.sh
```

where `handle_monitor_connect.sh` is: (example)

```sh
#!/bin/sh

function handle {
  if [[ ${1:0:12} == "monitoradded" ]]; then
    hyprctl dispatch moveworkspacetomonitor "1 1"
    hyprctl dispatch moveworkspacetomonitor "2 1"
    hyprctl dispatch moveworkspacetomonitor "4 1"
    hyprctl dispatch moveworkspacetomonitor "5 1"
  fi
}

socat - UNIX-CONNECT:/tmp/hypr/.socket2.sock | while read line; do handle $line; done
```

if you want workspaces 1 2 4 5 to go to monitor 1 when connecting it.

Please note this requires `socat` to be installed.

### My tablet no worky??

Use [Open Tablet Driver](https://github.com/OpenTabletDriver/OpenTabletDriver)
to configure your tablet. In the future it will be supported in the config.
Until then, OTD.

### Some of my apps take a really long time to open...?

*~/.config/hypr/hyprland.conf*

```plain
exec-once=dbus-update-activation-environment --systemd WAYLAND_DISPLAY XDG_CURRENT_DESKTOP
```
or
```plain
exec-once=systemctl --user import-environment WAYLAND_DISPLAY XDG_CURRENT_DESKTOP
```

### My cursor in QT apps is too big!

The QT cursor size can be fixed by setting the envvar `XCURSOR_SIZE=24`. You
should probably add it to your exported envvars.

### How do I export envvars for Hyprland?

As with any Display Server, Xorg included, you should probably make a script to
launch it, for example:

```plain
export AMONG_US=1
exec Hyprland
```

and launch that.

For Display Manager users, you can replace the `exec` entry in
the `.desktop` file to point to your script.

### I get random white flashes!

Try disabling VFR with `misc:no_vfr=1`.

### How do I make Hyprland draw as little power as possible on my laptop?

I assume you already have `damage_tracking` on full. If you don't, do it. It's
heavily advised to use `full` regardless of anything.

Optimization options:

*feel free to ignore any that you find causing issues*

`decoration:blur_new_optimizations = true`

`decoration:blur = false`

`decoration:drop_shadow  = false`

`misc:no_vfr = false`

*possibly* `misc:disable_autoreload = true`