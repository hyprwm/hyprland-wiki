---
weight: 32
title: Expanding functionality
---

> [!NOTE]
> Looking for the old hyprlang syntax? Check the [0.54 wiki pages](https://wiki.hypr.land/0.54.0/).
> Since Hyprland 0.55, hyprlang is deprecated in favor of lua.

## Lua utilities

Hyprland exposes a bunch of lua utilities for you to script your desktop
with custom functionality and more.

### Events

With `hl.on`, you can define callbacks on events. You can register as many as you want.

```lua
hl.on("window.active", function(w)
  hl.notification.create({ text = "Window focused: " .. w.title, timeout = 5000, icon = "ok" })
end)
```

Event list:

| Event | Description | Parameters |
| --- | --- | --- |
| window.open | Window was opened | Window |
| window.open_early | Window was opened, early event, before rules, etc | Window |
| window.close | Window was closed | Window |
| window.destroy | Window was destroyed | Window |
| window.kill | Window was killed | Window |
| window.active | Window was focused | Window, int \[0/1\] |
| window.urgent | Window requested urgent | Window |
| window.title | Window changed title | Window |
| window.class | Window changed class | Window |
| window.pin | Window changed pin state | Window |
| window.fullscreen | Window changed fullscreen state | Window |
| window.update_rules | Window's rules were updated | Window |
| window.move_to_workspace | Window was moved to a workspace | Window, Workspace |
| layer.opened | A layer was opened | LayerSurface |
| layer.closed | A layer was closed | LayerSurface |
| monitor.added | A monitor was connected | Monitor |
| monitor.removed | A monitor was disconnected | Monitor |
| monitor.focused | A monitor was focused | Monitor |
| monitor.layout_changed | The monitor layout changed | None |
| workspace.active | A workspace was focused | Workspace |
| workspace.created | A workspace was opened | Workspace |
| workspace.removed | A workspace was closed | Workspace |
| workspace.move_to_monitor | A workspace was moved | Workspace, Monitor |
| config.reloaded | The config was reloaded | None |
| keybinds.submap | The active keybind submap changed | String |
| screenshare.state | The screensharing state changed | Bool, Integer, String |

### Convenience functions

Hyprland exposes a bunch of convenience functions:
 - `hl.get_active_window()`
 - `hl.get_windows()`
 - `hl.get_window(selector)`
 - `hl.get_urgent_window()`
 - `hl.get_workspaces()`
 - `hl.get_workspace(selector)`
 - `hl.get_active_workspace()`
 - `hl.get_active_special_workspace()`
 - `hl.get_monitors()`
 - `hl.get_monitor(selector)`
 - `hl.get_active_monitor()`
 - `hl.get_monitor_at({ x = num, y = num })`
 - `hl.get_monitor_at_cursor()`
 - `hl.get_cursor_pos()`
 - `hl.get_last_window()`
 - `hl.get_last_workspace()`
 - `hl.get_layers()`
 - `hl.get_workspace_windows(workspace_selector)`
 - `hl.get_current_submap()`

### Combining it all

You can expand functionality e.g. like so:

```lua
-- bind to toggle floating, unless the window is htop,
-- then only set floating

hl.bind("SUPER + X", function()
  local w = hl.get_active_window()
  if w ~= nil and w.title == "htop" do
    hl.dispatch(hl.window.float({ action = "set" }))
  else
    hl.dispatch(hl.window.float({ action = "toggle" }))
  end
end)
```

## Sockets (IPC)

It's recommended to use Lua. Lua will be faster, less buggy, have more APIs,
and is more integrated.

However, if you want to use IPC instead, check the [IPC](../../IPC/) page.
