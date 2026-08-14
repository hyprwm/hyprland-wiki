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
Setting `INTEL_GPU_MIN_FREQ_ON_AC` and/or `INTEL_GPU_MIN_FREQ_ON_BAT` in `/etc/tlp.conf` to something slightly higher (e.g. to 500 from 300) will reduce stutter significantly or, in the best case, remove it completely.

## How do I make Hyprland draw as little power as possible on my laptop?

- `hl.config({ ["decoration.blur.enabled"] = false })` and `hl.config({ ["decoration.shadow.enabled"] = false })` to disable fancy but battery hungry effects.

<!-- TODO shadows should eat less power now, needs checking -->

## My games work poorly, especially Proton ones

Using `gamescope` tends to fix any and all issues with Wayland/Hyprland.
