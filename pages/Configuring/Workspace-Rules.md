# Table of contents

{{< toc >}}

# Workspace Rules
You can set workspace rules to achieve workspace-specific behaviors. For instance, you can define a workspace where all windows are drawn without borders or gaps.


## Syntax
```ini
workspace=WORKSPACE,RULES
```

- WORKSPACE is a valid workspace identifier (see [Dispatchers->Workspaces](../Dispatchers#workspaces)). This field is mandatory;
- RULES is one (or more) rule(s) as described here in [rules](#rules).

### Examples
```ini
workspace=name:myworkspace,gapsin:0,gapsout:0
workspace=DP-1,3,rounding:false,bordersize:0
```

## Rules
| Rule | Description | type |
| ---- | ----------- | ---- |
| monitor:[m] | Binds a workspace to a monitor See [syntax](#syntax) and [Monitors](../Monitors).| string |
| default:[b] | Whether this workspace should be the default workspace for the given monitor | bool |
| gapsin:[x] | Set the gaps between windows (equivalent to [General->gaps_in](../Variables#general)) | int |
| gapsout:[x] | Set the gaps between windows and monitor edges (equivalent to [General->gaps_out](../Variables#general)) | int |
| bordersize:[x] | Set the border size around windows (equivalent to [General->border_size](../Variables#general)) | int |
| border:[b]| Whether to draw borders or not| bool |
| rounding:[b] | Whether to draw rounded windows or not | bool |
| decorate:[b] | Whether to draw window decorations or not | bool |

### Example Rules
```ini
workspace = 3, rounding:false, decorate:false
workspace = name:coding, rounding:false, decorate:false, gapsin:0, gapsout:0, border:false, decorate:false, monitor:DP-1
workspace = 8,bordersize:8
workspace = name:Hello, monitor:DP-1, default:true
```
