# hl.dsp.window.fullscreen

#### hl.dsp.window.fullscreen(spec=None)

Create a window fullscreen dispatcher.

## Signature

```text
hl.dsp.window.fullscreen(spec?: table): HL.Dispatcher
```

## Parameters

spec
: Fullscreen options.

mode
: Accepted values are `fullscreen`, `maximized`, `0` for fullscreen, and
  `1` for maximized. Defaults to `fullscreen`.

action
: Accepted values are `toggle`, `set`, and `unset`. Defaults to
  `toggle`.

window
: Target window.

## Returns

dispatcher
: Dispatcher object returned by this function.

## Examples

```lua
hl.dispatch(hl.dsp.window.fullscreen())
hl.dispatch(hl.dsp.window.fullscreen({ mode = "maximized", action = "set" }))
```
