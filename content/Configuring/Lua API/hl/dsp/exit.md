# hl.dsp.exit

#### hl.dsp.exit()

Create a dispatcher.

## Signature

```text
hl.dsp.exit(): HL.Dispatcher
```

## Returns

dispatcher
: Dispatcher object returned by this function.

## Examples

```lua
hl.bind("SUPER + SHIFT + E", hl.dsp.exit())
```

## See also

[`HL.Dispatcher`](../../../objects/HL.Dispatcher#hldispatcher)
: Dispatcher object returned by this function.

[`hl.bind()`](../../bind#hlbind)
: Bind a dispatcher to a key.

[`hl.dispatch()`](../../dispatch#hldispatch)
: Execute a dispatcher immediately.
