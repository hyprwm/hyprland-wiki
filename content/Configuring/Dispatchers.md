---
weight: 6
title: Dispatchers
---

Please keep in mind some layout-specific dispatchers will be listed in the
layout pages (See the sidebar).

## Parameter explanation

| Param type | Description |
| --- | --- |
| window | a window. Any of the following: class regex (by default, optionally `class:`), `initialclass:` initial class regex, `title:` title regex, `initialtitle` initial title regex, `tag:` window tag regex, `pid:` the pid, `address:` the address, `activewindow` an active window, `floating` the first floating window on the current workspace, `tiled` the first tiled window on the current workspace |
| workspace | see [below]({{< relref "#workspaces" >}}). |
| direction | `l` `r` `u` `d` left right up down |
| monitor | One of: direction, ID, name, `current`, relative (e.g. `+1` or `-1`) |
| resizeparams | relative pixel delta vec2 (e.g. `10 -10`), optionally a percentage of the window size (e.g. `20 25%`) or `exact` followed by an exact vec2 (e.g. `exact 1280 720`), optionally a percentage of the screen size (e.g. `exact 50% 50%`) |
| floatvalue | a relative float delta (e.g `-0.2` or `+0.2`) or `exact` followed by a the exact float value (e.g. `exact 0.5`) |
| zheight | `top` or `bottom` |
| mod | `SUPER`, `SUPER_ALT`, etc. |
| key | `g`, `code:42`, `42` or mouse clicks (`mouse:272`) |

## List of Dispatchers

| Dispatcher | Description | Params |
| --- | --- | --- |
| exec | executes a shell command | command (supports rules, see [below]({{< relref "#executing-with-rules" >}})) |
| execr | executes a raw shell command (does not support rules) | command |
| pass | passes the key (with mods) to a specified window. Can be used as a workaround to global keybinds not working on Wayland. | window |
| sendshortcut | sends specified keys (with mods) to an optionally specified window. Can be used like pass | mod, key[, window] |
| sendkeystate | Send a key with specific state (down/repeat/up) to a specified window (window must keep focus for events to continue). | mod, key, state, window |
| killactive | closes (not kills) the active window | none |
| forcekillactive | kills the active window | none |
| closewindow | closes a specified window | window |
| killwindow | kills a specified window | window |
| signal | sends a signal to the active window | signal |
| signalwindow | sends a signal to a specified window | `window,signal`, e.g.`class:Alacritty,9` |
| workspace | changes the workspace | workspace |
| movetoworkspace | moves the focused window to a workspace | workspace OR `workspace,window` for a specific window |
| movetoworkspacesilent | same as above, but doesn't switch to the workspace | workspace OR `workspace,window` for a specific window |
| togglefloating | toggles the current window's floating state | left empty / `active` for current, or `window` for a specific window |
| setfloating | sets the current window's floating state to true | left empty / `active` for current, or `window` for a specific window |
| settiled | sets the current window's floating state to false | left empty / `active` for current, or `window` for a specific window |
| fullscreen | sets the focused window's fullscreen mode | `mode action`, where mode can be 0 - fullscreen (takes your entire screen) or 1 - maximize (keeps gaps and bar(s)), while action is optional and can be `toggle` (default), `set` or `unset`. |
| fullscreenstate | sets the focused window's fullscreen mode and the one sent to the client | `internal client action`, where internal (the hyprland window) and client (the application) can be `-1` - current, `0` - none, `1` - maximize, `2` - fullscreen, `3` - maximize and fullscreen. action is optional and can be `toggle` (default) or `set`. |
| dpms | sets all monitors' DPMS status. Do not use with a keybind directly. | `on`, `off`, or `toggle`. For specific monitor add monitor name after a space |
| forceidle | sets elapsed time for all idle timers, ignoring idle inhibitors. Timers return to normal behavior upon the next activity. Do not use with a keybind directly. | floatvalue (number of seconds) |
| pin | pins a window (i.e. show it on all workspaces) _note: floating only_ | left empty / `active` for current, or `window` for a specific window |
| movefocus | moves the focus in a direction | direction |
| movewindow | moves the active window in a direction or to a monitor. For floating windows, moves the window to the screen edge in that direction | direction or `mon:` and a monitor, optionally followed by a space and `silent` to prevent the focus from moving with the window|
| swapwindow | swaps the active window with another window in the given direction or with a specific window | direction or `window`|
| centerwindow | center the active window _note: floating only_ | none (for monitor center) or 1 (to respect monitor reserved area) |
| resizeactive | resizes the active window | resizeparams |
| moveactive | moves the active window | resizeparams |
| resizewindowpixel | resizes a selected window | `resizeparams,window`, e.g. `100 100,^(kitty)$` |
| movewindowpixel | moves a selected window | `resizeparams,window` |
| cyclenext | focuses the next window (on a workspace, if `visible` is not provided) | none (for next) or `prev` (for previous) additionally `tiled` for only tiled, `floating` for only floating. `prev tiled` is ok. `visible` for all monitors cycling. `visible prev floating` is ok. if `hist` arg provided - focus order will depends on focus history. All other modifiers is also working for it, `visible next floating hist` is ok. |
| swapnext | swaps the focused window with the next window on a workspace | none (for next) or `prev` (for previous) |
| tagwindow | apply tag to current or the first window matching | `tag [window]`, e.g. `+code ^(foot)$`, `music` |
| focuswindow | focuses the first window matching | window |
| focusmonitor | focuses a monitor | monitor |
| splitratio | changes the split ratio | floatvalue |
| movecursortocorner | moves the cursor to the corner of the active window | direction, 0 - 3, bottom left - 0, bottom right - 1, top right - 2, top left - 3 |
| movecursor | moves the cursor to a specified position | `x y` |
| renameworkspace | rename a workspace | `id name`, e.g. `2 work` |
| exit | exits the compositor with no questions asked. | none |
| forcerendererreload | forces the renderer to reload all resources and outputs | none |
| movecurrentworkspacetomonitor | Moves the active workspace to a monitor | monitor |
| focusworkspaceoncurrentmonitor | Focuses the requested workspace on the current monitor, swapping the current workspace to a different monitor if necessary. If you want XMonad/Qtile-style workspace switching, replace `workspace` in your config with this. | workspace |
| moveworkspacetomonitor | Moves a workspace to a monitor | workspace and a monitor separated by a space |
| swapactiveworkspaces | Swaps the active workspaces between two monitors | two monitors separated by a space |
| bringactivetotop | _Deprecated_ in favor of alterzorder. Brings the current window to the top of the stack | none |
| alterzorder | Modify the window stack order of the active or specified window. Note: this cannot be used to move a floating window behind a tiled one. | zheight[,window] |
| togglespecialworkspace | toggles a special workspace on/off | none (for the first) or name for named (name has to be a special workspace's name) |
| focusurgentorlast | Focuses the urgent window or the last window | none |
| togglegroup | toggles the current active window into a group | none |
| changegroupactive | switches to the next window in a group. | b - back, f - forward, or index start at 1 |
| focuscurrentorlast | Switch focus from current to previously focused window | none |
| lockgroups | Locks the groups (all groups will not accept new windows) | `lock` for locking, `unlock` for unlocking, `toggle` for toggle |
| lockactivegroup | Lock the focused group (the current group will not accept new windows or be moved to other groups) | `lock` for locking, `unlock` for unlocking, `toggle` for toggle |
| moveintogroup | Moves the active window into a group in a specified direction. No-op if there is no group in the specified direction. | direction |
| moveoutofgroup | Moves the active window out of a group. No-op if not in a group | left empty / `active` for current, or `window` for a specific window |
| movewindoworgroup | Behaves as `moveintogroup` if there is a group in the given direction. Behaves as `moveoutofgroup` if there is no group in the given direction relative to the active group. Otherwise behaves like `movewindow`. | direction |
| movegroupwindow | Swaps the active window with the next or previous in a group | `b` for back, anything else for forward |
| denywindowfromgroup | Prohibit the active window from becoming or being inserted into group | `on`, `off` or, `toggle` |
| setignoregrouplock | Temporarily enable or disable binds:ignore_group_lock | `on`, `off`, or `toggle` |
| global | Executes a Global Shortcut using the GlobalShortcuts portal. See [here](../Binds/#global-keybinds) | name |
| submap | Change the current mapping group. See [Submaps](../Binds/#submaps) | `reset` or name |
| event | Emits a custom event to socket2 in the form of `custom>>yourdata` | the data to send |
| setprop | Sets a window property | `window property value` |
| toggleswallow | If a window is swallowed by the focused window, unswallows it. Execute again to swallow it back | none |

> [!WARNING]
> [uwsm](../../Useful-Utilities/Systemd-start) users should avoid using `exit` dispatcher, or terminating Hyprland process directly, as exiting Hyprland this way removes it from under its clients and interferes with ordered shutdown sequence. Use `exec, uwsm stop` (or [other variants](https://github.com/Vladimir-csp/uwsm#how-to-stop)) which will gracefully bring down graphical session (and login session bound to it, if any). If you experience problems with units entering inconsistent states, affecting subsequent sessions, use `exec, loginctl terminate-user ""` instead (terminates all units of the user).
> 
> It's also strongly advised to replace the `exit` dispatcher inside `hyprland.conf` keybinds section accordingly.

> [!WARNING]
> It is NOT recommended to set DPMS or forceidle with a keybind directly, as it
> might cause undefined behavior. Instead, consider something like
> 
> ```ini
> bind = MOD, KEY, exec, sleep 1 && hyprctl dispatch dpms off
> ```

### Grouped (tabbed) windows

Hyprland allows you to make a group from the current active window with the
`togglegroup` bind dispatcher.

A group is like i3wm’s “tabbed” container. It takes the space of one window, and
you can change the window to the next one in the tabbed “group” with the
`changegroupactive` bind dispatcher.

The new group’s border colors are configurable with the appropriate `col.`
settings in the `group` config section.

You can lock a group with the `lockactivegroup` dispatcher in order to stop new
windows from entering this group. In addition, the `lockgroups` dispatcher can be
used to toggle an independent global group lock that will prevent new windows
from entering any groups, regardless of their local group lock stat.

You can prevent a window from being added to a group or becoming a group with the
`denywindowfromgroup` dispatcher. `movewindoworgroup` will behave like
`movewindow` if the current active window or window in direction has this property
set.

## Workspaces

You have nine choices:

- ID: e.g. `1`, `2`, or `3`

- Relative ID: e.g. `+1`, `-3` or `+100`

- workspace on monitor, relative with `+` or `-`, absolute with `~`: e.g. `m+1`,
  `m-2` or `m~3`

- workspace on monitor including empty workspaces, relative with `+` or `-`,
  absolute with `~`: e.g. `r+1` or `r~3`

- open workspace, relative with `+` or `-`, absolute with `~`: e.g. `e+1`,
  `e-10`, or `e~2`

- Name: e.g. `name:Web`, `name:Anime` or `name:Better anime`

- Previous workspace: `previous`, or `previous_per_monitor`

- First available empty workspace: `empty`, suffix with `m` to only search
  on monitor. and/or `n` to make it the _next_ available empty workspace. e.g.
  `emptynm`

- Special Workspace: `special` or `special:name` for named special workspaces.

> [!WARNING]
> `special` is supported ONLY on `movetoworkspace` and `movetoworkspacesilent`.  
> Any other dispatcher will result in undocumented behavior.

> [!WARNING]
> Numerical workspaces (e.g. `1`, `2`, `13371337`) are allowed **ONLY** between 1
> and 2147483647 (inclusive).  
> Neither `0` nor negative numbers are allowed.

## Special Workspace

A special workspace is what is called a "scratchpad" in some other places. A
workspace that you can toggle on/off on any monitor.

> [!NOTE]
> You can define multiple named special workspaces, but the amount of those is
> limited to 97 at a time.

For example, to move a window/application to a special workspace you can use the
following syntax:

```ini
bind = SUPER, C, movetoworkspace, special
#The above syntax will move the window to a special workspace upon pressing 'SUPER'+'C'.
#To see the hidden window you can use the togglespecialworkspace dispatcher mentioned above.
```

## Executing with rules

The `exec` dispatcher supports adding rules. Please note some windows might work
better, some worse. It records the PID of the spawned process and uses that.
For example, if your process forks and then the fork opens a window, this will
not work.

The syntax is:

```ini
bind = mod, key, exec, [rules...] command
```

For example:

```ini
bind = SUPER, E, exec, [workspace 2 silent; float; move 0 0] kitty
```

### setprop

Prop List:

| prop | comment |
| --- | --- |
| alpha | float 0.0 - 1.0 |
| alphaoverride | 0/1, makes the next setting be override instead of multiply |
| alphainactive | float 0.0 - 1.0 |
| alphainactiveoverride | 0/1, makes the next setting be override instead of multiply |
| alphafullscreen | float 0.0 - 1.0 |
| alphafullscreenoverride | 0/1, makes the next setting be override instead of multiply |
| animationstyle | string, cannot be locked |
| activebordercolor | gradient, -1 means not set |
| inactivebordercolor | gradient, -1 means not set |
| maxsize | vec2 (`x y`) |
| minsize | vec2 (`x y`) |

Additional properties can be found in the [Window Rules](../Window-Rules#dynamic-rules) section.

For example:

```sh
address:0x13371337 noanim 1
address:0x13371337 nomaxsize 0
address:0x13371337 opaque toggle
address:0x13371337 immediate unset
address:0x13371337 bordersize relative -2
address:0x13371337 roundingpower relative 0.1
```

### Fullscreenstate

`fullscreenstate internal client`

The `fullscreenstate` dispatcher decouples the state that Hyprland maintains for a window from the fullscreen state that is communicated to the client.  

`internal` is a reference to the state maintained by Hyprland.

`client` is a reference to the state that the application receives.

| Value | State | Description |
| --- | --- | --- |
| -1 | Current | Maintains the current fullscreen state. |
| 0 | None | Window allocates the space defined by the current layout. |
| 1 | Maximize | Window takes up the entire working space, keeping the margins. |
| 2 | Fullscreen | Window takes up the entire screen. |
| 3 | Maximize and Fullscreen | The state of a fullscreened maximized window. Works the same as fullscreen. |

For example:

`fullscreenstate 2 0` Fullscreens the application and keeps the client in non-fullscreen mode.  

This can be used to prevent Chromium-based browsers from going into presentation mode when they detect they have been fullscreened.  

`fullscreenstate 0 2` Keeps the window non-fullscreen, but the client goes into fullscreen mode within the window.
