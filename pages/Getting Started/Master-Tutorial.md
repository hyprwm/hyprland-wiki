If you are coming to Hyprland for the first time, this is the main tutorial to read.

Due to a lot of people doing stupid stuff, this tutorial will cover literally everything
you need to just get things going. It does link to other pages where necessary.

{{< toc >}}

## Install Hyprland
See [Installation](../Installation) and come back here once you install Hyprland.

Install `kitty` (default terminal emulator)

## NVIDIA?
_If not using an NVIDIA card, skip this step_

Please take a look at
[The Nvidia page](../../Nvidia) before launching. You should **first** make a
wrapper, as described in a section a bit below, then follow the instructions from
the Nvidia page, and then continue on with sections below.

## VM?
_If not using a VM, skip this step_

In a VM, make sure you have 3D acceleration enabled in your virtio config (or virt-manager)
otherwise Hyprland ***will not work***.

You can also passthru a GPU to make it work.

Please bear in mind 3D accel in VMs may be pretty slow.

## Launching Hyprland, part 1
We recommend you set up a wrapper. A wrapper will be your executable to launch
Hyprland with envvars.

Make an executable file somewhere in your `PATH`, for example `~/.local/bin/`,
called (for example) `wrappedhl`.

In it, put:

```bash
#!/bin/sh

cd ~

export _JAVA_AWT_WM_NONREPARENTING=1
export XCURSOR_SIZE=24

exec Hyprland
```

You can add as many exported envvars as you need (Nvidia users might need a
lot), but it's recommended to have _at least_ the shown two.

You should now launch Hyprland with `wrappedhl` instead of `Hyprland`. Make sure
to copy your `.desktop` file in `/usr/share/wayland-sessions/` and edit it if you use a
login manager! You might need to put the full path in it, as login managers are
usually not ran through the user account.

{{< hint type=important >}}
It is highly recommended to copy the desktop file to e.g. `wrapped_hl.desktop` instead of editing
the provided one, as many package managers will **overwrite**
the desktop file on updates.
{{< /hint >}}

## Launching Hyprland, part 2

Now, with your wrapper, you can just execute it in your tty.

**!IMPORTANT**: Do **not** launch Hyprland with `root` permissions (don't
`sudo`)

Login managers are not officially supported, but here's a short compatibility
list:

- SDDM → Works flawlessly. Install the [latest git version](https://github.com/sddm/sddm) (or [sddm-git](https://aur.archlinux.org/packages/sddm-git) from the AUR if you use Arch) to prevent SDDM bug [1476](https://github.com/sddm/sddm/issues/1476) (90s shutdowns).
- GDM → Works with the caveat of crashing Hyprland on the first launch
- ly → Works poorly

## In hyprland
Hello, you're good to go with your adventure, technically.

Use <key>SUPER</key> + <key>Q</key> to launch kitty.

If you want the best experience with less hassle googling, keep reading.

## Critical software
See the [Must-have Software page](../../Useful-Utilities/Must-have) for the crucial
things to make Wayland / Hyprland / other apps work correctly.

## Monitors config
See [Configuring Hyprland page](../../Configuring/Monitors) to learn all
about configuring your displays.

## Apps / X11 replacements
See the [Useful Utilities page](../../Useful-Utilities) and the
[Sway wiki page](https://github.com/swaywm/sway/wiki/Useful-add-ons-for-sway)
just about that.

## Fully configure
Head onto the
[Configuring Hyprland page](../../Configuring/Configuring-Hyprland) to learn all
about configuring Hyprland to your likings.