---
weight: 18
title: Uncommon tips & tricks
---

## Switchable keyboard layouts

The easiest way to accomplish this is to set this using XKB settings, for
example:

```ini
input {
    kb_layout = us,cz
    kb_variant = ,qwerty
    kb_options = grp:alt_shift_toggle
}
```

Variants are set per layout.

{{< callout >}}

The first layout defined in the input section will be the one used for binds by
default.

For example: `us,ua` -> config binds would be e.g. `SUPER, A`, while on `ua,us`
-> `SUPER, Cyrillic_ef`

You can change this behavior globally or per-device by setting
`resolve_binds_by_sym = 1`. In that case, binds will activate when the symbol
typed matches the symbol specified in the bind.

For example: if your layouts are `us,fr` and have a bind for `SUPER, A` you'd
need to press the first letter on the second row while the `us` layout is active
and the first letter on the first row while the `fr` layout is active.

{{< /callout >}}

You can also bind a key to execute `hyprctl switchxkblayout` for more keybind
freedom. See [Using hyprctl](../Using-hyprctl).

To find the valid layouts and `kb_options`, you can check out the
`/usr/share/X11/xkb/rules/base.lst`. For example:

To get the layout name of a language:

```sh
grep -i 'persian' /usr/share/X11/xkb/rules/base.lst
```

To get the list of keyboard shortcuts you can put in the `kb_options` to toggle
keyboard layouts:

```sh
grep 'grp:.*toggle' /usr/share/X11/xkb/rules/base.lst
```

## Disabling keybinds with one master keybind

If you want to disable all keybinds with another keybind (make a keybind toggle
of sorts) you can just use a submap with only a keybind to exit it.

```ini
bind = MOD, KEY, submap, clean
submap = clean
bind = MOD, KEY, submap, reset
submap = reset
```

## Remap Caps-Lock to Ctrl

```ini
input {
    kb_options = ctrl:nocaps
}
```

## Swap Caps-Lock and Escape

```ini
input {
    kb_options = caps:swapescape
}
```

## Set F13-F24 as usual function keys

By default, F13-F24 are mapped by xkb as various "XF86" keysyms. These cause binding
issues in many programs. One example is OBS Studio, which does not detect the XF86
keysyms as usable keybindings, making you unable to use them for binds. This option
simply maps them back to the expected F13-F24 values, which are bindable as normal.

{{< callout >}}
This option was only added recently to `xkeyboard-config`. Please ensure you are on version
2.43 or greater for this option to do anything.
{{< /callout >}}

```ini
input {
    kb_options = fkeys:basic_13-24
}
```

## Minimize windows using special workspaces

This approach uses special workspaces to mimic the "minimize window" function, by using a single keybind to toggle the minimized state.
Note that one keybind can only handle one window.

```ini
bind = $mod, S, togglespecialworkspace, magic
bind = $mod, S, movetoworkspace, +0
bind = $mod, S, togglespecialworkspace, magic
bind = $mod, S, movetoworkspace, special:magic
bind = $mod, S, togglespecialworkspace, magic
```

## Minimize Steam instead of killing

Steam will exit entirely when its last window is closed using the `killactive`
dispatcher. To minimize Steam to tray, use the following script to close
applications:

```sh
if [ "$(hyprctl activewindow -j | jq -r ".class")" = "Steam" ]; then
    xdotool getactivewindow windowunmap
else
    hyprctl dispatch killactive ""
fi
```

## Shimeji

To use Shimeji programs like
[this](https://codeberg.org/thatonecalculator/spamton-linux-shimeji), set the
following rules:

```ini
windowrule = float, class:com-group_finity-mascot-Main
windowrule = noblur, class:com-group_finity-mascot-Main
windowrule = nofocus, class:com-group_finity-mascot-Main
windowrule = noshadow, class:com-group_finity-mascot-Main
windowrule = noborder, class:com-group_finity-mascot-Main
```

{{< callout type=info >}}

The app indicator probably won't show, so you'll have to `killall -9 java` to
kill them.

{{< /callout >}}

![Demo GIF of Spamton Shimeji](https://github.com/hyprwm/hyprland-wiki/assets/36706276/261afd03-bf41-4513-b72b-3483d43d418c)

## Toggle animations/blur/etc hotkey

For increased performance in games, or for less distractions at a keypress

1. create file
   `~/.config/hypr/gamemode.sh && chmod +x ~/.config/hypr/gamemode.sh` and add:

```bash
#!/usr/bin/env sh
HYPRGAMEMODE=$(hyprctl getoption animations:enabled | awk 'NR==1{print $2}')
if [ "$HYPRGAMEMODE" = 1 ] ; then
    hyprctl --batch "\
        keyword animations:enabled 0;\
        keyword decoration:shadow:enabled 0;\
        keyword decoration:blur:enabled 0;\
        keyword general:gaps_in 0;\
        keyword general:gaps_out 0;\
        keyword general:border_size 1;\
        keyword decoration:rounding 0"
    exit
fi
hyprctl reload
```

Edit to your liking of course. If animations are enabled, it disables all the
pretty stuff. Otherwise, the script reloads your config to grab your defaults.

2. Add this to your `hyprland.conf`:

```ini
bind = WIN, F1, exec, ~/.config/hypr/gamemode.sh
```

The hotkey toggle will be WIN+F1, but you can change this to whatever you want.
