# hl.dsp.group.active

#### hl.dsp.group.active(spec: table)

Create a dispatcher.

## Signature

```text
hl.dsp.group.active(spec: table): HL.Dispatcher
```

## Parameters

index
: Group member index to activate.

window
: Target window.

## Returns

dispatcher
: Dispatcher object returned by this function.

## Examples

```lua
hl.dispatch(hl.dsp.group.active({ index = 1 }))
```

## See also

[`HL.Dispatcher`](../../../../objects/HL.Dispatcher#hldispatcher)
: Dispatcher object returned by this function.

[`hl.bind()`](../../../bind#hlbind)
: Bind a dispatcher to a key.

[`hl.dispatch()`](../../../dispatch#hldispatch)
: Execute a dispatcher immediately.
