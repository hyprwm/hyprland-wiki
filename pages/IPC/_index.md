Hyprland exposes 2 UNIX Sockets, for controlling / getting info about Hyprland
via code / bash utilities.

## Hyprland Instance Signature (HIS)

```sh
echo $HYPRLAND_INSTANCE_SIGNATURE
```

# /tmp/hypr/\[HIS\]/.socket.sock

Used for hyprctl-like requests. See the
[Hyprctl page](../Configuring/Using-hyprctl) for
commands.

basically, write `command args`.

# /tmp/hypr/\[HIS\]/.socket2.sock

Used for events. Hyprland will write to each connected client live events like
this:

`EVENT>>DATA\n` (\\n is a linebreak)

e.g.: `workspace>>2`

## Events list:

| name | description | data |
| --- | --- | --- |
| workspace | emitted on workspace change. Is emitted ONLY when a user requests a workspace change, and is not emitted on mouse movements (see `activemon`) | `WORKSPACENAME` |
| focusedmon | emitted on the active monitor being changed. | `MONNAME,WORKSPACENAME` |
| activewindow | emitted on the active window being changed. | `WINDOWCLASS,WINDOWTITLE` |
| fullscreen | emitted when a fullscreen status of a window changes. | `0/1` (exit fullscreen / enter fullscreen) |
| monitorremoved | emitted when a monitor is removed (disconnected) | `MONITORNAME` |
| monitoradded | emitted when a monitor is added (connected) | `MONITORNAME` |
| createworkspace | emitted when a workspace is created | `WORKSPACENAME` |
| destroyworkspace | emitted when a workspace is destroyed | `WORKSPACENAME` |
| activelayout | emitted on a layout change of the active keyboard | `LAYOUTNAME` |

{{< hint type=warning >}}
A fullscreen event is not guaranteed to fire on/off once in succession.
A window might do for example 3 requests to be fullscreen'd, which would result
in 3 fullscreen events.
{{< /hint >}}

## How to use socket2 with bash

example script using socket2 events with bash and `socat`:

```sh
#!/bin/sh

function handle {
  if [[ ${1:0:12} == "monitoradded" ]]; then
    # do_something
  fi
}

socat - UNIX-CONNECT:/tmp/hypr/$(echo $HYPRLAND_INSTANCE_SIGNATURE)/.socket2.sock | while read line; do handle $line; done
```
