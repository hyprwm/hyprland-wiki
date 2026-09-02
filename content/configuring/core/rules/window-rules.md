---
weight: 10
title: Window Rules
---

## Syntax

```lua
hl.window_rule({
    name? = str,
    match = {
        prop = some_prop_value,
    },
    effect = some_effect_value,
})
```

## Window Rules

You can set window rules to achieve different window behaviors based on their properties.

### Props

The supported fields for the `match` table are:

| Prop | Description | Type |
| --- | --- | --- |
| class | Windows with `class` matching `RegEx` | [RegEx] |
| content | Windows with specified content type (none, photo, video, game) | str |
| focus | Currently focused window | bool |
| fullscreen | Fullscreen (covering or non-covering) windows | bool |
| fullscreen_state_client | Windows with matching `fullscreenstate`. `0` - none, `1` - maximize, `2` - fullscreen, `3` - maximize and fullscreen | int |
| fullscreen_state_internal | Windows with matching `fullscreenstate`. `0` - none, `1` - maximize, `2` - fullscreen, `3` - maximize and fullscreen | int |
| float | Floating windows | bool |
| group | Grouped windows | bool |
| initial_class | Windows with `initialClass` matching `RegEx` | [RegEx] |
| initial_title | Windows with `initialTitle` matching `RegEx` | [RegEx] |
| modal | Modal windows (e.g., "Are you sure" popups) | bool |
| pin | Pins the window (i.e. show it on all workspaces). **Important: pinning is ignored for non-floating windows** | bool |
| tag | Windows with matching `tag` | str |
| title | Windows with `title` matching `RegEx` | [RegEx] |
| workspace | Windows on matching workspace. Can be `id`, `"name:string"` or a workspace selector | workspace selector |
| xdg_tag | Match a window by its xdgTag | [RegEx] |
| xwayland | Xwayland windows | bool |

## Effects

### Static effects

> [!WARNING]
> It is not possible to `float` (or any other static rule) a window based on a change in the `title` after the window has been created.
> This applies to all static effects listed here.
>
> Instead, use a [dispatch](../../dispatchers) triggered by an [event](../../advanced-configuration/events) listener to apply the effect after the window has been created:
> ```lua
> hl.on("window.title", function(w)
>     if w ~= nil and w.title == "foo" then
>         hl.dispatch(hl.dsp.window.float({ action = "set" }))
>     end
> end)
> ```

Static effects are evaluated once when the window is opened and never again.
This essentially means that it is always the `initialTitle` and `initialClass` which will be found when matching on `title` and `class`, respectively.

| Effect | Description | Type |
| --- | --- | --- |
| center | If the window is floating, will center it on the monitor | bool |
| content | Sets content type: `"none"`, `"photo"`, `"video"`, or `"game"` | str |
| float | Floats a window | bool |
| fullscreen | Fullscreens a window | bool |
| fullscreen_state | Sets the fullscreen mode for the internal client (e.g., `"1 2"`). Values: `0` none, `1` maximize, `2` fullscreen, `3` maximize and fullscreen | str |
| group | Sets window group properties. See [group options](#group-window-rule-options) below | str |
| maximize | Maximizes a window | bool |
| monitor | Sets the monitor on which a window should open (e.g., `"1"`, `"DP-1"`). Can be suffixed with `" silent"` | str |
| move | Moves a floating window to the given monitor-local coordinates (e.g., `{100, 200}`, `{"(cursor_x-(window_w*0.5))", "(cursor_y-(window_h*0.5))"}`) | str |
| no_close_for | Makes the window uncloseable with `killactive` for a given number of ms on open | int |
| no_initial_focus | Disables the initial focus to the window | bool |
| pin | Pins the window (i.e. show it on all workspaces). _Note: pinning is ignored for non-floating windows. You most likely want to use this together with `float = true`_ | bool |
| pseudo | Pseudotiles a window | bool |
| scrolling_width | Set column width for window when starting on a workspace with the scrolling layout | float |
| size | Resizes a floating window (e.g., `{800, 600}`, `{"(monitor_w*0.5)", "(monitor_h*0.5)"}`) | str |
| suppress_event | Ignores specific events. Space-separated: `"fullscreen"`, `"maximize"`, `"activate"`, `"activatefocus"`, `"fullscreenoutput"`, `"x11configurerequest"` | str |
| tile | Tiles a window | bool |
| workspace | Sets the workspace on which a window should open. Can also be `"unset"` or suffixed with `" silent"` | str |

#### Expressions

Expressions are used with `move` and `size`.
They are space-separated (no spaces within each expression).
All position variables are monitor-local.

- `monitor_w` and `monitor_h` for monitor size
- `window_x` and `window_y` for window position
- `window_w` and `window_h` for window size
- `cursor_x` and `cursor_y` for cursor position

Example expressions:

```lua
move = {"window_w * 0.5", "(monitor_h / 2) + 17"}
size = {"monitor_w * 0.5", "monitor_h * 0.5"}
```

### Dynamic effects

Dynamic effects are re-evaluated every time a property changes.

<!-- SORT: opaque and force_rgbx are together because they do very similar -->
| Effect | Description | Argument | Limits |
| --- | --- | --- | --- |
| allows_input | Forces an Xwayland window to receive input even if it requests not to | bool | |
| animation | Forces an animation onto a window with an optional style (e.g., `"popin"`, `"popin 80%"`) | str | |
| border_color | Sets the window's border to a color, gradient, or two gradients (active/inactive). E.g., `"rgb(FF0000)"`, `{ colors = {"rgba(33ccffee)", "rgba(00ff99ee)"}, angle = 45 }` | gradient | |
| border_size | Sets the border size | int | |
| confine_pointer | Locks the mouse cursor to the window. Mostly useful for keeping your mouse cursor locked to one monitor during gaming | bool | |
| dim_around | Dims everything around the window. Meant for floating windows | bool | |
| decorate | Whether to draw window decorations. (default: `true`) | bool | |
| focus_on_activate | Whether Hyprland should focus an app that requests to be focused | bool | |
| idle_inhibit | Sets an idle inhibit rule. Modes: `"none"`, `"always"`, `"focus"`, `"fullscreen"` | str | |
| immediate | Forces the window to allow tearing | bool | |
| keep_aspect_ratio | Forces aspect ratio when resizing with the mouse | bool | |
| max_size | Sets the maximum size for floating windows (e.g., `{800, 600}`) | vec2 | |
| min_size | Sets the minimum size for floating windows (e.g., `{200, 150}`) | vec2 | |
| nearest_neighbor | Forces nearest-neighbor filtering | bool | |
| no_anim | Disables animations for the window | bool | |
| no_auto_hdr | Disables AutoHDR for the window. This is useful to stop programs like `foot` triggering AutoHDR when they are fullscreened | bool | |
| no_blur | Disables blur for the window | bool | |
| no_dim | Disables window dimming for the window | bool | |
| no_focus | Disables focus to the window | bool | |
| no_follow_mouse | Prevents the window from being focused when the mouse moves over it when `input.follow_mouse=1` is set | bool | |
| no_glow | Disables glow for the window | bool | |
| no_max_size | Removes max size limitations | bool | |
| no_screen_share | Hides the window and its popups from screen sharing by drawing black rectangles in their place | bool | |
| no_shadow | Disables shadows for the window | bool | |
| no_shortcuts_inhibit | Disallows the app from inhibiting your shortcuts | bool | |
| no_vrr | Disables VRR for the window. Only works when `misc.vrr` is set to `2` or `3` | bool | |
| no_wobble | Disables wobble for the window | bool | |
| no_xdg_drags | If true, will disable XDG-driven drags for the window (e.g., dragging a CSD top bar) | bool | |
| opacity | Additional opacity multiplier (e.g., `"0.8"` overall, `"0.9 0.7"` active/inactive, `"1.0 0.8 0.9"` active/inactive/fullscreen). Append `" override"` after each value to set absolute instead of multiplied | str | |
| opaque | Set `decoration.active/inactive/fullscreen_opacity` to `1` for this window | bool | |
| force_rgbx | Disables the window's own transparency *(not Hyprland's given transparency, in contrast to the opaque rule)* | bool | |
| persistent_size | For floating windows, internally store their size. When a new floating window opens with the same class and title, restore the saved size | bool | |
| render_unfocused | Forces the window to think it's being rendered when it's not visible | bool | |
| rounding | Forces X pixels of rounding, ignoring the default | int | |
| rounding_power | Overrides the rounding power for the window | float | |
| scroll_mouse | Forces the window to override `input.scroll_factor` | float | |
| scroll_touchpad | Forces the window to override `input.touchpad.scroll_factor` | float | |
| stay_focused | Forces focus on the window as long as it's visible | bool | |
| sync_fullscreen | Whether the fullscreen mode should always be the same as the one sent to the window | bool | |
| tag | Applies a tag. Use prefix `+`/`-` to set/unset, or no prefix to toggle (e.g., `"+myTag"`) | str | |
| tonemap | Tonemapping behavior: `on` (Default), `off` disables tonemapping, `clamp` clamps source luminance to target, `limited` uses a dynamic curve to tonemap only the top end out of bounds content | str | |
| xray | Sets blur xray mode for the window | bool | |

All dynamic effects can be set with [`set_prop()`](../../dispatchers#set_prop).

### `group` window rule options

The `group` effect takes a string with space-separated options:

- `"barred"` - Do not automatically group into the focused unlocked group.
- `"deny"` - Do not allow the window to be toggled as or added to a group.
- `"invade"` - Force open window in the locked group.
- `"lock"` \[`"always"`\] - Lock the group. Combine with `"set"` or `"new"`.
- `"new"` - Shorthand for `"barred set"`.
- `"override"` \[other options\] - Override other `group` rules.
- `"set"` \[`"always"`\] - Open window as a group.
- `"unset"` - Clear all `group` rules.

> [!NOTE]
> `group` with no options is a shorthand for `group = "set"`.
>
> By default, `set` and `lock` only affect new windows once.
> The `always` qualifier makes them always effective.

### Tags

Window tags can be static or dynamic.
Dynamic tags have a suffix of `*`.
Check window tags with `hyprctl clients`.

To add a static tag, use `hl.dsp.window.tag` dispatcher.
To add a dynamic tag, use `tag` window rule.

The `tag` rule can only manipulate dynamic tags, and the `hl.dsp.window.tag` only works with static tags (dynamic tags are cleared when the dispatcher is called).

{{% details title="Examples" closed="true" %}}

```bash
hyprctl dispatch 'hl.dsp.window.tag({ tag = "+code" })' # Add tag to current window.
hyprctl dispatch 'hl.dsp.window.tag({ tag = "-code" })' # Remove tag from current window.
hyprctl dispatch 'hl.dsp.window.tag({ tag = "code" })'  # Toggle the tag of current window.

# Or target windows
hyprctl dispatch 'hl.dsp.window.tag({ tag = "+music", window = "class:Celluloid" })'
```

```lua
-- Move kitty to 100 100 and add an anim style (named rule)
hl.window_rule({
  name      = "move-kitty",
  match     = { class = "kitty" },
  move      = {100, 100},
  animation = "popin",
})

-- Disable blur for firefox
hl.window_rule({ match = { class = "firefox" }, no_blur = true })

-- Move kitty to the center of the cursor
hl.window_rule({
  match = { class = "kitty" },
  move  = {"cursor_x-(window_w*0.5)", "cursor_y-(window_h*0.5)"},
})

-- Set border color to red if window is fullscreen
hl.window_rule({
  match        = { fullscreen = true },
  border_color = "rgb(FF0000) rgb(880808)",
})

-- Set border color to yellow when title contains Hyprland
hl.window_rule({
  match        = { title = ".*Hyprland.*" },
  border_color = "rgb(FFFF00)",
})

-- Set opacity to 1.0 active, 0.5 inactive and 0.8 fullscreen for kitty
hl.window_rule({
  match   = { class = "kitty" },
  opacity = "1.0 override 0.5 override 0.8 override",
})

-- Set rounding to 10 for kitty
hl.window_rule({ match = { class = "kitty" }, rounding = 10 })

-- Fix pinentry losing focus
hl.window_rule({
  match        = { class = "(pinentry-)(.*)" },
  stay_focused = true,
})

hl.window_rule({ match = { class = "footclient" }, tag = "+term" })   -- Add dynamic tag `term*`
hl.window_rule({ match = { class = "footclient" }, tag = "term" })    -- Toggle dynamic tag `term*`
hl.window_rule({ match = { tag = "cpp" },          tag = "+code" })   -- Add `code*` to windows tagged `cpp`
hl.window_rule({ match = { tag = "code" },         opacity = "0.8" }) -- Set opacity for tag `code` or `code*`
hl.window_rule({ match = { tag = "cpp" },          opacity = "0.7" }) -- `cpp`-tagged windows match both; last wins
hl.window_rule({ match = { tag = "term*" },        opacity = "0.6" }) -- Match `term*` only, not bare `term`
hl.window_rule({ match = { tag = "term" },         tag = "-code" })   -- Remove dynamic tag `code*` from `term`/`term*`

-- Or with a keybind
hl.bind("SUPER + CTRL + 2", hl.dsp.window.tag({ tag = "alpha_0.2" }))
hl.bind("SUPER + CTRL + 4", hl.dsp.window.tag({ tag = "alpha_0.4" }))
hl.window_rule({ match = { tag = "alpha_0.2" }, opacity = "0.2 override" })
hl.window_rule({ match = { tag = "alpha_0.4" }, opacity = "0.4 override" })
```

{{% /details %}}

### Notes

Effects marked as _dynamic_ are re-evaluated whenever the matching property of the window changes.
For instance, if a rule changes the `border_color` when a window is floating, the color reverts to default when it's tiled again.

Effects are processed top to bottom, and the _last_ match takes precedence.

Here, all non-fullscreen kitty windows have `opacity 0.8`, except when floating --- those get `0.5`.
All other floating windows get `0.5`.

```lua
hl.window_rule({ match = { float = true },    opacity = "0.5 override 0.5 override" })
hl.window_rule({ match = { class = "kitty" }, opacity = "0.8 override 0.8 override" })
```

### Dynamically enabling / disabling / changing rules

Only named rules can be dynamically changed, enabled, or disabled.
`hl.window_rule()` returns a handle object:

```lua
local myRule = hl.window_rule({
  name        = "my-rule",
  match       = { class = "kitty" },
  border_size = 5,
})

myRule:set_enabled(false)  -- disable
myRule:set_enabled(true)   -- re-enable
myRule:is_enabled()        -- query status
```
