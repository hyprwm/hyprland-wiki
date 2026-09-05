# hl.dsp.window.pin

#### hl.dsp.window.pin(spec?: table)

Pin, unpin, or toggle a window.

## Signature

```text
hl.dsp.window.pin(spec?: table): HL.Dispatcher
```

## Parameters

spec
: Toggle-action table.

window
: Target window where supported.

## Returns

dispatcher
: Dispatcher object returned by this function.

## Examples

```lua
hl.dispatch(hl.dsp.window.pin({ action = "toggle" }))
```

## Notes

<!-- TODO: Confirm public spelling accepted by the shared toggle-action parser. -->

## See also

[`HL.Dispatcher`](../../../../objects/HL.Dispatcher#hldispatcher)
: Dispatcher object returned by this function.

[`hl.bind()`](../../../bind#hlbind)
: Bind a dispatcher to a key.

[`hl.dispatch()`](../../../dispatch#hldispatch)
: Execute a dispatcher immediately.
