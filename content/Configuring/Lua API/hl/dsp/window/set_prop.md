# hl.dsp.window.set_prop

#### hl.dsp.window.set_prop(spec: table)

Create a dispatcher.

## Signature

```text
hl.dsp.window.set_prop(spec: table): HL.Dispatcher
```

## Parameters

prop
: Property name.

value
: Property value.

window
: Target window.

## Returns

dispatcher
: Dispatcher object returned by this function.

## Examples

```lua
hl.dispatch(hl.dsp.window.set_prop({ prop = "opaque", value = "1" }))
```

## See also

[`HL.Dispatcher`](../../../../objects/HL.Dispatcher#hldispatcher)
: Dispatcher object returned by this function.

[`hl.bind()`](../../../bind#hlbind)
: Bind a dispatcher to a key.

[`hl.dispatch()`](../../../dispatch#hldispatch)
: Execute a dispatcher immediately.
