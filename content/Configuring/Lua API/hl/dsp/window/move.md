# hl.dsp.window.move

#### hl.dsp.window.move(spec)

Create a window move dispatcher.

## Signature

```text
hl.dsp.window.move(spec: table): HL.Dispatcher
```

## Parameters

spec
: Window move operation table.

## Accepted fields

direction
: Move the window in a direction. If `group_aware` is true, move the window
  or group as appropriate.

group_aware
: Only used with `direction`.

x, y
: Move by exact vector. Both fields are required for vector movement.

relative
: Only used with `x` and `y`. If true, treat the vector as relative.

workspace
: Move the window to a workspace.

monitor
: Move the window to a monitor.

follow
: Used with `workspace` or `monitor`. If false, the move is silent.

into_group
: Move into a group in the given direction.

into_or_create_group
: Move into an existing group in the given direction, or create one.

out_of_group
: Move out of a group. A string is parsed as a direction; boolean true uses
  the default direction.

window
: Target window.

## Returns

dispatcher
: Dispatcher object returned by this function.

## Examples

```lua
hl.dispatch(hl.dsp.window.move({ direction = "left" }))
hl.dispatch(hl.dsp.window.move({ x = 100, y = 0, relative = true }))
hl.dispatch(hl.dsp.window.move({ workspace = 3, follow = false }))
```

## Notes

If multiple recognized move forms are present, the implementation checks them
in this order: `direction`, `x`/`y`, `workspace`, `monitor`,
`into_group`, `into_or_create_group`, `out_of_group`.

## See also

[`HL.Dispatcher`](../../../../objects/HL.Dispatcher#hldispatcher)
: Dispatcher object returned by this function.

[`hl.dsp.window.resize()`](../resize#hldspwindowresize)
: Resize a window.
