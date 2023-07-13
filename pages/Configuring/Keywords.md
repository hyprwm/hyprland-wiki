Keywords are not variables, but "commands" for more advanced configuring. On this
page, you will be presented with some that do not deserve their own page.

See the sidebar for more keywords to control binds, animations, monitors, et cetera.

{{< hint type=important >}}

Please remember, that for ALL arguments separated by a comma, if you want to
leave one of them empty, you cannot reduce the number of commas, _unless told
otherwise in a specific section_:

```ini
three_param_keyword = A, B, C # OK

three_param_keyword = A, C # NOT OK

three_param_keyword = A, , C # OK

three_param_keyword = A, B,  # OK
```

{{< /hint >}}

# Table of contents

{{< toc format=html >}}

# Executing

you can execute a shell script on startup of the compositor or on each time it's
reloaded.

`exec-once=command` will execute only on launch

`exec=command` will execute on each reload

# Defining variables

You can define your own custom variables like this:

```ini
$VAR = value
```

for example:

```ini
$MyFavoriteGame = Among Us
```

then, to use them, simply use them. For example:

```ini
col.active_border=$MyColor
```

You ARE allowed to do this:

```ini
col.active_border=ff$MyRedValue1111
```

# Sourcing (multi-file)

Use the `source` keyword to source another file.

For example, in your `hyprland.conf` you can:

```ini
source=~/.config/hypr/myColors.conf
```

And Hyprland will enter that file and parse it like a Hyprland config.

Please note it's LINEAR. Meaning lines above the `source=` will be parsed first,
then lines inside `~/.config/hypr/myColors.conf`, then lines below.

# Gestures

Use something like
[libinput-gestures](https://github.com/bulletmark/libinput-gestures), with
`hyprctl` if you want to expand Hyprland's gestures beyond what's offered in
[Variables](../Variables).

# Per-device input configs

Per-device config options will overwrite your options set in the `input`
section. It's worth noting that ONLY values explicitly changed will be
overwritten.

In order to apply per-device config options, make a new category like this:

```ini
device:name {

}
```

The `name` can be easily obtained by doing `hyprctl devices`.

Inside of it, put your config options. All options from the `input` category
(and all subcategories, e.g. `input:touchpad`) can be put inside, **EXCEPT**:

force_no_accel, follow_mouse, float_switch_override_focus, scroll_factor

Properties that change names:

```plain
touchdevice:transform -> transform
touchdevice:output -> output
```

You can also use the `output` setting for tablets to bind them to outputs. Remember to
use the name of the `Tablet` and not `Tablet Pad` or `Tablet tool`.

Additional properties only present in per-device configs:
```plain
enabled -> (only for mice / touchpads / keyboards) enables / disables the device (connects / disconnects from the on-screen cursor) - default: Enabled
```

Example config section:

```ini
device:royuan-akko-multi-modes-keyboard-b {
    repeat_rate=50
    repeat_delay=500
    middle_button_emulation=0
}
```

_remember about the space after the end of the device's name (before the `{`)!_

{{< hint type=info >}}
Per-device layouts will not alter the keybind keymap, so for example with a global keymap of `us`
and a per-device one of `fr`, the keybinds will still act as if you were on `us`.
{{< /hint >}}

# Wallpapers

The hyprland background you see when you first start Hyprland is **NOT A
WALLPAPER**, it's the default image rendered at the bottom of the render stack.

To set a wallpaper, use a wallpaper utility like
[hyprpaper](https://github.com/hyprwm/hyprpaper) or [swaybg](https://github.com/swaywm/swaybg). 

More can be found in [Useful Utilities](../../Useful-Utilities).

# Blurring layerSurfaces

LayerSurfaces are not windows. These are for example: Your wallpapers,
notification overlays, bars, etc.

If you really want to blur them, use a layerrule:

```ini
layerrule = blur,NAMESPACE
# or
layerrule = blur,address:0x<ADDRESS>
```

you can get the namespace / address from `hyprctl layers`.

To remove a layer rule (useful in dynamic situations) use:

```ini
layerrule = unset,<whatever you used before>
```

For example:

```ini
layerrule = unset,NAMESPACE
```

# Setting the environment

{{< hint type=note >}}
The `env` keyword works just like `exec-once`, meaning it will only fire once on Hyprland's launch.
{{< /hint >}}

You can use the `env` keyword to set environment variables at Hyprland's start, e.g.:
```ini
env = XCURSOR_SIZE,24
```

You can also add a `d` flag if you want the env var to be exported to D-Bus (systemd only)
```ini
envd = XCURSOR_SIZE,24
```

{{< hint type=important >}}
Hyprland puts the raw string to the envvar. You should _not_ add quotes around the values.

e.g.:
```ini
env = QT_QPA_PLATFORM,wayland
```

and ***NOT***
```ini
env = QT_QPA_PLATFORM,"wayland"
```
{{< /hint >}}