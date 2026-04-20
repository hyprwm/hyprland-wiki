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
| window.open | Emitted when a window is fully initialized with window rules applied. | Window |
| window.open_early | Emitted when a window is created and mapped, but **before** window rules are applied. | Window |
| window.close | Emitted when a window is closed. It may still be visible during its closing animation. | Window |
| window.destroy | Emitted when a window is removed from the compositor. For windows with a close animation, fires after the animation completes. | Window |
| window.kill | Emitted when a window is forcefully killed via hyprctl kill. | Window |
| window.active | Emitted when the active window changes. | Window, int \[0/1\] |
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
| workspace.created | Emitted when a workspace is created. | Workspace |
| workspace.removed | Emitted when a workspace is removed. | Workspace |
| workspace.move_to_monitor | Emitted when a workspace is moved to a different monitor. | Workspace, Monitor |
| config.reloaded | Emitted when the config has been reloaded **and applied**. | None |
| keybinds.submap | Emitted when the active submap changes. An empty string means the default submap was restored. | String: Submap Name|
| screenshare.state | Emitted when a screenshare session starts or stops. | Bool: Active, Integer: Type, String: Name |

### Parameter Types

The parameters themselves, like `Window`, return their values as a table which you can then access.

#### Window

| Property | Type | Description |
| --- | --- | --- |
| address | string | Pointer address |
| mapped | boolean | Whether the window is mapped |
| hidden | boolean | Whether the window is hidden |
| at | table | Position {x, y} |
| size | table | Size {x, y} |
| workspace | Workspace | The workspace it's on (nil if none) |
| floating | boolean | Whether the window is floating |
| monitor | Monitor | The monitor it's on |
| class | string | Window class / app-id |
| title | string | Window title |
| initial_class | string | Class at the time the window was opened |
| initial_title | string | Title at the time the window was opened |
| pid | integer | PID of the owning process |
| xwayland | boolean | Whether the window is an XWayland window |
| pinned | boolean | Whether the window is pinned |
| fullscreen | integer | Internal fullscreen state |
| fullscreen_client | integer | Client-requested fullscreen state |
| over_fullscreen | boolean | Whether the window was opened over a fullscreen window |
| group | table | Group info (nil if not in a group) — {locked, denied, size, current_index, current, members} |
| tags | string[] | List of tags applied to the window |
| swallowing | Window | Window being swallowed (nil if none) |
| focus_history_id | integer | Position in focus history (0 = most recently focused) |
| inhibiting_idle | boolean | Whether the window is inhibiting idle |
| xdg_tag | string | XDG tag (nil if none) |
| xdg_description | string | XDG description (nil if none) |
| content_type | string | Content type hint |
| stable_id | integer | Stable ID that persists across moves |
| layout | table | Layout info for tiled windows (nil if floating) |
| active | boolean | Whether this is the currently focused window |

#### Workspace

| Property | Type | Description |
| --- | --- | --- |
| id | integer | Workspace ID |
| name | string | Workspace name |
| monitor | Monitor | The monitor it's on (nil if none) |
| windows | integer | Number of windows on the workspace |
| visible | boolean | Whether the workspace is visible |
| special | boolean | Whether this is a special workspace |
| active | boolean | Whether this is the active workspace on its monitor |
| has_urgent | boolean | Whether any window on the workspace has an urgent hint |
| fullscreen_mode | integer | Current fullscreen mode |
| has_fullscreen | boolean | Whether any window is fullscreen |
| is_persistent | boolean | Whether the workspace is persistent |

#### LayerSurface

| Property | Type | Description |
| --- | --- | --- |
| address | string | Pointer address |
| x | integer | X position |
| y | integer | Y position |
| w | integer | Width |
| h | integer | Height |
| namespace | string | Layer namespace |
| pid | integer | PID of the owning process |
| monitor | Monitor | The monitor it's on |
| mapped | boolean | Whether the surface is mapped |
| layer | integer | Layer level (0=background, 1=bottom, 2=top, 3=overlay) |
| interactivity | integer | Keyboard interactivity mode |
| above_fullscreen | boolean | Whether it renders above fullscreen windows |

#### Monitor

| Property | Type | Description |
| --- | --- | --- |
| id | integer | Monitor ID |
| name | string | Monitor name |
| description | string | Short description |
| x | integer | X position |
| y | integer | Y position |
| position | table | Position {x, y} |
| width | integer | Width in pixels |
| height | integer | Height in pixels |
| size | table | Size {width, height} |
| refresh_rate | float | Refresh rate |
| scale | float | Scale factor |
| transform | integer | Transform |
| dpms_status | boolean | DPMS (display power) status |
| vrr_active | boolean | Whether VRR is active |
| is_mirror | boolean | Whether this monitor is a mirror |
| mirrors | Monitor[] | Monitors this monitor is mirroring |
| active_workspace | Workspace | Active workspace |
| active_special_workspace | Workspace | Active special workspace (nil if none) |
| focused | boolean | Whether this is the focused monitor |

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
