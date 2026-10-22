# hl.permission

#### hl.permission(binary, type, mode)

Add a dynamic permission rule.

## Signature

```text
hl.permission(binary: string, type: string, mode: string): nil
hl.permission(spec: HL.PermissionSpec): nil
```

## Parameters

binary
: Binary name or target. Must not be empty.

type
: Permission type.
  <br/>
  Accepted values:
  <br/>
  * `screencopy`
  * `cursorpos`
  * `plugin`
  * `keyboard`
  * `keeb` alias for `keyboard`

mode
: Permission mode.
  <br/>
  Accepted values:
  <br/>
  * `ask`
  * `allow`
  * `deny`

spec
: Table form. `binary` may also be written as `target`.

## Returns

nil
: This function registers the permission rule and does not return a value.

## Examples

Positional form:

```lua
hl.permission("grim", "screencopy", "allow")
```

Table form:

```lua
hl.permission({
    binary = "my-plugin",
    type = "plugin",
    mode = "ask",
})
```

## See also

[`HL.PermissionSpec`](../../types/HL.PermissionSpec#hlpermissionspec)
: Table form accepted by this function.
