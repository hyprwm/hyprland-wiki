# hl.dsp.workspace.rename

#### hl.dsp.workspace.rename(spec: table)

Create a dispatcher.

## Signature

```text
hl.dsp.workspace.rename(spec: table): HL.Dispatcher
```

## Parameters

workspace
: Workspace to rename.

name
: New name. Omit or nil to clear.

## Returns

dispatcher
: Dispatcher object returned by this function.

## Examples

```lua
hl.dispatch(hl.dsp.workspace.rename({ workspace = 3, name = "web" }))
```

## See also

[`HL.Dispatcher`](../../../../objects/HL.Dispatcher#hldispatcher)
: Dispatcher object returned by this function.

[`hl.bind()`](../../../bind#hlbind)
: Bind a dispatcher to a key.

[`hl.dispatch()`](../../../dispatch#hldispatch)
: Execute a dispatcher immediately.
