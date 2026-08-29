---
weight: 40
title: Tearing
---

Screen tearing is used to reduce latency and/or jitter in games.

## Enabling tearing

> [!WARNING]
> If you experience graphical issues, you may be out of luck.
> Tearing support is experimental.
> See the likely culprits below.

To enable tearing:

- Set `general.allow_tearing` to `true`.
  This is a "master toggle".
- Add an `immediate` windowrule effect to your game of choice.
  This makes sure that Hyprland will tear it.

> [!NOTE]
> Tearing will only be in effect when the game is in fullscreen and the only thing visible on the screen.
> Check the `tearingBlockedBy` field from `hyprctl monitors` for details.

Example snippet:

```lua
hl.config({
  general = {
    allow_tearing = true
  }
})

hl.window_rule({
  match = { class = "cs2" }, immediate = true
})
```

## Common issues

### No tearing at all

Make sure your window rules are matching and you have the master toggle enabled.

Also make sure nothing except for your game is showing on your monitor.
No notifications, overlays, lock screens, bars, other windows, etc.
(Having these elements on a different monitor is fine.)

### Apps that should tear, freeze

Almost definitely means your GPU driver does not support tearing.

Please _do not_ report issues if this is the culprit.

### Graphical artifacts (random colorful pixels, etc.)

Likely issue with your graphics driver.

Please _do not_ report issues if this is the culprit.
Unfortunately, it's most likely your GPU driver's fault.
