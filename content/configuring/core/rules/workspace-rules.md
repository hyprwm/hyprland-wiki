---
weight: 20
title: Workspace Rules
---

You can set workspace rules to achieve workspace-specific behaviors.
For instance, you can define a workspace where all windows are drawn without borders or gaps.

Some layouts have their own specific rules, which can be found on the corresponding layout page.
See [Layouts](../../../layouts).

## Syntax

```lua
hl.workspace_rule({
    workspace = workspace_selector,
    rule1 = some_value,
    rule2 = other_value,
})
```

`workspace` can also be a [predicate](../../#predicates).
It gets an `HL.Workspace` and the rule applies to every workspace it returns `true` for.
See [Editor autocompletion](../../#editor-autocompletion) for the workspace's fields and methods.

```lua
-- no gaps when a normal workspace has a single tiled window
hl.workspace_rule({
    workspace = function(ws)
        return not ws.special and ws:count_windows({ tiled = true, visible = true }) == 1
    end,
    gaps_out = 0,
    gaps_in = 0,
})

-- smaller gaps on the laptop screen
hl.workspace_rule({
    workspace = function(ws)
        return ws.monitor and ws.monitor.name == "eDP-1"
    end,
    gaps_out = 5,
})
```

`ws:count_windows(opts)` and `ws:count_groups(opts)` count the workspace's windows and groups.
`opts` can have `tiled`, `pinned` and `visible`: `true` counts only those, `false` only the others, and leaving it out counts all.

`monitor`, `default` and `persistent` can't be used with a predicate.
They create or bind a workspace before it exists, and a predicate needs an existing workspace to look at.

## Rules

<!-- SORT: monitor and default are together because it is easier to understand like that -->
| Rule | Description | Type | Limits |
| --- | --- | --- | --- |
| animation | The animation style to use for this workspace | string | |
| border_size | Set the border size around windows | int | |
| decorate | Whether to draw window decorations or not | bool | |
| default_name | A default name for the workspace | string | |
| float_gaps | Set the gaps for floating windows | css_gaps | |
| gaps_in | Set the gaps between windows | css_gaps | |
| gaps_out | Set the gaps between windows and monitor edges | css_gaps | |
| layout | The layout to use for this workspace | string | |
| layout_opts | A table of layout-specific options for this workspace. Keys and values depend on the layout | table | |
| monitor | Binds a workspace to a monitor. See [syntax](#syntax) and [Monitors](../../monitors) | string | |
| default | Whether this workspace should be the default workspace for the given monitor | bool | |
| no_border | Whether to disable borders | bool | |
| no_rounding | Whether to disable rounded windows | bool | |
| no_shadow | Whether to disable shadows | bool | |
| persistent | Keep this workspace alive even if empty and inactive | bool | |

{{% details title="Examples" closed="true" %}}

```lua
hl.workspace_rule({ workspace = "3", no_rounding = true, decorate = false })
hl.workspace_rule({ workspace = "name:coding", no_rounding = true, decorate = false, gaps_in = 0, gaps_out = 0, no_border = true, monitor = "DP-1" })
hl.workspace_rule({ workspace = "8", border_size = 8 })
hl.workspace_rule({ workspace = "name:Hello", monitor = "DP-1", default = true })
hl.workspace_rule({ workspace = "name:gaming", monitor = "desc:Chimei Innolux Corporation 0x150C", default = true })
hl.workspace_rule({ workspace = "15", animation = "slidevert", default_name = "slider" })
```

{{% /details %}}

### Per-workspace layouts

Use workspace rules to set per-workspace layouts:

```lua
hl.workspace_rule({ workspace = "2", layout = "scrolling" })
hl.workspace_rule({ workspace = "3", layout = "dwindle" })
```
