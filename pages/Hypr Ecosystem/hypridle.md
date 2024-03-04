hypridle is hyprland's idle management daemon.

{{< toc >}}

## Configuration

Configuration is done via the config file at `~/.config/hypr/hypridle.conf`.
A config file is required; hypridle won't run without one.
To run hypridle edit `hyprland.conf` and add:
`exec-once = hypridle`.

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
    timeout = 500                            # in seconds.
    on-timeout = notify-send "You are idle!" # command to run when timeout has passed.
    on-resume = notify-send "Welcome back!"  # command to run when activity is detected after timeout has fired.
}
```

You can define as many listeners as you want.

Full hypridle example with hyprlock:

```ini
general {
    lock_cmd = pidof hyprlock || hyprlock       # avoid starting multiple hyprlock instances.
    before_sleep_cmd = loginctl lock-session    # lock before suspend.
    after_sleep_cmd = hyprctl dispatch dpms on  # to avoid having to press a key twice to turn on the display.
}

listener {
    timeout = 150                                # 2.5min.
    on-timeout = brightnessctl -s set 10         # set monitor backlight to minimum, avoid 0 on OLED monitor.
    on-resume = brightnessctl -r                 # monitor backlight restor.
}

# turn off keyboard backlight, uncomment this section if have keyboard backlight.
listener { 
    timeout = 150                                          # 2.5min.
    on-timeout = brightnessctl -sd rgb:kbd_backlight set 0 # turn off keyboard backlight.
    on-resume = brightnessctl -rd rgb:kbd_backlight        # turn on keyboard backlight.
}

listener {
    timeout = 300                                 # 5min
    on-timeout = loginctl lock-session            # lock screen when timeout has passed
}

listener {
    timeout = 380                                 # 5.5min
    on-timeout = hyprctl dispatch dpms off        # screen off when timeout has passed
    on-resume = hyprctl dispatch dpms on          # screen on when activity is detected after timeout has fired.
}

listener {
    timeout = 1800                                # 30min
    on-timeout = systemctl suspend                # suspend pc
}
```
