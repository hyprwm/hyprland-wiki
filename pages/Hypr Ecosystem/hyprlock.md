---
weight: 4
title: hyprlock
---

hyprlock is a simple, yet fast, multi-threaded and GPU-accelerated screen lock
for Hyprland.

## Configuration

Configuration is done via the config file at `~/.config/hypr/hyprlock.conf`. It
is not required, but recommended. Without it, locking shows the current screen.

### Variable types

Hyprlock uses the following types in addition to [Hyprland's variable types](../../Configuring/Variables#Variable_types).

| type | description |
| -- | -- |
| layoutxy | vec2 with an optional `%` suffix, allowing users to specify sizes as percentages of the output size.  |

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

If you are not on hyprland, or your `XDG_CURRENT_DESKTOP` is not Hyprland, the fade out will be disabled and the value of your `no_fade_out` variable will be ignored.

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
- Supported image formats are png, jpg and webp (no animations though)

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

| variable | description | type | default |
|--|--|--|--|
| monitor | monitor to draw on | str | [[Empty]] |
| path | image path, `screenshot` or empty to fill with `color`  | str | [[Empty]] |
| color | fallback background color | color | rgba(17, 17, 17, 1.0) |
| blur_passes | the amount of passes to perform. 0 disables blurring | int | 0 |
| blur_size | blur size (distance) | int | 7 |
| noise | how much noise to apply | float | 0.0117 |
| contrast | contrast modulation for blur | float | 0.8916 |
| brightness | brightness modulation for blur | float | 0.8172 |
| vibrancy | Increase saturation of blurred colors | float | 0.1696 |
| vibrancy_darkness | How strong the effect of vibrancy is on dark areas | float | 0.05 |
| zindex | z-index of the widget | int | -1 |

{{< callout type=info >}}

Blur options are taken from hyprland.
See [Variables/#blur](../../Configuring/Variables/#blur).

{{< /callout >}}

{{% details title="Example background" closed="true" %}}

```ini
background {
    monitor =
    path = screenshot
    color = rgba(25, 20, 20, 1.0)
    blur_passes = 2
}
```

{{% /details %}}

### Image

&check; Shadowable

Draws an image.

If `path` is empty or missing, nothing will be shown.

| variable | description | type | default |
|--|--|--|--|
| monitor | monitor to draw on | str | [[Empty]] |
| path | image path | str | [[Empty]] |
| size | size scale based on the lesser side of the image | int | 150 |
| rounding | negative values result in a circle | int | -1 |
| border_size | border size | int | 0 |
| border_color | border color | gradient | rgba(221, 221, 221, 1.0) |
| rotate | rotation in degrees, counter-clockwise | int | 0 |
| reload_time | seconds between reloading, 0 to reload with SIGUSR2 | int | -1 |
| reload_cmd | command to get new path. if empty, old path will be used. don't run "follow" commands like tail -F | str | [[Empty]] |
| position | position of the image | layoutxy | 0, 0 |
| halign | horizontal alignment | str | center |
| valign | vertical alignment | str | center |
| zindex | z-index of the widget | int | 0 |

{{% details title="Example image" closed="true" %}}

```ini
image {
    monitor =
    path = /home/me/cutie.png
    size = 150
    rounding = 0 # no rounding

    position = 0, 200
    halign = center
    valign = center
}
```

{{% /details %}}

### Shape

&check; Shadowable

Draws a shape.

| variable | description | type | default |
|--|--|--|--|
| monitor | monitor to draw on | str | [[Empty]] |
| size | size of the shape | layoutxy | 100, 100 |
| color | color of the shape | color | rgba(17, 17, 17, 1.0) |
| rounding | negative values result in a circle | int | -1 |
| rotate | rotation in degrees, counter-clockwise | int | 0 |
| border_size | border size | int | 0 |
| border_color | border color | gradient | rgba(0, 207, 230, 1.0) |
| xray | if true, make a "hole" in the background (rectangle of specified size, no rotation) | bool | false |
| position | position of the shape | layoutxy | 0, 0 |
| halign | horizontal alignment | str | center |
| valign | vertical alignment | str | center |
| zindex | z-index of the widget | int | 0 |


{{% details title="Example shape" closed="true" %}}

```ini
shape {
    monitor =
    size = 360, 60
    color = rgba(0, 0, 0, 0.0) # no fill
    rounding = -1 # circle
    border_size = 4
    border_color = rgba(0, 207, 230, 1.0)

    position = 0, 80
    halign = center
    valign = center
}
```

{{% /details %}}

### Input Field

&check; Shadowable

Draws a password input field.

| variable | description | type | default |
|--|--|--|--|
| monitor | monitor to draw on | str | [[Empty]] |
| size | size of the input field. | layoutxy | 400, 90 |
| outline_thickness | thickness of the outline | int | 4 |
| dots_size | size of the dots. [0.2 - 0.8] | float | 0.25 |
| dots_spacing | spacing between dots. [-1.0 - 1.0] | float | 0.15 |
| dots_center | whether to center the dots. align left otherwise  | bool | true |
| dots_rounding | rounding of the dots | int | -1 |
| dots_fade_time | Milliseconds until a dot fully fades in | int | 200 |
| dots_text_format | text character(s) used for the input indicator, rounded rectangles are the default. | str | [[Empty]] |
| outer_color | border color | gradient | rgba(17, 17, 17, 1.0) |
| inner_color | color of the inner box | color | rgba(200, 200, 200, 1.0) |
| font_color | color of the font | color | rgba(10, 10, 10, 1.0) |
| font_family | font family | str | Noto Sans |
| fade_on_empty | fade the input field when empty | bool | true |
| fade_timeout | milliseconds before `fade_on_empty` is triggered | int | 2000 |
| placeholder_text | text rendered in the input box when it's empty | str | `<i>Input Password...</i>` |
| hide_input | render an input indicator similar to swaylock instead of dots when set to true | bool | false |
| rounding | -1 means complete rounding (circle/oval) | int | -1 |
| check_color | color accent when waiting for waiting for the authentication result | gradient | rgba(204, 136, 34, 1.0) |
| fail_color | color accent when authentication fails | gradient | rgba(204, 34, 34, 1.0) |
| fail_text | text rendered when authentication fails | str | `<i>$FAIL <b>($ATTEMPTS)</b></i>` |
| fail_timeout | milliseconds before `fail_text` and `fail_color` disappears | int | 2000 |
| fail_transition | transition time in ms between normal `outer_color` and `fail_color` | int | 300 |
| capslock_color | color accent when capslock is active | gradient | [[Empty]] |
| numlock_color | color accent when numlock is active | gradient | [[Empty]] |
| bothlock_color | color accent when both locks are active | gradient | [[Empty]] |
| invert_numlock | change color if numlock is off | bool | false |
| swap_font_color | swap font and inner colors on color change events | bool | false |
| position | position of the input field | layoutxy | 0, 0 |
| halign | horizontal alignment | str | center |
| valign | vertical alignment | str | center |
| zindex | z-index of the widget | int | 0 |

{{< callout type=info >}}

#### Colors information

When `outline_thickness` set to `0`, the color of the inner box will be changed instead of the outer.

Behaviour of `swap_font_color` is as follows:

- `outline_thickness` is `0`: if set, font color will be swapped with inner one on color change events (e.g. Caps-lock on or password check).
- `outline_thickness` is not `0`: if set, font and inner colors will be swapped on password check and authentication failure.
- `swap_font_color` will narrow the accent colors from a gradient to a single color by using the first specified color.

{{< /callout >}}

Available variables for `placeholder_text`:

- `$PROMPT` - prompt text provided by pam. Usually this will be "Password: ", but it depends on your pam configuration.

Available variables for `fail_text`:

- `$FAIL` - pam fail reason
- `$ATTEMPTS` - number of failed authentication attempts

{{% details title="Example input-field" closed="true" %}}

```ini
input-field {
    monitor =
    size = 20%, 5%
    outline_thickness = 3
    inner_color = rgba(0, 0, 0, 0.0) # no fill

    outer_color = rgba(33ccffee) rgba(00ff99ee) 45deg
    check_color=rgba(00ff99ee) rgba(ff6633ee) 120deg
    fail_color=rgba(ff6633ee) rgba(ff0066ee) 40deg

    font_color = rgb(143, 143, 143)
    fade_on_empty = false
    rounding = 15

    position = 0, -20
    halign = center
    valign = center
}
```
{{% /details %}}

### Label

&check; Shadowable

Draws a label.

| variable | description | type | default |
|--|--|--|--|
| monitor | monitor to draw on | str | [[Empty]] |
| text | text to render | str | Sample Text |
| text_align | multi-line text alignment inside label container. center/right or any value for default left. | str | center |
| color | color of the text | color | rgba(254, 254, 254, 1.0) |
| font_size | size of the font | int |16 |
| font_family | font family | str | Sans |
| rotate | rotation in degrees, counter-clockwise | int | 0 |
| position | position of the label | layoutxy | 0, 0 |
| halign | horizontal alignment | str | center |
| valign | vertical alignment | str | center |

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

{{% details title="Example label" closed="true" %}}

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

{{% /details %}}


## User Signals

- `SIGUSR1` - unlocks hyprlock. For example, you can switch to a another tty and run `pkill -USR1 hyprlock`.
- `SIGUSR2` - updates labels and images. See above.
