---
weight: 4
title: hyprlock
---

hyprlock is a simple, yet fast, multi-threaded and GPU-accelerated screen lock
for Hyprland.

## Configuration

Configuration is done via the config file at `~/.config/hypr/hyprlock.conf`. It
is not required, but recommended. Without it, locking shows the current screen.

### General

Variables in the `general` category:
| variable | description | type | default |
| -- | -- | -- | -- |
| disable_loading_bar | disables the loading bar on the bottom of the screen while hyprlock is booting up. | bool | false |
| hide_cursor | hides the cursor instead of making it visible | bool | false |
| grace | the amount of seconds for which the lockscreen will unlock on mouse movement. | int | 0 |
| no_fade_in | disables the fadein animation | bool | false |
| no_fade_out | disables the fadeout animation | bool | false |
| ignore_empty_input | skips validation when no password is provided | bool | false |
| immediate_render | makes hyprlock immediately start to draw widgets. Backgrounds will render `background:color` until their `background:path` resource is available | bool | false |
| pam_module | sets the pam module used for authentication. If the module isn't found in `/etc/pam.d`, "su" will be used as a fallback | str | hyprlock |
| text_trim | sets if the text should be trimmed, useful to avoid trailing newline in commands output | bool | true |
| fractional_scaling | whether to use fractional scaling. 0 - disabled, 1 - enabled, 2 - auto | int | 2 |
| enable_fingerprint | enables parallel fingerprint auth with fprintd. | bool | false |
| fingerprint_ready_message | sets the message that will be displayed when fprintd is ready to scan a fingerprint. | str | (Scan fingerprint to unlock) |
| fingerprint_present_message | sets the message that will be displayed when a finger is placed on the scanner. | str | Scanning fingerprint |

{{< callout type=warning >}}

If you are not on hyprland, or your  `XDG_CURRENT_DESKTOP` is not Hyprland, the fade out will be disabled and the value of your `no_fade_out` variable will be ignored.

{{< /callout >}}

## Keyboard Shortcuts and Actions

The following keys and key-combinations describe hyprlock's default behaviour:
| input | description |
| -- | -- |
| ESC | Clear password buffer |
| Ctrl + u | Clear password buffer |
| Ctrl + Backspace | Clear password buffer |

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
- Positioning is done via halign, valign, position, and zindex. Position is an added
  offset to the result of alignment.
  - halign: `left`, `center`, `right`, `none`. valign: `top`, `center`,
    `bottom`, `none`
  - zindex: Widgets with larger numbers will be placed above widgets with smaller numbers. All widgets default to 0, except background which defaults to -1.
- All `position` and `size` options can be specified in pixels or as percentages of the output size.
  - pixels: `10, 10` or `10px, 10px`
  - percentages: `10%, 10%`
  - mixed: `10%, 5px`

### Shadowable

Some widgets are shadowable, meaning they can have a shadow. For those widgets, you get:
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
    path = /home/me/someImage.png   # supports png, jpg, webp (no animations, though)
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
    rotate = 0 # degrees, counter-clockwise
    reload_time = -1 # seconds between reloading, 0 to reload with SIGUSR2
    reload_cmd =  # command to get new path. if empty, old path will be used. don't run "follow" commands like tail -F

    position = 0, 200
    halign = center
    valign = center
}
```

### Shape

&check; Shadowable

Draws a shape.

```ini
shape {
    monitor =
    size = 360, 60
    color = rgba(17, 17, 17, 1.0)
    rounding = -1
    border_size = 8
    border_color = rgba(0, 207, 230, 1.0)
    rotate = 0
    xray = false # if true, make a "hole" in the background (rectangle of specified size, no rotation)

    position = 0, 80
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
    dots_spacing = 0.15 # Scale of dots' absolute size, -1.0 - 1.0
    dots_center = false
    dots_rounding = -1 # -1 default circle, -2 follow input-field rounding
    dots_fade_time = 200 # Milliseconds until a dot fully fades in
    dots_text_format = # Text character used for the input indicator. Leave empty for a rectangle that will be rounded via dots_rounding (default).
    outer_color = rgb(151515)
    inner_color = rgb(200, 200, 200)
    font_color = rgb(10, 10, 10)
    font_family = Noto Sans # Font used for placeholder_text, fail_text and dots_text_format.
    fade_on_empty = true
    fade_timeout = 1000 # Milliseconds before fade_on_empty is triggered.
    placeholder_text = <i>Input Password...</i> # Text rendered in the input box when it's empty.
    hide_input = false
    rounding = -1 # -1 means complete rounding (circle/oval)
    check_color = rgb(204, 136, 34)
    fail_color = rgb(204, 34, 34) # if authentication failed, changes outer_color and fail message color
    fail_text = <i>$FAIL <b>($ATTEMPTS)</b></i> # can be set to empty
    fail_timeout = 2000 # milliseconds before fail_text and fail_color disappears
    fail_transition = 300 # transition time in ms between normal outer_color and fail_color
    capslock_color = -1
    numlock_color = -1
    bothlock_color = -1 # when both locks are active. -1 means don't change outer color (same for above)
    invert_numlock = false # change color if numlock is off
    swap_font_color = false # see below

    position = 0, -20
    halign = center
    valign = center
}
```

{{< callout type=info >}}

#### Colors information

When `outline_thickness` set to `0`, the color of the inner box will be changed instead of the outer.

Behaviour of `swap_font_color` is as follows:
 - `outline_thickness` is `0`: if set, font color will be swapped with inner one on color change events (e.g. Caps-lock on or password check).
 - `outline_thickness` is not `0`: if set, font and inner colors will be swapped on password check and authentication failure.

{{< /callout >}}

Available variables for `placeholder_text`:
 - `$PROMPT` - prompt text provided by pam. Usually this will be "Password: ", but it depends on your pam configuration.

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
    text_align = center # center/right or any value for default left. multi-line text alignment inside label container
    color = rgba(200, 200, 200, 1.0)
    font_size = 25
    font_family = Noto Sans
    rotate = 0 # degrees, counter-clockwise

    position = 0, 80
    halign = center
    valign = center
}
```

Available variables for `text`:
 - `$USER` - username (e.g. linux-user)
 - `$DESC` - user description (e.g. Linux User)
 - `$TIME` - current time in 24-hour format (e.g. `13:37`)
 - `$TIME12` - current time in 12-hour format (e.g. `1:37 PM`)
 - `$PROMPT` - last pam prompt
 - `$FAIL` - last pam fail reason
 - `$ATTEMPTS` - failed attempts
 - `$LAYOUT` - current keyboard layout
 - `$FPRINTMESSAGE` - last message from fingerprint matching

`text` also supports launching commands, for example:

```ini
text = cmd[update:1000] echo "<span foreground='##ff2222'>$(date)</span>"
```

Worth noting:
 - `update:` - time is in ms.
 - label can be forcefully updated by specifying `update:<time>:1` or `update:<time>:true` and sending `SIGUSR2` to hyprlock. `<time>` can be `0` in this case.
 - `$ATTEMPTS[<string>]` format can be used to show `<string>` when there are no failed attempts. You can use pango-markup here. `<string>` can be empty to hide.
 - `$LAYOUT[<str0>,<str1>,...]` format is available to replace indexed layouts. You can use settings from `hyprland.conf`, e.g. `$LAYOUT[en,ru,de]`. Also, single `!` character will hide layout. E.g. `$LAYOUT[!]` will hide default (0 indexed) and show others.
 - Variables seen above are parsed _before_ the command is ran.
 - **do not** run commands that never exit. This will hang the AsyncResourceGatherer and you won't have a good time.

## User Signals

- `SIGUSR1` - unlocks hyprlock. For example, you can switch to a another tty and run `pkill -USR1 hyprlock`.
- `SIGUSR2` - updates labels and images. See above.
