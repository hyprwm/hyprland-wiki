---
weight: 60
title: Systemd
---

## Preface

Systemd is designed to expect `graphical-session.target` to be run when a Wayland compositor such as Hyprland is executed. This is needed for some programs that depend on `graphical-session.target` to start their services. The most notable example being the `xdg-desktop-portal` service, which is needed for screen-sharing, for GTK apps to be able to switch their color scheme, etc.

## hyprland-session.target

This previously required manual setup, but is now integrated into Hyprland and handled automatically. If you have a custom `hyprland-session.target` taken from a previous version of this article, it can be cleaned up via `systemctl --user revert hyprland-session.target`. Also, any leftover `systemctl` commands in your config, such as the following, should be *removed*:

```lua
hl.on("hyprland.start", function()
    hl.exec_cmd("systemctl --user start hyprland-session.target")
end)

hl.on("hyprland.shutdown", function()
    os.execute("systemctl --user stop graphical-session.target")
end)
```

> [!NOTE]
> Under Systemd, a single user is not expected to have multiple graphical sessions (i.e. compositors) running simultaneously. If you do this, note that exiting one Hyprland instance will stop `graphical-session.target` and may impact your other remaining sessions.
> Setting `HYPRLAND_NO_SD_TARGET` will avoid this, but also prevent *starting* `hyprland-session.target` and `graphical-session.target` in the first place. You may want to adopt some variation of the lua event listeners above in order to make your session behave as desired.

## UWSM

UWSM starts `graphical-session.target` automatically.

If you are interested in using advanced systemd functionalities, you could check out [UWSM](../../../useful-utilities/uwsm).
