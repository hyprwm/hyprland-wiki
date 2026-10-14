# HL.PermissionSpec

#### *class* HL.PermissionSpec

Table form accepted by [`hl.permission()`](../../hl/permission#hlpermission).

## Shape

```text
{
    binary = string, -- or target = string
    type = string,
    mode = string,
}
```

## Fields

binary
: Binary name. Must not be empty.

target
: Alias for `binary` in table form.

type
: One of `screencopy`, `cursorpos`, `plugin`, `keyboard`, or `keeb`.

mode
: One of `ask`, `allow`, or `deny`.

## Used by

[`hl.permission()`](../../hl/permission#hlpermission)
: Register a dynamic permission rule.
