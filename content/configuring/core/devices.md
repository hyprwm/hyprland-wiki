---
weight: 30
title: Devices
---

For global device configs, check the [Config options page](../../core/config-options). This page
will focus on per-device configs.

A basic per-device config is done via the `hl.device()` function:

```lua
hl.device({
    name = "my-epic-keyboard",
    sensitivity = -0.5
})
```

The `name` can be easily obtained by checking the output of `hyprctl devices`.

Inside of it, put your config options. All options from the `input` path can be put inside, **EXCEPT**:

- `force_no_accel`
- Options that configure window management, such as: `follow_mouse`,
  `follow_mouse_threshold`, `float_switch_override_focus`, `mouse_refocus`,
  `special_fallthrough`, etc.


You can also use the `output` setting for tablets to bind them to outputs.
Remember to use the name of the `Tablet` and not `Tablet Pad` or `Tablet Tool`.

Additional properties only present in per-device configs:

- `enabled` -> (only for mice / touchpads / touchdevices / keyboards)
  - enables / disables the device (connects / disconnects from the on-screen cursor)
  - default: Enabled
- `keybinds` -> (only for devices that send key events)
  - enables / disables keybinds for the device
  - default: Enabled
- `tags` -> (only for keyboards / pointers)
  - provides grouping and alt-names is device specific binds (see [Per-Device Binds](../../core/binds/devices/per-device)). comma separated list of tags
  - default: ""

> [!NOTE]
> Per-device layouts will by default not alter the keybind keymap, so for example
> with a global keymap of `us` and a per-device one of `fr`, the keybinds will
> still act as if you were on `us`.
> 
> You can change this behavior by setting `resolve_binds_by_sym = 1`. In that case
> you'll need to type the symbol specified in the bind to activate it.
