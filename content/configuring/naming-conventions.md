---
weight: 10
title: Naming conventions
---

## Syntax

> [!TIP]
> For ease of understanding, this wiki introduces a special syntax for some elements.

### Optional parameters

Text followed by a question mark (`?`) indicates that the parameter is optional and may be omitted.
If the question mark is followed by `= data_type`/`= value`, this means that the parameter can only take the specified data type or defaults to the specified value.

{{% details title="Example" closed="true" %}}

`hl.dsp.window.float({ window?, action? })` means that `window` and `action` are not required.
The dispatcher will use their default values instead: the currently active window, and an action of `"toggle"`.

{{% /details %}}

### Value ranges

`[value1 - value2]` means a range of values from `value1` to `value2` with respect to the type.
If one of the limits is not specified, it is substituted with `...`.

{{% details title="Examples" closed="true" %}}

`[0.25 - 5.0]` means all floating numbers from 0.25 to 5.0 are allowed.  
`[0 - ...]` means all int values from 0 to your machine's int limit are allowed.

{{% /details %}}

### Coordinates

Coordinates are in an inverse-Y Cartesian system, so moving to the right is the positive X direction (+x), and moving downward is the positive Y direction (+y).

## Data types

| type | description |
| --- | --- |
| int | Integer number |
| float | Floating point number |
| bool | Boolean, `true` or `false` |
| string | Lua string. Symbols wrapped in `""`/`[[]]`/`''` (e.g., `"dwindle"`, `'master'`, `[[scrolling]]`). When using Lua literal strings (`[[]]`), escaping of `"` and `'` is not needed |
| table | A Lua table, `{ }` |
| vec2 | Vector with 2 float values. `{x, y}` (e.g., `{20, 20}`) |
| css_gaps | An integer, or `{ top?, left?, right?, bottom? }` |
| color | Color. See hint below for color info |
| gradient | A gradient, will accept a color, or `{ colors = { color, color }, angle? = float }` structure |
| font_weight | An integer between 100 and 1000, or one of the following presets: `thin` (100) `ultralight` (200) `light` (300) `semilight` (350) `book` (380) `normal` (400) `medium` (500) `semibold` (600) `bold` (700) `ultrabold` (800) `heavy` (900) `ultraheavy` (1000) |

There are implicit conversions between certain types, however, this may lead to undefined behavior later.
LSP with Lua stub can be used to warn about the use of wrong types.
More on that can be read [here](../core#editor-autocompletion).

### Colors

<!-- NOTE: if " is not escaped, Hugo makes them curly, and it is ugly -->
You have 4 options:
- Web-styled hash in RGB or RGBA form: <code style="background-color:#FAFC21;color:#000000">"#FAFC32"</code> or <code style="background-color:#DDD;color:#000000">"#DDD"</code> or <code style="background-color:#FA3D7BFF;color:#000000">"#FA3D7BFF"</code>
- rgba(): <code style="background-color:#57BBFFEE;color:#000000">\"rgba(57BBFFEE)"</code>, or decimal equivalent <code style="background-color:#57BBFFEE;color:#000000">\"rgba(87,187,255,0.933)"</code>
- rgb(): <code style="background-color:#FF4410;color:#000000">\"rgb(FF4410)"</code>, or decimal equivalent <code style="background-color:#FF4410;color:#000000">\"rgb(255,68,16)"</code>
- Legacy ARGB format: <code style="background-color:#B3FF1A;color:#000000">\"0xeeb3ff1a"</code>

Note that decimal arguments in `rgb()`/`rgba()` should have no spaces between them.
