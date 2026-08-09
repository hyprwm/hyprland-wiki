---
title: Naming conventions
weight: 20
---

## Syntax

> [!INFO]
> For the ease of understanding, this wiki introduces a special syntax for some elements.

### Optional parameters

Text followed by a question mark (?) indicates that the parameter is optional and may be omitted.
If the question mark is followed by `= data_type`/`= value`, this means that the parameter can only take the specified data_type or defaults to a specified value.

{{% details title="Example" closed="true" %}}

`hl.dsp.window.float({ window?, action? })` means that `window` and `action` are not required. The dispatcher will use their default values instead: `activewindow` for window and `toggle` for action.

{{% /details %}}

### Value ranges

[value1 - value2] means a range of values from value1 to value2 with respect to the type. If one of the borders is not specified it is substituted with `...`.

{{% details title="Examples" closed="true" %}}

`[0.25 - 5.0]` means all floating numbers from 0.25 to 5.0 are allowed.  
`[0 - ...]` means all int values from 0 to your machine's int limit are allowed.

{{% /details %}}

### Coordinates

Coordinates are in inverse Y cartesian system, so from top-left corner of the monitor to the right is positive x (+x) and down is positive y (+y).

## Data types

| type | description |
| --- | --- |
| int | Integer number |
| float | Floating point number |
| bool | Boolean, `true` or `false` |
| string | Lua string. Symbols wrapped in `""`/`[[]]`/`''`, e.g: `"dwindle"`/`[[master]]`/`'scrolling'`. When using lua multiline string (`[[]]`) escaping of `"` and `'` is not needed |
| vec2 | Vector with 2 float values. { x, y }, e.g. `{ 20, 20 }` |
| css_gaps | An integer, or `{ top?, left?, right?, bottom? }` |
| color | Color. See hint below for color info |
| gradient | A gradient, will accept a color, or `{ colors = { color, color }, angle? = float }` structure |
| font_weight | An integer between 100 and 1000, or one of the following presets: `thin` (100) `ultralight` (200) `light` (300) `semilight` (350) `book` (380) `normal` (400) `medium` (500) `semibold` (600) `bold` (700) `ultrabold` (800) `heavy` (900) `ultraheavy` (1000) |

There are implicit conversions between certain types, however, this may lead to undefined behaviour later. Lsp with lua stub can be used to warn about the use of wrong types. More on that can be read [here](../configuring/core#autocompletions)

### Colors

You have 4 options:
- web-styled hash in RGBA: `"#fafc21"` or `"#ddd"` or `"#fa3d7bff"`
- rgba(): `"rgba(b3ff1aee)"`, or decimal equivalent `"rgba(179,255,26,0.933)"`
- rgb(): `"rgb(b3ff1a)"`, or the decimal equivalent  `"rgb(179,255,26)"`  
Note: Decimal rgba/rgb values should have no spaces between numbers.
- legacy in ARGB: `0xeeb3ff1a`

## Selectors

<!-- They are placed here because selectors may be used in multiple places and not only in rules -->

Any ID can be selected by using 2 selectors:  
Relative selection is done by using `+` or `-`.  
Absolute selection is done by using the ID itself.

### RegEx selector

Hyprland uses [Google's RE2](https://github.com/google/re2) for parsing RegEx. 
This means that all operations requiring polynomial time to
compute will not work. See the [RE2 wiki](https://github.com/google/re2/wiki/Syntax)
for supported extensions.  

To know more about the list of regex which can be used 
[use this cheatsheet](https://github.com/ziishaned/learn-regex/blob/master/README.md).

If you want to _negate_ a RegEx, as in pass only when the RegEx _fails_, you
can prefix it with `negative:`, e.g.: `"negative:kitty"`.

### Window selector

A window. Can be:
 - window object
 - exact selectors:
   - `pid:...`
   - `stableid:...`
   - `address:0x...`
 - regexes:
   - `class:...`
   - `initialclass:...`
   - `title:...`
   - `initialtitle:...`
   - `tag:...`
 - `activewindow`
 - `floating`
 - `tiled`

If no window is provided, the active window is used.

### Workspace selectors

> [!WARNING]
> Numerical workspaces (e.g. `1`, `2`, `13371337`) are allowed **ONLY** between 1
> and 2147483647 inclusive.  
> Neither `0` nor negative numbers are allowed.

Workspace can be selected by:

- Workspace object
- Workspace ID
- Workspace prop, see [below](#workspace-props)
- Workspace search, see [below](#workspace-search)

- Name: e.g. `name:Web`, `name:Anime` or `name:Better anime`
- Previous workspace: `previous`, or `previous_per_monitor`
- Special Workspace: `special` or `special:name` for named special workspaces.

#### Workspace props

<!-- TODO i think we should make a petition to rework this for lua -->

Workspaces that have already been created can be targeted by workspace
selectors, e.g. `r[2-4] w[t1]`.

Props separated by a space. No spaces are allowed inside props themselves.

- `r[A-B]` - ID range from A to B inclusive
- `s[bool]` - Whether the workspace is special or not
- `n[bool]`, `n[s:string]`, `n[e:string]` - named actions. `n[bool]` ->
  whether a workspace is a named workspace. `s` and `e` are 'starts with' and 'ends
  with', respectively
- `m[monitor]` - Monitor selector
- `w[(flags)A-B]`, `w[(flags)X]` - Prop for window counts on the workspace.
  A-B is an inclusive range, X is a specific number. Flags can be omitted.
  It can be `t` for tiled-only, `f` for floating-only, `g` to count groups
  instead of windows, `v` to count only visible windows, and `p` to count 
  only pinned windows.
- `f[-1]`, `f[0]`, `f[1]`, `f[2]` - fullscreen state of the workspace. `-1`: no
  fullscreen, `0`: fullscreen, `1`: maximized, `2`: fullscreen without
  sending fullscreen state to the window. Only matches workspaces with covering FS windows.

#### Workspace search

Workspace search is performed by suffixing search selector with workspace ID. To use absolute ID, `~` is put between selector and ID.

`m` - Search for workspace on current monitor  
`r` - Search for workspace on current monitor including empty workspaces  
`e` - Search for open workspace  
`empty` - Search for first empty workspace. Suffix with `m` to only search
on monitor, and/or `n` to make it the _next_ available empty workspace: `emptynm`  

### Direction

A direction.

`l` - left  
`r` - right  
`u` - up  
`d` - down  

### Monitor

Monitor can be selected by:
 - Monitor object
 - Monitor ID
 - [Output selector](../configuring/core/monitors/output-selection)
 - [Direction](#direction)
 - `current`
