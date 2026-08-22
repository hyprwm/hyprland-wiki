---
weight: 30
title: Layer rules
---

## Syntax

```lua
hl.layer_rule({
    name? = str,
    match = {
        prop = some_prop_value,
    },
    effect = some_effect_value,
})
```

## Layer Rules

Some things in Wayland are not windows, but layers --- app launchers, status bars, wallpapers, etc.
These have separate rules using `hl.layer_rule()`.
The syntax is the same as `hl.window_rule()`.

### Props

| Prop | Description | Type |
| --- | --- | --- |
| namespace | Namespace of the layer. Check `hyprctl layers` | [RegEx] |

### Effects

| Effect | Description | Type | Limits |
| ---- | --- | --- | --- |
| above_lock | If non-zero, renders the layer above the lock screen. `2` = interactive on lock screen | int | |
| animation | Sets a specific animation style for this layer | str | |
| blur | Enables blur for the layer | bool | |
| blur_popups | Enables blur for popups | bool | |
| dim_around | Dims everything behind the layer | bool | |
| ignore_alpha | Makes blur ignore pixels with an opacity equal or lower to this | float | [0.0 - 1.0] |
| no_anim | Disables animations | bool | |
| no_screen_share | Hides the layer from screen sharing | bool | |
| order | Sets the space-reservation order relative to other layers. A higher order layer takes priority when trying to reserve space over other lower order layers. Can be negative | int | |
| xray | Sets the blur xray mode for the layer | bool | |

{{% details title="Examples" closed="true" %}}

```lua
-- Enable blur for Waybar
hl.layer_rule({ match = { namespace = "waybar" }, blur = true })

-- Named layer rule
local selectionRule = hl.layer_rule({
  name      = "no-anim-for-selection",
  match     = { namespace = "selection" },
  no_anim   = true,
})

-- Enable blur and ignore_alpha for Rofi
hl.layer_rule({
  match        = { namespace = "rofi" },
  blur         = true,
  ignore_alpha = 0.5,
})
```

{{% /details %}}

Layer rules also return a handle with `set_enabled()`/`is_enabled()`:

```lua
local myLayerRule = hl.layer_rule({
  name  = "my-layer-rule",
  match = { namespace = "waybar" },
  blur  = true,
})
myLayerRule:set_enabled(false)
```
