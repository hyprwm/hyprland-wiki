# hl.dsp.submap

#### hl.dsp.submap(name: string)

Create a dispatcher.

## Signature

```text
hl.dsp.submap(name: string): HL.Dispatcher
```

## Parameters

name
: Submap name to activate.

## Returns

dispatcher
: Dispatcher object returned by this function.

## Examples

```lua
hl.bind("SUPER + R", hl.dsp.submap("resize"))
```

## See also

[`HL.Dispatcher`](../../../objects/HL.Dispatcher#hldispatcher)
: Dispatcher object returned by this function.

[`hl.bind()`](../../bind#hlbind)
: Bind a dispatcher to a key.

[`hl.dispatch()`](../../dispatch#hldispatch)
: Execute a dispatcher immediately.
