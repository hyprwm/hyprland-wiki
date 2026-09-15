---
weight: 20
title: Selectors
---

<!-- They are placed here because selectors may be used in multiple places and not only in rules -->

Any Workspace Number can be selected by using either of the following two selectors:
- Relative selection via `+` or `-`
- Absolute selection via the Workspace Number itself

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

## Workspaces

> [!WARNING]
> Numerical workspaces (e.g., `1`, `2`, `13371337`) are allowed **ONLY** between 1 and 2147483647, inclusive.
> Neither `0` nor negative numbers are allowed.

Workspaces can be:

- Workspace object
- Workspace number
- [Workspace selectors](#workspace-selectors)
- [Workspace search](#workspace-filters)

- Name: E.g., `name:Web`, `name:Anime`, `name:Better anime`
- Previous workspace: `previous`, or `previous_per_monitor`
- Special Workspace: `special` or `special:name` for named special workspaces.

### Workspace filters

<!-- TODO: i think we should make a petition to rework this for Lua -->

Workspaces that have already been created can be targeted by workspace filters (e.g., `r[2-4] w[t1]`)

A filter is a sequence of filter expressions separated by spaces.
No spaces are allowed inside expressions themselves.

- `r[A-B]` - Number range from A to B inclusive
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


> [!NOTE]
> Filters can *only* target workspaces that already exist.
> Trying to apply rules (for example `persistent`) to nonexistent workspaces will fail.



#### Workspace selectors

A workspace selection is performed by suffixing a selector with a signed offset, `+n` or `-n`, for a match relative to the active workspace.
To use an absolute, 1-indexed workspace number instead, `~` is put between selector and workspace number (e.g., `m~3` is the third workspace on the current monitor).

| Selector | Description | Limits |
| --- | --- | --- |
| e | Look on all monitors | Wraps around if range exceeds amount of worksapces in the direction |
| m | Look on current monitor | Wraps around if range exceeds amount of worksapces in the direction |
| r | Look on current monitor, including empty/nonexistent workspaces | [1 - ...] |
| empty | Look for first empty workspace. Suffix with `m` to only look on current monitor, and/or `n` to find the _next_ available empty workspace (e.g., `emptynm`) | Wraps around if it lands past the last numerical workspace, 2147483647 |

> [!WARNING]
> For selectors that accept a workspace number, a sign or `~` is required.
> `m3` would be interpreted as a workspace name, not a selector, and would do nothing unless there were a workspace named "m3".

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