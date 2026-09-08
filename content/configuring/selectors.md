---
weight: 20
title: Selectors
---

<!-- They are placed here because selectors may be used in multiple places and not only in rules -->

Any ID can be selected by using either of the following two selectors:
- Relative selection via `+` or `-`
- Absolute selection via the ID itself

## RegEx selector

Hyprland uses [Google's RE2](https://github.com/google/re2) for parsing RegEx.
This means that all operations requiring polynomial time to compute will not work.
See the [RE2 wiki](https://github.com/google/re2/wiki/Syntax) for supported extensions.

To learn more about supported regex constructs, [refer to this cheatsheet](https://github.com/ziishaned/learn-regex/blob/master/README.md).

If you want to _negate_ a RegEx, as in pass only when the RegEx _fails_, you can prefix it with `negative:` (e.g., `"negative:kitty"`)

> [!TIP]
> Lua's literal-string `[[]]` syntax may be helpful to avoid "backslash hell".
> For example, you might write `[[\b\w*apple\b]]` instead of `"\\b\\w*apple\\b"`.

## Window selector

Windows can be selected by:
- Window object
- Exact selectors:
  - `pid:...`
  - `stableid:...`
  - `address:0x...`
- Regexes:
  - `class:...`
  - `initialclass:...`
  - `title:...`
  - `initialtitle:...`
  - `tag:...`
- `activewindow`
- `floating`
- `tiled`

If no window is provided, the active window is used.

## Workspace selectors

> [!WARNING]
> Numerical workspaces (e.g., `1`, `2`, `13371337`) are allowed **ONLY** between 1 and 2147483647, inclusive.
> Neither `0` nor negative numbers are allowed.

Workspaces can be selected by:

- Workspace object
- Workspace ID
- [Workspace prop](#workspace-props)
- [Workspace search](#workspace-search)

- Name: E.g., `name:Web`, `name:Anime`, `name:Better anime`
- Previous workspace: `previous`, or `previous_per_monitor`
- Special Workspace: `special` or `special:name` for named special workspaces.

### Workspace props

<!-- TODO: i think we should make a petition to rework this for Lua -->

Workspaces that have already been created can be targeted by workspace selectors (e.g., `r[2-4] w[t1]`)

Props separated by a space.
No spaces are allowed inside props themselves.

- `r[A-B]` - ID range from A to B inclusive
- `s[bool]` - Whether the workspace is special or not
- `n[bool]`, `n[s:string]`, `n[e:string]` - named actions.
  `n[bool]` - whether a workspace is a named workspace.
  `s` and `e` are 'starts with' and 'ends with', respectively.
- `m[monitor]` - Monitor selector
- `w[(flags)A-B]`, `w[(flags)X]` - Prop for window counts on the workspace.
  `A-B` is an inclusive range; `X` is a specific number.
  Flags can be omitted.
  Available flags are:
  - `t` for tiled-only
  - `f` for floating-only
  - `g` to count groups instead of windows
  - `v` to count only visible windows
  - `p` to count only pinned windows
- `f[-1]`, `f[0]`, `f[1]`, `f[2]` - fullscreen state of the workspace.
  `-1`: no fullscreen,
  `0`: fullscreen,
  `1`: maximized,
  `2`: fullscreen without sending fullscreen state to the window.
  Only matches workspaces with covering fullscreen windows.

### Workspace search

> [!WARNING]
> For `m`, `r`, and `e`, the sign is not optional.
> `m3` is not a relative match: it falls through to a workspace *name* lookup, and does nothing unless a workspace is literally named `m3`.
> Write `m+3`, `m-3`, or `m~3`.

Workspace search is performed by suffixing a search selector with a signed offset, `+n` or `-n`, for a match relative to the active workspace.
To use an absolute, 1-indexed ID instead, `~` is put between selector and ID (e.g., `m~3` is the third workspace on the current monitor).

- `m` - Search for workspace on current monitor
- `r` - Search for workspace on current monitor including empty/non-existant workspaces
- `e` - Search on all monitors
- `empty` - Search for first empty workspace. Suffix with `m` to only search on monitor, and/or `n` to make it the _next_ available empty workspace (e.g., `emptynm`)

`m` and `e` only traverse workspaces that already exist, and they wrap around at both ends of that list.
They can therefore never select an empty workspace that has not been created yet.
`r` walks workspace IDs instead, so it can select an empty workspace, and it clamps at 1 rather than wrapping.

Assuming workspaces 1 through 4 exist and 5 does not:

| Selector | Active workspace | Result |
| --- | --- | --- |
| `e+1` | 4 | 1, wrapping around; never 5 |
| `r+1` | 4 | 5, which is created |
| `e-1` | 1 | 4, wrapping around |
| `r-1` | 1 | 1, clamped |

## Direction

A direction.
- `l`/`left` - left
- `r`/`right` - right
- `u`/`up` - up
- `d`/`down` - down

## Monitor

Monitors can be selected by:
- Monitor object
- Monitor ID
- [Output selector](../core/monitors/output-selection)
- [Direction](#direction)
- `current`
