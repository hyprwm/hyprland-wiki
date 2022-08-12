# Contributing guidelines

For PRs, make sure that you:

- follow the code style
- don't write "hacky" code
- check and test the code
- are contributing something useful
- explain your PR as best as you can

For issues, please see
[the guidelines](https://github.com/hyprwm/Hyprland/blob/main/docs/ISSUE_GUIDELINES.md)

# Build in debug

## Required packages

`xcb` stuff, check with your local package provider.

`wlroots-git` - always have the latest wlroots.

`wayland` - of course.

*Arch*:

`yay -S gdb ninja gcc cmake libxcb xcb-proto xcb-util xcb-util-keysyms libxfixes libx11 libxcomposite xorg-xinput libxrender pixman wayland-protocols cairo pango`

(If any are missing hmu)

## Recommended, CMake

install the VSCode C/C++ and CMake Tools extensions and use that.

I've attached a launch.json to examples/ that you can copy to your .vscode/
folder in the repo root.

With that, you can build in debug, go to the debugging tab and hit
`(gdb) Launch`.

## Custom, CLI

`make debug`

attach and profile in your preferred way.

## Notice

For all ways, make sure to `sudo make clear` to clear any root-owned files.
Also, before the first build (or after some updates, possibly)
`sudo make config`. (If you get any `missing header file "...-protocol.h"`, you
need to `make config`.)

# Running

when running Hyprland in Debug mode, the config is
`~/.config/hypr/hyprlandd.conf` and the logs can be found at
`/tmp/hypr/[INSTANCE SIGNATURE]/hyprlandd.conf`.

# Logs, dumps, etc.

You can use the logs and the GDB debugger, but running Hyprland in debug compile
as a driver and using it for a while might give more insight to the more random
bugs.

When Hyprland crashes, use `coredumpctl` and then `coredumpctl info PID` to see
the dump.

I also recommend the amazing command

`watch -n 0.1 "cat /tmp/hypr/$(echo HYPRLAND_INSTANCE_SIGNATURE)/hyprland.log | grep -v \"arranged\" | tail -n 40"`

for live logs. (replace `hyprland` with `hyprlandd` for debug builds)

# Nesting Hyprland

Hyprland can run nested in a window. For that, make sure you did the following:

- built in debug
- removed ALL `exec=` and `exec-once=` keywords from your debug config
  (`hyprlandd.conf`)
- set a resolution and are not using `preferred`
- made sure no keybinds overlap (I recommend using a different mod for your
  keybinds altogether)

Once you launch, the display will probably be completely garbled. To fix that,
in the parent, do a `hyprctl clients` and note the size of the window. Make sure
while opening the terminal to not resize the nested window. Note that resolution
and use it down to the pixel in your `hyprlandd.conf`.

If you segfault in `shadowKeybinds`, you probably either are using the same mod
as your parent or resized the window.
