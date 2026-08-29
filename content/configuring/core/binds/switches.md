---
weight: 60
title: Switches
---

## Switches

> [!WARNING]
> Systemd-logind's `HandleLidSwitch` settings in `logind.conf` may conflict with Hyprland's laptop lid switch configurations.

> [!TIP]
> If you want to have switches operate as normal, but override them only when Hyprland is running, use `systemd-inhibit`.
> For example, you might launch Hyprland via `systemd-inhibit --what=handle-lid-switch Hyprland`, so that systemd-logind will ignore the switch while it is running.

Switches are useful for binding events like closing and opening a laptop's lid.
To view available switches, use `hyprctl devices`.

### Examples
```lua
-- Trigger when the switch is toggled.
hl.bind("switch:[switch name]", hl.dsp.exec_cmd("swaylock"), { locked = true })
-- Trigger when the switch is turning on.
hl.bind("switch:on:[switch name]", hl.dsp.exec_cmd("notify-send 'yooo'"), { locked = true })
-- Trigger when the switch is turning off.
hl.bind("switch:off:[switch name]", hl.dsp.exec_cmd("notify-send 'among us'"), { locked = true })
```
