---
weight: 5
title: hyprlock
---

hyprlock is a simple, yet fast, multi-threaded and GPU-accelerated screen lock
for Hyprland.

> [!WARNING]
> Hyprlock does not automatically create a config, and without one, hyprlock will _not render anything_.
> But even without a config, your session will get locked and thus Hyprland will cover your session with a black screen.
> You can unlock normally by typing your password followed by hitting Enter, but you won't have any visual feedback.
> 
> You can use the example config for a quick start, which can be found [here](https://github.com/hyprwm/hyprlock/blob/main/assets/example.conf).

## Commandline arguments

See also: `hyprlock --help`.

| argument | description |
| -- | -- |
| -v, \--verbose | Enable verbose logging |
| -q, \--quiet | Disable logging |
| -c FILE, \--config FILE | Specify config file to use |
| \--display NAME | Specify the wayland display to connect to |
| \--grace SECONDS | Set grace period in seconds before requiring authentication |
| \--immediate-render | Do not wait for resources before drawing the background (Same as `general:immediate_render`) |
| \--no-fade-in | Disable the fade-in animation when the lock screen appears |
| -V, \--version | Show version information and exit |
| -h, \--help | Show help and exit |

## Configuration

Configuration is done via the config file at `~/.config/hypr/hyprlock.conf`. This file must exist to run `hyprlock`.

### Variable types

Hyprlock uses the following types in addition to [Hyprland's variable types](../../Configuring/Variables#Variable_types).

| type | description |
| -- | -- |
| layoutxy | vec2 with an optional `%` suffix, allowing users to specify sizes as percentages of the output size. Floats (e.g. 10.5) are supported, but only have an effect when used with `%`. Raw pixel values will just get rounded. |

### General

Variables in the `general` category:

| variable | description | type | default |
| -- | -- | -- | -- |
| hide_cursor | hides the cursor instead of making it visible | bool | false |
| ignore_empty_input | skips validation when no password is provided | bool | false |
| immediate_render | makes hyprlock immediately start to draw widgets. Backgrounds will render `background:color` until their `background:path` resource is available | bool | false |
| text_trim | sets if the text should be trimmed, useful to avoid trailing newline in commands output | bool | true |
| fractional_scaling | whether to use fractional scaling. 0 - disabled, 1 - enabled, 2 - auto | int | 2 |
| screencopy_mode | selects screencopy mode. 0 - gpu accelerated, 1 - cpu based (slow) | int | 0 |
| fail_timeout | milliseconds until the ui resets after a failed auth attempt | int | 2000 |

### Authentication

Variables in the `auth` category:

| variable | description | type | default |
| -- | -- | -- | -- |
| pam:enabled | whether to enable pam authentication | bool | true |
| pam:module | sets the pam module used for authentication. If the module isn't found in `/etc/pam.d`, "su" will be used as a fallback | str | hyprlock |
| fingerprint:enabled | enables parallel fingerprint auth with fprintd. | bool | false |
| fingerprint:ready_message | sets the message that will be displayed when fprintd is ready to scan a fingerprint. | str | (Scan fingerprint to unlock) |
| fingerprint:present_message | sets the message that will be displayed when a finger is placed on the scanner. | str | Scanning fingerprint |
| fingerprint:retry_delay | sets the delay in ms after an unrecognized finger is scanned before another finger can be scanned. | int | 250 |

> [!NOTE]
> At least one enabled authentication method is required.

### Animations

Variables in the `animations` category:

| variable | description | type | default |
| -- | -- | -- | -- |
| enabled | whether to enable animations | bool | true |

#### Keywords

The `animation` and `bezier` keywords can be used just like in `hyprland.conf`.

For Example:
```ini
bezier = linear, 1, 1, 0, 0
animation = fade, 1, 1.8, linear
```

Available animations can be found in the [animation tree](#animation-tree).
The optional `STYLE` parameter for the `animation` keyword is currently unused by hyprlock.

Check out Hyprland's [animation documentation](../../Configuring/Animations) for more information.

#### Animation tree

```txt
global
  ↳ fade
    ↳ fadeIn - fade to lockscreen
    ↳ fadeOut - fade back to the wayland session
  ↳ inputField
    ↳ inputFieldColors - fade between colors and gradients
    ↳ inputFieldFade - fade_on_empty animation
    ↳ inputFieldWidth - adaptive width animation
    ↳ inputFieldDots - fade in/out for individual dots in the input field
```

### System Configuration

On Arch Linux, by default, hyprlock integrates with [pambase](https://archlinux.org/packages/?name=pambase) through `pam_faillock.so`, which forces a 10 minute timeout after 3 failed unlocks. If you would like to change this, refer to the [arch linux wiki](https://wiki.archlinux.org/title/Security#Lock_out_user_after_three_failed_login_attempts) and update the file `/etc/security/faillock.conf` file with parameters `unlock_time`, `fail_interval`, and `deny` as needed.

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

### Monitor selection
`monitor` is available for all widgets and can be left empty for "all monitors".

It takes the same string that is used to reference monitors in the hyprland configuration.
So either use the portname (e.g. `eDP-1`) or the monitor description (e.g. `desc:Chimei Innolux Corporation 0x150C`).

See [Monitors](../../Configuring/Monitors).

### Variable substitution
The following variables in widget text options will be substituted.

- `$USER` - username (e.g. linux-user)
- `$DESC` - user description (e.g. Linux User)
- `$TIME` - current time in 24-hour format (e.g. `13:37`)
- `$TIME12` - current time in 12-hour format (e.g. `1:37 PM`)
- `$LAYOUT` - current keyboard layout
- `$ATTEMPTS` - failed authentication attempts
- `$FAIL` - last authentication fail reason
- `$PAMPROMPT` - pam auth last prompt
- `$PAMFAIL` - pam auth last fail reason
- `$FPRINTPROMPT` - fingerprint auth last prompt
- `$FPRINTFAIL` - fingerprint auth last fail reason

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
  - percentages: `10%, 10.5%`
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

### Clickable

Some widgets are clickable. Namely `label`, `image` and `shape`.
You can launch arbitrary commands when clicking on them by configuring the following option within the widget:

| variable | description | type | default |
| -- | -- | -- | -- |
| onclick | command to run when clicked | str | [[Empty]] |

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
| reload_time | seconds between reloading, 0 to reload with SIGUSR2. Ignored if `path` is `screenshot`. | int | -1 |
| reload_cmd | command to get new path. If empty, old path will be used. | str | [[Empty]] |
| crossfade_time | cross-fade time in seconds between old and new background on reload. A negative value means no cross-fade. | float | -1.0 |
| zindex | z-index of the widget | int | -1 |

> [!NOTE]
> Blur options are taken from hyprland.
> See [Variables/#blur](../../Configuring/Variables/#blur).

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
&check; Clickable

Draws an image.

If `path` is empty or missing, nothing will be shown.

| variable | description | type | default |
|--|--|--|--|
| monitor | monitor to draw on | str | [[Empty]] |
| path | image path | str | [[Empty]] |
| size | size scale based on the lesser side of the image | int | 150 |
| rounding | negative values result in a circle | int | -1 |
| border_size | border size | int | 4 |
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
&check; Clickable

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
| dots_text_format | text character(s) used for the input indicator, rounded rectangles are the default. | str | [[Empty]] |
| outer_color | border color | gradient | rgba(17, 17, 17, 1.0) |
| inner_color | color of the inner box | color | rgba(200, 200, 200, 1.0) |
| font_color | color of the font | color | rgba(10, 10, 10, 1.0) |
| font_family | font family | str | Noto Sans |
| fade_on_empty | fade the input field when empty | bool | true |
| fade_timeout | milliseconds before `fade_on_empty` is triggered | int | 2000 |
| placeholder_text | text rendered in the input box when it's empty | str | `<i>Input Password...</i>` |
| hide_input | render an input indicator similar to swaylock instead of dots when set to true | bool | false |
| hide_input_base_color | this color's hue is randomly rotated (oklab color space) to get colors for `hide_input` | color | rgba(153, 170, 187) |
| rounding | -1 means complete rounding (circle/oval) | int | -1 |
| check_color | color accent when waiting for the authentication result | gradient | rgba(204, 136, 34, 1.0) |
| fail_color | color accent when authentication fails | gradient | rgba(204, 34, 34, 1.0) |
| fail_text | text rendered when authentication fails | str | `<i>$FAIL <b>($ATTEMPTS)</b></i>` |
| capslock_color | color accent when capslock is active | gradient | [[Empty]] |
| numlock_color | color accent when numlock is active | gradient | [[Empty]] |
| bothlock_color | color accent when both locks are active | gradient | [[Empty]] |
| invert_numlock | change color if numlock is off | bool | false |
| swap_font_color | swap font and inner colors on color change events | bool | false |
| position | position of the input field | layoutxy | 0, 0 |
| halign | horizontal alignment | str | center |
| valign | vertical alignment | str | center |
| zindex | z-index of the widget | int | 0 |

> [!NOTE] **Colors information**
>
> When `outline_thickness` set to `0`, the color of the inner box will be changed instead of the outer.   
> Behaviour of `swap_font_color` is as follows:  
> - `outline_thickness` is `0`: if set, font color will be swapped with inner one on color change events (e.g. Caps-lock on or password check).
> - `outline_thickness` is not `0`: if set, font and inner colors will be swapped on password check and authentication failure.
> - `swap_font_color` will narrow the accent colors from a gradient to a single color by using the first specified color.

`placeholder_text` and `fail_text` both support [variable substitution](#variable-substitution).

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
&check; Clickable

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


#### Dynamic labels

The `text` option supports [variable substitution](#variable-substitution) and launching shell commands. For example:

```ini
text = cmd[update:1000] echo "<span foreground='##ff2222'>$(date)</span>"
```

Worth noting:

- `update:` - time is in ms.
- label can be forcefully updated by specifying `update:<time>:1` or `update:<time>:true` and sending `SIGUSR2` to hyprlock. `<time>` can be `0` in this case.
- `$ATTEMPTS[<string>]` format can be used to show `<string>` when there are no failed attempts. You can use pango-markup here. `<string>` can be empty to hide.
- `$LAYOUT[<str0>,<str1>,...]` format is available to replace indexed layouts. You can use settings from `hyprland.conf`, e.g. `$LAYOUT[en,ru,de]`. Also, single `!` character will hide layout. E.g. `$LAYOUT[!]` will hide default (0 indexed) and show others.
- `$TIME` and `$TIME12` will use timezone from TZ environment variable. If it's not set, system timezone will be used, falling back to UTC in case of errors.
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
