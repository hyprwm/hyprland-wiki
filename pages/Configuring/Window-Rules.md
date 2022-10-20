## Table of contents
{{< toc >}}

## Window Rules V1

You can set window rules for various actions. These are applied on window open!

```ini
windowrule=RULE,WINDOW
```

`RULE` is a rule (and a param if applicable)

`WINDOW` is a RegEx, either:

- plain regex (for matching a window class)
- `title:` followed by a regex (for matching a window's title)

you can get both by inspecting `hyprctl clients`

Examples:

```ini
windowrule=float,^(kitty)$
windowrule=move 0 0,title:^(Firefox)(.*)$
```

## Window Rules V2

In order to allow more flexible rules, while also not breaking compatibility with the above
rule system, window rules v2 were implemented.

In V2, you are allowed to match multiple variables.

the `RULE` field is unchanged, but in the `WINDOW` field, you can put regexes for multiple values like so:
```ini
windowrulev2 = float,class:^(kitty)$,title:^(kitty)$
```

For now, the supported fields are:
```ini
class - class regex
title - title regex
xwayland - 0/1
floating - 0/1
```

Keep in mind you do *not* need to define all of them, but you need to define at least one.

## Rules

| Rule | Description |
| ---- | ----------- | 
| float | floats a window |
| tile | tiles a window |
| fullscreen | fullscreens a window |
| move \[x\] \[y\] | moves a floating window (x,y -> int or %, e.g. 20% or 100) |
| size \[x\] \[y\] | resizes a floating window (x,y -> int or %, e.g. 20% or 100) |
| minsize \[x\] \[y\] | sets the minimum size on creation (x,y -> int) |
| maxsize \[x\] \[y\] | sets the maximum size on creation (x,y -> int) |
| center | if the window is floating, will center it on the monitor |
| pseudo | pseudotiles a window |
| monitor \[id\] | sets the monitor on which a window should open |
| workspace \[w\] | sets the workspace on which a window should open (for workspace syntax, see [dispatchers->workspaces](../Dispatchers#workspaces)). You can also make \[w\] to `unset`, will unset all previous workspace rules applied to this window. You can also add `silent` after the workspace to make the window open silently. |
| opacity \[a\] | additional opacity multiplier. Options for a: `float` -> sets an opacity OR `float float` -> sets activeopacity and inactiveopacity respectively |
| opaque | forces the window to be opaque (can be toggled with the toggleopaque dispatcher) |
| animation \[style\] (\[opt\]) | forces an animation onto a window, with a selected opt. Opt is optional. |
| rounding \[x\] | forces the application to have X pixels of rounding, ignoring the set default (in `decoration:rounding`). Has to be an int. |
| noblur | disables blur for the window |
| nofocus | disables focus to the window |
| noborder | disables borders for the window |
| noshadow | disables shadows for the window |
| forceinput | forces an XWayland window to receive input, even if it requests not to do so. (Might fix issues like e.g. Game Launchers not receiving focus for some reason) |
| windowdance | forces an XWayland window to never refocus, used for games/applications like Rhythm Doctor |
| pin | pins the window *note: floating only* |
| noanim | disables the animations for the window |

*Examples*:
```ini
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

