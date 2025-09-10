---
weight: 9
title: Clipboard Managers
---

_Starting method:_ manual (`exec-once`)

Clipboard Managers provide a convenient way to organize and access previously
copied content, including both text and images.  
Some common ones include:

- [`cliphist`](https://github.com/sentriz/cliphist) - Utilizes Wayland with `wl-clipboard` and can store text,
images and any binary data.

- [`clipman`](https://github.com/chmouel/clipman) - Utilizes Wayland with `wl-clipboard` support and stores text only.

- [`clipvault`](https://github.com/rolv-apneseth/clipvault) - Utilizes Wayland with `wl-clipboard` and can store text, images and any binary data.  
Alternative to `cliphist` with a couple extra features (e.g. max age for entries, min/max entry length).

- [`clipse`](https://github.com/savedra1/clipse) - Utilizes Wayland with `wl-clipboard` support and runs from a single
binary.  
Stores text and images indefinitely, accessible via a nice TUI that can be bound to a floating window in your Hyprland config.  
Allows custom themes, image/text previews, multi-select, pinned items and more.

- [`copyq`](https://github.com/hluk/CopyQ) - Supports text, images, and various other formats. It offers searchable history, editing capabilities, and a scripting interface. You can also organize items into tabs and synchronize clipboards across different devices.

- [`wl-clip-persist`](https://github.com/Linus789/wl-clip-persist) - When copying something on Wayland, the copied data remains in the clipboard until the application that was copied from is closed; after that, the data disappears and can no longer be pasted.  
To fix this problem, you can use `wl-clip-persist` which will preserve the data in the clipboard after the application is closed.

## cliphist

Start by adding the following lines to your `~/.config/hypr/hyprland.conf`

```ini
exec-once = wl-paste --type text --watch cliphist store # Stores only text data
exec-once = wl-paste --type image --watch cliphist store # Stores only image data
```

Note that any of the above lines can be disabled based on your needs.

To bind `cliphist` to a hotkey and display it under `rofi`, `dmenu`, `wofi` or `fuzzel`,
you can edit it in `hyprland.conf`.

{{< tabs items="rofi,dmenu,wofi,fuzzel" >}}

{{< tab >}}
```ini
bind = SUPER, V, exec, cliphist list | rofi -dmenu -display-columns 2 | cliphist decode | wl-copy
```
{{< /tab >}}

{{< tab >}}
```ini
bind = SUPER, V, exec, cliphist list | dmenu | cliphist decode | wl-copy
```
{{< /tab >}}

{{< tab >}}
```ini
bind = SUPER, V, exec, cliphist list | wofi --dmenu --pre-display-cmd "echo '%s' | cut -f 2" | cliphist decode | wl-copy
```
{{< /tab >}}

{{< tab >}}
```ini
bind = $mainMod, V, exec, cliphist list | fuzzel --dmenu --with-nth 2 | cliphist decode | wl-copy
```
{{< /tab >}}

{{< /tabs >}}

The binds above bind `SUPER + V` to access the clipboard history.  
For further info, please refer to the program's GitHub repository linked above.

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

{{< tabs items="rofi,dmenu,wofi,fuzzel" >}}

{{< tab >}}
```ini
bind = SUPER, V, exec, clipman pick -t rofi
```
{{< /tab >}}

{{< tab >}}
```ini
bind = SUPER, V, exec, clipman pick -t dmenu
```
{{< /tab >}}

{{< tab >}}
```ini
bind = SUPER, V, exec, clipman pick -t wofi
```
{{< /tab >}}

{{< tab >}}
```ini
bind = SUPER, V, exec, clipman pick -t STDOUT | fuzzel --dmenu | wl-copy
```
{{< /tab >}}

{{< /tabs >}}

...and so on.  
For further information, please refer to the program's GitHub repository linked above.

## clipvault

Start by adding the following line(s) to your `~/.config/hypr/hyprland.conf`

```ini
exec-once = wl-paste --watch clipvault store # Stores text, image and any other binary data
# exec-once = wl-paste --type text --watch clipvault store # Stores only text data
# exec-once = wl-paste --type image --watch clipvault store # Stores only image data
# exec-once = wl-paste --watch clipvault store --min-entry-length 2 --max-entries 200 --max-entry-age 2d # Store any data, but with additional parameters
```

Note that you can uncomment any of the commented out lines above based on your needs. Refer to the setup
section in the project's GitHub repository linked above for more information.

To bind `clipvault` to a hotkey and display it using a picker of your choice (e.g. `rofi`, `dmenu`, `wofi`, etc.),
you can add one of the below keybinds to your `hyprland.conf`:

{{< tabs items="rofi,dmenu,wofi,fuzzel,tofi" >}}

{{< tab >}}
```ini
bind = SUPER, V, exec, clipvault list | rofi -dmenu -display-columns 2 | clipvault get | wl-copy
```
{{< /tab >}}

{{< tab >}}
```ini
bind = SUPER, V, exec, clipvault list | dmenu | clipvault get | wl-copy
```
{{< /tab >}}

{{< tab >}}
```ini
bind = SUPER, V, exec, clipvault list | wofi -S dmenu --pre-display-cmd "echo '%s' | cut -f 2" | clipvault get | wl-copy
```
{{< /tab >}}

{{< tab >}}
```ini
bind = $mainMod, V, exec, clipvault list | fuzzel --dmenu --with-nth 2 | clipvault get | wl-copy
```
{{< /tab >}}

{{< tab >}}
```ini
bind = $mainMod, V, exec, clipvault list | tofi | clipvault get | wl-copy
```
{{< /tab >}}

{{< /tabs >}}

The binds above bind `SUPER + V` to access the clipboard history.  
For further info, please refer to the program's GitHub repository linked above.

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

Replace `alacritty` with the terminal environment you use if necessary.  
The class is optional, but it's recommended to use a floating window to achieve more
GUI-like behavior.

For more details on `clipse`, please refer to its GitHub repo linked at the top
of the page.

## copyq

Start by adding the following lines to your `~/.config/hypr/hyprland.conf`

```ini
exec-once = copyq --start-server
```

If the main window of `copyq` cannot close or hide properly, try to enable its
"Hide main window" option in the Layout configuration tab in the Preferences
dialog.

## wl-clip-persist

Add the following line to `hyprland.conf`.  
No other changes are required. The basic wayland copy/paste mechanisms will now persist even when the source window is closed.

```ini
exec-once = wl-clip-persist --clipboard regular
```

Can also be applied to the primary selection (i.e. middle click to paste selection) too, but this is not recommended because the primary selection [has unintended side-effects for some GTK applications.](https://github.com/Linus789/wl-clip-persist#primary-selection-mode-breaks-the-selection-system-3)

```ini
exec-once = wl-clip-persist --clipboard primary
```
