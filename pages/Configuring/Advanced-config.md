This page documents all of the more advanced config options. Binds, curves,
execs, etc.

{{< hint type=important >}}

Please remember, that for ALL arguments separated by a comma, if you want to
leave one of them empty, you cannot reduce the number of commas, *unless told
otherwise in a specific section*:

```plain
three_param_keyword=A,B,C # OK

three_param_keyword=A,C # NOT OK

three_param_keyword=A,,C # OK

three_param_keyword=A,B, # OK
```

{{< /hint >}}

# Table of contents
{{< toc format=html >}}

# Monitors

```plain
monitor=name,res,offset,scale
```

for example:

```plain
monitor=DP-1,1920x1080@144,0x0,1
```

will tell Hyprland to make the monitor on DP-1 a 1920x1080 display, at 144Hz,
0x0 off from the beginning and a scale of 1.

Please use the offset for its intended purpose before asking stupid questions
about "fixing" monitors being mirrored.

Please remember the offset is calculated with the scaled resolution, meaning if
you want your 4K monitor with scale 2 to the left of your 1080p one, you'd use
the offset `1920x0` for the second screen. (3840 / 2)

Leaving the name empty will define a fallback rule to use when no other rules
match.

You can use `preferred` as a resolution to use the display's preferred size, and
`auto` as an offset to let Hyprland decide on an offset for you.

Recommended rule for easy and quick plugging in of random monitors:

```plain
monitor=,preferred,auto,1
```

Will make any monitor that was not specified with an explicit rule automatically
placed in a sensible location with its preferred resolution.

## Disabling a monitor

To disable a monitor, use

```plain
monitor=name,disable
```

## Custom reserved area

If your workflow requires custom reserved area, you can add it with

```plain
monitor=name,addreserved,TOP,BOTTOM,LEFT,RIGHT
```

Where `TOP` `BOTTOM` `LEFT` `RIGHT` are integers in pixels of the reserved area
to add. This does stack on top of the calculated one, (e.g. bars) but you may
only use one of these rules per monitor in the config.

## Rotating and the default workspace

{{< hint type=important >}}
The monitor transform and workspace keywords depend on a monitor rule set specifically for the targeted monitor,
and ***MUST*** be after it.
{{< /hint >}}

```plain
workspace=name,number
```

for example:

```plain
workspace=DP-1,1
```

will tell Hyprland to make the default workspace on DP-1 a number 1.

If you want to rotate a monitor, use

```plain
monitor=NAME,transform,TRANSFORM
```

where `NAME` is the name, and `TRANSFORM` is an integer, from 0 to 7,
corresponding to your transform of choice.


```
WL_OUTPUT_TRANSFORM_NORMAL = 0
WL_OUTPUT_TRANSFORM_90 = 1
WL_OUTPUT_TRANSFORM_180 = 2
WL_OUTPUT_TRANSFORM_270 = 3
WL_OUTPUT_TRANSFORM_FLIPPED = 4
WL_OUTPUT_TRANSFORM_FLIPPED_90 = 5
WL_OUTPUT_TRANSFORM_FLIPPED_180 = 6
WL_OUTPUT_TRANSFORM_FLIPPED_270 = 7
```

# Binds

## Basic

```
bind=MOD,key,dispatcher,params
```

for example,

```
bind=SUPERSHIFT,Q,exec,firefox
```

will bind opening firefox to <key>SUPER</key> + <key>SHIFT</key> + <key>Q</key>

{{< hint type=tip >}}
For binding keys without a modkey, leave it empty:
```
bind=,Print,exec,grim
```
{{< /hint >}}

*For a complete mod list, see [The basic configuring page](https://wiki.hyprland.org/Configuring/Basic-Config/#variable-types).*

## Uncommon syms / binding with a keycode

See the
[xkbcommon-keysyms.h header](https://github.com/xkbcommon/libxkbcommon/blob/master/include/xkbcommon/xkbcommon-keysyms.h)
for all the keysyms. The name you should use is the one after XKB_KEY\_, written
in all lowercase.

If you are unsure of what your key's name is, or what it shifts into, you can
use `xev` or `wev` to find that information.

If you want to bind by a keycode, you can just input it in the KEY position,
e.g.:

```
bind=SUPER,28,exec,amongus
```

Will bind <key>SUPER</key> + <key>T</key>. (<key>T</key> is keycode 28.) - You can also use `xev` or `wev` to find
keycodes.

## Misc

You can also unbind with `unbind`, e.g.:

```
unbind=SUPER,O
```

May be useful for dynamic keybindings with `hyprctl`.

You can also bind mouse buttons, by prefacing the mouse keycode with `mouse:`,
for example:

```
bind=SUPER,mouse:272,exec,amongus
```

will bind it to <key>SUPER</key> + <key>LMB</key>.

For binding only modkeys, you need to use the TARGET modmask (with the
activating mod) and the `r` flag, e.g.:

```
bindr=SUPERALT,Alt_L,exec,amongus
```

You can also bind the mouse wheel with `mouse_up` and `mouse_down`:
```
bind=SUPER,mouse_down,workspace,e-1
```
(control the reset time with `binds:scroll_event_delay`)

## Bind flags

bind supports flags in this format:

```
bind[flags]=...
```

e.g.:

```
bindrl=MOD,KEY,exec,amongus
```

flags:

```
l -> locked, aka. works also when an input inhibitor is active
r -> release, will trigger on release of a key
e -> repeat, will repeat when held.
```

## Binding mods

You can bind a mod alone like this:

```
bindr=ALT,Alt_L,exec,amongus
```

## General dispatcher list

Please keep in mind some layout-specific dispatchers will be listed in the
layout pages (See the sidebar)


*Some confusing params explained:*

| param type | description |
| --- | --- | --- |
| window | a window. Any of the following: Class regex, `title:` and a title regex, `pid:` and the pid, `address:` and the address |
| workspace | see below. |
| direction | `l` `r` `u` `d` left right up down |
| monitor | One of: direction, ID, name |
| resizeparams | Pixel delta vec2 (e.g. `10 -10`) or `exact` followed by exact vec2, e.g. `exact 1280 720`) |
| floatdelta | a float value delta, e.g `-0.2` or `+0.2`. |
| workspaceopt | see below. |

*Dispatchers:*

| dispatcher | description | params |
|---|---|---|
| exec | executes a shell command | command |
| pass | passes the key (with mods) to a specified window. Can be used as a workaround to global keybinds not working on Wayland. | window |
| killactive | closes (not kills, unlike the name, i know) the active window | none |
| closewindow | closes a specified window | `window` |
| workspace | changes the workspace | workspace |
| movetoworkspace | moves the focused window to a workspace | workspace OR `workspace,window` for a specific window |
| movetoworkspacesilent | same as above, but doesnt switch to the workspace | workspace OR `workspace,window` for a specific window |
| togglefloating | toggles the current window's floating state | left empty / `active` for current, or `window` for a specific window |
| fullscreen | toggles the focused window's fullscreen state | 0 - real fullscreen (takes your entire screen), 1 - "maximize" fullscreen (keeps the gaps and bar(s)) |
| dpms | sets all monitors' DPMS status. Do not use with a keybind directly. | `on` or `off` |
| pseudo | toggles the focused window's pseudo mode | none |
| movefocus | moves the focus in a direction | direction |
| movewindow | moves the active window in a direction or to a monitor | direction or `mon:` and a monitor |
| resizeactive | resizes the active window | resizeparams |
| moveactive | moves the active window | resizeparams |
| resizewindowpixel | resizes a selected window | `resizeparams,window`, e.g. `100 100,^(kitty)$ |
| movewindowpixel | moves a selected window | `resizeparams,window` |
| cyclenext | focuses the next window on a workspace | none (for next) or `prev` (for previous) |
| swapnext | swaps the focused window with the next window on a workspace | none (for next) or `prev` (for previous) |
| focuswindow | focuses the first window matching | window |
| focusmonitor | focuses a monitor | monitor |
| splitratio | changes the split ratio | floatdelta |
| toggleopaque | toggles the current window to always be opaque | none |
| movecursortocorner | moves the cursor to the corner of the active window | direction, 0 - 3, bottom left - 0, bottom right - 1, top right - 2, top left - 3 |
| workspaceopt | toggles a workspace option for the active workspace. | workspaceopt |
| exit | exits the compositor with no questions asked. | none |
| forcerendererreload | forces the renderer to reload all resources and outputs | none |
| movecurrentworkspacetomonitor | Moves the active workspace to a monitor | monitor |
| moveworkspacetomonitor | Moves a workspace to a monitor | workspace and a monitor separated by a space |
| swapactiveworkspaces | Swaps the active workspaces between two monitors | two monitors separated by a space |
| togglespecialworkspace | toggles the special workspace on/off | none |

{{< hint type=warning >}}
it is NOT recommended to set DPMS with a keybind directly, as it
might cause undefined behavior. Instead, consider something like

```
bind = MOD,KEY,exec,sleep 1 && hyprctl dispatch dpms off
```
{{< /hint >}}

## Workspaces

You have seven choices:

- ID: e.g. `1`, `2`, or `3`

- Relative ID: e.g. `+1`, `-3` or `+100`

- Relative workspace on monitor: e.g. `m+1`, `m-1` or `m+3`

- Relative open workspace: e.g. `e+1` or `e-10`

- Name: e.g. `name:Web`, `name:Anime` or `name:Better anime`

- Previous workspace: `previous`

- Special Workspace: `special`

{{< hint type=warning >}}
`special` is supported ONLY on
`movetoworkspace`. Any other dispatcher will result in undocumented behavior.
{{< /hint >}}

### Special Workspace

Special workspace is what is called a "scratchpad" in some other places. A
workspace that you can toggle on/off on any monitor.

{{< hint >}}
You cannot have floating windows in the Special workspace. Making a window floating
will send it to the currently active *real* workspace.
{{< /hint >}}

### Workspace options
```
allfloat -> makes all new windows floating (also floats/unfloats windows on toggle)
allpseudo -> makes all new windows pseudo (also pseudos/unpseudos on toggle)
```

# Global Keybinds
Yes, you heard this right, Hyprland does support global keybinds for ALL apps,
including OBS, Webcord, Firefox, etc.

See the `pass` dispatcher for keybinds.

e.g.:

I've set the "Start/Stop Recording" keybind in OBS to SUPER+F10, and I want it
to be global.

Simple, add
```plain
bind = SUPER,F10,pass,^(com\.obsproject\.Studio)$
```
to your config and you're done.

`pass` will pass the PRESS and RELEASE events by itself, no need for a `bindr`.
This also means that push-to-talk will work flawlessly with one pass, e.g.:

```
bind=,mouse:276,pass,^(TeamSpeak 3)$
```

Will pass MOUSE5 to TeamSpeak3.

{{< hint type=important >}}
XWayland is a bit wonky. Make sure that what you're passing is a "global Xorg keybind",
otherwise passing from a different XWayland app may not work.

It works flawlessly with all native Wayland applications though.

*Side note*: **OBS** on Wayland really dislikes keybinds wih modifiers. If they don't work, try
removing mods and binding them to e.g. F1. Combining this with a submap should yield
neat and usable results.
{{< /hint >}}

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

# Window Rules

You can set window rules for various actions. These are applied on window open!

```
windowrule=RULE,WINDOW
```

`RULE` is a rule (and a param if applicable)

`WINDOW` is a RegEx, either:

- plain regex (for matching a window class)
- `title:` followed by a regex (for matching a window's title)

you can get both by inspecting `hyprctl clients`

Examples:

```
windowrule=float,^(kitty)$
windowrule=move 0 0,title:^(Firefox)(.*)$
```

## Window Rules V2

In order to allow more flexible rules, while also not breaking compatibility with the above
rule system, window rules v2 were implemented.

In V2, you are allowed to match multiple variables.

the `RULE` field is unchanged, but in the `WINDOW` field, you can put regexes for multiple values like so:
```
windowrulev2 = float,class:^(kitty)$,title:^(kitty)$
```

For now, the supported fields are:
```
class title
```

Keep in mind you do *not* need to define all of them, but you need to define at least one.

## Rules

| rule | description |
| --- | --- | 
| float | floats a window |
| tile | tiles a window |
| fullscreen | fullscreens a window |
| move \[x\] \[y\] | moves a floating window (x,y -> int or %, e.g. 20% or 100) |
| size \[x\] \[y\] | resizes a floating window (x,y -> int or %, e.g. 20% or 100) |
| center | if the window is floating, will center it on the monitor |
| pseudo | pseudotiles a window |
| monitor \[id\] | sets the monitor on which a window should open |
| workspace \[w\] | sets the workspace on which a window should open (for workspace syntax, see [binds->workspaces](../Advanced-config#workspaces)). You can also make \[w\] to `unset`, will unset all previous workspace rules applied to this window. You can also add `silent` after the workspace to make the window open silently. |
| opacity \[a\] | additional opacity multiplier. Options for a: `float` -> sets an opacity OR `float float` -> sets activeopacity and inactiveopacity respectively |
| opaque | forces the window to be opaque (can be toggled with the toggleopaque dispatcher) |
| animation \[style\] (\[opt\]) | forces an animation onto a window, with a selected opt. Opt is optional. |
| rounding \[x\] | forces the application to have X pixels of rounding, ignoring the set default (in `decoration:rounding`). Has to be an int. |
| noblur | disables blur for the window |
| nofocus | disables focus to the window |
| forceinput | forces an XWayland window to receive input, even if it requests not to do so. (Might fix issues like e.g. Game Launchers not receiving focus for some reason) |

*Examples*:
```
windowrule = move 100 100,^(kitty)$
windowrule = animation popin,^(kitty)$
windowrule = noblur,^(firefox)$
```

{{< hint type=tip >}}

Opacity is always a PRODUCT of all opacities. E.g. active_opacity to
0.5 and windowrule opacity to 0.5 will result in a total opacity 0.25. You are
allowed to set opacities over 1, but any opacity product over 1 will cause
graphical glitches. E.g. 0.5 * 2 = 1, and it will be fine, 0.5 * 4 will cause
graphical glitches.

{{< /hint >}}

# Animations

animations are declared with the `animation` keyword.

```
animation=NAME,ONOFF,SPEED,CURVE,STYLE
or
animation=NAME,ONOFF,SPEED,CURVE
```

for example:

```
animation=workspaces,1,8,default
animation=windows,1,10,myepiccurve,slide
```

`ONOFF` can be either 0 or 1, 0 to disable, 1 to enable.

`SPEED` is the amount of ds (1ds = 100ms) the animation will take

`CURVE` is the bezier curve name, see [curves](https://wiki.hyprland.org/Configuring/Advanced-config/#curves).

`STYLE` (optional) is the animation style

The animations are a tree. If an animation is unset, it will inherit its
parent's values.

_Animation tree:_

```
global
  ↳ windows - styles: slide, popin
    ↳ windowsIn - window open
    ↳ windowsOut - window close
    ↳ windowsMove - everything in between, moving, dragging, resizing.
  ↳ fade
    ↳ fadeIn - fade in (open) -> layers and windows
    ↳ fadeOut - fade out (close) -> layers and windows
    ↳ fadeSwitch - fade on changing activewindow and its opacity
    ↳ fadeShadow - fade on changing activewindow for shadows
    ↳ fadeDim - the easing of the dimming of inactive windows
  ↳ border
  ↳ workspaces - styles: slide, slidevert, fade
    ↳ specialWorkspace - styles: same as workspaces
```

### Extras

For animation style `popin` in `windows`, you can specify a minimum percentage
to start from. For example:

```
animation=windows,1,8,default,popin 80%
```

will make the animation 80% -> 100% of the size.

# Curves

Defining your own Bezier curve can be done with the `bezier` keyword:

```
bezier=NAME,X0,Y0,X1,Y1
```

where `NAME` is the name, and the rest are two points for the Cubic Bezier. A
good website to design your bezier can be found
[here, on cssportal.com](https://www.cssportal.com/css-cubic-bezier-generator/).

Example curve:

```
bezier=overshot,0.05,0.9,0.1,1.1
```


# Defining variables

You can define your own custom variables like this:

```
$VAR = value
```

for example:

```
$MyFavoriteGame = Among Us
```

then, to use them, simply use them. For example:

```
col.active_border=$MyColor
```

You ARE allowed to do this:

```
col.active_border=ff$MyRedValue1111
```

# Sourcing (multi-file)

Use the `source` keyword to source another file.

For example, in your `hyprland.conf` you can:

```
source=~/.config/hypr/myColors.conf
```

And Hyprland will enter that file and parse it like a Hyprland config.

Please note it's LINEAR. Meaning lines above the `source=` will be parsed first,
then lines inside `~/.config/hypr/myColors.conf`, then lines below.

# Gestures

Use something like
[libinput-gestures](https://github.com/bulletmark/libinput-gestures), with
`hyprctl` if you want to expand Hyprland's gestures beyond what's offered in
Basic Configuring.

# Submaps

If you want keybind submaps, for example if you press ALT+R, you can enter a
"resize" mode, resize with arrow keys, and leave with escape, do it like this:

```
bind=ALT,R,submap,resize # will switch to a submap called resize

submap=resize # will start a submap called "resize"

binde=,right,resizeactive,10 0
binde=,left,resizeactive,-10 0
binde=,up,resizeactive,0 -10
binde=,down,resizeactive,0 10

bind=,escape,submap,reset # use reset to go back to the global submap

submap=reset # will reset the submap, meaning end the current one and return to the global one.

# keybinds further down will be global again...
```

**IMPORTANT:** do not forget a keybind to reset the keymap while inside it! (In
this case, `escape`)

If you get stuck inside a keymap, you can use `hyprctl dispatch submap reset` to
go back. If you do not have a terminal open, tough luck buddy. I warned you.

# Per-device input configs

Per-device config options will overwrite your options set in the `input`
section. It's worth noting that ONLY values explicitly changed will be
overwritten.

In order to apply per-device config options, make a new category like this:

```
device:name {

}
```

the `name` can be easily obtained by doing `hyprctl devices`.

Inside of it, put your config options. All options from the `input` category
(and all subcategories, e.g. `input:touchpad`) can be put inside, **EXCEPT**:

force_no_accel, follow_mouse, float_switch_override_focus

For example:

```
device:ROYUAN Akko Multi-modes Keyboard-B {
    repeat_rate=50
    repeat_delay=500
    middle_button_emulation=0
}
```

*remember about the space after the end of the device's name (before the `{`)!*

{{< hint type=tip >}}
With hyprctl, the category's spaces get turned into `-`, and everything is lowercase. So, for `hyprctl` calls, do for example:
```
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

```
blurls=NAMESPACE
```

where `NAMESPACE` is the namespace of the layerSurface. (You can get it from
`hyprctl layers`)

to remove a namespace from being blurred (useful in dynamic situations) use:

```
blurls=remove,NAMESPACE
```
