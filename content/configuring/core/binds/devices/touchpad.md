---
weight: 20
title: Touchpad
---


### Touchpad

As clicking and moving the mouse on a touchpad is unergonomic, you can also use keyboard keys instead of mouse clicks.

```lua
hl.bind("SUPER + mouse:272", hl.dsp.window.drag(), { mouse = true })
hl.bind("SUPER + CTRL_L", hl.dsp.window.drag(), { mouse = true })

hl.bind("SUPER + mouse:273", hl.dsp.window.resize(), { mouse = true })
hl.bind("SUPER + ALT_L", hl.dsp.window.resize(), { mouse = true })
```

