We have [previously mentioned](../Getting-Started/Quick-start/#wrapping-the-launcher-recommended) using a wrapper to launch Hyprland. Whether you
start Hyprland through TTY or a Display Manager, it is recommended to use a wrapper.
As such, you can pass certain environmental variables to improve Wayland compatibility, or
simply change certain aspects of your desktop.

Please avoid putting those environmental variables in /etc/environment. That will cause all
sessions (including Xorg ones) to pick up your wayland-specific environmental on traditional
Linux distros.

## XDG Specifications

- `XDG_CURRENT_DESKTOP=Hyprland`
- `XDG_SESSION_TYPE=wayland`
- `XDG_SESSION_DESKTOP=Hyprland`

XDG specific environmental variables are often detected through portals and applications that may
set those for you, however it is a good idea to provide them in your wrapper script as a fail-safe.

## QT Variables

- `QT_AUTO_SCREEN_SCALE_FACTOR=1` - [(From the QT documentation)](https://doc.qt.io/qt-5/highdpi.html)
  enables automatic scaling, based on the monitor's pixel density
- `QT_QPA_PLATFORM="wayland;xcb"` - Tell QT applications to use the Wayland backend, and fall back to x11 if Wayland is unavailable
- `QT_WAYLAND_DISABLE_WINDOWDECORATION=1` - Disables window decorations on QT applications
- `QT_QPA_PLATFORMTHEME=qt5ct` - Tells QT based applications to pick your theme from qt5ct, use with Kvantum.

## NVIDIA Specific

To force GBM as a backend, set the following environment variables:

- `GBM_BACKEND=nvidia-drm`
- `__GLX_VENDOR_LIBRARY_NAME=nvidia`

> See [Archwiki Wayland Page](https://wiki.archlinux.org/title/Wayland#Requirements) for more details on those variables.

- `LIBVA_DRIVER_NAME=nvidia` - Hardware acceleration on NVIDIA GPUs

> See [Archwiki Hardware Acecleration Page](https://wiki.archlinux.org/title/Hardware_video_acceleration)
> for details and necessary values before setting this variable.

- `__GLX_GSYNC_ALLOWED` - Controls if G-Sync capable monitors should use Variable Refresh Rate (VRR)

> See [Nvidia Documentation](https://download.nvidia.com/XFree86/Linux-32bit-ARM/375.26/README/openglenvvariables.html) for details.

- `__GL_VRR_ALLOWED` - Controls if Adaptive Sync should be used. Recommended to set as "0" to avoid having problems on some games.

- `WLR_DRM_NO_ATOMIC=1` - use legacy DRM interface instead of atomic mode setting. Might fix flickering issues.

## Toolkit Backend Variables

- `SDL_VIDEODRIVER=wayland` - Run SDL2 applications on Wayland. Remove or set to x11 if games that provide older versions of SDL cause
  compatibility issues
- `_JAVA_AWT_WM_NONEREPARENTING=1` - Fix possibly broken Java applications. Set to 1 until Wakefield is available.
- `CLUTTER_BACKEND="wayland"` - Clutter package already has wayland enabled, this variable will force Clutter applications
  to try and use the Wayland backend

- `GDK_BACKEND` - Force backend for wayland-enabled GTK3 and GTK4 backends. Available options are "wayland" or "x11". If GTK XWayland
  applications cause issues when set to "wayland", try "wayland,x11"

## Theming Related Variables

- `GTK_THEME` - Set a GTK theme manually, for those who want to avoid appearance tools lxappearance or nwg-look
- `XCURSOR_THEME` - Set your cursor theme. The theme needs to be installed and readable by your user.
- `XCURSOR_SIZE` - Set cursor size. See [here](../FAQ/) for why you might want this variable set.
