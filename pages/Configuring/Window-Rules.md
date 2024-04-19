---
weight: 7
title: Window Rules
---

{{< callout type=warning >}}

Window rules (both V1 and V2) are **case sensitive**. (e.g. `firefox` ≠
`Firefox`)

{{< /callout >}}

## Window Rules V1

You can set window rules to achieve different behaviors from the active
container.

### Syntax

```ini
windowrule=RULE,WINDOW
```

- `RULE` is a [rule](#rules) (and a param if applicable)
- `WINDOW` is a [RegEx](https://en.wikipedia.org/wiki/Regular_expression),
  either:
  - plain RegEx (for matching a window class);
  - `title:` followed by a regex (for matching a window's title)

### Examples

```ini
windowrule=float,^(kitty)$
windowrule=move 0 0,title:^(Firefox)(.*)$
```

## Window Rules V2

In order to allow more flexible rules, while retaining compatibility with the
above rule system, window rules V2 were implemented.

In V2, you are allowed to match multiple variables.

the `RULE` field is unchanged, but in the `WINDOW` field, you can put regexes
for multiple values like so:

```ini
windowrulev2 = float,class:(kitty),title:(kitty)
```

{{< callout type=info >}}

In the case of dynamic window titles such as browser windows, keep in mind how
powerful regex is.

For example, a window rule of:
`windowrule=opacity 0.3 override 0.3 override,title:(.*)(- Youtube)$` will match
_any_ window that contains a string of "- Youtube" after any other text. This
could be multiple browser windows or other applications that contain the string
for any reason.

For the `windowrulev2 = float,class:(kitty),title:(kitty)` example, the
`class:(kitty)` `WINDOW` field is what keeps the window rule specific to kitty
terminals.

{{< /callout >}}

For now, the supported fields for V2 are:

```ini
class - class regex 
title - title regex
initialclass - initialClass regex
initialTitle - initialTitle regex
xwayland - 0/1
floating - 0/1
fullscreen - 0/1
pinned - 0/1
focus - 0/1
workspace - id or name: and name
onworkspace - id, name: and name, or workspace selector (see Workspace Rules)
```

Keep in mind that you _have_ to declare at least one field, but not all.

{{< callout type=info >}}

To get more information about a window's class, title, XWayland status or its
size, you can use `hyprctl clients`.

{{< /callout >}}

{{< callout type=warning >}}

Please beware that `hyprctl clients` will display the field as **initialClass** while the WINDOW field in the configuration uses `initialclass`.

{{< /callout >}}

## Rules

### Static rules

Static rules are evaluated once when the window is opened and never again.

| Rule | Description |
| ---- | ----------- |
| float | floats a window |
| tile | tiles a window |
| fullscreen | fullscreens a window |
| fakefullscreen | fakefullscreens a window |
| maximize | maximizes a window |
| move \[x\] \[y\] | moves a floating window (x,y -> int or %, e.g. 20% or 100. You are also allowed to do `100%-` for the right/bottom anchor, e.g. `100%-20`). Additionally, you can also do `cursor [x] [y]` where x and y are either pixels or percent. Percent is calculated from the window's size. Specify `onscreen` before other parameters to force the window into the screen (e.g. `move onscreen cursor 50% 50%`) |
| size \[x\] \[y\] | resizes a floating window (x,y -> int or %, e.g. 20% or 100) |
| center (\[opt\]) | if the window is floating, will center it on the monitor. Set opt as 1 to respect monitor reserved area |
| pseudo | pseudotiles a window |
| monitor \[id\] | sets the monitor on which a window should open. `id` can be either id or name (either e.g. `1` or e.g. `DP-1`) |
| workspace \[w\] | sets the workspace on which a window should open (for workspace syntax, see [dispatchers->workspaces](../Dispatchers#workspaces)). You can also make \[w\] to `unset`, will unset all previous workspace rules applied to this window. You can also add `silent` after the workspace to make the window open silently. |
| nofocus | disables focus to the window |
| noinitialfocus | disables the initial focus to the window |
| forceinput | forces an XWayland window to receive input, even if it requests not to do so. (Might fix issues like e.g. Game Launchers not receiving focus for some reason) |
| windowdance | forces an XWayland window to never refocus, used for games/applications like Rhythm Doctor |
| pin | pins the window  (i.e. show it on all workspaces) *note: floating only* |
| unset | removes all previously set rules for the given parameters. Please note it has to match EXACTLY. |
| nomaxsize | removes max size limitations. Especially useful with windows that report invalid max sizes (e.g. winecfg) |
| stayfocused | forces focus on the window as long as it's visible |
| group \[options\] | set window group properties. See the note below. |
| suppressevent \[types...\] | ignores specific events from the window. Events are space separated, and can be: `fullscreen` `maximize` `activate` `activatefocus` |


### Dynamic rules

Dynamic rules are re-evaluated every time a property changes.

| Rule | Description |
| ---- | ----------- |
| opacity \[a\] | additional opacity multiplier. Options for a: `float` -> sets an overall opacity OR `float float` -> sets activeopacity and inactiveopacity respectively, OR `float float float` -> sets activeopacity, inactiveopacity and fullscreenopacity respectively. |
| opaque | forces the window to be opaque (can be toggled with the toggleopaque dispatcher) |
| forcergbx | makes Hyprland ignore the alpha channel of all the window's surfaces, effectively making it _actually, fully 100% opaque_ |
| animation \[style\] (\[opt\]) | forces an animation onto a window, with a selected opt. Opt is optional. |
| rounding \[x\] | forces the application to have X pixels of rounding, ignoring the set default (in `decoration:rounding`). Has to be an int. |
| minsize \[x\] \[y\] | sets the minimum size (x,y -> int) |
| maxsize \[x\] \[y\] | sets the maximum size (x,y -> int) |
| noblur | disables blur for the window |
| noborder | disables borders for the window |
| bordersize \[size\] | sets the border size |
| nodim | disables window dimming for the window |
| noshadow | disables shadows for the window |
| noanim | disables the animations for the window |
| keepaspectratio | forces aspect ratio when resizing window with the mouse |
| bordercolor \[c\] | force the bordercolor of the window. Options for c: `color`/`color ... color angle` -> sets the active border color/gradient OR `color color`/`color ... color angle color ... color [angle]` -> sets the active and inactive border color/gradient of the window. See [variables->colors](../Variables#variable-types) for color definition. |
| idleinhibit \[mode\] | sets an idle inhibit rule for the window. If active, apps like `hypridle` will not fire. Modes: `none`, `always`, `focus`, `fullscreen` |
| dimaround | dims everything around the window . Please note this rule is meant for floating windows and using it on tiled ones may result in strange behavior. |
| xray \[on\] | sets blur xray mode for the window (0 for off, 1 for on, unset for default) |
| immediate | forces the window to allow to be torn. See [the Tearing page](../Tearing). |
| nearestneighbor | forces the window to use the nearest neigbor filtering. |

{{< callout type=info >}}

## `group` window rule options

- `set` \[`always`\] - Open window as a group.
- `new` - Shorthand of `barred set`.
- `lock` \[`always`\] - Lock the group that added this window. Use with `set` or
  `new` (i.e. `new lock`) to create a new locked group.
- `barred` - Do not add the window to the focused group. By default, a window
  with a `group set` rule will be added to an active group if possible.
- `deny` - Do not allow window to be toggled as or added to group (see
  `denywindowfromgroup` dispatcher).
- `invade` - Force open window in the locked group.
- `override` \[other options\] - Override other `group` rules, e.g. You can make
  all windows in a particular workspace open as a group, and use
  `group override barred` to make windows with specific titles open as normal
  windows.
- `unset` - Clear all `group` rules.

The `group` rule without options is a shorthand for `group set`.

By default, `set` and `lock` only affect new windows once. The `always`
qualifier makes them always effective.

{{< /callout >}}

### Example Rules

```ini
windowrule = move 100 100,^(kitty)$ # moves kitty to 100 100
windowrule = animation popin,^(kitty)$ # sets the animation style for kitty
windowrule = noblur,^(firefox)$ # disables blur for firefox
windowrule = move cursor -50% -50%,^(kitty)$ # moves kitty to the center of the cursor
windowrulev2 = bordercolor rgb(FF0000) rgb(880808),fullscreen:1 # set bordercolor to red if window is fullscreen
windowrulev2 = bordercolor rgb(FFFF00),title:^(.*Hyprland.*)$ # set bordercolor to yellow when title contains Hyprland
windowrule = opacity 1.0 override 0.5 override 0.8 override,^(kitty)$ # set opacity to 1.0 active, 0.5 inactive and 0.8 fullscreen for kitty
windowrule = rounding 10,^(kitty)$ # set rounding to 10 for kitty
windowrulev2 = stayfocused, class:^(pinentry-) # fix pinentry losing focus
```

### Notes

Rules that are marked as _Dynamic_ will be reevaluated if the matching property
of the window changes. For instance, if a rule is defined that changes the
`bordercolor` of a window when it is floating, then the `bordercolor` will change to
the requested color when it is set to floating, and revert to the default color
when it is tiled again.

Rules will be processed from top to bottom, where the _last_ match will take
precedence. i.e.

```ini
windowrulev2 = opacity 0.8 0.8,class:^(kitty)$
windowrulev2 = opacity 0.5 0.5,floating:1
```

Here, all non-fullscreen kitty windows will have `opacity 0.8`, except if they are floating. 
Otherwise, they will have `opacity 0.5`. The rest of the non-fullscreen floating windows will have `opacity 0.5`.

```ini
windowrulev2 = opacity 0.5 0.5,floating:1
windowrulev2 = opacity 0.8 0.8,class:^(kitty)$
```

Here, all kitty windows will have `opacity 0.8`, even if they are floating. 
The rest of the floating windows will have `opacity 0.5`.

{{< callout type=info >}}

Opacity is a PRODUCT of all opacities by default. Setting `activeopacity` to 0.5 
and `opacity` to 0.5 will result in a total opacity of 0.25. You are allowed
to set opacities over 1, but any opacity product over 1 will cause graphical
glitches. For example, using `0.5 * 2 = 1` is fine, but `0.5 * 4 = 2` will cause
graphical glitches. You can put `override` after an opacity value to override it to an exact value
rather than a multiplier. For example, to set active and inactive opacity to 0.8,
and make fullscreen windows fully opaque regardless of other opacity rules:

```ini
windowrulev2 = opacity 0.8 override 0.8 override 1.0 override,^(kitty)$
```

{{< /callout >}}

## Layer Rules

Some things in Wayland are not windows, but layers. That includes, for example:
app launchers, status bars, or wallpapers.

Those have specific rules separate from windows:

```ini
layerrule = rule, namespace
# or
layerrule = rule, address
```

where `rule` is the rule and `namespace` is the namespace regex (find namespaces
in `hyprctl layers`) or `address` is an address in the form of `address:0x[hex]`

### Rules

| rule | description |
| --- | --- |
| unset | removes all layerRules previously set for a select namespace regex. Please note it has to match _exactly_. |
| noanim | disables animations |
| blur | enables blur for the layer |
| blurpopups | enables blur for the popups |
| ignorealpha \[a\] | makes blur ignore pixels with opacity of `a` or lower. `a` is float value from 0 to 1. `a = 0` if unspecified. |
| ignorezero | makes blur ignore fully transparent pixels. Same as `ignorealpha 0`. |
| dimaround | dims everything behind the layer |
| xray \[on\] | sets the blur xray mode for a layer. 0 for off, 1 for on, unset for default. |
| animation \[style\] | allows you to set a specific animation style for this layer |
