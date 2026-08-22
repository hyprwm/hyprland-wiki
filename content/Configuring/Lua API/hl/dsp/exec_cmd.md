# hl.dsp.exec_cmd

#### hl.dsp.exec_cmd(cmd: string, rules?: table)

Create a dispatcher.

## Signature

```text
hl.dsp.exec_cmd(cmd: string, rules?: table): HL.Dispatcher
```

## Parameters

cmd
: Command to execute. Must not be empty.

rules
: Window rules to apply to the spawned process.

## Returns

dispatcher
: Dispatcher object returned by this function.

## Examples

```lua
hl.bind("SUPER + Return", hl.dsp.exec_cmd("kitty"))

hl.bind("SUPER + F", hl.dsp.exec_cmd("firefox", { float = true }))
```

## Notes

<!-- TODO: Document the exact rule table shape accepted by ``rules``. -->

## See also

[`HL.Dispatcher`](../../../objects/HL.Dispatcher#hldispatcher)
: Dispatcher object returned by this function.

[`hl.bind()`](../../bind#hlbind)
: Bind a dispatcher to a key.

[`hl.dispatch()`](../../dispatch#hldispatch)
: Execute a dispatcher immediately.
