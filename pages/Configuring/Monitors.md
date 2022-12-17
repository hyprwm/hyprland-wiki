# Table of contents

{{< toc format=html >}}

# General

The general config of a monitor looks like this

```ini
monitor=name,resolution,position,scale
```

A common example:

```ini
monitor=DP-1,1920x1080@144,0x0,1
```

will tell Hyprland to make the monitor on `DP-1` a `1920x1080` display, at 144Hz,
`0x0` off from the top left corner, with a scale of 1 (unscaled).

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

{{< hint type=tip >}}

The position is calculated with the scaled (and transformed) resolution, meaning if
you want your 4K monitor with scale 2 to the left of your 1080p one, you'd use
the position `1920x0` for the second screen. (3840 / 2)
If the monitor is also rotated 90 degrees (vertical) you'd use `1080x0`.

{{</ hint >}}

Leaving the name empty will define a fallback rule to use when no other rules
match.

You can use `preferred` as a resolution to use the display's preferred size, and
`auto` as a position to let Hyprland decide on a position for you.

You can also use `auto` as a scale to let Hyprland decide on a scale for you. These
depend on the PPI of the monitor.

Recommended rule for quickly plugging in random monitors:

```ini
monitor=,preferred,auto,1
```

Will make any monitor that was not specified with an explicit rule automatically
placed on the right of the other(s) with its preferred resolution.

Alternatively you can use the `highrr` or `highres` rules in order to get the
best possible resolution or refreshrate mix.

for a focus on refreshrate use this:

```ini
monitor=,highrr,auto,1
```

for a focus on resolution this:

```ini
monitor=,highres,auto,1
```

For more specific rules, you can also use the output's description
(see `hyprctl monitors`) like this:

```
monitor=desc:SDC 0x4154,preferred,auto,1.5
```

remember to remove the (portname)!

## Disabling a monitor

To disable a monitor, use

```ini
monitor=name,disable
```

{{< hint type=tip >}}

Disabling a monitor will literally remove it from the layout, moving all windows and workspaces
to any remaining ones. If you want to disable your monitor in a screensaver style (just turn
off the monitor) use the `dpms` [dispatcher](../Dispatchers).

{{</ hint >}}

# Custom reserved area

If your workflow requires custom reserved area, you can add it with

```ini
monitor=name,addreserved,TOP,BOTTOM,LEFT,RIGHT
```

Where `TOP` `BOTTOM` `LEFT` `RIGHT` are integers in pixels of the reserved area
to add. This does stack on top of the calculated one, (e.g. bars) but you may
only use one of these rules per monitor in the config.

# Extra args

## Mirrored displays

If you want to mirror a display, add a `,mirror,[NAME]` at the end of the monitor
rule, examples:

```ini
monitor=DP-3,1920x1080@60,0x0,1,mirror,DP-2
monitor=,preferred,auto,1,mirror,DP-1
```

Please remember that mirroring displays will not "re-render" everything for your
second monitor, so if mirroring a 1080p screen onto a 4K one, the resolution
will still be 1080p on the 4K display. This also means squishing and stretching
will occur on non-matching resolutions.

## 10 bit support

If you want to enable 10 bit support for your display, add a `,bitdepth,10` at the
end of the monitor rule, e.g.:
```ini
monitor=eDP-1,2880x1800@90,0x0,1,bitdepth,10
```

Please be aware that colors registered in Hyprland (e.g. the border color) do _not_
support 10 bit.

# Rotating and the default workspace

{{< hint type=important >}}

The monitor transform and workspace keywords depend on a monitor rule set
specifically for the targeted monitor, and **_MUST_** be after it.

e.g.:
```ini
monitor=,preferred,auto,1
workspace=DP-3,1 # invalid

monitor=DP-3,preferred,auto,1
workspace=DP-3,1 # valid
```

{{< /hint >}}

```ini
workspace=name,number
```

for example:

```ini
workspace=DP-1,1
```

will tell Hyprland to make the default workspace on DP-1 a number 1.

If you want to rotate a monitor, use

```ini
monitor=NAME,transform,TRANSFORM
```

where `NAME` is the name, and `TRANSFORM` is an integer, from 0 to 7,
corresponding to your transform of choice.

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

# Binding workspaces to a monitor

A workspace can be bound to a monitor, meaning by default it will ALWAYS open
on the selected monitor. You can do this with

```ini
wsbind=WORKSPACE,MONITOR
```

for example:

```ini
wsbind=5,DP-1
wsbind=name:secret,DP-2
```
