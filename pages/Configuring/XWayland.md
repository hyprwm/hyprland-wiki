XWayland is the bridging mechanism between legacy Xorg programs and Wayland
compositors.

# HiDPI XWayland

XWayland currently looks pixelated/blurry on HiDPI screens, due to Xorg's
inability to scale.
There are attempts to add a standard scaling mechanism, such as
[MR 733](https://gitlab.freedesktop.org/xorg/xserver/-/merge_requests/733).

You can use this MR's wlroots implementation in Hyprland by making a few changes.

{{< hint >}}
The following instructions assume you know how to patch programs, either
manually or using your favourite package manager.

See instructions for [manual patching](https://www.howtogeek.com/415442/how-to-apply-a-patch-to-a-file-and-create-patches-in-linux/)
and [Pacman patching](https://wiki.archlinux.org/title/Patching_packages).
{{< /hint >}}

1. Have the latest `xwayland` package patched with at least
    [the HiDPI patch](https://github.com/hyprwm/Hyprland/blob/main/nix/xwayland-hidpi.patch)
    (based on the MR's implementation, but updated).

2. Make sure you have the required Hyprland `wlroots`, patched with
    [the HiDPI xwayland patch](https://github.com/hyprwm/Hyprland/blob/main/nix/wlroots-hidpi.patch)
    and [this commit](https://gitlab.freedesktop.org/wlroots/wlroots/-/commit/18595000f3a21502fd60bf213122859cc348f9af)
    **reverted**. This is important, as not reverting it will make opening
    XWayland programs crash Hyprland.

3. Add these lines to your configuration:

    ```ini

    # change monitor to hires, the last argument is the scale factor
    monitor=,highres,auto,2

    # sets xwayland scale
    exec-once=xprop -root -f _XWAYLAND_GLOBAL_OUTPUT_SCALE 32c -set _XWAYLAND_GLOBAL_OUTPUT_SCALE 2

    # toolkit-specific scale
    env = GDK_SCALE,2
    env = XCURSOR_SIZE,32
    ```

    {{< hint >}}
    The GDK_SCALE variable won't conflict with wayland-native GTK programs.
    {{< /hint >}}
