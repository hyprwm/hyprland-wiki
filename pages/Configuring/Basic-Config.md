For basic syntax info, see
[Master Configuring](../Configuring-Hyprland).

This page documents all the "options" of Hyprland. For binds, monitors, execs,
curves, etc. see
[Advanced Configuring](../Advanced-config).

Please keep in mind some options that are layout-specific will be documented in
the layout pages and not here. (See the Sidebar)

# Variable types

Variable types are:

`int` - integer

`bool` - boolean, `true` or `false` (`yes` or `no`, `0` or `1`) - any numerical
value that is not `0` or `1` will cause undefined behaviour.

`float` - floating point number

`col` - color (e.g. `0x22334455` - alpha `0x22`, red `0x33`, green `0x44`, blue
`0x55`)

`vec2` - vector with 2 values (float), separated by a space (e.g. `0 0` or
`-10.9 99.1`)

`MOD` - a string modmask (e.g. `SUPER` or `SUPERSHIFT` or
`SUPERSHIFTALTCTLRCAPSMOD2MOD3MOD5` or empty for none)

Mod list:

```plain
SHIFT CAPS CTRL/CONTROL ALT MOD2 MOD3 SUPER/WIN/LOGO/MOD4 MOD5
```

# Sections

## General

`sensitivity=float` - mouse sensitivity (\*this is Hyprland sensitivity, added
on top of the data. To modify the data per-device, or more accurately
(sensitivities > 1 might cause mouse to jump pixels), see `input:sensitivity`)

`apply_sens_to_raw=bool` - if on, will also apply the sensitivity to raw mouse
output (e.g. sensitivity in games)

`main_mod=MOD` - the mod used to move/resize windows (hold main_mod and LMB/RMB,
try it and you'll know what I mean.)

`border_size=int` - border thickness

`no_border_on_floating=bool` - disable borders for floating windows.

`gaps_in=int` - gaps between windows

`gaps_out=int` - gaps between window-monitor edge

`col.active_border=col` - self-explanatory

`col.inactive_border=col` - self-explanatory

`cursor_inactive_timeout=int` - in seconds, after how many seconds of cursor's
inactivity to hide it. (default / never is `0`)

`damage_tracking=str` - Makes the compositor redraw only the needed bits of the
display. Saves on resources by not redrawing when not needed. Available modes:
`none, monitor, full`. You don't need to know what different modes do, just
always use `full`.

`layout=str` - which layout to use. (Available: `dwindle`, `master`, default is
`dwindle`)

`no_cursor_warps=bool` - if true, will not warp the cursor in many cases
(focusing, keybinds, etc)

## Decoration

`rounding=int` - rounded corners radius (in pixels)

`multisample_edges=bool` - enable antialiasing (no-jaggies) for rounded corners.

`no_blur_on_oversized=bool` - disable blur on oversized windows (deprecated,
leave at `0`)

`active_opacity=float` - self-explanatory, 0 - 1

`inactive_opacity=float` - self-explanatory, 0 - 1

`fullscreen_opacity=float` - self-explanatory, 0 - 1

`blur=bool` - enable dual kawase window background blur

`blur_size=int` - Minimum 1, blur size (intensity)

`blur_passes=int` - Minimim 1, more passes = more resource intensive.

Your blur "amount" is blur_size * blur_passes, but high blur_size (over around
5-ish) will produce artifacts.

If you want heavy blur, you need to up the blur_passes.

The more passes, the more you can up the blur_size without noticing artifacts.

`blur_ignore_opacity=bool` - make the blur layer ignore the opacity of the
window.

`blur_new_optimizations=bool` - whether to enable further optimizations to the
blur. Recommended to turn on, as it will massively improve performance, but some
people have experienced graphical issues.

`drop_shadow=bool` - enable drop shadows on windows

`shadow_range=int` - Shadow range (in pixels), more = larger shadow

`shadow_render_power=int` - (1 - 4), in what power to render the falloff (more
power, the faster the falloff)

`shadow_ignore_window=bool` - if true, the shadow will not be rendered behind
the window itself, only around it.

`col.shadow=col` - shadow's color. Alpha dictates shadow's opacity.

`col.shadow_inactive=col` - inactive shadow color. (if not set, will fall back
to col.shadow)

`shadow_offset=vec2` - shadow's rendering offset.

## Animations

`enabled=bool` - enable animations

_More about animations is on the Advanced Configuring page._

## Input

`kb_layout=str` `kb_variant=str` `kb_model=str` `kb_options=str` `kb_rules=str`
\- adequate keyboard settings

`follow_mouse=int` - (0/1/2/3) enable mouse following (focus on enter new
window) - Quirk: will always focus on mouse enter if you're entering a floating
window from a tiled one, or vice versa. 0 - disabled, 1 - full, 2 - loose. Loose
will focus mouse on other windows on focus but not the keyboard. 3 - full loose,
will not refocus on click, but allow mouse focus to be detached from the
keyboard like in 2.

`repeat_rate=int` - in ms, the repeat rate for held keys

`repeat_delay=int` - in ms, the repeat delay (grace period) before the spam

`natural_scroll=bool` - enable natural scroll

`numlock_by_default=bool` - lock numlock by default

`force_no_accel=bool` - force no mouse acceleration, bypasses most of your
pointer settings to get as raw of a signal as possible.

`sensitivity=float` - set the libinput sensitivity. This **HAS** to be from -1
to 1, or else it will be clamped.

### Touchpad

_Subcategory input:touchpad:_

`disable_while_typing=bool` - self-explanatory

`natural_scroll=bool` - self-explanatory

`clickfinger_behavior=bool` - self-explanatory

`middle_button_emulation=bool` - self-explanatory

`tap-to-click=bool` - self-explanatory

*Note:* Touchpad config changes may require a Hyprland restart.

### Per-device input config is described [here](../Advanced-config#per-device-input-configs)

## Gestures

`workspace_swipe=bool` - enable workspace swipe gesture

`workspace_swipe_fingers=int` - how many fingers for the gesture

`workspace_swipe_distance=int` - in px, the distance of the gesture

`workspace_swipe_invert=bool` - invert the direction

`workspace_swipe_min_speed_to_force=int` - minimum speed in px per timepoint to
force the change ignoring `cancel_ratio` (default `30`) Setting to `0` will
disable this mechanic.

`workspace_swipe_cancel_ratio=float` - (0.0 - 1.0) how much the swipe has to
proceed in order to commence it. (0.7 -> if > 0.7 * distance, switch, if less,
revert)

## Misc

`disable_hyprland_logo=bool` - disables the hyprland logo background.

`disable_splash_rendering=bool` - disables the hyprland splash rendering.
(requires a monitor reload to take effect)

`no_vfr=bool` - disables VFR (variable frame rate) - VFR increases battery life
at the expense of possible issues on a few monitors. (VFR is off by default)

`damage_entire_on_snapshot=bool` - Damage the entire monitor when rendering
snapshots. Recommended with transformed displays. Do not use without transformed
displays.

`mouse_move_enables_dpms=bool` - If DPMS is set to off, wake up the monitors if
the mouse moves.

`always_follow_on_dnd=bool` - By default enabled, will make mouse focus follow
the mouse when drag and dropping. Recommended to leave it enabled, especially
for people using focus follows mouse at 0.

`layers_hog_keyboard_focus=bool` - If true, will make keyboard interactive
layers keep their focus on mouse move (e.g. wofi, bemenu)

## Binds

`pass_mouse_when_bound=bool` - if disabled, will not pass the mouse events to
apps / dragging windows around if a keybind has been triggered. (Enabled by
default)

`scroll_event_delay=int` - in ms, how many ms to wait after a scroll event to
allow to pass another one for the binds.

## Debug

### only for developers

`overlay=bool` - print the debug performance overlay.

`damage_blink=bool` - (epilepsy warning!) flash areas updated with damage
tracking

`disable_logs=bool` - disables the logs

`disable_time=bool` - disables time logging, by default it's `true`

## More

There are more config options described in other pages, which are layout- or
circumstance-specific. See the sidebar navpanel for more pages.
