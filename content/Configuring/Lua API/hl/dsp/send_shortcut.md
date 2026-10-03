# hl.dsp.send_shortcut

#### hl.dsp.send_shortcut(spec: table)

Create a dispatcher.

## Signature

```text
hl.dsp.send_shortcut(spec: table): HL.Dispatcher
```

## Parameters

mods
: Modifier string.

key
: Key name, `code:<number>`, or `mouse:<number>`.

window
: Target window.

## Returns

dispatcher
: Dispatcher object returned by this function.

## Examples

```lua
hl.dispatch(hl.dsp.send_shortcut({ mods = "CTRL", key = "C" }))
```

## See also

[`HL.Dispatcher`](../../../objects/HL.Dispatcher#hldispatcher)
: Dispatcher object returned by this function.

[`hl.bind()`](../../bind#hlbind)
: Bind a dispatcher to a key.

[`hl.dispatch()`](../../dispatch#hldispatch)
: Execute a dispatcher immediately.
