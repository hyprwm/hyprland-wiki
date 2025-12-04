---
weight: 8
title: Workspace Rules
---

You can set workspace rules to achieve workspace-specific behaviors. For
instance, you can define a workspace where all windows are drawn without borders
or gaps.

For layout-specific rules, see the specific layout page. For example:
[Master Layout->Workspace Rules](../Master-Layout#workspace-rules).

### Workspace selectors

Workspaces that have already been created can be targeted by workspace
selectors, e.g. `r[2-4] w[t1]`.

Selectors have props separated by a space. No spaces are allowed inside props
themselves.

Props:

- `r[A-B]` - ID range from A to B inclusive
- `s[bool]` - Whether the workspace is special or not
- `n[bool]`, `n[s:string]`, `n[e:string]` - named actions. `n[bool]` ->
  whether a workspace is a named workspace, `s` and `e` are starts and ends
  with respectively
- `m[monitor]` - Monitor selector
- `w[(flags)A-B]`, `w[(flags)X]` - Prop for window counts on the workspace.
  A-B is an inclusive range, X is a specific number. Flags can be omitted.
  It can be `t` for tiled-only, `f` for floating-only, `g` to count groups
  instead of windows, `v` to count only visible windows, and `p` to count 
  only pinned windows.
- `f[-1]`, `f[0]`, `f[1]`, `f[2]` - fullscreen state of the workspace. `-1`: no
  fullscreen, `0`: fullscreen, `1`: maximized, `2`, fullscreen without
  fullscreen state sent to the window.

### Syntax

```ini
workspace = WORKSPACE, RULES
```

- WORKSPACE is a valid workspace identifier (see
  [Dispatchers->Workspaces](../Dispatchers#workspaces)). This field is
  mandatory. This _can be_ a workspace selector, but please note
  workspace selectors can only match _existing_ workspaces.
- RULES is one (or more) rule(s) as described here in [rules](#rules).

### Examples

```ini
workspace = name:myworkspace, gapsin:0, gapsout:0
workspace = 3, rounding:false, bordersize:0
workspace = w[tg1-4], shadow:false
```

#### Smart gaps

To replicate "smart gaps" / "no gaps when only" from other WMs/Compositors, use this bad boy:

```ini
workspace = w[tv1], gapsout:0, gapsin:0
workspace = f[1], gapsout:0, gapsin:0
windowrule = border_size 0, match:float 0, match:workspace w[tv1]
windowrule = rounding 0, match:float 0, match:workspace w[tv1]
windowrule = border_size 0, match:float 0, match:workspace f[1]
windowrule = rounding 0, match:float 0, match:workspace f[1]
```

#### Smart gaps (ignoring special workspaces)

You can combine workspace selectors for more fine-grained control, for example, to ignore special workspaces:

```ini
workspace = w[tv1]s[false], gapsout:0, gapsin:0
workspace = f[1]s[false], gapsout:0, gapsin:0
windowrule = border_size 0, match:float 0, match:workspace w[tv1]s[false]
windowrule = rounding 0, match:float 0, match:workspace w[tv1]s[false]
windowrule = border_size 0, match:float 0, match:workspace f[1]s[false]
windowrule = rounding 0, match:float 0, match:workspace f[1]s[false]
```

## Rules

| Rule | Description | type |
| --- | --- | --- |
| monitor:[m] | Binds a workspace to a monitor. See [syntax](#syntax) and [Monitors](../Monitors). | string |
| default:[b] | Whether this workspace should be the default workspace for the given monitor | bool |
| gapsin:[x] | Set the gaps between windows (equivalent to [General->gaps_in](../Variables#general)) | int |
| gapsout:[x] | Set the gaps between windows and monitor edges (equivalent to [General->gaps_out](../Variables#general)) | int |
| bordersize:[x] | Set the border size around windows (equivalent to [General->border_size](../Variables#general)) | int |
| border:[b] | Whether to draw borders or not | bool |
| shadow:[b] | Whether to draw shadows or not | bool |
| rounding:[b] | Whether to draw rounded windows or not | bool |
| decorate:[b] | Whether to draw window decorations or not | bool |
| persistent:[b] | Keep this workspace alive even if empty and inactive | bool |
| on-created-empty:[c] | A command to be executed once a workspace is created empty (i.e. not created by moving a window to it). See the [command syntax](../Dispatchers#executing-with-rules) | string |
| defaultName:[s] | A default name for the workspace. | string |

### Example Rules

```ini
workspace = 3, rounding:false, decorate:false
workspace = name:coding, rounding:false, decorate:false, gapsin:0, gapsout:0, border:false, monitor:DP-1
workspace = 8,bordersize:8
workspace = name:Hello, monitor:DP-1, default:true
workspace = name:gaming, monitor:desc:Chimei Innolux Corporation 0x150C, default:true
workspace = 5, on-created-empty:[float] firefox
workspace = special:scratchpad, on-created-empty:foot
```
