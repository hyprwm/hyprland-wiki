# Advanced config

### If you skipped the "Basic Config" page because you think you are the best, please check the Basic Config first. It documents configuration not mentioned here.

this page documents all of the more advanced config options. Binds, curves,
execs, etc.

Please remember, that for ALL arguments separated by a comma, if you want to leave one of them empty, you cannot reduce the number of commas, *unless told otherwise in a specific section*:

```
three_param_keyword=A,B,C # OK

three_param_keyword=A,C # NOT OK

three_param_keyword=A,,C # OK
```

# Monitors

```
monitor=name,res,offset,scale
```

for example:

```
monitor=DP-1,1920x1080@144,0x0,1
```

will tell Hyprland to make the monitor on DP-1 a 1920x1080 display, at 144Hz,
0x0 off from the beginning and a scale of 1.

Please use the offset for its intended purpose before asking stupid questions
about "fixing" monitors being mirrored.

Please remember the offset is calculated with the scaled resolution, meaning if
you want your 4K monitor with scale 2 to the left of your 1080p one, you'd use
the offset `1920x0` for the second screen. (3840 / 2)

Leaving the name empty will define a fallback rule to use when no other rules match.

You can use `preferred` as a resolution to use the display's preferred size, and `auto` as an offset to let Hyprland decide on an offset for you.

Recommended rule for easy and quick plugging in of random monitors:
```
monitor=,preferred,auto,1
```
Will make any monitor that was not specified with an explicit rule automatically placed in a sensible location with its preferred resolution.

To disable a monitor, use

```
monitor=name,disable
```

If your workflow requires custom reserved area, you can add it with

```
monitor=name,addreserved,TOP,BOTTOM,LEFT,RIGHT
```

Where `TOP` `BOTTOM` `LEFT` `RIGHT` are integers in pixels of the reserved area
to add. This does stack on top of the calculated one, (e.g. bars) but you may
only use one of these rules per monitor in the config.

```
workspace=name,number
```

for example:

```
workspace=DP-1,1
```

will tell Hyprland to make the default workspace on DP-1 a number 1.

If you want to rotate a monitor, use

```
monitor=NAME,transform,TRANSFORM
```

where `NAME` is the name, and `TRANSFORM` is an integer, from 0 to 7,
corresponding to your transform of choice.

***Important!*** This keyword **MUST** be _after_ your `monitor=` keyword with
the resolution, etc.

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

```
bind=MOD,key,dispatcher,params
```

for example,

```
bind=SUPERSHIFT,Q,exec,firefox
```

will bind opening firefox to SUPER+SHIFT+Q

Please note that `SHIFT` modifies the key names, so for example

```
bind=SHIFT,1,anything,
```

will not work, because when you press SHIFT+1, on your screen you won't get a 1,
you'll get a !

Common overwrites:

```
1 -> exclam
2 -> at
3 -> numbersign
4 -> dollar
5 -> percent
6 -> asciicircum
7 -> ampersand
8 -> asterisk
9 -> parenleft
0 -> parenright
- -> underscore
= -> plus
```

*(Overwrites may vary on different keymaps)*

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

Will bind SUPER+T. (T is keycode 28.) - You can also use `xev` or `wev` to find
keycodes.

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

will bind it to SUPER+LMB.

For binding only modkeys, you need to use the TARGET modmask (with the activating mod) and the `r` flag, e.g.:
```
bindr=SUPERALT,Alt_L,exec,amongus
```

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

## General dispatcher list:

Please keep in mind some layout-specific dispatchers will be listed in the layout pages (See the sidebar)

### exec

executes a shell command

**params**: command

### pass

passes the key (with mods) to a specified window. Can be used as a workaround to
global keybinds not working on Wayland.

**params**: a window, so:

class regex

OR

`title:` and a title regex

OR

`pid:` and the pid

OR

`address:` and an address

### killactive

kills the focused window

**params**: none

### workspace

changes the workspace

params: workspace (see below)

### movetoworkspace

moves the focused window to workspace X

**params**: workspace (see below)

### movetoworkspacesilent

moves the focused window to workspace X, without changing to that workspace
(silent)

**params**: workspace (see below)

### togglefloating

toggles the focused window floating

**params**: none

### fullscreen

toggles the focused window's fullscreen state

**params**: 0 - real fullscreen (takes your entire screen), 1 - "maximize"
fullscreen (keeps the gaps and bar(s))

### dpms

sets the monitor's dpms status.

**Warning**: it is NOT recommended to set DPMS with a keybind directly, as it might cause undefined behavior. Instead, consider something like
```
bind = MOD,KEY,exec,sleep 1 && hyprctl dispatch dpms off
```

**params**: `on` for on, `off` for  off.

### pseudo

toggles the focused window to be pseudotiled

**params**: none

### movefocus

moves the focus in a specified direction

**params**: l/r/u/d (left right up down)

### movewindow

moves the active window in a specified direction OR monitor

**params**: l/r/u/d (left right up down) OR mon: and ONE OF: l/r/u/d OR name OR
id (e.g.: `mon:DP-1` or `mon:l`)

### resizeactive

resizes the active window.

**params**:

- pixel delta to resize by, integer X and Y, separated by a space.

OR

- "exact" followed by a space and exact pixel size

negative X -> left, negative Y -> top, positive X -> right, positive Y -> bottom

e.g.:

```
bind=MOD,KEY,resizeactive,-20 0
bind=MOD,KEY,resizeactive,exact 1280 720
```

### moveactive

moves the active window.

**params**:

- pixel delta to move by, integer X and Y, separated by a space.

OR

- "exact" followed by a space and exact coordinates

negative X -> left, negative Y -> top, positive X -> right, positive Y -> bottom

e.g.:

```
bind=MOD,KEY,moveactive,20 -20
bind=MOD,KEY,moveactive,exact 720 0
```

### cyclenext

focuses the next window on a workspace

**params**: empty for next, `prev` for previous

### focuswindow

focuses the first found window matching a specified regex

**params**:

class regex

OR

`title:` and a title regex

OR

`pid:` and the pid

OR

`address:` and an address

### focusmonitor

focuses a monitor

**params**: direction OR name OR id

Directions: l/r/u/d (left right up down)

Name: e.g. `DP-1`

ID: e.g. `0`

(You can get names and IDs with `hyprctl monitors`)

### splitratio

changes the split ratio

**params**: relative split change, +n/-n, e.g. +0.1 or -0.02, clamps to 0.1 -
1.9

### toggleopaque

toggles the current window to always be opaque

**params**: none

### movecursortocorner

moves the cursor to the corner of the active window

**params**: direction, 0 - 3, bottom left - 0, bottom right - 1, top right - 2,
top left - 3.

### workspaceopt

toggles a workspace option for the active workspace.

**params**: a workspace option

Workspace options:

```
allfloat -> makes all new windows floating (also floats/unfloats windows on toggle)
allpseudo -> makes all new windows pseudo (also pseudos/unpseudos on toggle)
```

### exit

exits the compositor. No questions asked.

**params**: none

### forcerendererreload

forces the renderer to reload all resources and outputs.

**params**: none

### movecurrentworkspacetomonitor

Moves the active workspace to a monitor

**params**: monitor ID, name or direction (l/r/u/d)

### moveworkspacetomonitor

Moves a workspace to a monitor

**params**: workspace and monitor ID, name or direction

e.g.:

```
bind=MOD,KEY,moveworkspacetomonitor,4 0
```

will move workspace 4 to monitor 0.

### togglespecialworkspace

toggles the special workspace on/off.

**params**: none

## Workspaces

workspace args are unified. You have six choices:

ID: e.g. `1`, `2`, or `3`

Relative ID: e.g. `+1`, `-3` or `+100`

Relative workspace on monitor: e.g. `m+1`, `m-1` or `m+3`

Relative open workspace: e.g. `e+1` or `e-10`

Name: e.g. `name:Web`, `name:Anime` or `name:Better anime`

Special Workspace: `special` **Warning**: `special` is supported ONLY on
`movetoworkspace`. Any other dispatcher will result in undocumented behavior.

### Special Workspace

Special workspace is what is called a "scratchpad" in some other places. A
workspace that you can toggle on/off on any monitor.

# Executing

you can execute a shell script on startup of the compositor or on each time it's
reloaded.

**Note**: There currently is a bug with the exec that makes the executed app unable to die if killed, use `SIGKILL` (e.g. `killall name -9`) or launch from a script (`exec-once=~/myscript.sh` and do `myapp &` in the script)

`exec-once=command` will execute only on launch

`exec=command` will execute on each reload

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

## Rules

### float

floats a window

### tile

tiles a window

### fullscreen

fullscreens a window

### move \[x\] \[y\]

moves a floating window (x,y -> int or %, e.g. 20% or 100)

### size \[x\] \[y\]

resizes a floating window (x,y -> int or %, e.g. 20% or 100)

### center

if the window is floating, will center it on the monitor.

### pseudo

pseudotiles a window

### monitor \[id\]

sets the monitor on which a window should open

### workspace \[w\]

sets the workspace on which a window should open (for workspace syntax, see
binds->workspaces)

you can also make \[w\] to `unset`, will unset all previous workspace rules
applied to this window.

you can also add `silent` after the workspace to make the window open silently.

e.g.:

```
windowrule=workspace unset,Dolphin
windowrule=workspace name:amongus silent,kitty
windowrule=workspace 12,firefox
```

### opacity \[a\]

additional opacity multiplier

options for a:

`float` -> sets an opacity

`float float` -> sets activeopacity and inactiveopacity respectively

_Notice_: Opacity is always a PRODUCT of all opacities. E.g. active_opacity to
0.5 and windowrule opacity to 0.5 will result in a total opacity 0.25. You are
allowed to set opacities over 1, but any opacity product over 1 will cause
graphical glitches. E.g. 0.5 * 2 = 1, and it will be fine, 0.5 * 4 will cause
graphical glitches.

### opaque

forces the window to be opaque (can be toggled with the toggleopaque dispatcher)

### animation \[style\] \[opt\]

forces an animation onto a window, with a selected opt.

e.g.:

```
windowrule=animation slide left,kitty
windowrule=animation popin,dolphin
```

### rounding \[x\]

forces the application to have X pixels of rounding, ignoring the set default
(in `decoration:rounding`)

`x` has to be an int.

## More examples

```
windowrule=float,kitty
windowrule=monitor 0,Firefox
windowrule=move 200 200,Discord
```

### noblur

forces the window not to have blur

### nofocus

forces the window to never receive focus

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

`CURVE` is the bezier curve name, see curves above.

`STYLE` (optional) is the animation style

The animations are a tree. If an animation is unset, it will inherit its parent's values.

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
  ↳ border
  ↳ workspaces - styles: slide, slidevert, fade
```

### Extras

For animation style `popin` in `windows`, you can specify a minimum percentage to start from. For example:
```
animation=windows,1,8,default,popin 80%
```
will make the animation 80% -> 100% of the size.

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

bind=,right,resizeactive,10 0
bind=,left,resizeactive,-10 0
bind=,up,resizeactive,0 -10
bind=,down,resizeactive,0 10

bind=,escape,submap,reset # use reset to go back to the global submap

submap=reset # will reset the submap, meaning end the current one and return to the global one.

# keybinds further down will be global again...
```

**IMPORTANT:** do not forget a keybind to reset the keymap while inside it! (In
this case, `escape`)

If you get stuck inside a keymap, you can use `hyprctl dispatch submap reset` to
go back. If you do not have a terminal open, tough luck buddy. I warned you.

# Per-device input configs

*Warning:* Some configs, notably touchpad ones, require a Hyprland restart.

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

force_no_accel, follow_mouse

For example:

```
device:ROYUAN Akko Multi-modes Keyboard-B {
    repeat_rate=50
    repeat_delay=500
    middle_button_emulation=0
}
```

*remember about the space after the end of the device's name (before the `{`)!*

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
