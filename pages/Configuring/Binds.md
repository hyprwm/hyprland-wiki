# Table of Contents

{{< toc >}}

# Basic

```ini
bind=MODS,key,dispatcher,params
```

for example,

```ini
bind=SUPER_SHIFT,Q,exec,firefox
```

will bind opening firefox to <key>SUPER</key> + <key>SHIFT</key> + <key>Q</key>

{{< hint type=tip >}}
For binding keys without a modkey, leave it empty:

```ini
bind=,Print,exec,grim
```

{{< /hint >}}

_For a complete mod list, see [Variables](../Variables/#variable-types)._

_The dispatcher list can be found in [Dispatchers](../Dispatchers/#list-of-dispatchers)._

## Uncommon syms / binding with a keycode

See the
[xkbcommon-keysyms.h header](https://github.com/xkbcommon/libxkbcommon/blob/master/include/xkbcommon/xkbcommon-keysyms.h)
for all the keysyms. The name you should use is the one after `XKB_KEY_`,
written in all lowercase.

If you are unsure of what your key's name is, you can
use `xev` or `wev` to find that information.

If you want to bind by a keycode, you can just input it in the KEY position with a `code:` prefix,
e.g.:

```ini
bind=SUPER,code:28,exec,amongus
```

Will bind <key>SUPER</key> + <key>T</key>. (<key>T</key> is keycode 28.) - You
can also use `xev` or `wev` to find keycodes.

# Misc

## Unbind

You can also unbind with `unbind`, e.g.:

```ini
unbind=SUPER,O
```

May be useful for dynamic keybindings with `hyprctl`.

```sh
hyprctl keyword unbind SUPER,O
```

## Mouse buttons

You can also bind mouse buttons, by prefacing the mouse keycode with `mouse:`,
for example:

```ini
bind=SUPER,mouse:272,exec,amongus
```

will bind it to <key>SUPER</key> + <key>LMB</key>.

## Only modkeys

For binding only modkeys, you need to use the TARGET modmask (with the
activating mod) and the `r` flag, e.g.:

```ini
bindr=SUPERALT,Alt_L,exec,amongus
```

## Mouse wheel

You can also bind the mouse wheel with `mouse_up` and `mouse_down` (or `mouse_left` and `mouse_right` if your wheel supports horizontal scrolling):

```ini
bind=SUPER,mouse_down,workspace,e-1
```

(control the reset time with `binds:scroll_event_delay`)

## Switches

Useful for binding e.g. the lid close/open event:

```ini
# trigger when the switch is toggled
bindl=,switch:[switch name],exec,swaylock
# trigger when the switch is turning on
bindl=,switch:on:[switch name],exec,hyprctl keyword monitor "eDP-1, 2560x1600, 0x0, 1"
# trigger when the switch is turning off
bindl=,switch:off:[switch name],exec,hyprctl keyword monitor "eDP-1, disable"
```

check out your switches in `hyprctl devices`.

## Multiple binds to one key

You can trigger multiple actions with one keybind by assigning multiple binds to one combination, e.g.:

```
# to switch between windows in a floating workspace
bind = SUPER,Tab,cyclenext,          # change focus to another window
bind = SUPER,Tab,bringactivetotop,   # bring it to the top
```

The keybinds will be executed in the order they were created. (top to bottom)

# Bind flags

`bind` supports flags in this format:

```ini
bind[flags]=...
```

e.g.:

```ini
bindrl=MOD,KEY,exec,amongus
```

Flags:

```ini
l -> locked, aka. works also when an input inhibitor (e.g. a lockscreen) is active.
r -> release, will trigger on release of a key.
e -> repeat, will repeat when held.
n -> non-consuming, key/mouse events will be passed to the active window in addition to triggering the dispatcher.
m -> mouse, see below
```

Example Usage:

```ini
# Example volume button that allows press and hold, volume limited to 150%
binde=, XF86AudioRaiseVolume, exec, wpctl set-volume -l 1.5 @DEFAULT_AUDIO_SINK@ 5%+

# Example volume button that will activate even while an input inhibitor is active
bindl=, XF86AudioLowerVolume, exec, wpctl set-volume @DEFAULT_AUDIO_SINK@ 5%-

# Start wofi opens wofi on first press, closes it on second
bindr=SUPER, SUPER_L, exec, pkill wofi || wofi

# See Mouse Binds section for bindm usage
```

# Mouse Binds

Mouse binds are binds that heavily rely on a mouse, usually its movement.
They will have one less arg, and look for example like this:

```ini
bindm=ALT,mouse:272,movewindow
```

this will create a bind with <key>ALT</key> + <key>LMB</key> to move the window
with your mouse.

_Available mouse binds_:

| Name | Description | Params |
| -----|------------ |--------|
| movewindow   | moves the active window   | none |
| resizewindow | resizes the active window | 1 - resize and keep window aspect ratio, 2 - resize and ignore `keepaspectratio` window rule/prop, none or anything else for normal resize |

_Common mouse buttons' codes:_

```txt
LMB -> 272
RMB -> 273
```

_for more, you can of course use `wev` to check._

{{< hint type=tip >}}
Mouse binds, despite their name, behave like normal binds. You are free to use
whatever keys / mods you please. When held, the mouse function will be activated.
{{< /hint >}}

# Binding mods

You can bind a mod alone like this:

```ini
bindr=ALT,Alt_L,exec,amongus
```

# Global Keybinds

## Classic
Yes, you heard this right, Hyprland does support global keybinds for ALL apps,
including OBS, Discord, Firefox, etc.

See the [`pass` dispatcher](../Dispatchers/#list-of-dispatchers) for keybinds.

Let's take OBS as an example: the "Start/Stop Recording" keybind is set to 
<key>SUPER</key> + <key>F10</key>, and you want to make it work globally.

Simply add

```ini
bind = SUPER,F10,pass,^(com\.obsproject\.Studio)$
```

to your config and you're done.

`pass` will pass the PRESS and RELEASE events by itself, no need for a `bindr`.
This also means that push-to-talk will work flawlessly with one pass, e.g.:

```ini
bind=,mouse:276,pass,^(TeamSpeak 3)$
```

Will pass MOUSE5 to TeamSpeak3.

{{< hint type=important >}}
XWayland is a bit wonky. Make sure that what you're passing is a "global Xorg
keybind", otherwise passing from a different XWayland app may not work.

It works flawlessly with all native Wayland applications though.
{{< /hint >}}

## DBus Global Shortcuts

Some applications may already support the GlobalShortcuts portal in xdg-desktop-portal.

If that's the case, then it's recommended to use this method instead of `pass`.

Open your desired app and issue `hyprctl globalshortcuts`. This will give you a list
of currently registered shortcuts with their description(s).

Choose whichever you like, for example `coolApp:myToggle`

Bind it to whatever you want with the `global` dispatcher:

```
bind = SUPERSHIFT, A, global, coolApp:myToggle
```

{{< hint type=tip >}}
Please note that this function will _only_ work with [XDPH](../../Useful-Utilities/Hyprland-desktop-portal).
{{</ hint >}}

# Submaps

If you want keybind submaps, also known as _modes_ or _groups_, for example if
you press <key>ALT</key> + <key>R</key>, you can enter a "resize" mode,
resize with arrow keys, and leave
with escape, do it like this:

```ini
# will switch to a submap called resize
bind=ALT,R,submap,resize

# will start a submap called "resize"
submap=resize

# sets repeatable binds for resizing the active window
binde=,right,resizeactive,10 0
binde=,left,resizeactive,-10 0
binde=,up,resizeactive,0 -10
binde=,down,resizeactive,0 10

# use reset to go back to the global submap
bind=,escape,submap,reset 

# will reset the submap, meaning end the current one and return to the global one
submap=reset

# keybinds further down will be global again...
```

**IMPORTANT:** do not forget a keybind to reset the keymap while inside it! (In
this case, `escape`)

If you get stuck inside a keymap, you can use `hyprctl dispatch submap reset` to
go back. If you do not have a terminal open, tough luck buddy. You have been warned.

You can also set the same keybind to perform multiple actions, such as resize
and close the submap, like so:

```ini
bind=ALT,R,submap,resize

submap=resize

bind=,right,resizeactive,10 0
bind=,right,submap,reset
# ...

submap=reset
```

This works because the binds are executed in the order they appear, and
assigning multiple actions per bind is possible.
