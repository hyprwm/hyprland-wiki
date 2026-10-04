---
weight: 30
title: Performance
---

This page documents known tricks and fixes to boost performance, in case you run into problems or don't care about animations.

## Fractional scaling

Wayland fractional scaling is a lot better than before, but it is not perfect.
Some applications do not support it yet or the support is experimental at best.
If you have problems with your graphics card having high usage or Hyprland feeling laggy, try setting the scaling to integer numbers such as `1` or `2`, via e.g. `hl.monitor({ output = "", mode = "preferred", position = "auto", scale = 2 })`.

## Low FPS/stutter/FPS drops on Intel iGPU with TLP (mainly laptops)

The TLP defaults are rather aggressive.
Setting `INTEL_GPU_MIN_FREQ_ON_AC` and/or `INTEL_GPU_MIN_FREQ_ON_BAT` in `/etc/tlp.conf` to something slightly higher (e.g., to 500 from 300) will reduce stutter significantly or, in the best case, remove it completely.

## How do I make Hyprland draw as little power as possible on my laptop?

`hl.config({ ["decoration.blur.enabled"] = false })` <!-- and `hl.config({ ["decoration.shadow.enabled"] = false })` --> to disable fancy, but hungry effects.

<!-- TODO: shadows should eat less now, needs checking, will comment out for now. low prio -->

## My games work poorly, especially Proton ones

Using `gamescope` tends to fix any and all issues with Wayland/Hyprland.

## Raspberry Pi 5 and other low-end ARM boards

<!-- NOTE: tested on a Raspberry Pi 5 (8 GB), Debian 13, Mesa 26.2 (vc4 display + v3d render node), Hyprland 0.56 -->

The Pi 5 GPU (V3D 7.1) is usable for a desktop session, but it has very little headroom, especially on high-resolution or ultrawide monitors.

- Use aquamarine 0.15 or newer.
  The display controller (`vc4`) and the GPU (`v3d`) are separate DRM devices, and older aquamarine versions retried creating a renderer on every commit, flooding the log (see [aquamarine#425](https://github.com/hyprwm/aquamarine/issues/425)).
  With 0.15, the log shows `falling back to sole renderD on the system` once, and the renderer is created on the V3D node.
- Disable blur, shadows and animations (see above).
- Disable the color management pipeline, which saves a shader pass per frame (requires a restart): `hl.config({ ["render.cm_enabled"] = false })`.
- Prefer a lower refresh rate on large monitors.
  On a 3440x1440 monitor, 100 Hz could saturate the GPU, while 60 Hz is smooth.
- If you don't run any X11 applications, disabling Xwayland saves memory (about 25 MB on a Pi 5): `hl.config({ ["xwayland.enabled"] = false })`.
