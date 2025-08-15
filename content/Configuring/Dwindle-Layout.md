---
weight: 11
title: Dwindle Layout
---

Dwindle is a [BSPWM](https://github.com/baskerville/bspwm)-like layout, where every window on a workspace is a member of
a binary tree.

## Preface

{{< callout type=info >}}

In this section we'll be referring to both **orientation** and **direction**, with a very specific meaning:
- **Orientation**: can be horizontal or vertical.
  - It refers to the position of two windows relative to eachother.
  - The orientation of Dwindle splits is **not fixed**, instead, it's determined **dynamically** by the width-height ratio of the parent node.  
    - If **width** > **height**, the split "line" will be vertical, resulting in left and right children.  
    - If **height** > **width**, the split "line" will be horizonal, resulting in top and bottom children.
- **Direction**: can be `left`, `right`, `top` or `bottom`.
  - Refers to the _side_ a window can appear on, **relative** to its **parent**.
  - Can be influenced by cursor placement and other factors.

{{< /callout >}}

{{< callout type=info >}}

You can make the orientation **fixed** by enabling `preserve_split`.

{{< /callout >}}



## Config

category name: `dwindle`

| Name | Description | Type | Default |
| ---- | ----------- | ---- | ------- |
| `pseudotile` | Enable pseudotiling. <br> Pseudotiled windows retain their floating size when tiled. | bool | `false` |
| `force_split` | `0` -> Split direction follows cursor. <br> `1` -> Always split to the left or top. <br> `2` -> always split to the right or bottom. | int | `0` |
| `preserve_split` | If enabled, the split orientation will not change, regardless of the parent dimensions. | bool | `false` |
| `smart_split` | If enabled, allows for more precise control over the split direction based on the cursor's position. <br><br> The window is conceptually divided into four triangles, and the one currently under the cursor determines the split direction. <br><br> This also enables `preserve_split`. | bool | `false` |
| `smart_resizing` | If enabled, resizing direction will be determined by the cursor's nearest window corner. <br> Else, it is based on the window's tiling position. | bool | `true` |
| `permanent_direction_override` | If enabled, makes the preselected direction persist until either: <ul> <li> this mode disabled </li> <li> another direction is specified </li> <li> a non-direction is specified </li> </ul> | bool \| direction \| string | `false` |
| `special_scale_factor` | Specifies the scale factor of windows on the special workspace. | float [`0.0 .. 1.0`] | `1.0` |
| `split_width_multiplier` | Specifies the auto-split width multiplier. <br> Multiplying window size is useful on widescreen monitors where window W > H even after several splits. | float | `1.0` |
| `use_active_for_splits` | Whether to prefer the active window or the cursor position for splits. | bool | `true` |
| `default_split_ratio` | The default split ratio on window open. <br> `1.0` means an even 50/50 split. | float [`0.1 .. 1.9`] | `1.0` |
| `split_bias` | Specifies which window will receive the larger half of a split. <br> `0` -> positional <br> `1` -> current window <br> `2` -> new window | int [`0\|1\|2`] | `0` |
| `precise_mouse_move` | `bindm movewindow` will drop the window more precisely depending your cursor's position. | bool | `false` |
| `single_window_aspect_ratio` | Whenever only a single window is shown on a screen, add padding so that it conforms to the specified aspect ratio. <br> A value like `4 3` on a 16:9 screen will make it a 4:3 window in the middle with padding to the sides. | Vec2D | `0 0` |
| `single_window_aspect_ratio_tolerance` | Sets a tolerance for `single_window_aspect_ratio` so that if the padding to be added is smaller than the specified fraction of the height or width of the screen, it will not attempt to adjust the window size. | float [`0.0 .. 1.0`] | `0.1` | 

## Bind Dispatchers

| Dispatcher | Description | Params |
| ---------- | ----------- | ------ |
| `pseudo` | Toggles the given window's pseudo mode. | Leave empty / `active` for current, or `window` for a specific window. |

## Layout Messages

Dispatcher `layoutmsg` params:

| Param | Description | Args |
| ----- | ----------- | ---- |
| `togglesplit` | Toggles between the two possible split orientations of the current window. <br> `preserve_split` must be enabled for toggling to work. | none |
| `swapsplit` | Swaps the two halves of the split of the current window. | none |
| `preselect` | A one-time override for the split direction. <br> (valid for the next window to be opened, only works on tiled windows) | direction |
| `movetoroot` | Moves the selected window (active window if unspecified) to the root of its workspace tree. <br> The default behavior maximizes the window in its current subtree. <br> If `unstable` is provided as the second argument, the window will be swapped with the other subtree instead. <br> It is not possible to only provide the second argument, but `movetoroot active unstable` will achieve the same result. | [window, [ string ]] |

E.g.:

```ini
bind = SUPER, A, layoutmsg, preselect l
```