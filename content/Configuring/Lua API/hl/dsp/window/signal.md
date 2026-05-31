# hl.dsp.window.signal

#### hl.dsp.window.signal(spec: table)

Create a dispatcher.

## Signature

```text
hl.dsp.window.signal(spec: table): HL.Dispatcher
```

## Parameters

signal
: Signal number.

window
: Target window.

## Returns

dispatcher
: Dispatcher object returned by this function.

## Examples

```lua
hl.dispatch(hl.dsp.window.signal({ signal = 15 }))
```

## See also

[`HL.Dispatcher`](../../../../objects/HL.Dispatcher#hldispatcher)
: Dispatcher object returned by this function.

[`hl.bind()`](../../../bind#hlbind)
: Bind a dispatcher to a key.

[`hl.dispatch()`](../../../dispatch#hldispatch)
: Execute a dispatcher immediately.
