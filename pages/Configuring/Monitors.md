## Table of contents

{{< toc format=html >}}

## General

The general config of a monitor looks like this
```plain
monitor=name,resolution,offset,scale
```

A common example:

```plain
monitor=DP-1,1920x1080@144,0x0,1
```

will tell Hyprland to make the monitor on `DP-1` a `1920x1080` display, at 144Hz,
`0x0` off from the top left corner, with a scale of 1 (unscaled).

{{< hint >}}

The offset is calculated with the scaled resolution, meaning if
you want your 4K monitor with scale 2 to the left of your 1080p one, you'd use
the offset `1920x0` for the second screen. (3840 / 2)

{{</ hint >}}

Please use the offset for its intended purpose before asking stupid questions
about "fixing" monitors being mirrored.

Leaving the name empty will define a fallback rule to use when no other rules
match.

You can use `preferred` as a resolution to use the display's preferred size, and
`auto` as an offset to let Hyprland decide on an offset for you.

Recommended rule for quickly plugging in random monitors:

```plain
monitor=,preferred,auto,1
```

Will make any monitor that was not specified with an explicit rule automatically
placed on the right of the other(s) with its preferred resolution.

Alternatively you can use the `highrr` or `highres` rules in order to get the best possible
resolution or refreshrate mix.

for a focus on refreshrate use this:

```plain
monitor=,highrr,auto,1
```

for a focus on resolution this:

```plain
monitor=,highres,auto,1
```

## Disabling a monitor

To disable a monitor, use

```plain
monitor=name,disable
```

## Custom reserved area

If your workflow requires custom reserved area, you can add it with

```plain
monitor=name,addreserved,TOP,BOTTOM,LEFT,RIGHT
```

Where `TOP` `BOTTOM` `LEFT` `RIGHT` are integers in pixels of the reserved area
to add. This does stack on top of the calculated one, (e.g. bars) but you may
only use one of these rules per monitor in the config.

## Mirrored displays

If you want to mirror a display, add a `,mirror,[NAME]` at the end of the monitor
rule, examples:
```
monitor=DP-3,1920x1080@60,0x0,1,mirror,DP-2
monitor=,preferred,auto,1,mirror,DP-1
```

Please remember that mirroring displays will not "re-render" everything for your
second monitor, so if mirroring a 1080p screen onto a 4K one, the resolution will
still be 1080p on the 4K display. This also means squishing and stretching
will occur on non-matching resolutions.

## Rotating and the default workspace

{{< hint type=important >}}

The monitor transform and workspace keywords depend on a monitor rule set
specifically for the targeted monitor, and ***MUST*** be after it.

{{< /hint >}}

```plain
workspace=name,number
```

for example:

```plain
workspace=DP-1,1
```

will tell Hyprland to make the default workspace on DP-1 a number 1.

If you want to rotate a monitor, use

```plain
monitor=NAME,transform,TRANSFORM
```

where `NAME` is the name, and `TRANSFORM` is an integer, from 0 to 7,
corresponding to your transform of choice.


```
WL_OUTPUT_TRANSFORM_NORMAL = 0
WL_OUTPUT_TRANSFORM_90 = 1
WL_OUTPUT_TRANSFORM_180 = 2
WL_OUTPUT_TRANSFORM_270 = 3
WL_OUTPUT_TRANSFORM_FLIPPED = 4
WL_OUTPUT_TRANSFORM_FLIPPED_90 = 5
WL_OUTPUT_TRANSFORM_FLIPPED_180 = 6
WL_OUTPUT_TRANSFORM_FLIPPED_270 = 7
```

## Binding workspaces to a monitor

A workspace can be bound to a monitor, meaning by default it will ALWAYS open
on the selected monitor. You can do this with
```
wsbind=WORKSPACE,MONITOR
```

for example:
```
wsbind=5,DP-1
wsbind=name:secret,DP-2
```
