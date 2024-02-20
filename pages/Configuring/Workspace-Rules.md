---
weight: 8
title: Workspace Rules
---

## Workspace Rules

You can set workspace rules to achieve workspace-specific behaviors. For
instance, you can define a workspace where all windows are drawn without borders
or gaps.

For layout-specific rules, see the specific layout page. For example:
[Master Layout->Workspace Rules](../master-layout#workspace-rules)

### Syntax

```ini
workspace=WORKSPACE,RULES
```

- WORKSPACE is a valid workspace identifier (see
  [Dispatchers->Workspaces](../dispatchers#workspaces)). This field is
  mandatory;
- RULES is one (or more) rule(s) as described here in [rules](#rules).

### Examples

```ini
workspace=name:myworkspace,gapsin:0,gapsout:0
workspace=3,rounding:false,bordersize:0
```

## Rules

| Rule | Description | type |
| --- | --- | --- |
| monitor:[m] | Binds a workspace to a monitor See [syntax](#syntax) and [Monitors](../monitors). | string |
| default:[b] | Whether this workspace should be the default workspace for the given monitor | bool |
| gapsin:[x] | Set the gaps between windows (equivalent to [General->gaps_in](../variables#general)) | int |
| gapsout:[x] | Set the gaps between windows and monitor edges (equivalent to [General->gaps_out](../variables#general)) | int |
| bordersize:[x] | Set the border size around windows (equivalent to [General->border_size](../variables#general)) | int |
| border:[b] | Whether to draw borders or not | bool |
| shadow:[b] | Whether to draw shadows or not | bool |
| rounding:[b] | Whether to draw rounded windows or not | bool |
| decorate:[b] | Whether to draw window decorations or not | bool |
| persistent:[b] | Keep this workspace alive even if empty and inactive | bool |
| on-created-empty:[c] | A command to be executed once a workspace is created empty (i.e. not created by moving a window to it). See the [command syntax](../dispatchers#executing-with-rules) | string |
| defaultName:[s] | A default name for the workspace. | string |

### Example Rules

```ini
workspace = 3, rounding:false, decorate:false
workspace = name:coding, rounding:false, decorate:false, gapsin:0, gapsout:0, border:false, decorate:false, monitor:DP-1
workspace = 8,bordersize:8
workspace = name:Hello, monitor:DP-1, default:true
workspace = name:gaming, monitor:desc:Chimei Innolux Corporation 0x150C, default:true
workspace = 5, on-created-empty:[float] firefox
workspace = special:scratchpad, on-created-empty:foot
```
