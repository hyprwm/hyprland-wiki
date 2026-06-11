# hl.dsp.event

#### hl.dsp.event(name: string)

Create a dispatcher.

## Signature

```text
hl.dsp.event(name: string): HL.Dispatcher
```

## Parameters

name
: Event string.

## Returns

dispatcher
: Dispatcher object returned by this function.

## Examples

```lua
hl.dispatch(hl.dsp.event("custom-event"))
```

## See also

[`HL.Dispatcher`](../../../objects/HL.Dispatcher#hldispatcher)
: Dispatcher object returned by this function.

[`hl.bind()`](../../bind#hlbind)
: Bind a dispatcher to a key.

[`hl.dispatch()`](../../dispatch#hldispatch)
: Execute a dispatcher immediately.
