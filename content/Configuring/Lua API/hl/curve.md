# hl.curve

#### hl.curve(name, spec)

Register a named bezier or spring animation curve.

## Signature

```text
hl.curve(name: string, spec: table): nil
```

## Parameters

name
: Name used later by [`hl.animation()`](../animation#hlanimation).

spec
: Curve definition table. The `type` field determines which shape is used.

## Accepted specs

### Bezier curve

```lua
{
    type = "bezier",
    points = {
        {x1, y1},
        {x2, y2},
    },
}
```

`points` must contain exactly two points. Each point must be a two-item
numeric table. Each coordinate is parsed as a float in the range `-1` to
`2`.

### Spring curve

```lua
{
    type = "spring",
    stiffness = number,
    dampening = number,
    mass = number,
}
```

`stiffness`, `dampening`, and `mass` are required numbers and must be
at least `0.5`.

## Returns

nil
: This function registers the curve and does not return a value.

## Examples

Register a bezier curve:

```lua
hl.curve("ease_out", {
    type = "bezier",
    points = {{0.23, 1}, {0.32, 1}},
})
```

Register a spring curve:

```lua
hl.curve("soft_spring", {
    type = "spring",
    stiffness = 71.2633,
    dampening = 15.8273644,
    mass = 1,
})
```

## See also

[`hl.animation()`](../animation#hlanimation)
: Use a registered curve in an animation rule.
