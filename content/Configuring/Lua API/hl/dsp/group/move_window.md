# hl.dsp.group.move_window

#### hl.dsp.group.move_window(spec?: table)

Create a dispatcher.

## Signature

```text
hl.dsp.group.move_window(spec?: table): HL.Dispatcher
```

## Parameters

forward
: Whether to move forward. Defaults to `true`.

## Returns

dispatcher
: Dispatcher object returned by this function.

## Examples

```lua
hl.dispatch(hl.dsp.group.move_window({ forward = false }))
```

## See also

[`HL.Dispatcher`](../../../../objects/HL.Dispatcher#hldispatcher)
: Dispatcher object returned by this function.

[`hl.bind()`](../../../bind#hlbind)
: Bind a dispatcher to a key.

[`hl.dispatch()`](../../../dispatch#hldispatch)
: Execute a dispatcher immediately.
