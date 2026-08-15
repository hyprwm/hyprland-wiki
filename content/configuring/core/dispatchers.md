---
weight: 40
title: Dispatchers
---

## Dispatchers

Dispatchers return tables that describe an action you want to make. They do not invoke any action immediately, and their
contents are not guaranteed to be stable at all. Their purpose is to be fed into `hl.bind()` or `hl.dispatch()`.

Please keep in mind some layout-specific dispatchers will be listed in the
layout pages (See the sidebar).

To use a dispatcher (any of `hl.dsp.*`) inside a function, you need to wrap it in `hl.dispatch()` for it to be executed properly. 

{{% details title="Examples" closed="true" %}}

```lua
hl.bind("ALT + Tab", function()
    hl.dispatch(hl.dsp.window.cycle_next())
    hl.dispatch(hl.dsp.window.bring_to_top())
end)
```

```lua
hl.bind("ALT + Tab", function()
    hl.dsp.window.cycle_next()
    hl.dsp.window.bring_to_top()
end)
```

First code snippet will execute dispatchers, but second wont because `hl.bind` calls the `function()`, but function() never calls `hl.dsp`'s

To put is simply:
hl.dsp is a factory, hl.dispatch is a truck that delivers products from factory to client. Unless you call the driver, it wont deliver anything. hl.bind calls the function(), but function() never calls the driver, so it doesnt deliver anything.  

On the other hand, [hl.exec_cmd](../advanced-configuration/lua-utilities#hlexec_cmd-function) is a postman. Never gets or answers any calls, just goes straight to the address on the letter.

{{% /details %}}


<!-- TODO make a styling note: (to) where? what (action)? how? -->

### Parameter explanation

| Param type | Description  |
| --- | --- |
| `window` | [Window selector](../../../naming-conventions#window-selector) |
| `action` | If not set, defaults to `toggle`. Can be: `toggle`, `enable`/`on`, `disable`/`off` |
| `relative` | If not set, defaults to `false`. Can be: `false`, `true` |

## Dispatchers

### General

`hl.dsp.` contains:

| method | description |
| --- | --- |
| `exec_cmd( cmd, { rules }? )` | Execute a command. Rules can be a table of window rule effects to apply (see [below](#executing-with-rules)). |
| `exec_raw( cmd )` | Execute a raw command. While `exec_cmd` will do `sh -c`, this won't. |
| `focus({ direction })` | Move the focus in a direction |
| `focus({ monitor })` | Move the focus to a monitor |
| `focus({ workspace, on_current_monitor? })` | Move the focus to a workspace |
| `focus({ window })` | Move the focus to a window |
| `focus({ urgent_or_last })` | Move the focus to an urgent, or last window |
| `focus({ last })` | Move the focus to the last window |
| `exit()` | Quit Hyprland. It's recommended to use `hyprshutdown` instead of this. |
| `submap( name )` | Move to a submap |
| `pass({ window? })` | Pass the shortcut to a window |
| `send_shortcut({ window?, mods, key })` | Send a specific shortcut to a window |
| `send_key_state({ window?, mods, key, state })` | Same as send_shortcut, but `state` can be controlled with: `"down"`/`"up"` |
| `layout( message )` | Send a layout message as a string |
| `dpms({ monitor?, action? })` | Toggle monitors on/off (not physically, as in idle-screensaver.) |
| `event( string )` | Send an event to socket2. |
| `global( string )` | Activate a D-Bus global shortcut. See [Global shortcuts](../binds/globals) |
| `force_idle( int )` | Sets elapsed time for all idle timers in seconds, ignoring idle inhibitors. Timers return to normal behavior upon the next activity. Do not use with a keybind directly. |
| `no_op()` | Does nothing. Useful for conditional binds. |
| `force_renderer_reload()` | Force reloads the renderer on all monitors. |
| `release_input_capture()` | Releases any active input capture session. |

### Window

`hl.dsp.window.` contains:

| method | description |
| --- | --- |
| `close({ window? })` | Send a graceful request to close the window. |
| `kill({ window? })` | Kill the process owning the window with a `SIGKILL`. |
| `signal({ window?, signal })` | Send a POSIX signal to the process owning the window. |
| `float({ window?, action? })` | Set a window's floating state. |
| `fullscreen({ window?, action?, mode?, layout_aware? })` | Set a window's fullscreen state. `mode` can be "maximized" and "fullscreen". `action` can be `toggle`/`set`/`unset`. `layout_aware` takes `true`(default)/`false`, allows you to choose if you want to use layout or default handled FS behaviour. |
| `fullscreen_state({ window?, action?, internal, client, layout_aware? })` | Set a window's fullscreen state with more precision. `action` can be `toggle`/`set`/`unset`. `layout_aware` takes `true`(default)/`false`, allows you to choose if you want to use layout or default handled FS behaviour.  See [Fullscreenstate](#fullscreenstate), [Fullscreen Handlers](#fullscreen-handlers) |
| `pseudo({ window?, action? })` | Set a window's pseudotiling state. |
| `move({ window?, direction, group_aware? })` | Move a window in a direction. `group_aware = true` will put windows in/out of groups alongside the given direction. |
| `move({ window?, workspace, follow? })` | Move a window to a workspace |
| `move({ window?, monitor, follow? })` | Move a window to a monitor |
| `move({ window?, x, y, relative? })` | Move a window by / to a coord |
| `move({ window?, into_group = direction })` | Move a window into a group in a direction |
| `move({ window?, into_or_create_group = direction })` | Move a window into a group in a direction, or create a group if no group exists in that direction |
| `move({ window?, out_of_group })` | Move a window out of a group. `true` for directionless, direction for a direction |
| `swap({ direction })` | Swap the current window with another one in a given direction | 
| `swap({ target })` | Swap the current window with another one | 
| `swap({ next })` | Swap the current window with the next one | 
| `swap({ prev })` | Swap the current window with the previous one | 
| `center({ window? })` | Center the current window on screen |
| `cycle_next({ window?, next?, tiled?, floating? })` | Focus the next window |
| `tag({ window?, tag })` | Tag a window |
| `clear_tags({ window? })` | Clear all tags from a window |
| `toggle_swallow()` | Toggle all swallowed windows visible |
| `pin({ window?, action? })` | Pin a window |
| `alter_zorder({ window?, mode })` | Mode can be "top" or "bottom" |
| `set_prop({ window?, prop, value })` | Set a window property |
| `deny_from_group({ action? })` | Deny a window from entering a group |
| `drag()` | Begin an interactive drag. To be used with mouse binds. |
| `resize({ keep_aspect_ratio? })` | begin an interactive resize. To be used with mouse binds. Overrides window's `keep_aspect_ratio` prop. |
| `resize({ window?, x, y, relative? })` | Resize a window |

### Workspace

`hl.dsp.workspace.` contains:

| method | description |
| --- | --- |
| `change_id({ workspace, id })` | change a workspace's ID. Cannot be an ID already in use. Must be > 0. |
| `rename({ workspace, name? })` | Rename a workspace |
| `move({ workspace?, monitor })` | Move a workspace to a monitor |
| `swap_monitors({ monitor1, monitor2 })` | Swap current workspaces of two monitors |
| `toggle_special( special_name )` | Toggle a special workspace by name |

### Group

`hl.dsp.group.` contains:

| method | description |
| --- | --- |
| `toggle({ window? })` | Toggle a group |
| `next({ window? })` | Switch to the next window in a group | 
| `prev({ window? })` | Switch to the previous window in a group | 
| `active({ window?, index })` | Switch to a window in a group, indexed | 
| `move_window({ window?, forward? })` | Move a window in the group order | 
| `lock({ window?, action? })` | Lock a group | 
| `lock_active({ action? })` | Lock the active group | 

### Cursor

`hl.dsp.cursor.` contains:

| method | description |
| --- | --- |
| `move_to_corner({ window?, corner = int })` | Move the cursor to a given corner of the window. Corner is [0 - 3] |
| `move({ x, y })` | Move the cursor to a given coordinate |


> [!WARNING]
> It is NOT recommended to set DPMS or forceidle with a keybind directly, as it
> might cause undefined behavior. Instead, consider something like
> 
> ```lua
> hl.bind("...", function()
>     hl.timer(function()
>         hl.dispatch(hl.dsp.dpms({ action = "disable" }))
>     end, {timeout = 500, type = "oneshot"})
> end)
> ```

### Grouped (tabbed) windows

Hyprland allows you to make a group from the current active window with the
`hl.dsp.group.toggle()` bind dispatcher.

A group is like i3wm’s “tabbed” container. It takes the space of one window, and
you can toggle the windows within it.

You can lock a group with the `lock` dispatcher in order to stop new
windows from entering this group.

You can prevent a window from being added to a group or becoming a group with the
`window.deny_from_group` dispatcher.

## Special Workspace

> [!NOTE]
> You can define multiple named special workspaces, but the amount of those is
> limited to 97 at a time.

A special workspace is what is called a "scratchpad" in some other places. A
workspace that you can toggle on/off on any monitor.

For example, to move a window to a named special workspace you can use the following syntax:

```lua
hl.bind("SUPER + C", hl.dsp.window.move({ workspace = "special:magic" }))
-- To see the hidden window and workspace you can use: 
hl.bind("SUPER + S", hl.dsp.workspace.toggle_special("magic"))
```

## Executing with rules 

The `exec_cmd` dispatcher supports adding rules. Please note some windows might work better, some worse. It records the PID of the spawned process and uses that. For example, if your process forks and then the fork opens a window, this will not work.

{{% details title="Example" closed="true" %}}

```lua
hl.bind("SUPER + E", hl.dsp.exec_cmd("kitty", { float = true, move = {0, 0} }))
```

{{% /details %}}

## set_prop

Props are any of the _dynamic effects_ of [Window Rules](../rules/window-rules#dynamic-effects).

For example:

```lua
{ prop = "no_anim", value = "1" }
{ prop = "no_anim", value = "1", window = "class:abc" }
```

Some props are expanded from their window rule parents which take multiple arguments:
- `border_color` -> `active_border_color`, `inactive_border_color`
- `opacity` -> `opacity`, `opacity_inactive`, `opacity_fullscreen`, `opacity_override`, `opacity_inactive_override`, `opacity_fullscreen_override`

## Fullscreenstate

The `fullscreen_state` dispatcher decouples the state that Hyprland maintains for a window from the fullscreen state that is communicated to the client.  

`internal` is a reference to the state maintained by Hyprland.

`client` is a reference to the state that the application receives.

| Value | State | Description |
| --- | --- | --- |
| -1 | Current | Maintains the current fullscreen state. |
| 0 | None | Window allocates the space defined by the current layout. |
| 1 | Maximized | Window takes up the entire working space, keeping the margins. |
| 2 | Fullscreen | Window takes up the entire screen. |

For example:

`{internal = 2, client = 0}` Fullscreens the application and keeps the client in non-fullscreen mode.  

This can be used to prevent Chromium-based browsers from going into presentation mode when they detect they have been fullscreened.  

`{internal = 0, client = 2}` Keeps the window non-fullscreen, but the client goes into fullscreen mode within the window.

### `FSMODE_MAX`

This is not a user accessible mode, but a state that occurs when a client requests `Fullscreen` when the internal mode of that window is `Maximized`.

When this happens, the next request to un-FS the window will cause the window to become `Maximized` instead.

Practical example of this is when you Fullscreen a video you're watching on a Maximized window.

### Fullscreen Handlers

Some layouts, like scrolling, allow optional FS handling other than the default.

You can use both Layout Handled and Default Handled fullscreens in these layouts using the `layout_aware` option in fullscreen dispatchers.

To see which Fullscreen Handler a given window is using, use Lua or hyprctl.  <!-- TODO: this should also state HOW to use Lua and hyprctl, not just that you can use it. -->
