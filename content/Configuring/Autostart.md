---
weight: 11
title: Autostart
---

Autostarting apps can be done by executing things on the `hyprland.start` event:

```lua
hl.on("hyprland.start", function () 
  hl.exec_cmd(terminal)
  hl.exec_cmd("nm-applet")
  hl.exec_cmd("waybar & hyprpaper & firefox")
end)
```

`hl.exec_cmd()` will spawn an asynchronous process, so there is no need for `& disown` at the end.

In the same vein, you can spawn processes on exit by listening to `hyprland.shutdown`.

See more about `hl.on` over at [Expanding Functionality](../Expanding-functionality)