---
weight: 9
title: Clipboard managers
---

_Starting method:_ manual (`exec-once`)

Clipboard Managers provide a convenient way to organize and access previously
copied content, including both text and images.

Some common ones used are `copyq`, `clipman`, `cliphist`, `clipse`.

`clipman` - Utilizes Wayland with `wl-clipboard` support and stores text only
[GitHub](https://github.com/chmouel/clipman)

`cliphist` - Utilizes Wayland with `wl-clipboard` and can store both images and
text [GitHub](https://github.com/sentriz/cliphist)

`wl-clip-persist` - When copying something on Wayland, the copied data remains
in the clipboard until the application that was copied from is closed.
After that, the data disappears and can no longer be pasted.
To fix this problem, you can use `wl-clip-persist` which will preserve the data
in the clipboard after the application is closed.
[GitHub](https://github.com/Linus789/wl-clip-persist)

`clipse` - Utilizes Wayland with `wl-clipboard` support and runs from a single
binary. Stores text and images indefinitely, accessible via a nice TUI that can
be bound to a floating window in your Hyprland config. Allows custom themes,
image/text previews, multi-select, pinned items and more.
[GitHub](https://github.com/savedra1/clipse)

## copyq

Start by adding the following lines to your `~/.config/hypr/hyprland.conf`

```ini
exec-once = copyq --start-server
```

If the main window of `copyq` cannot close/hide properly, try to enable its
"Hide main window" option in the Layout configuration tab in the Preferences
dialog.

## cliphist

Start by adding the following lines to your `~/.config/hypr/hyprland.conf`

```ini
exec-once = wl-paste --type text --watch cliphist store # Stores only text data

exec-once = wl-paste --type image --watch cliphist store # Stores only image data
```

Note that any of the above lines can be disabled based on your needs.

To bind `cliphist` to a hotkey and display it under `rofi`, `dmenu`, `wofi` or `fuzzel`,
you can edit it in `hyprland.conf`.

### For `rofi` users

```ini
bind = SUPER, V, exec, cliphist list | rofi -dmenu | cliphist decode | wl-copy
```

### For `dmenu` users

```ini
bind = SUPER, V, exec, cliphist list | dmenu | cliphist decode | wl-copy
```

### For `wofi` users

```ini
bind = SUPER, V, exec, cliphist list | wofi --dmenu | cliphist decode | wl-copy
```

### For `fuzzel` users

```ìni
bind = SUPER, V, exec, cliphist list | fuzzel --dmenu | cliphist decode | wl-copy
```

The binds above allow `SUPER + V` to be used to access the clipboard history.

For further info, please refer to the repository mentioned above.

## clipman

Start by adding the following line to your `hyprland.conf`

```ini
exec-once = wl-paste -t text --watch clipman store --no-persist
```

If you wish to use it as a primary clipboard manager, use this instead:

```ini
exec-once = wl-paste -p -t text --watch clipman store -P --histpath="~/.local/share/clipman-primary.json"
```

Ensure that `~/.local/share/clipman-primary.json` is already created.

Now you can bind `clipman` like this:

### For `rofi` users

```ini
bind = SUPER, V, exec, clipman pick -t rofi
```

### For `dmenu` users

```ini
bind = SUPER, V, exec, clipman pick -t dmenu
```

### For `wofi` users

```ini
bind = SUPER, V, exec, clipman pick -t wofi
```

### For `fuzzel` users

```ìni
bind = SUPER, V, exec, clipman pick -t STDOUT | fuzzel --dmenu | wl-copy
```

...and so on. For further information, please refer to the repository
mentioned above.

## clipse

Start by adding the following line to your `hyprland.conf`

```ini
exec-once = clipse -listen
```

You can bind the TUI to a something nice like this:

```ini
windowrule = float, class:(clipse)
windowrule = size 622 652, class:(clipse)
windowrule = stayfocused, class:(clipse)

bind = SUPER, V, exec, alacritty --class clipse -e clipse
```

Replace `alacritty` with the terminal environment you use if necessary. The
class is optional, but it's recommended to use a floating window to achieve more
GUI-like behavior.

For more details on `clipse`, please refer to its GitHub repo linked at the top
of the page.
