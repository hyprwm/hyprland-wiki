# HL.WorkspaceRuleSpec

#### *class* HL.WorkspaceRuleSpec

Table accepted by [`hl.workspace_rule()`](../../hl/workspace_rule#hlworkspace_rule).

## Shape

```text
{
    workspace = string,
    enabled = boolean?,
    monitor = string?,
    default = boolean?,
    persistent = boolean?,
    gaps_in = integer | HL.CssGap?,
    gaps_out = integer | HL.CssGap?,
    float_gaps = integer | HL.CssGap?,
    border_size = integer?,
    no_border = boolean?,
    no_rounding = boolean?,
    decorate = boolean?,
    no_shadow = boolean?,
    on_created_empty = string?,
    default_name = string?,
    layout = string?,
    layout_opts = table<string, string | number | boolean>?,
    animation = string?,
}
```

## Fields

workspace
: Workspace selector string. Required.

enabled
: Whether the rule is enabled. Defaults to `true`.

monitor
: Monitor assigned to the workspace.

default
: Mark as a default workspace rule.

persistent
: Make the workspace persistent.

gaps_in, gaps_out, float_gaps
: Gap overrides.

border_size
: Border size override.

no_border, no_rounding, decorate, no_shadow
: Decoration-related workspace overrides.

on_created_empty
: Command run when the workspace is created empty.

default_name
: Default workspace name.

layout
: Layout override.

layout_opts
: Layout options table. Keys must be strings; values may be strings, numbers,
  or booleans.

animation
: Animation override.

<!-- TODO: Confirm whether every listed field exists in the current source build; this page combines stub fields with source-derived parser behavior. -->

## Used by

[`hl.workspace_rule()`](../../hl/workspace_rule#hlworkspace_rule)
: Register a workspace rule.
