# hl.dsp.exec_raw

#### hl.dsp.exec_raw(cmd: string)

Create a dispatcher.

## Signature

```text
hl.dsp.exec_raw(cmd: string): HL.Dispatcher
```

## Parameters

cmd
: Raw command string to spawn.

## Returns

dispatcher
: Dispatcher object returned by this function.

## Examples

```lua
hl.dispatch(hl.dsp.exec_raw("notify-send hello"))
```

## See also

[`HL.Dispatcher`](../../../objects/HL.Dispatcher#hldispatcher)
: Dispatcher object returned by this function.

[`hl.bind()`](../../bind#hlbind)
: Bind a dispatcher to a key.

[`hl.dispatch()`](../../dispatch#hldispatch)
: Execute a dispatcher immediately.
