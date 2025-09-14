---
weight: 5
title: Binds
---

## Basic

```ini
bind = MODS, key, dispatcher, params
```

for example,

```ini
bind = SUPER_SHIFT, Q, exec, firefox
```

will bind opening Firefox to <key>SUPER</key> + <key>SHIFT</key> + <key>Q</key>

{{< callout type=info >}}

For binding keys without a modkey, leave it empty:

```ini
bind = , Print, exec, grim
```

{{< /callout >}}

_For a complete mod list, see [Variables](../Variables/#variable-types)._

_The dispatcher list can be found in
[Dispatchers](../Dispatchers/#list-of-dispatchers)._

## Uncommon syms / binding with a keycode

See the
[xkbcommon-keysyms.h header](https://github.com/xkbcommon/libxkbcommon/blob/master/include/xkbcommon/xkbcommon-keysyms.h)
for all the keysyms. The name you should use is the segment after `XKB_KEY_`.

If you want to bind by a keycode, you can put it in the KEY position with
a `code:` prefix, e.g.:

```ini
bind = SUPER, code:28, exec, amongus
```

This will bind <key>SUPER</key> + <key>t</key> since <key>t</key> is keycode 28.

{{< callout type=info >}}

If you are unsure of what your key's name or keycode is, you can use [`wev`](https://github.com/jwrdegoede/wev) to find out.

{{< /callout >}}

## Misc

### Workspace bindings on non-QWERTY layouts

Keys used for keybinds need to be accessible without any modifiers in your layout.  
For instance, the [French AZERTY](https://en.wikipedia.org/wiki/AZERTY) layout uses <key>SHIFT</key> + _`unmodified key`_ to write `0-9` numbers. As such, the workspace keybinds for this layout need to use the names of the _`unmodified keys`_ , and will not work when using the `0-9` numbers.

{{< callout type=info >}}

To get the correct name for an `unmodified_key`, refer to [the section on uncommon syms](#uncommon-syms--binding-with-a-keycode)

{{< /callout >}}

```ini
# On a French layout, instead of:
# bind = $mainMod, 1, workspace,  1

# Use
bind = $mainMod, ampersand, workspace,  1
```

For help configuring the French AZERTY layout, see this [article](https://rherault.dev/articles/hyprland-fr-layout).

### Unbind

You can also unbind a key with  the `unbind` keyword, e.g.:

```ini
unbind = SUPER, O
```

This may be useful for dynamic keybindings with `hyprctl`, e.g.:

```bash
hyprctl keyword unbind SUPER, O
```

{{< callout type=info >}}
In `unbind`, key is case-sensitve It must exactly match the case of the `bind` you are unbinding.

```ini
bind = SUPER, TAB, workspace, e+1
unbind = SUPER, Tab # this will NOT unbind
unbind = SUPER, TAB # this will unbind
```

{{< /callout >}}

## Bind flags

`bind` supports flags in this format:

```ini
bind[flags] = ...
```

e.g.:

```ini
bindrl = MOD, KEY, exec, amongus
```

Available flags:

| Flag | Name | Description |
|------|------|-------------|
| `l` | locked | Will also work when an input inhibitor (e.g. a lockscreen) is active. |
| `r` | release | Will trigger on release of a key. |
| `c` | click | Will trigger on release of a key or button as long as the mouse cursor stays inside `binds:drag_threshold`. |
| `g` | drag | Will trigger on release of a key or button as long as the mouse cursor moves outside `binds:drag_threshold`. |
| `o` | long press | Will trigger on long press of a key. |
| `e` | repeat | Will repeat when held. |
| `n` | non-consuming | Key/mouse events will be passed to the active window in addition to triggering the dispatcher. |
| `m` | mouse | See the dedicated [Mouse Binds](#mouse-binds) section. |
| `t` | transparent | Cannot be shadowed by other binds. |
| `i` | ignore mods | Will ignore modifiers. |
| `s` | separate | Will arbitrarily combine keys between each mod/key, see [Keysym combos](#keysym-combos). |
| `d` | has description | Will allow you to write a description for your bind. |
| `p` | bypass | Bypasses the app's requests to inhibit keybinds. |

Example Usage:

```ini
# Example volume button that allows press and hold, volume limited to 150%
binde = , XF86AudioRaiseVolume, exec, wpctl set-volume -l 1.5 @DEFAULT_AUDIO_SINK@ 5%+

# Example volume button that will activate even while an input inhibitor is active
bindl = , XF86AudioLowerVolume, exec, wpctl set-volume @DEFAULT_AUDIO_SINK@ 5%-

# Open wofi on first press, closes it on second
bindr = SUPER, SUPER_L, exec, pkill wofi || wofi

# Describe a bind
bindd = SUPER, Q, Open my favourite terminal, exec, kitty

# Skip player on long press and only skip 5s on normal press
bindo = SUPER, XF86AudioNext, exec, playerctl next
bind = SUPER, XF86AudioNext, exec, playerctl position +5
```

### Mouse buttons

You can also bind or unbind mouse buttons by prefacing the mouse keycode with `mouse:`, e.g.:

```ini
bind = SUPER, mouse:272, exec, amongus  # bind `exec amogus` to SUPER + LMB.
```

### Binding modkeys only

To only bind modkeys, you need to use the TARGET modmask (with the
activating mod) and the `r` flag, e.g.:

```ini
bindr = SUPER ALT, Alt_L, exec, amongus  # bind `exec amongus` to SUPER + ALT.
```

### Keysym combos

For an arbitrary combination of multiple keys, separate keysyms with `&` between
each mod/key, and use the `s` flag, e.g.:

```ini
# You can use a single mod with multiple keys.
binds = Control_L, A&Z, exec, kitty
# You can also specify multiple specific mods.
binds = Control_L&Shift_L, K, exec, kitty
# You can also do both!
binds = Control_R&Super_R&Alt_L, J&K&L, exec, kitty
# If you are feeling a little wild... you can use other keys for binds...
binds = Escape&Apostrophe&F7, T&O&A&D, exec, battletoads 2: retoaded
```

{{< callout type=info >}}

Please note that this is only valid for keysyms and it makes all mods keysyms.  
If you don't know what a keysym is use `wev` and press the key you want to use.

{{< /callout >}}

### Mouse wheel

You can also bind mouse wheel events with `mouse_up` and `mouse_down` (or
`mouse_left` and `mouse_right` if your mouse supports horizontal scrolling):

```ini
bind = SUPER, mouse_down, workspace, e-1
```

{{< callout type=info >}}

You can control the reset time with `binds:scroll_event_delay`.

{{< /callout >}}

### Switches

Switches are useful for binding events like closing and opening a laptop's lid:

```ini
# Trigger when the switch is toggled.
bindl = , switch:[switch name], exec, swaylock
# Trigger when the switch is turning on.
bindl = , switch:on:[switch name], exec, hyprctl keyword monitor "eDP-1, disable"
# Trigger when the switch is turning off.
bindl = , switch:off:[switch name], exec, hyprctl keyword monitor "eDP-1, 2560x1600, 0x0, 1"
```

{{< callout type=warning >}}

Systemd `HandleLidSwitch` settings in `logind.conf` may conflict with Hyprland's laptop lid switch configurations.

{{< /callout >}}

{{< callout type=info >}}

You can view your switches with `hyprctl devices`.

{{< /callout >}}

### Multiple binds to one key

You can trigger multiple actions with the same keybind by assigning it multiple times, with different `disapatcher`s and `param`s:

```ini
# To switch between windows in a floating workspace:
bind = SUPER, Tab, cyclenext         # Change focus to another window
bind = SUPER, Tab, bringactivetotop  # Bring it to the top
```

{{< callout type=warning >}}

The keybinds will be executed top to bottom, in the order they were written in.

{{< /callout >}}

### Description

You can describe your keybind with the `d` flag.  
Your description always goes in front of the `dispatcher`, and must not include commas (`,`)!

```ini
bindd = MODS, key, description, dispatcher, params
```

For example:

```ini
bindd = SUPER, Q, Open my favourite terminal, exec, kitty
```

If you want to access your description you can use `hyprctl binds`.  
For more information have a look at [Using Hyprctl](../Using-hyprctl).

## Mouse Binds

These are binds that rely on mouse movement. They will have one less arg.  
`binds:drag_threshold` can be used to differentiate between clicks and drags with the same button:

```ini
binds {
    drag_threshold = 10  # Fire a drag event only after dragging for more than 10px
}
bindm = ALT, mouse:272, movewindow      # ALT + LMB: Move a window by dragging more than 10px.
bindc = ALT, mouse:272, togglefloating  # ALT + LMB: Floats a window by clicking
```

Available mouse binds:

| Name | Description | Params |
| ---- | ----------- | ------ |
| movewindow | moves the active window | None |
| resizewindow | resizes the active window | `1` -> Resize and keep window aspect ratio. <br> `2` -> Resize and ignore `keepaspectratio` window rule/prop. <br> None or anything else for normal resize |

Common mouse button key codes (check `wev` for other buttons):

```txt
LMB -> 272
RMB -> 273
RMB -> 274
```

{{< callout type=info >}}

Mouse binds, despite their name, behave like normal binds.  
You are free to use whatever keys / mods you please. When held, the mouse function will be
activated.

{{< /callout >}}

### Touchpad

As clicking and moving the mouse on a touchpad is unergonomic, you can also use keyboard keys instead of mouse clicks.

```ini
bindm = SUPER, mouse:272, movewindow
bindm = SUPER, Control_L, movewindow
bindm = SUPER, mouse:273, resizewindow
bindm = SUPER, ALT_L, resizewindow
```

## Global Keybinds

### Classic

Yes, you heard this right, Hyprland does support global keybinds for _ALL_ apps,
including OBS, Discord, Firefox, etc.

See the [`pass`](../Dispatchers/#list-of-dispatchers) and
[`sendshortcut`](../Dispatchers/#list-of-dispatchers) dispatchers for keybinds.

Let's take OBS as an example: the "Start/Stop Recording" keybind is set to
<key>SUPER</key> + <key>F10</key>, to make it work globally, simply add:

```ini
bind = SUPER, F10, pass, class:^(com\.obsproject\.Studio)$
```

to your config and you're done.

`pass` will pass the `PRESS` and `RELEASE` events by itself, no need for a `bindr`.  
This also means that push-to-talk will work flawlessly with one `pass`, e.g.:

```ini
bind = , mouse:276, pass, class:^(TeamSpeak 3)$  # Pass MOUSE5 to TeamSpeak3.
```

You may also add shortcuts, where other keys are passed to the window.

```ini
bind = SUPER, F10, sendshortcut, SUPER, F4, class:^(com\.obsproject\.Studio)$  # Send SUPER + F4 to OBS when SUPER + F10 is pressed.
```

{{< callout type=warning >}}

This works flawlessly with all native Wayland applications, however, XWayland is a bit wonky.  
Make sure that what you're passing is a "global Xorg keybind", otherwise passing from a different XWayland app may not work.

{{< /callout >}}

### DBus Global Shortcuts

Some applications may already support the GlobalShortcuts portal in
xdg-desktop-portal.  
If that's the case, it's recommended to use the following method instead of `pass`:

Open your desired app and run `hyprctl globalshortcuts` in a terminal.  
This will give you a list of currently registered shortcuts with their description(s).

Choose whichever you like, for example `coolApp:myToggle`, and bind it to
whatever you want with the `global` dispatcher:

```ini
bind = SUPERSHIFT, A, global, coolApp:myToggle
```

{{< callout type=info >}}

Please note that this function will _only_ work with
[XDPH](../../Hypr-Ecosystem/xdg-desktop-portal-hyprland).

{{</ callout >}}

## Submaps

Keybind submaps, also known as _modes_ or _groups_, allow you to activate a
separate set of keybinds.  
For example, if you want to enter a `resize` _mode_ that allows you to resize windows with the arrow keys, you can do it like this:

```ini
# Switch to a submap called `resize`.
bind = ALT, R, submap, resize

# Start a submap called "resize".
submap = resize

# Set repeatable binds for resizing the active window.
binde = , right, resizeactive, 10 0
binde = , left, resizeactive, -10 0
binde = , up, resizeactive, 0 -10
binde = , down, resizeactive, 0 10

# Use `reset` to go back to the global submap
bind = , escape, submap, reset

# Reset the submap, which will return to the global submap
submap = reset

# Keybinds further down will be global again...
```

{{< callout type=warning >}}

Do not forget a keybind (`escape`, in this case) to reset the keymap while inside it!

If you get stuck inside a keymap, you can use `hyprctl dispatch submap reset` to go back.  
If you do not have a terminal open, tough luck buddy. You have been warned.

{{< /callout >}}

You can also set the same keybind to perform multiple actions, such as resize
and close the submap, like so:

```ini
bind = ALT, R, submap, resize

submap = resize

bind = , right, resizeactive, 10 0
bind = , right, submap, reset
# ...

submap = reset
```

This works because the binds are executed in the order they appear, and
assigning multiple actions per bind is possible.

### Nesting

Submaps can be nested, see the following example:

```ini
bind = $mainMod, M, submap, main_submap
submap = main_submap

# ...

# nested_one
bind = , 1, submap, nested_one
submap = nested_one

# ...

bind = SHIFT, escape, submap, reset
bind =      , escape, submap, main_submap
submap = main_submap
# /nested_one

# nested_two
bind = , 2, submap, nested_two
submap = nested_two

# ...

bind = SHIFT, escape, submap, reset
bind =      , escape, submap, main_submap
submap = main_submap
# /nested_two

bind = , escape, submap, reset
submap = reset
```

### Catch-All

You can also define a keybind via the special `catchall` keyword, which
activates no matter which key is pressed.  
This can be used to prevent any keys from passing to your active application
while in a submap or to exit it immediately when any unknown key is pressed:

```ini
bind = , catchall, submap, reset
```

## Example Binds

### Media

These binds set the expected behavior for regular keyboard media volume keys,
including when the screen is locked:

```ini
bindel = , XF86AudioRaiseVolume, exec, wpctl set-volume @DEFAULT_AUDIO_SINK@ 5%+
bindel = , XF86AudioLowerVolume, exec, wpctl set-volume @DEFAULT_AUDIO_SINK@ 5%-
bindl = , XF86AudioMute, exec, wpctl set-mute @DEFAULT_AUDIO_SINK@ toggle
# Requires playerctl
bindl = , XF86AudioPlay, exec, playerctl play-pause
bindl = , XF86AudioPrev, exec, playerctl previous
bindl = , XF86AudioNext, exec, playerctl next
```
