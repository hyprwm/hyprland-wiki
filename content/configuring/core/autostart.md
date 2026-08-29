---
weight: 90
title: Autostart
---

Autostarting apps can be done using the `hyprland.start` event:

```lua
hl.on("hyprland.start", function()
    hl.exec_cmd(terminal)
    hl.exec_cmd("nm-applet")
    hl.exec_cmd("waybar & hyprpaper & firefox") -- Execute waybar, hyprpaper, firefox
end)
```

In the same vein, you can spawn processes on exit by listening to `hyprland.shutdown`.
See more about `hl.on` over at [Events](../advanced-configuration/events).
<!-- and [systemd](../../../Useful-Utilities/Systemd-start#autostart) for autostarting user services. -->
