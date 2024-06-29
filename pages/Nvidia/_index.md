---
weight: 8
title: NVidia
---

# Foreword

There is no _official_ Hyprland support for Nvidia hardware. However, many people
have had success with the instructions on this page.

You can choose between the proprietary
[Nvidia drivers](https://wiki.archlinux.org/title/NVIDIA) or the open source
[Nouveau driver](https://wiki.archlinux.org/title/Nouveau). For the
proprietary drivers, there are 3 varieties: the current closed source driver
named 'nvidia' (or 'nvidia-dkms') which is
under active development; the legacy closed source drivers 'nvidia-3xxxx' for older cards
which Nvidia no longer actively supports; and the 'nvidia-open' driver which is
currently an alpha stage attempt to open source a part of their closed source
driver for newer cards.

If the proprietary drivers support your graphics card, it's generally recommended
to use them instead, as it has significantly improved performance 
and power management for newer GPUs.

However, keep in mind that if the proprietary Nvidia drivers do not work
properly on your computer, the Nouveau driver might work fine. This will
likely be the case for
[older cards](https://wiki.archlinux.org/title/NVIDIA#Unsupported_drivers).

{{< callout >}}

The `nvidia-open` drivers are still not up to feature parity with the proprietary drivers.
One issue is with [suspend](https://github.com/NVIDIA/open-gpu-kernel-modules/issues/472) (e.g. closing the lid on your laptop).

{{< /callout >}}

# Proprietary drivers setup

You can choose between the `nvidia` or the `nvidia-dkms` package. There are pros and cons
for each, but it is generally recommended to use the `dkms` package,
as you won't have to rebuild the initramfs [manually](https://wiki.archlinux.org/title/NVIDIA#mkinitcpio) every time the kernel and drivers update, for example.
If you're using a kernel that isn't `linux` or `linux-lts`, the `dkms` package is *required*.

## Installation

Install the following packages:

1. `nvidia` or `nvidia-dkms`: The driver itself. Optionally, the open source drivers
from NVIDIA can be installed as `nvidia-open` or `nvidia-open-dkms`.
2. `nvidia-utils`: The userspace graphics drivers. You need this for running Vulkan
applications. If you'd like to use apps like Steam or Wine, install `lib32-nvidia-utils` as well.
3. `egl-wayland` (`libnvidia-egl-wayland1` and `libnvidia-egl-gbm1` on Ubuntu): This is required
in order to enable compatibility between the EGL API and the Wayland protocol.

## DRM kernel mode setting

Since NVIDIA does not load kernel mode setting by default, enabling it is
required to make Wayland compositors function properly. To enable it, the NVIDIA
driver modules need to be added to the initramfs.

Edit `/etc/mkinitcpio.conf`. In the `MODULES` array, add the following module names:

```ini
MODULES=(... nvidia nvidia_modeset nvidia_uvm nvidia_drm ...)
```

Then, create and edit `/etc/modprobe.d/nvidia.conf`. Add this line to the file:

```ini
options nvidia_drm modeset=1 fbdev=1
```

Lastly, rebuild the initramfs with `sudo mkinitcpio -P`, and reboot.

More information is available [here](https://wiki.archlinux.org/title/NVIDIA#DRM_kernel_mode_setting).

## Environment variables

Add these variables to your Hyprland config:

```sh
env = LIBVA_DRIVER_NAME,nvidia
env = XDG_SESSION_TYPE,wayland
env = GBM_BACKEND,nvidia-drm
env = __GLX_VENDOR_LIBRARY_NAME,nvidia

cursor {
    no_hardware_cursors = true
}
```

{{< callout type=warning >}}

Previously used `WLR_NO_HARDWARE_CURSORS` environment variable has been deprecated.
Do not set it in your configs. Use `cursor:no_hardware_cursors` instead.

{{< /callout >}}

## Finishing up

Install a few packages to get some apps to function natively with Wayland for the 
best compatibility and performance. 
See the [the Master Tutorial](https://wiki.hyprland.org/Getting-Started/Master-Tutorial/#force-apps-to-use-wayland).

Reboot your computer.

Launch Hyprland.

It _should_ work now.

## VA-API hardware video acceleration

Hardware video acceleration on Nvidia and Wayland is possible with the
[nvidia-vaapi-driver](https://github.com/elFarto/nvidia-vaapi-driver). This may
solve specific issues in Electron apps.

The install instructions are available in the README, however, a quick guide will
be given here:

1. Install the package. On Arch, this is `libva-nvidia-driver` in the official
  repos.

2. Add this variable to your hyprland config:
   ```sh
   env = NVD_BACKEND,direct
   ```

   See [here](https://github.com/elFarto/nvidia-vaapi-driver?tab=readme-ov-file#upstream-regressions)
   for more information on this environment variable.

You can check the README to get it working for Firefox.

## Other issues

### Regarding environment variables

- If you encounter crashes in Firefox, remove the line
`env = GBM_BACKEND,nvidia-drm`.

- If you face problems with Discord windows not displaying or screen sharing not
working in Zoom, first try running them in Native Wayland (more details below).
Otherwise, remove or comment the line
`env = __GLX_VENDOR_LIBRARY_NAME,nvidia`.

### Multi-monitor with hybrid graphics

On a hybrid graphics device (a laptop with
both an Intel and an Nvidia GPU), you will need to remove the `optimus-manager`
package if installed (disabling the service does not work). You also need to
change your BIOS settings from hybrid graphics to discrete graphics.

### Flickering in Electron / CEF apps

This flickering is likely caused by these apps running in XWayland.
To fix the flickering, try running the apps in native Wayland instead.

For most Electron apps, you should be fine just adding this
environment variable to your config:

```sh
env = ELECTRON_OZONE_PLATFORM_HINT,auto
```

This has been confirmed to work on Vesktop, VSCodium, Obsidian and will probably
work on other Electron apps as well.

For other apps, including CEF apps, you will need to launch them with these flags:

```sh
--enable-features=UseOzonePlatform --ozone-platform=wayland
```

To do this easily for Spotify, Arch Linux has a `spotify-launcher` packages
in their official repos. You should use that instead of the `spotify`
package in the AUR. Then, enable the Wayland backend in 
`/etc/spotify-launcher.conf` by uncommenting this line:

```sh
extra_arguments = ["--enable-features=UseOzonePlatform", "--ozone-platform=wayland"]
```

Some CEF / Electron apps may also have a respective flags file in ~/.config.
For example, for VSCodium, you can add the flags to `~/.config/codium-flags.conf`
and for Obsidian, you can add the flags to `~/.config/obsidian/user-flags.conf`.

{{< callout >}}

On earlier Nvidia driver versions, including 535, you may have to also include
the `--disable-gpu` and `--disable-gpu-sandbox` flags, but, as the names suggest,
you will lose hardware acceleration for whichever app is run with these flags.

{{< /callout >}}

For NixOS, you can set the `NIXOS_OZONE_WL` environment variable
to `1`, which should automatically configure Electron / CEF apps to run with native
Wayland for you.

While it is best to have as many things as possible running natively in
Wayland, the flickering will likely be solved in the 555 series of Nvidia driver updates.

### Flickering in XWayland games

XWayland games may flicker or present frames out-of-order in a way which makes them unplayable. 
This is due to the lack of explicit synchronization in older versions of the proprietary driver.

There are a few fixes:

1. Install the latest versions of `xorg-xwayland`, `wayland-protocols` and Nvidia driver.
   Ensure `xorg-xwayland` is at least version 24.1, `wayland-protocols` is at least version 1.34 and Nvidia driver is at least version 555.
   These enable explicit sync on the Nvidia driver and should avoid flickering.

2. If you GPU is no longer suppoerted by the 555 driver, install older Nvidia drivers which do not exhibit this issue. The
  last ones which would work will be the 535xx series of drivers. These
  can be installed on Arch via [these AUR packages](https://aur.archlinux.org/packages?O=0&K=535xx)

More info about explicit sync is available
[on this blog](https://planet.kde.org/xavers-blog-2024-04-05-explicit-sync/).

### Fixing other random flickering (nuclear method)

Note that this forces performance mode to be active, resulting in
increased power-consumption (from 22W idle on a RTX 3070TI, to 74W).

This may not be needed for some users. Only apply these 'fixes' if you 
do notice flickering artifacts from being idle for ~5 seconds.

Make a new file at `/etc/modprobe.d/nvidia.conf` and paste this in:

```sh
options nvidia NVreg_RegistryDwords="PowerMizerEnable=0x1; PerfLevelSrc=0x2222; PowerMizerLevel=0x3; PowerMizerDefault=0x3; PowerMizerDefaultAC=0x3"
```

Reboot your computer and it should be working.

If it does not, try:

1. Lowering your monitor's refresh rate: This can stop the flickering
  altogether.
2. Using the [Nouveau driver](https://wiki.archlinux.org/title/Nouveau) as
  mentioned above.

### Suspend/wakeup issues

Enable the services `nvidia-suspend.service`, `nvidia-hibernate.service` and
`nvidia-resume.service`, they will be started by systemd when needed.

Add `nvidia.NVreg_PreserveVideoMemoryAllocations=1` to your kernel parameters if
you haven't already.

{{< callout >}}

As previously mentioned, suspend functions are currently broken on `nvidia-open-dkms`
[due to a bug](https://github.com/NVIDIA/open-gpu-kernel-modules/issues/472), so
make sure you're on `nvidia-dkms`.

{{< /callout >}}

For Nix users, the equivalent of the above is

```nix
# configuration.nix

boot.kernelParams = [ "nvidia.NVreg_PreserveVideoMemoryAllocations=1" ];

hardware.nvidia.powerManagement.enable = true;

# Making sure to use the proprietary drivers until the issue above is fixed upstream
hardware.nvidia.open = false;
```

# Still having issues?

If you're still having issues after following this guide, you can join the
[Hyprland Discord](https://discord.gg/hQ9XvMUjjr) and ask for help in the
`#hyprland-nvidia` channel.
