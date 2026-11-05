# hl.dsp.layout

#### hl.dsp.layout(message: string)

Create a dispatcher.

## Signature

```text
hl.dsp.layout(message: string): HL.Dispatcher
```

## Parameters

message
: Layout message string.

## Returns

dispatcher
: Dispatcher object returned by this function.

## Examples

```lua
hl.dispatch(hl.dsp.layout("orientationleft"))
```

## See also

[`HL.Dispatcher`](../../../objects/HL.Dispatcher#hldispatcher)
: Dispatcher object returned by this function.

[`hl.bind()`](../../bind#hlbind)
: Bind a dispatcher to a key.

[`hl.dispatch()`](../../dispatch#hldispatch)
: Execute a dispatcher immediately.
