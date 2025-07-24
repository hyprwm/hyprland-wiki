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

## Remapping Caps Lock

You can customize the behavior of the Caps Lock key using `kb_options`.

To view all available options related to Caps Lock, run:

```sh
grep 'caps' /usr/share/X11/xkb/rules/base.lst
```

For example, to remap Caps lock to Ctrl:

```ini
input {
    kb_options = ctrl:nocaps
}
```

To swap Caps Lock and Escape:

```ini
input {
    kb_options = caps:swapescape
}
```

You can also find additional `kb_options` unrelated to Caps Lock in `/usr/share/X11/xkb/rules/base.lst`.

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

## Show desktop

This approach uses same principle as the [Minimize windows using special workspaces](#minimize-windows-using-special-workspaces) section.
It moves all windows from current workspace to a special workspace named `desktop`.
Showing desktop state is remembered per workspace.

Create a script:

```sh
#!/bin/env sh

TMP_FILE="$XDG_RUNTIME_DIR/hyprland-show-desktop"

CURRENT_WORKSPACE=$(hyprctl monitors -j | jq '.[] | .activeWorkspace | .name' | sed 's/"//g')

if [ -s "$TMP_FILE-$CURRENT_WORKSPACE" ]; then
  readarray -d $'\n' -t ADDRESS_ARRAY <<< $(< "$TMP_FILE-$CURRENT_WORKSPACE")

  for address in "${ADDRESS_ARRAY[@]}"
  do
    CMDS+="dispatch movetoworkspacesilent name:$CURRENT_WORKSPACE,address:$address;"
  done

  hyprctl --batch "$CMDS"

  rm "$TMP_FILE-$CURRENT_WORKSPACE"
else
  HIDDEN_WINDOWS=$(hyprctl clients -j | jq --arg CW "$CURRENT_WORKSPACE" '.[] | select (.workspace .name == $CW) | .address')

  readarray -d $'\n' -t ADDRESS_ARRAY <<< $HIDDEN_WINDOWS

  for address in "${ADDRESS_ARRAY[@]}"
  do
    address=$(sed 's/"//g' <<< $address )

    if [[ -n address ]]; then
      TMP_ADDRESS+="$address\n"
    fi

    CMDS+="dispatch movetoworkspacesilent special:desktop,address:$address;"
  done

  hyprctl --batch "$CMDS"

  echo -e "$TMP_ADDRESS" | sed -e '/^$/d' > "$TMP_FILE-$CURRENT_WORKSPACE"
fi
```

then bind it:

```ini
  bind = $mainMod , D, exec, <PATH TO SCRIPT>
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

## Zoom

To zoom using Hyprland's built-in zoom utility
{{< callout >}}
If mouse wheel bindings work only for the first time, you should probably reduce reset time with `binds:scroll_event_delay`
{{< /callout >}}

```ini
bind = $mod, mouse_down, exec, hyprctl -q keyword cursor:zoom_factor $(hyprctl getoption cursor:zoom_factor | awk '/^float.*/ {print $2 * 1.1}')
bind = $mod, mouse_up, exec, hyprctl -q keyword cursor:zoom_factor $(hyprctl getoption cursor:zoom_factor | awk '/^float.*/ {new = $2 * 0.9; if (new < 1) new = 1; print new}')

binde = $mod, equal, exec, hyprctl -q keyword cursor:zoom_factor $(hyprctl getoption cursor:zoom_factor | awk '/^float.*/ {print $2 * 1.1}')
binde = $mod, minus, exec, hyprctl -q keyword cursor:zoom_factor $(hyprctl getoption cursor:zoom_factor | awk '/^float.*/ {new = $2 * 0.9; if (new < 1) new = 1; print new}')
binde = $mod, KP_ADD, exec, hyprctl -q keyword cursor:zoom_factor $(hyprctl getoption cursor:zoom_factor | awk '/^float.*/ {print $2 * 1.1}')
binde = $mod, KP_SUBTRACT, exec, hyprctl -q keyword cursor:zoom_factor $(hyprctl getoption cursor:zoom_factor | awk '/^float.*/ {new = $2 * 0.9; if (new < 1) new = 1; print new}')

bind = $mod SHIFT, mouse_up, exec, hyprctl -q keyword cursor:zoom_factor 1
bind = $mod SHIFT, mouse_down, exec, hyprctl -q keyword cursor:zoom_factor 1
bind = $mod SHIFT, minus, exec, hyprctl -q keyword cursor:zoom_factor 1
bind = $mod SHIFT, KP_SUBTRACT, exec, hyprctl -q keyword cursor:zoom_factor 1
bind = $mod SHIFT, 0, exec, hyprctl -q keyword cursor:zoom_factor 1
```

## Alt tab behaviour
To mimic DE's alt-tab behaviour. Here is an example that uses foot, fzf, [grim-hyprland](https://github.com/eriedaberrie/grim-hyprland) and chafa to the screenshot in the terminal.

![alttab](https://github.com/user-attachments/assets/2a260809-b1b0-4f72-8644-46cc9d8b8971)

Dependencies :
- foot
- fzf
- [grim-hyprland](https://github.com/eriedaberrie/grim-hyprland)
- chafa
- jq

1. add this to your config

```ini
exec-once = foot --server

bind = ALT, TAB, exec, $HOME/.config/hypr/scripts/alttab/enable.sh 'down'
bind = ALT SHIFT, TAB, exec, $HOME/.config/hypr/scripts/alttab/enable.sh 'up'

submap=alttab
bind = ALT, tab, sendshortcut, , tab, class:alttab
bind = ALT SHIFT, tab, sendshortcut, shift, tab, class:alttab

bindrt = ALT, ALT_L, exec, $XDG_CONFIG_HOME/hypr/scripts/alttab/disable.sh ; hyprctl -q dispatch sendshortcut , return,class:alttab
bindrt = ALT SHIFT, ALT_L, exec, $XDG_CONFIG_HOME/hypr/scripts/alttab/disable.sh ; hyprctl -q dispatch sendshortcut , return,class:alttab
bind = ALT, Return, exec, $XDG_CONFIG_HOME/hypr/scripts/alttab/disable.sh ; hyprctl -q dispatch sendshortcut , return, class:alttab
bind = ALT SHIFT, Return, exec, $XDG_CONFIG_HOME/hypr/scripts/alttab/disable.sh ; hyprctl -q dispatch sendshortcut , return, class:alttab
bind = ALT, escape, exec, $XDG_CONFIG_HOME/hypr/scripts/alttab/disable.sh ; hyprctl -q dispatch sendshortcut , escape,class:alttab
bind = ALT SHIFT, escape, exec, $XDG_CONFIG_HOME/hypr/scripts/alttab/disable.sh ; hyprctl -q dispatch sendshortcut , escape,class:alttab
submap = reset

workspace = special:alttab, gapsout:0, gapsin:0, bordersize:0
windowrule = noanim, class:alttab
windowrule = stayfocused, class:alttab
windowrule = workspace special:alttab, class:alttab
windowrule = bordersize 0, class:alttab
```

2. create file `touch $XDG_CONFIG_HOME/hypr/scripts/alttab/alttab.sh && chmod +x $XDG_CONFIG_HOME/hypr/scripts/alttab/alttab.sh` and add:

```bash {filename="alttab.sh"}
#!/usr/bin/env bash
start=$1
address=$(hyprctl -j clients | jq -r 'sort_by(.focusHistoryID) | .[] | select(.workspace.id >= 0) | "\(.address)\t\(.title)"' |
	      fzf --color prompt:green,pointer:green,current-bg:-1,current-fg:green,gutter:-1,border:bright-black,current-hl:red,hl:red \
		  --cycle \
		  --sync \
		  --bind tab:down,shift-tab:up,start:$start,double-click:ignore \
		  --wrap \
		  --delimiter=$'\t' \
		  --with-nth=2 \
		  --preview "$XDG_CONFIG_HOME/hypr/scripts/alttab/preview.sh {}" \
		  --preview-window=down:80% \
		  --layout=reverse |
	      awk -F"\t" '{print $1}')

if [ -n "$address" ] ; then
    hyprctl --batch -q "dispatch focuswindow address:$address ; dispatch alterzorder top"
fi

hyprctl -q dispatch submap reset
```

I chose to exclude windows that are in special workspaces but it can be modified by removing `select(.workspace.id >= 0)`

3. create file `touch $XDG_CONFIG_HOME/hypr/scripts/alttab/preview.sh && chmod +x $XDG_CONFIG_HOME/hypr/scripts/alttab/preview.sh` and add:

```bash {filename="preview.sh"}
#!/usr/bin/env bash
line="$1"

IFS=$'\t' read -r addr _ <<< "$line"
dim=${FZF_PREVIEW_COLUMNS}x${FZF_PREVIEW_LINES}

grim -t png -l 0 -w "$addr" ~.config/hypr/scripts/alttab/preview.png
chafa --animate false -s "$dim" "$XDG_CONFIG_HOME/hypr/scripts/alttab/preview.png"
```

4. create file `touch $XDG_CONFIG_HOME/hypr/scripts/alttab/disable.sh && chmod +x $XDG_CONFIG_HOME/hypr/scripts/alttab/disable.sh` and add:

```bash {filename="disable.sh"}
#!/usr/bin/env bash
hyprctl -q keyword animations:enabled true

hyprctl -q --batch "keyword unbind ALT, TAB ; keyword unbind ALT SHIFT, TAB ; keyword bind ALT, TAB, exec, $HOME/.config/hypr/scripts/alttab/enable.sh 'down' ; keyword bind ALT SHIFT, TAB, exec, $HOME/.config/hypr/scripts/alttab/enable.sh 'up'"
```

5. create file `touch $XDG_CONFIG_HOME/hypr/scripts/alttab/enable.sh && chmod +x $XDG_CONFIG_HOME/hypr/scripts/alttab/enable.sh` and add:
```bash {filename="enable.sh"}
#!/usr/bin/env bash
hyprctl -q --batch "keyword animations:enabled false ; dispatch exec footclient -a alttab ~/.config/hypr/scripts/alttab/alttab.sh $1 ; keyword unbind ALT, TAB ; keyword unbind ALT SHIFT, TAB ; dispatch submap alttab"
```
