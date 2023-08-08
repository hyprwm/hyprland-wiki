For basic syntax info, see [Configuring Hyprland](../Configuring-Hyprland).

This page documents all the "options" of Hyprland. For binds, monitors, animations,
etc. see the sidebar. For anything else, see [Keywords](../Keywords).

Please keep in mind some options that are layout-specific will be documented in
the layout pages and not here. (See the Sidebar for Dwindle and Master layouts)

# Variable types

| type | description |
|---|---|
| int | integer |
| bool | boolean, `true` or `false` (`yes` or `no`, `on` or `off`, `0` or `1`) - any numerical value that is not `0` or `1` will cause undefined behavior. |
| float | floating point number |
| color | color (see hint below for color info) |
| vec2 | vector with 2 values (float), separated by a space (e.g. `0 0` or `-10.9 99.1`) |
| MOD | a string modmask (e.g. `SUPER` or `SUPERSHIFT` or `SUPER + SHIFT` or `SUPER and SHIFT` or `CTRL_SHIFT` or empty for none. You are allowed to put any separators you please except for a `,`) |
| str | a string |
| gradient | a gradient, in the form of `color color ... [angle]` where `color` is a color (see above) and angle is an angle in degrees, in the format of `123deg` e.g. `45deg` (e.g. `rgba(11ee11ff) rgba(1111eeff) 45deg`) Angle is optional and will default to `0deg` |

{{< hint type=info >}}

**_Colors:_**

You have 3 options:

rgba(), e.g. `rgba(b3ff1aee)`

rgb(), e.g. `rgb(b3ff1a)`

legacy, e.g. `0xeeb3ff1a` -> ARGB order

**_Mod list:_**

```ini
SHIFT CAPS CTRL/CONTROL ALT MOD2 MOD3 SUPER/WIN/LOGO/MOD4 MOD5
```

{{< /hint >}}

# Sections

## General

| name | description | type | default |
|---|---|---|---|
| sensitivity | mouse sensitivity (legacy, may cause bugs if not 1, prefer `input:sensitivity`) | float | 1.0 |
| border_size | size of the border around windows | int | 1 |
| no_border_on_floating | disable borders for floating windows | bool | false |
| gaps_in | gaps between windows | int | 5 |
| gaps_out | gaps between windows and monitor edges | int | 20 |
| col.inactive_border | border color for inactive windows | gradient | 0xffffffff |
| col.active_border | border color for the active window | gradient | 0xff444444 |
| col.group_border | inactive (out of focus) group border color | gradient | 0x66777700 |
| col.group_border_active | active group border color | gradient | 0x66ffff00 |
| col.group_border_locked | inactive locked group border color | gradient | 0x66775500 |
| col.group_border_locked_active | active locked group border color | gradient | 0x66ff5500 |
| cursor_inactive_timeout | in seconds, after how many seconds of cursor's inactivity to hide it. Set to `0` for never. | int | 0 |
| layout | which layout to use. (Available: `dwindle`, `master`) | str | dwindle |
| no_cursor_warps | if true, will not warp the cursor in many cases (focusing, keybinds, etc) | bool | false |
| no_focus_fallback | if true, will not fall back to the next available window when moving focus in a direction where no window was found | bool | false |
| apply_sens_to_raw | if on, will also apply the sensitivity to raw mouse output (e.g. sensitivity in games) **NOTICE:** ***really*** not recommended. | bool | false |
| resize_on_border | enables resizing windows by clicking and dragging on borders and gaps | bool | false |
| extend_border_grab_area | extends the area around the border where you can click and drag on, only used when `general:resize_on_border` is on. | int | 15 |
| hover_icon_on_border | show a cursor icon when hovering over borders, only used when `general:resize_on_border` is on. | bool | true |


{{< hint type=warning >}}
Prefer using `input:sensitivity` over `general:sensitivity` to avoid bugs, especially with Wine/Proton apps.
{{< /hint >}}

## Decoration

| name | description | type | default |
|---|---|---|---|
| rounding | rounded corners' radius (in layout px) | int | 0 |
| multisample_edges | enable antialiasing (no-jaggies) for rounded corners | bool | true |
| active_opacity | opacity of active windows. (0.0 - 1.0) | float | 1.0 |
| inactive_opacity | opacity of inactive windows. (0.0 - 1.0) | float | 1.0 |
| fullscreen_opacity | opacity of fullscreen windows. (0.0 - 1.0) | float | 1.0 |
| drop_shadow | enable drop shadows on windows | bool | true |
| shadow_range | Shadow range ("size") in layout px | int | 4 |
| shadow_render_power | (1 - 4), in what power to render the falloff (more power, the faster the falloff) | int | 3 |
| shadow_ignore_window | if true, the shadow will not be rendered behind the window itself, only around it. | bool | true |
| col.shadow | shadow's color. Alpha dictates shadow's opacity. | color | 0xee1a1a1a |
| col.shadow_inactive | inactive shadow color. (if not set, will fall back to col.shadow) | color | unset |
| shadow_offset | shadow's rendering offset. | vec2 | [0, 0] |
| shadow_scale | shadow's scale. 0.0 - 1.0 | float | 1.0 |
| dim_inactive | enables dimming of inactive windows | bool | false |
| dim_strength | how much inactive windows should be dimmed, 0.0 - 1.0 | float | 0.5 |
| dim_special | how much to dim the rest of the screen by when a special workspace is open. 0.0 - 1.0 | float | 0.2 |
| dim_around | how much the `dimaround` window rule should dim by. 0.0 - 1.0 | float | 0.4 |
| screen_shader | a path to a custom shader to be applied at the end of rendering. See `examples/screenShader.frag` for an example. | str | \[\[Empty\]\] |

## Blur
_subcategory decoration:blur:_

| name | description | type | default |
|---|---|---|---|
| enabled | enable kawase window background blur | bool | true |
| size | blur size (distance) | int | 8 |
| passes | the amount of passes to perform | int | 1 |
| ignore_opacity | make the blur layer ignore the opacity of the window | bool | false |
| new_optimizations | whether to enable further optimizations to the blur. Recommended to leave on, as it will massively improve performance. | bool | true |
| xray | if enabled, floating windows will ignore tiled windows in their blur. Only available if blur_new_optimizations is true. Will reduce overhead on floating blur significantly. | bool | false |
| noise | how much noise to apply. 0.0 - 1.0 | float | 0.0117 |
| contrast | contrast modulation for blur. 0.0 - 2.0 | float | 0.8916 |
| brightness | brightness modulation for blur. 0.0 - 2.0 | float | 0.8172 |

{{< hint type=important >}}
A subcategory is a nested category:

```ini
decoration {
    # ...
    # ...

    blur {
        # ...
        # ...
    }
}
```

Doing `decoration:blur {` is **invalid**!
{{< /hint >}}

{{< hint type=info >}}

`blur:size` and `blur:passes` have to be at least 1.

Increasing `blur:passes` is necessary to prevent blur looking wrong on higher `blur:size` values,
but remember that higher `blur:passes` will require more strain on the GPU.

{{< /hint >}}

# Animations

| name | description | type | default |
|---|---|---|---|
| enabled | enable animations | bool | true |

{{< hint type=info >}}

_[More about Animations](../Animations)._

{{< /hint >}}

# Input

## Input

| name | description | type | default |
|---|---|---|---|
| kb_model | Appropriate XKB keymap parameter. See the note below. | str | \[\[Empty\]\] |
| kb_layout | Appropriate XKB keymap parameter | str | us |
| kb_variant | Appropriate XKB keymap parameter | str | \[\[Empty\]\] |
| kb_options | Appropriate XKB keymap parameter | str | \[\[Empty\]\] |
| kb_rules | Appropriate XKB keymap parameter | str | \[\[Empty\]\] |
| kb_file | If you prefer, you can use a path to your custom .xkb file. | str | \[\[Empty\]\] |
| numlock_by_default | Engage numlock by default. | bool | false |
| repeat_rate | The repeat rate for held-down keys, in repeats per second. | int | 25 |
| repeat_delay | Delay before a held-down key is repeated, in milliseconds. | int | 600 |
| sensitivity | Sets the mouse input sensitivity. Value will be clamped to the range -1.0 to 1.0. [libinput#pointer-acceleration](https://wayland.freedesktop.org/libinput/doc/latest/pointer-acceleration.html#pointer-acceleration) | float | 0.0 |
| accel_profile | Sets the cursor acceleration profile. Can be one of `adaptive`, `flat`. Can also be `custom`, see below. Leave empty to use `libinput`'s default mode for your input device. [libinput#pointer-acceleration](https://wayland.freedesktop.org/libinput/doc/latest/pointer-acceleration.html#pointer-acceleration) | str | \[\[Empty\]\]
| force_no_accel | Force no cursor acceleration. This bypasses most of your pointer settings to get as raw of a signal as possible. **Enabling this is not recommended due to potential cursor desynchronization.** | bool | false |
| left_handed | Switches RMB and LMB | bool | false |
| scroll_method | Sets the scroll method. Can be one of `2fg` (2 fingers), `edge`, `on_button_down`, `no_scroll`. [libinput#scrolling](https://wayland.freedesktop.org/libinput/doc/latest/scrolling.html) | str | \[\[Empty\]\]
| scroll_button | Sets the scroll button. Has to be an int, cannot be a string. Check `wev` if you have any doubts regarding the ID. 0 means default. | int | 0 |
| natural_scroll | Inverts scrolling direction. When enabled, scrolling moves content directly instead of manipulating a scrollbar. | bool | false |
| follow_mouse | (0/1/2/3) Specify if and how cursor movement should affect window focus. See the note below. | int | 1 |
| mouse_refocus | If disabled and `follow_mouse=1` then mouse focus will not switch to the hovered window unless the mouse crosses a window boundary. | bool | true |
| float_switch_override_focus | If enabled (1 or 2), focus will change to the window under the cursor when changing from tiled-to-floating and vice versa. If 2, focus will also follow mouse on float-to-float switches. | int | 1 |

{{< hint type=info >}}
## XKB Settings

You can find a list of models, layouts, variants and options in [`/usr/share/X11/xkb/rules/base.lst`](file:///usr/share/X11/xkb/rules/base.lst). 
Alternatively, you can use the `localectl` command to discover what is available on your system.

For switchable keyboard configurations, take a look at [the uncommon tips & tricks page entry](../Uncommon-tips--tricks/#switchable-keyboard-layouts).

{{< /hint >}}

{{< hint type=info >}}
## Follow Mouse Cursor

- 0 - Cursor movement will not change focus.
- 1 - Cursor movement will always change focus to the window under the cursor.
- 2 - Cursor focus will be detached from keyboard focus. Clicking on a window will move keyboard focus to that window.
- 3 - Cursor focus will be completely separate from keyboard focus. Clicking on a window will not change keyboard focus.

## Custom accel profiles

`custom [step] [points...]`

for example `custom 200 0.0 0.5`

See [the libinput doc](https://wayland.freedesktop.org/libinput/doc/latest/pointer-acceleration.html) for more insights on
how it works.

  {{< /hint >}}


## Touchpad

_Subcategory `input:touchpad:`_

| name | description | type | default |
|---|---|---|---|
| disable_while_typing | Disable the touchpad while typing. | bool | true |
| natural_scroll | Inverts scrolling direction. When enabled, scrolling moves content directly instead of manipulating a scrollbar. | bool | false |
| scroll_factor | Multiplier applied to the amount of scroll movement. | float | 1.0
| middle_button_emulation | Sending LMB and RMB simultaneously will be interpreted as a middle click. This disables any touchpad area that would normally send a middle click based on location. [libinput#middle-button-emulation](https://wayland.freedesktop.org/libinput/doc/latest/middle-button-emulation.html) | bool | false |
| tap_button_map | Sets the tap button mapping for touchpad button emulation. Can be one of `lrm` (default) or `lmr` (Left, Middle, Right Buttons). | str | \[\[Empty\]\] |
| clickfinger_behavior | Button presses with 1, 2, or 3 fingers will be mapped to LMB, RMB, and MMB respectively. This disables interpretation of clicks based on location on the touchpad. [libinput#clickfinger-behavior](https://wayland.freedesktop.org/libinput/doc/latest/clickpad-softbuttons.html#clickfinger-behavior) | bool | false |
| tap-to-click | Tapping on the touchpad with 1, 2, or 3 fingers will send LMB, RMB, and MMB respectively. | bool | true |
| drag_lock | When enabled, lifting the finger off for a short time while dragging will not drop the dragged item. [libinput#tap-and-drag](https://wayland.freedesktop.org/libinput/doc/latest/tapping.html#tap-and-drag) | bool | false |
| tap-and-drag | Sets the tap and drag mode for the touchpad | bool | false |

## Touchdevice

_Subcategory `input:touchdevice:`_

| name | description | type | default |
|---|---|---|---|
| transform | transform the input from touchdevices. The possible transformations are the same as [those of the monitors](../Monitors/#rotating-and-the-default-workspace) | int | 0 |
| output | the output to bind touch devices. Empty means unset and will use the current / autodetected. | string | \[\[Empty\]\] |

## Per-device input config

Described [here](../Keywords#per-device-input-configs).

# Gestures

| name | description | type | default |
|---|---|---|---|
| workspace_swipe | enable workspace swipe gesture | bool | false |
| workspace_swipe_fingers | how many fingers for the gesture | int | 3 |
| workspace_swipe_distance | in px, the distance of the gesture | int | 300 |
| workspace_swipe_invert | invert the direction | bool | true |
| workspace_swipe_min_speed_to_force | minimum speed in px per timepoint to force the change ignoring `cancel_ratio`. Setting to `0` will disable this mechanic. | int | 30 |
| workspace_swipe_cancel_ratio | (0.0 - 1.0) how much the swipe has to proceed in order to commence it. (0.7 -> if > 0.7 * distance, switch, if less, revert) | float | 0.5 |
| workspace_swipe_create_new | whether a swipe right on the last workspace should create a new one. | bool | true |
| workspace_swipe_forever | if enabled, swiping will not clamp at the neighboring workspaces but continue to the further ones. | bool | false |
| workspace_swipe_numbered | if enabled, swiping will swipe on consecutive numbered workspaces. | bool | false |
| workspace_swipe_use_r | if enabled, swiping will use the `r` prefix instead of the `m` prefix for finding workspaces. (requires disabled `workspace_swipe_numbered`) | bool | false |

# Misc

| name | description | type | default |
|---|---|---|---|
| disable_hyprland_logo | disables the hyprland logo background. :( | bool | false |
| disable_splash_rendering | disables the hyprland splash rendering. (requires a monitor reload to take effect) | bool | false |
| force_hypr_chan | makes the background always have hypr-chan, the hyprland mascot | bool | false |
| vfr | controls the VFR status of hyprland. Heavily recommended to leave on true to conserve resources. | bool | true |
| vrr | controls the VRR (Adaptive Sync) of your monitors. 0 - off, 1 - on, 2 - fullscreen only | int | 0 |
| mouse_move_enables_dpms | If DPMS is set to off, wake up the monitors if the mouse moves. | bool | false |
| key_press_enables_dpms | If DPMS is set to off, wake up the monitors if a key is pressed. | bool | false |
| always_follow_on_dnd | Will make mouse focus follow the mouse when drag and dropping. Recommended to leave it enabled, especially for people using focus follows mouse at 0. | bool | true |
| layers_hog_keyboard_focus | If true, will make keyboard-interactive layers keep their focus on mouse move (e.g. wofi, bemenu) | bool | true |
| animate_manual_resizes | If true, will animate manual window resizes/moves | bool | false |
| animate_mouse_windowdragging | If true, will animate windows being dragged by mouse, note that this can cause weird behavior on some curves | bool | false |
| disable_autoreload | If true, the config will not reload automatically on save, and instead needs to be reloaded with `hyprctl reload`. Might save on battery. | bool | false |
| enable_swallow | Enable window swallowing | bool | false |
| swallow_regex | The *class* regex to be used for windows that should be swallowed (usually, a terminal). To know more about the list of regex which can be used [use this cheatsheet](https://github.com/ziishaned/learn-regex/blob/master/README.md). | str | \[\[Empty\]\] |
| swallow_exception_regex | The *title* regex to be used for windows that should *not* be swallowed by the windows specified in swallow_regex  (e.g. wev). The regex is matched against the parent (e.g. Kitty) window's title on the assumption that it changes to whatever process it's running. | str | \[\[Empty\]\] |
| focus_on_activate | Whether Hyprland should focus an app that requests to be focused (an `activate` request) | bool | false |
| no_direct_scanout | Disables direct scanout. Direct scanout attempts to reduce lag when there is only one fullscreen application on a screen (e.g. game). It is also recommended to set this to true if the fullscreen application shows graphical glitches. | bool | true |
| moveintogroup_lock_check | Enable to check if groups are locked before moving window/group to target group. | bool | false |
| hide_cursor_on_touch | Hides the cursor when the last input was a touch input until a mouse input is done. | bool | true |
| mouse_move_focuses_monitor | Whether mouse moving into a different monitor should focus it | bool | true |
| suppress_portal_warnings | disables warnings about incompatible portal implementations. | bool | false |
| render_ahead_of_time | [Warning: buggy] starts rendering _before_ your monitor displays a frame in order to lower latency | bool | false |
| render_ahead_safezone | how many ms of safezone to add to rendering ahead of time. Recommended 1-2. | int | 1 |
| cursor_zoom_factor | the factor to zoom by around the cursor. AKA. Magnifying glass. Minimum 1.0 (meaning no zoom) | float | 1.0 |
| cursor_zoom_rigid | whether the zoom should follow the cursor rigidly (cursor is always centered if it can be) or loosely | bool | false |
| allow_session_lock_restore | if true, will allow you to restart a lockscreen app in case it crashes (red screen of death) | bool | false |
| group_insert_after_current | whether new windows in a group spawn after current or at group tail | bool | true |
| render_titles_in_groupbar | whether to render titles in the group bar decoration | bool | true |
| groupbar_titles_font_size | font size for the above | int | 8 |
| groupbar_gradients | whether to draw gradients under the titles of the above | bool | true |
| groupbar_text_color | controls the group bar text color | color | 0xffffffff |
| background_color | change the background color. (requires enabled `disable_hyprland_logo`) | color | 0x111111 |

# Binds

| name | description | type | default |
|---|---|---|---|
| pass_mouse_when_bound | if disabled, will not pass the mouse events to apps / dragging windows around if a keybind has been triggered. | bool | false |
| scroll_event_delay | in ms, how many ms to wait after a scroll event to allow to pass another one for the binds. | int | 300 |
| workspace_back_and_forth | If enabled, an attempt to switch to the currently focused workspace will instead switch to the previous workspace. Akin to i3's *auto_back_and_forth*. | bool | false |
| allow_workspace_cycles | If enabled, workspaces don't forget their previous workspace, so cycles can be created by switching to the first workspace in a sequence, then endlessly going to the previous workspace. | bool | false |
| focus_preferred_method | sets the preferred focus finding method when using `focuswindow`/`movewindow`/etc with a direction. 0 - history (recent have priority), 1 - length (longer shared edges have priority) | int | 0 |

# XWayland

| name | description | type | default |
|---|---|---|---|
| use_nearest_neighbor | uses the nearest neigbor filtering for xwayland apps, making them pixelated rather than blurry | bool | true |
| force_zero_scaling | forces a scale of 1 on xwayland windows on scaled displays. | bool | false |

# Debug

{{< hint type=warning >}}

Only for developers.

{{< /hint >}}

| name | description | type | default |
|---|---|---|---|
| overlay | print the debug performance overlay. Disable VFR for accurate results. | bool | false |
| damage_blink | (epilepsy warning!) flash areas updated with damage tracking | bool | false |
| disable_logs | disable logging | bool | false |
| disable_time | disables time logging | bool | true |
| damage_tracking | redraw only the needed bits of the display. Do **not** change. (default: full - 2) monitor - 1, none - 0 | int | 2 |
| enable_stdout_logs | enables logging to stdout | bool | false |
| manual_crash | set to 1 and then back to 0 to crash Hyprland. | int | 0 |

# More

There are more config options described in other pages, which are layout- or
circumstance-specific. See the sidebar for more pages.
