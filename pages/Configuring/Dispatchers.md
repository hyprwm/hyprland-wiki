# Table of contents
{{< toc >}}

Please keep in mind some layout-specific dispatchers will be listed in the
layout pages (See the sidebar).

## Parameter explanation

| Param type | Description |
| ---------- | ----------- |
| window | a window. Any of the following: Class regex, `title:` and a title regex, `pid:` and the pid, `address:` and the address |
| workspace | see below. |
| direction | `l` `r` `u` `d` left right up down |
| monitor | One of: direction, ID, name, `current` |
| resizeparams | Pixel delta vec2 (e.g. `10 -10`) or `exact` followed by exact vec2, e.g. `exact 1280 720`) |
| floatdelta | a float value delta, e.g `-0.2` or `+0.2`. |
| workspaceopt | see below. |

# Dispatchers:

| Dispatcher | Description | Params |
| ---------- | ----------- | ------ |
| exec | executes a shell command | command |
| pass | passes the key (with mods) to a specified window. Can be used as a workaround to global keybinds not working on Wayland. | window |
| killactive | closes (not kills) the active window | none |
| closewindow | closes a specified window | window |
| workspace | changes the workspace | workspace |
| movetoworkspace | moves the focused window to a workspace | workspace OR `workspace,window` for a specific window |
| movetoworkspacesilent | same as above, but doesnt switch to the workspace | workspace OR `workspace,window` for a specific window |
| togglefloating | toggles the current window's floating state | left empty / `active` for current, or `window` for a specific window |
| fullscreen | toggles the focused window's fullscreen state | 0 - fullscreen (takes your entire screen), 1 - maximize (keeps gaps and bar(s)) |
| dpms | sets all monitors' DPMS status. Do not use with a keybind directly. | `on` or `off` |
| pseudo | toggles the focused window's pseudo mode | none |
| pin | pins the active window (shown on all workspaces) *note: floating only* | none |
| movefocus | moves the focus in a direction | direction |
| movewindow | moves the active window in a direction or to a monitor | direction or `mon:` and a monitor |
| resizeactive | resizes the active window | resizeparams |
| moveactive | moves the active window | resizeparams |
| resizewindowpixel | resizes a selected window | `resizeparams,window`, e.g. `100 100,^(kitty)$` |
| movewindowpixel | moves a selected window | `resizeparams,window` |
| cyclenext | focuses the next window on a workspace | none (for next) or `prev` (for previous) |
| swapnext | swaps the focused window with the next window on a workspace | none (for next) or `prev` (for previous) |
| focuswindow | focuses the first window matching | window |
| focusmonitor | focuses a monitor | monitor |
| splitratio | changes the split ratio | floatdelta |
| toggleopaque | toggles the current window to always be opaque | none |
| movecursortocorner | moves the cursor to the corner of the active window | direction, 0 - 3, bottom left - 0, bottom right - 1, top right - 2, top left - 3 |
| workspaceopt | toggles a workspace option for the active workspace. | workspaceopt |
| exit | exits the compositor with no questions asked. | none |
| forcerendererreload | forces the renderer to reload all resources and outputs | none |
| movecurrentworkspacetomonitor | Moves the active workspace to a monitor | monitor |
| moveworkspacetomonitor | Moves a workspace to a monitor | workspace and a monitor separated by a space |
| swapactiveworkspaces | Swaps the active workspaces between two monitors | two monitors separated by a space |
| togglespecialworkspace | toggles the special workspace on/off | none |

{{< hint type=warning >}}
it is NOT recommended to set DPMS with a keybind directly, as it
might cause undefined behavior. Instead, consider something like

```
bind = MOD,KEY,exec,sleep 1 && hyprctl dispatch dpms off
```
{{< /hint >}}

# Workspaces

You have seven choices:

- ID: e.g. `1`, `2`, or `3`

- Relative ID: e.g. `+1`, `-3` or `+100`

- Relative workspace on monitor: e.g. `m+1`, `m-1` or `m+3`

- Relative open workspace: e.g. `e+1` or `e-10`

- Name: e.g. `name:Web`, `name:Anime` or `name:Better anime`

- Previous workspace: `previous`

- Special Workspace: `special`

{{< hint type=warning >}}
`special` is supported ONLY on
`movetoworkspace`. Any other dispatcher will result in undocumented behavior.
{{< /hint >}}

## Special Workspace

Special workspace is what is called a "scratchpad" in some other places. A
workspace that you can toggle on/off on any monitor.

{{< hint >}}
You cannot have floating windows in the Special workspace. Making a window floating
will send it to the currently active *real* workspace.
{{< /hint >}}

## Workspace options
```
allfloat -> makes all new windows floating (also floats/unfloats windows on toggle)
allpseudo -> makes all new windows pseudo (also pseudos/unpseudos on toggle)
```

