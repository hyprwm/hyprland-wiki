There is no _official_ Hyprland support for Nvidia hardware. However, you might make it work properly following this page.

## Drivers
You can choose between the proprietary [Nvidia drivers](https://wiki.archlinux.org/title/NVIDIA) or the open source [Nouveau driver](https://wiki.archlinux.org/title/Nouveau). Under the proprietary Nvidia drivers category, there are 3 of them: the current driver named 'nvidia' (or 'nvidia-dkms' to use with custom linux kernels) which is under active development, the legacy drivers 'nvidia-3xxxx' for older cards which Nvidia no longer actively supports, and the 'nvidia-open' driver which is currently an alpha stage attempt to open source a part of their close source driver for newer cards.

You may want to use the proprietary Nvidia drivers in some cases, for example: if you have a new Nvidia GPU model, if you want more performance, if you want to play video games, if you need a wider feature set (for example, better power consumption on recent GPUs), etc. However, keep in mind that if the proprietary Nvidia drivers do not work properly on your computer, the Nouveau driver might work fine while not having as much features or performance. For [older cards](https://wiki.archlinux.org/title/NVIDIA#Unsupported_drivers), in order to use Hyprland, you will probably need to use the Nouveau driver which actively supports them.

## Hyprland Nvidia Patch (Arch only) (Unofficial)
```sh
hyprland-nvidia (AUR)
hyprland-nvidia-git (AUR)
```
{{< hint type=warning >}}
Hyprland Nvidia Patch is **NOT** an official patch and is not maintained by us.
If you have any concerns (updates, broken pkgbuild, etc), you should contact the maintainer.
{{< /hint >}}

## Kernel Parameters
Install one of the above drivers and add it to your initramfs & kernel parameters.
For people using [systemd-boot](https://wiki.archlinux.org/title/systemd-boot) you can do this adding `nvidia_drm.modeset=1` to the end of `/boot/loader/entries/arch.conf`.
For people using [grub](https://wiki.archlinux.org/title/GRUB) you can do this by adding `nvidia_drm.modeset=1` to the end of `GRUB_CMDLINE_LINUX_DEFAULT=` in `/etc/default/grub`, then run `# grub-mkconfig -o /boot/grub/grub.cfg`
For others check out [kernel parameters](https://wiki.archlinux.org/title/Kernel_parameters) and how to add `nvidia_drm.modeset=1` to your specific bootloader.

in `/etc/mkinitcpio.conf` add `nvidia nvidia_modeset nvidia_uvm nvidia_drm` to your `MODULES`

run `# mkinitcpio --config /etc/mkinitcpio.conf --generate /boot/initramfs-custom.img` (make sure you have the `linux-headers` package installed first)

add the [pacman hook](https://wiki.archlinux.org/title/NVIDIA#pacman_hook) to ensure mkinitcpio is regenerated when nvidia drivers are updated (arch only)

add a new line to `/etc/modprobe.d/nvidia.conf` (make it if it does not exist) and add the line `options nvidia-drm modeset=1`

More information is available here:
[https://wiki.archlinux.org/title/NVIDIA#DRM_kernel_mode_setting](https://wiki.archlinux.org/title/NVIDIA#DRM_kernel_mode_setting)

{{< hint >}}If your GPU is listed as supported by the `nvidia-open-dkms` driver,
use that one instead. Note that on a laptop, it could cause problems with the suspended state when closing the lid, so you might be better off with `nvidia-dkms`.
{{< /hint >}}

{{< hint >}}To get multi monitor to work properly on a hybrid graphics device (a laptop with both an Intel and an Nvidia GPU), you will need to remove the `optimus-manager` package if installed (disabling the service does not work). You also need to change your BIOS settings from hybrid graphics to discrete graphics.
{{< /hint >}}

## Environment
Export these variables in your hyprland config:

```sh
env = LIBVA_DRIVER_NAME,nvidia
env = XDG_SESSION_TYPE,wayland
env = GBM_BACKEND,nvidia-drm
env = __GLX_VENDOR_LIBRARY_NAME,nvidia
env = WLR_NO_HARDWARE_CURSORS,1
```

{{< hint >}}If hyprland crashes on start or you encounter crashes in Firefox, you may want to try removing the line `env = GBM_BACKEND,nvidia-drm`.
{{< /hint >}}

{{< hint >}}If you face problems with Discord windows not displaying or screen sharing not working in Zoom, remove or comment the line `env = __GLX_VENDOR_LIBRARY_NAME,nvidia`.
{{< /hint >}}

Run `lspci | grep VGA`.
The returned line will start with some digits in the form `00:00.0`.
Run `ls /dev/dri/by-path`.
You should see at least one file with a filename like `pci-0000:00:00.0-card`.
Set the environment variable `WLR_DRM_DEVICES` to the filepath with number matching the earlier pci entry.

For example, if I run `lspci | grep VGA` and get

```shell
01:00.0 VGA compatible controller: NVIDIA Corporation GM107 [GeForce GTX 750 Ti] (rev a2)
```

and when I run `ls -1 /dev/dri/by-path` I see

```ls
pci-0000:01:00.0-card
pci-0000:01:00.0-render
```

I would add

```sh
env = WLR_DRM_DEVICES,/dev/dri/by-path/pci-0000:01:00.0-card
```

to my hyprland config.

## Additional packages
Install `qt5-wayland`, `qt5ct` and `libva`. Additionally
`libva-nvidia-driver-git` (AUR) to fix crashes in some Electron-based
applications, such as Unity Hub.


After completing all of the above, Hyprland should _at least_ be able to start.

## Fixing screensharing / screenshots
Apply nvidia patches to the wlroots in `subprojects/wlroots` before building.
See [patch](https://aur.archlinux.org/cgit/aur.git/tree/nvidia.patch?h=hyprland-nvidia-git)
and [hyprland-nvidia-git's PKGBUILD](https://aur.archlinux.org/cgit/aur.git/tree/PKGBUILD?h=hyprland-nvidia-git#n72).

## Fixing random flickering, method 1

If you take a look at the wlroots patches in the [nix flake](https://github.com/hyprwm/Hyprland/blob/main/nix/wlroots.nix)
you will find a one-line patch:

```sh
substituteInPlace render/gles2/renderer.c --replace "glFlush();" "glFinish();"
```

What this means, for non-nix users, is you have to (before building) go to
`subprojects/wlroots/render/gles2/renderer.c` and replace all occurrences of `glFlush()`
with `glFinish()`, and then compile Hyprland as usual.

## Fixing random flickering, method 2 (nuclear)

Do note though that this forces performance mode to be active, resulting in
increased power-consumption (from 22W idle on a RTX 3070TI, to 74W).

This may not even be needed for some users, only apply these 'fixes' if you
in-fact do notice flickering artifacts from being idle for ~5 seconds.

Make a new file at `/etc/modprobe.d/nvidia.conf` and paste this in:

```sh
options nvidia NVreg_RegistryDwords="PowerMizerEnable=0x1; PerfLevelSrc=0x2222; PowerMizerLevel=0x3; PowerMizerDefault=0x3; PowerMizerDefaultAC=0x3"
```

Reboot your computer and it should be working.

## Fixing suspend/wakeup issues

Enable the services `nvidia-suspend.service`, `nvidia-hibernate.service` and `nvidia-resume.service`, they will be started by systemd when needed.

Add `nvidia.NVreg_PreserveVideoMemoryAllocations=1` to your kernel parameters if you don't have it already.

{{< hint type=important >}} Suspend functions are currently broken on `nvidia-open-dkms` [due to a bug](https://github.com/NVIDIA/open-gpu-kernel-modules/issues/472), so make sure you're on `nvidia-dkms`. {{< /hint >}}

For Nix users, the equivalent of the above is
```nix
# configuration.nix

boot.kernelParams = [ "nvidia.NVreg_PreserveVideoMemoryAllocations=1" ];

hardware.nvidia.powerManagement.enabled = true

# Making sure to use the proprietary drivers until the issue above is fixed upstream
hardware.nvidia.open = false

```
