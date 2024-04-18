---
weight: 8
title: NVidia
---

# Foreword

There is no _official_ Hyprland support for Nvidia hardware. However, many people
have had success with the instructions on this page.

You can choose between the proprietary
[Nvidia drivers](https://wiki.archlinux.org/title/NVIDIA) or the open source
[Nouveau driver](https://wiki.archlinux.org/title/Nouveau). Under the
proprietary Nvidia drivers category, there are 3 of them: the current driver
named 'nvidia' (or 'nvidia-dkms' to use with custom linux kernels) which is
under active development, the legacy drivers 'nvidia-3xxxx' for older cards
which Nvidia no longer actively supports, and the 'nvidia-open' driver which is
currently an alpha stage attempt to open source a part of their closed source
driver for newer cards.

If your card is supported by the proprietary nvidia drivers, there is a very
high chance that you will most likely want to use those. Benefits include but
are not limited to:

- (Much) better gaming performance
- Better power management on recent GPUs

However, keep in mind that if the proprietary Nvidia drivers do not work
properly on your computer, the Nouveau driver might work fine. This will
most likely be the case for
[older cards](https://wiki.archlinux.org/title/NVIDIA#Unsupported_drivers)

## How to get Hyprland to possibly run on Nvidia (Proprietary)

Install the correct headers package for your current kernel. For the example of
the `linux-zen` kernel on Arch Linux, this package would be `linux-zen-headers`.

Install the required nvidia packages. For most cases, this would be `nvidia-dkms`
(or `nvidia-open-dkms` for the open source ones),
and `nvidia-utils`. If you'd like to game via Wine or even natively, it would be
in your best interest to also install `lib32-nvidia-utils`.

{{< callout >}}

Even if your GPU is listed as supported by the `nvidia-open-dkms` driver, at this
point in time, it is still not up to feature parity with the proprietary drivers.
One issue with the open drivers is that it could cause problems with suspend in
general, let that be closing the lid on your laptop or by manually triggering one.
Overall, you'd be better off with `nvidia-dkms` right now, but Hyprland should work
similarly between the two.

{{< /callout >}}

Next up, you need to enable modeset for nvidia, this can be done via editing
the kernel paramaters for your bootloader.

For people using [systemd-boot](https://wiki.archlinux.org/title/systemd-boot)
you can do this by adding `nvidia_drm.modeset=1` to the end of
`/boot/loader/entries/arch.conf`.

For people using
[GRUB](https://wiki.archlinux.org/title/GRUB) you can do this by adding
`nvidia_drm.modeset=1` to the end of `GRUB_CMDLINE_LINUX_DEFAULT=` in
`/etc/default/grub`, then running `sudo grub-mkconfig -o /boot/grub/grub.cfg`.

For others check out
[kernel parameters](https://wiki.archlinux.org/title/Kernel_parameters) and how
to add `nvidia_drm.modeset=1` to your specific bootloader.

{{< callout >}}

There has been a lot of debate on which of `nvidia_drm` or `nvidia-drm`
is correct for this kernel paramter. It has been confirmed that either
of these will work.

{{< /callout >}}

in `/etc/mkinitcpio.conf` add `nvidia nvidia_modeset nvidia_uvm nvidia_drm` to
your `MODULES`

For example, a clean `MODULES` line would now look like this:
`MODULES=(nvidia nvidia_modeset nvidia_uvm nvidia_drm)`

Now, run `sudo mkinitcpio -P`. This will regenerate the initcpios for all kernels
currently installed on the system. If you see any errors here about missing
nvidia modules, it is highly probable that you forgot to install the correct
headers package. Make sure you install the headers package for your kernel and
run this command again.

More information is available here:
[https://wiki.archlinux.org/title/NVIDIA#DRM_kernel_mode_setting](https://wiki.archlinux.org/title/NVIDIA#DRM_kernel_mode_setting)

Export these variables in your hyprland config:

```sh
env = LIBVA_DRIVER_NAME,nvidia
env = XDG_SESSION_TYPE,wayland
env = GBM_BACKEND,nvidia-drm
env = __GLX_VENDOR_LIBRARY_NAME,nvidia
env = WLR_NO_HARDWARE_CURSORS,1
```

Last but not least, you'll also need to install a few packages to get some apps
to function natively with Wayland, you can have a look at [the Master Tutorial](https://wiki.hyprland.org/Getting-Started/Master-Tutorial/#force-apps-to-use-wayland)

Reboot your computer.

Launch Hyprland.

It _should_ work now.

## VA-API hardware video acceleration

We can achieve VA-API acceleration on Nvidia and Wayland with the help of the
[nvidia-vaapi-driver](https://github.com/elFarto/nvidia-vaapi-driver). This may
solve certain issues in electron apps, and it will also allow for GPU decoding
for videos on the web, with benefits including higher performance video playback
and also higher power efficiency during video playback.

Its install instructions are available in the README, however, a quick guide will
be given here:

- Install the package. On Arch, this is `libva-nvidia-driver` in the official
  repos.

- export this variable in your hyprland config:
  ```sh
  env = NVD_BACKEND,direct
  ```
  see [here](https://github.com/elFarto/nvidia-vaapi-driver?tab=readme-ov-file#upstream-regressions)
  for more information on this environment variable.

- Enable the services `nvidia-suspend.service`, `nvidia-hibernate.service` and
`nvidia-resume.service`

- Add `nvidia.NVreg_PreserveVideoMemoryAllocations=1` to your kernel parameters if
you don't have it already. This will solve issues with corrupted desktop / videos
after waking.

- You can check the README to get it working for Firefox.

## Other issues to look out for

### Regarding environment variables

- If you encounter crashes in Firefox, remove the line
`env = GBM_BACKEND,nvidia-drm`.

- If you face problems with Discord windows not displaying or screen sharing not
working in Zoom, remove or comment the line
`env = __GLX_VENDOR_LIBRARY_NAME,nvidia`.

### How to possibly get multi-monitor working with hybrid graphics

On a hybrid graphics device (a laptop with
both an Intel and an Nvidia GPU), you will need to remove the `optimus-manager`
package if installed (disabling the service does not work). You also need to
change your BIOS settings from hybrid graphics to discrete graphics.

### Fixing flickering in electron apps

This flickering is likely caused by these apps running in XWayland.
To fix the flickering, try running the apps with native Wayland instead.

For discord, you can try the [vesktop app](https://github.com/Vencord/Vesktop).
It has a multitude of install options for many distros in their README.

After installing, you can then enable the wayland backend with this command:
`echo "--enable-features=UseOzonePlatform --ozone-platform-hint=auto" > ~/.config/vesktop-flags.conf`

This will add the parameters required to run vesktop with its wayland backend.

On earlier nvidia driver versions, including 535, you may have to also include
the `--disable-gpu` and `--disable-gpu-sandbox` flags, but as the names suggest,
you will lose hardware acceleration for vesktop.

In other cases like vscodium, you can add the same flags to their respective
flags files. In vscodium's case, this would be `~/.config/codium-flags.conf`

With NixOS, you can also try setting the `NIXOS_OZONE_WL` environment variable
to `1`, which should automatically configure electron apps to run with native
Wayland for you.

While it is best to have as many things as possible running natively in
wayland, the root cause of the flickering will likely be solved
in the 555 series of nvidia driver updates.

### Fixing flickering in XWayland games specifically

The symptoms of this widespread issue include XWayland games flickering in
a way which makes them unplayable. Repeated frames, random presenting of
black frames, and overall weirdness. This is a result of a multitude of
issues which will be solved soon via Nvidia driver updates, but for now
you have a few possible fixes:

- Install xorg-xwayland-git (AUR). This git package includes this [PR](https://gitlab.freedesktop.org/xorg/xserver/-/merge_requests/967)
  which implements the "Explicit Sync" protocol. 
  This will fix it in some, if not all cases. However if it doesn't,
  try the next solution.

- Install older nvidia drivers which do not exhibit this problem. The
  last ones which would work will be the 535xx series of drivers. These
  can be installed easily on Arch via [these AUR packages](https://aur.archlinux.org/packages?O=0&K=535xx)

More info about explicit sync is available
[on this blog](https://planet.kde.org/xavers-blog-2024-04-05-explicit-sync/).

### Fixing other random flickering (nuclear method)

Do note that this forces performance mode to be active, resulting in
increased power-consumption (from 22W idle on an RTX 3070TI, to 74W).

This is probably not needed for most users, so only apply these 'fixes' if
you in-fact do notice flickering artifacts from being idle for ~5 seconds.

Make a new file at `/etc/modprobe.d/nvidia.conf` and paste this in:

```sh
options nvidia NVreg_RegistryDwords="PowerMizerEnable=0x1; PerfLevelSrc=0x2222; PowerMizerLevel=0x3; PowerMizerDefault=0x3; PowerMizerDefaultAC=0x3"
```

Reboot your computer and it should be working.

If it does not, try:

- lowering your monitors' refresh rate, as this can stop the flickering
  altogether
- using the [Nouveau driver](https://wiki.archlinux.org/title/Nouveau) as
  mentioned above

### Fixing suspend/wakeup issues

Enable the services `nvidia-suspend.service`, `nvidia-hibernate.service` and
`nvidia-resume.service`, they will be started by systemd when needed.

Add `nvidia.NVreg_PreserveVideoMemoryAllocations=1` to your kernel parameters if
you don't have it already.

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
