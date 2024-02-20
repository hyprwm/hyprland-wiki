hyprlock is a simple, yet fast, multi-threaded and GPU-accelerated screen
lock for hyprland.

{{< toc >}}

## Configuration

### General

Variables in the `general` category:
| variable | description | type | default |
| -- | -- | -- | -- |
| disable_loading_bar | disables the loading bar on the bottom of the screen while hyprlock is booting up. | bool | false |
| hide_cursor | hides the cursor instead of making it visible | bool | true |

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
- All rendered text supports [pango markup](https://docs.gtk.org/Pango/pango_markup.html).
   - Additionally hyprlock will parse `<br/>` for your convenience. (That's a linebreak) Remember to enable linebreaks in your spans with `allow_breaks="true"`.
- Positioning is done via halign, valign and position. Position is an added offset to the result of alignment.
   - halign: `left`, `center`, `right`, `none`. valign: `top`, `center`, `bottom`, `none`

### Background

Draws a background image or fills with color.

If `path` is empty or missing, will use `color`. Otherwise, the image will be used.

```ini
background {
    monitor =
    path = /home/me/someImage.png   # only png supported for now
    color = rgba(25, 20, 20, 1.0)
}
```

### Input Field

Draws a password input field.

```ini
input-field {
    monitor =
    size = 200, 50
    outline_thickness = 3
    outer_color = rgb(151515)
    inner_color = rgb(200, 200, 200)
    font_color = rgb(10, 10, 10)
    fade_on_empty = true
    placeholder_text = <i>Input Password...</i> # Text rendered in the input box when it's empty.

    position = 0, -20
    halign = center
    valign = center
}
```

### Label

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
