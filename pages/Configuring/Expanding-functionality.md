Hyprland exposes two powerful sockets for you to use.

The first, socket1, can be fully controlled with `hyprctl`, see its usage
[here](../Using-hyprctl).

The second, socket2, sends events for certain changes / actions and can be used
to react to different events. See its description
[here](../../IPC/).

# Example script

This bash script will change the outer gaps to 20 if the currently focused
monitor is DP-1, and 30 otherwise.

```bash
#!/bin/bash

function handle {
  if [[ ${1:0:10} == "focusedmon" ]]; then
    if [[ ${1:12:4} == "DP-1" ]]; then
      hyprctl keyword general:gaps_out 20
    else
      hyprctl keyword general:gaps_out 30
    fi
  fi
}

socat - "UNIX-CONNECT:/tmp/hypr/$HYPRLAND_INSTANCE_SIGNATURE/.socket2.sock" | while read -r line; do handle "$line"; done
```
