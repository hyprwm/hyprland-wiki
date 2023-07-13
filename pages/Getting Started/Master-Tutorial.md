If you are coming to Hyprland for the first time, this is the main tutorial to read.

Due to a lot of people doing stupid stuff, this tutorial will cover literally everything
you need to just get things going. It does link to other pages where necessary.

{{< toc >}}

## Install Hyprland
See [Installation](../Installation) and come back here once you have successfully
installed Hyprland.

Install `kitty` (default terminal emulator) terminal. This is available in most 
distros' repositories.

## NVIDIA?
_If not using an NVIDIA card, skip this step_

Please take a look at
[The Nvidia page](../../Nvidia) before launching. It has a lot of info regarding the needed
environment and tweaks.

## VM?
_If not using a VM, skip this step_

In a VM, make sure you have 3D acceleration enabled in your virtio config (or virt-manager)
otherwise Hyprland ***will not work***.

You can also passthru a GPU to make it work.

Please bear in mind 3D accel in VMs may be pretty slow.
## Launching Hyprland

Now, you can just execute `Hyprland` in your tty.

**!IMPORTANT**: Do **not** launch Hyprland with `root` permissions (don't
`sudo`)

You can see some launch flags by doing `Hyprland -h`, these include setting the config
path, ignoring a check for the above, etc.

Login managers are not officially supported, but here's a short compatibility
list:

- SDDM → Works flawlessly. Install the [latest git version](https://github.com/sddm/sddm) (or [sddm-git](https://aur.archlinux.org/packages/sddm-git) from the AUR if you use Arch) to prevent SDDM bug [1476](https://github.com/sddm/sddm/issues/1476) (90s shutdowns).
- GDM → Works with the caveat of crashing Hyprland on the first launch
- ly → Works poorly

## In Hyprland
You're good to go with your adventure, technically.

Use <key>SUPER</key> + <key>Q</key> to launch kitty. If you wish to choose the
default terminal before you proceed, you can do so in `~/.config/hypr/hyprland.conf` 
([example config](https://github.com/hyprwm/Hyprland/blob/main/example/hyprland.conf)).  

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
just about that. You can also visit the
[Awesome-Hyprland](https://github.com/hyprland-community/awesome-hyprland)
repository for a more comprehensive list.

## Fully configure
Head onto the
[Configuring Hyprland page](../../Configuring/Configuring-Hyprland) to learn all
about configuring Hyprland to your likings.

## Cursors
Cursors are a notorious pain to set up when you don't know how. See
[this FAQ entry](../../FAQ#how-do-i-change-me-mouse-cursor)

If your cursor does not appear, then see [this FAQ entry](../../FAQ#me-cursor-no-render)

## Themes
Since this is not a full fledged Desktop Environment, you will need to use tools such as 
`lxappearance` and `nwg-look` (recommended) for GTK, and `qt5ct` / `qt6ct` for their
respective QT versions. Some older applications may also require `qt4ct`.


## Force apps to use Wayland
A lot of apps will use Wayland by default. Chromium (and other browsers based on it or electron)
don't. You need to pass `--enable-features=UseOzonePlatform --ozone-platform=wayland` to them or use `.conf` files
where possible. Chromium-based browsers also should have a toggle in `chrome://flags`. Search for _"ozone"_ and select Wayland.

For most electron apps, you should put the above in `~/.config/electron-flags.conf`. VSCode is known 
to not work with that though.

A few more environment variables for forcing Wayland mode are documented [here](../../Configuring/Environment-variables).

You can check whether an app is running in xwayland or not with `hyprctl clients`.
