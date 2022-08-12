
## Switchable keyboard layouts

An example of a switchable keyboard layout between US and RU, where you switch
between them with SUPER+A (SUPER+Ф)

```
bind=SUPER,A,exec,hyprctl keyword input:kb_layout ru
bind=SUPER,Cyrillic_ef,exec,hyprctl keyword input:kb_layout us
```

You can apply this to any number of languages, mix'n'match, etc.

Please note that if a keyboard layout has a different alphabet, mappings for "a"
"b" "c" will be replaced with mappings from that language. (meaning, e.g.
`SUPER+D` will not work on a `ru` layout, because the russian layout does not
have a `D`.)

If you are unsure about the key names of your chosen alphabet, refer to the
[xkbcommon keysym header](https://github.com/xkbcommon/libxkbcommon/blob/master/include/xkbcommon/xkbcommon-keysyms.h).
The keysym name in Hyprland is the XKB define name without the `XKB_KEY_`.

## Disabling keybinds with one master keybind

If you want to disable all keybinds with another keybind (make a kaybind toggle of sorts) you can just use a submap with only a keybind to exit it.

```
bind=MOD,KEY,submap,clean
submap=clean
bind=MOD,KEY,submap,reset
submap=reset
```