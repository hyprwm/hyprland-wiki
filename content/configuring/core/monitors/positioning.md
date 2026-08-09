---
title: Positioning
weight: 20
---

> [!WARNING]
> No monitors can overlap. Overlapping monitors will raise a warning
> and will not be registered.

## Position

The position is calculated with the scaled (and transformed) resolution, meaning
if you want your 4K monitor with scale 2 to the left of your 1080p one, you'd
use the position `1920x0` for the second screen (3840 / 2). If the monitor is
also rotated 90 degrees (vertical), you'd use `1080x0`.

"Invalid scale" warnings will pop up if your scale does not create valid
logical pixels. A valid scale must divide your resolution cleanly (without
        > decimals). For example 1920x1080 / 1.5 = 1280x720 -> OK, but
when / 1.4 -> 1371.4286x771.42857 -> not ok.

### Positions
`auto` - let Hyprland decide on a position. By default, it places each new monitor to the right of existing ones,
using the monitor's top left corner as the root point.  
`auto-right/left/up/down` - place the monitor to the right/left, above or below other monitors,
also based on each monitor's top left corner as the root.  
`auto-center-right/left/up/down` - place the monitor to the right/left, above or below other monitors,
but calculate placement from each monitor's center rather than its top left corner.

If direction in special position is specified for the first output in the monitor layout it will be ignored
 and monitor will be placed at (0,0).

The direction is always from the center out, so you can specify `auto-up`, then `auto-left`,
but the left monitors will just be left of the origin and above the origin. You can also specify duplicate directions and
monitors will continue to go in that direction.

{{% details title="Examples" closed="true" %}}

```lua
hl.monitor({ output = "DP-1", mode = "1920x1080@120Hz", position = "0x0", scale = 1 })
hl.monitor({ output = "DP-2", mode = "1920x1080@120Hz", position = "1920x0", scale = 1 })
```

will tell Hyprland to put DP-2 on the _right_ of DP-1, while

```lua
hl.monitor({ output = "DP-1", mode = "1920x1080@120Hz", position = "1920x0", scale = 1 })
hl.monitor({ output = "DP-2", mode = "1920x1080@120Hz", position = "0x0", scale = 1 })
```

will tell Hyprland to put DP-1 on the _right_ of DP-2.

The `position` may contain _negative_ values, so the above example could also be
written as

```lua
hl.monitor({ output = "DP-1", mode = "1920x1080@120Hz", position = "0x0", scale = 1 })
hl.monitor({ output = "DP-2", mode = "1920x1080@120Hz", position = "-1920x0", scale = 1 })
```

```lua
hl.monitor({ output = "DP-1", mode = "1920x1080@120Hz", position = "0x0", scale = 1 })
hl.monitor({ output = "DP-2", mode = "1920x1080@120Hz", position = "0x-1080", scale = 1 })
```

will tell Hyprland to put DP-2 _above_ DP-1, while

```lua
hl.monitor({ output = "DP-1", mode = "1920x1080@120Hz", position = "0x0", scale = 1 })
hl.monitor({ output = "DP-2", mode = "1920x1080@120Hz", position = "0x1080", scale = 1 })
```

will tell Hyprland to put DP-2 _below_.

{{% /details %}}

## Rotation

If you want to rotate a monitor, use the `transform` field:

```lua
hl.monitor({ output = "eDP-1", mode = "2880x1800@90", position = "0x0", scale = 1, transform = 1 })
```

Transform list:

```plain
0 -> normal (no transforms)
1 -> 90 degrees
2 -> 180 degrees
3 -> 270 degrees
4 -> flipped
5 -> flipped + 90 degrees
6 -> flipped + 180 degrees
7 -> flipped + 270 degrees
```
