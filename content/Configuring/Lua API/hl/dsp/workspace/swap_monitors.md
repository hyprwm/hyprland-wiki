# hl.dsp.workspace.swap_monitors

#### hl.dsp.workspace.swap_monitors(spec: table)

Create a dispatcher.

## Signature

```text
hl.dsp.workspace.swap_monitors(spec: table): HL.Dispatcher
```

## Parameters

monitor1
: First monitor.

monitor2
: Second monitor.

## Returns

dispatcher
: Dispatcher object returned by this function.

## Examples

```lua
hl.dispatch(hl.dsp.workspace.swap_monitors({ monitor1 = "DP-1", monitor2 = "DP-2" }))
```

## See also

[`HL.Dispatcher`](../../../../objects/HL.Dispatcher#hldispatcher)
: Dispatcher object returned by this function.

[`hl.bind()`](../../../bind#hlbind)
: Bind a dispatcher to a key.

[`hl.dispatch()`](../../../dispatch#hldispatch)
: Execute a dispatcher immediately.
