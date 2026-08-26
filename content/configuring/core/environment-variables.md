---
weight: 70
title: Environment variables
---

You can use the `hl.env()` method to set environment variables before the display server initializes, for example:

```lua
hl.env("GTK_THEME", "Nord")
```

> [!NOTE]
> When referencing existing environment variables like `$XDG_RUNTIME_DIR`, use `os.getenv()`.
> For example: `hl.env("SSH_AUTH_SOCK", os.getenv("XDG_RUNTIME_DIR") .. "/ssh-agent.socket")`

> [!WARNING]
> Please avoid putting Wayland-specific environment variables in `/etc/environment`.
> On traditional distros, doing so will cause all sessions (including Xorg ones) to pick them up, likely breaking them.

Please make sure you know what you are doing before copy-pasting environment variables listed here.
Some of them are for debugging, others may cause system instability if not used correctly.

## Hyprland Environment Variables

- `hl.env("HYPRLAND_TRACE", "1")` - Enables more verbose logging.
- `hl.env("HYPRLAND_NO_RT", "1")` - Disables realtime priority setting by Hyprland.
- `hl.env("HYPRLAND_NO_SD_NOTIFY", "1")` - If systemd, disables the `sd_notify` calls.
- `hl.env("HYPRLAND_NO_SD_VARS", "1")` - Disables management of variables in systemd and D-Bus activation environments.
- `hl.env("HYPRLAND_CONFIG", "/path/to/hyprland.lua")` - Specifies where you want your Hyprland configuration.

## [Aquamarine](../../../hypr-ecosystem/dev/aquamarine/)
<!-- NOTE: ref https://github.com/hyprwm/aquamarine/blob/main/docs/env.md -->

- `hl.env("AQ_TRACE", "1")` - Enables trace logging (very verbose).
- `hl.env("AQ_DRM_DEVICES", "...")` - Set an explicit list of DRM devices (GPUs) to use. It's a colon-separated list of paths, the first will be used as the primary GPU. Example: `/dev/dri/card1:/dev/dri/card0`.
- `hl.env("AQ_FORCE_LINEAR_BLIT", "0")` - Disables forcing linear explicit modifiers on Multi-GPU buffers to potentially workaround NVIDIA issues.
- `hl.env("AQ_MGPU_NO_EXPLICIT", "1")` - Disables passing of explicit fences for multi-GPU scanouts.
- `hl.env("AQ_NO_MODIFIERS", "1")` - Disables modifiers for DRM buffers.
- `hl.env("AQ_NO_KMS_REQUIREMENT", "1")` - Disable KMS requirement for starting on headless GPUs.
- `hl.env("AQ_NO_ATOMIC", "1")` - **(HEAVILY NOT RECOMMENDED)** Disable atomic modesetting.

## Mouse cursor

- `hl.env("XCURSOR_THEME", "MyCursorTheme")` - Set your cursor theme. The theme needs to be installed and readable by your user.
- `hl.env("XCURSOR_SIZE", "24")` - Set cursor size. See [here](../../../faq) for why you might want this variable set.
- `hl.env("HYPRCURSOR_THEME", "MyHyprcursorTheme")` - Check [the hyprcursor page](../../../hypr-ecosystem/user/hyprcursor) for information about hyprcursor.
- `hl.env("HYPRCURSOR_SIZE", "24")`

## Qt

- `hl.env("QT_QPA_PLATFORMTHEME", "qt6ct")` - Tells Qt based applications to pick your theme from qt6ct.
- `hl.env("QT_AUTO_SCREEN_SCALE_FACTOR", "1")` - [(From the Qt documentation)](https://doc.qt.io/qt-5/highdpi.html) enables automatic scaling, based on the monitor's pixel density.
- `hl.env("QT_WAYLAND_DISABLE_WINDOWDECORATION", "1")` - Disables window decorations on Qt applications.

## GTK

- `hl.env("GTK_THEME", "yourVeryPrettyTheme")` - Set a GTK theme manually, for those who want to avoid appearance tools such as lxappearance or nwg-look.

## NVIDIA-specific

[Go to Nvidia page.](../../../nvidia/#environment-variables)

## GUI toolkits' backend

- `hl.env("GDK_BACKEND", "wayland,x11,*")` - GTK: Use Wayland if available; if not, try X11 and  then any other GDK backend.
- `hl.env("QT_QPA_PLATFORM", "wayland;xcb")` - Qt: Use Wayland if available, fall back to X11 if not.
- `hl.env("SDL_VIDEODRIVER", "wayland")` - Run SDL2 applications on Wayland. Remove or set to `x11` if games that provide older versions of SDL cause compatibility issues.
- `hl.env("CLUTTER_BACKEND", "wayland")` - Clutter package already has Wayland enabled, this variable will force Clutter applications to try and use the Wayland backend.
