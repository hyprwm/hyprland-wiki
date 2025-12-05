---
weight: 15
title: hyprshutdown
---

[hyprshutdown](https://github.com/hyprwm/hyprshutdown) is a graceful shutdown utility. It opens
a GUI and gracefully asks apps to exit, then quits Hyprland. It's the recommended way to exit hyprland,
as otherwise (e.g. `dispatch exit`) apps will die instead of exiting.

## Tips and tricks

If you want to shut the system down, or reboot, instead of logging out, you can do things like this:

```sh
hyprshutdown -t 'Shutting down...' --post-cmd 'shutdown -P 0'

hyprshutdown -t 'Restarting...' --post-cmd 'reboot'
```
