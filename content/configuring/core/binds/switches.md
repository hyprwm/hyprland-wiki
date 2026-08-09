---
weight: 60
title: Switches
---

## Switches

> [!WARNING]
> Systemd `HandleLidSwitch` settings in `logind.conf` may conflict with Hyprland's laptop lid switch configurations.

Switches are useful for binding events like closing and opening a laptop's lid.  
To view available switches use `hyprctl devices`.

### Examples
```lua
-- Trigger when the switch is toggled.
hl.bind("switch:[switch name]", hl.dsp.exec_cmd("swaylock"), { locked = true })
-- Trigger when the switch is turning on.
hl.bind("switch:on:[switch name]", hl.dsp.exec_cmd("notify-send 'yooo'"), { locked = true })
-- Trigger when the switch is turning off.
hl.bind("switch:off:[switch name]", hl.dsp.exec_cmd("notify-send 'among us'"), { locked = true })
```

