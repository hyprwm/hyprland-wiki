# hl.dsp.global

#### hl.dsp.global(name: string)

Create a dispatcher.

## Signature

```text
hl.dsp.global(name: string): HL.Dispatcher
```

## Parameters

name
: Global shortcut string.

## Returns

dispatcher
: Dispatcher object returned by this function.

## Examples

```lua
hl.dispatch(hl.dsp.global("some:global"))
```

## See also

[`HL.Dispatcher`](../../../objects/HL.Dispatcher#hldispatcher)
: Dispatcher object returned by this function.

[`hl.bind()`](../../bind#hlbind)
: Bind a dispatcher to a key.

[`hl.dispatch()`](../../dispatch#hldispatch)
: Execute a dispatcher immediately.
