# hl.dsp.window.deny_from_group

#### hl.dsp.window.deny_from_group(spec?: table)

Set, unset, or toggle group denial.

## Signature

```text
hl.dsp.window.deny_from_group(spec?: table): HL.Dispatcher
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
hl.dispatch(hl.dsp.window.deny_from_group({ action = "toggle" }))
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
