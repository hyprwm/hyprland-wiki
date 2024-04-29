---
weight: 2
title: Variables
---

For basic syntax info, see [Configuring Hyprland](../Configuring-Hyprland).

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

{{< callout type=info >}}

**_Colors:_**

You have 3 options:

rgba(), e.g. `rgba(b3ff1aee)`

rgb(), e.g. `rgb(b3ff1a)`

legacy, e.g. `0xeeb3ff1a` -> ARGB order

**_Mod list:_**

```ini
SHIFT CAPS CTRL/CONTROL ALT MOD2 MOD3 SUPER/WIN/LOGO/MOD4 MOD5
```

{{< /callout >}}

## Sections

### General

| name | description | type | default |
|---|---|---|---|
| sensitivity | mouse sensitivity (legacy, may cause bugs if not 1, prefer `input:sensitivity`) | float | 1.0 |
| border_size | size of the border around windows | int | 1 |
| no_border_on_floating | disable borders for floating windows | bool | false |
| gaps_in | gaps between windows, also supports css style gaps (top, right, bottom, left -> 5,10,15,20) | int | 5 |
| gaps_out | gaps between windows and monitor edges, also supports css style gaps (top, right, bottom, left -> 5,10,15,20) | int | 20 |
| gaps_workspaces | gaps between workspaces. Stacks with gaps_out. | int | 0 |
| col.inactive_border | border color for inactive windows | gradient | 0xff444444 |
| col.active_border | border color for the active window | gradient | 0xffffffff |
| col.nogroup_border | inactive border color for window that cannot be added to a group (see `denywindowfromgroup` dispatcher) | gradient | 0xffffaaff |
| col.nogroup_border_active | active border color for window that cannot be added to a group | gradient | 0xffff00ff |
| cursor_inactive_timeout | in seconds, after how many seconds of cursor's inactivity to hide it. Set to `0` for never. | int | 0 |
| layout | which layout to use. [dwindle/master] | str | dwindle |
| no_cursor_warps | if true, will not warp the cursor in many cases (focusing, keybinds, etc) | bool | false |
| no_focus_fallback | if true, will not fall back to the next available window when moving focus in a direction where no window was found | bool | false |
| apply_sens_to_raw | if on, will also apply the sensitivity to raw mouse output (e.g. sensitivity in games) **NOTICE:** ***really*** not recommended. | bool | false |
| resize_on_border | enables resizing windows by clicking and dragging on borders and gaps | bool | false |
| extend_border_grab_area | extends the area around the border where you can click and drag on, only used when `general:resize_on_border` is on. | int | 15 |
| hover_icon_on_border | show a cursor icon when hovering over borders, only used when `general:resize_on_border` is on. | bool | true |
| allow_tearing | master switch for allowing tearing to occur. See [the Tearing page](../Tearing). | bool | false |
| resize_corner | force floating windows to use a specific corner when being resized (1-4 going clockwise from top left, 0 to disable) | int | 0 |

{{< callout type=warning >}}

Prefer using `input:sensitivity` over `general:sensitivity` to avoid bugs,
especially with Wine/Proton apps.

{{< /callout >}}

### Decoration

| name | description | type | default |
| --- | --- | --- | --- |
| rounding | rounded corners' radius (in layout px) | int | 0 |
| active_opacity | opacity of active windows. [0.0 - 1.0] | float | 1.0 |
| inactive_opacity | opacity of inactive windows. [0.0 - 1.0] | float | 1.0 |
| fullscreen_opacity | opacity of fullscreen windows. [0.0 - 1.0] | float | 1.0 |
| drop_shadow | enable drop shadows on windows | bool | true |
| shadow_range | Shadow range ("size") in layout px | int | 4 |
| shadow_render_power | in what power to render the falloff (more power, the faster the falloff) [1 - 4] | int | 3 |
| shadow_ignore_window | if true, the shadow will not be rendered behind the window itself, only around it. | bool | true |
| col.shadow | shadow's color. Alpha dictates shadow's opacity. | color | 0xee1a1a1a |
| col.shadow_inactive | inactive shadow color. (if not set, will fall back to col.shadow) | color | unset |
| shadow_offset | shadow's rendering offset. | vec2 | [0, 0] |
| shadow_scale | shadow's scale. [0.0 - 1.0] | float | 1.0 |
| dim_inactive | enables dimming of inactive windows | bool | false |
| dim_strength | how much inactive windows should be dimmed [0.0 - 1.0] | float | 0.5 |
| dim_special | how much to dim the rest of the screen by when a special workspace is open. [0.0 - 1.0] | float | 0.2 |
| dim_around | how much the `dimaround` window rule should dim by. [0.0 - 1.0] | float | 0.4 |
| screen_shader | a path to a custom shader to be applied at the end of rendering. See `examples/screenShader.frag` for an example. | str | \[\[Empty\]\] |

#### Blur

_Subcategory `decoration:blur:`_

| name | description | type | default |
| --- | --- | --- | --- |
| enabled | enable kawase window background blur | bool | true |
| size | blur size (distance) | int | 8 |
| passes | the amount of passes to perform | int | 1 |
| ignore_opacity | make the blur layer ignore the opacity of the window | bool | false |
| new_optimizations | whether to enable further optimizations to the blur. Recommended to leave on, as it will massively improve performance. | bool | true |
| xray | if enabled, floating windows will ignore tiled windows in their blur. Only available if blur_new_optimizations is true. Will reduce overhead on floating blur significantly. | bool | false |
| noise | how much noise to apply. [0.0 - 1.0] | float | 0.0117 |
| contrast | contrast modulation for blur. [0.0 - 2.0] | float | 0.8916 |
| brightness | brightness modulation for blur. [0.0 - 2.0] | float | 0.8172 |
| vibrancy | Increase saturation of blurred colors. [0.0 - 1.0] | float | 0.1696 |
| vibrancy_darkness | How strong the effect of `vibrancy` is on dark areas . [0.0 - 1.0] | float | 0.0 |
| special | whether to blur behind the special workspace (note: expensive) | bool | false |
| popups | whether to blur popups (e.g. right-click menus) | bool | false |
| popups_ignorealpha | works like ignorealpha in layer rules. If pixel opacity is below set value, will not blur. [0.0 - 1.0] | float | 0.2 |

{{< callout type=important >}}

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

{{< /callout >}}

{{< callout type=info >}}

`blur:size` and `blur:passes` have to be at least 1.

Increasing `blur:passes` is necessary to prevent blur looking wrong on higher
`blur:size` values, but remember that higher `blur:passes` will require more
strain on the GPU.

{{< /callout >}}

### Animations

| name | description | type | default |
| --- | --- | --- | --- |
| enabled | enable animations | bool | true |
| first_launch_animation | enable first launch animation | bool | true |

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
| accel_profile | Sets the cursor acceleration profile. Can be one of `adaptive`, `flat`. Can also be `custom`, see [below](#custom-accel-profiles). Leave empty to use `libinput`'s default mode for your input device. [libinput#pointer-acceleration](https://wayland.freedesktop.org/libinput/doc/latest/pointer-acceleration.html#pointer-acceleration) [adaptive/flat/custom]| str | \[\[Empty\]\]
| force_no_accel | Force no cursor acceleration. This bypasses most of your pointer settings to get as raw of a signal as possible. **Enabling this is not recommended due to potential cursor desynchronization.** | bool | false |
| left_handed | Switches RMB and LMB | bool | false |
| scroll_points | Sets the scroll acceleration profile, when `accel_profile` is set to `custom`. Has to be in the form `<step> <points>`. Leave empty to have a flat scroll curve. | str | \[\[Empty\]\]
| scroll_method | Sets the scroll method. Can be one of `2fg` (2 fingers), `edge`, `on_button_down`, `no_scroll`. [libinput#scrolling](https://wayland.freedesktop.org/libinput/doc/latest/scrolling.html) [2fg/edge/on_button_down/no_scroll] | str | \[\[Empty\]\]
| scroll_button | Sets the scroll button. Has to be an int, cannot be a string. Check `wev` if you have any doubts regarding the ID. 0 means default. | int | 0 |
| scroll_button_lock | If the scroll button lock is enabled, the button does not need to be held down. Pressing and releasing the button toggles the button lock, which logically holds the button down or releases it. While the button is logically held down, motion events are converted to scroll events. | bool | 0 |
| scroll_factor | Multiplier added to scroll movement for external mice. Note that there is a separate setting for [touchpad scroll_factor](#touchpad).  | float | 1.0 |
| natural_scroll | Inverts scrolling direction. When enabled, scrolling moves content directly, rather than manipulating a scrollbar. | bool | false |
| follow_mouse | Specify if and how cursor movement should affect window focus. See the note below. [0/1/2/3] | int | 1 |
| mouse_refocus | If disabled, mouse focus won't switch to the hovered window unless the mouse crosses a window boundary when `follow_mouse=1`. | bool | true |
| float_switch_override_focus | If enabled (1 or 2), focus will change to the window under the cursor when changing from tiled-to-floating and vice versa. If 2, focus will also follow mouse on float-to-float switches. | int | 1 |
| special_fallthrough | if enabled, having only floating windows in the special workspace will not block focusing windows in the regular workspace. | bool | false |
| off_window_axis_events | Handles axis events around (gaps/border for tiled, dragarea/border for floated) a focused window. `0` ignores axis events `1` sends out-of-bound coordinates `2` fakes pointer coordinates to the closest point inside the window `3` warps the cursor to the closest point inside the window | int | 1 |

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
| drag_lock | When enabled, lifting the finger off for a short time while dragging will not drop the dragged item. [libinput#tap-and-drag](https://wayland.freedesktop.org/libinput/doc/latest/tapping.html#tap-and-drag) | bool | false |
| tap-and-drag | Sets the tap and drag mode for the touchpad | bool | false |

#### Touchdevice

_Subcategory `input:touchdevice:`_

| name | description | type | default |
| --- | --- | --- | --- |
| transform | Transform the input from touchdevices. The possible transformations are the same as [those of the monitors](../Monitors/#rotating) | int | 0 |
| output | The monitor to bind touch devices. The default is auto-detection. To stop auto-detection, use an empty string or the "\[\[Empty\]\]" value. | string | \[\[Auto\]\] |
| enabled | Whether input is enabled for touch devices. | bool | true |

#### Tablet

_Subcategory `input:tablet:`_

| name | description | type | default |
| --- | --- | --- | --- |
| transform | transform the input from tablets. The possible transformations are the same as [those of the monitors](../Monitors/#rotating) | int | 0 |
| output | the monitor to bind tablets. Empty means unbound. | string | \[\[Empty\]\] |
| region_position | position of the mapped region in monitor layout. | vec2 | [0, 0] |
| region_size | size of the mapped region. When this variable is set, tablet input will be mapped to the region. [0, 0] or invalid size means unset. | vec2 | [0, 0] |
| relative_input | whether the input should be relative | bool | false |
| left_handed | if enabled, the tablet will be rotated 180 degrees | bool | false |
| active_area_size | size of tablet's active area in mm | vec2 | [0, 0] |
| active_area_position | position of the active area in mm | vec2 | [0, 0] |

### Per-device input config

Described [here](../Keywords#per-device-input-configs).

### Gestures

| name | description | type | default |
| --- | --- | --- | --- |
| workspace_swipe | enable workspace swipe gesture on touchpad | bool | false |
| workspace_swipe_fingers | how many fingers for the touchpad gesture | int | 3 |
| workspace_swipe_distance | in px, the distance of the touchpad gesture | int | 300 |
| workspace_swipe_touch | enable workspace swiping from the edge of a touchscreen | bool | false |
| workspace_swipe_invert | invert the direction | bool | true |
| workspace_swipe_min_speed_to_force | minimum speed in px per timepoint to force the change ignoring `cancel_ratio`. Setting to `0` will disable this mechanic. | int | 30 |
| workspace_swipe_cancel_ratio | how much the swipe has to proceed in order to commence it. (0.7 -> if > 0.7 * distance, switch, if less, revert) [0.0 - 1.0] | float | 0.5 |
| workspace_swipe_create_new | whether a swipe right on the last workspace should create a new one. | bool | true |
| workspace_swipe_direction_lock | if enabled, switching direction will be locked when you swipe past the `direction_lock_threshold` (touchpad only). | bool | true |
| workspace_swipe_direction_lock_threshold | in px, the distance to swipe before direction lock activates (touchpad only). | int | 10 |
| workspace_swipe_forever | if enabled, swiping will not clamp at the neighboring workspaces but continue to the further ones. | bool | false |
| workspace_swipe_use_r | if enabled, swiping will use the `r` prefix instead of the `m` prefix for finding workspaces. | bool | false |

### Group

| name | description | type | default |
| --- | --- | --- | --- |
| insert_after_current | whether new windows in a group spawn after current or at group tail | bool | true |
| focus_removed_window | whether Hyprland should focus on the window that has just been moved out of the group | bool | true |
| col.border_active | active group border color | gradient | 0x66ffff00 |
| col.border_inactive | inactive (out of focus) group border color | gradient | 0x66777700 |
| col.border_locked_active | active locked group border color | gradient | 0x66ff5500 |
| col.border_locked_inactive | inactive locked group border color | gradient | 0x66775500 |

#### Groupbar

_Subcategory `group:groupbar:`_

| name | description | type | default |
| --- | --- | --- | --- |
| enabled | enables groupbars | bool | true |
| font_family | font used to display groupbar titles | string | Sans |
| font_size | font size of groupbar title | int | 8 |
| gradients | enables gradients | bool | true |
| height | height of the groupbar | int | 14 |
| priority | sets the decoration priority for groupbars | int | 3 |
| render_titles | whether to render titles in the group bar decoration | bool | true |
| scrolling | whether scrolling in the groupbar changes group active window | bool | true |
| text_color | controls the group bar text color | color | 0xffffffff |
| col.active | active group border color | gradient | 0x66ffff00 |
| col.inactive | inactive (out of focus) group border color | gradient | 0x66777700 |
| col.locked_active | active locked group border color | gradient | 0x66ff5500 |
| col.locked_inactive | inactive locked group border color | gradient | 0x66775500 |

### Misc

| name | description | type | default |
|---|---|---|---|
| disable_hyprland_logo | disables the random Hyprland logo / anime girl background. :( | bool | false |
| disable_splash_rendering | disables the Hyprland splash rendering. (requires a monitor reload to take effect) | bool | false |
| col.splash | Changes the color of the splash text (requires a monitor reload to take effect). | color | 0xffffffff |
| splash_font_family | Changes the font used to render the splash text, selected from system fonts (requires a monitor reload to take effect). | string | Sans |
| force_default_wallpaper | Enforce any of the 3 default wallpapers. Setting this to `0` or `1` disables the anime background. `-1` means "random". [-1/0/1/2] | int | -1 |
| vfr | controls the VFR status of Hyprland. Heavily recommended to leave enabled to conserve resources. | bool | true |
| vrr | controls the VRR (Adaptive Sync) of your monitors. 0 - off, 1 - on, 2 - fullscreen only [0/1/2] | int | 0 |
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
| hide_cursor_on_touch | Hides the cursor when the last input was a touch input until a mouse input is done. | bool | false |
| hide_cursor_on_key_press | Hides the cursor when you press any key until the mouse is moved. | bool | true |
| mouse_move_focuses_monitor | Whether mouse moving into a different monitor should focus it | bool | true |
| suppress_portal_warnings | disables warnings about incompatible portal implementations. | bool | false |
| render_ahead_of_time | [Warning: buggy] starts rendering _before_ your monitor displays a frame in order to lower latency | bool | false |
| render_ahead_safezone | how many ms of safezone to add to rendering ahead of time. Recommended 1-2. | int | 1 |
| cursor_zoom_factor | the factor to zoom by around the cursor. Like a magnifying glass. Minimum 1.0 (meaning no zoom) | float | 1.0 |
| cursor_zoom_rigid | whether the zoom should follow the cursor rigidly (cursor is always centered if it can be) or loosely | bool | false |
| allow_session_lock_restore | if true, will allow you to restart a lockscreen app in case it crashes (red screen of death) | bool | false |
| background_color | change the background color. (requires enabled `disable_hyprland_logo`) | color | 0x111111 |
| close_special_on_empty | close the special workspace if the last window is removed | bool | true |
| new_window_takes_over_fullscreen | if there is a fullscreen window, whether a new tiled window opened should replace the fullscreen one or stay behind. 0 - behind, 1 - takes over, 2 - unfullscreen the current fullscreen window [0/1/2] | int | 0 |
| enable_hyprcursor | whether to enable hyprcursor support | bool | true |
| initial_workspace_tracking | if enabled, windows will open on the workspace they were invoked on. 0 - disabled, 1 - single-shot, 2 - persistent (all children too) | int | 1 |

### Binds

| name | description | type | default |
| --- | --- | --- | --- |
| pass_mouse_when_bound | if disabled, will not pass the mouse events to apps / dragging windows around if a keybind has been triggered. | bool | false |
| scroll_event_delay | in ms, how many ms to wait after a scroll event to allow passing another one for the binds. | int | 300 |
| workspace_back_and_forth | If enabled, an attempt to switch to the currently focused workspace will instead switch to the previous workspace. Akin to i3's _auto_back_and_forth_. | bool | false |
| allow_workspace_cycles | If enabled, workspaces don't forget their previous workspace, so cycles can be created by switching to the first workspace in a sequence, then endlessly going to the previous workspace. | bool | false |
| workspace_center_on | Whether switching workspaces should center the cursor on the workspace (0) or on the last active window for that workspace (1) | int | 0 |
| focus_preferred_method | sets the preferred focus finding method when using `focuswindow`/`movewindow`/etc with a direction. 0 - history (recent have priority), 1 - length (longer shared edges have priority) | int | 0 |
| ignore_group_lock | If enabled, dispatchers like `moveintogroup`, `moveoutofgroup` and `movewindoworgroup` will ignore lock per group. | bool | false |
| movefocus_cycles_fullscreen | If enabled, when on a fullscreen window, `movefocus` will cycle fullscreen, if not, it will move the focus in a direction. | bool | true |
| disable_keybind_grabbing | If enabled, apps that request keybinds to be disabled (e.g. VMs) will not be able to do so. | bool | false |

### XWayland

| name | description | type | default |
| --- | --- | --- | --- |
| use_nearest_neighbor | uses the nearest neigbor filtering for xwayland apps, making them pixelated rather than blurry | bool | true |
| force_zero_scaling | forces a scale of 1 on xwayland windows on scaled displays. | bool | false |

### OpenGL

| name | description | type | default |
| --- | --- | --- | --- |
| nvidia_anti_flicker | reduces flickering on nvidia at the cost of possible frame drops on lower-end GPUs. On non-nvidia, this is ignored. | bool | true |
| force_introspection | forces introspection at all times. Introspection is aimed at reducing GPU usage in certain cases, but might cause graphical glitches on nvidia. 0 - nothing, 1 - force always on, 2 - force always on if nvidia | int | 2 |

### Debug

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
| colored_stdout_logs | enables colors in the stdout logs. | bool | true |

### More

There are more config options described in other pages, which are layout- or
circumstance-specific. See the sidebar for more pages.
