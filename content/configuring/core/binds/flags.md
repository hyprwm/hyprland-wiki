---
weight: 10
title: Flags
---

## Bind flags

`hl.bind()` supports flags in this format:

```lua
hl.bind(keys, dispatcher, { flag1 = true, flag2 = true })
```

For example:

```lua
hl.bind(keys, hl.dsp.exec_cmd("amongus"), { release = true, locked = true })
```

Available flags are:

| Flag | Description |
|------|-------------|
| `locked` | Will also work when an input inhibitor (e.g. a lockscreen) is active. |
| `release` | Will trigger on release of a key. |
| `click` | Will trigger on release of a key or button as long as the mouse cursor stays inside `binds:drag_threshold`. |
| `drag` | Will trigger on release of a key or button as long as the mouse cursor moves outside `binds:drag_threshold`. |
| `long_press` | Will trigger on long press of a key. |
| `repeating` | Will repeat when held. |
| `non_consuming` | Key/mouse events will be passed to the active window in addition to triggering the dispatcher. |
| `auto_consuming` | Key/mouse events will be passed to the active window if the dispatcher doesn't succeed. |
| `mouse`| See the dedicated [Mouse binds](../devices/mouse) section. |
| `transparent` | Cannot be shadowed by other binds. |
| `ignore_mods` | Will ignore modifiers. |
| `description` | Will allow you to write a description for your bind. |
| `dont_inhibit` | Bypasses the app's requests to inhibit keybinds. |
| `submap_universal` | Will be active no matter the submap. |
| `device` | Allow binds to be set per device. See [Per-Device binds](../devices/per-device) |
| `allow_input_capture` | When input is captured by a client, this bind will still be processed. |

{{% details title="Examples" closed="true" %}}

```lua
-- Open wofi on first press, closes it on second
hl.bind("SUPER_L", hl.dsp.exec_cmd("pkill wofi || wofi"))

```

These binds set the expected behavior for regular keyboard media volume keys,
including when the screen is locked:

```lua
hl.bind("XF86AudioRaiseVolume", hl.dsp.exec_cmd("wpctl set-volume @DEFAULT_AUDIO_SINK@ 5%+"), { repeating = true })
-- Example volume button that will activate even while an input inhibitor is active
hl.bind("XF86AudioLowerVolume", hl.dsp.exec_cmd("wpctl set-volume @DEFAULT_AUDIO_SINK@ 5%-"), { repeating = true, locked = true })
hl.bind("XF86AudioMute",        hl.dsp.exec_cmd("wpctl set-mute @DEFAULT_AUDIO_SINK@ toggle"), { locked = true })

-- Requires playerctl
hl.bind("XF86AudioPlay", hl.dsp.exec_cmd("playerctl play-pause"), { locked = true })
hl.bind("XF86AudioPrev", hl.dsp.exec_cmd("playerctl previous"),   { locked = true })
hl.bind("XF86AudioNext", hl.dsp.exec_cmd("playerctl next"),       { locked = true })

-- Skip player on long press and only skip 5s on normal press
hl.bind("SUPER + XF86AudioNext", hl.dsp.exec_cmd("playerctl next"), { long_press = true })
hl.bind("SUPER + XF86AudioNext", hl.dsp.exec_cmd("playerctl position +5"))
```

{{% /details %}}

### Description

You can describe your keybind with the `description` flag.
Your description always goes in the flags section.

```lua
hl.bind(keys, dispatcher, { description = "your description here"})
```

For example:

```lua
hl.bind("SUPER + Q", hl.dsp.exec_cmd("kitty"), { description = "Open my favourite terminal" })
```

If you want to access your binds' descriptions, see the returned bind object's `description` field, or use `hyprctl binds`.
For more information, have a look at [Using hyprctl](../../advanced-configuration/using-hyprctl).
