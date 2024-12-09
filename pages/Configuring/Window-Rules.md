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
windowrule = float, ^(kitty)$
windowrule = move 0 0, title:^(Firefox)(.*)$
```

## Window Rules V2

In order to allow more flexible rules, while retaining compatibility with the
above rule system, window rules V2 were implemented.

In V2, you are allowed to match multiple variables.

the `RULE` field is unchanged, but in the `WINDOW` field, you can put regexes
for multiple values like so:

```ini
windowrulev2 = float, class:(kitty), title:(kitty)
```

{{< callout type=info >}}

In the case of dynamic window titles such as browser windows, keep in mind how
powerful regex is.

For example, a window rule of:
`windowrule = opacity 0.3 override 0.3 override,title:(.*)(- Youtube)$` will match
_any_ window that contains a string of "- Youtube" after any other text. This
could be multiple browser windows or other applications that contain the string
for any reason.

For the `windowrulev2 = float,class:(kitty),title:(kitty)` example, the
`class:(kitty)` `WINDOW` field is what keeps the window rule specific to kitty
terminals.

{{< /callout >}}

For now, the supported fields for V2 are:

| Field | Description |
| -------------- | --------------- |
| class:\[regex\] | Windows with `class` matching `regex`. |
| title:\[regex\] | Windows with `title` matching `regex`. |
| initialClass:\[regex\] | Windows with `initialClass` matching `regex`. |
| initialTitle:\[regex\] | Windows with `initialTitle` matching `regex`. |
| tag:\[name\] | Windows with matching `tag`. |
| xwayland:\[0/1\] | Xwayland windows. |
| floating:\[0/1\] | Floating windows. |
| fullscreen:\[0/1\] | Fullscreen windows. |
| pinned:\[0/1\] | Pinned windows. |
| focus:\[0/1\] | Currently focused window. |
| fullscreenstate:\[internal\] \[client\] | Windows with matching `fullscreenstate`. `internal` and `client` can be `*` - any, `0` - none, `1` - maximize, `2` - fullscreen, `3` - maximize and fullscreen. |
| workspace:\[w\] | Windows on matching workspace. `w` can be `id` or `name:string`. |
| onworkspace:\[w\] | Windows on matching workspace. `w` can be `id`, `name:string` or `workspace selector`. |

Keep in mind that you _have_ to declare at least one field, but not all.

{{< callout type=info >}}

To get more information about a window's class, title, XWayland status or its
size, you can use `hyprctl clients`.

{{< /callout >}}

## Rules

### Static rules

Static rules are evaluated once when the window is opened and never again. This essentially means that it is always the `initialTitle` and `initialClass` which will be found when matching on `title` and `class`, respectively.

{{< callout type=warning >}}

It is not possible to `float` (or any other of the static rules) a window based on a change in the `title` after the window has been created. This applies to all static rules listed here.

{{< /callout >}}

| Rule | Description |
| ---- | ----------- |
| float | floats a window |
| tile | tiles a window |
| fullscreen | fullscreens a window |
| maximize | maximizes a window |
| fullscreenstate \[internal\] \[client\] | sets the focused window's fullscreen mode and the one sent to the client, where internal and client can be `0` - none, `1` - maximize, `2` - fullscreen, `3` - maximize and fullscreen |
| move \[x\] \[y\] | moves a floating window (x,y -> int or %, e.g. 20% or 100. You are also allowed to do `100%-` for the right/bottom anchor, e.g. `100%-20`. In addition, the option supports the subtraction of the window size with `100%-w-`, e.g. `100%-w-20`. This results in a gap at the right/bottom edge of the screen to the window with the defined subtracted size). Additionally, you can also do `cursor [x] [y]` where x and y are either pixels or percent. Percent is calculated from the window's size. Specify `onscreen` before other parameters to force the window into the screen (e.g. `move onscreen cursor 50% 50%`) |
| size \[x\] \[y\] | resizes a floating window (x,y -> (<\/>)int or (<\/>)%, < -> maximum size, > -> minimum size, e.g. >20%, 100 or <500) |
| center (\[opt\]) | if the window is floating, will center it on the monitor. Set opt as 1 to respect monitor reserved area |
| pseudo | pseudotiles a window |
| monitor \[id\] | sets the monitor on which a window should open. `id` can be either id or name (either e.g. `1` or e.g. `DP-1`) |
| workspace \[w\] | sets the workspace on which a window should open (for workspace syntax, see [dispatchers->workspaces](../Dispatchers#workspaces)). You can also make \[w\] to `unset`, will unset all previous workspace rules applied to this window. You can also add `silent` after the workspace to make the window open silently. |
| noinitialfocus | disables the initial focus to the window |
| pin | pins the window  (i.e. show it on all workspaces) _note: floating only_ |
| unset | removes all previously set rules for the given parameters. Please note it has to match EXACTLY. |
| nomaxsize | removes max size limitations. Especially useful with windows that report invalid max sizes (e.g. winecfg) |
| stayfocused | forces focus on the window as long as it's visible |
| group \[options\] | set window group properties. See the note below. |
| suppressevent \[types...\] | ignores specific events from the window. Events are space separated, and can be: `fullscreen` `maximize` `activate` `activatefocus` |

### Dynamic rules

Dynamic rules are re-evaluated every time a property changes.

| Rule | Description |
| ---- | ----------- |
| animation \[style\] (\[opt\]) | forces an animation onto a window, with a selected opt. Opt is optional. |
| bordercolor \[c\] | force the bordercolor of the window. Options for c: `color`/`color ... color angle` -> sets the active border color/gradient OR `color color`/`color ... color angle color ... color [angle]` -> sets the active and inactive border color/gradient of the window. See [variables->colors](../Variables#variable-types) for color definition. |
| idleinhibit \[mode\] | sets an idle inhibit rule for the window. If active, apps like `hypridle` will not fire. Modes: `none`, `always`, `focus`, `fullscreen` |
| opacity \[a\] | additional opacity multiplier. Options for a: `float` -> sets an overall opacity OR `float float` -> sets activeopacity and inactiveopacity respectively, OR `float float float` -> sets activeopacity, inactiveopacity and fullscreenopacity respectively. |
| tag \[name\] | apply tag to the window, use prefix `+`/`-` to set/unset flag, or no prefix to toggle the flag |
| maxsize \[x\] \[y\] | sets the maximum size (x,y -> int) |
| minsize \[x\] \[y\] | sets the minimum size (x,y -> int) |

The following rules can also be set with [`setprop`](../Dispatchers#setprop):

| Rule | Description |
| ---- | ----------- |
| bordersize \[int\] | sets the border size |
| rounding \[int\] | forces the application to have X pixels of rounding, ignoring the set default (in `decoration:rounding`). Has to be an int. |
| allowsinput \[on\] | forces an XWayland window to receive input, even if it requests not to do so. (Might fix issues like e.g. Game Launchers not receiving focus for some reason) |
| dimaround \[on\] | dims everything around the window . Please note this rule is meant for floating windows and using it on tiled ones may result in strange behavior. |
| decorate \[on\] | whether to draw window decorations or not |
| focusonactivate \[on\] | whether Hyprland should focus an app that requests to be focused (an `activate` request) |
| keepaspectratio \[on\] | forces aspect ratio when resizing window with the mouse |
| nearestneighbor \[on\] | forces the window to use the nearest neigbor filtering. |
| noanim \[on\] | disables the animations for the window |
| noblur \[on\] | disables blur for the window |
| noborder \[on\] | disables borders for the window |
| nodim \[on\] | disables window dimming for the window |
| nofocus \[on\] | disables focus to the window |
| nomaxsize \[on\] | disables max size for the window |
| norounding \[on\] | disables rounding for the window |
| noshadow \[on\] | disables shadows for the window |
| noshortcutsinhibit \[on\] | disallows the app from [inhibiting your shortcuts](https://wayland.app/protocols/keyboard-shortcuts-inhibit-unstable-v1) |
| opaque \[on\] | forces the window to be opaque |
| forcergbx \[on\] | makes Hyprland ignore the alpha channel of all the window's surfaces, effectively making it _actually, fully 100% opaque_ |
| syncfullscreen \[on\] | whether the fullscreen mode should always be the same as the one sent to the window (will only take effect on the next fullscreen mode change) |
| immediate \[on\] | forces the window to allow to be torn. See [the Tearing page](../Tearing). |
| xray \[on\] | sets blur xray mode for the window |
| renderunfocused | forces the window to think it's being rendered when it's not visible - see also [Variables - Misc](../Variables/#Misc) for setting ``render_unfocused_fps`` |
| scrollmouse \[float\] | forces the window to override the variable `input:scroll_factor` |
| scrolltouchpad \[float\] | forces the window to override the variable `input:touchpad:scroll_factor` |

When using window rules, \[on\] can be set to `0` for off, `1` for on or not set
for default.

When using `setprop`, \[on\] can be set to `0` for off, `1` for on,
`toggle` to toggle the state or `unset` to unset previous values.

When using `setprop`, \[int\] can also be `unset` to unset previous
values.

### `group` window rule options

- `set` \[`always`\] - Open window as a group.
- `new` - Shorthand of `barred set`.
- `lock` \[`always`\] - Lock the group that added this window. Use with `set` or
  `new` (i.e. `new lock`) to create a new locked group.
- `barred` - Do not automatically group the window into the focused unlocked group.
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

### Tags

Window may have several tags, either static or dynamic, dynamic tag will have a
suffix of `*`. You may check window tags with `hyprctl clients`.

Use `tagwindow` dispatcher to add a static tag to a window:

```bash
hyprctl dispatch tagwindow +code        # add tag to current window
hyprctl dispatch tagwindow -- -code     # remove tag from current window (use `--` to protect the leading `-`)
hyprctl dispatch tagwindow code         # toggle the tag of current window

# or you can tag windows matched with a window regex
hyprctl dispatch tagwindow +music deadbeef
hyprctl dispatch tagwindow +media title:Celluloid
```

Use `tag` rule to add a dynamic tag to a window:

```ini
windowrulev2 = tag +term, class:(footclient)    # add dynamic tag `term*` to window footclient
windowrulev2 = tag term, class:(footclient)     # toggle dynamic tag `term*` for window footclient
windowrulev2 = tag +code, tag:cpp               # add dynamic tag `code*` to window with tag `cpp`

windowrulev2 = opacity 0.8, tag:code            # set opacity for window with tag `code` or `code*`
windowrulev2 = opacity 0.7, tag:cpp             # window with tag `cpp` will match both `code` and `cpp`, the last one will override prior match
windowrulev2 = opacity 0.6, tag:term*           # set opacity for window with tag `term*` only, `term` will not be matched

windowrulev2 = tag -code, tag:term              # remove dynamic tag `code*` for window with tag `term` or `term*`
```

Or with keybind for convenience:

```ini
bind = $mod Ctrl, 2, tagwindow, alpha_0.2
bind = $mod Ctrl, 4, tagwindow, alpha_0.4

windowrulev2 = opacity 0.2 override, tag:alpha_0.2
windowrulev2 = opacity 0.4 override, tag:alpha_0.4
```

The `tag` rule can only manipulate dynamic tags, and the `tagwindow` dispatcher
only work with static tags (as once the dispatcher is called, dynamic tags will
be cleared).

### Example Rules

```ini
windowrule = move 100 100, ^(kitty)$ # moves kitty to 100 100
windowrule = animation popin, ^(kitty)$ # sets the animation style for kitty
windowrule = noblur, ^(firefox)$ # disables blur for firefox
windowrule = move cursor -50% -50%, ^(kitty)$ # moves kitty to the center of the cursor
windowrulev2 = bordercolor rgb(FF0000) rgb(880808), fullscreen:1 # set bordercolor to red if window is fullscreen
windowrulev2 = bordercolor rgb(00FF00), fullscreenstate:* 1 # set bordercolor to green if window's client fullscreen state is 1(maximize) (internal state can be anything)
windowrulev2 = bordercolor rgb(FFFF00), title:^(.*Hyprland.*)$ # set bordercolor to yellow when title contains Hyprland
windowrule = opacity 1.0 override 0.5 override 0.8 override, ^(kitty)$ # set opacity to 1.0 active, 0.5 inactive and 0.8 fullscreen for kitty
windowrule = rounding 10, ^(kitty)$ # set rounding to 10 for kitty
windowrulev2 = stayfocused,  class:^(pinentry-) # fix pinentry losing focus
```

### Notes

Rules that are marked as _Dynamic_ will be reevaluated if the matching property
of the window changes. For instance, if a rule is defined that changes the
`bordercolor` of a window when it is floating, then the `bordercolor` will
change to the requested color when it is set to floating, and revert to the
default color when it is tiled again.

Rules will be processed from top to bottom, where the _last_ match will take
precedence. i.e.

```ini
windowrulev2 = opacity 0.8 0.8, class:^(kitty)$
windowrulev2 = opacity 0.5 0.5, floating:1
```

Here, all non-fullscreen kitty windows will have `opacity 0.8`, except if
they are floating. Otherwise, they will have `opacity 0.5`. The rest of the
non-fullscreen floating windows will have `opacity 0.5`.

```ini
windowrulev2 = opacity 0.5 0.5,floating:1
windowrulev2 = opacity 0.8 0.8,class:^(kitty)$
```

Here, all kitty windows will have `opacity 0.8`, even if they are floating.
The rest of the floating windows will have `opacity 0.5`.

{{< callout type=info >}}

Opacity is a PRODUCT of all opacities by default. For example, setting
`activeopacity` to 0.5 and `opacity` to 0.5 will result in a total opacity of
0.25. You are allowed to set opacities over 1, but any opacity product over 1
will cause graphical glitches. For example, using `0.5 * 2 = 1` is fine, but
`0.5 * 4 = 2` will cause graphical glitches. You can put `override` after an
opacity value to override it to an exact value rather than a multiplier. For
example, to set active and inactive opacity to 0.8, and make fullscreen windows
fully opaque regardless of other opacity rules:

```ini
windowrulev2 = opacity 0.8 override 0.8 override 1.0 override, ^(kitty)$
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

where `rule` is the rule and `namespace` is the namespace regex (find
namespaces in `hyprctl layers`) or `address` is an address in the form of
`address:0x[hex]`.

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
| order \[n\] | sets the order relative to other layers. Higher means closer to the edge of the monitor. Can be negative. `n = 0` if unspecified. |
