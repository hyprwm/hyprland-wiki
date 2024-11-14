---
weight: 11
title: FAQ
---

### My apps are pixelated

This just means they are running through XWayland, which physically cannot scale
by fractional amounts.

To force them to run in native Wayland mode, see
[the Master Tutorial](../Getting-Started/Master-Tutorial/#force-apps-to-use-wayland).

If they can't, see [the XWayland page](../Configuring/XWayland).

### Nothing renders / screen is empty / crash on opening first app

Possible causes:

> Your themes are not set up properly, making apps crash.

Use something like `qt6ct` (Qt) and `nwg-look` (GTK) (\*for GTK you can also set
up themes with envvars) to set up your themes.

> Your PC is very, _very_ old.

In that case, see the [Installation Page](../Getting-Started/Installation)
and try compiling with LEGACY_RENDERER

_For more info about bugs and crashes, see this_
_[wiki page](../Crashes-and-Bugs)_

### My external monitor is blank / doesn't render / receives no signal (laptop)

For Nvidia graphics - This issue appears to be resolved when using Nvidia
Drivers 525.60.11 or later, but it may persist with older drivers.

For systems with limited hardware (Ex. iGPU, USB-C, USB Hubs) - Set `env = AQ_NO_MODIFIERS,1` in your config.
To diagnose if you have the exact problem above you can get a [DRM log](https://wiki.hyprland.org/Crashes-and-Bugs/#debugging-drm-issues) and look for

```plain
Requested display configuration exceeds system DDB limitations
```

Outside those, there is a way to fix it that _might_ work for you though:

**Option 1:** Use _only_ the external monitor

By using `AQ_DRM_DEVICES=/dev/dri/card1` (or `card0`) environment variable you can force Hyprland to
use only your dGPU, meaning your laptop's screen will be gone but your external
one will work.

**Option 2:** Use all outputs, at the cost of battery life.

By switching your laptop to only use the dGPU in the BIOS, you _might_ be able
to get everything to work, at the cost of high battery usage.

_Please note these are highly model-specific and might or might not work. If
they don't, you're unfortunately out of luck._

You might try a USB-C to HDMI adapter though, maybe that could route the
external monitor through the iGPU.

### How do I screenshot?

**Option 1:** Install `grim` and `slurp`.

Use a keybind (or execute) `grim -g "$(slurp)"`, and select a region. A screenshot
will pop into your `~/Pictures/` (You can configure grim and slurp, see their
GitHub pages).

If you want those screenshots to go directly to your clipboard, consider using
`wl-copy`, from [`wl-clipboard`](https://github.com/bugaevc/wl-clipboard).
Here's an example binding:
`bind = , Print, exec, grim -g "$(slurp -d)" - | wl-copy` For a more complete
utility, try our own screenshotting utility:
[Grimblast](https://github.com/hyprwm/contrib).

**Option 2:** You can also use hyprshot, more info [here](https://github.com/Gustash/Hyprshot).

**Option 3:** Install `flameshot`.

Flameshot has many built-in features like allowing you to draw with a paintbrush,
add lines, add shapes, etc.

Flameshot was built originally for X and **it has many issues on Wayland** and users
with HiDPI and multi-monitor setups have had mixed experiences with Flameshot.
The options above are smoother and more native to Wayland. If you still want to
use Flameshot, here are some configuration recommendations by users who've found
workarounds.

```ini
# noanim isn't necessary but animations with these rules might look bad. use at your own discretion.
windowrulev2 = noanim, class:^(flameshot)$
windowrulev2 = float, class:^(flameshot)$
windowrulev2 = move 0 0, class:^(flameshot)$
windowrulev2 = pin, class:^(flameshot)$
# set this to your leftmost monitor id, otherwise you have to move your cursor to the leftmost monitor
# before executing flameshot
windowrulev2 = monitor 1, class:^(flameshot)$

# ctrl-c to copy from the flameshot gui gives warped images sometimes, but
# setting the env fixes it
bind = ..., exec, XDG_CURRENT_DESKTOP=sway flameshot gui
```

For recording videos, [wf-recorder](https://github.com/ammen99/wf-recorder),
[wl-screenrec](https://github.com/russelltg/wl-screenrec) or
[OBS Studio](https://obsproject.com/) could be used.

### Screenshare / OBS no worky

Check [Screensharing](../Useful-Utilities/Screen-Sharing).

Also install `qt6-wayland` if you plan to use obs.

### How do I change my wallpaper?

See [Wallpapers](../Useful-Utilities/Wallpapers).

### How heavy is this?

Not that much heavier than Xorg. If you want maximum performance, consider
turning off the blur and animations.

### My monitor no worky

Try changing the mode in your config. If your preferred one doesn't work, try a
lower one. A good way to list all modes is to get `wlr-randr` and do a
`wlr-randr --dryrun`

### My monitor has flickering brightness when I turn on VRR

Change the VRR option to `2` (fullscreen), so that it is only used in games.
This happens because the brightness on some monitors can depends on the refresh
rate, and rapidly changing refresh rates (for example, when the screen
momentarily updates after pressing a key) will cause rapid changes in
brightness.

### How do I update?

Open a terminal where you cloned the repo.

```bash
git pull
make all && sudo make install
```

If you are using the AUR (hyprland-git) package, you will need to cleanbuild to
update the package. Paru has been problematic with updating before, use Yay.

### How do I screen lock?

Use a Wayland-compatible locking utility using WLR protocols, e.g. `swaylock`.
Be aware that they will not prevent tty-changing using Ctrl-Alt-F1...F7.

### How do I change me mouse cursor?

See [hyprcursor](../Hypr-Ecosystem/hyprcursor)

1. Set the GTK cursor using [nwg-look](https://github.com/nwg-piotr/nwg-look).
2. Add `exec-once=hyprctl setcursor [THEME] [SIZE]` to your config and restart Hyprland.

If using flatpak, run `flatpak override --filesystem=~/.themes:ro --filesystem=~/.icons:ro --user` and put your themes in both `/usr/share/themes` and `~/.themes`, and put your icons and cursors in both `/usr/share/icons` and `~/.icons`.

For Qt applications, Hyprland exports XCURSOR_SIZE as 24, which is the default.
You can overwrite this by exporting XCURSOR_SIZE to a different value with `env`.

You can also try running `gsettings set org.gnome.desktop.interface cursor-theme 'theme-name'` or adding it after `exec-once=` in your config.

If you do not want to install a GTK settings editor, change the config files according to the
[XDG specification (Arch Wiki link)](https://wiki.archlinux.org/title/Cursor_themes#Configuration).
Make sure to also edit `~/.config/gtk-4.0/settings.ini` and `~/.gtkrc-2.0` if _not_ using a tool
(like `nwg-look`).

### GTK Settings no work / whatever

[https://github.com/swaywm/sway/wiki/GTK-3-settings-on-Wayland](https://github.com/swaywm/sway/wiki/GTK-3-settings-on-Wayland)

### My \[program name\] is freezing

Make sure you have a notification daemon running, for example `dunst`. Autostart
it with the `exec-once` keyword.

### Waybar workspaces no worky???

Waybar has a set of caveats or settings that you need to be aware of. See
[Status bars](../Useful-Utilities/Status-Bars) for solutions.

### How do I autostart my favorite apps?

Using the window rules to assign apps to workspaces, you can open a bunch of
applications on various workspaces. The following method will start these apps
silently (i.e. without the flickering from workspace to workspace).

Put the following in your `hyprland.conf`: (example)

```ini
exec-once = [workspace 1 silent] kitty
exec-once = [workspace 1 silent] subl
exec-once = [workspace 3 silent] mailspring
exec-once = [workspace 4 silent] firefox
```

### How do I move my favorite workspaces to a new monitor when I plug it in?

If you want workspaces to automatically go to a monitor upon connection, use the
following:

In hyprland.conf:

```ini
exec-once = handle_monitor_connect.sh
```

where `handle_monitor_connect.sh` is: (example)

```sh {filename="handle_monitor_connect.sh"}
#!/bin/sh

handle() {
  case $1 in monitoradded*)
    hyprctl dispatch moveworkspacetomonitor "1 1"
    hyprctl dispatch moveworkspacetomonitor "2 1"
    hyprctl dispatch moveworkspacetomonitor "4 1"
    hyprctl dispatch moveworkspacetomonitor "5 1"
  esac
}

socat - "UNIX-CONNECT:$XDG_RUNTIME_DIR/hypr/${HYPRLAND_INSTANCE_SIGNATURE}/.socket2.sock" | while read -r line; do handle "$line"; done
```

This makes workspaces 1, 2, 4, and 5 go to monitor 1 when connecting it.

Please note this requires `socat` to be installed.

### My tablet no worky??

Use [Open Tablet Driver](https://github.com/OpenTabletDriver/OpenTabletDriver)
to configure your tablet. In the future it will be supported in the config.
Until then, OTD is the way to go.

### Some of my apps take a really long time to open...?

```ini {filename="~/.config/hypr/hyprland.conf"}
exec-once = dbus-update-activation-environment --systemd WAYLAND_DISPLAY XDG_CURRENT_DESKTOP
```

Make sure that your portals launch _after_ this gets executed. For some people,
they might launch before that has happened.

In such cases, a script like this:

```bash
#!/usr/bin/env bash
sleep 4
killall -e xdg-desktop-portal-wlr
killall xdg-desktop-portal
/usr/lib/xdg-desktop-portal-wlr &
sleep 4
/usr/lib/xdg-desktop-portal &
```

launched with `exec-once` should fix all issues. Adjust the sleep durations to
taste.

### How do I export envvars for Hyprland?

See [Environment Variables](../Configuring/Environment-variables)

The `env` keyword is used for this purpose. For example:

```ini
env = XDG_CURRENT_DESKTOP,Hyprland
```

### How to disable middle-click paste?

Setting `misc:middle_click_paste` to `false` disables the feature altogether with the exception of some browsers (notably firefox) having a separate built-in way of emulating that feature which has to be disabled within the browser's settings.

### How do I make Hyprland draw as little power as possible on my laptop?

**_Useful Optimizations_**:

- `decoration:blur:enabled = false` and `decoration:shadow:enabled = false` to disable
  fancy but battery hungry effects.

- `misc:vfr = true`, since it'll lower the amount of sent frames when nothing is
  happening on-screen.

### My apps take a long time to start / can't screenshare

See [The XDPH Page](../Useful-Utilities/xdg-desktop-portal-hyprland).

You most likely have multiple portal impls / an impl is failing to launch.

### My screenshot utilities won't work with multiple screens

Some programs like Flameshot (currently) have limited Wayland support, so on most
Wayland compositors, you will have to do a few tweaks. For Hyprland, you can add
these window rules to your config to make these programs work with both of your
screens.

```ini
windowrulev2 = float,title:^(flameshot)
windowrulev2 = move 0 0,title:^(flameshot)
windowrulev2 = suppressevent fullscreen,title:^(flameshot)
```

### I cannot bind SUPER as my mod key on my laptop

Many laptops have a built-in function to toggle `SUPER` between single key press
mode and hold mode. This is usually indicated by a padlock on the `SUPER` key.

First, install and run `wev`, then press `SUPER`. If you see a key press event
followed by an instant key release event, then it's likely your `SUPER` key is
set to single press mode.

On most laptops, this can be fixed by pressing `FN+SUPER` and verified in `wev`.
You should be able to hold `SUPER` and not see an instant release event. In case
`FN+SUPER` doesn't work, consult your laptop's manual.

### My VM doesn't receive keybinds I have set in Hyprland

This is expected, as Hyprland takes precedence.

A simple fix is to create an empty "passthrough" submap:

```ini
bind = MOD,KEY,submap,passthru
submap = passthru
bind = SUPER,Escape,submap,reset
submap = reset
```

Set `MOD` and `KEY` to desired values.

By pressing the selected combo, you will enter a mode where Hyprland ignores your
keybinds and passes them on to the VM. Pressing `SUPER + Escape` will leave that mode.

### Some of my drop-down/pop-up windows in apps disappear/don't open at cursor position

In some apps like Steam or VSCode, the drop-down windows may disappear if you
hover over them. This can be fixed with window rules.

First, find the title and class of the pop-up window with `hyprctl clients`. You
can try something like `sleep 3 && hyprctl clients` so you have time to open the
pop-up. It should look something like this:

```bash
Window 55d794495400 -> :
  ...
  class: [CLASS here]
  title: [TITLE here]
  ...
```

If the pop-up disappears as you hover over it, you can add to your config:

```ini
windowrulev2 = stayfocused, title:^(TITLE)$, class:^(CLASS)$
```

This has a downside of not being able to click on anything in the main UI until
you've interacted with the pop-up.

If the pop-up disappears immediately, you can use:

```ini
windowrulev2 = minsize 1 1, title:^(TITLE)$, class:^(CLASS)$
```

If the pop-up doesn't open at the cursor position, try the following:

```ini
windowrulev2 = move onscreen cursor, title:^(TITLE)$, class:^(CLASS)$
```

This is required for apps running under xwayland only and there is usually no need
to use the first solution if opening at the cursor position.

### Steam's file picker no worky

On instances where you have a Steam library on another drive that you have to
add, Hyprland's file picker would not normally appear when selecting a directory
from Steam.

Steam has its own file picker, however, it's not functional. Install
`xdg-desktop-portal-gtk` to show the desktop's file picker.

### Workspaces or clients are disappearing or monitor related dispatchers cause crashes

It seems there is a Kernel bug making the system think there is an extra
phantom monitor, that causes all sorts of issues, crashes and weird behaviors
like disapearing workspaces or clients when adding or removing an external
monitor.

First check the list of monitors detected by Hyprland by running:

```ini
hyprctl monitors
```

If you see a monitor that should not be there (usually named `Unknown-1`), you
can work around the issue by adding in your `hyprland.conf`:

```ini
monitor = Unknown-1,disabled
```

### I get a .so file missing error on launch

If you are using a -git package, this is a common occurrence when ABI-breaking updates are done.

_**Do not**_ symlink different .so versions, this will cause crashes!!!

Instead, find all hypr* packages with `-git` you have installed, remove them (possibly remove dependencies of them, too)
and simply install them again.

If using yay, make sure to `CleanBuild` every package. If using paru, manually remove the cache of hypr* packages in `~/.cache/paru`.

If you are not using any -git packages, this is a mistake in your distro's packaging and should be solved there.

### My cursor is a hyprland icon?

This means you have no hyprcursor theme installed, and hyprland failed to find an XCursor theme as well. Install a cursor theme.

### Smart gaps please?

[Here](../Configuring/Workspace-Rules/#smart-gaps).

### Hyprwinwrap is not visible through blurred windows

This is a side effect of the [decoration:blur:new_optimizations](../Configuring/Variables/#blur).
You have two options to resolve it.
1. Set `decoration:blur:new_optimizations` to `false` - This will preserve the exact same appearance, but may have a slight performance cost.
2. Set `decoration:blur:ignore_opacity` to `false` - This will drastically affect the appearance, but should maintain the original performance.
