# hl.dsp.no_op

#### hl.dsp.no_op()

Create a dispatcher.

## Signature

```text
hl.dsp.no_op(): HL.Dispatcher
```

## Returns

dispatcher
: Dispatcher object returned by this function.

## Examples

```lua
hl.bind("SUPER + N", hl.dsp.no_op())
```

## See also

[`HL.Dispatcher`](../../../objects/HL.Dispatcher#hldispatcher)
: Dispatcher object returned by this function.

[`hl.bind()`](../../bind#hlbind)
: Bind a dispatcher to a key.

[`hl.dispatch()`](../../dispatch#hldispatch)
: Execute a dispatcher immediately.
