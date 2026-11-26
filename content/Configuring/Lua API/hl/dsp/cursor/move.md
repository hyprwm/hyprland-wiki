# hl.dsp.cursor.move

#### hl.dsp.cursor.move(spec: table)

Create a dispatcher.

## Signature

```text
hl.dsp.cursor.move(spec: table): HL.Dispatcher
```

## Parameters

x
: X delta.

y
: Y delta.

## Returns

dispatcher
: Dispatcher object returned by this function.

## Examples

```lua
hl.dispatch(hl.dsp.cursor.move({ x = 10, y = -10 }))
```

## See also

[`HL.Dispatcher`](../../../../objects/HL.Dispatcher#hldispatcher)
: Dispatcher object returned by this function.

[`hl.bind()`](../../../bind#hlbind)
: Bind a dispatcher to a key.

[`hl.dispatch()`](../../../dispatch#hldispatch)
: Execute a dispatcher immediately.
