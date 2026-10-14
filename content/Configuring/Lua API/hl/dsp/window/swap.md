# hl.dsp.window.swap

#### hl.dsp.window.swap(spec: table)

Create a dispatcher.

## Signature

```text
hl.dsp.window.swap(spec: table): HL.Dispatcher
```

## Parameters

direction
: Swap in a direction.

target, with, other
: Target window selector. These are aliases; the first present one is used.

next
: Swap with next window.

prev
: Swap with previous window.

window
: Source window.

## Returns

dispatcher
: Dispatcher object returned by this function.

## Examples

```lua
hl.dispatch(hl.dsp.window.swap({ direction = "left" }))
hl.dispatch(hl.dsp.window.swap({ with = "class:firefox" }))
```

## See also

[`HL.Dispatcher`](../../../../objects/HL.Dispatcher#hldispatcher)
: Dispatcher object returned by this function.

[`hl.bind()`](../../../bind#hlbind)
: Bind a dispatcher to a key.

[`hl.dispatch()`](../../../dispatch#hldispatch)
: Execute a dispatcher immediately.
