# HL.API

#### *class* HL.API

Root Hyprland Lua API object.

The global variable `hl` is an instance of `HL.API`. Public functions
exposed on `HL.API` are documented under the names users call in config
files, such as [`hl.monitor()`](../monitor#hlmonitor), [`hl.bind()`](../bind#hlbind), and [`hl.config()`](../config#hlconfig).

```lua
hl.monitor({
    output = "DP-1",
    mode = "2560x1440@60",
    position = "0x0",
    scale = 1,
})
```

## Configuration

* [`hl.config()`](../config#hlconfig)
* [`hl.device()`](../device#hldevice)
* [`hl.gesture()`](../gesture#hlgesture)
* [`hl.layer_rule()`](../layer_rule#hllayer_rule)
* [`hl.monitor()`](../monitor#hlmonitor)
* [`hl.permission()`](../permission#hlpermission)
* [`hl.window_rule()`](../window_rule#hlwindow_rule)
* [`hl.workspace_rule()`](../workspace_rule#hlworkspace_rule)
* [`hl.animation()`](../animation#hlanimation)
* [`hl.curve()`](../curve#hlcurve)

## Keybinds and dispatch

* [`hl.bind()`](../bind#hlbind)
* [`hl.dispatch()`](../dispatch#hldispatch)
* [`hl.unbind()`](../unbind#hlunbind)
* [`HL.DspNamespace`](../dsp/HL.DspNamespace#hldspnamespace)

## Queries

* [`hl.get_active_monitor()`](../get_active_monitor#hlget_active_monitor)
* [`hl.get_active_special_workspace()`](../get_active_special_workspace#hlget_active_special_workspace)
* [`hl.get_active_window()`](../get_active_window#hlget_active_window)
* [`hl.get_active_workspace()`](../get_active_workspace#hlget_active_workspace)
* [`hl.get_config()`](../get_config#hlget_config)
* [`hl.get_current_submap()`](../get_current_submap#hlget_current_submap)
* [`hl.get_cursor_pos()`](../get_cursor_pos#hlget_cursor_pos)
* [`hl.get_last_window()`](../get_last_window#hlget_last_window)
* [`hl.get_last_workspace()`](../get_last_workspace#hlget_last_workspace)
* [`hl.get_layers()`](../get_layers#hlget_layers)
* [`hl.get_monitor()`](../get_monitor#hlget_monitor)
* [`hl.get_monitor_at()`](../get_monitor_at#hlget_monitor_at)
* [`hl.get_monitor_at_cursor()`](../get_monitor_at_cursor#hlget_monitor_at_cursor)
* [`hl.get_monitors()`](../get_monitors#hlget_monitors)
* [`hl.get_urgent_window()`](../get_urgent_window#hlget_urgent_window)
* [`hl.get_window()`](../get_window#hlget_window)
* [`hl.get_windows()`](../get_windows#hlget_windows)
* [`hl.get_workspace()`](../get_workspace#hlget_workspace)
* [`hl.get_workspace_windows()`](../get_workspace_windows#hlget_workspace_windows)
* [`hl.get_workspaces()`](../get_workspaces#hlget_workspaces)

## Events and runtime

* [`hl.define_submap()`](../define_submap#hldefine_submap)
* [`hl.env()`](../env#hlenv)
* [`hl.exec_cmd()`](../exec_cmd#hlexec_cmd)
* [`hl.on()`](../on#hlon)
* [`hl.timer()`](../timer#hltimer)
* [`hl.version()`](../version#hlversion)

## Namespaces

* [`HL.LayoutNamespace`](../layout/HL.LayoutNamespace#hllayoutnamespace)
* [`HL.NotificationNamespace`](../notification/HL.NotificationNamespace#hlnotificationnamespace)
* [`HL.PluginNamespace`](../plugin/HL.PluginNamespace#hlpluginnamespace)

## See also

[`HL.MonitorSpec`](../../types/HL.MonitorSpec#hlmonitorspec)
: Example input schema type used by [`hl.monitor()`](../monitor#hlmonitor).

[`HL.Monitor`](../../objects/HL.Monitor#hlmonitor)
: Example runtime object returned by monitor query functions.
