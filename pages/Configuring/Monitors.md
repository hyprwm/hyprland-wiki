---
weight: 4
title: Monitors
---

## General

The general config of a monitor looks like this:

```ini
monitor=name,resolution,position,scale
```

A common example:

```ini
monitor=DP-1,1920x1080@144,0x0,1
```

This will make the monitor on `DP-1` a `1920x1080` display, at
144Hz, `0x0` off from the top left corner, with a scale of 1 (unscaled).

To list all available monitors (active and inactive):

```shell
hyprctl monitors all
```

Monitors are positioned on a virtual "layout". The `position` is the position of
said display in the layout. (calculated from the top-left corner)

For example:

```ini
monitor=DP-1, 1920x1080, 0x0, 1
monitor=DP-2, 1920x1080, 1920x0, 1
```

will tell hyprland to make DP-1 on the _left_ of DP-2, while

```ini
monitor=DP-1, 1920x1080, 1920x0, 1
monitor=DP-2, 1920x1080, 0x0, 1
```

will tell hyprland to make DP-1 on the _right_.

The `position` may contain _negative_ values, so the above example could also be
written as

```ini
monitor=DP-1, 1920x1080, 0x0, 1
monitor=DP-2, 1920x1080, -1920x0, 1
```

Hyprland uses an inverse Y cartesian system. Thus, placing a - before the y coordinate
places a monitor higher, and a positive value will place it lower.

For example:

```ini
monitor=DP-1, 1920x1080, 0x0, 1
monitor=DP-2, 1920x1080, 0x-1080, 1
```

will tell hyprland to make DP-2 _above_ DP-1, while

```ini
monitor=DP-1, 1920x1080, 0x0, 1
monitor=DP-2, 1920x1080, 0x1080, 1
```

will tell hyprland to make DP-2 _below_.

{{< callout type=info >}}

The position is calculated with the scaled (and transformed) resolution, meaning
if you want your 4K monitor with scale 2 to the left of your 1080p one, you'd
use the position `1920x0` for the second screen (3840 / 2). If the monitor is
also rotated 90 degrees (vertical), you'd use `1080x0`.

{{</ callout >}}

Leaving the name empty will define a fallback rule to use when no other rules
match.

You can use `preferred` as a resolution to use the display's preferred size, 
or you can use `highres` or `highrr` to get the best possible resolution or refresh rate for your monitor. 

You can use `auto` as a position to let Hyprland decide on a position for you.
If you want to get fancy with multiple monitors you can specify `auto-right` to put your monitor to the right,
`auto-down` to position your monitor below, `auto-left` to put it to the left, and `auto-up` to put your monitor above.
***Please Note:*** While specifying a monitor direction for your first monitor is allowed, this does nothing and it will
be positioned at (0,0). Also the direction is always from the center out, so you can specify `auto-up` then `auto-left`,
but the left monitors will just be left of the origin and above the origin. You can also specify duplicate directions and
monitors will continue to go in that direction.

You can also use `auto` as a scale to let Hyprland decide on a scale for you.
These depend on the PPI of the monitor.

Recommended rule for quickly plugging in random monitors:

```ini
monitor=,preferred,auto,1
```

Will make any monitor that was not specified with an explicit rule automatically
placed on the right of the other(s) with its preferred resolution.

For more specific rules, you can also use the output's description (see
`hyprctl monitors` for more details). If the output of `hyprctl monitors` looks
like the following:

```
Monitor eDP-1 (ID 0):
        1920x1080@60.00100 at 0x0
        description: Chimei Innolux Corporation 0x150C (eDP-1)
        make: Chimei Innolux Corporation
        model: 0x150C
        [...]
```

then the `description` value up to the portname `(eDP-1)` can be used to specify
the monitor:

```
monitor=desc:Chimei Innolux Corporation 0x150C,preferred,auto,1.5
```

Remember to remove the `(portname)`!

### Custom modelines

You can set up a custom modeline by changing the resolution field to a modeline,
for example:

```
monitor = DP-1, modeline 1071.101 3840 3848 3880 3920 2160 2263 2271 2277 +hsync -vsync, 0x0, 1
```

### Disabling a monitor

To disable a monitor, use

```ini
monitor=name,disable
```

{{< callout >}}

Disabling a monitor will literally remove it from the layout, moving all windows
and workspaces to any remaining ones. If you want to disable your monitor in a
screensaver style (just turn off the monitor) use the `dpms`
[dispatcher](../Dispatchers).

{{</ callout >}}

## Custom reserved area

A reserved area is an area that remains unoccupied by tiled windows.
If your workflow requires a custom reserved area, you can add it with:

```ini
monitor=name,addreserved,TOP,BOTTOM,LEFT,RIGHT
```

Where `TOP` `BOTTOM` `LEFT` `RIGHT` are integers in pixels of the reserved area
to add. This does stack on top of the calculated one (e.g. bars), but you may
only use one of these rules per monitor in the config.

## Extra args

You can combine extra arguments at the end of the monitor rule, examples:

```ini
monitor=eDP-1,2880x1800@90,0x0,1,transform,1,mirror,DP-2,bitdepth,10
```

See below for more detail about each argument.

### Mirrored displays

If you want to mirror a display, add a `,mirror,[NAME]` at the end of the
monitor rule, examples:

```ini
monitor=DP-3,1920x1080@60,0x0,1,mirror,DP-2
monitor=,preferred,auto,1,mirror,DP-1
```

Please remember that mirroring displays will not "re-render" everything for your
second monitor, so if mirroring a 1080p screen onto a 4K one, the resolution
will still be 1080p on the 4K display. This also means squishing and stretching
will occur on non-matching resolutions.

### 10 bit support

If you want to enable 10 bit support for your display, add a `,bitdepth,10` at
the end of the monitor rule, e.g.:

```ini
monitor=eDP-1,2880x1800@90,0x0,1,bitdepth,10
```

**NOTE** Colors registered in Hyprland (e.g. the border color) do _not_ support
10 bit.

**NOTE** Some applications do _not_ support screen capture with 10 bit enabled.

### VRR

Per-display VRR can be done by adding `,vrr,X` where `X` is the mode from the
[variables page](../Variables).

## Rotating

If you want to rotate a monitor, add a `,transform,X` at the end of the monitor
rule, where `X` corresponds to a transform number, e.g.:

```ini
monitor=eDP-1,2880x1800@90,0x0,1,transform,1
```

Transform list:

```ini
normal (no transforms) -> 0
90 degrees -> 1
180 degrees -> 2
270 degrees -> 3
flipped -> 4
flipped + 90 degrees -> 5
flipped + 180 degrees -> 6
flipped + 270 degrees -> 7
```

## Default workspace

See [Workspace Rules](../Workspace-Rules).

### Binding workspaces to a monitor

See [Workspace Rules](../Workspace-Rules).
