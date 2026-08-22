# hl.dsp.window.cycle_next

#### hl.dsp.window.cycle_next(spec?: table)

Create a dispatcher.

## Signature

```text
hl.dsp.window.cycle_next(spec?: table): HL.Dispatcher
```

## Parameters

next
: Whether to cycle forward. Defaults to `true`.

tiled
: Restrict by tiled state.

floating
: Restrict by floating state.

window
: Target window.

## Returns

dispatcher
: Dispatcher object returned by this function.

## Examples

```lua
hl.dispatch(hl.dsp.window.cycle_next({ next = false, tiled = true }))
```

## See also

[`HL.Dispatcher`](../../../../objects/HL.Dispatcher#hldispatcher)
: Dispatcher object returned by this function.

[`hl.bind()`](../../../bind#hlbind)
: Bind a dispatcher to a key.

[`hl.dispatch()`](../../../dispatch#hldispatch)
: Execute a dispatcher immediately.
