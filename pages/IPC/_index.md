Hyprland exposes 2 UNIX Sockets, for controlling / getting info about Hyprland
via code / bash utilities.

# Hyprland Instance Signature (HIS)

```sh
echo $HYPRLAND_INSTANCE_SIGNATURE
```

# /tmp/hypr/\[HIS\]/.socket.sock

Used for hyprctl-like requests. See the
[Hyprctl page](../Configuring/Using-hyprctl) for
commands.

basically, write `[flag(s)]/command args`.

# /tmp/hypr/\[HIS\]/.socket2.sock

Used for events. Hyprland will write to each connected client live events like
this:

`EVENT>>DATA\n` (`\n` is a linebreak)

e.g.: `workspace>>2`

# Events list

| name | description | data |
| --- | --- | --- |
| workspace | emitted on workspace change. Is emitted ONLY when a user requests a workspace change, and is not emitted on mouse movements (see `activemon`) | `WORKSPACENAME` |
| focusedmon | emitted on the active monitor being changed. | `MONNAME,WORKSPACENAME` |
| activewindow | emitted on the active window being changed. | `WINDOWCLASS,WINDOWTITLE` |
| activewindowv2 | emitted on the active window being changed. | `WINDOWADDRESS` |
| fullscreen | emitted when a fullscreen status of a window changes. | `0/1` (exit fullscreen / enter fullscreen) |
| monitorremoved | emitted when a monitor is removed (disconnected) | `MONITORNAME` |
| monitoradded | emitted when a monitor is added (connected) | `MONITORNAME` |
| createworkspace | emitted when a workspace is created | `WORKSPACENAME` |
| destroyworkspace | emitted when a workspace is destroyed | `WORKSPACENAME` |
| moveworkspace | emitted when a workspace is moved to a different monitor | `WORKSPACENAME,MONNAME` |
| activelayout | emitted on a layout change of the active keyboard | `KEYBOARDNAME,LAYOUTNAME` |
| openwindow | emitted when a window is opened | `WINDOWADDRESS`,`WORKSPACENAME`,`WINDOWCLASS`,`WINDOWTITLE` |
| closewindow | emitted when a window is closed | `WINDOWADDRESS` |
| movewindow | emitted when a window is moved to a workspace | `WINDOWADDRESS`,`WORKSPACENAME` |
| openlayer | emitted when a layerSurface is mapped | `NAMESPACE` |
| closelayer | emitted when a layerSurface is unmapped | `NAMESPACE` |
| submap | emitted when a keybind submap changes. Empty means default. |`SUBMAPNAME` |
| changefloatingmode | emitted when a window changes its floating mode. `FLOATING` is either 0 or 1. | `WINDOWADDRESS`,`FLOATING` |
| urgent | emitted when a window requests an `urgent` state | `WINDOWADDRESS` |
| minimize | emitted when a window requests a change to its minimized state. `MINIMIZED` is either 0 or 1. | `WINDOWADDRESS,MINIMIZED` |
| screencast | emitted when a screencopy state of a client changes. Keep in mind there might be multiple separate clients. State is 0/1, owner is 0 - monitor share, 1 - window share | `STATE,OWNER` |
| windowtitle | emitted when a window title changes. | `WINDOWADDRESS` |

{{< hint type=warning >}}
A fullscreen event is not guaranteed to fire on/off once in succession.
A window might do for example 3 requests to be fullscreen'd, which would result
in 3 fullscreen events.
{{< /hint >}}

# How to use socket2 with bash

example script using socket2 events with bash and `socat`:

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
