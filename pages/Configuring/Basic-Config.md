For basic syntax info, see
[Master Configuring](../Configuring-Hyprland).

This page documents all the "options" of Hyprland. For binds, monitors, execs,
curves, etc. see
[Advanced Configuring](../Advanced-config).

Please keep in mind some options that are layout-specific will be documented in
the layout pages and not here. (See the Sidebar)

# Variable types

| type | description |
|---|---|
| int | integer |
| bool | boolean, `true` or `false` (`yes` or `no`, `0` or `1`) - any numerical value that is not `0` or `1` will cause undefined behaviour. |
| float | floating point number |
| color | color (e.g. `0x22334455` - alpha `0x22`, red `0x33`, green `0x44`, blue `0x55`) |
| vec2 | vector with 2 values (float), separated by a space (e.g. `0 0` or `-10.9 99.1`) |
| MOD | a string modmask (e.g. `SUPER` or `SUPERSHIFT` or`SUPERSHIFTALTCTRLCAPSMOD2MOD3MOD5` or empty for none) |

{{< hint type=info >}}

Mod list:
```plain
SHIFT CAPS CTRL/CONTROL ALT MOD2 MOD3 SUPER/WIN/LOGO/MOD4 MOD5
```

{{< /hint >}}

# Sections

## General

| name | description | type | default |
|---|---|---|---|---|
| sensitivity | mouse sensitivity (\*this is Hyprland sensitivity, added on top of the data. To modify the data per-device, or more accurately (sensitivities > 1 might cause mouse to jump pixels), see `input:sensitivity` | float | 1.0 |
| apply_sens_to_raw | if on, will also apply the sensitivity to raw mouse output (e.g. sensitivity in games) | bool | false |
| main_mod | the mod used to move/resize windows (hold main_mod and LMB/RMB, try it and you'll know what I mean.) | mod | SUPER |
| border_size | self-explanatory | int | 1 |
| no_border_on_floating | disable borders for floating windows | bool | false |
| gaps_in | gaps between windows | int | 5 |
| gaps_out | gaps between windows and monitor edges | int | 20 |
| col.inactive_border | self-explanatory | color | 0xffffffff |
| col.active_border | self-explanatory | color | 0xff444444 |
| cursor_inactive_timeout | in seconds, after how many seconds of cursor's inactivity to hide it. Set to `0` for never. | int | 0 |
| damage_tracking | Makes the compositor redraw only the needed bits of the display. Saves on resources by not redrawing when not needed. Available modes: `none, monitor, full`. You don't need to know what different modes do, just always use `full`. | str | full |
| layout | which layout to use. (Available: `dwindle`, `master`) | str | dwindle |
| no_cursor_warps | if true, will not warp the cursor in many cases (focusing, keybinds, etc) | bool | false |

## Decoration
| name | description | type | default |
|---|---|---|---|---|
| rounding | rounded corners' radius (in layout px) | int | 1 |
| multisample_edges | enable antialiasing (no-jaggies) for rounded corners | bool | true |
| active_opacity | self-explanatory, only for windows. (0.0 - 1.0) | float | 1.0 |
| inactive_opacity | self-explanatory, only for windows. (0.0 - 1.0) | float | 1.0 |
| fullscreen_opacity | self-explanatory, only for windows. (0.0 - 1.0) | float | 1.0 |
| blur | enable kawase window background blur | bool | true |
| blur_size | blur size (distance) | int | 8 |
| blur_passes | the amount of passes to perform | int | 1 |
| blur_ignore_opacity | make the blur layer ignore the opacity of the window | bool | false |
| blur_new_optimizations | whether to enable further optimizations to the blur. Recommended to turn on, as it will massively improve performance, but some people have experienced graphical issues | bool | false |
| drop_shadow | enable drop shadows on windows | bool | true |
| shadow_range | Shadow range ("size") in layout px | int | 4 |
| shadow_render_power | (1 - 4), in what power to render the falloff (more power, the faster the falloff) | int | 3 |
| shadow_ignore_window | if true, the shadow will not be rendered behind the window itself, only around it. | bool | true |
| col.shadow | shadow's color. Alpha dictates shadow's opacity. | color | 0xee1a1a1a |
| col.shadow_inactive | inactive shadow color. (if not set, will fall back to col.shadow) | color | unset |
| shadow_offset | shadow's rendering offset. | vec2 | [0, 0] |

{{< hint type=info >}}

`blur_size` and `blur_passes` have to be at least 1.

Increasing `blur_passes` is necessary to prevent blur looking wrong on higher `blur_size` values,
but remember that higher `blur_passes` will require more strain on the GPU.

It will, however, cause zero overhead on tiled windows if using `blur_new_optimizations`.

{{< /hint >}}

{{< hint type=warning >}}

Using `blur_new_optimizations` with an animated wallpaper may actually increase GPU usage.

{{< /hint >}}

## Animations

| name | description | type | default |
|---|---|---|---|---|
| enabled | enable animations | bool | true |

{{< hint type=info >}}

_More about animations is on the [Advanced Configuring page](../Advanced-config#animations)._

{{< /hint >}}

## Input

| name | description | type | default |
|---|---|---|---|---|
| kb_layout | Appropriate XKB keymap parameter | str | us |
| kb_variant | Appropriate XKB keymap parameter | str | \[EMPTY\] |
| kb_model | Appropriate XKB keymap parameter | str | \[EMPTY\] |
| kb_options | Appropriate XKB keymap parameter | str | \[EMPTY\] |
| kb_rules | Appropriate XKB keymap parameter | str | \[EMPTY\] |
| kb_file | If you prefer, you can use a path to an .xkb file. | str | \[EMPTY\] |
| follow_mouse | (0/1/2/3) enable mouse following (focus on enter new window) - See the note below for more info | int | 1 |
| repeat_rate | in ms, the repeat rate for held keys | int | 25 |
| repeat_delay | in ms, the repeat delay (grace period) before the spam | int | 600 |
| natural_scroll | enable natural scroll | bool | false |
| numlock_by_default | lock numlock by default | bool | false |
| force_no_accel | force no mouse acceleration, bypasses most of your pointer settings to get as raw of a signal as possible. | bool | false |
| sensitivity | set the libinput sensitivity. This **HAS** to be from -1 to 1, or else it will be clamped. | float | 0.0 |

{{< hint type=info >}}
### Follow Mouse

Quirk: will always focus on mouse enter if you're entering a floating
window from a tiled one, or vice versa.
- 0 - disabled
- 1 - full
- 2 - loose. Will focus mouse on other windows on focus but not the keyboard.
- 3 - full loose, will not refocus on click, but allow mouse focus to be
detached from the keyboard like in 2.
{{< /hint >}}

{{< hint type=info >}}
For switchable keyboard configs, take a look at [the uncommon tips & tricks page entry](https://wiki.hyprland.org/Configuring/Uncommon-tips--tricks/#switchable-keyboard-layouts).
{{< /hint >}}

### Touchpad

_Subcategory `input:touchpad:`_

| name | description | type | default |
|---|---|---|---|---|
| disable_while_typing | disables the touchpad while typing | bool | true |
| natural_scroll | self-explanatory | bool | false |
| clickfinger_behavior | self-explanatory | bool | false |
| middle_button_emulation | self-explanatory | bool | false |
| tap-to-click | self-explanatory | bool | true |

### Per-device input config

Described [here](../Advanced-config#per-device-input-configs).

## Gestures

| name | description | type | default |
|---|---|---|---|---|
| workspace_swipe | enable workspace swipe gesture | bool | false |
| workspace_swipe_fingers | how many fingers for the gesture | int | 3 |
| workspace_swipe_distance | in px, the distance of the gesture | int | 300 |
| workspace_swipe_invert | invert the direction | bool | true |
| workspace_swipe_min_speed_to_force | minimum speed in px per timepoint to force the change ignoring `cancel_ratio`. Setting to `0` will disable this mechanic. | int | 30 |
| workspace_swipe_cancel_ratio | (0.0 - 1.0) how much the swipe has to proceed in order to commence it. (0.7 -> if > 0.7 * distance, switch, if less, revert) | float | 0.5 |

## Misc

| name | description | type | default |
|---|---|---|---|---|
| disable_hyprland_logo | disables the hyprland logo background. :( | bool | false |
| disable_splash_rendering | disables the hyprland splash rendering. (requires a monitor reload to take effect) | bool | false |
| no_vfr | disables VFR (variable frame rate) - VFR increases battery life at the expense of possible issues on a few monitors. | bool | true |
| damage_entire_on_snapshot | Damage the entire monitor when rendering snapshots. Recommended with transformed displays. Do not use without transformed displays. | bool | false |
| mouse_move_enables_dpms | If DPMS is set to off, wake up the monitors if the mouse moves. | bool | false |
| always_follow_on_dnd | Will make mouse focus follow the mouse when drag and dropping. Recommended to leave it enabled, especially for people using focus follows mouse at 0. | bool | true |
| layers_hog_keyboard_focus | If true, will make keyboard-interactive layers keep their focus on mouse move (e.g. wofi, bemenu) | bool | true |
| animate_manual_resizes | If true, will animate manual window resizes/moves | bool | false |

## Binds

| name | description | type | default |
|---|---|---|---|---|
| pass_mouse_when_bound | if disabled, will not pass the mouse events to apps / dragging windows around if a keybind has been triggered. | bool | true |
| scroll_event_delay | in ms, how many ms to wait after a scroll event to allow to pass another one for the binds. | int | 300 |

## Debug

{{< hint type=warning >}}

Only for developers.

{{< /hint >}}

| name | description | type | default |
|---|---|---|---|---|
| overlay | print the debug performance overlay. Disable VFR for accurate results. | bool | false |
| damage_blink | (epilepsy warning!) flash areas updated with damage tracking | bool | false |
| disable_logs | self-explanatory | bool | false |
| disable_time | disables time logging | bool | true |

## More

There are more config options described in other pages, which are layout- or
circumstance-specific. See the sidebar for more pages.
