---
weight: 11
title: hyprpolkitagent
---

[hyprpolkitagent](https://github.com/hyprwm/hyprpolkitagent) is a polkit authentication daemon. It is required for GUI applications to
be able to request elevated privileges.

If it's not available in your distro's repositories, you can either [build it from source](https://github.com/hyprwm/hyprpolkitagent)
or use a different agent, e.g. [KDE's one](https://github.com/KDE/polkit-kde-agent-1/).

## Usage

Add the following to your Hyprland config and restart hyprland.
(obviously change `hyprpolkitagent` to whatever you are using if you are not using the hypr one)
```lua
hl.on("hyprland.start", function()
  hl.exec_cmd("systemctl --user start hyprpolkitagent")
end)
```

If Hyprland is started with [uwsm](../../Useful-Utilities/Systemd-start), you can autostart the polkit agent with the command `systemctl --user enable --now hyprpolkitagent.service`.

On distributions that use a different init system, such as Gentoo, it may be
necessary to use
`hl.exec_cmd("/usr/lib64/libexec/hyprpolkitagent")` instead.

Other possible paths include
`/usr/lib/hyprpolkitagent` and
`/usr/libexec/hyprpolkitagent`.
