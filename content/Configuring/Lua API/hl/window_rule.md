# hl.window_rule

#### hl.window_rule(spec)

Register a window rule.

## Signature

```text
hl.window_rule(spec: HL.WindowRuleSpec): HL.WindowRule
```

## Parameters

spec
: Rule table.

## Returns

rule
: Runtime rule object.

## Examples

```lua
hl.window_rule({
    name = "float-dialogs",
    match = { class = "pavucontrol" },
    float = true,
    center = true,
})
```

## Notes

Match values may be strings, booleans, or numbers. Named rules are reused on later calls.

<!-- TODO: Expand known static and dynamic rule effect descriptions from rule engine metadata. -->

## See also

[`HL.WindowRuleSpec`](../../types/HL.WindowRuleSpec#hlwindowrulespec)
: Input table accepted by this function.
