---
weight: 13
title: Scrolling Layout
---

Scrolling is a layout where windows get positioned on an infinitely growing tape.

## Config

category name: `scrolling`

| name | description | type | default |
| --- | --- | --- | --- |
|fullscreen_on_one_column|when enabled, a single column on a workspace will always span the entire screen. | bool | true |
| column_width | the default width of a column, [0.1 - 1.0]. | float | 0.5 |
| focus_fit_method | When a column is focused, what method should be used to bring it into view. 0 = center, 1 = fit | int | 0 |
| follow_focus | when a window is focused, should the layout move to bring it into view automatically | bool | true |
| follow_min_visible | when a window is focused, require that at least a given fraction of it is visible for focus to follow. Hard input (e.g. binds, clicks) will always follow. [0.0 - 1.0] | float | 0.4 |
| explicit_column_widths | A comma-separated list of preconfigured widths for colresize +conf/-conf | str | 0.333, 0.5, 0.667, 1.0 |
| direction | Direction in which new windows appear and the layout scrolls. left/right/down/up | str | right |

## Workspace rules

| name | description | type |
| --- | --- | --- |
| direction | Same as scrolling:direction | str |

e.g.

```ini
workspace = 2, layoutopt:direction:right
```

## Layout messages

Dispatcher `layoutmsg` params:

| name | description | params |
| --- | --- | --- |
| move | move the layout horizontally, by either a relative logical px (`-200`, `+200`) or columns (`+col`, `-col`) | move data |
| colresize | resize the current column, to either a value or by a relative value e.g. `0.5`, `+0.2`, `-0.2` or cycle the preconfigured ones with `+conf` or `-conf`. Can also be `all (number)` for resizing all columns to a specific width | relative float / relative conf |
| movewindowto | same as the movewindow dispatcher but supports promotion to the right at the end | direction |
| fit | executes a fit operation based on the argument. Available: `active`, `visible`, `all`, `toend`, `tobeg` | fit mode |
| focus | moves the focus and centers the layout, while also wrapping instead of moving to neighbring monitors. | direction |
| promote | moves a window to its own new column | none |
| swapcol | Swaps the current column with its neighbor to the left (`l`) or right (`r`). The swap wraps around (e.g., swapping the first column left moves it to the end). | `l` or `r` |
| movecoltoworkspace | Moves the entire current column to the specified workspace, preserving its internal layout. Works with existing, new, and special workspaces. e.g. like `1`, `2`, `-1`, `+2`, `special`, etc. | workspace identifier|
| togglefit | Toggle the focus_fit_method (center, fit) | none |

Example key bindings for your Hyprland config:

```
bind = $mainMod, period, layoutmsg, move +col
bind = $mainMod, comma, layoutmsg, move -col
bind = $mainMod SHIFT, period, layoutmsg, movewindowto r
bind = $mainMod SHIFT, comma, layoutmsg, movewindowto l
bind = $mainMod SHIFT, up, layoutmsg, movewindowto u
bind = $mainMod SHIFT, down, layoutmsg, movewindowto d
```
