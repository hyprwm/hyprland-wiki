# hl.dsp.group.toggle

#### hl.dsp.group.toggle(spec?: table)

Create a dispatcher.

## Signature

```text
hl.dsp.group.toggle(spec?: table): HL.Dispatcher
```

## Parameters

window
: Target window where supported.

## Returns

dispatcher
: Dispatcher object returned by this function.

## Examples

```lua
hl.dispatch(hl.dsp.group.toggle())
```

## Notes

Some no-argument window dispatchers still accept an optional `window` field through the shared window-upvalue helper when the implementation calls it.

<!-- TODO: Confirm which of these dispatcher constructors publicly document ``window``. -->

## See also

[`HL.Dispatcher`](../../../../objects/HL.Dispatcher#hldispatcher)
: Dispatcher object returned by this function.

[`hl.bind()`](../../../bind#hlbind)
: Bind a dispatcher to a key.

[`hl.dispatch()`](../../../dispatch#hldispatch)
: Execute a dispatcher immediately.
