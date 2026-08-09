---
weight: 20
title: Workspace Rules
---

You can set workspace rules to achieve workspace-specific behaviors. For
instance, you can define a workspace where all windows are drawn without borders
or gaps.

Some layouts have their own specific rules, they can be found on the corresponding layout page

## Syntax

```lua
hl.workspace_rule(workspace = SELECTOR, RULE1, RULE2, ...)
```

- SELECTOR is a valid workspace selector (see
  [Naming conventions](../../../../naming-conventions#workspace-selectors)). This field is
  mandatory. This _can be_ a workspace selector, but please note
  workspace selectors can only match _existing_ workspaces.
- RULE is one of the rules described [below](#rules).

## Rules

<!-- limits there for future, if someone decides to add something -->

| Rule | Description | Type |
| --- | --- | --- |
| animation | The animation style to use for this workspace. | string |
| monitor | Binds a workspace to a monitor. See [syntax](#syntax) and [Monitors](../../monitors). | string |
| default | Whether this workspace should be the default workspace for the given monitor | bool |
| float_gaps | Set the gaps for floating windows | css_gaps |
| gaps_in | Set the gaps between windows | css_gaps |
| gaps_out | Set the gaps between windows and monitor edges | css_gaps |
| border_size | Set the border size around windows | int |
| no_border | Whether to disable borders | bool |
| no_shadow | Whether to disable shadows | bool |
| no_wobble | Whether to disable wobble | bool |
| no_rounding | Whether to disable rounded windows | bool |
| no_wobble | Whether to disable wobble | bool |
| decorate | Whether to draw window decorations or not | bool |
| persistent | Keep this workspace alive even if empty and inactive | bool |
| on_created_empty | A command to be executed once a workspace is created empty (i.e. not created by moving a window to it). See the [command syntax](../../dispatchers#executing-with-rules) | string |
| default_name | A default name for the workspace. | string |
| layout | The layout to use for this workspace. | string |
| layout_opts | A table of layout-specific options for this workspace. Keys and values depend on the layout. | table |

{{% details title="Examples" closed="true" %}}

```lua
hl.workspace_rule({ workspace = "3", no_rounding = true, decorate = false })
hl.workspace_rule({ workspace = "name:coding", no_rounding = true, decorate = false, gaps_in = 0, gaps_out = 0, no_border = true, monitor = "DP-1" })
hl.workspace_rule({ workspace = "8", border_size = 8 })
hl.workspace_rule({ workspace = "name:Hello", monitor = "DP-1", default = true })
hl.workspace_rule({ workspace = "name:gaming", monitor = "desc:Chimei Innolux Corporation 0x150C", default = true })
hl.workspace_rule({ workspace = "5", on_created_empty = "[float] firefox" })
hl.workspace_rule({ workspace = "special:scratchpad", on_created_empty = "foot" })
hl.workspace_rule({ workspace = "15", animation = "slidevert", default_name = "slider" })
```

{{% /details %}}

### Per-workspace layouts

Use workspace rules to set per-workspace layouts:

```lua
hl.workspace_rule({ workspace = "2", layout = "scrolling" })
```
