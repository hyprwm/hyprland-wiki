# hl.animation

#### hl.animation(spec)

Configure an animation leaf.

## Signature

```text
hl.animation(spec: table): nil
```

## Parameters

spec
: Animation configuration table.

## Required fields

leaf
: Animation tree leaf to configure. The leaf must exist.

enabled
: Whether the animation leaf is enabled. If `false`, speed and curve fields
  are ignored and the leaf is disabled.

## Conditional fields

speed
: Required when `enabled` is true. Must be greater than `0` and no more
  than `100`.

bezier
: Name of a registered bezier curve. Exactly one of `bezier` or `spring`
  is required when `enabled` is true.

spring
: Name of a registered spring curve. Exactly one of `bezier` or `spring`
  is required when `enabled` is true.

style
: Animation style string. Hyprland validates the style against the selected
  animation leaf.

## Returns

nil
: This function configures an animation leaf and does not return a value.

## Examples

Configure an animation with a bezier curve:

```lua
hl.animation({
    leaf = "windows",
    enabled = true,
    speed = 4,
    bezier = "ease_out",
    style = "slide",
})
```

Disable an animation leaf:

```lua
hl.animation({
    leaf = "border",
    enabled = false,
})
```

## See also

[`hl.curve()`](../curve#hlcurve)
: Register bezier and spring curves.
