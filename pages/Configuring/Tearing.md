---
weight: 10
title: Tearing
---

Screen tearing is used to reduce latency and/or jitter in games.

## Enabling tearing

To enable tearing:

- Set `general:allow_tearing` to `true`. This is a "master toggle"
- Add `env = WLR_DRM_NO_ATOMIC,1` to your Hyprland config. This disables the
  usage of a newer kernel DRM API that doesn't support tearing yet.
- Add an `immediate` windowrule to your game of choice. This makes sure that
  Hyprland will tear it.

{{< callout >}}

Please note that tearing will only be in effect when the game is in fullscreen
and the only thing visible on the screen.

{{< /callout >}}

Example snippet:

```env
general {
    allow_tearing = true
}

env = WLR_DRM_NO_ATOMIC,1

windowrulev2 = immediate, class:^(cs2)$
```

{{< callout >}}

`env = WLR_DRM_NO_ATOMIC,1` is not recommended. If your kernel ver is >= 6.8,
you can remove it.

For kernels < 6.8, this env is required.

Check your kernel version with `uname -r`.

{{< /callout >}}

{{< callout type=warning >}}

If you experience graphical issues, you may be out of luck. Tearing support is
experimental.

See the likely culprits below.

{{< /callout >}}

## Common issues

### No tearing at all

Make sure your window rules are matching and you have the master toggle enabled.

Also make sure nothing except for your game is showing on your monitor. No
notifications, overlays, lockscreens, bars, other windows, etc. (on a different
monitor is fine)

### Apps that should tear, freeze

Almost definitely means your GPU driver does not support tearing, like e.g.
Intel's, or AMD if you don't use the legacy backend with `env = WLR_DRM_NO_ATOMIC,1` or patch your kernel.

Please _do not_ report issues if this is the culprit.

### Graphical artifacts (random colorful pixels, etc)

Likely issue with your graphics driver.

Please _do not_ report issues if this is the culprit. Unfortunately, it's most
likely your GPU driver's fault.

### Other graphical issues/Hyprland instantly crashes on launch

Likely issue with `WLR_DRM_NO_ATOMIC`.

NO_ATOMIC forces the use of a legacy, less tested drm API.

Please _do not_ report issues if this is the culprit. Unfortunately, you will
have to wait for the Linux kernel to support tearing page flips on the atomic
API.
