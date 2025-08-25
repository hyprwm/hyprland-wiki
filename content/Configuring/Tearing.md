---
weight: 11
title: Tearing
---

Screen tearing is used to reduce latency and/or jitter in games.

## Enabling tearing

To enable tearing:

- Set `general:allow_tearing` to `true`. This is a "master toggle"
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

windowrule = immediate, class:^(cs2)$
```

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

Almost definitely means your GPU driver does not support tearing.

Please _do not_ report issues if this is the culprit.

### Graphical artifacts (random colorful pixels, etc)

Likely issue with your graphics driver.

Please _do not_ report issues if this is the culprit. Unfortunately, it's most
likely your GPU driver's fault.
