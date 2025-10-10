---
weight: 2
title: Variables
---

For basic syntax info, see [Configuring Hyprland](..).

This page documents all the "options" of Hyprland. For binds, monitors,
animations, etc. see the sidebar. For anything else, see
[Keywords](../Keywords).

Please keep in mind some options that are layout-specific will be documented in
the layout pages and not here. (See the Sidebar for Dwindle and Master layouts)

## Variable types

| type | description |
| --- | --- |
| int | integer |
| bool | boolean, `true` or `false` (`yes` or `no`, `on` or `off`, `0` or `1`) - any numerical value that is not `0` or `1` will cause undefined behavior. |
| float | floating point number |
| color | color (see hint below for color info) |
| vec2 | vector with 2 float values, separated by a space (e.g. `0 0` or `-10.9 99.1`) |
| MOD | a string modmask (e.g. `SUPER` or `SUPERSHIFT` or `SUPER + SHIFT` or `SUPER and SHIFT` or `CTRL_SHIFT` or empty for none. You are allowed to put any separators you please except for a `,`) |
| str | a string |
| gradient | a gradient, in the form of `color color ... [angle]` where `color` is a color (see above) and angle is an angle in degrees, in the format of `123deg` e.g. `45deg` (e.g. `rgba(11ee11ff) rgba(1111eeff) 45deg`) Angle is optional and will default to `0deg` |
| font_weight | an integer between 100 and 1000, or one of the following presets: `thin` `ultralight` `light` `semilight` `book` `normal` `medium` `semibold` `bold` `ultrabold` `heavy` `ultraheavy` |

{{< callout type=info >}}

**_Colors:_**

You have 3 options:

rgba(), e.g. `rgba(b3ff1aee)`, or the decimal equivalent `rgba(179,255,26,0.933)`

(decimal rgba/rgb values should have no spaces between numbers)

rgb(), e.g. `rgb(b3ff1a)`, or the decimal equivalent  `rgb(179,255,26)`

legacy, e.g. `0xeeb3ff1a` -> ARGB order

{{< /callout >}}

{{< callout type=info >}}

**_Mod list:_**

```ini
SHIFT CAPS CTRL/CONTROL ALT MOD2 MOD3 SUPER/WIN/LOGO/MOD4 MOD5
```

{{< /callout >}}

## Sections

### General

| name | description | type | default |
|---|---|---|---|
| border_size | size of the border around windows | int | 1 |
| no_border_on_floating | disable borders for floating windows | bool | false |
| gaps_in | gaps between windows, also supports css style gaps (top, right, bottom, left -> 5,10,15,20) | int | 5 |
| gaps_out | gaps between windows and monitor edges, also supports css style gaps (top, right, bottom, left -> 5,10,15,20) | int | 20 |
| float_gaps | gaps between windows and monitor edges for floating windows, also supports css style gaps (top, right, bottom, left -> 5 10 15 20). -1 means default | int | 0 |
| gaps_workspaces | gaps between workspaces. Stacks with gaps_out. | int | 0 |
| col.inactive_border | border color for inactive windows | gradient | 0xff444444 |
| col.active_border | border color for the active window | gradient | 0xffffffff |
| col.nogroup_border | inactive border color for window that cannot be added to a group (see `denywindowfromgroup` dispatcher) | gradient | 0xffffaaff |
| col.nogroup_border_active | active border color for window that cannot be added to a group | gradient | 0xffff00ff |
| layout | which layout to use. [dwindle/master] | str | dwindle |
| no_focus_fallback | if true, will not fall back to the next available window when moving focus in a direction where no window was found | bool | false |
| resize_on_border | enables resizing windows by clicking and dragging on borders and gaps | bool | false |
| extend_border_grab_area | extends the area around the border where you can click and drag on, only used when `general:resize_on_border` is on. | int | 15 |
| hover_icon_on_border | show a cursor icon when hovering over borders, only used when `general:resize_on_border` is on. | bool | true |
| allow_tearing | master switch for allowing tearing to occur. See [the Tearing page](../Tearing). | bool | false |
| resize_corner | force floating windows to use a specific corner when being resized (1-4 going clockwise from top left, 0 to disable) | int | 0 |

#### Snap

_Subcategory `general:snap:`_

| name | description | type | default |
| --- | --- | --- | --- |
| enabled | enable snapping for floating windows | bool | false |
| window_gap | minimum gap in pixels between windows before snapping | int | 10 |
| monitor_gap | minimum gap in pixels between window and monitor edges before snapping | int | 10 |
| border_overlap | if true, windows snap such that only one border's worth of space is between them | bool | false |
| respect_gaps | if true, snapping will respect gaps between windows(set in general:gaps_in) | bool | false |

{{< callout type=important >}}

A subcategory is a nested category:

```ini
general {
    # ...
    # ...

    snap {
        # ...
        # ...
    }
}
```

Doing `general:snap {` is **invalid**!

{{< /callout >}}

### Decoration

| name | description | type | default |
| --- | --- | --- | --- |
| rounding | rounded corners' radius (in layout px) | int | 0 |
| rounding_power | adjusts the curve used for rounding corners, larger is smoother, 2.0 is a circle, 4.0 is a squircle, 1.0 is a triangular corner. [1.0 - 10.0] | float | 2.0 |
| active_opacity | opacity of active windows. [0.0 - 1.0] | float | 1.0 |
| inactive_opacity | opacity of inactive windows. [0.0 - 1.0] | float | 1.0 |
| fullscreen_opacity | opacity of fullscreen windows. [0.0 - 1.0] | float | 1.0 |
| dim_modal | enables dimming of parents of modal windows | bool | true |
| dim_inactive | enables dimming of inactive windows | bool | false |
| dim_strength | how much inactive windows should be dimmed [0.0 - 1.0] | float | 0.5 |
| dim_special | how much to dim the rest of the screen by when a special workspace is open. [0.0 - 1.0] | float | 0.2 |
| dim_around | how much the `dimaround` window rule should dim by. [0.0 - 1.0] | float | 0.4 |
| screen_shader | a path to a custom shader to be applied at the end of rendering. See `examples/screenShader.frag` for an example. | str | \[\[Empty\]\] |
| border_part_of_window | whether the window border should be a part of the window | bool | true |

#### Blur

_Subcategory `decoration:blur:`_

| name | description | type | default |
| --- | --- | --- | --- |
| enabled | enable kawase window background blur | bool | true |
| size | blur size (distance) | int | 8 |
| passes | the amount of passes to perform | int | 1 |
| ignore_opacity | make the blur layer ignore the opacity of the window | bool | true |
| new_optimizations | whether to enable further optimizations to the blur. Recommended to leave on, as it will massively improve performance. | bool | true |
| xray | if enabled, floating windows will ignore tiled windows in their blur. Only available if new_optimizations is true. Will reduce overhead on floating blur significantly. | bool | false |
| noise | how much noise to apply. [0.0 - 1.0] | float | 0.0117 |
| contrast | contrast modulation for blur. [0.0 - 2.0] | float | 0.8916 |
| brightness | brightness modulation for blur. [0.0 - 2.0] | float | 0.8172 |
| vibrancy | Increase saturation of blurred colors. [0.0 - 1.0] | float | 0.1696 |
| vibrancy_darkness | How strong the effect of `vibrancy` is on dark areas . [0.0 - 1.0] | float | 0.0 |
| special | whether to blur behind the special workspace (note: expensive) | bool | false |
| popups | whether to blur popups (e.g. right-click menus) | bool | false |
| popups_ignorealpha | works like ignorealpha in layer rules. If pixel opacity is below set value, will not blur. [0.0 - 1.0] | float | 0.2 |
| input_methods | whether to blur input methods (e.g. fcitx5) | bool | false |
| input_methods_ignorealpha | works like ignorealpha in layer rules. If pixel opacity is below set value, will not blur. [0.0 - 1.0] | float | 0.2 |

{{< callout type=info >}}

`blur:size` and `blur:passes` have to be at least 1.

Increasing `blur:passes` is necessary to prevent blur looking wrong on higher
`blur:size` values, but remember that higher `blur:passes` will require more
strain on the GPU.

{{< /callout >}}

#### Shadow

_Subcategory `decoration:shadow:`_

| name | description | type | default |
| --- | --- | --- | --- |
| enabled | enable drop shadows on windows | bool | true |
| range | Shadow range ("size") in layout px | int | 4 |
| render_power | in what power to render the falloff (more power, the faster the falloff) [1 - 4] | int | 3 |
| sharp | if enabled, will make the shadows sharp, akin to an infinite render power | bool | false |
| ignore_window | if true, the shadow will not be rendered behind the window itself, only around it. | bool | true |
| color | shadow's color. Alpha dictates shadow's opacity. | color | 0xee1a1a1a |
| color_inactive | inactive shadow color. (if not set, will fall back to color) | color | unset |
| offset | shadow's rendering offset. | vec2 | [0, 0] |
| scale | shadow's scale. [0.0 - 1.0] | float | 1.0 |

### Animations

| name | description | type | default |
| --- | --- | --- | --- |
| enabled | enable animations | bool | true |
| workspace_wraparound | enable workspace wraparound, causing directional workspace animations to animate as if the first and last workspaces were adjacent | bool | false |

{{< callout type=info >}}

_[More about Animations](../Animations)._

{{< /callout >}}

### Input

| name | description | type | default |
|---|---|---|---|
| kb_model | Appropriate XKB keymap parameter. See the note below. | str | \[\[Empty\]\] |
| kb_layout | Appropriate XKB keymap parameter | str | us |
| kb_variant | Appropriate XKB keymap parameter | str | \[\[Empty\]\] |
| kb_options | Appropriate XKB keymap parameter | str | \[\[Empty\]\] |
| kb_rules | Appropriate XKB keymap parameter | str | \[\[Empty\]\] |
| kb_file | If you prefer, you can use a path to your custom .xkb file. | str | \[\[Empty\]\] |
| numlock_by_default | Engage numlock by default. | bool | false |
| resolve_binds_by_sym | Determines how keybinds act when multiple layouts are used. If false, keybinds will always act as if the first specified layout is active. If true, keybinds specified by symbols are activated when you type the respective symbol with the current layout. | bool | false |
| repeat_rate | The repeat rate for held-down keys, in repeats per second. | int | 25 |
| repeat_delay | Delay before a held-down key is repeated, in milliseconds. | int | 600 |
| sensitivity | Sets the mouse input sensitivity. Value is clamped to the range -1.0 to 1.0. [libinput#pointer-acceleration](https://wayland.freedesktop.org/libinput/doc/latest/pointer-acceleration.html#pointer-acceleration) | float | 0.0 |
| accel_profile | Sets the cursor acceleration profile. Can be one of `adaptive`, `flat`. Can also be `custom`, see [below](#custom-accel-profiles). Leave empty to use `libinput`'s default mode for your input device. [libinput#pointer-acceleration](https://wayland.freedesktop.org/libinput/doc/latest/pointer-acceleration.html#pointer-acceleration) [adaptive/flat/custom]| str | \[\[Empty\]\] |
| force_no_accel | Force no cursor acceleration. This bypasses most of your pointer settings to get as raw of a signal as possible. **Enabling this is not recommended due to potential cursor desynchronization.** | bool | false |
| rotation | Sets the rotation of a device in degrees clockwise off the logical neutral position. Value is clamped to the range 0 to 359. | int | 0 |
| left_handed | Switches RMB and LMB | bool | false |
| scroll_points | Sets the scroll acceleration profile, when `accel_profile` is set to `custom`. Has to be in the form `<step> <points>`. Leave empty to have a flat scroll curve. | str | \[\[Empty\]\] |
| scroll_method | Sets the scroll method. Can be one of `2fg` (2 fingers), `edge`, `on_button_down`, `no_scroll`. [libinput#scrolling](https://wayland.freedesktop.org/libinput/doc/latest/scrolling.html) [2fg/edge/on_button_down/no_scroll] | str | \[\[Empty\]\] |
| scroll_button | Sets the scroll button. Has to be an int, cannot be a string. Check `wev` if you have any doubts regarding the ID. 0 means default. | int | 0 |
| scroll_button_lock | If the scroll button lock is enabled, the button does not need to be held down. Pressing and releasing the button toggles the button lock, which logically holds the button down or releases it. While the button is logically held down, motion events are converted to scroll events. | bool | false |
| scroll_factor | Multiplier added to scroll movement for external mice. Note that there is a separate setting for [touchpad scroll_factor](#touchpad).  | float | 1.0 |
| natural_scroll | Inverts scrolling direction. When enabled, scrolling moves content directly, rather than manipulating a scrollbar. | bool | false |
| follow_mouse | Specify if and how cursor movement should affect window focus. See the note below. [0/1/2/3] | int | 1 |
| follow_mouse_threshold | The smallest distance in logical pixels the mouse needs to travel for the window under it to get focused. Works only with follow_mouse = 1. | float | 0.0 |
| focus_on_close | Controls the window focus behavior when a window is closed. When set to 0, focus will shift to the next window candidate. When set to 1, focus will shift to the window under the cursor. [0/1] | int | 0 |
| mouse_refocus | If disabled, mouse focus won't switch to the hovered window unless the mouse crosses a window boundary when `follow_mouse=1`. | bool | true |
| float_switch_override_focus | If enabled (1 or 2), focus will change to the window under the cursor when changing from tiled-to-floating and vice versa. If 2, focus will also follow mouse on float-to-float switches. | int | 1 |
| special_fallthrough | if enabled, having only floating windows in the special workspace will not block focusing windows in the regular workspace. | bool | false |
| off_window_axis_events | Handles axis events around (gaps/border for tiled, dragarea/border for floated) a focused window. `0` ignores axis events `1` sends out-of-bound coordinates `2` fakes pointer coordinates to the closest point inside the window `3` warps the cursor to the closest point inside the window | int | 1 |
| emulate_discrete_scroll | Emulates discrete scrolling from high resolution scrolling events. `0` disables it, `1` enables handling of non-standard events only, and `2` force enables all scroll wheel events to be handled | int | 1 |

{{< callout type=info >}}

### XKB Settings

You can find a list of models, layouts, variants and options in
[`/usr/share/X11/xkb/rules/base.lst`](file:///usr/share/X11/xkb/rules/base.lst).
Alternatively, you can use the `localectl` command to discover what is available
on your system.

For switchable keyboard configurations, take a look at
[the uncommon tips & tricks page entry](../Uncommon-tips--tricks/#switchable-keyboard-layouts).

{{< /callout >}}

{{< callout type=info >}}

### Follow Mouse Cursor

- 0 - Cursor movement will not change focus.
- 1 - Cursor movement will always change focus to the window under the cursor.
- 2 - Cursor focus will be detached from keyboard focus. Clicking on a window
  will move keyboard focus to that window.
- 3 - Cursor focus will be completely separate from keyboard focus. Clicking on
  a window will not change keyboard focus.

### Custom accel profiles

#### `accel_profile`

`custom <step> <points...>`

Example: `custom 200 0.0 0.5`

#### `scroll_points`

NOTE: Only works when `accel_profile` is set to `custom`.

`<step> <points...>`

Example: `0.2 0.0 0.5 1 1.2 1.5`

To mimic the Windows acceleration curves, take a look at
[this script](https://gist.github.com/fufexan/de2099bc3086f3a6c83d61fc1fcc06c9).

See
[the libinput doc](https://wayland.freedesktop.org/libinput/doc/latest/pointer-acceleration.html)
for more insights on how it works.

{{< /callout >}}

#### Touchpad

_Subcategory `input:touchpad:`_

| name | description | type | default |
| --- | --- | --- | --- |
| disable_while_typing | Disable the touchpad while typing. | bool | true |
| natural_scroll | Inverts scrolling direction. When enabled, scrolling moves content directly, rather than manipulating a scrollbar. | bool | false |
| scroll_factor | Multiplier applied to the amount of scroll movement. | float | 1.0 |
| middle_button_emulation | Sending LMB and RMB simultaneously will be interpreted as a middle click. This disables any touchpad area that would normally send a middle click based on location. [libinput#middle-button-emulation](https://wayland.freedesktop.org/libinput/doc/latest/middle-button-emulation.html) | bool | false |
| tap_button_map | Sets the tap button mapping for touchpad button emulation. Can be one of `lrm` (default) or `lmr` (Left, Middle, Right Buttons). [lrm/lmr] | str | \[\[Empty\]\] |
| clickfinger_behavior | Button presses with 1, 2, or 3 fingers will be mapped to LMB, RMB, and MMB respectively. This disables interpretation of clicks based on location on the touchpad. [libinput#clickfinger-behavior](https://wayland.freedesktop.org/libinput/doc/latest/clickpad-softbuttons.html#clickfinger-behavior) | bool | false |
| tap-to-click | Tapping on the touchpad with 1, 2, or 3 fingers will send LMB, RMB, and MMB respectively. | bool | true |
| drag_lock | When enabled, lifting the finger off while dragging will not drop the dragged item. 0 -> disabled, 1 -> enabled with timeout, 2 -> enabled sticky. [libinput#tap-and-drag](https://wayland.freedesktop.org/libinput/doc/latest/tapping.html#tap-and-drag) | int | 0 |
| tap-and-drag | Sets the tap and drag mode for the touchpad | bool | true |
| flip_x | inverts the horizontal movement of the touchpad | bool | false |
| flip_y | inverts the vertical movement of the touchpad | bool | false |
| drag_3fg | enables three finger drag, 0 -> disabled, 1 -> 3 fingers, 2 -> 4 fingers [libinput#drag-3fg](https://wayland.freedesktop.org/libinput/doc/latest/drag-3fg.html) | int | 0 |

#### Touchdevice

_Subcategory `input:touchdevice:`_

| name | description | type | default |
| --- | --- | --- | --- |
| transform | Transform the input from touchdevices. The possible transformations are the same as [those of the monitors](../Monitors/#rotating). `-1` means it's unset. | int | -1 |
| output | The monitor to bind touch devices. The default is auto-detection. To stop auto-detection, use an empty string or the "\[\[Empty\]\]" value. | string | \[\[Auto\]\] |
| enabled | Whether input is enabled for touch devices. | bool | true |

#### Virtualkeyboard

_Subcategory `input:virtualkeyboard:`_

| name | description | type | default |
| --- | --- | --- | --- |
| share_states | Unify key down states and modifier states with other keyboards. 0 -> no, 1 -> yes, 2 -> yes unless IME client | int | 2 |
| release_pressed_on_close | Release all pressed keys by virtual keyboard on close. | bool | false |

#### Tablet

_Subcategory `input:tablet:`_

| name | description | type | default |
| --- | --- | --- | --- |
| transform | transform the input from tablets. The possible transformations are the same as [those of the monitors](../Monitors/#rotating). `-1` means it's unset. | int | -1 |
| output | the monitor to bind tablets. Can be `current` or a monitor name. Leave empty to map across all monitors. | string | \[\[Empty\]\] |
| region_position | position of the mapped region in monitor layout relative to the top left corner of the bound monitor or all monitors. | vec2 | [0, 0] |
| absolute_region_position | whether to treat the `region_position` as an absolute position in monitor layout. Only applies when `output` is empty. | bool | false |
| region_size | size of the mapped region. When this variable is set, tablet input will be mapped to the region. [0, 0] or invalid size means unset. | vec2 | [0, 0] |
| relative_input | whether the input should be relative | bool | false |
| left_handed | if enabled, the tablet will be rotated 180 degrees | bool | false |
| active_area_size | size of tablet's active area in mm | vec2 | [0, 0] |
| active_area_position | position of the active area in mm | vec2 | [0, 0] |

### Per-device input config

Described [here](../Keywords#per-device-input-configs).

### Gestures

_Subcategory `gestures:`_

| name | description | type | default |
| --- | --- | --- | --- |
| workspace_swipe_distance | in px, the distance of the touchpad gesture | int | 300 |
| workspace_swipe_touch | enable workspace swiping from the edge of a touchscreen | bool | false |
| workspace_swipe_invert | invert the direction (touchpad only) | bool | true |
| workspace_swipe_touch_invert | invert the direction (touchscreen only) | bool | false |
| workspace_swipe_min_speed_to_force | minimum speed in px per timepoint to force the change ignoring `cancel_ratio`. Setting to `0` will disable this mechanic. | int | 30 |
| workspace_swipe_cancel_ratio | how much the swipe has to proceed in order to commence it. (0.7 -> if > 0.7 * distance, switch, if less, revert) [0.0 - 1.0] | float | 0.5 |
| workspace_swipe_create_new | whether a swipe right on the last workspace should create a new one. | bool | true |
| workspace_swipe_direction_lock | if enabled, switching direction will be locked when you swipe past the `direction_lock_threshold` (touchpad only). | bool | true |
| workspace_swipe_direction_lock_threshold | in px, the distance to swipe before direction lock activates (touchpad only). | int | 10 |
| workspace_swipe_forever | if enabled, swiping will not clamp at the neighboring workspaces but continue to the further ones. | bool | false |
| workspace_swipe_use_r | if enabled, swiping will use the `r` prefix instead of the `m` prefix for finding workspaces. | bool | false |
| close_max_timeout | the timeout for a window to close when using a 1:1 gesture, in ms | int | 1000 |

{{< callout type=info >}}

`workspace_swipe`, `workspace_swipe_fingers` and `workspace_swipe_min_fingers` were removed in favor of the new gestures system.

You can add this gesture config to replicate the swiping functionality with 3 fingers. See the [gestures](../Gestures) page for more info.

```ini
gesture = 3, horizontal, workspace
```

{{< /callout >}}

### Group

_Subcategory `group:`_

| name | description | type | default |
| --- | --- | --- | --- |
| auto_group | whether new windows will be automatically grouped into the focused unlocked group. Note: if you want to disable auto_group only for specific windows, use [the "group barred" window rule](../Window-Rules/#group-window-rule-options) instead. | bool | true |
| insert_after_current | whether new windows in a group spawn after current or at group tail | bool | true |
| focus_removed_window | whether Hyprland should focus on the window that has just been moved out of the group | bool | true |
| drag_into_group | whether dragging a window into a unlocked group will merge them. Options: 0 (disabled), 1 (enabled), 2 (only when dragging into the groupbar) | int | 1 |
| merge_groups_on_drag | whether window groups can be dragged into other groups | bool | true |
| merge_groups_on_groupbar | whether one group will be merged with another when dragged into its groupbar | bool | true |
| merge_floated_into_tiled_on_groupbar | whether dragging a floating window into a tiled window groupbar will merge them | bool | false |
| group_on_movetoworkspace | whether using movetoworkspace[silent] will merge the window into the workspace's solitary unlocked group | bool | false |
| col.border_active | active group border color | gradient | 0x66ffff00 |
| col.border_inactive | inactive (out of focus) group border color | gradient | 0x66777700 |
| col.border_locked_active | active locked group border color | gradient | 0x66ff5500 |
| col.border_locked_inactive | inactive locked group border color | gradient | 0x66775500 |

#### Groupbar

_Subcategory `group:groupbar:`_

| name | description | type | default |
| --- | --- | --- | --- |
| enabled | enables groupbars | bool | true |
| font_family | font used to display groupbar titles, use `misc:font_family` if not specified | string | [\[Empty]] |
| font_size | font size of groupbar title | int | 8 |
| font_weight_active | font weight of active groupbar title | font_weight | normal |
| font_weight_inactive | font weight of inactive groupbar title | font_weight | normal |
| gradients | enables gradients | bool | false |
| height | height of the groupbar | int | 14 |
| indicator_gap | height of gap between groupbar indicator and title | int | 0 |
| indicator_height | height of the groupbar indicator | int | 3 |
| stacked | render the groupbar as a vertical stack | bool | false |
| priority | sets the decoration priority for groupbars | int | 3 |
| render_titles | whether to render titles in the group bar decoration | bool | true |
| text_offset | adjust vertical position for titles | int | 0 |
| scrolling | whether scrolling in the groupbar changes group active window | bool | true |
| rounding | how much to round the indicator | int | 1 |
| rounding_power |  adjusts the curve used for rounding broupbar corners, larger is smoother, 2.0 is a circle, 4.0 is a squircle, 1.0 is a triangular corner. [1.0 - 10.0] | float |  2.0 |
| gradient_rounding | how much to round the gradients | int | 2 |
| gradient_rounding_power | adjusts the curve used for rounding gradient corners, larger is smoother, 2.0 is a circle, 4.0 is a squircle, 1.0 is a triangular corner. [1.0 - 10.0] | float | 2.0 |
| round_only_edges | round only the indicator edges of the entire groupbar | bool | true |
| gradient_round_only_edges | round only the gradient edges of the entire groupbar | bool | true |
| text_color | color for window titles in the groupbar | color | 0xffffffff |
| text_color_inactive | color for inactive windows' titles in the groupbar (if unset, defaults to text_color) | color | unset |
| text_color_locked_active | color for the active window's title in a locked group (if unset, defaults to text_color) | color | unset |
| text_color_locked_inactive | color for inactive windows' titles in locked groups (if unset, defaults to text_color_inactive) | color | unset |
| col.active | active group bar background color | gradient | 0x66ffff00 |
| col.inactive | inactive (out of focus) group bar background color | gradient | 0x66777700 |
| col.locked_active | active locked group bar background color | gradient | 0x66ff5500 |
| col.locked_inactive | inactive locked group bar background color | gradient | 0x66775500 |
| gaps_in | gap size between gradients | int | 2 |
| gaps_out | gap size between gradients and window | int | 2 |
| keep_upper_gap | add or remove upper gap | bool | true |

### Misc

_Subcategory `misc:`_

| name | description | type | default |
|---|---|---|---|
| disable_hyprland_logo | disables the random Hyprland logo / anime girl background. :( | bool | false |
| disable_splash_rendering | disables the Hyprland splash rendering. (requires a monitor reload to take effect) | bool | false |
| disable_scale_notification | disables notification popup when a monitor fails to set a suitable scale | bool | false |
| col.splash | Changes the color of the splash text (requires a monitor reload to take effect). | color | 0xffffffff |
| font_family | Set the global default font to render the text including debug fps/notification, config error messages and etc., selected from system fonts. | string | Sans |
| splash_font_family | Changes the font used to render the splash text, selected from system fonts (requires a monitor reload to take effect). | string | [\[Empty]] |
| force_default_wallpaper | Enforce any of the 3 default wallpapers. Setting this to `0` or `1` disables the anime background. `-1` means "random". [-1/0/1/2] | int | -1 |
| vfr | controls the VFR status of Hyprland. Heavily recommended to leave enabled to conserve resources. | bool | true |
| vrr | controls the VRR (Adaptive Sync) of your monitors. 0 - off, 1 - on, 2 - fullscreen only, 3 - fullscreen with `video` or `game` content type [0/1/2/3] | int | 0 |
| mouse_move_enables_dpms | If DPMS is set to off, wake up the monitors if the mouse moves. | bool | false |
| key_press_enables_dpms | If DPMS is set to off, wake up the monitors if a key is pressed. | bool | false |
| name_vk_after_proc | Name virtual keyboards after the processes that create them. E.g. /usr/bin/fcitx5 will have hl-virtual-keyboard-fcitx5. | bool | true |
| always_follow_on_dnd | Will make mouse focus follow the mouse when drag and dropping. Recommended to leave it enabled, especially for people using focus follows mouse at 0. | bool | true |
| layers_hog_keyboard_focus | If true, will make keyboard-interactive layers keep their focus on mouse move (e.g. wofi, bemenu) | bool | true |
| animate_manual_resizes | If true, will animate manual window resizes/moves | bool | false |
| animate_mouse_windowdragging | If true, will animate windows being dragged by mouse, note that this can cause weird behavior on some curves | bool | false |
| disable_autoreload | If true, the config will not reload automatically on save, and instead needs to be reloaded with `hyprctl reload`. Might save on battery. | bool | false |
| enable_swallow | Enable window swallowing | bool | false |
| swallow_regex | The _class_ regex to be used for windows that should be swallowed (usually, a terminal). To know more about the list of regex which can be used [use this cheatsheet](https://github.com/ziishaned/learn-regex/blob/master/README.md). | str | \[\[Empty\]\] |
| swallow_exception_regex | The _title_ regex to be used for windows that should _not_ be swallowed by the windows specified in swallow_regex  (e.g. wev). The regex is matched against the parent (e.g. Kitty) window's title on the assumption that it changes to whatever process it's running. | str | \[\[Empty\]\] |
| focus_on_activate | Whether Hyprland should focus an app that requests to be focused (an `activate` request) | bool | false |
| mouse_move_focuses_monitor | Whether mouse moving into a different monitor should focus it | bool | true |
| allow_session_lock_restore | if true, will allow you to restart a lockscreen app in case it crashes | bool | false |
| session_lock_xray | if true, keep rendering workspaces below your lockscreen | bool | false |
| background_color | change the background color. (requires enabled `disable_hyprland_logo`) | color | 0x111111 |
| close_special_on_empty | close the special workspace if the last window is removed | bool | true |
| new_window_takes_over_fullscreen | if there is a fullscreen or maximized window, decide whether a new tiled window opened should replace it, stay behind or disable the fullscreen/maximized state. 0 - behind, 1 - takes over, 2 - unfullscreen/unmaxize [0/1/2] | int | 0 |
| exit_window_retains_fullscreen | if true, closing a fullscreen window makes the next focused window fullscreen | bool | false |
| initial_workspace_tracking | if enabled, windows will open on the workspace they were invoked on. 0 - disabled, 1 - single-shot, 2 - persistent (all children too) | int | 1 |
| middle_click_paste | whether to enable middle-click-paste (aka primary selection) | bool | true |
| render_unfocused_fps | the maximum limit for renderunfocused windows' fps in the background (see also [Window-Rules](../Window-Rules/#dynamic-rules) - `renderunfocused`)| int | 15 |
| disable_xdg_env_checks | disable the warning if XDG environment is externally managed | bool | false |
| disable_hyprland_qtutils_check | disable the warning if hyprland-qtutils is not installed | bool | false |
| lockdead_screen_delay | delay after which the "lockdead" screen will appear in case a lockscreen app fails to cover all the outputs (5 seconds max) | int | 1000 |
| enable_anr_dialog | whether to enable the ANR (app not responding) dialog when your apps hang | bool | true |
| anr_missed_pings | number of missed pings before showing the ANR dialog | int | 5 |
| size_limits_tiled | whether to apply minsize and maxsize rules to tiled windows | bool | false |

### Binds

_Subcategory `binds:`_

| name | description | type | default |
| --- | --- | --- | --- |
| pass_mouse_when_bound | if disabled, will not pass the mouse events to apps / dragging windows around if a keybind has been triggered. | bool | false |
| scroll_event_delay | in ms, how many ms to wait after a scroll event to allow passing another one for the binds. | int | 300 |
| workspace_back_and_forth | If enabled, an attempt to switch to the currently focused workspace will instead switch to the previous workspace. Akin to i3's _auto_back_and_forth_. | bool | false |
| hide_special_on_workspace_change | If enabled, changing the active workspace (including to itself) will hide the special workspace on the monitor where the newly active workspace resides. | bool | false |
| allow_workspace_cycles | If enabled, workspaces don't forget their previous workspace, so cycles can be created by switching to the first workspace in a sequence, then endlessly going to the previous workspace. | bool | false |
| workspace_center_on | Whether switching workspaces should center the cursor on the workspace (0) or on the last active window for that workspace (1) | int | 0 |
| focus_preferred_method | sets the preferred focus finding method when using `focuswindow`/`movewindow`/etc with a direction. 0 - history (recent have priority), 1 - length (longer shared edges have priority) | int | 0 |
| ignore_group_lock | If enabled, dispatchers like `moveintogroup`, `moveoutofgroup` and `movewindoworgroup` will ignore lock per group. | bool | false |
| movefocus_cycles_fullscreen | If enabled, when on a fullscreen window, `movefocus` will cycle fullscreen, if not, it will move the focus in a direction. | bool | false |
| movefocus_cycles_groupfirst | If enabled, when in a grouped window, movefocus will cycle windows in the groups first, then at each ends of tabs, it'll move on to other windows/groups | bool | false |
| disable_keybind_grabbing | If enabled, apps that request keybinds to be disabled (e.g. VMs) will not be able to do so. | bool | false |
| window_direction_monitor_fallback | If enabled, moving a window or focus over the edge of a monitor with a direction will move it to the next monitor in that direction. | bool | true |
| allow_pin_fullscreen | If enabled, Allow fullscreen to pinned windows, and restore their pinned status afterwards | bool | false |
| drag_threshold | Movement threshold in pixels for window dragging and c/g bind flags. 0 to disable and grab on mousedown. | int | 0 |

### XWayland

_Subcategory `xwayland:`_ 

| name | description | type | default |
| --- | --- | --- | --- |
| enabled | allow running applications using X11 | bool | true |
| use_nearest_neighbor | uses the nearest neighbor filtering for xwayland apps, making them pixelated rather than blurry | bool | true |
| force_zero_scaling | forces a scale of 1 on xwayland windows on scaled displays. | bool | false |
| create_abstract_socket | Create the [abstract Unix domain socket](../XWayland/#abstract-unix-domain-socket) for XWayland connections. (XWayland restart is required for changes to take effect; Linux only) | bool | false |

### OpenGL

_Subcategory `opengl:`_ 

| name | description | type | default |
| --- | --- | --- | --- |
| nvidia_anti_flicker | reduces flickering on nvidia at the cost of possible frame drops on lower-end GPUs. On non-nvidia, this is ignored. | bool | true |

### Render

_Subcategory `render:`_ 

| name | description | type | default |
| --- | --- | --- | --- |
| direct_scanout | Enables direct scanout. Direct scanout attempts to reduce lag when there is only one fullscreen application on a screen (e.g. game). It is also recommended to set this to false if the fullscreen application shows graphical glitches. 0 - off, 1 - on, 2 - auto (on with content type 'game') | int | 0 |
| expand_undersized_textures | Whether to expand undersized textures along the edge, or rather stretch the entire texture. | bool | true |
| xp_mode | Disables back buffer and bottom layer rendering. | bool | false |
| ctm_animation | Whether to enable a fade animation for CTM changes (hyprsunset). 2 means "auto" which disables them on Nvidia. | int | 2 |
| cm_fs_passthrough | Passthrough color settings for fullscreen apps when possible. 0 - off, 1 - always, 2 - hdr only | int | 2 |
| cm_enabled | Whether the color management pipeline should be enabled or not (requires a restart of Hyprland to fully take effect) | bool | true |
| send_content_type | Report content type to allow monitor profile autoswitch (may result in a black screen during the switch) | bool | true |
| cm_auto_hdr | Auto-switch to HDR in fullscreen when needed. 0 - off, 1 - switch to `cm, hdr`, 2 - switch to `cm, hdredid` | int | 1 |
| new_render_scheduling | Automatically uses triple buffering when needed, improves FPS on underpowered devices. | bool | false |
| non_shader_cm | Enable CM without shader. 0 - disable, 1 - whenever possible, 2 - DS and passthrough only, 3 - don't block DS when non-shader CM isn't available | int | 2 |

`cm_auto_hdr` requires `--target-colorspace-hint-mode=source` mpv option to work with mpv versions greater than v0.40.0

### Cursor

_Subcategory `cursor:`_ 

| name | description | type | default |
| --- | --- | --- | --- |
| invisible | don't render cursors | bool | false |
| sync_gsettings_theme | sync xcursor theme with gsettings, it applies cursor-theme and cursor-size on theme load to gsettings making most CSD gtk based clients use same xcursor theme and size. | bool | true |
| no_hardware_cursors | disables hardware cursors. 0 - use hw cursors if possible, 1 - don't use hw cursors, 2 - auto (disable when tearing) | int | 2 |
| no_break_fs_vrr | disables scheduling new frames on cursor movement for fullscreen apps with VRR enabled to avoid framerate spikes (may require no_hardware_cursors = true) 0 - off, 1 - on, 2 - auto (on with content type 'game') | int | 2 |
| min_refresh_rate | minimum refresh rate for cursor movement when `no_break_fs_vrr` is active. Set to minimum supported refresh rate or higher | int | 24 |
| hotspot_padding | the padding, in logical px, between screen edges and the cursor | int | 1 |
| inactive_timeout | in seconds, after how many seconds of cursor's inactivity to hide it. Set to `0` for never. | float | 0 |
| no_warps | if true, will not warp the cursor in many cases (focusing, keybinds, etc) | bool | false |
| persistent_warps | When a window is refocused, the cursor returns to its last position relative to that window, rather than to the centre. | bool | false |
| warp_on_change_workspace | Move the cursor to the last focused window after changing the workspace. Options: 0 (Disabled), 1 (Enabled), 2 (Force - ignores cursor:no_warps option) | int | 0 |
| warp_on_toggle_special | Move the cursor to the last focused window when toggling a special workspace. Options: 0 (Disabled), 1 (Enabled), 2 (Force - ignores cursor:no_warps option) | int | 0 |
| default_monitor | the name of a default monitor for the cursor to be set to on startup (see `hyprctl monitors` for names) | str | [[EMPTY]] |
| zoom_factor | the factor to zoom by around the cursor. Like a magnifying glass. Minimum 1.0 (meaning no zoom) | float | 1.0 |
| zoom_rigid | whether the zoom should follow the cursor rigidly (cursor is always centered if it can be) or loosely | bool | false |
| enable_hyprcursor | whether to enable hyprcursor support | bool | true |
| hide_on_key_press | Hides the cursor when you press any key until the mouse is moved. | bool | false |
| hide_on_touch | Hides the cursor when the last input was a touch input until a mouse input is done. | bool | true |
| use_cpu_buffer | Makes HW cursors use a CPU buffer. Required on Nvidia to have HW cursors. 0 - off, 1 - on, 2 - auto (nvidia only) | int | 2 |
| warp_back_after_non_mouse_input | Warp the cursor back to where it was after using a non-mouse input to move it, and then returning back to mouse. | bool | false |

### Ecosystem

_Subcategory `ecosystem:`_

| name | description | type | default |
| --- | --- | --- | --- |
| no_update_news | disable the popup that shows up when you update hyprland to a new version. | bool | false |
| no_donation_nag | disable the popup that shows up twice a year encouraging to donate. | bool | false |
| enforce_permissions | whether to enable [permission control](../Permissions). | bool | false |

### Experimental

_Subcategory `experimental:`_

| name | description | type | default |
| --- | --- | --- | --- |
| xx_color_management_v4 | enable color management protocol | bool | false |

Since The release of `Mesa 25.1.1` settings below are no longer required, so just skip.

Requires a client with `frog-color-management-v1` or `xx-color-management-v4` support like gamescope or https://github.com/Zamundaaa/VK_hdr_layer

Steam:

`DXVK_HDR=1 gamescope -f --hdr-enabled -- %command%`

`ENABLE_HDR_WSI=1 DXVK_HDR=1 DISPLAY= %command%` (requires wayland-enabled proton version)

Non-steam:

`ENABLE_HDR_WSI=1 DXVK_HDR=1 DISPLAY= wine executable.exe`

Video:

`ENABLE_HDR_WSI=1 mpv --vo=gpu-next --target-colorspace-hint --gpu-api=vulkan --gpu-context=waylandvk "filename"`


### Debug

_Subcategory `debug:`_

{{< callout type=warning >}}

Only for developers.

{{< /callout >}}

| name | description | type | default |
| --- | --- | --- | --- |
| overlay | print the debug performance overlay. Disable VFR for accurate results. | bool | false |
| damage_blink | (epilepsy warning!) flash areas updated with damage tracking | bool | false |
| disable_logs | disable logging to a file | bool | true |
| disable_time | disables time logging | bool | true |
| damage_tracking | redraw only the needed bits of the display. Do **not** change. (default: full - 2) monitor - 1, none - 0 | int | 2 |
| enable_stdout_logs | enables logging to stdout | bool | false |
| manual_crash | set to 1 and then back to 0 to crash Hyprland. | int | 0 |
| suppress_errors | if true, do not display config file parsing errors. | bool | false |
| watchdog_timeout | sets the timeout in seconds for watchdog to abort processing of a signal of the main thread. Set to 0 to disable. | int | 5 |
| disable_scale_checks | disables verification of the scale factors. Will result in pixel alignment and rounding errors. | bool | false |
| error_limit | limits the number of displayed config file parsing errors. | int | 5 |
| error_position | sets the position of the error bar. top - 0, bottom - 1 | int | 0 |
| colored_stdout_logs | enables colors in the stdout logs. | bool | true |
| pass | enables render pass debugging. | bool | false |
| full_cm_proto | claims support for all cm proto features (requires restart) | bool | false |

### More

There are more config options described in other pages, which are layout- or
circumstance-specific. See the sidebar for more pages.
