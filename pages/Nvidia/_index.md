## Foreword

There is no _official_ support for Nvidia. Unfortunately, their drivers are so
messy, and their products so random, that it's impossible for us to help if
these instructions don't work fully.

Every card seems to be random, and might work perfectly, or not work at all.

Nevertheless, it's recommended to at least try this tutorial.

## How to get Hyprland to possibly work on Nvidia

Install the `nvidia-dkms` driver and add it to your initramfs & kernel
parameters. Follow the information available here:
[https://wiki.archlinux.org/title/NVIDIA#DRM_kernel_mode_setting](https://wiki.archlinux.org/title/NVIDIA#DRM_kernel_mode_setting)

in `/etc/mkinitcpio.conf` add `nvidia nvidia_modeset nvidia_uvm nvidia_drm` to your `MODULES`


run `#  mkinitcpio --config /etc/mkinitcpio.conf --generate /boot/initramfs-custom.img`

add a new line to `/etc/modprobe.d/nvidia.conf` (make it if it does not exist) and add the line options nvidia-drm modeset=1`

{{< hint >}}If your GPU is listed as supported by the `nvidia-open-dkms` driver,
use that one instead.
{{< /hint >}}

Following the wrapping instructions found on
[the Quick Start page](../Getting-Started/Quick-start#wrapping-the-launcher-recommended),
wrap the launcher and additionally export these:

```sh
export LIBVA_DRIVER_NAME=nvidia
export CLUTTER_BACKEND=wayland
export XDG_SESSION_TYPE=wayland
export QT_WAYLAND_DISABLE_WINDOWDECORATION=1
export MOZ_ENABLE_WAYLAND=1
export GBM_BACKEND=nvidia-drm
export __GLX_VENDOR_LIBRARY_NAME=nvidia
export WLR_NO_HARDWARE_CURSORS=1
export WLR_BACKEND=vulkan
export QT_QPA_PLATFORM=wayland
export GDK_BACKEND=wayland
```

Install `qt5-wayland`, `qt5ct` and `libva`. Additionally
`nvidia-vaapi-driver-git` (AUR) to fix crashes in some Electron-based
applications, such as Unity Hub.

Reboot your computer

Launch Hyprland with the wrapper.

It _should_ work now.

### Fixing random flickering

Do note though that this forces performance mode to be active, resulting in
increased power-consumption (from 22W idle on a RTX 3070TI, to 74W).

This may not even be needed for some users, only apply these 'fixes' if you
in-fact do notice flickering artifacts from being idle for ~5 seconds.

Make a new file at `/etc/modprobe.d/nvidia.conf` and paste this in:

```sh
options nvidia NVreg_RegistryDwords="PowerMizerEnable=0x1; PerfLevelSrc=0x2222; PowerMizerLevel=0x3; PowerMizerDefault=0x3; PowerMizerDefaultAC=0x3"
```

Reboot your computer and it should be working.
