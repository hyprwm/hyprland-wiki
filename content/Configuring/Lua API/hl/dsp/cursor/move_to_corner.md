# hl.dsp.cursor.move_to_corner

#### hl.dsp.cursor.move_to_corner(spec: table)

Create a dispatcher.

## Signature

```text
hl.dsp.cursor.move_to_corner(spec: table): HL.Dispatcher
```

## Parameters

corner
: Corner index.

window
: Target window.

## Returns

dispatcher
: Dispatcher object returned by this function.

## Examples

```lua
hl.dispatch(hl.dsp.cursor.move_to_corner({ corner = 0 }))
```

## Notes

<!-- TODO: Document corner index meanings. -->

## See also

[`HL.Dispatcher`](../../../../objects/HL.Dispatcher#hldispatcher)
: Dispatcher object returned by this function.

[`hl.bind()`](../../../bind#hlbind)
: Bind a dispatcher to a key.

[`hl.dispatch()`](../../../dispatch#hldispatch)
: Execute a dispatcher immediately.
