# Table of contents

{{< toc >}}

Please keep in mind some layout-specific dispatchers will be listed in the
layout pages (See the sidebar).

Dispatchers have been reviewed and renamed for version 2 of it's API. Depricated and discontinued functions will still work until further end of life notice.

Dispatchers actions are : `Exec`, `Exit`, `Close`, `Cycle`, `Move`, `Reload`, `Rename`, `Send`, `Set` and `Swap`. <sub>Discontinued: alter, bring, center, change, deny, force, focus, kill, lock (unlock), pass, pin, resize</sub>.

Dispatchers names are not case sensitive and uppercase is only use for easier reading.


# Parameter explanation

| Param type | Description |
| ---------- | ----------- |
| `[client]` |  Identifies a client. If none is specified then it defaults to `current` or `focused`. If specified, can be any of the following: Class regex, `title:` and a title regex, `pid:` and the pid, `address:` and the address, `floating`, `tiled`  |
| `[direction]` | One of `l` `r` `u` `d` or `left` `right` `up` `down`. |
| `[m:monitor]` | Specified monitor by one of: direction, ID, name, `current`, relative (e.g. `+1` or `-1`) |
| `[ws:]` | Identifies a workspace by it's name. If none is specified then it defaults to `current` of `focused`. |
| `command` | A shell command to execute |
| `false` or `true`  | Boolean of 0 and 1 |
| `floatvalue` | a relative float delta (e.g `-0.2` or `+0.2`) or `exact` followed by a the exact float value (e.g. `exact 0.5`) |
| `ignore` | Ignore a state, a flag, a lock or a reserved area. |
| `nofocus` or `keepfocus` | Do not focus or do keep focus on a client or workspace that was sent elsewhere. |
| `nojump` or `jump` | When moving to the edge of the monitor, allow or not jumping to next monitor in a given direction. | 
| `none` | No optional parameter required or taken. | 
| `orgroup` | When moving a client, performs different directionnal move : if in a group, will move out of it; if not in group, will move in; if neither, will just move the client. |
| `out` | Move out of a group but keeps group flag active. |
| `prev` or `next` | Select previous or next element in a sequence. |
| `resizeparams` | relative pixel delta vec2 (e.g. `10 -10`), optionally a percentage of the window size (e.g. `20 25%`) or `exact` followed by an exact vec2 (e.g. `exact 1280 720`), optionally a percentage of the screen size (e.g. `exact 50% 50%`) |
| `stack` | Move to the stack `top` or `bottom`. |
| `submapname` | A name for a submap. |
| `toggle` | Toggle between boolean values. |
| `togglefake` | Toogle between values `fullscreen` and `fake`. |
| `toggleignore` | Toggle between `ignore` state and `lock` state | 
| `topleft`\|`topright`\|`bottomleft`\|`bottomright`\|`center` | Designates a position on a client for cursor movement. |
| `workspaceopt` | See below FIXME:AT. |
| `wsname` | A workspace name : `id name`, e.g. `2 work` |

# List of Dispatchers

## Compositor
| Dispatcher | Description | Params |
| ---------- | ----------- | ------ |
| compositorExit | Exits the compositor with no questions asked. <sub>Deprecates: exit</sub> | `none` |
| compositorReloadRenderer | Forces the renderer to reload all resources and outputs. <sub>Deprecates: forcerendererreload</sub> | `none` |
| compositorSetDpms | Sets all monitors' DPMS status unless specific monitor specified. Do not use with a keybind directly. <sub>Deprecates: dpms</sub> | [m:] opt:`true`|`false`|`toggle` |

## Execute and submap
| Dispatcher | Description | Params |
| ---------- | ----------- | ------ |
| exec | Executes a shell command. (supports rules, see [below]({{< relref "#executing with rules" >}})) | `command`  |
| execr | Executes a raw shell command (will not append any additional envvars like `exec` does, does not support rules) | `command` |
| setSubmap | Change the current mapping group. See [Submaps](../Binds/#submaps) | `reset` or `submapname` |

## Client movement
| Dispatcher | Description | Params |
| ---------- | ----------- | ------ |
| clientMoveDir | Moves a client or a group of clients in workspace following `direction`. Can jump to next monitor unless specified. <sub>Deprecates : movewindow, movewindoworgroup</sub> | `[client]` `[direction]` opt:(`nojump`\|`jump`) opt:`orgroup` |
| clientMoveTo | Moves a client to a workspace or monitor. <sub>Deprecates: movetoworkspace, movetoworkspacesilent</sub> | `[client]` ([`ws:workspace` \| `m:monitor` ]) opt:`nofocus`\|`keepfocus` |
| clientSwapCycle | Swaps the client with the next client on a workspace or in a group. <sub>Deprecates: swapnext, movegroupwindow </sub> | `[client]` ([`prev`\|`next`]) opt:`ingroup` |
| clientSwapDir | Swaps the client with another client in the given `direction`. Will swap with client on a adjacent monitor if option specified. Focus can be stay at originap place or be keept by client that currently has it.<sub>Deprecates: swapwindow</sub> | `[client]` `[direction]` opt:(`nojump`\|`dojump`) opt:(`nofocus`\|`keepfocus`) |

## Client groups
| Dispatcher | Description | Params |
| ---------- | ----------- | ------ |
| clientMoveGroupDir | Moves a client into a group or out in a specified direction. No-op if there is no group in the specified direction. <sub>Deprecates: moveintogroup, moveoutofgroup</sub> | `[client]` `[direction]` opt:(`in`\|`out`\|`toggle`) |
| clientSetDenyGroup | Prohibit a client from becoming or being inserted into group. <sub>Deprecates: denywindowfromgroup</sub> | `[client]` opt:(`true`\|`false`\|`toggle`) |
| clientSetGroup | Toggles the client window into a group state. <sub>Deprecates: togglegroup, moveoutofgroup</sub> | `[client]` opt:(`true`\|`false`\|`toggle`\|`out`) |
| clientSetGrouplock | Lock the group of a client (the current group will not accept new clients or be moved to other groups) <sub>Deprecates: lockactivegroup</sub> | `[client]` opt:(`unlock`\|`lock`\|`toggle`) |
| clientSetGrouplocks | Locks all the groups (all groups will not accept new clients). <sub>Deprecates: lockgroups,setignoregrouplock</sub> | opt:(`unlock`\|`lock`\|`toggle`\|`ignore`) |

## Client interaction
| Dispatcher | Description | Params |
| ---------- | ----------- | ------ |
| clientClose | Closes the client. <sub>Deprecates: killactive, closewindow</sub> | `[client]` |
| clientSendGlobalkey | Executes a Global Shortcut using the GlobalShortcuts portal. See [here](../Binds/#global-keybinds) <sub>Deprecates: global </sub> | `[client]` `key` |
| clientSendPassKey | Passes the key (with mods) to a specified client. Can be used as a workaround to global keybinds not working on Wayland. <sub>Deprecates: pass </sub> | `[client]` `key` |
| clientSetPos | Moves a selected window. <sub>Deprecates: moveactive, movewindowpixel</sub> | `[client]` `resizeparams` |
| clientSetSize | Resizes the client geometry. <sub>Deprecates: resizeactive, resizewindowpixel</sub> | `[client]` `resizeparams` |

## Client states
| Dispatcher | Description | Params |
| ---------- | ----------- | ------ |
| clientSetCentered | Centers the client on screen *note: floating only*. May or may not respect reserved monitor reserved area. <sub>Deprecates: centerwindow</sub> | `[client]` opt:(`ignore`) |
| clientSetFloating | Sets the client's floating state. <sub>Deprecates: togglefloating</sub>  | `[client]` opt:`true`\|`false`\|`toggle` |
| clientSetFullscreen | Sets the client's fullscreen state. A fake fullscreen will set internal fullscreen state without altering the geometry. <sub>Deprecates: fullscreen, fakefullscreen</sub> | `[client]` opt:(`true`\|`false`\|`toggle`\|`fake`\|`togglefake`) |
| clientSetOpaque | Toggles the window to always be opaque. Will override the `opaque` window rules. <sub>Deprecates: toggleopaque</sub> | `[client]` opt:(`true`\|`false`\|`toggle`) |
| clientSetPin | pins a client (i.e. show it on all workspaces) *note: floating only* <sub>Deprecates: pin</sub> | `[client]` opt:(`true`\|`false`\|`toggle`) |
| clientSetStack | Modify the client stack order of the client. Note: this cannot be used to move a floating client behind a tiled one. <sub>Deprecates:alterzorder, bringactivetotop</sub> | `[client]` `stack` |
| clientSetSplitRatio | Changes the split ratio of a client. <sub>Deprecates: splitratio</sub> | `[client]` `floatvalue` |

## Cursor 
| Dispatcher | Description | Params |
| ---------- | ----------- | ------ |
| cursorMovePos | Moves the cursor to a specified position relative to total geometry or specified monitor. Note : may not have implemented monitor selection. <sub>Deprecates: movecursor</sub> | `[m:]` `x` `y` |
| cursorMoveTo | Moves the cursor to the corner of a client. <sub>Deprecates: movecursortocorner</sub> | `[client]` opt:(`topleft`\|`topright`\|`bottomleft`\|`bottomright`\|`center`) |

## Focus
| Dispatcher | Description | Params |
| ---------- | ----------- | ------ |
| focusMoveDir | Moves the focus in a direction to an other client. <sub>Deprecates: movefocus</sub> | `[client]` `[direction]` opt:`nojump`\|`dojump`|
| focusMoveCycle | Set focuse on the next client on a workspace <sub>Deprecates: cyclenext</sub> | `[client]` opt:`[direction]` |
| focusMoveTo | Set focuse on : the first matching client, on a workspace or on a monitor. Options works only if unspecified target for urgent client, last client, urgent or last client. <sub>Deprecates: focuswindow, workspace, focusmonitor,focusurgentorlast</sub> | (`[client]`\|`[ws:]`\|`[m:]`) opt:`urgent`\|`last`\|`urgentorlast` |
| focusCycleGroup | Switches to the next client in a group. <sub>Deprecates: changegroupactive</sub> | `[client]` opt:`[prev\|next]` |
| focusMoveHistory |  Switch focus from current to previously focused client and forward to the original. Note `next` may not be implemented. <sub>Deprecates: focuscurrentorlast</sub> | [`prev`\|`next`] |

## Workspace
| Dispatcher | Description | Params |
| ---------- | ----------- | ------ |
| workspaceMoveTo | Moves the a workspace to a monitor. Note: Currently can't reorder workspaces on a monitor. <sub>Deprecates: movecurrentworkspacetomonitor,moveworkspacetomonitor</sub> | `[ws:]` `[m:]` |
| workspaceRename | Renames a workspace. <sub>Deprecates: renameworkspace</sub> | `[ws:]` `[wsname]` |
| workspaceSetOpt | Sets workspace option. <sub>Deprecates: workspaceopt</sub> | `[ws:]` `[opt]` | 
| workspaceSetSpecial | Toggles a special workspace on/off <sub>Deprecates: togglespecialworkspace</sub> | `[ws:]` opt:`true`\|`false`\|`toggle` |
| workspaceSwap | Swaps workspaces between two monitors. Can specify specific workspaces or monitor to swap it's active workspace. Note: Currently can't reorder workspaces on a monitor. <sub>Deprecates: swapactiveworkspaces</sub> | `[ws:]`\|`[m:]` `[ws:]`\|`[m:]` opt:`nofocus`\|`dofocus` |



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

The new group’s border colors are configurable with the appropriate `col.` settings in the `group` config section.

You can lock a group with the `lockactivegroup` dispatcher in order to stop new window from entering this group.
In addition, the `lockgroups` dispatcher can be used to toggle an independent global group lock that will prevent
new window from entering any groups, regardless of their local group lock stat.

You can prevent a window from being added to group or becoming a group with the `denywindowfromgroup` dispatcher.
`movewindoworgroup` will behave like `movewindow` if current active window or window in direction has this property set.

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
