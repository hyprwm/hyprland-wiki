hyprlock is a simple, yet fast, multi-threaded and GPU-accelerated screen
lock for hyprland.

{{< toc >}}

## Configuration

### General

Variables in the `general` category:
| variable | description | type | default |
| -- | -- | -- | -- |
| disable_loading_bar | disables the loading bar on the bottom of the screen while hyprlock is booting up. | bool | false |

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

    position = 0, -20                    # position is added to the halign and valign props. For absolute, use "none" in either.
    halign = center                     # left, center, right, none
    valign = center                     # top, center, bottom, none
}
```

### Label

Draws a label.

Label text supports [pango markup](https://docs.gtk.org/Pango/pango_markup.html).

```ini
label {
    monitor =
    text = Hi there, $USER              # Supported variables: $USER
    color = rgba(200, 200, 200, 1.0)
    font_size = 25
    font_family = Noto Sans

    position = 0, 80                    # position is added to the halign and valign props. For absolute, use "none" in either.
    halign = center                     # left, center, right, none
    valign = center                     # top, center, bottom, none
}
```