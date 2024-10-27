---
weight: 8
title: hyprpolkitagent
---

hyprpolkitagent is a polkit authentication daemon. It is required for GUI applications to
be able to request elevated privileges.

If it's not available in your distro's repositories, you can either [build it from source](https://github.com/hyprwm/hyprpolkitagent)
or use a different agent, e.g. [KDE's one](https://github.com/KDE/polkit-kde-agent-1/).

## Usage

Add `exec-once = systemctl --user start hyprpolkitagent` to your Hyprland config and restart hyprland.
(obviously change that to whatever you are using if you are not using the hypr one)/ Alternatively, if Hyprland started with a systemd service, you can autostart polkit with `systemctl --user enable --now hyprpolkitagent.service` command.

On distributions that use a different init system, such as Gentoo, it may be
necessary to use
`exec-once=/usr/lib64/libexec/hyprpolkitagent` instead.

Other possible paths include
`/usr/lib/hyprpolkitagent` and
`/usr/libexec/hyprpolkitagent`.
