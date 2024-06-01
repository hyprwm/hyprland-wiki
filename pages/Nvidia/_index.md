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
proprietary drivers, there are 3 of them: the current closed source driver
named 'nvidia' (or 'nvidia-dkms' to use with custom linux kernels) which is
under active development; the legacy closed source drivers 'nvidia-3xxxx' for older cards
which Nvidia no longer actively supports; and the 'nvidia-open' driver which is
currently an alpha stage attempt to open source a part of their closed source
driver for newer cards.

If the proprietary drivers support your graphics card, it's generally recommended
to use them instead, as it includes significantly improved performance 
and power management for recent GPUs.

However, keep in mind that if the proprietary Nvidia drivers do not work
properly on your computer, the Nouveau driver might work fine. This will
most likely be the case for
[older cards](https://wiki.archlinux.org/title/NVIDIA#Unsupported_drivers).

# Proprietary drivers

Install the headers package for your kernel. For example, if you have
the `linux-zen` kernel on Arch Linux, this package would be `linux-zen-headers`.

Install the required nvidia packages. For most cases, this would be `nvidia-dkms`
(or `nvidia-open-dkms` for the open source ones),
and `nvidia-utils`. If you'd like to game using Steam or Wine, install `lib32-nvidia-utils` as well.

{{< callout >}}

Even if your GPU is listed as supported by the `nvidia-open-dkms` driver, at this
point in time, it is still not up to feature parity with the proprietary drivers.
One issue is with suspend (i.e. closing the lid on your laptop).

{{< /callout >}}

## DRM kernel mode setting

Since NVIDIA does not load kernel mode setting by default, enabling it is
required to make Wayland compositors function properly. To enable it, a kernel
parameter must be added to the boot loader.

### GRUB

Edit `/etc/default/grub`. On the `GRUB_CMDLINE_LINUX_DEFAULT` line, append the following option:

```ini
GRUB_CMDLINE_LINUX_DEFAULT="[...] nvidia_drm.modeset=1"
```

### systemd-boot

Edit your boot entry's config file (e.g. `/boot/loader/entries/arch.conf`). Append the kernel parameter to the `options`
line:

```ini
options [...] nvidia_drm.modeset=1
```

{{< callout >}}

Both `nvidia_drm` and `nvidia-drm` are valid for this kernel parameter.

{{< /callout >}}

More information is available [here](https://wiki.archlinux.org/title/NVIDIA#DRM_kernel_mode_setting).

## Environment variables

Add these variables to your Hyprland config:

```sh
env = LIBVA_DRIVER_NAME,nvidia
env = XDG_SESSION_TYPE,wayland
env = GBM_BACKEND,nvidia-drm
env = __GLX_VENDOR_LIBRARY_NAME,nvidia
```

{{< callout type=warning >}}

Previously used `WLR_NO_HARDWARE_CURSORS` environment variable has been deprecated.
Do not set it in your configs. See: [cursor](../Configuring/Variables/#cursor)

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
This is due to the lack of explicit synchronization in the driver.

There are a few fixes:

1. Install the latest versions of `xorg-xwayland` and `wayland-protocols`.
   Ensure `xorg-xwayland` is at least version 24.1 and `wayland-protocols` is at least version 1.34.
   Both versions include the explicit sync patches.

2. Install the older Nvidia drivers which do not exhibit this issue. The
  last ones which would work will be the 535xx series of drivers. These
  can be installed on Arch via [these AUR packages](https://aur.archlinux.org/packages?O=0&K=535xx)

3. Install the 555 beta driver. This version contains official support for explicit sync, but is still in beta.
   These can be installed from the
   [AUR](https://aur.archlinux.org/packages?O=0&SeB=nd&K=nvidia+beta&outdated=off&SB=p&SO=d&PP=50&submit=Go).

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
