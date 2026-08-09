---
title: Lua events
weight: 10
---

## Events

With `hl.on`, you can define callbacks on events. You can register as many as you want.

```lua
hl.on("window.active", function(w)
  hl.notification.create({ text = "Window focused: " .. w.title, timeout = 5000, icon = "ok" })
end)
```

or, if you're working with events that have multiple parameters

```lua
hl.on("workspace.move_to_monitor", function(ws, m)
  hl.notification.create({
    text = "Workspace: " .. ws.name .. " moved to a monitor at x: " .. m.position.x,
    timeout = 4000,
    icon = "ok"
  })
end)
```

Event list:

| Event | Description | Parameters |
| --- | --- | --- |
| hyprland.start | Emitted once on start | None |
| hyprland.shutdown | Emitted once before Hyprland exits | None |
| window.bell | Emitted when a window rings the system bell, even if it's muted. | Window |
| window.open | Emitted when a window is fully initialized with window rules applied. | Window |
| window.open_early | Emitted when a window is created and mapped, but **before** window rules are applied. | Window |
| window.close | Emitted when a window is closed. It may still be visible during its closing animation. | Window |
| window.destroy | Emitted when a window is removed from the compositor. For windows with a close animation, fires after the animation completes. | Window |
| window.kill | Emitted when a window is forcefully killed via hyprctl kill. | Window |
| window.active | Emitted when the active window changes. | Window, int (focus reason) |
| window.urgent | Emitted when a window requests an `urgent` state. | Window |
| window.title | Emitted when a window title changes. | Window |
| window.class | Emitted when a window class changes. | Window |
| window.pin | Emitted when a window is pinned or unpinned. | Window |
| window.fullscreen | Emitted when the fullscreen status of a window changes. | Window |
| window.update_rules | Emitted when a window's rules are re-evaluated, e.g. when its title or class changes. | Window |
| window.move_to_workspace | Emitted when a window is moved to a different workspace. | Window, Workspace |
| layer.opened | Emitted when a layer surface is opened. | LayerSurface |
| layer.closed | Emitted when a layer surface is closed. | LayerSurface |
| monitor.added | Emitted when a monitor is connected and ready. | Monitor |
| monitor.removed | Emitted when a monitor is disconnected and removed. | Monitor |
| monitor.focused | Emitted when the active monitor changes. | Monitor |
| monitor.layout_changed | Emitted when the monitor arrangement changes. This occurs when a monitor is added or removed, a monitor's resolution or refresh rate is changed, or the config is reloaded with different rules. | None |
| workspace.active | Emitted when the active workspace on a monitor changes. | Workspace |
| workspace.special_active | Emitted when the opened special workspace on a monitor changes. Workspace of nil means no special workspace is open. | Workspace, Monitor |
| workspace.created | Emitted when a workspace is created. | Workspace |
| workspace.removed | Emitted when a workspace is removed. | Workspace |
| workspace.move_to_monitor | Emitted when a workspace is moved to a different monitor. | Workspace, Monitor |
| config.reloaded | Emitted when the config has been reloaded **and applied**. | None |
| config.props_refreshed | Emitted when a prop refresh event is executed. | Bool: Is the prop refresh event executed as scheduled (`false` if executed prematurely with helper function) |
| keybinds.submap | Emitted when the active submap changes. An empty string means the default submap was restored. | String: Submap Name|
| screenshare.state | Emitted when a screenshare session starts or stops. | Bool: Active, Integer: Type, String: Name |
| input.keyboard.key | Emitted when a key is pressed or released. | Integer: XKB keycode, Integer: Unix timestamp that the event occurred, Integer: Can be released (0), pressed (1), or repeated (2) |

