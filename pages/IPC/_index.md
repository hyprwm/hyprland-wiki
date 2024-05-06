---
weight: 9
title: IPC
---

Hyprland exposes 2 UNIX Sockets, for controlling / getting info about Hyprland
via code / bash utilities.

## Hyprland Instance Signature (HIS)

```sh
echo $HYPRLAND_INSTANCE_SIGNATURE
```

## *${XDG_RUNTIME_DIR}*/hypr/\[HIS\]/.socket.sock

Used for hyprctl-like requests. See the
[Hyprctl page](../Configuring/Using-hyprctl) for commands.

basically, write `[flag(s)]/command args`.

## *${XDG_RUNTIME_DIR}*/hypr/\[HIS\]/.socket2.sock

Used for events. Hyprland will write to each connected client live events like
this:

`EVENT>>DATA\n` (`\n` is a linebreak)

e.g.: `workspace>>2`

## Events list

| name | description | data |
| --- | --- | --- |
| workspace | emitted on workspace change. Is emitted ONLY when a user requests a workspace change, and is not emitted on mouse movements (see `activemon`) | `WORKSPACENAME` |
| workspacev2 | emitted on workspace change. Is emitted ONLY when a user requests a workspace change, and is not emitted on mouse movements (see `activemon`) | `WORKSPACEID,WORKSPACENAME` |
| focusedmon | emitted on the active monitor being changed. | `MONNAME,WORKSPACENAME` |
| activewindow | emitted on the active window being changed. | `WINDOWCLASS,WINDOWTITLE` |
| activewindowv2 | emitted on the active window being changed. | `WINDOWADDRESS` |
| fullscreen | emitted when a fullscreen status of a window changes. | `0/1` (exit fullscreen / enter fullscreen) |
| monitorremoved | emitted when a monitor is removed (disconnected) | `MONITORNAME` |
| monitoradded | emitted when a monitor is added (connected) | `MONITORNAME` |
| monitoraddedv2 | emitted when a monitor is added (connected) | `MONITORID,MONITORNAME,MONITORDESCRIPTION` |
| createworkspace | emitted when a workspace is created | `WORKSPACENAME` |
| createworkspacev2 | emitted when a workspace is created | `WORKSPACEID,WORKSPACENAME` |
| destroyworkspace | emitted when a workspace is destroyed | `WORKSPACENAME` |
| destroyworkspacev2 | emitted when a workspace is destroyed | `WORKSPACEID,WORKSPACENAME` |
| moveworkspace | emitted when a workspace is moved to a different monitor | `WORKSPACENAME,MONNAME` |
| moveworkspacev2 | emitted when a workspace is moved to a different monitor | `WORKSPACEID,WORKSPACENAME,MONNAME` |
| renameworkspace | emitted when a workspace is renamed | `WORKSPACEID,NEWNAME` |
| activespecial | emitted when the special workspace opened in a monitor changes (closing results in an empty `WORKSPACENAME`) | `WORKSPACENAME,MONNAME` |
| activelayout | emitted on a layout change of the active keyboard | `KEYBOARDNAME,LAYOUTNAME` |
| openwindow | emitted when a window is opened | `WINDOWADDRESS`,`WORKSPACENAME`,`WINDOWCLASS`,`WINDOWTITLE` |
| closewindow | emitted when a window is closed | `WINDOWADDRESS` |
| movewindow | emitted when a window is moved to a workspace | `WINDOWADDRESS`,`WORKSPACENAME` |
| movewindowv2 | emitted when a window is moved to a workspace | `WINDOWADDRESS`,`WORKSPACEID`,`WORKSPACENAME` |
| openlayer | emitted when a layerSurface is mapped | `NAMESPACE` |
| closelayer | emitted when a layerSurface is unmapped | `NAMESPACE` |
| submap | emitted when a keybind submap changes. Empty means default. |`SUBMAPNAME` |
| changefloatingmode | emitted when a window changes its floating mode. `FLOATING` is either 0 or 1. | `WINDOWADDRESS`,`FLOATING` |
| urgent | emitted when a window requests an `urgent` state | `WINDOWADDRESS` |
| minimize | emitted when a window requests a change to its minimized state. `MINIMIZED` is either 0 or 1. | `WINDOWADDRESS,MINIMIZED` |
| screencast | emitted when a screencopy state of a client changes. Keep in mind there might be multiple separate clients. State is 0/1, owner is 0 - monitor share, 1 - window share | `STATE,OWNER` |
| windowtitle | emitted when a window title changes. | `WINDOWADDRESS` |
| ignoregrouplock | emitted when `ignoregrouplock` is toggled. | `0/1` |
| lockgroups | emitted when `lockgroups` is toggled. | `0/1` |
| configreloaded | emitted when the config is done reloading | empty |
| pin | emitted when a window is pinned or unpinned | `WINDOWADDRESS,PINSTATE` |

{{< callout type=warning >}}

A fullscreen event is not guaranteed to fire on/off once in succession. Some windows
may fire multiple requests to be fullscreened, resulting in multiple
fullscreen events.

{{< /callout >}}

## How to use socket2 with bash

Example script using socket2 events with bash and `socat`:

```sh
#!/bin/sh

handle() {
  case $1 in
    monitoradded*) do_something ;;
    focusedmon*) do_something_else ;;
  esac
}

socat -U - UNIX-CONNECT:/tmp/hypr/$HYPRLAND_INSTANCE_SIGNATURE/.socket2.sock | while read -r line; do handle "$line"; done
```
