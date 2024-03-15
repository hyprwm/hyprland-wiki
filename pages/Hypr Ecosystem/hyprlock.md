---
weight: 4
title: hyprlock
---

hyprlock is a simple, yet fast, multi-threaded and GPU-accelerated screen lock
for hyprland.

## Configuration

Configuration is done via the config file at `~/.config/hypr/hyprlock.conf`. It
is not required, but recommended. Without it, locking shows the current screen.

### General

Variables in the `general` category:
| variable | description | type | default |
| -- | -- | -- | -- |
| disable_loading_bar | disables the loading bar on the bottom of the screen while hyprlock is booting up. | bool | false |
| hide_cursor | hides the cursor instead of making it visible | bool | true |
| grace | the amount of seconds for which the lockscreen will unlock on mouse movement. | int | 0 |
| no_fade_in | disables the fadein animation | bool | false |
| no_fade_out | disables the fadeout animation | bool | false |

## Widgets

The entire configuration of how hyprlock looks is done via widgets.

```ini
widget_name {
    monitor =
    # further options
}
```

`monitor` can be left empty for "all monitors"

## Widget List

### General remarks

- All rendered text supports
  [pango markup](https://docs.gtk.org/Pango/pango_markup.html).
  - Additionally hyprlock will parse `<br/>` for your convenience. (That's a
    linebreak) Remember to enable linebreaks in your spans with
    `allow_breaks="true"`.
- Positioning is done via halign, valign and position. Position is an added
  offset to the result of alignment.
  - halign: `left`, `center`, `right`, `none`. valign: `top`, `center`,
    `bottom`, `none`

### Shadowable

Some widgets are shadowable, aka. can have a shadow. For those widgets, you get:
| variable | description | type | default |
| -- | -- | -- | -- |
| shadow_passes | passes for shadow, 0 to disable | int | 0 |
| shadow_size | size for shadow | int | 3 |
| shadow_color | shadow color | color | rgb(0,0,0) |
| shadow_boost | boost shadow's opacity | float | 1.2 |

### Background

Draws a background image or fills with color.

If `path` is empty or missing, will use `color`. Otherwise, the image will be
used.

If `path` is `screenshot`, a screenshot of your desktop at launch will be used.

```ini
background {
    monitor =
    path = /home/me/someImage.png   # only png supported for now
    color = rgba(25, 20, 20, 1.0)

    # all these options are taken from hyprland, see https://wiki.hyprland.org/Configuring/Variables/#blur for explanations
    blur_passes = 0 # 0 disables blurring
    blur_size = 7
    noise = 0.0117
    contrast = 0.8916
    brightness = 0.8172
    vibrancy = 0.1696
    vibrancy_darkness = 0.0
}
```

### Image

&check; Shadowable

Draws an image.

If `path` is empty or missing, nothing will be shown.

```ini
image {
    monitor =
    path = /home/me/cutie.png
    size = 150 # lesser side if not 1:1 ratio
    rounding = -1 # negative values mean circle
    border_size = 4
    border_color = rgb(221, 221, 221)

    position = 0, 200
    halign = center
    valign = center
}
```

### Input Field

&check; Shadowable

Draws a password input field.

```ini
input-field {
    monitor =
    size = 200, 50
    outline_thickness = 3
    dots_size = 0.33 # Scale of input-field height, 0.2 - 0.8
    dots_spacing = 0.15 # Scale of dots' absolute size, 0.0 - 1.0
    dots_center = false
    dots_rounding = -1 # -1 default circle, -2 follow input-field rounding
    outer_color = rgb(151515)
    inner_color = rgb(200, 200, 200)
    font_color = rgb(10, 10, 10)
    fade_on_empty = true
    fade_timeout = 1000 # Milliseconds before fade_on_empty is triggered.
    placeholder_text = <i>Input Password...</i> # Text rendered in the input box when it's empty.
    hide_input = false
    rounding = -1 # -1 means complete rounding (circle/oval)
    check_color = rgb(204, 136, 34)
    fail_color = rgb(204, 34, 34) # if authentication failed, changes outer_color and fail message color
    fail_text = <i>$FAIL <b>($ATTEMPTS)</b></i> # can be set to empty
    fail_transition = 300 # transition time in ms between normal outer_color and fail_color
    capslock_color = -1
    numlock_color = -1
    bothlock_color = -1 # when both locks are active. -1 means don't change outer color (same for above)
    invert_numlock = false # change color if numlock is off

    position = 0, -20
    halign = center
    valign = center
}
```

Available variables for `fail_text`:
 - `$FAIL` - pam fail reason
 - `$ATTEMPTS` - number of failed authentication attempts

### Label

&check; Shadowable

Draws a label.

```ini
label {
    monitor =
    text = Hi there, $USER
    color = rgba(200, 200, 200, 1.0)
    font_size = 25
    font_family = Noto Sans

    position = 0, 80
    halign = center
    valign = center
}
```

Available variables for `text`:
 - `$USER` - username
 - `$TIME` - current time (e.g. `13:37`)
 - `$FAIL` - last pam fail reason
 - `$ATTEMPTS` - failed attempts

`text` also supports launching commands, for example:

```ini
text = cmd[update:1000] echo "<span foreground='##ff2222'>$(date)</span>"
```

Worth noting:
 - `update:` - time is in ms.
 - label can be forcefully updated by specifying `update:<time>:1` or `update:<time>:true` and sending `SIGUSR2` to hyprlock. `<time>` can be `0` in this case
 - Variables seen above are parsed _before_ the command is ran.
 - `$ATTEMPTS[<string>]` format can be used to show `<string>` when there are no failed attempts. You can use pango-markup here. `<string>` can be empty to hide.
 - **do not** run commands that never exit. This will hang the AsyncResourceGatherer and you won't have a good time.

## User Signals

- `SIGUSR1` - unlocks hyprlock. For example, you can switch to a another tty and run `pkill -USR1 hyprlock`.
- `SIGUSR2` - updates labels. See above.
