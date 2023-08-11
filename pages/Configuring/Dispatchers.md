# Table of contents

{{< toc >}}

Please keep in mind some layout-specific dispatchers will be listed in the
layout pages (See the sidebar).

# Parameter explanation

| Param type | Description |
| ---------- | ----------- |
| window | a window. Any of the following: Class regex, `title:` and a title regex, `pid:` and the pid, `address:` and the address |
| workspace | see below. |
| direction | `l` `r` `u` `d` left right up down |
| monitor | One of: direction, ID, name, `current`, relative (e.g. `+1` or `-1`) |
| resizeparams | Pixel delta vec2 (e.g. `10 -10`) or `exact` followed by exact vec2 (e.g. `exact 1280 720`) |
| floatvalue | a relative float delta (e.g `-0.2` or `+0.2`) or `exact` followed by a the exact float value (e.g. `exact 0.5`) |
| workspaceopt | see below. |

# List of Dispatchers

| Dispatcher | Description | Params |
| ---------- | ----------- | ------ |
| exec | executes a shell command | command (supports rules, see below) |
| execr | executes a raw shell command (will not append any additional envvars like `exec` does, does not support rules) | command |
| pass | passes the key (with mods) to a specified window. Can be used as a workaround to global keybinds not working on Wayland. | window |
| killactive | closes (not kills) the active window | none |
| closewindow | closes a specified window | window |
| workspace | changes the workspace | workspace |
| movetoworkspace | moves the focused window to a workspace | workspace OR `workspace,window` for a specific window |
| movetoworkspacesilent | same as above, but doesnt switch to the workspace | workspace OR `workspace,window` for a specific window |
| togglefloating | toggles the current window's floating state | left empty / `active` for current, or `window` for a specific window |
| fullscreen | toggles the focused window's fullscreen state | 0 - fullscreen (takes your entire screen), 1 - maximize (keeps gaps and bar(s)) |
| fakefullscreen | toggles the focused window's internal fullscreen state without altering the geometry | none |
| dpms | sets all monitors' DPMS status. Do not use with a keybind directly. | `on`, `off`, or `toggle`. For specific monitor add monitor name after a space |
| pin | pins a window (i.e. show it on all workspaces) *note: floating only* | left empty / `active` for current, or `window` for a specific window |
| movefocus | moves the focus in a direction | direction |
| movewindow | moves the active window in a direction or to a monitor | direction or `mon:` and a monitor |
| swapwindow | swaps the active window with another window in the given direction | direction |
| centerwindow | center the active window *note: floating only* | none (for monitor center) or 1 (to respect monitor reserved area) |
| resizeactive | resizes the active window | resizeparams |
| moveactive | moves the active window | resizeparams |
| resizewindowpixel | resizes a selected window | `resizeparams,window`, e.g. `100 100,^(kitty)$` |
| movewindowpixel | moves a selected window | `resizeparams,window` |
| cyclenext | focuses the next window on a workspace | none (for next) or `prev` (for previous) |
| swapnext | swaps the focused window with the next window on a workspace | none (for next) or `prev` (for previous) |
| focuswindow | focuses the first window matching | window |
| focusmonitor | focuses a monitor | monitor |
| splitratio | changes the split ratio | floatvalue |
| toggleopaque | toggles the current window to always be opaque. Will override the `opaque` window rules. | none |
| movecursortocorner | moves the cursor to the corner of the active window | direction, 0 - 3, bottom left - 0, bottom right - 1, top right - 2, top left - 3 |
| movecursor | moves the cursor to a specified position | `x,y` |
| workspaceopt | toggles a workspace option for the active workspace. | workspaceopt |
| renameworkspace | rename a workspace | `id name`, e.g. `2 work` |
| exit | exits the compositor with no questions asked. | none |
| forcerendererreload | forces the renderer to reload all resources and outputs | none |
| movecurrentworkspacetomonitor | Moves the active workspace to a monitor | monitor |
| moveworkspacetomonitor | Moves a workspace to a monitor | workspace and a monitor separated by a space |
| swapactiveworkspaces | Swaps the active workspaces between two monitors | two monitors separated by a space |
| bringactivetotop | Brings the current window to the top of the stack | none |
| togglespecialworkspace | toggles a special workspace on/off | none (for the first) or name for named (name has to be a special workspace's name) |
| focusurgentorlast | Focuses the urgent window or the last window | none |
| togglegroup | toggles the current active window into a group | none |
| changegroupactive | switches to the next window in a group. | b - back, f - forward. |
| focuscurrentorlast | Switch focus from current to previously focused window | none |
| lockgroups | Locks the groups (all groups will not accept new windows) | `lock` for locking, `unlock` for unlocking, `toggle` for toggle |
| lockactivegroup | Lock the focused group (the current group will not accept new windows or be moved to other groups) | `lock` for locking, `unlock` for unlocking, `toggle` for toggle |
| moveintogroup | Moves the active window into a group in a specified direction. No-op if there is no group in the specified direction. | direction |
| moveoutofgroup | Moves the active window out of a group. No-op if not in a group | none |
| movegroupwindow | Swaps the active window with the next or previous in a group | `b` for back, anything else for forward |
| global | Executes a Global Shortcut using the GlobalShortcuts portal. See [here](../Binds/#global-keybinds) | name |
| submap | Change the current mapping group. See [Submaps](../Binds/#submaps) | `reset` or name |

{{< hint type=warning >}}
it is NOT recommended to set DPMS with a keybind directly, as it
might cause undefined behavior. Instead, consider something like

```ini
bind = MOD,KEY,exec,sleep 1 && hyprctl dispatch dpms off
```

{{< /hint >}}

## Grouped (tabbed) windows

Hyprland allows you to make a group from the current active window with the `togglegroup` bind dispatcher.

A group is like i3wm’s “tabbed” container. It takes the space of one window, and you can change the window to the next one in the tabbed “group” with the `changegroupactive` bind dispatcher.

The new group’s border colors are configurable with the appropriate `col.` settings in the general config section.

You can lock a group with the `lockgroups` bind dispatcher in order to stop new windows from entering groups.
# Workspaces

You have eight choices:

- ID: e.g. `1`, `2`, or `3`

- Relative ID: e.g. `+1`, `-3` or `+100`

- Relative workspace on monitor: e.g. `m+1`, `m-1` or `m+3`

- Relative workspace on monitor including empty workspaces: e.g. `r+1` or `r-3`

- Relative open workspace: e.g. `e+1` or `e-10`

- Name: e.g. `name:Web`, `name:Anime` or `name:Better anime`

- Previous workspace: `previous`

- First available empty workspace: `empty`

- Special Workspace: `special` or `special:name` for named special workspaces.

{{< hint type=warning >}}
`special` is supported ONLY on
`movetoworkspace` and `movetoworkspacesilent`. Any other dispatcher will result in undocumented behavior.
{{< /hint >}}

{{< hint type=important >}}
Numerical workspaces (e.g. `1`, `2`, `127634934729`) are allowed
**ONLY** between 1 and 9223372036854775806 (inclusive)

Neither `0` nor negative numbers are allowed.
{{< /hint >}}

# Special Workspace

A special workspace is what is called a "scratchpad" in some other places. A
workspace that you can toggle on/off on any monitor.

{{< hint >}}
You cannot have floating windows in a Special workspace. Making a window floating
will send it to the currently active _real_ workspace.

You can define multiple named special workspaces, but the amount of those is limited to 97 at a time.
{{< /hint >}}

For example, to move a window/application to a special workspace you can use the following syntax:

```
bind = SUPER, C, movetoworkspace, special
#The above syntax will move the window to a special workspace upon pressing 'SUPER'+'C'.
#To see the hidden window you can use the togglespecialworkspace dispatcher mentioned above.
```

# Workspace options

```txt
allfloat -> makes all new windows floating (also floats/unfloats windows on toggle)
allpseudo -> makes all new windows pseudo (also pseudos/unpseudos on toggle)
```

# Executing with rules
The `exec` dispatcher supports adding rules. Please note some windows might work better, some
worse. It records the PID of the spawned process and uses that. If your process e.g. forks and then
the fork opens a window, this will not work.

The syntax is:
```
bind = mod, key, exec, [rules...] command
```

For example:
```
bind = SUPER, E, exec, [workspace 2 silent;float;noanim] kitty
```
