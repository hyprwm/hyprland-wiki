---
weight: 8
title: NVidia
---

# Foreword

There is no _official_ Hyprland support for Nvidia hardware. However, many
people have had success with the instructions on this page. Please read
everything in FULL before creating any bug reports.

There are three potential setups you can have with driver setup on Nvidia.

1. Entirely proprietary Nvidia drivers, often referred to as "Proprietary Drivers"
2. Entirely proprietary Nvidia drivers, except with the open source kernel
   modules, referred to as "Open Drivers".
3. Nouveau open source drivers. A clean-room implementation of Nvidia drivers, referred to simply as "Nouveau", and not to be confused with the "Open Drivers".

For maximum performance and support with newer cards, running either of the
first two setups is recommended as it contains some vital optimisations and
power management support for newer GPUs.

{{< callout >}}

For those on the Nvidia 50xx series of graphics cards (5090, 5080, etc) or
newer, the open source kernel modules are **REQUIRED** when using the
proprietary Nvidia drivers.

{{< /callout >}}

According to
[Nvidia](https://developer.nvidia.com/blog/nvidia-transitions-fully-towards-open-source-gpu-kernel-modules/),
the open source kernel modules are also recommended to be used by the
architechtures Turing and Ampere. In short, this includes the 20xx series of
consumer cards and later, whilst also including the 16xx series of cards (1650,
1660, etc). Your mileage may vary, so please try both of them if your card is
supported by both of them.

If either of the proprietary Nvidia driver setups do not work properly on your
computer, the Nouveau driver might work fine. This will likely be the case for
[older cards](https://wiki.archlinux.org/title/NVIDIA#Unsupported_drivers).

# Proprietary driver setup

On Arch Linux and other Arch-based distros, we would recommend using the dkms
variety of the kernel modules, as it will support all installed kernels on your
system. Refrain from using the default `nvidia` or `nvidia-open` kernel module
packages as these can exhibit issues like the initramfs not being rebuilt in
certain cases. They will also only work for the **default `linux` kernel**.

For the entirely proprietary Nvidia drivers, you can therefore use the
`nvidia-dkms` package. And for those wanting / needing to use the open source
kernel modules, can use `nvidia-open-dkms`.

These dkms packages rely on having the "headers" package installed for your
kernels of choice. So please make sure you have all relevant headers packages
installed on your system, for example, if you have the default kernel and the
LTS kernel, ensure you install both `linux-headers` and `linux-lts-headers`.

## Further Installation

The following packages must also be installed to ensure a smooth experience with
the proprietary drivers.

1. `nvidia-utils`: The userspace graphics drivers. You need this for pretty much
   everything on your system, and we would not recommend running your computer
   without it. If you are also using the "multilib" or "lib32" packages for
   gaming, steam, wine, etc., then you also require `lib32-nvidia-utils`.
2. `egl-wayland` (`libnvidia-egl-wayland1` and `libnvidia-egl-gbm1` on Ubuntu):
   This is required in order to enable compatibility between the EGL API and the
   Wayland protocol. This should already be installed on most distros.

## Early KMS, modeset and fbdev

As of Nvidia driver version 570.86.16, fbdev has now been enabled by default
when modeset is also enabled. Therefore we simply need to enable modeset.

To enable it, create and edit `/etc/modprobe.d/nvidia.conf`, and add this line
to the file:

```conf {filename="/etc/modprobe.d/nvidia.conf"}
options nvidia_drm modeset=1
```

If you're on Arch Linux, this step has already been done for you.

If you're on NixOS, it is also
[enabled by default](https://github.com/NixOS/nixpkgs/blob/0196e5372b8b7a282cb3bbe5cbf446617141ce38/nixos/modules/hardware/video/nvidia.nix#L116)
on all driver versions after 535.

Early KMS will allow the Nvidia modules to load earlier into the boot sequence.
On distros using mkinitcpio, like Arch, you can enable it by editing
`/etc/mkinitcpio.conf`. In the `MODULES` array and add the following module
names:

```conf {filename="/etc/mkinitcpio.conf"}
MODULES=(... nvidia nvidia_modeset nvidia_uvm nvidia_drm ...)
```

You can then rebuild the initramfs with `sudo mkinitcpio -P`, and reboot.

After rebooting, you can verify that DRM is actually enabled by running
`cat /sys/module/nvidia_drm/parameters/modeset` which should return `Y`.

More information is available
[here](https://wiki.archlinux.org/title/NVIDIA#DRM_kernel_mode_setting).

## Environment variables

Add these variables to your Hyprland config:

```ini
env = LIBVA_DRIVER_NAME,nvidia
env = __GLX_VENDOR_LIBRARY_NAME,nvidia
```

## Finishing up

Install a few packages to get some apps to function natively with Wayland for
the best compatibility and performance. See
[the Master Tutorial](https://wiki.hyprland.org/Getting-Started/Master-Tutorial/#force-apps-to-use-wayland).

Reboot your computer.

Launch Hyprland.

It _should_ work now.

## Flickering in Electron / CEF apps

The reason why Electron and CEF apps flicker is because of two reasons:

1. They run in XWayland by default.
2. They don't use the syncobj protocol by default.

To enable native Wayland support most Electron apps, you should be fine just
adding this environment variable to your config:

```ini
env = ELECTRON_OZONE_PLATFORM_HINT,auto
```

This has been confirmed to work on Vesktop, VSCodium, Obsidian and will probably
work on other Electron apps as well.

For other apps, including CEF apps, you will need to launch them with these
flags:

```sh
--enable-features=UseOzonePlatform --ozone-platform=wayland
```

To do this easily for Spotify, Arch Linux has a `spotify-launcher` package in
their official repos. You should use that instead of the `spotify` package in
the AUR. Then, enable the Wayland backend in `/etc/spotify-launcher.conf` by
uncommenting this line:

```sh {filename="/etc/spotify-launcher.conf"}
extra_arguments = ["--enable-features=UseOzonePlatform", "--ozone-platform=wayland"]
```

For Arch Linux, some CEF / Electron apps may also have a respective flags file
in ~/.config. For example, for VSCodium, you can add the flags to
`~/.config/codium-flags.conf` and for Obsidian, you can add the flags to
`~/.config/obsidian/user-flags.conf`.

For NixOS, you can set the `NIXOS_OZONE_WL` environment variable to `1`, which
should automatically configure Electron / CEF apps to run with native Wayland
for you.

As of Electron 35 and Chromium 134, they now support the "syncobj" protocol
which implements explicit sync correctly. This resolves all flickering in
Electron apps, however it needs to be _manually enabled_. Adding the below flag
to any Electron / CEF apps should enable it:

```sh
--enable-features=WaylandLinuxDrmSyncobj
```

Using this in conjunction with native Wayland on these apps should solve all
issues.

## Still experiencing flickering / delayed typing? **Nuclear Method**

Even with Wayland enabled for some applications, and explicit sync working,
there are sometimes issues for owners of 4090's, where typing can sometimes show
previous frames as you type. A potential fix is to force your card into a high
power mode, and this has shown success with some 4090 users. In
`/etc/modprobe.d/nvidia.conf`, add the below line:

```sh {filename="/etc/modprobe.d/nvidia.conf"}
options nvidia NVreg_RegistryDwords="PowerMizerEnable=0x1; PerfLevelSrc=0x2222; PowerMizerLevel=0x3; PowerMizerDefault=0x3; PowerMizerDefaultAC=0x3"
```

{{< callout >}}

This method should only be used if it has to. Please ensure you've followed the
previous steps in full before trying this workaround.

{{< /callout >}}

## VA-API hardware video acceleration

Hardware video acceleration on Nvidia and Wayland is possible with the
[nvidia-vaapi-driver](https://github.com/elFarto/nvidia-vaapi-driver). This may
solve specific issues in Electron apps.

The install instructions are available in the README, however, a quick guide
will be given here:

1. Install the package. On Arch, this is `libva-nvidia-driver` in the official
   repos.

2. Add this variable to your Hyprland config:
   ```ini
   env = NVD_BACKEND,direct
   ```

   See
   [here](https://github.com/elFarto/nvidia-vaapi-driver?tab=readme-ov-file#upstream-regressions)
   for more information on this environment variable.

You can check the README to get it working for Firefox. There is also
experimental support for Chromium however there has not been much success.

## Other issues

### Multi-monitor with hybrid graphics

On a hybrid graphics device (a laptop with both an Intel and an Nvidia GPU), you
will need to remove the `optimus-manager` package if installed (disabling the
service does not work). You also need to change your BIOS settings from hybrid
graphics to discrete graphics.

### Flickering in XWayland games

XWayland games may flicker or present frames out-of-order in a way which makes
them unplayable. This is due to the lack of implicit synchronization in the
driver, and/or flaky explicit sync support in newer ones.

There are a few fixes:

1. Install the latest versions of `xorg-xwayland`, `wayland-protocols` and
   Nvidia driver. Ensure `xorg-xwayland` is at least version 24.1,
   `wayland-protocols` is at least version 1.34 and Nvidia driver is at least
   version 555. These enable explicit sync on the Nvidia driver and should avoid
   flickering.

2. If your GPU is no longer supported by the 555 or later drivers, install older
   Nvidia drivers which do not exhibit this issue. The last ones which would
   work will be the 535xx series of drivers. These can be installed on Arch via
   [these AUR packages](https://aur.archlinux.org/packages?O=0&K=535xx)

### Suspend/wakeup issues

On Arch Linux and NixOS, the below is already done for you, but for others:

- Enable the services `nvidia-suspend.service`, `nvidia-hibernate.service` and
  `nvidia-resume.service`, they will be started by systemd when needed.

Add `nvidia.NVreg_PreserveVideoMemoryAllocations=1` to your kernel parameters if
you haven't already.

For Nix users, the equivalent of the above is

```nix {filename="configuration.nix"}
hardware.nvidia.powerManagement.enable = true;
```

# Still having issues?

If you're still having issues after following this guide, you can join the
[Hyprland Discord](https://discord.gg/hQ9XvMUjjr) and ask for help in the
`#hyprland-nvidia` channel.
