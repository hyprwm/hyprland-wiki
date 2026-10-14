# hl.layer_rule

#### hl.layer_rule(spec)

Register a layer rule.

## Signature

```text
hl.layer_rule(spec: HL.LayerRuleSpec): HL.LayerRule
```

## Parameters

spec
: Rule table.

## Returns

rule
: Runtime rule object.

## Examples

```lua
hl.layer_rule({
    name = "rofi-no-anim",
    match = { namespace = "rofi" },
    no_anim = true,
})
```

## Notes

Match values may be strings or booleans. Named rules are reused on later calls.

<!-- TODO: Expand known static and dynamic rule effect descriptions from rule engine metadata. -->

## See also

[`HL.LayerRuleSpec`](../../types/HL.LayerRuleSpec#hllayerrulespec)
: Input table accepted by this function.
