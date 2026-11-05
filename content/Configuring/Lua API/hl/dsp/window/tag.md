# hl.dsp.window.tag

#### hl.dsp.window.tag(spec: table)

Create a dispatcher.

## Signature

```text
hl.dsp.window.tag(spec: table): HL.Dispatcher
```

## Parameters

tag
: Tag to apply.

window
: Target window.

## Returns

dispatcher
: Dispatcher object returned by this function.

## Examples

```lua
hl.dispatch(hl.dsp.window.tag({ tag = "work" }))
```

## See also

[`HL.Dispatcher`](../../../../objects/HL.Dispatcher#hldispatcher)
: Dispatcher object returned by this function.

[`hl.bind()`](../../../bind#hlbind)
: Bind a dispatcher to a key.

[`hl.dispatch()`](../../../dispatch#hldispatch)
: Execute a dispatcher immediately.
