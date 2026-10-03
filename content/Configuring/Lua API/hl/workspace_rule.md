# hl.workspace_rule

#### hl.workspace_rule(spec)

Register a workspace rule.

## Signature

```text
hl.workspace_rule(spec: HL.WorkspaceRuleSpec): nil
```

## Parameters

spec
: Rule table.

## Returns

nil
: This function registers the rule and does not return a value.

## Examples

```lua
hl.workspace_rule({
    workspace = "1",
    monitor = "DP-1",
    gaps_in = 4,
    layout_opts = {
        orientation = "left",
    },
})
```

## Notes

`workspace` is required. `layout_opts` must be a table whose keys are strings and values are strings, booleans, or numbers.

<!-- TODO: Expand known static and dynamic rule effect descriptions from rule engine metadata. -->

## See also

[`HL.WorkspaceRuleSpec`](../../types/HL.WorkspaceRuleSpec#hlworkspacerulespec)
: Input table accepted by this function.
