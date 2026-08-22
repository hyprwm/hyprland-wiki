---
weight: 20
title: Config options
---

This page documents all the "options" of Hyprland. For binds, monitors, animations, etc. see the sidebar.

Please keep in mind some options that are layout-specific will be documented in
the layout pages and not here. (See the Sidebar for Dwindle/Scrolling/Master/Monocle/Custom layouts)

## Syntax

```lua
hl.config({
    path1 = {
        value = key
    },
    path2 = {
        value1 = key1,
        value2 = key2,
    },
})
```

Multiple `hl.config()` invocations can be used to set options, each call will update only what was passed into it.

---

Before continuing make sure you've read and understood [naming conventions of the wiki](../../../naming-conventions).

---

Options are described using tables:

| Name | Description | Type | Default | Limits |
| --- | --- | --- | --- | --- |
| string | string | [data type](../../../naming-conventions#data-types ) | `Default` | `Limit` |

`Default` can be one of:
 - Value with respect to type
 - [[Empty]]
 - [[Auto]]

`Limit` can be one of:
 - Value range
 - `None`

If literal `None` is specified in the limit field, it means that there is no limit set for that option.

If the value of an option exceeds its limits Hyprland will throw a config error.

## Sections

### General

Path: `general`

| Name | Description | Type | Default | Limits |
| --- | --- | --- | --- | --- |
| allow_tearing | Master switch for allowing tearing to occur. See the [Tearing page](../../extra/tearing) | bool | `false` |   |
| border_size | Size of the border around windows | int | `1` | [0 - 20] |
| gaps_in | Gaps between windows | css_gaps | `5` |   |
| gaps_out | Gaps between windows and monitor edges | css_gaps | `20` |   |
| gaps_workspaces | Gaps between workspaces. Stacks with gaps_out | int | `0` | [0 - 100] |
| float_gaps | Gaps between windows and monitor edges for floating windows `-1` means default | css_gaps | `0` |   |
| resize_corner | Force floating windows to use a specific corner when being resized (1-4 going clockwise from top left, 0 to disable) | int | `0` | [0 - 4] |
| resize_on_border | Enables resizing windows by clicking and dragging on borders and gaps | bool | `false` |   |
| extend_border_grab_area | Extends the area around the border where you can click and drag on, only used when `general.resize_on_border` is on | int | `15` | [0 - 100] |
| hover_icon_on_border | Show a cursor icon when hovering over borders, only used when `general.resize_on_border` is on | bool | `true` |   |
| layout | Which layout to use. Options: `"dwindle"`/`"master"`/`"scrolling"`/`"monocle"` | string | `"dwindle"` |   |
| locale | Overrides the system locale, e.g. `"en_US"`, `"es"` | string | [[Empty]] |   |
| modal_parent_blocking | Whether parent windows of modals will be interactive | bool | `true` |   |
| no_focus_fallback | If true, will not fall back to the next available window when moving focus in a direction where no window was found | bool | `false` |   |

#### General colors

Path: `general.col`

| Name | Description | Type | Default | Limits |
| --- | --- | --- | --- | --- |
| active_border | Border color for the active window | gradient | `0xffffffff` |
| inactive_border | Border color for inactive windows | gradient | `0xff444444` |
| nogroup_border_active | Border color for the active window that cannot be added to a group (see `hl.dsp.window.deny_from_group` dispatcher) | gradient | `0xffff00ff` |
| nogroup_border | Border color for inactive windows that cannot be added to a group | gradient | `0xffffaaff` |

#### Snap

Path: `general.snap`

| Name | Description | Type | Default | Limits |
| --- | --- | --- | --- | --- |
| enabled | Enable snapping for floating windows | bool | `false` |   |
| border_overlap | If enabled, windows snap such that only one border's worth of space is between them | bool | `false` |   |
| respect_gaps | If enabled, snapping will respect gaps between windows (set in general:gaps_in) | bool | `false` |   |
| monitor_gap | Minimum gap in pixels between window and monitor edges before snapping | int | `10` | [0 - 100] |
| window_gap | Minimum gap in pixels between windows before snapping | int | `10` | [0 - 100] |

### Decoration

Path: `decoration`

| Name | Description | Type | Default | Limits |
| --- | --- | --- | --- | --- |
| border_part_of_window | Whether the window border should be a part of the window | bool | `true` |   |
| active_opacity | Opacity of active windows | float | `1.0`| [0.0 - 1.0] |
| inactive_opacity | Opacity of inactive windows | float | `1.0` | [0.0 - 1.0] |
| fullscreen_opacity | Opacity of fullscreen windows | float | `1.0` | [0.0 - 1.0] |
| rounding | Rounded corners' radius (in layout px) | int | `0` | [0 - 40] |
| rounding_power | Adjusts the curve used for rounding corners, larger is smoother, 1.0 is a triangular corner, 2.0 is a circle, 4.0 is a squircle | float | `2.0` | [1.0 - 10.0] |
| dim_around | How much the `dim_around` window rule should dim by | float | `0.4` | [0.0 - 1.0] |
| dim_inactive | Enables dimming of inactive windows | bool | `false` |   |
| dim_modal | Enables dimming of parents of modal windows | bool | `true` |   |
| dim_special | How much to dim the rest of the screen by when a special workspace is open. [0.0 - 1.0] | float | `0.2 `|   |
| dim_strength | How much inactive windows should be dimmed | float | `0.5` |[0.0 - 1.0] |
| screen_shader | A path to a custom shader to be applied at the end of rendering. See `examples/screenShader.frag` for an example | string | \[\[Empty\]\] |   |

#### Blur

Path: `decoration.blur`

| Name | Description | Type | Default | Limits |
| --- | --- | --- | --- | --- |
| enabled | Enable kawase window background blur | bool | `true` | |
| brightness | Brightness modulation for blur | float | `1` | [0.0 - 2.0] |
| contrast | Contrast modulation for blur | float | `0.8916` | [0.0 - 2.0] |
| ignore_opacity | Make the blur layer ignore the opacity of the window | bool | `true` |   |
| input_methods | Whether to blur input methods, e.g. `fcitx5` | bool | `false` |   |
| input_methods_ignorealpha | Works like ignore_alpha in layer rules. If pixel opacity is below the set value, will not blur | float | `0.2` | [0.0 - 1.0] |
| new_optimizations | Whether to enable further optimizations to the blur. Recommended to leave on, as it will massively improve performance | bool | `true` |   |
| noise | How much noise to apply | float | `0.0117` | [0.0 - 1.0] |
| passes | The amount of passes to perform | int | `1` | [0 - 10] |
| popups | Whether to blur popups, e.g. `right-click menus` | bool | `false` |   |
| popups_ignorealpha | Works like ignore_alpha in layer rules. If pixel opacity is below the set value, will not blur | float | `0.2` | [0.0 - 1.0] |
| size | Blur size (distance) | int | `8` | |
| special | Whether to blur behind the special workspace (note: expensive) | bool | `false` | |
| variant | Blur pattern variant. May significantly increase GPU and CPU usage | str | `kawase` | [see below](#blur-variants) |
| vibrancy | Increase saturation of blurred colors | float | `0.1696` | [0.0 - 1.0] |
| vibrancy_darkness | How strong the effect of `vibrancy` is on dark areas | float | `0.0` | [0.0 - 1.0] |
| xray | If enabled, floating windows will ignore tiled windows in their blur. Will reduce overhead on floating blur significantly. Disabled if new_optimizations is `false`` | bool | `false` | |


> [!NOTE]
> `blur.size` and `blur.passes` have to be at least 1.
> 
> Increasing `blur.passes` is necessary to prevent blur looking wrong on higher
> `blur.size` values, but remember that higher `blur.passes` will require more
> strain on the GPU.

##### Blur variants

Each blur variant is configured in its own path, e.g. `frost = { thing = 1 }`.
Some settings may be reused by different blur methods.

Available variants:

- `kawase` --- default
- `frost` --- cracked ice
- `ripple` --- ripple on click
- `drops` --- rain on a window pane
- `water` --- ripple done with a heightmap
- `fluid_jar` --- 2D fluid simulation
- `prism` --- triangular refraction mask
- `heat_shimmer` --- a small shimmer with aberration
- `acrylic` --- similar to liquid glass
- `aurora` --- aurora-like light streaks
- `haze` --- a different diffused effect

###### glass

| Name | Description | Type | Default | Limits |
| --- | --- | --- | --- | --- |
| refraction | Maximum refraction displacement for glass blur types in pixels | float | `20.0` | [0.0 - 20.0] |
| roughness | Strength of the glass relief shading | float | `1.0` | [0.0 - 1.0] |
| size | Pattern size for glass blur types in pixels | float | `40.0` | [4.0 - 512.0] |

###### acrylic

| Name | Description | Type | Default | Limits |
| --- | --- | --- | --- | --- |
| aberration | Relative chromatic separation in the acrylic lens | float | `0.025` | [0.0 - 0.25] |
| bulb | Width of the curved acrylic edge in pixels | float | `48.0` | [4.0 - 256.0] |
| clarity | Amount of sharp backdrop passing through the acrylic surface | float | `0.82` | [0.0 - 1.0] |
| refraction | Maximum acrylic lens displacement in pixels | float | `24.0` | [0.0 - 48.0] |
| tint | Acrylic tint color. Alpha channel controls optical absorption | color | `0x14EEF5FF` | |

###### drops

| Name | Description | Type | Default | Limits |
| --- | --- | --- | --- | --- |
| speed | Animation speed. 0 disables the animation | float | `3.0` | [0.0 - 10.0] |

###### heat_shimmer

| Name | Description | Type | Default | Limits |
| --- | --- | --- | --- | --- |
| speed | Animation speed. 0 disables the animation| float | `1.0` | [0.0 - 10.0] |

###### aurora

| Name | Description | Type | Default | Limits |
| --- | --- | --- | --- | --- |
| color1 | First aurora curtain color. Alpha controls its contribution | color | `0x29F0A0FF` | |
| color2 | Second aurora curtain color. Alpha controls its contribution | color | `0x7A4DFFFF` | |
| intensity | Strength of the aurora color contribution | float | `0.35` | [0.0 - 1.0] |
| speed | Animation speed. 0 freezes the animation | float | `1.0` | [0.0 - 10.0] |

###### haze

| Name | Description | Type | Default | Limits |
| --- | --- | --- | --- | --- |
| intensity | Strength of the haze pearlescent sheen | float | `0.35` | [0.0 - 1.0] |
| iridescence | Strength of the haze pearlescent color shift | float | `0.7` | [0.0 - 1.0] |

###### ripple

| Name | Description | Type | Default | Limits |
| --- | --- | --- | --- | --- |
| duration | Duration in seconds | float | `0.45` | [0.05 - 5.0] |
| radius | Maximum radius in pixels | float | `400.0` | [1.0 - 1000.0] |
| strength | Maximum refraction displacement in pixels | float | `30.0` | [0.0 - 32.0] |
| width | Width of waves in pixels | float | `32.0` | [1.0 - 200.0] |

###### water

| Name | Description | Type | Default | Limits |
| --- | --- | --- | --- | --- |
| damping | Decay damping | float | `0.95` | [0.0 - 1.0] |
| duration | Maximum duration in seconds | float | `12.0` | [0.5 - 60.0] |
| radius | Pointer radius in pixels | float | `20.0` | [1.0 - 1000.0] |
| speed | Propagation speed | float | `0.76` | [0.0 - 10.0] |
| strength | Maximum refraction displacement and injection strength in pixels | float | `32.0` | [0.0 - 32.0] |

###### fluid_jar

| Name | Description | Type | Default | Limits |
| --- | --- | --- | --- | --- |
| color | Fluid color | color | `0xCC3399FF` | |
| distortion | Fluid refraction distortion multiplier | float | `8.0` | [0.0 - 10.0] |
| fill_amount | Fill level for of the fluid | float | `0.5` | [0.0 - 1.0] |
| mass | Fluid's Inertial mass | float | `1.4` | [0.1 - 10.0] |
| precision | Fluid simulation precision multiplier. 2x is a good compromise. 4x is expensive. 8x is extreme and unnecessary | float | `2.0` | [0.5 - 8.0] |
| speed | Animation speed | float | `3.7` | [0.0 - 10.0] |
| turbulence | Interior fluid turbulence multiplier | float | `1.2` | [0.0 - 5.0] |

#### Shadow

Path: `decoration.shadow`

| Name | Description | Type | Default | Limits |
| --- | --- | --- | --- | --- |
| enabled | Enable drop shadows on windows | bool | `true` |   |
| color | Active window shadow's color. Alpha dictates the opacity | color/gradient | `0xee1a1a1a` |   |
| color_inactive | Inactive window shadow's color. If not set, will fall back to `color` | color/gradient | unset |   |
| offset | Shadow's rendering offset | vec2 | `{0, 0}` |   |
| range | Shadow range (size) in pixels | int | `4` | [0 - 100] |
| render_power | In what power to render the falloff. More power, the faster the falloff | int | `3` | [1 - 4] |
| scale | Shadow's scale | float | `1.0` | [0.05 - 2.0] |
| sharp | If enabled, will make the shadows sharp, akin to an infinite render power | bool | `false` |   |


#### Glow

Path: `decoration.glow`

| Name | Description | Type | Default | Limits |
| --- | --- | --- | --- | --- |
| enabled | Enable inner glow on windows | bool | `false` |   |
| range | Glow range (size) in pixels | int | `10` | [0 - 100] |
| render_power | In what power to render the falloff. More power, the faster the falloff. Options: [1 - 4] | int | `3` | [0 - 4] |
| color | Active window glow's color. Alpha dictates opacity | color | `0xee1a1a1a` |   |
| color_inactive | Inactive window glow's color. If not set, will fall back to `color` | color | unset |   |

#### Motion blur

Path: `decoration.motion_blur`

| Name | Description | Type | Default | Limits |
| --- | --- | --- | --- | --- |
| enabled | enable motion blur on moving / resizing windows | bool | `false` |   |
| samples | The amount of samples to render. More will mean clearer blur, at the cost of more compute | int | `7` | [1 - 64] |

#### Wobble

Path: `decoration.wobble`

| Name | Description | Type | Default | Limits |
| --- | --- | --- | --- | --- |
| enabled | enable wobble on moving / resizing windows | bool | `false` |   |
| mesh | amount of wobble mesh vertices per edge | int | `12` | [2 - 32] |
| stiffness | spring stiffness for wobble deformation | float | `200` | [0.0001 - 1000] |
| damping | spring damping for wobble deformation | float | `12` | [0 - 1000] |
| mass | spring mass for wobble deformation | float | `1` | [0.0001 - 1000] |
| intensity | wobble deformation impulse multiplier | float | `0.2` |[0 - 3] |
| value_epsilon | position epsilon below which wobble is considered stable | float | `0.25` | [0 - 100] |
| velocity_epsilon | velocity epsilon below which wobble is considered stable | float | `2` | [0 - 1000] |

### Animations

Path: `animations`

| Name | Description | Type | Default | Limits |
| --- | --- | --- | --- | --- |
| enabled | Enable animations | bool | `true` |   |
| workspace_wraparound | Enable workspace wraparound, causing directional workspace animations to animate as if the first and last workspaces were adjacent | bool | `false` |   |

More about animations can be read [here](../animations).

### Input

Path: `input`

| Name | Description | Type | Default | Limits |
| --- | --- | --- | --- | --- |
| kb_model | Appropriate XKB keymap parameter. See the note [below](#xkb-keymap-params) | string | \[\[Empty\]\] |   |
| kb_layout | Appropriate XKB keymap parameter | string | `"us"` |   |
| kb_variant | Appropriate XKB keymap parameter | string | \[\[Empty\]\] |   |
| kb_options | Appropriate XKB keymap parameter | string | \[\[Empty\]\] |   |
| kb_rules | Appropriate XKB keymap parameter | string | \[\[Empty\]\] |   |
| kb_file | If you prefer, you can use a path to your custom .xkb file | string | \[\[Empty\]\] |   |
| numlock_by_default | Enable numlock by default | bool | `false` |   |
| resolve_binds_by_sym | Determines how keybinds act when multiple layouts are used. If false, keybinds will always act as if the first specified layout is active. If true, keybinds specified by symbols are activated when you type the respective symbol with the current layout | bool | `false` |   |
| repeat_delay | Delay before a held-down key is repeated, in milliseconds | int | `600` | [0 - 2000] |
| repeat_rate | The repeat rate for held-down keys, in repeats per second | int | `25` | [0 - 200] |
| sensitivity | Sets the mouse input sensitivity. Additional info: [libinput#pointer-acceleration](https://wayland.freedesktop.org/libinput/doc/latest/pointer-acceleration.html#pointer-acceleration) | float | `0.0` | [-1.0 - 1.0] |
| accel_profile | Sets the cursor acceleration profile. See the note [below](#accel-profile). Leave empty to use `libinput`'s default mode for your input device. [libinput#pointer-acceleration](https://wayland.freedesktop.org/libinput/doc/latest/pointer-acceleration.html#pointer-acceleration). Options: `"adaptive"`/`"flat"`/`"custom"`| string | \[\[Empty\]\] |   |
| force_no_accel | Force no cursor acceleration. This bypasses most of your pointer settings to get as raw of a signal as possible. **Enabling this is not recommended due to potential cursor desynchronization.** | bool | `false` |   |
| rotation | Sets the rotation of a device in degrees clockwise off the logical neutral position | int | `0` | [0 - 359] |
| left_handed | Switches RMB and LMB | bool | `false` |   |
| scroll_points | Sets the scroll acceleration profile, when `accel_profile` is set to `"custom"`. Has to be in the form `"<step> <points>"`. Leave empty to have a flat scroll curve | string | \[\[Empty\]\] |   |
| scroll_method | Sets the scroll method. Additional info: [libinput#scrolling](https://wayland.freedesktop.org/libinput/doc/latest/scrolling.html). Options: `"2fg"`/`"edge"`/`"on_button_down"`/`"no_scroll"` (2fg - 2 fingers) | string | \[\[Empty\]\] |   |
| scroll_button | Sets the scroll button. Check `wev` for the ID. `0` means default | int | `0` | [0 - 300] |
| scroll_button_lock | If the scroll button lock is enabled, the button does not need to be held down. Pressing and releasing the button toggles the button lock, which logically holds the button down or releases it. While the button is logically held down, motion events are converted to scroll events | bool | `false` |   |
| scroll_factor | Multiplier added to scroll movement for external mice. Note that there is a separate setting for [touchpad scroll_factor](#touchpad)  | float | `1.0` | [0 - 2] |
| natural_scroll | Inverts scrolling direction. When enabled, scrolling moves content directly, rather than manipulating a scrollbar | bool | `false` |   |
| follow_mouse | Specify if and how cursor movement should affect window focus. See the note [below](#follow-mouse) | int | `1` | [0 - 3] |
| follow_mouse_shrink | Shrinks the inactive window hitboxes used for focus detection by the specified number of pixels. This creates a dead zone in gaps between windows where moving the cursor will not change focus. Works only with `follow_mouse` set to `1` | int | `0` | [0 - 300] |
| follow_mouse_threshold | The smallest distance in logical pixels the mouse needs to travel for the window under it to get focused. Works only with `follow_mouse` set to`1` | float | `0.0` |   |
| focus_on_close | Controls the window focus behavior when a window is closed. When set to `0`, focus will shift to the next window candidate. When set to `1`, focus will shift to the window under the cursor. When set to `2`, focus will shift to the most recently used/active window | int | `0` | [0 - 2] |
| mouse_refocus | If enabled, mouse focus will switch to the hovered window when the pointer crosses a window boundary. Works only with `follow_mouse` set to `1` | bool | `true` |   |
| float_switch_override_focus | If `1`/`2` focus will change to the window under the cursor when changing from tiled-to-floating and vice versa. If `2`, focus will also follow mouse on float-to-float switches. `0` means disabled | int | `1` | [0 - 2] |
| special_fallthrough | if enabled, having only floating windows in the special workspace will not block focusing windows in the regular workspace | bool | `false` |   |
| off_window_axis_events | Handles axis events around (gaps/border for tiled, dragarea/border for floated) a focused window. `0` ignores axis events `1` sends out-of-bound coordinates `2` fakes pointer coordinates to the closest point inside the window `3` warps the cursor to the closest point inside the window | int | `1` | [0 - 3] |
| emulate_discrete_scroll | Emulates discrete scrolling from high resolution scrolling events. `0` disables it, `1` enables handling of non-standard events only, and `2` force enables all scroll wheel events to be handled | int | `1` | [0 - 2] |

##### xkb keymap params

 You can find a list of models, layouts, variants and options in
 [`/usr/share/X11/xkb/rules/evdev.lst`](file:///usr/share/X11/xkb/rules/evdev.lst).
 Alternatively, you can use the `localectl` command to discover what is available
 on your system.
 
 For switchable keyboard configurations, take a look at
 [the binds page entry](../binds/keyboard-layouts).

##### follow mouse

- `0` - Cursor movement will not change focus.
- `1` - Cursor movement will always change focus to the window under the cursor.
- `2` - Cursor focus will be detached from keyboard focus. Clicking on a window will move keyboard focus to that window.
- `3` - Cursor focus will be completely separate from keyboard focus. Clicking on a window will not change keyboard focus.


##### accel profile

`custom <step> <points...>`

Example: `custom 200 0.0 0.5`

##### scroll points

`<step> <points...>`

Example: `0.2 0.0 0.5 1 1.2 1.5`

To mimic the Windows acceleration curves, take a look at [this script](https://gist.github.com/fufexan/de2099bc3086f3a6c83d61fc1fcc06c9).

See [the libinput doc](https://wayland.freedesktop.org/libinput/doc/latest/pointer-acceleration.html)
for more insights on how it works.

#### Touchpad

Path: `input.touchpad`

| Name | Description | Type | Default | Limits |
| --- | --- | --- | --- | --- |
| clickfinger_behavior | Button presses with 1, 2, or 3 fingers will be mapped to LMB, RMB, and MMB respectively. This disables interpretation of clicks based on location on the touchpad. Additional info: [libinput#clickfinger-behavior](https://wayland.freedesktop.org/libinput/doc/latest/clickpad-softbuttons.html#clickfinger-behavior) | bool | `false` |   |
| disable_while_typing | Disable the touchpad while typing | bool | `true` |   |
| drag_3fg | Enables three finger drag. Additional info: [libinput#drag-3fg](https://wayland.freedesktop.org/libinput/doc/latest/drag-3fg.html) | int | `0` | [0 - 2] |
| drag_lock | When enabled, lifting the finger off while dragging will not drop the dragged item. 0 - disabled, 1 - enabled with timeout, 2 - enabled sticky. Additional info: [libinput#tap-and-drag](https://wayland.freedesktop.org/libinput/doc/latest/tapping.html#tap-and-drag) | int | `0` | [0 - 2] |
| flip_x | Inverts the horizontal movement of the touchpad | bool | `false` |   |
| flip_y | Inverts the vertical movement of the touchpad | bool | `false` |   |
| middle_button_emulation | Sending LMB and RMB simultaneously will be interpreted as a middle click. This disables any touchpad area that would normally send a middle click based on location. Additional info: [libinput#middle-button-emulation](https://wayland.freedesktop.org/libinput/doc/latest/middle-button-emulation.html) | bool | `false` |   |
| natural_scroll | Inverts scrolling direction. When enabled, scrolling moves content directly, rather than manipulating a scrollbar | bool | `false` |   |
| scroll_factor | Multiplier applied to the amount of scroll movement | float | `1.0` | [0.0 - 2.0] |
| tap_and_drag | Sets the tap and drag mode for the touchpad | bool | `true` |   |
| tap_button_map | Sets the tap button mapping for touchpad button emulation. When empty, defaults to `"lrm"`. L - Left, M - Middle, R - Right | string | \[\[Empty\]\] | "lrm"/"lmr" |
| tap_to_click | Tapping on the touchpad with 1, 2, or 3 fingers will send LMB, RMB, and MMB respectively | bool | `true` |   |

<!-- TODO check lrm/lmr thing if it really defaults to noting -->

#### Touchdevice

Path: `input.touchdevice`

| Name | Description | Type | Default | Limits |
| --- | --- | --- | --- | --- |
| enabled | Whether input is enabled for touch devices | bool | `true` |   |
| output | The monitor to bind touch devices. The default is auto-detection. To stop auto-detection, use an empty string | string | \[\[Auto\]\] |   |
| transform | Transform the input from touchdevices. The possible transformations are the same as [those of the monitors](../monitors/positioning#rotation) | int | `0` | [0 - 6] |

#### Virtualkeyboard

Path: `input.virtualkeyboard`

| Name | Description | Type | Default | Limits |
| --- | --- | --- | --- | --- |
| release_pressed_on_close | Release all pressed keys by virtual keyboard on close | bool | `false` |   |
| share_states | Unify key down states and modifier states with other keyboards. 0 - no, 1 - yes, 2 - yes unless IME client | int | `2` | [0 - 2] |

#### Tablet

Path: `input.tablet`

| Name | Description | Type | Default | Limits |
| --- | --- | --- | --- | --- |
| output | The monitor to bind tablets. Can be `"current"` or a monitor name. Leave empty to map across all monitors | string | \[\[Empty\]\] |   |
| transform | Transform the input from tablets. The possible transformations are the same as [those of the monitors](../monitors/positioning#rotation) | int | `0` | [0 - 6] |
| absolute_region_position | Whether to treat the `region_position` as an absolute position in monitor layout. Only applies when `output` is empty | bool | `false` |   |
| active_area_position | Position of the active area in mm | vec2 | `{0, 0}` |   |
| active_area_size | Size of tablet's active area in mm | vec2 | `{0, 0}` |   |
| left_handed | If enabled, the tablet will be rotated 180 degrees | bool | `false` |   |
| region_position | Position of the mapped region in monitor layout relative to the top left corner of the bound monitor or all monitors | vec2 | `{0, 0}` |   |
| region_size | Size of the mapped region. When this variable is set, tablet input will be mapped to the region. `{0, 0}` or invalid size means unset | vec2 | `{0, 0}` |   |
| relative_input | Whether the input should be relative | bool | `false` |   |

#### Tablettool

Path: `input.tablettool`

| Name | Description | Type | Default | Limits |
| --- | --- | --- | --- | --- |
| eraser_button_mode | Change the eraser button behavior on the tool. When set to `0`, use the default hardware behavior of the tool. When set to `1`, the eraser button on the tool sends a button event instead | int | 0 | [0 - 6] |
| eraser_button_override | Set a button to be button event when eraser_button_mode is set to `1`. Must be a valid button (e.g. BTN_STYLUS) excluding fake buttons (e.g. BTN_TOOL_\*) and keys (KEY_\*). Check `wev` for the ID. `0` means default | int | 0 | [0 - ...] |
| pressure_range_min | Set the minimum pressure range for the tool. Negative values mean it will use device defaults. Usually it is `0.0` | float | -1.0 | [-1.0 - 1.0] |
| pressure_range_max | Set the maximum pressure range for the tool. Negative values mean it will use device defaults. Usually it is `1.0` | float | -1.0 | [-1.0 - 1.0] |
### Per-device input config

Described [here](../devices).

### Gestures

Path: `gestures`

| Name | Description | Type | Default | Limits |
| --- | --- | --- | --- | --- |
| close_max_timeout | The timeout for a window to close when using a 1:1 gesture, in ms | int | `1000` | [10 - 2000] |
| workspace_swipe_cancel_ratio | How much the swipe has to proceed in order to commence it. Example, when set to `0.7`: if more than 70% of the distance is covered - switch, else - cancel the gesture | float | `0.5` | [0.0 - 1.0] |
| workspace_swipe_create_new | Whether a swipe right on the last workspace should create a new one | bool | `true` |   |
| workspace_swipe_direction_lock | If enabled, switching direction will be locked when you swipe past the `direction_lock_threshold` (touchpad only) | bool | `true` |   |
| workspace_swipe_direction_lock_threshold | In pixels, the distance to swipe before direction lock activates (touchpad only) | int | `10` | [0 - 200] |
| workspace_swipe_distance | In pixels, the distance of the touchpad gesture | int | `300` | [0 - 2000] |
| workspace_swipe_forever | If enabled, swiping will not clamp at the neighboring workspaces but continue to the further ones | bool | `false` |   |
| workspace_swipe_invert | Invert the swipe direction (touchpad only) | bool | `true` |   |
| workspace_swipe_min_speed_to_force | Minimum speed in pixels per timepoint to force the change ignoring `cancel_ratio`. `0` means disabled | int | `30` | [0 - 200] |
| workspace_swipe_touch | Enable workspace swiping from the edge of a touchscreen | bool | `false` |   |
| workspace_swipe_touch_invert | Invert the swipe direction (touchscreen only) | bool | `false` |   |
| workspace_swipe_use_r | If enabled, swiping will use the `r` prefix instead of the `m` prefix for finding workspaces | bool | `false` |   |
#### Scrolling

Path: `gestures.scrolling`

| Name | Description | Type | Default | Limits |
| --- | --- | --- | --- | --- |
| move_snap_to_grid | when releasing the scroll move gesture, whether it should try to snap to the grid | bool | `true` |   |
| move_snap_cursor | when releasing the scroll move gesture, whether it should snap the cursor to the newly focused window | bool | `true` |   |


### Group

<!-- TODO: what on earth groups are? I.e.: "Groups are for hyprland the same as Tabs are for firefox" -->

Path: `group`

| Name | Description | Type | Default | Limits |
| --- | --- | --- | --- | --- |
| auto_group | Whether new windows will be automatically grouped into the focused unlocked group. *Note: if you want to disable auto_group only for specific windows, use [the "group barred" window rule](../rules/window-rules/#group-window-rule-options) instead* | bool | `true` |   |
| drag_into_group | Whether dragging a window into an unlocked group will merge them. `0` - disabled, `1` - enabled, `2` - only when dragging into a groupbar | int | `1` | [0 - 2] |
| focus_removed_window | Whether Hyprland should focus on the window that has just been moved out of the group | bool | `true` |   |
| group_on_movetoworkspace | Whether using hl.dsp.window.move({ workspace }) will merge the window into the workspace's solitary unlocked group | bool | `false` |   |
| insert_after_current | Whether new windows in a group spawn after current or at group tail | bool | `true` |   |
| merge_floated_into_tiled_on_groupbar | Whether dragging a floating window into a tiled window groupbar will merge them | bool | `false` |   |
| merge_groups_on_drag | Whether window groups can be dragged into other groups | bool | `true` |   |
| merge_groups_on_groupbar | Whether one group will be merged with another when dragged into its groupbar. *Note: enabling this option only works when combined with `drag_into_group = 2` and `merge_groups_on_drag = true`* | bool | `true` |   |

#### Group colors

Path: `group.col`

| Name | Description | Type | Default | Limits |
| --- | --- | --- | --- | --- |
| border_active | Active group border color | gradient | `0x66ffff00` |   |
| border_inactive | Inactive group border color | gradient | `0x66777700` |   |
| border_locked_active | Active locked group border color | gradient | `0x66ff5500` |   |
| border_locked_inactive | Inactive locked group border color | gradient | `0x66775500` |   |

#### Groupbar

Path: `group.groupbar`

| Name | Description | Type | Default | Limits |
| --- | --- | --- | --- | --- |
| enabled | Enables groupbars | bool | `true` |   |
| blur | Applies blur to the groupbar indicators and gradients | bool | `false` |   |
| disable_when_only | Disable groupbar if it contains a single window | bool | `false` |   |
| font_family | Font used to display groupbar titles, use `misc.font_family` if not specified | string | \[\[Empty\]\] |   |
| font_size | Font size of groupbar title | int | `8` | [2 - 64] |
| font_weight_active | Font weight of active groupbar title | font_weight | `"normal"` |   |
| font_weight_inactive | Font weight of inactive groupbar title | font_weight | `"normal"` |   |
| gaps_in | Gap size between gradients | int | `2` | [0 - 20] |
| gaps_out | Gap size between gradients and window | int | `2` | [0 - 20] |
| gradients | Enables gradients | bool | `false` |   |
| gradient_round_only_edges | Round only the gradient edges of the entire groupbar | bool | `true` |   |
| gradient_rounding | How much to round the gradients | int | `2` | [0 - 20] |
| gradient_rounding_power | Adjusts the curve used for rounding gradient corners, larger is smoother, 1.0 is a triangular corner, 2.0 is a circle, 4.0 is a squircle | float | `2.0` | [1.0 - 10.0] |
| height | Height of the groupbar | int | `14` | [0 - 64] |
| indicator_gap | Height of gap between groupbar indicator and title | int | `0` |[0 - 64] |
| indicator_height | Height of the groupbar indicator | int | `3` | [0 - 64] |
| keep_upper_gap | Add or remove upper gap | bool | `true` |   |
| middle_click_close | Whether middle clicking the groupbar closes the clicked window | bool | `true` |   |
| priority | Sets the decoration priority for groupbars | int | `3` | [0 - 6] |
| render_titles | Whether to render titles in the group bar decoration | bool | `true` |   |
| round_only_edges | Round only the indicator edges of the entire groupbar | bool | `true` |   |
| rounding | How much to round the indicator | int | `1` | [0 - 40] |
| rounding_power | Adjusts the curve used for rounding groupbar corners, larger is smoother, 1.0 is a triangular corner, 2.0 is a circle, 4.0 is a squircle | float | `2.0` | [1.0 - 10.0] |
| scrolling | Whether scrolling in the groupbar changes group active window | bool | `true` |   |
| stacked | Render the groupbar as a vertical stack | bool | `false` |   |
| text_color | Color for window titles in the groupbar | color | `0xffffffff` |   |
| text_color_inactive | Color for inactive windows' titles in the groupbar (if unset, defaults to text_color) | color | unset |   |
| text_color_locked_active | Color for the active window's title in a locked group (if unset, defaults to text_color) | color | unset |   |
| text_color_locked_inactive | Color for inactive windows' titles in locked groups (if unset, defaults to text_color_inactive) | color | unset |   |
| text_offset | Adjust vertical position for titles | int | `0` | [-20 - 20] |
| text_padding | Set horizontal padding for titles | int | `0` | [0 - 22] |

##### Groupbar colors

Path: `group.groupbar.col`
| Name | Description | Type | Default | Limits
| --- | --- | --- | --- | --- |
| active | Active group bar background color | gradient | `0x66ffff00` |   |
| inactive | Inactive (out of focus) group bar background color | gradient | `0x66777700` |   |
| locked_active | Active locked group bar background color | gradient | `0x66ff5500` |   |
| locked_inactive | Inactive locked group bar background color | gradient | `0x66775500` |   |

### Misc

Path: `misc`

| Name | Description | Type | Default | Limits |
| --- | --- | --- | --- | --- |
| allow_session_lock_restore | If true, will allow you to restart a lockscreen app in case it crashes | bool | `false` |   |
| always_follow_on_dnd | Will make mouse focus follow the mouse when dragging and dropping. Recommended to leave it enabled, especially for people using focus follows mouse at 0 | bool | `true` |   |
| animate_manual_resizes | If true, will animate manual window resizes/moves | bool | `false` |   |
| animate_mouse_windowdragging | If true, will animate windows being dragged by mouse, note that this can cause weird behavior on some curves | bool | `false` |   |
| anr_missed_pings | Number of missed pings before showing the ANR dialog | int | `5` | [1 - 20] |
| background_color | Change the background color (requires enabled `disable_hyprland_logo`) | color | `0x111111` |   |
| bell_sound | Path to custom wav/ogg system bell. "none" or an empty string mutes it. "default" uses the system's current one | string | `"default"` |   |
| close_special_on_empty | Close the special workspace if the last window is removed | bool | `true` |   |
| splash_font_family | Changes the font used to render the splash text, selected from system fonts (requires a monitor reload to take effect) | string | \[\[Empty\]\] |   |
| disable_autoreload | If true, the config will not reload automatically on save, and instead needs to be reloaded with `hyprctl reload`. Might save on battery | bool | `false` |   |
| disable_hyprland_logo | Disables the random Hyprland logo / anime girl background. :( | bool | `false` |   |
| disable_hyprland_guiutils_check | Disable the warning if hyprland-guiutils is not installed | bool | `false` |   |
| disable_scale_notification | Disables notification popup when a monitor fails to set a suitable scale | bool | `false` |   |
| disable_splash_rendering | Disables the Hyprland splash rendering (requires a monitor reload to take effect) | bool | `false` |   |
| disable_watchdog_warning | Disables the warning about not using start-hyprland | bool | `false` |   |
| disable_xdg_env_checks | Disable the warning if XDG environment is externally managed | bool | `false` |   |
| enable_anr_dialog | Whether to enable the ANR (app not responding) dialog when your apps hang | bool | `true` |   |
| enable_swallow | Enable window swallowing | bool | `false` |   |
| screencopy_force_8b | Forces 8 bit screencopy | bool | `true` |   |
| swallow_regex | The _class_ regex to be used for windows that should be swallowed (usually, a terminal) | string | \[\[Empty\]\] |   |
| swallow_exception_regex | The _title_ regex to be used for windows that should _not_ be swallowed by the windows specified in swallow_regex, e.g. `wev`. The regex is matched against the parent, e.g. Kitty, window's title on the assumption that it changes to whatever process it's running | string | \[\[Empty\]\] |   |
| exit_window_retains_fullscreen | Whether closing a fullscreen window makes the next focused window to be fullscreened. 0 - disabled, 1 - enabled, 2 - only when closing a grouped window, 3 - only when closing a non-grouped window | int | `0` | [0 - 3] |
| focus_on_activate | Whether Hyprland should focus an app that requests to be focused (an `activate` request) | bool | `false` |   |
| float_force_onscreen | whether/how existing floating windows should be constrained to stay on-screen. 0 - no constraints, 1 - must be partially onscreen, 2 - must be fully onscreen | int | `0` | [0 - 2] |
| new_float_force_onscreen | same as `float_force_onscreen`, but specifically for newly-spawned floating windows | int | `2` | [0 - 2] |
| font_family | Set the global default font to render the text including debug fps/notification, config error messages, etc.; selected from system fonts | string | `"Sans"` |   |
| force_default_wallpaper | Enforce any of the 3 default wallpapers. 0 - disables the anime background, 1 - disables the anime background, 2 - enables anime background, -1 - random | int | `-1` | [-1 - 2] |
| initial_workspace_tracking | If enabled, windows will open on the workspace they were invoked on. 0 - disabled, 1 - single-shot, 2 - persistent (all children too) | int | `1` |   |
| initial_workspace_token_timeout | the time in seconds a window has to open on its invoked workspace before the tracking token expires. | int | `10` | [1 - 3600] |
| key_press_enables_dpms | If DPMS is set to off, wake up the monitors if a key is pressed | bool | `false` |   |
| layers_hog_keyboard_focus | If true, will make keyboard-interactive layers keep their focus on mouse move, e.g. `wofi`, `bemenu` | bool | `true` |   |
| lockdead_screen_delay | Delay after which the "lockdead" screen will appear in case a lockscreen app fails to cover all the outputs (5 seconds max) | int | `1000` | [0 - 5000] |
| middle_click_paste | Whether to enable middle-click-paste (aka primary selection) | bool | `true` |   |
| mouse_move_enables_dpms | If DPMS is set to off, wake up the monitors if the mouse moves | bool | `false` |   |
| mouse_move_focuses_monitor | Whether mouse moving into a different monitor should focus it | bool | `true` |   |
| name_vk_after_proc | Name virtual keyboards after the processes that create them, e.g. `/usr/bin/fcitx5` will have hl-virtual-keyboard-fcitx5 | bool | `true` |   |
| on_focus_under_fullscreen | If there is a fullscreen or maximized window, decide whether a tiled window requested to focus should replace it, stay behind or disable the fullscreen/maximized state. 0 - ignore focus request (keep focus on fullscreen window), 1 - takes over, 2 - unfullscreen/unmaximize | int | `2` | [0 - 2] |
| render_unfocused_fps | The maximum limit for render_unfocused windows' fps in the background (see also [Window-Rules](../rules/window-rules/#dynamic-effects), e.g. `render_unfocused`) | int | `15` | [1 - 120] |
| session_lock_blur | Enables blur for lockscreen. `session_lock_xray` must be enabled | bool | `false` |   |
| session_lock_xray | If true, keep rendering workspaces below your lockscreen | bool | `false` |   |
| size_limits_tiled | Whether to apply min_size and max_size rules to tiled windows | bool | `false` |   |
| vrr | Controls the VRR (Adaptive Sync) of your monitors. 0 - off, 1 - on, 2 - fullscreen only, 3 - fullscreen with `video` or `game` content type | int | `0` | [0 - 3] |


Path: `misc.col`

| Name | Description | Type | Default | Limits |
| --- | --- | --- | --- | --- |
| splash | Changes the color of the splash text (requires a monitor reload to take effect) | color | `0x55ffffff` |   |

### Layout

Path: `layout`

| Name | Description | Type | Default | Limits |
| --- | --- | --- | --- | --- |
| single_window_aspect_ratio | Whenever only a single window is shown on a screen, add padding so that it conforms to the specified aspect ratio. A value like `4 3` on a 16:9 screen will make it a 4:3 window in the middle with padding to the sides | vec2 | `{0, 0}` |   |
| single_window_aspect_ratio_tolerance | Sets a tolerance for `single_window_aspect_ratio`, so that if the padding that would have been added is smaller than the specified fraction of the height or width of the screen, it will not attempt to adjust the window size | float | `0.1` | [0.0 - 1.0] |

### Binds

Path: `binds`

| Name | Description | Type | Default | Limits |
| --- | --- | --- | --- | --- |
| allow_pin_fullscreen | If enabled, allow fullscreen to pinned windows, and restore their pinned status afterwards | bool | `false` |   |
| allow_workspace_cycles | If enabled, workspaces don't forget their previous workspace, so cycles can be created by switching to the first workspace in a sequence, then endlessly going to the previous workspace | bool | `false` |   |
| disable_keybind_grabbing | If enabled, apps that request keybinds to be disabled, e.g. `VMs`, will not be able to do so | bool | `false` |   |
| drag_threshold | Movement threshold in pixels for window dragging and `click`/`drag` bind flags. `0` means disabled | int | `0` | [0 - ...] |
| focus_preferred_method | Sets the preferred focus finding method when using `hl.dsp.focus({ direction })`/`hl.dsp.window.move({ direction })`/etc. `0` - most recent active window has priority, `1` - longer shared edges have priority) | int | `0` | [0 - 1] |
| hide_special_on_workspace_change | If enabled, changing the active workspace (including to itself) will hide the special workspace on the monitor where the newly active workspace resides | bool | `false` |   |
| ignore_group_lock | If enabled, dispatchers like `hl.dsp.window.move({ into_group })` and `hl.dsp.window.move({ out_of_group })` will ignore lock per group | bool | `false` |   |
| movefocus_cycles_fullscreen | If enabled, when on a fullscreen window, `hl.dsp.focus({ direction })` will cycle fullscreen, else, it will move the focus in a direction | bool | `false` |   |
| movefocus_cycles_groupfirst | If enabled, when in a grouped window, `hl.dsp.focus({ direction })` will cycle windows in the groups first, then at each ends of the tabs, it'll move on to other windows/groups | bool | `false` |   |
| pass_mouse_when_bound | If enabled, will pass the mouse events to apps / dragging windows around if a keybind has been triggered | bool | `false` |   |
| scroll_event_delay | In ms, how many ms to wait after a scroll event to allow passing another one for the binds | int | `300` | [0 - 2000] |
| window_direction_monitor_fallback | If enabled, moving a window or focus over the edge of a monitor with a direction will move it to the next monitor in that direction | bool | `true` |   |
| workspace_back_and_forth | If enabled, an attempt to switch to the currently focused workspace will instead switch to the previous workspace, akin to i3's `_auto_back_and_forth_` | bool | `false` |   |
| workspace_center_on | Whether switching workspaces should center the cursor on the workspace (0) or on the last active window for that workspace (1) | int | `1` | [0 - 1] |

### XWayland

Path: `xwayland`

| Name | Description | Type | Default | Limits |
| --- | --- | --- | --- | --- |
| enabled | Allow running applications using X11 | bool | `true` |   |
| create_abstract_socket | Create the [abstract Unix domain socket](../../extra/xwayland/#abstract-unix-domain-socket) for XWayland connections. XWayland restart is required for changes to take effect; Linux only | bool | `false` |   |
| force_zero_scaling | Forces a scale of 1 on xwayland windows on scaled displays | bool | `false` |   |
| use_nearest_neighbor | Uses the nearest neighbor filtering for xwayland apps, making them pixelated rather than blurry | bool | `true` |   |

### OpenGL

Path: `opengl`

| Name | Description | Type | Default | Limits |
| --- | --- | --- | --- | --- |
| nvidia_anti_flicker | Reduces flickering on nvidia at the cost of possible frame drops on lower-end GPUs. On non-nvidia, this is ignored | bool | `true` |   |

### Render

Path: `render`

| Name | Description | Type | Default | Limits |
| --- | --- | --- | --- | --- |
| cm_auto_hdr | Auto-switch to HDR in fullscreen when needed. `0` - disabled, `1` - switch to `hdr`, `2` - switch to `hdredid` | int | `1` | [0 - 2] |
| cm_enabled | Whether the color management pipeline should be enabled or not. Requires restart | bool | `true` |   |
| cm_sdr_eotf | Default transfer function for displaying SDR apps. `default` - Use default value (sRGB), `gamma22` - treat unspecified as Gamma 2.2, `gamma22force` - treat unspecified and sRGB as Gamma 2.2, `srgb` - treat unspecified as sRGB. Options: `"default"`/`"gamma22"`/`"gamma22force"`/`"srgb"` | string | `"default"` |   |
| commit_timing_enabled | Enable commit timing proto. Requires restart | bool | `true` |   |
| ctm_animation | Whether to enable a fade animation for CTM changes (hyprsunset). 2 means "auto" which disables them on Nvidia | int | `2` | [0 - 2] |
| direct_scanout | Enables direct scanout. Direct scanout attempts to reduce lag when there is only one fullscreen application on a screen (game). It is also recommended to set this to false if the fullscreen application shows graphical glitches. `0` - disabled, `1` - enabled, `2` - auto (enabled with content type 'game') | int | `0` | [0 - 2] |
| expand_undersized_textures | Whether to expand undersized textures along the edge, or rather stretch the entire texture | bool | `true` |   |
| fp16_sdr_tf | Internal workbuffer transfer function for fp16 in SDR mode. 0 - monitor, 1 - linear | int | `0` | [0 - 1] |
| icc_vcgt_enabled | Enable sending VCGT ramps to KMS with ICC profiles | bool | `true` |   |
| keep_unmodified_copy | Keep unmodified SDR frame copy for screensharing. `0` - disabled, `1` - enabled, `2` - auto (enabled in HDR with SDR modifiers). Set to 1 if screenshots are transparent | int | `2` | [0 - 2] |
| new_render_scheduling | Automatically uses triple buffering when needed, improves FPS on underpowered devices | bool | `false` |   |
| not_shown_fifo_lock | Control fifo locking for not shown surfaces. always - use fifo lock for any surface, ignore_unfocused - ignore render_unfocused windows, never - skip locking invisible surfaces | int | `0` | [0 - 2] |
| non_shader_cm | Enable CM without shader. `0` - disable, `1` - whenever possible, `2` - DS and passthrough only, `3` - disable and ignore CM issues. Options: [0 - 3] | int | `2` | [0 - 3] |
| non_shader_cm_interop | `0` - external ctm (hyprsunset, etc.) is disabled in fullscreen, `1` - external ctm is enabled in fullscreen, `2` - external ctm is disabled for fullscreen photo/video/game content types | int | `2` | [0 - 2] |
| send_content_type | Report content type to allow monitor profile autoswitch (may result in a black screen during the switch) | bool | `true` |   |
| use_fp16 | Use FP16 buffers internally. `0` - disabled, `1` - enabled, `2` - enabled in hdr mode | int | `2` | [0 - 2] |
| use_shader_blur_blend | Use experimental blurred bg blending (glitched on rotated screens). Set to `true` if blur is missing with fp16 or `keep_unmodified_copy` | bool | `false` |   |
| xp_mode | Disables back buffer and bottom layer rendering | bool | `false` |   |


`cm_auto_hdr` requires the `--target-colorspace-hint-mode=source` mpv option to work with mpv versions greater than v0.40.0

### Cursor

Path: `cursor`

| Name | Description | Type | Default | Limits |
| --- | --- | --- | --- | --- |
| default_monitor | The name of a default monitor for the cursor to be set to on startup (see `hyprctl monitors` for names) | string | `[[Empty]]` |   |
| enable_hyprcursor | Whether to enable hyprcursor support | bool | `true` |   |
| hide_on_key_press | Hides the cursor when you press any key until the mouse is moved | bool | `false` |   |
| hide_on_tablet | Hides the cursor when the last input was a tablet input until a mouse input is done | bool | `false` |   |
| hide_on_touch | Hides the cursor when the last input was a touch input until a mouse input is done | bool | `true` |   |
| hotspot_padding | The padding, in logical px, between screen edges and the cursor | int | `0` | [0 - 20] |
| inactive_timeout | In seconds, after how many seconds of cursor's inactivity to hide it. Set to `0` for never | float | `0` | [0 - 20] |
| invisible | Don't render cursors | bool | `false` |   |
| min_refresh_rate | Minimum refresh rate for cursor movement when `no_break_fs_vrr` is active. Set to minimum supported refresh rate or higher | int | `24` | [10 - 500] |
| no_break_fs_vrr | Disables scheduling new frames on cursor movement for fullscreen apps with VRR enabled to avoid framerate spikes (may require `no_hardware_cursors` set to `1`). `0` - disabled, `1` - enabled, `2` - auto (enabled with content type 'game') | int | `2` | [0 - 2] |
| no_hardware_cursors | Disables hardware cursors. `0` - use hw cursors if possible, `1` - don't use hw cursors, `2` - auto (disable when tearing) | int | `2` | [0 - 2] |
| no_warps | If true, will not warp the cursor in many cases (focusing, keybinds, etc) | bool | `false` |   |
| persistent_warps | When a window is refocused, the cursor returns to its last position relative to that window, rather than to the centre | bool | `false` |   |
| warp_back_after_non_mouse_input | Warp the cursor back to where it was after using a non-mouse input to move it, and then returning back to the mouse | bool | `false` |   |
| warp_on_change_workspace | Move the cursor to the last focused window after changing the workspace. `0` - Disabled, `1` - Enabled, `2` - Force (ignores cursor:no_warps option) | int | `0` | [0 - 2] |
| warp_on_monitor_change | Move the cursor to the last focused window when focusing a different monitor. `-1` - follow value of `cursor:warp_on_change_workspace`, `0` - disabled, `1` - enabled, `2` - force even if `cursor:no_warps` | int | `-1` | [-1 - 2] |
| warp_on_toggle_special | Move the cursor to the last focused window when toggling a special workspace. `0` - Disabled, `1` - Enabled, `2` - Force (ignores cursor:no_warps option) | int | `0` | [0 - 2] |
| sync_gsettings_theme | Sync xcursor theme with gsettings. It applies cursor-theme and cursor-size on theme load to gsettings making most CSD gtk based clients use the same xcursor theme and size | bool | `true` |   |
| use_cpu_buffer | Makes HW cursors use a CPU buffer. Required on Nvidia to have HW cursors. `0` - disabled, `1` - enabled, `2` - auto (enabled with nvidia) | int | `2` | [0 - 2] |
| zoom_detached_camera | Detach the camera from the mouse when zoomed in, only ever moving the camera to keep the mouse in view when it goes past the screen edges | bool | `true` |   |
| zoom_disable_aa | Disable antialiasing when zooming, which means things will be pixelated instead of blurry | bool | `false` |   |
| zoom_factor | The factor to zoom by around the cursor. Like a magnifying glass. Minimum 1.0 (meaning no zoom) | float | `1.0` | [1 - 10] |
| zoom_rigid | Whether the zoom should follow the cursor rigidly (cursor is always centered if it can be) or loosely | bool | `false` |   |


### Ecosystem

Path: `ecosystem`

| Name | Description | Type | Default | Limits |
| --- | --- | --- | --- | --- |
| no_update_news | Disable the popup that shows up when you update hyprland to a new version | bool | `false` |   |
| no_donation_nag | Disable the popup that shows up twice a year encouraging to donate | bool | `false` |   |
| enforce_permissions | Whether to enable [permission control](../advanced-configuration/permissions) | bool | `false` |   |

### Quirks

Path: `quirks`

| Name | Description | Type | Default | Limits |
| --- | --- | --- | --- | --- |
| prefer_hdr | Report HDR mode as preferred. `0` - disabled, `1` - always, `2` - gamescope only | int | `0` | [0 - 1] |
| skip_non_kms_dmabuf_formats | do not report dmabuf formats which cannot be imported into KMS | bool | `false` |   |

Some clients expect the monitor to be in HDR mode prior to the client start. This breaks auto HDR activation and can cause whitescreen and flickering. Use `prefer_hdr` to fix it.

### Input Capture

Path: `input-capture`

| Name | Description | Type | Default | Limits |
| --- | --- | --- | --- | --- |
| capture_modifiers | if enabled, modifiers are also captured and sent to the program | bool | `false` |   |
| enforce_barriers | if enabled, throw a wayland error when an invalid barrier is received | bool | `true` |   |


### Debug

> [!WARNING]
> Only for developing and testing

Path: `debug`

| Name | Description | Type | Default | Limits |
| --- | --- | --- | --- | --- |
| colored_stdout_logs | Enables colors in the stdout logs | bool | `true` |   |
| damage_blink | (epilepsy warning!) Flash areas updated with damage tracking | bool | `false` |   |
| damage_tracking | Redraw only the needed bits of the display. Do **not** change. (default: full - 2) monitor - 1, none - 0 | int | `2` | [0 - 2] |
| disable_logs | Disable logging to a file | bool | `true` |   |
| disable_scale_checks | Disables verification of the scale factors. Will result in pixel alignment and rounding errors | bool | `false` |   |
| disable_time | Disables time logging | bool | `true` |   |
| ds_handle_same_buffer | special case for direct scanout with unmodified buffer | bool | `true` |   |
| ds_handle_same_buffer_fifo | special case for direct scanout with unmodified buffer unlocks fifo | bool | `true` |   |
| enable_stdout_logs | Enables logging to stdout | bool | `false` |   |
| error_limit | Limits the number of displayed config file parsing errors | int | `5` | [0 - 20] |
| error_position | Sets the position of the error bar. `0` - top, `1` bottom | int | `0` | [0 - 1] |
| fifo_pending_workaround | fifo workaround for empty pending list | bool | `false` |   |
| full_cm_proto | Claims support for all cm proto features (requires restart) | bool | `false` |   |
| gl_debugging | Enables OpenGL debugging with glGetError and EGL_KHR_debug, requires a restart after changing | bool | `false` |   |
| invalidate_buffers | Allow buffer invalidation (invalidation increases performance but produces glitches on some systems). 0 - not allowed, 1 - allowed | int | `1` | [0 - 1] |
| manual_crash | Set to 1 and then back to 0 to crash Hyprland | int | `0` | [0 - 1] |
| overlay | Print the debug performance overlay. Disable VFR for accurate results | bool | `false` |   |
| pass | Enables render pass debugging | bool | `false` |   |
| render_solitary_wo_damage | render solitary window with empty damage | bool | `false` |   |
| suppress_errors | If enabled, Hyprland will not display config file parsing errors | bool | `false` |   |
| vfr | Controls the VFR status of Hyprland. Heavily recommended to leave enabled to conserve resources | bool | `true` |   |
| log_damage | Enables logging the damage | bool | `false` |   |

### Experimental
Path: `experimental`
| Name | Description | Type | Default | Limits |
| --- | --- | --- | --- | --- |
| wp_cm_1_2 | allow wp-cm-v1 version 2 | bool | `false` |   |

### More

There are more config options described in other pages, which are layout- or
circumstance-specific. See the sidebar for more pages.
