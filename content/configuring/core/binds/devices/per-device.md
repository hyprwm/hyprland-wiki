---
weight: 30
title: Per-device binds
---

### Per-Device Binds

You can set keybinds to be device specific with the `device` flag. This flag is a table consisting of an `inclusive` flag and device list  
If `inclusive` is set to true, only devices specified in the list are capable of triggering the keybind. If set to false all devices except those specified can trigger the keybind. If `inclusive` is not present it defaults to true.  
A list of devices is specified in the `list` field as a comma separated list of strings.  
Device tags may also be used in place of device names. See [Devices](../../../devices).

```lua
hl.bind(keys, dispatcher(params), { device = { inclusive = true, list = { "device1", "device2" } } })
```

```lua
-- Only example-keyboard-1 can use this bind
hl.bind("SUPER + Q", hl.dsp.exec_cmd("kitty"), { device = { inclusive = true, list = { "example-keyboard-1" } } })

-- Every keyboard other than razer-keyboard and asus-keyboard can use this bind
hl.bind("SUPER + Q", hl.dsp.exec_cmd("kitty"), { device = { inclusive = false, list = { "razer-keyboard", "asus-keyboard" } } })
```

You can check device names with `hyprctl devices`.

