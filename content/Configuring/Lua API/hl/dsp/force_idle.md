# hl.dsp.force_idle

#### hl.dsp.force_idle(timeout: number)

Create a dispatcher.

## Signature

```text
hl.dsp.force_idle(timeout: number): HL.Dispatcher
```

## Parameters

timeout
: Idle timeout value passed to Hyprland.

## Returns

dispatcher
: Dispatcher object returned by this function.

## Examples

```lua
hl.dispatch(hl.dsp.force_idle(0))
```

## See also

[`HL.Dispatcher`](../../../objects/HL.Dispatcher#hldispatcher)
: Dispatcher object returned by this function.

[`hl.bind()`](../../bind#hlbind)
: Bind a dispatcher to a key.

[`hl.dispatch()`](../../dispatch#hldispatch)
: Execute a dispatcher immediately.
