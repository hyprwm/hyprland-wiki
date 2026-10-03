# hl.dsp.workspace.toggle_special

#### hl.dsp.workspace.toggle_special(name?: string)

Create a dispatcher.

## Signature

```text
hl.dsp.workspace.toggle_special(name?: string): HL.Dispatcher
```

## Parameters

name
: Special workspace name. Omit for the default special workspace.

## Returns

dispatcher
: Dispatcher object returned by this function.

## Examples

```lua
hl.dispatch(hl.dsp.workspace.toggle_special("scratch"))
```

## See also

[`HL.Dispatcher`](../../../../objects/HL.Dispatcher#hldispatcher)
: Dispatcher object returned by this function.

[`hl.bind()`](../../../bind#hlbind)
: Bind a dispatcher to a key.

[`hl.dispatch()`](../../../dispatch#hldispatch)
: Execute a dispatcher immediately.
