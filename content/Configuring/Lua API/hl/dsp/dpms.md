# hl.dsp.dpms

#### hl.dsp.dpms(spec?: table)

Create a dispatcher.

## Signature

```text
hl.dsp.dpms(spec?: table): HL.Dispatcher
```

## Parameters

spec
: Toggle-action table. May include `monitor`.

monitor
: Monitor to target.

## Returns

dispatcher
: Dispatcher object returned by this function.

## Examples

```lua
hl.dispatch(hl.dsp.dpms({ action = "off", monitor = "DP-1" }))
```

## Notes

<!-- TODO: Confirm public spelling accepted by the shared toggle-action parser. -->

## See also

[`HL.Dispatcher`](../../../objects/HL.Dispatcher#hldispatcher)
: Dispatcher object returned by this function.

[`hl.bind()`](../../bind#hlbind)
: Bind a dispatcher to a key.

[`hl.dispatch()`](../../dispatch#hldispatch)
: Execute a dispatcher immediately.
