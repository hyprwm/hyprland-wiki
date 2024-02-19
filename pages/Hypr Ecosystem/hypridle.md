hypridle is hyprland's idle management daemon.

{{< toc >}}

## Configuration

Configuration is done via the config file at `~/.config/hypridle.conf`.
A config file is required; hypridle won't run without one.

### General

Variables in the `general` category:

| variable | description | type | default |
| -- | -- | -- | -- |
| lock_cmd | command to run when receiving a dbus lock event (e.g. `loginctl lock-session`) | string | empty |
| unlock_cmd | command to run when receiving a dbus unlock event (e.g. `loginctl unlock-session`) | string | empty |
| before_sleep_cmd | command to run when receiving a dbus prepare_sleep event | string | empty |
| after_sleep_cmd | command to run when receiving a dbus post prepare_sleep event | string | empty |
| ignore_dbus_inhibit | whether to ignore dbus-sent idle inhibit events (e.g. from firefox) | bool | false |

### Listeners

Hypridle uses listeners to define actions on idleness.

Every listener has a _timeout_ (in seconds). After idling for _timeout_ seconds, `on-timeout` will fire.
When action is resumed after idle, `on-resume` will fire.

Example listener:

```ini
listener {
    timeout = 500                            # in seconds
    on-timeout = notify-send "You are idle!" # command to run when timeout has passed
    on-resume = notify-send "Welcome back!"  # command to run when activity is detected after timeout has fired.
}
```

You can define as many listeners as you want.