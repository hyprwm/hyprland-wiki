---
weight: 18
title: Environment variables
---

{{< callout type=info >}}

[uwsm](../../Useful-Utilities/Systemd-start) users should avoid placing environment variables in the `hyprland.conf` file.  
Instead, use `~/.config/uwsm/env` for theming, xcursor, Nvidia and toolkit variables, and `~/.config/uwsm/env-hyprland` for `HYPR*` and `AQ_*` variables.  
The format is `export KEY=VAL`.

```plain
export XCURSOR_SIZE=24
```

See [uwsm readme](https://github.com/Vladimir-csp/uwsm?tab=readme-ov-file#4-environments-and-shell-profile) for additional information.

{{< /callout >}}

You can use the `env` keyword to set environment variables prior to the
initialization of the Display Server, e.g.:

```ini
env = GTK_THEME,Nord
```

{{< callout type=warning >}}

Note that when using the `env` keyword, Hyprland reads the value of the variable as a **raw string** and puts it into the environment _as is_.  
You should **NOT** add quotes `""` around the values.

Some examples with differently formatted values:

✗ DON'T:

```py
env = QT_AUTO_SCREEN_SCALE_FACTOR,"1"
env = QT_QPA_PLATFORM,"wayland"
env = QT_QPA_PLATFORM,"wayland;xcb"
env = AQ_DRM_DEVICES=,"/dev/dri/card1:/dev/dri/card0"
```

✓ Instead, DO:

```py
env = QT_AUTO_SCREEN_SCALE_FACTOR,1
env = QT_QPA_PLATFORM,wayland
env = QT_QPA_PLATFORM,wayland;xcb
env = AQ_DRM_DEVICES=,/dev/dri/card1:/dev/dri/card0
```

{{< /callout >}}


{{< callout type=warning >}}

Please avoid putting those environment variables in `/etc/environment`.  
That will cause all sessions (including Xorg ones) to pick up your Wayland-specific
environment on traditional Linux distros.

{{< /callout >}}

## Hyprland Environment Variables

- `HYPRLAND_TRACE=1` - Enables more verbose logging.
- `HYPRLAND_NO_RT=1` - Disables realtime priority setting by Hyprland.
- `HYPRLAND_NO_SD_NOTIFY=1` - If systemd, disables the `sd_notify` calls.
- `HYPRLAND_NO_SD_VARS=1` - Disables management of variables in systemd and dbus activation environments.
- `HYPRLAND_CONFIG` - Specifies where you want your Hyprland configuration.

## Aquamarine Environment Variables <!-- ref https://github.com/hyprwm/aquamarine/blob/main/docs/env.md -->

- `AQ_TRACE=1` - Enables more verbose logging.
- `AQ_DRM_DEVICES=` - Set an explicit list of DRM devices (GPUs) to use. It's a colon-separated list of paths, with the first being the primary.
  E.g.: `/dev/dri/card1:/dev/dri/card0`
- `AQ_FORCE_LINEAR_BLIT=0` - Disables forcing linear explicit modifiers on Multi-GPU buffers to potentially workaround Nvidia issues.
- `AQ_MGPU_NO_EXPLICIT=1` - Disables explicit syncing on mgpu buffers.
- `AQ_NO_MODIFIERS=1` - Disables modifiers for DRM buffers.

## Toolkit Backend Variables

- `env = GDK_BACKEND,wayland,x11,*` - GTK: Use Wayland if available; if not, try X11 and  then any other GDK backend.
- `env = QT_QPA_PLATFORM,wayland;xcb` - Qt: Use Wayland if available, fall back to
  X11 if not.
- `env = SDL_VIDEODRIVER,wayland` - Run SDL2 applications on Wayland. Remove or set to
  `x11` if games that provide older versions of SDL cause compatibility issues
- `env = CLUTTER_BACKEND,wayland` - Clutter package already has Wayland enabled, this
  variable will force Clutter applications to try and use the Wayland backend

## XDG Specifications

- `env = XDG_CURRENT_DESKTOP,Hyprland`
- `env = XDG_SESSION_TYPE,wayland`
- `env = XDG_SESSION_DESKTOP,Hyprland`

XDG specific environment variables are often detected through portals and
applications that may set those for you, however it is not a bad idea to set
them explicitly.

If your [desktop portal](https://wiki.archlinux.org/title/XDG_Desktop_Portal) is malfunctioning for seemingly
no reason (no errors), it's likely your XDG env isn't set correctly.

 {{< callout type=info >}}
 
 [uwsm](../../Useful-Utilities/Systemd-start) users don't need to explicitly set XDG environment variables, as uwsm sets them automatically.

 {{< /callout >}}

## Qt Variables

- `env = QT_AUTO_SCREEN_SCALE_FACTOR,1` -
  [(From the Qt documentation)](https://doc.qt.io/qt-5/highdpi.html) enables
  automatic scaling, based on the monitor's pixel density
- `env = QT_QPA_PLATFORM,wayland;xcb` - Tell Qt applications to use the Wayland
  backend, and fall back to X11 if Wayland is unavailable
- `env = QT_WAYLAND_DISABLE_WINDOWDECORATION,1` - Disables window decorations on Qt
  applications
- `env = QT_QPA_PLATFORMTHEME,qt5ct` - Tells Qt based applications to pick your theme
  from qt5ct, use with Kvantum.

## NVIDIA Specific

To force GBM as a backend, set the following environment variables:

- `env = GBM_BACKEND,nvidia-drm`
- `env = __GLX_VENDOR_LIBRARY_NAME,nvidia`

> See
> [Archwiki Wayland Page](https://wiki.archlinux.org/title/Wayland#Requirements)
> for more details on those variables.

- `env = LIBVA_DRIVER_NAME,nvidia` - Hardware acceleration on NVIDIA GPUs

> See
> [Archwiki Hardware Acceleration Page](https://wiki.archlinux.org/title/Hardware_video_acceleration)
> for details and necessary values before setting this variable.

- `__GL_GSYNC_ALLOWED` - Controls if G-Sync capable monitors should use Variable
  Refresh Rate (VRR)

> See
> [Nvidia Documentation](https://download.nvidia.com/XFree86/Linux-32bit-ARM/375.26/README/openglenvvariables.html)
> for details.

- `__GL_VRR_ALLOWED` - Controls if Adaptive Sync should be used. Recommended to
  set as "0" to avoid having problems on some games.

- `env = AQ_NO_ATOMIC,1` - use legacy DRM interface instead of atomic mode
  setting. **NOT** recommended.

## Theming Related Variables

- `GTK_THEME` - Set a GTK theme manually, for those who want to avoid appearance
  tools such as lxappearance or nwg-look.
- `XCURSOR_THEME` - Set your cursor theme. The theme needs to be installed and
  readable by your user.
- `XCURSOR_SIZE` - Set cursor size. See [here](../../FAQ/) for why you might
  want this variable set.
