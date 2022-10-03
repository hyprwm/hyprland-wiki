This page documents all of the more advanced config options.

{{< hint type=important >}}

Please remember, that for ALL arguments separated by a comma, if you want to
leave one of them empty, you cannot reduce the number of commas, *unless told
otherwise in a specific section*:

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

{{< hint type=info >}}

There currently is a bug with the exec that makes the executed app
unable to die if killed, use `SIGKILL` (e.g. `killall name -9`) or launch from a
script (`exec-once=~/myscript.sh` and do `myapp &` in the script)

{{< /hint >}}

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

the `name` can be easily obtained by doing `hyprctl devices`.

Inside of it, put your config options. All options from the `input` category
(and all subcategories, e.g. `input:touchpad`) can be put inside, **EXCEPT**:

force_no_accel, follow_mouse, float_switch_override_focus

For example:

```ini
device:ROYUAN Akko Multi-modes Keyboard-B {
    repeat_rate=50
    repeat_delay=500
    middle_button_emulation=0
}
```

*remember about the space after the end of the device's name (before the `{`)!*

{{< hint type=tip >}}
With hyprctl, the category's spaces get turned into `-`, and everything is
lowercase. So, for `hyprctl` calls, do for example:
```sh
hyprctl keyword device:royuan-akko-multi-modes-keyboard-b:kb_layout us
```
{{< /hint >}}

# Wallpapers

The hyprland background you see when you first start Hyprland is **NOT A
WALLPAPER**, it's the default image rendered at the bottom of the render stack.

To set a wallpaper, use a wallpaper utility like
[hyprpaper](https://github.com/hyprwm/hyprpaper) or
[swaybg](https://github.com/swaywm/swaybg).

# Blurring layerSurfaces

LayerSurfaces are not windows. These are for example: Your wallpapers,
notification overlays, bars, etc.

If you really want to blur them, use `blurls=`

```ini
blurls=NAMESPACE
```

where `NAMESPACE` is the namespace of the layerSurface. (You can get it from
`hyprctl layers`)

to remove a namespace from being blurred (useful in dynamic situations) use:

```ini
blurls=remove,NAMESPACE
```
