---
weight: 60
title: Systemd
---

<!-- should be obsolete when https://github.com/hyprwm/Hyprland/pull/15776 is merged -->

## Preface

Systemd is designed to expect `graphical-session.target` to be run when a Wayland compositor such as Hyprland is executed. This is needed for some programs that depend on `graphical-session.target` to start their services. The most notable example being the `xdg-desktop-portal` service, which is needed for screen-sharing, for GTK apps to be able to switch their color scheme, etc.

Arch Linux has a custom patch in their `xdg-desktop-portal` package to by-pass its dependency upon `graphical-session.target`. However, other distros such as NixOS, don't, and the user needs to start the target manually.

The section below explains how to start `graphical-session.target` with Hyprland. 

## hyprland-session.target

This is a minimal way of starting the `graphical-session.target`. You can manage this yourself by creating a `hyprland-session.target` that binds to the `graphical-session.target`, then launching it in your config.

First create the unit with `systemctl --user edit --full --force hyprland-session.target`:

```ini
[Unit]
Description=Hyprland session
BindsTo=graphical-session.target
Wants=graphical-session-pre.target
After=graphical-session-pre.target
PropagatesStopTo=graphical-session.target
```

Then start and stop it in your config:

```lua
hl.on("hyprland.start", function()
    hl.exec_cmd("systemctl --user start hyprland-session.target")
end)

hl.on("hyprland.shutdown", function()
    os.execute("systemctl --user stop hyprland-session.target && sleep 0.1")
    -- uses a blocking exec function and sleeps a bit to give things time to close
    -- you might also want to kill troublesome/crashing non-systemd background services here:
    -- os.execute("pkill wallpaperthing; systemctl --user stop hyprland-session.target && sleep 0.1")
end)
```

### Starting systemd's graphical-session.target in NixOS

If you want to start up `graphical-session.target` in NixOS, check it in the [configuring with hjem page](../../../nix/configuring-hyprland-with-hjem)

## UWSM

If you are interested in using advanced systemd functionalities, you could check out [UWSM](../../../useful-utilities/uwsm).
