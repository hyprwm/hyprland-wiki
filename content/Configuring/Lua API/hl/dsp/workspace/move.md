# hl.dsp.workspace.move

#### hl.dsp.workspace.move(spec: table)

Create a dispatcher.

## Signature

```text
hl.dsp.workspace.move(spec: table): HL.Dispatcher
```

## Parameters

monitor
: Destination monitor.

workspace
: Workspace to move. If omitted, moves the current workspace.

## Returns

dispatcher
: Dispatcher object returned by this function.

## Examples

```lua
hl.dispatch(hl.dsp.workspace.move({ workspace = 3, monitor = "DP-1" }))
```

## See also

[`HL.Dispatcher`](../../../../objects/HL.Dispatcher#hldispatcher)
: Dispatcher object returned by this function.

[`hl.bind()`](../../../bind#hlbind)
: Bind a dispatcher to a key.

[`hl.dispatch()`](../../../dispatch#hldispatch)
: Execute a dispatcher immediately.
