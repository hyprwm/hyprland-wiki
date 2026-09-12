# hl.dsp.send_key_state

#### hl.dsp.send_key_state(spec: table)

Create a dispatcher.

## Signature

```text
hl.dsp.send_key_state(spec: table): HL.Dispatcher
```

## Parameters

mods
: Modifier string.

key
: Key name, `code:<number>`, or `mouse:<number>`.

state
: Accepted values: `down`, `up`, or `repeat`.

window
: Target window.

## Returns

dispatcher
: Dispatcher object returned by this function.

## Examples

```lua
hl.dispatch(hl.dsp.send_key_state({ mods = "CTRL", key = "C", state = "down" }))
```

## See also

[`HL.Dispatcher`](../../../objects/HL.Dispatcher#hldispatcher)
: Dispatcher object returned by this function.

[`hl.bind()`](../../bind#hlbind)
: Bind a dispatcher to a key.

[`hl.dispatch()`](../../dispatch#hldispatch)
: Execute a dispatcher immediately.
