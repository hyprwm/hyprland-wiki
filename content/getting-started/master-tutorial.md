---
weight: 20
title: Master tutorial
---

If you are coming to Hyprland for the first time, this is the main tutorial to
read.

This tutorial covers everything you need to get things going. It links to other
pages where necessary.

## Install Hyprland

See [Installation](../installation) and come back here once you have
successfully installed Hyprland.

Install `kitty` (default terminal emulator). This is available in most distros'
repositories.

## NVIDIA?

> [!NOTE]
> If not using an NVIDIA card, skip this step.

Please take a look at [The NVIDIA page](../../nvidia) before launching. It has
information regarding the needed environment and tweaks.

## VM?

> [!NOTE]
> If not using a VM, skip this step.

In a VM, make sure you have 3D acceleration enabled in your `virtio` config (or
`virt-manager`) otherwise Hyprland _**will not work**_.

You can also passthru a GPU to make it work.

Please bear in mind 3D acceleration in VMs may be pretty slow.

## Launching Hyprland

Hyprland can be executed by typing `start-hyprland` in your TTY.

> [!WARNING]
> Do **not** launch Hyprland with `root` permissions (don't `sudo`)

You can see some launch flags by doing `start-hyprland -- -h`, these include setting the
config path, ignoring a check for the above, etc.

Login managers are not officially supported, but here's a short compatibility
list:

- SDDM → Works flawlessly. Install SDDM version ⩾ 0.20.0 or the
  [latest git version](https://github.com/sddm/sddm) (or
  [sddm-git](https://aur.archlinux.org/packages/sddm-git) from AUR) to prevent
  SDDM bug [1476](https://github.com/sddm/sddm/issues/1476) (90s shutdowns).
- plasma-login-manager → Works flawlessly, but depends on systemd.
- GDM → Works with the caveat of crashing Hyprland on the first launch.
- greetd → Works flawlessly, especially with
  [ReGreet](https://github.com/rharish101/ReGreet).
- ly → Works flawlessly.

## DE-like pre-configured setups

Do you want to just get Hyprland pre-configured like a DE,
without making your own configuration from scratch?

Check out the [Preconfigured setups page](../preconfigured-setups)
to see a few options.

These dotfiles should do everything for you, and have their own tutorials as well.

If you choose to use those, you can skip the next step. However, it's still recommended to read all the points below
it. They'll give you recommended apps, replacements for old X11 software, information about configuring displays,
etc.

## In Hyprland with the default config

You're good to go with your adventure, technically.

Use <key>SUPER</key> + <key>Q</key> to launch kitty. If you wish to choose the
default terminal before you proceed, you can do so in
`~/.config/hypr/hyprland.lua`
([example config](https://github.com/hyprwm/Hyprland/blob/main/example/hyprland.lua)).

If you want the best experience with less hassle googling, keep reading.

## Monitors config

See [Monitors page](../../configuring/core/monitors) to learn all about
configuring your displays.

## Fully configure Hyprland

Head onto the
[Configuring page](../../configuring) to learn all
about configuring Hyprland to your liking.

## Important software

See the [Must-have software page](../../useful-utilities/must-have) for the
crucial things to make Wayland / Hyprland / other apps work correctly.

## Apps / X11 replacements

See the [Useful utilities page](../../useful-utilities)
about that. You can also visit the
[Awesome-Hyprland](https://github.com/hyprland-community/awesome-hyprland)
repository for a more comprehensive list.

## Force apps to use Wayland

A lot of apps will use Wayland by default. Chromium (and other browsers based on
    it, or Electron) don't. You need to pass
`--enable-features=UseOzonePlatform --ozone-platform=wayland` to them or use
`.conf` files where possible. Chromium-based browsers also should have a toggle
in `chrome://flags`. Search for _"ozone"_ and select Wayland. If you are on
NixOS you can also set the environment variable `NIXOS_OZONE_WL=1` in your
configuration.

For most electron apps, you should put the above in
`~/.config/electron-flags.conf`. Note that VSCode is known **not** to work with
it.

A few more environment variables for forcing Wayland mode are documented
[here](../../configuring/core/environment-variables).

You can check whether an app is running in Xwayland or not with
`hyprctl clients`.

## Themes

Since Hyprland is not a fully-fledged Desktop Environment, you will need to use
tools such as `lxappearance` or `nwg-look` (recommended) for GTK, and `hyprqt6engine`
for qt6 apps.

## Cursors

Cursors are a notorious pain to set up when you don't know how. See
[this FAQ entry on changing your mouse cursor](../../faq#how-do-i-change-my-mouse-cursor)
