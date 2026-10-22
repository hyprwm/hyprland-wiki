# hl.dsp.pass

#### hl.dsp.pass(spec: table)

Create a dispatcher.

## Signature

```text
hl.dsp.pass(spec: table): HL.Dispatcher
```

## Parameters

spec
: Must contain `window`.

window
: Window to pass the current key event to.

## Returns

dispatcher
: Dispatcher object returned by this function.

## Examples

```lua
hl.bind("SUPER + P", hl.dsp.pass({ window = "class:firefox" }))
```

## See also

[`HL.Dispatcher`](../../../objects/HL.Dispatcher#hldispatcher)
: Dispatcher object returned by this function.

[`hl.bind()`](../../bind#hlbind)
: Bind a dispatcher to a key.

[`hl.dispatch()`](../../dispatch#hldispatch)
: Execute a dispatcher immediately.
