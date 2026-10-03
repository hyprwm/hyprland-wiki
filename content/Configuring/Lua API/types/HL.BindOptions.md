# HL.BindOptions

#### *class* HL.BindOptions

Options table accepted by [`hl.bind()`](../../hl/bind#hlbind).

## Shape

```text
{
    repeating = boolean?,
    locked = boolean?,
    release = boolean?,
    non_consuming = boolean?,
    auto_consuming = boolean?,
    transparent = boolean?,
    ignore_mods = boolean?,
    dont_inhibit = boolean?,
    long_press = boolean?,
    submap_universal = boolean?,
    click = boolean?,
    drag = boolean?,
    description = string?,
    desc = string?,
    device = {
        inclusive = boolean?,
        list = string[]?,
    }?,
}
```

## Fields

repeating
: Enable repeat behavior.

locked
: Allow the bind while locked.

release
: Trigger on key release.

non_consuming
: Do not consume the input event.

auto_consuming
: Auto-consuming bind behavior.

transparent
: Make the bind transparent.

ignore_mods
: Ignore active modifiers.

dont_inhibit
: Do not respect input inhibition.

long_press
: Trigger as a long-press bind.

submap_universal
: Apply across submaps.

click
: Treat the bind as a click bind. Also implies `release`.

drag
: Treat the bind as a drag bind. Also implies `release`.

description
: Description shown for the bind.

desc
: Short alias for `description`. Used only if `description` is absent.

device
: Device filter table.

## Notes

`click` and `drag` are mutually exclusive. `long_press` and `release`
are incompatible with `repeating`. Mouse binds are incompatible with
`repeating`, `release`, and `locked`.

## Used by

[`hl.bind()`](../../hl/bind#hlbind)
: Register a keybind.
