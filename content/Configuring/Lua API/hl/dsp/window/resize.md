# hl.dsp.window.resize

#### hl.dsp.window.resize(spec)

Create a mouse-resize or exact-resize dispatcher.

## Signature

```text
hl.dsp.window.resize(): HL.Dispatcher
hl.dsp.window.resize(spec: table): HL.Dispatcher
```

## Parameters

spec
: Exact resize table. If omitted, creates the mouse resize dispatcher.

x
: X resize amount. Required in table form.

y
: Y resize amount. Required in table form.

relative
: If true, resize relatively.

window
: Target window.

## Returns

dispatcher
: Dispatcher object returned by this function.

## Examples

```lua
hl.bind("SUPER + mouse:273", hl.dsp.window.resize())

hl.dispatch(hl.dsp.window.resize({
    x = 80,
    y = 0,
    relative = true,
}))
```
