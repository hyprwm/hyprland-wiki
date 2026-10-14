# hl.dsp.window.alter_zorder

#### hl.dsp.window.alter_zorder(spec: table)

Create a dispatcher.

## Signature

```text
hl.dsp.window.alter_zorder(spec: table): HL.Dispatcher
```

## Parameters

mode
: Z-order mode string.

window
: Target window.

## Returns

dispatcher
: Dispatcher object returned by this function.

## Examples

```lua
hl.dispatch(hl.dsp.window.alter_zorder({ mode = "top" }))
```

## See also

[`HL.Dispatcher`](../../../../objects/HL.Dispatcher#hldispatcher)
: Dispatcher object returned by this function.

[`hl.bind()`](../../../bind#hlbind)
: Bind a dispatcher to a key.

[`hl.dispatch()`](../../../dispatch#hldispatch)
: Execute a dispatcher immediately.
