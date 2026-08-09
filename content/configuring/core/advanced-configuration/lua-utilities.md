---
weight: 10
title: Lua utilities
---

## Lua utilities

Hyprland exposes a bunch of lua utilities for you to script your desktop
with custom functionality and more.

### Convenience functions

Hyprland exposes a bunch of convenience functions:
 - `hl.get_config()`
 - `hl.get_active_window()`
 - `hl.get_windows()`
 - `hl.get_window(selector)`
 - `hl.get_urgent_window()`
 - `hl.get_workspaces()`
 - `hl.get_workspace(selector)`
 - `hl.get_active_workspace()`
 - `hl.get_active_special_workspace()`
 - `hl.get_monitors({ all? })`
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
 - `hl.version()`
 - `hl.exec_cmd()`
 - `hl.exec_scheduled_prop_refresh_immediately()`
 - `hl.get_loaded_plugins()`
 - `hl.is_key_down(key = num|str)`


Use the LSP for the return values (classes and their parameters) of these functions. See [here](../../../core#autocompletions) for setting up the LSP for your code editor

### hl.exec_cmd function

`hl.exec_cmd()` will spawn an asynchronous process, so there is no need for `& disown` at the end.

### Dynamically changing a config option:

You can use `hl.get_config()` to get the current value of a config option. Pass a config option like `"general.layout"`.

Pay attention that the return type of `hl.get_config()` will be a representation of the actual underlying type.

For example: If your `general.gaps_in` is set as `gaps_in = 3` in `hl.config()`, `hl.get_config()` returns a table of the form:
```lua
{
  top = 3,
  left = 3,
  right = 3,
  bottom = 3
}
```
because `gaps_in` also accepts a table of the form `{ top?, left?, right?, bottom? }`


You can change the value of a config option with a keybind with a script like:
```lua
-- Toggle gaps_in between 0 and 3 (equivalent to  {3, 3, 3, 3} )
hl.bind(mainMod .. " + SHIFT + G", function()

    local gapsInValueTable = hl.get_config("general.gaps_in")

    if gapsInValueTable.top == 3 then
        hl.config({
            general = {gaps_in = 0}
        })
    else
        hl.config({
            general = {gaps_in = 3}
        })
    end
end)
```

### Prop Refresh

A prop refresh is an event where Hyprland updates/refreshes many of its configurable options (e.g. keyboard layouts, device configurations, monitor states, window gaps, etc...).

Events such as the creation of a workspace rule cause a prop refresh event to be scheduled after the current event.

Hyprland schedules a **single** prop refresh event to be executed at the end of the current event (e.g. a Lua function) in order to avoid redundant prop refreshes.


<br>

In practice, this means that when you create a new workspace rule that removes `gaps_in` from the current workspace, the value for `gaps_in` is only changed at the end of your Lua function, and subsequent lines of code within your Lua function after setting the workspace rule don't use the updated value; only after the end of your Lua function does the `gaps_in` value of your current workspace get updated to reflect the new workspace rule.

This might cause problems if you expect the `gaps_in` value of your workspace to be immediately updated after the workspace rule is created.

<br>

To execute a scheduled prop refresh immediately, use `hl.exec_scheduled_prop_refresh_immediately()`.

Note that because the scheduled event is executed prematurely, it is removed from the event loop; allowing another prop refresh to be enqueued. Overuse of this function may cause slowdowns.

### Timers

You can spawn and manage timers via `hl.timer()`:

```lua
local demoTimer = hl.timer(function()
  print("hello from timer")
end, { timeout = 1000, type = "repeat" })

demoTimer:set_enabled(false)

hl.bind("SUPER + X", function()
  -- toggle the timer
  demoTimer:set_enabled(not demoTimer:is_enabled())
end)
```

### Combining it all

You can expand functionality e.g. like so:

```lua
-- bind to toggle floating, unless the window is htop,
-- then only set floating

hl.bind("SUPER + X", function()
  local w = hl.get_active_window()
  if w ~= nil and w.title == "htop" do
    hl.dispatch(hl.dsp.window.float({ action = "set" }))
  else
    hl.dispatch(hl.dsp.window.float({ action = "toggle" }))
  end
end)
```

## Sockets (IPC)

It's recommended to use Lua in most cases. Lua is faster, less error-prone,
has more features, and is generally more integrated.

However, if you want to use IPC instead, check the [IPC](../../../../ipc) page.
