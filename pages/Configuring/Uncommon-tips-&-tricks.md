# Switchable keyboard layouts

The easiest way to accomplish this is to set this using XKB settings, for example:

```
input {
    kb_layout = us,pl
    kb_options = grp:alt_shift_toggle
}
```

{{< hint type=important >}}

The first layout defined in the input section will be the one used for binds.

For example: `us,ua` -> config binds would be e.g. `SUPER, A`, while on `ua,us` -> `SUPER, Cyrillic_ef`

{{< /hint >}}

# Disabling keybinds with one master keybind

If you want to disable all keybinds with another keybind (make a kaybind toggle
of sorts) you can just use a submap with only a keybind to exit it.

```ini
bind=MOD,KEY,submap,clean
submap=clean
bind=MOD,KEY,submap,reset
submap=reset
```
