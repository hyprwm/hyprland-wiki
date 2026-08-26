---
weight: 40
title: Dispatchers
---

## Dispatchers

Dispatchers return tables that describe an action you want to make.
**They do not invoke any action immediately, and their contents are not guaranteed to be stable at all.**
Their purpose is to be fed into `hl.bind()` or `hl.dispatch()`.

Please keep in mind that some layout-specific dispatchers will be listed in the layout pages (see the sidebar).

To use a dispatcher (any of `hl.dsp.*`) inside a function, you need to wrap it in `hl.dispatch()` for it to be executed.
**Simply writing `hl.dsp.whatever()` on its own will do nothing.**

{{% details title="Examples" closed="true" %}}

In the first snippet, the `function()` actually triggers the actions by calling `hl.dispatch()`.

```lua
hl.bind("ALT + Tab", function()
    hl.dispatch(hl.dsp.window.cycle_next())
    hl.dispatch(hl.dsp.window.bring_to_top())
end)
```

In the second snippet, dispatchers are created, but never passed to `hl.dispatch`.
Since nothing executes them, they do nothing.

```lua
hl.bind("ALT + Tab", function()
    hl.dsp.window.cycle_next()
    hl.dsp.window.bring_to_top()
end)
```

{{% /details %}}

### Parameter explanation

| Param type | Description |
| --- | --- |
| `window` | If not set, defaults to `"activewindow"`. Can be one of [window selectors](../../../naming-conventions#window-selector) |
| `action` | If not set, defaults to `"toggle"`. Can be: `"toggle"`, `"enable"`/`"on"`, `"disable"`/`"off"` |
| `relative` | If not set, defaults to `"false"`. Can be: `"false"`, `"true"` |

## Dispatchers

<!-- NOTE: please, before adding a new dispatcher, consult the wiki guidelines page -->

### General

`hl.dsp.` contains:

| Method | Description |
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
| `dpms({ monitor?, action? })` | Toggle monitors on/off (not physically, as in idle-screensaver). Do not use with a keybind directly! |
| `event( string )` | Send an event to socket2. |
| `global( string )` | Activate a D-Bus global shortcut. See [Global shortcuts](../binds/globals) |
| `force_idle( int )` | Sets elapsed time for all idle timers in seconds, ignoring idle inhibitors. Timers return to normal behavior upon the next activity. Do not use with a keybind directly. |
| `no_op()` | Does nothing. Useful for conditional binds. |
| `force_renderer_reload()` | Force reloads the renderer on all monitors. |
| `release_input_capture()` | Releases any active input capture session. |

> [!WARNING]
> It is NOT recommended to set DPMS or force_idle with a keybind directly, as it might cause undefined behavior.
> Instead, consider something like:
> ```lua
> hl.bind("...", function()
>     hl.timer(function()
>         hl.dispatch(hl.dsp.dpms({ action = "disable" }))
>     end, {timeout = 500, type = "oneshot"})
> end)
> ```

### Window

`hl.dsp.window.` contains:

| Method | Description |
| --- | --- |
| `close({ window? })` | Send a graceful request to close the window. |
| `kill({ window? })` | Kill the process owning the window with a `SIGKILL`. |
| `signal({ window?, signal })` | Send a POSIX signal to the process owning the window. |
| `float({ window?, action? })` | Set a window's floating state. |
| `fullscreen({ window?, action?, mode?, layout_aware? })` | Set a window's fullscreen state. `mode` can be "maximized" and "fullscreen". `action` can be `toggle`/`set`/`unset`. `layout_aware` takes `true`(default)/`false`, allows you to choose if you want to use layout- or default-handled fullscreen behavior. |
| `fullscreen_state({ window?, action?, internal, client, layout_aware? })` | Set a window's fullscreen state with more precision. `action` can be `toggle`/`set`/`unset`. `layout_aware` takes `true`(default)/`false`, allows you to choose if you want to use layout- or default-handled fullscreen behavior. See [fullscreen_state](#fullscreen_state), [fullscreen handlers](#fullscreen-handlers) |
| `pseudo({ window?, action? })` | Set a window's pseudotiling state. |
| `move({ window?, direction, group_aware? })` | Move a window in a direction. `group_aware = true` will put windows in/out of groups alongside the given direction. |
| `move({ window?, workspace, follow? })` | Move a window to a workspace |
| `move({ window?, monitor, follow? })` | Move a window to a monitor |
| `move({ window?, x, y, relative? })` | Move a window by (`relative = true`) or to (`relative = false`) a coord |
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

| Method | Description |
| --- | --- |
| `change_id({ workspace, id })` | change a workspace's ID. Cannot be an ID already in use. Must be > 0. |
| `rename({ workspace, name? })` | Rename a workspace |
| `move({ workspace?, monitor })` | Move a workspace to a monitor |
| `swap_monitors({ monitor1, monitor2 })` | Swap current workspaces of two monitors |
| `toggle_special( special_name )` | Toggle a special workspace by name |

### Group

`hl.dsp.group.` contains:

| Method | Description |
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

| Method | Description |
| --- | --- |
| `move_to_corner({ window?, corner = int })` | Move the cursor to a given corner of the window. Corner is [0 - 3] |
| `move({ x, y })` | Move the cursor to a given coordinate |

### Grouped (tabbed) windows

Hyprland allows you to make a group from the current active window with the `hl.dsp.group.toggle()` bind dispatcher.

A group is like i3wm’s "tabbed" container.
It takes the space of one window, and you can toggle the windows within it.

You can lock a group with the `lock` dispatcher in order to stop new windows from entering this group.

You can prevent a window from being added to a group or becoming a group with the `window.deny_from_group` dispatcher.

## Special workspaces

> [!NOTE]
> You can define multiple named special workspaces, but only up to 97 may exist at one time.

A special workspace is what is called a "scratchpad" in some other places.
It is a workspace that you can toggle on/off on any monitor.

For example, to move a window to a named special workspace you can use the following syntax:

```lua
hl.bind("SUPER + SHIFT + S", hl.dsp.window.move({ workspace = "special:magic" }))
-- Show/hide the workspace, and any windows on it:
hl.bind("SUPER + S", hl.dsp.workspace.toggle_special("magic"))
```

> [!NOTE]
> Dispatchers that only handle special workspaces, such as `hl.dsp.workspace.toggle_special()`, accept a name and apply the `special:` prefix themselves.
> Dispatchers that accept *any* workspace must be given the `special:` prefix in order to target the correct special workspace.
> The example above illustrates this.

## Executing with rules

The `exec_cmd` dispatcher supports adding rules.
Please note some windows might work better, some worse.
It records the PID of the spawned process and uses that.
For example, if your process forks and then the fork opens a window, this will not work.

{{% details title="Example" closed="true" %}}

```lua
hl.bind("SUPER + E", hl.dsp.exec_cmd("kitty", { float = true, move = {0, 0} }))
```

{{% /details %}}

## set_prop

Props are any of the _dynamic effects_ of [Window Rules](../rules/window-rules#dynamic-effects).

For example:
```lua
hl.dsp.window.set_prop({ prop = "no_anim", value = "1" })
hl.dsp.window.set_prop({ prop = "no_anim", value = "1", window = "class:abc" })
```

Some props are set according to applied window-rule values:
- `border_color`: set from `active_border_color`, `inactive_border_color`
- `opacity`: set from `opacity`, `opacity_inactive`, `opacity_fullscreen`, `opacity_override`, `opacity_inactive_override`, `opacity_fullscreen_override`

## fullscreen_state

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
- `{internal = 2, client = 0}` fullscreens the application but pretends to the client that it is still in non-fullscreen mode.
  This can be useful to prevent Chromium-based browsers from going into presentation mode when they detect they have been fullscreened.
- `{internal = 0, client = 2}` keeps the window non-fullscreen, but pretends to the client that is is now in fullscreen mode.

### Restore client maximized state

This is not a user accessible mode, but a state that occurs when a client requests fullscreen when the internal mode of that window is maximized.

When this happens, the next request to un-fullscreen the window will cause the window to become maximized instead.
A practical example of this is when you fullscreen a video you're watching on a maximized window.

### Fullscreen Handlers

Some layouts, like scrolling, provide their own fullscreen handling that overrides the default.

You can use both layout-handled and default-handled fullscreen modes in these layouts, via the `layout_aware` option in fullscreen dispatchers.

Lua code can see which fullscreen handler a given window is using.
For example:
```lua
local win = hl.get_active_window()
if win.fullscreen_handler == "default" then
    -- do stuff
end
```
