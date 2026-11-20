# HL.WindowRuleSpec

#### *class* HL.WindowRuleSpec

Table accepted by [`hl.window_rule()`](../../hl/window_rule#hlwindow_rule).

## Shape

```text
{
    name = string?,
    enabled = boolean?,
    match = table<string, string | number | boolean>?,
    -- window rule effect fields
}
```

## Fields

name
: Rule name. Named rules are reused by later calls with the same name.

enabled
: Whether the rule is enabled. Defaults to `true`.

match
: Match table. Keys are rule match property names; values may be strings,
  numbers, or booleans.

## Additional fields

All other fields are interpreted as window rule effect names. Static effects
are parsed through Hyprland’s window rule effect descriptors; dynamic effects
are looked up through the window effect registry.

<!-- TODO: Expand the complete list of known static effects and accepted value types. -->

## Used by

[`hl.window_rule()`](../../hl/window_rule#hlwindow_rule)
: Register a window rule.
