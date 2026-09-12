# hl.dsp.focus

#### hl.dsp.focus(spec)

Create a focus dispatcher.

## Signature

```text
hl.dsp.focus(spec: table): HL.Dispatcher
```

## Parameters

spec
: Focus operation table. Must contain one recognized focus field.

## Accepted fields

direction
: Direction to move focus.
  <br/>
  Accepted values:
  <br/>
  * `left`
  * `right`
  * `up`
  * `down`
  <br/>
  Short aliases are also accepted by the shared direction parser.
  <br/>
  <!-- TODO: Confirm exact short aliases accepted by ``parseDirectionStr``. -->

monitor
: Focus the selected monitor.

workspace
: Focus the selected workspace.

on_current_monitor
: Only used with `workspace`. If true, changes to the selected workspace on
  the current monitor.

window
: Focus the selected window.

urgent_or_last
: If true, focus the urgent window, or the last window if no urgent window is
  available.

last
: If true, focus the current or last window.

## Returns

dispatcher
: Dispatcher object that performs the focus operation when executed.

## Examples

```lua
hl.bind("SUPER + H", hl.dsp.focus({
    direction = "left",
}))

hl.dispatch(hl.dsp.focus({
    monitor = "DP-1",
}))

hl.dispatch(hl.dsp.focus({
    workspace = 3,
    on_current_monitor = true,
}))
```

## Notes

If multiple recognized fields are present, the first matching field in this
order is used: `direction`, `monitor`, `workspace`, `window`,
`urgent_or_last`, `last`.

## See also

[`HL.Dispatcher`](../../../objects/HL.Dispatcher#hldispatcher)
: Dispatcher object returned by this function.

[`hl.bind()`](../../bind#hlbind)
: Bind a dispatcher to a key.

[`hl.dispatch()`](../../dispatch#hldispatch)
: Execute a dispatcher immediately.
