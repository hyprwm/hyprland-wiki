---
weight: 90
title: hyprpolkitagent
---

[hyprpolkitagent](https://github.com/hyprwm/hyprpolkitagent) is a polkit authentication daemon.
It is required for GUI applications to be able to request elevated privileges.

If it's not available in your distro's repositories, you can either [build it from source](https://github.com/hyprwm/hyprpolkitagent) or use a different agent, e.g. [KDE's one](https://github.com/KDE/polkit-kde-agent-1/).

## Usage

Add `systemctl --user start hyprpolkitagent` to your Hyprland config's autostart and restart Hyprland.
(Obviously change that to whatever you are using if you are not using the hypr one.)

<!-- If Hyprland is started with [uwsm](../../Useful-Utilities/Systemd-start), you can autostart the polkit agent with the command `systemctl --user enable --now hyprpolkitagent.service`. -->

On distributions that use a different init system, such as Gentoo, it may be necessary to use `/usr/lib64/libexec/hyprpolkitagent` instead.

Other possible paths include `/usr/lib/hyprpolkitagent` and `/usr/libexec/hyprpolkitagent`.

## Configuration

The config file is located at `~/.config/hyprpolkitagent/hyprpolkitagent.conf`.
It is not required.
Changes apply the next time the agent starts.

Variables in the `general` category:

| Variable | Description | Type | Default |
| --- | --- | --- | --- |
| `allow_empty_password` | Whether an empty password can be submitted. Useful when PAM falls through to another method after the password module fails, e.g. face recognition with howdy | bool | `false` |
| `password_field_width` | Width of the password input, in px | int | `340` |
| `show_details` | Whether the action and command panel can be toggled | bool | `true` |
| `window_height` | Height of the dialog, in px | int | `440` |
| `window_width` | Width of the dialog, in px | int | `520` |

{{% details title="Example" closed="true" %}}

```ini { filename="~/.config/hyprpolkitagent/hyprpolkitagent.conf" }
general {
    show_details = true
}
```

{{% /details %}}

### Theming

Colors, rounding and fonts follow your [hyprtoolkit](../hyprtoolkit) theme.
