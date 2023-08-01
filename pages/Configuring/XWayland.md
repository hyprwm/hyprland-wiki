XWayland is the bridging mechanism between legacy Xorg programs and Wayland
compositors.

## HiDPI XWayland

XWayland currently looks pixelated on HiDPI screens, due to Xorg's inability to
scale.

This problem is mitigated by the [`xwayland:force_zero_scaling`](../../Configuring/Variables/#xwayland)
option, which forces XWayland windows not to be scaled.

This will get rid of the pixelated look, but will not scale applications
properly. To do this, each toolkit has its own mechanism.

```ini
# change monitor to high resolution, the last argument is the scale factor
monitor=,highres,auto,2

# unscale XWayland
xwayland {
  force_zero_scaling = true
}

# toolkit-specific scale
env = GDK_SCALE,2
env = XCURSOR_SIZE,32
```

The GDK_SCALE variable won't conflict with Wayland-native GTK programs.

{{< hint type="important" >}}
XWayland HiDPI patches are no longer supported. Do not use them.
{{</ hint >}}
