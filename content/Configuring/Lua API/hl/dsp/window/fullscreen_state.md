# hl.dsp.window.fullscreen_state

#### hl.dsp.window.fullscreen_state(spec)

Create a dispatcher that sets, unsets, or toggles the internal/client fullscreen state pair.

## Signature

```text
hl.dsp.window.fullscreen_state(spec: table): HL.Dispatcher
```

## Parameters

internal
: Desired internal fullscreen mode. Required.

client
: Desired client fullscreen mode. Required.

action
: Accepted values are `toggle`, `set`, and `unset`. Defaults to `set`.

window
: Target window.

## Returns

dispatcher
: Dispatcher object returned by this function.

## Examples

```lua
hl.dispatch(hl.dsp.window.fullscreen_state({
    internal = 1,
    client = 1,
    action = "set",
}))
```

<!-- TODO: Document the public meaning of internal/client fullscreen numeric values. -->
