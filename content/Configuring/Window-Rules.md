---
weight: 7
title: Window Rules
---

> [!WARNING]
> Window rules are **case sensitive**. (e.g. `firefox` ≠
> `Firefox`)
> 
> As of Hyprland v0.46.0, RegExes need to fully match the window values. For
> example, in the case of `kitty`:
> 
> - `kitty`/`(kitty)`/`^(kitty)$`: Matches.
> - `tty`: Used to match, now won't. Use `.*tty.*` to make it act like before, or
>   consider using a more specific RegEx.

> [!WARNING]
> Rules are evaluated top to bottom, so the order they're written in does matter!
> More info in [Notes](#notes)

## Window Rules

You can set window rules to achieve different window behaviors based
on their properties.

### Syntax

```ini
windowrule=RULE,PARAMETERS
```

- `RULE` is a [rule](#rules) (and a param if applicable)
- `PARAMETERS` is a comma-separated list of various window attributes you can match by. See the fields further down.

Example rule:
```ini
windowrule = float, class:kitty, title:kitty
```

Several rules can be specified in a single line, separated by commas. But have to be followed by at least one parameter.

Example:
```ini
windowrule = float, pin, size 400 400, move 0 0, class:kitty, initialTitle:kitty
```
Where float pin size and move are `RULES` and class and initialTitle are `PARAMETERS`.

> [!NOTE]
> In the case of dynamic window titles such as browser windows, keep in mind how
> powerful RegEx is.
> 
> For example, a window rule of:
> `windowrule = opacity 0.3 override 0.3 override,title:(.*)(- Youtube)` will match
> _any_ window that contains a string of "- Youtube" after any other text. This
> could be multiple browser windows or other applications that contain the string
> for any reason.
> 
> For the `windowrule = float,class:kitty,title:kitty` example, the
> `class:(kitty)` `WINDOW` field is what keeps the window rule specific to kitty
> terminals.

The supported fields for parameters are:

| Field | Description |
| -------------- | --------------- |
| class:\[RegEx\] | Windows with `class` matching `RegEx`. |
| title:\[RegEx\] | Windows with `title` matching `RegEx`. |
| initialClass:\[RegEx\] | Windows with `initialClass` matching `RegEx`. |
| initialTitle:\[RegEx\] | Windows with `initialTitle` matching `RegEx`. |
| tag:\[name\] | Windows with matching `tag`. |
| xwayland:\[0/1\] | Xwayland windows. |
| floating:\[0/1\] | Floating windows. |
| fullscreen:\[0/1\] | Fullscreen windows. |
| pinned:\[0/1\] | Pinned windows. |
| focus:\[0/1\] | Currently focused window. |
| group:\[0/1\] | Grouped windows. |
| modal:\[0/1\] | Modal windows (e.g. "Are you sure" popups) |
| fullscreenstate:\[internal\] \[client\] | Windows with matching `fullscreenstate`. `internal` and `client` can be `*` - any, `0` - none, `1` - maximize, `2` - fullscreen, `3` - maximize and fullscreen. |
| workspace:\[w\] | Windows on matching workspace. `w` can be `id` or `name:string`. |
| onworkspace:\[w\] | Windows on matching workspace. `w` can be `id`, `name:string` or `workspace selector`. |
| content:\[none\|photo\|video\|game\] | Windows with specified content type |
| xdgTag:\[string\] | Match a window by its xdgTag (see `hyprctl clients` to check if it has one) | 

Keep in mind that you _have_ to declare at least one field, but not all.

> [!NOTE]
> To get more information about a window's class, title, XWayland status or its
> size, you can use `hyprctl clients`.


> [!NOTE]
> In the output of the `hyprctl clients` command:
> `fullscreen` refers to `fullscreenstate.internal` and
> `fullscreenClient` refers to `fullscreenstate.client`

### RegEx writing

Please note Hyprland uses [Google's RE2](https://github.com/google/re2) for parsing RegEx. This means that all operations requiring polynomial
time to compute will not work. See the [RE2 wiki](https://github.com/google/re2/wiki/Syntax) for supported extensions.

If you want to _negate_ a ReGex, as in pass only when the RegEx _fails_, you can prefix it with `negative:`, e.g.: `negative:kitty`.

## Rules

### Static rules

Static rules are evaluated once when the window is opened and never again. This essentially means that it is always the `initialTitle` and `initialClass` which will be found when matching on `title` and `class`, respectively.

> [!WARNING]
> It is not possible to `float` (or any other static rule) a window based on a change in the `title` after the window has been created. This applies to all static rules listed here.

| Rule | Description |
| ---- | ----------- |
| float | Floats a window. |
| tile | Tiles a window. |
| fullscreen | Fullscreens a window. |
| maximize | Maximizes a window. |
| persistentsize | Allows size persistence between application launches for floating windows. |
| fullscreenstate \[internal\] \[client\] | Sets the focused window's fullscreen mode and the one sent to the client, where internal and client can be `0` - none, `1` - maximize, `2` - fullscreen, `3` - maximize and fullscreen. |
| move \[x\] \[y\] | Moves a floating window (`x, y` -> int or %, e.g. `100` or `20%`.<br>You are also allowed to do `100%-` for the right/bottom anchor, e.g. `100%-20`. In addition, the option supports the subtraction of the window's size with `100%-w-`, e.g. `100%-w-20`. This results in a gap at the right/bottom edge of the screen to the window with the defined subtracted size). <br> Additionally, you can also do `cursor [x] [y]` where x and y are either pixels or percent. Percent is calculated from the window's size. Specify `onscreen` before other parameters to force the window into the screen (e.g. `move onscreen cursor 50% 50%`) |
| size \[w\] \[h\] | Resizes a floating window (`w, h` -> int or %, e.g. `1280, 720` or `50%, 50%`.<br>`<` and `>` may also be prefixed in conjunction, to specify respectively the maximum or minimum allowed size. (e.g. `<1280` or `<40%` -> maximum size, `>300` or `>10%` -> minimum size).<br>Note that int values in pixels will be scaled by your monitor's scaling factor. |
| center (\[opt\]) | If the window is floating, will center it on the monitor. Set opt to `1` to respect monitor reserved area. |
| pseudo | Pseudotiles a window. |
| monitor \[id\] | Sets the monitor on which a window should open. `id` can be either the id number or the name (e.g. `1` or `DP-1`). |
| workspace \[w\] | Sets the workspace on which a window should open (for workspace syntax, see [dispatchers->workspaces](../Dispatchers#workspaces)). <br> You can also set \[w\] to `unset`. This will unset all previous workspace rules applied to this window. Additionally you can add `silent` after the workspace to make the window open silently. |
| noinitialfocus | Disables the initial focus to the window |
| pin | Pins the window  (i.e. show it on all workspaces). _Note: floating only_. |
| unset \[rule\] | Unset rules for the matching `PARAMETERS` (exact match required) or a specific `RULE`. No rule defaults to `all`. |
| nomaxsize | Removes max size limitations. Especially useful with windows that report invalid max sizes (e.g. winecfg). |
| stayfocused | Forces focus on the window as long as it's visible. |
| group \[options\] | Sets window group properties. See the note below. |
| suppressevent \[types...\] | Ignores specific events from the window. Events are space separated, and can be: `fullscreen`, `maximize`, `activate`, `activatefocus`, `fullscreenoutput`. |
| content \[none\|photo\|video\|game\] | Sets content type. |
| noclosefor \[ms\] | Makes the window uncloseable with the `killactive` dispatcher for a given amount of ms on open. |

### Dynamic rules

Dynamic rules are re-evaluated every time a property changes.

| Rule | Description |
| ---- | ----------- |
| animation \[style\] (\[opt\]) | Forces an animation onto a window, with a selected opt. Opt is optional. |
| bordercolor \[c\] | Force the bordercolor of the window. <br> Options for c: `color`/`color ... color angle` -> sets the active border color/gradient OR `color color`/`color ... color angle color ... color [angle]` -> sets the active and inactive border color/gradient of the window. See [variables->colors](../Variables#variable-types) for color definition. |
| idleinhibit \[mode\] | Sets an idle inhibit rule for the window. If active, apps like `hypridle` will not fire. Modes: `none`, `always`, `focus`, `fullscreen`. |
| opacity \[a\] | Additional opacity multiplier. Options for a: `float` -> sets an overall opacity, `float float` -> sets activeopacity and inactiveopacity respectively, `float float float` -> sets activeopacity, inactiveopacity and fullscreenopacity respectively. |
| tag \[name\] | Applies the tag `name` to the window, use prefix `+`/`-` to set/unset flag, or no prefix to toggle the flag. |
| maxsize \[w\] \[h\] | Sets the maximum size (x,y -> int). Applies to floating windows. (use `misc:size_limits_tiled` to include tiled windows.) |
| minsize \[w\] \[h\] | Sets the minimum size (x,y -> int). Applies to floating windows. (use `misc:size_limits_tiled` to include tiled windows.) |

The following rules can also be set with [`setprop`](../Dispatchers#setprop):

| Rule | Description |
| ---- | ----------- |
| bordersize \[int\] | Sets the border size. |
| rounding \[int\] | Forces the application to have X pixels of rounding, ignoring the set default (in `decoration:rounding`). Has to be an int. |
| roundingpower \[float\] | Overrides the rounding power for the window (see `decoration:rounding_power`). |
| allowsinput \[on\] | Forces an XWayland window to receive input, even if it requests not to do so. (Might fix issues like Game Launchers not receiving focus for some reason) |
| dimaround \[on\] | Dims everything around the window. Please note that this rule is meant for floating windows and using it on tiled ones may result in strange behavior. |
| decorate \[on\] | Whether to draw window decorations or not |
| focusonactivate \[on\] | Whether Hyprland should focus an app that requests to be focused (an `activate` request). |
| keepaspectratio \[on\] | Forces aspect ratio when resizing window with the mouse. |
| nearestneighbor \[on\] | Forces the window to use [nearest neighbor](https://en.wikipedia.org/wiki/Image_scaling#Nearest-neighbor_interpolation) filtering. |
| noanim \[on\] | Disables the animations for the window. |
| noblur \[on\] | Disables blur for the window. |
| noborder \[on\] | Disables borders for the window. |
| nodim \[on\] | Disables window dimming for the window. |
| nofocus \[on\] | Disables focus to the window. |
| nofollowmouse \[on\] | Prevents the window from being focused when the mouse moves over it when `input:follow_mouse=1` is set. |
| nomaxsize \[on\] | Disables max size for the window. |
| norounding \[on\] | Disables rounding for the window. |
| noshadow \[on\] | Disables shadows for the window. |
| noshortcutsinhibit \[on\] | Disallows the app from [inhibiting your shortcuts](https://wayland.app/protocols/keyboard-shortcuts-inhibit-unstable-v1). |
| opaque \[on\] | Forces the window to be opaque. |
| forcergbx \[on\] | Forces Hyprland to ignore the alpha channel on the whole window's surfaces, effectively making it _actually, fully 100% opaque_. |
| syncfullscreen \[on\] | Whether the fullscreen mode should always be the same as the one sent to the window (will only take effect on the next fullscreen mode change). |
| immediate \[on\] | Forces the window to allow tearing. See [the Tearing page](../Tearing). |
| xray \[on\] | Sets blur xray mode for the window. |
| renderunfocused | Forces the window to think it's being rendered when it's not visible. See also [Variables - Misc](../Variables/#Misc) for setting `render_unfocused_fps`. |
| scrollmouse \[float\] | Forces the window to override the variable `input:scroll_factor`. |
| scrolltouchpad \[float\] | Forces the window to override the variable `input:touchpad:scroll_factor`. |
| noscreenshare \[on\] | Hides the window and its popups from screen sharing by drawing black rectangles in their place. The rectangles are drawn even if other windows are above. |
| novrr \[on\] | Disables VRR for the window. Only works when [`misc:vrr`](../Variables/#Misc) is set to `2` or `3`. |

> [!NOTE]
> When using window rules, \[on\] can be set to `0` for _disabled_, `1` for _enabled_, or left blank to use the default value.
> 
> When using `setprop`, \[on\] can be set to `0` for _disabled_, `1` for _enabled_,
> `toggle` to toggle the state or `unset` to unset previous values.
> 
> When using `setprop`, \[int\] can also be `unset` to unset previous
> values.

### `group` window rule options

- `set` \[`always`\] - Open window as a group.
- `new` - Shorthand for `barred set`.
- `lock` \[`always`\] - Lock the group that added this window. Use with `set` or
  `new` (e.g. `new lock`) to create a new locked group.
- `barred` - Do not automatically group the window into the focused unlocked group.
- `deny` - Do not allow the window to be toggled as or added to group (see `denywindowfromgroup` dispatcher).
- `invade` - Force open window in the locked group.
- `override` \[other options\] - Override other `group` rules, e.g. You can make all windows in a particular workspace open as a group, and use `group override barred` to make windows with specific titles open as normal windows.
- `unset` - Clear all `group` rules.

> [!NOTE]
> The `group` rule without options is a shorthand for `group set`.
> 
> By default, `set` and `lock` only affect new windows once. The `always`
> qualifier makes them always effective.

### Tags

Window may have several tags, either static or dynamic. Dynamic tags will have a suffix of `*`.
You may check window tags with `hyprctl clients`.

Use the `tagwindow` dispatcher to add a static tag to a window:

```bash
hyprctl dispatch tagwindow +code     # Add tag to current window.
hyprctl dispatch tagwindow -- -code  # Remove tag from current window (use `--` to protect the leading `-`).
hyprctl dispatch tagwindow code      # Toggle the tag of current window.

# Or you can tag windows matched with a window RegEx:
hyprctl dispatch tagwindow +music deadbeef
hyprctl dispatch tagwindow +media title:Celluloid
```

Use the `tag` rule to add a dynamic tag to a window:

```ini
windowrule = tag +term, class:footclient  # Add dynamic tag `term*` to window footclient.
windowrule = tag term, class:footclient   # Toggle dynamic tag `term*` for window footclient.
windowrule = tag +code, tag:cpp           # Add dynamic tag `code*` to window with tag `cpp`.

windowrule = opacity 0.8, tag:code        # Set opacity for window with tag `code` or `code*`.
windowrule = opacity 0.7, tag:cpp         # Window with tag `cpp` will match both `code` and `cpp`, the last one will override prior match.
windowrule = opacity 0.6, tag:term*       # Set opacity for window with tag `term*` only, `term` will not be matched.

windowrule = tag -code, tag:term          # Remove dynamic tag `code*` for window with tag `term` or `term*`.
```

Or with a keybind for convenience:

```ini
bind = $mod Ctrl, 2, tagwindow, alpha_0.2
bind = $mod Ctrl, 4, tagwindow, alpha_0.4

windowrule = opacity 0.2 override, tag:alpha_0.2
windowrule = opacity 0.4 override, tag:alpha_0.4
```

The `tag` rule can only manipulate dynamic tags, and the `tagwindow` dispatcher only works with static tags (i.e. once the dispatcher is called, dynamic tags will be cleared).

### Example Rules

```ini
windowrule = move 100 100, class:kitty                                    # Move kitty to 100 100
windowrule = animation popin, class:kitty                                 # Set the animation style for kitty
windowrule = noblur, class:firefox                                        # Disable blur for firefox
windowrule = move cursor -50% -50%, class:kitty                           # Move kitty to the center of the cursor
windowrule = bordercolor rgb(FF0000) rgb(880808), fullscreen:1            # Set bordercolor to red if window is fullscreen
windowrule = bordercolor rgb(00FF00), fullscreenstate:* 1                 # Set bordercolor to green if window's client fullscreen state is 1(maximize) (internal state can be anything)
windowrule = bordercolor rgb(FFFF00), title:.*Hyprland.*                  # Set bordercolor to yellow when title contains Hyprland
windowrule = opacity 1.0 override 0.5 override 0.8 override, class:kitty  # Set opacity to 1.0 active, 0.5 inactive and 0.8 fullscreen for kitty
windowrule = rounding 10, class:kitty                                     # Set rounding to 10 for kitty
windowrule = stayfocused,  class:(pinentry-)(.*)                          # Fix pinentry losing focus
```

### Notes

Rules that are marked as _Dynamic_ will be reevaluated if the matching property
of the window changes.<br>
For instance, if a rule is defined that changes the `bordercolor` of a window
when it is floating, then the `bordercolor` will change to the requested color
when it is set to floating, and revert to the default color when it is tiled again.

Rules will be processed from top to bottom, where the _last_ match will take
precedence. i.e.

```ini
windowrule = opacity 0.8 0.8, class:kitty
windowrule = opacity 0.5 0.5, floating:1
```

Here, all non-fullscreen kitty windows will have `opacity 0.8`, except if
they are floating. Otherwise, they will have `opacity 0.5`. The rest of the
non-fullscreen floating windows will have `opacity 0.5`.

```ini
windowrule = opacity 0.5 0.5,floating:1
windowrule = opacity 0.8 0.8,class:kitty
```

Here, all kitty windows will have `opacity 0.8`, even if they are floating.
The rest of the floating windows will have `opacity 0.5`.

> [!NOTE]
> Opacity is a PRODUCT of all opacities by default. For example, setting
> `activeopacity` to `0.5` and `opacity` to `0.5` will result in a total opacity of
> `0.25`. <br>
> You are allowed to set opacities over `1.0`, but any opacity product over `1.0`
> will cause graphical glitches. <br>
> For example, using `0.5 * 2 = 1` is fine, but `0.5 * 4 = 2` will cause graphical glitches. <br>
> You can put `override` after an opacity value to override it to an exact value
> rather than a multiplier.
> For example, to set active and inactive opacity to 0.8, and make fullscreen windows
> fully opaque regardless of other opacity rules:
> 
> ```ini
> windowrule = opacity 0.8 override 0.8 override 1.0 override, class:kitty
> ```

## Layer Rules

Some things in Wayland are not windows, but layers. That includes, for example:
app launchers, status bars, or wallpapers.

Those have specific rules, separate from windows:

```ini
layerrule = rule, namespace
# or
layerrule = rule, address
```

where `rule` is the rule and `namespace` is the namespace RegEx (find
namespaces in `hyprctl layers`) or `address` is an address in the form of
`address:0x[hex]`.

### Rules

| rule | description |
| ---- | ----------- |
| unset | Removes all layerRules previously set for a select namespace RegEx. Please note it has to match _exactly_. |
| noanim | Disables animations. |
| blur | Enables blur for the layer. |
| blurpopups | Enables blur for the popups. |
| ignorealpha \[a\] | Makes blur ignore pixels with opacity of `a` or lower. `a` is float value from `0` to `1`. `a = 0` if unspecified. |
| ignorezero | Makes blur ignore fully transparent pixels. Same as `ignorealpha 0`. |
| dimaround | Dims everything behind the layer. |
| xray \[on\] | Sets the blur xray mode for a layer. `0` for off, `1` for on, `unset` for default. |
| animation \[style\] | Allows you to set a specific animation style for this layer. |
| order \[n\] | Sets the order relative to other layers. A higher `n` means closer to the edge of the monitor. Can be negative. `n = 0` if unspecified. |
| abovelock \[interactable\] | Renders the layer above the lockscreen when the session is locked. If set to `true`, you can interact with the layer on the lockscreen, otherwise it will only be rendered above it. |
| noscreenshare \[on\] | Hides the layer from screen sharing by drawing a black rectangle over it. |

