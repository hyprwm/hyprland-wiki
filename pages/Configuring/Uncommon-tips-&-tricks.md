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

You can also bind a key to execute `hyprctl switchxkblayout` for more keybind freedom.
See [Using hyprctl](../Using-hyprctl).

# Disabling keybinds with one master keybind

If you want to disable all keybinds with another keybind (make a keybind toggle
of sorts) you can just use a submap with only a keybind to exit it.

```ini
bind=MOD,KEY,submap,clean
submap=clean
bind=MOD,KEY,submap,reset
submap=reset
```

# Window Dancing

Some XWayland games like Rhythm Doctor and Friday Night Funkin' mods like to move 
the windows by themselves, but that often doesn't work by default.

For example, if you want to configure Rhythm Doctor, you'd have to:

1. Set input rules
```ini
input {
	# ...
	follow_mouse=0
	float_switch_override_focus=0
}
```

2. Set the windowrule

```ini
windowrule=windowdance,title:^(Rhythm Doctor)$
# windowrule=forceinput,title:^(Rhythm Doctor)$ # May also be needed
```

3. Have fun!

Click the GIF below to see a full demo video

[![Demo GIF of Rhythm Doctor](https://cdn.discordapp.com/attachments/810799100940255260/1032843745864986644/ezgif.com-gif-maker18.gif)](https://pool.jortage.com/voringme/misskey/565b9dfb-125f-4ea0-9257-b371cb4c7195.mp4)

## Shimeji

To use Shimeji programs like [this](https://codeberg.org/thatonecalculator/spamton-linux-shimeji), set the following rules:

```ini
windowrule=float, com-group_finity-mascot-Main
windowrule=noblur, com-group_finity-mascot-Main
windowrule=nofocus, com-group_finity-mascot-Main
windowrule=noshadow, com-group_finity-mascot-Main
windowrule=noborder, com-group_finity-mascot-Main
```

{{< hint >}}

The app indicator probably won't show, so you'll have to `killall -9 java` to kill them.

{{< /hint >}}

![Demo GIF of Spamton Shimeji](https://media.discordapp.net/attachments/810799100940255260/1032846469855727656/ezgif.com-gif-maker19.gif)
