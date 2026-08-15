---
title: Layer rules
weight: 30
---

## Layer Rules

Some things in Wayland are not windows, but layers - app launchers, status
bars, wallpapers, etc. These have separate rules using `hl.layer_rule()`.
The syntax is the same as `hl.window_rule()`.

### Props

| Field | Argument | Description |
| -------------- | --------------- | --- |
| namespace | \[RegEx\] | Namespace of the layer. Check `hyprctl layers`. |

### Effects

| Effect | Argument | Description |
| ---- | ----------- | --- |
| no_anim | boolean | Disables animations. |
| blur | boolean | Enables blur for the layer. |
| blur_popups | boolean | Enables blur for popups. |
| ignore_alpha | number | Makes blur ignore pixels with opacity of `a` or lower. Float from `0` to `1`. |
| dim_around | boolean | Dims everything behind the layer. |
| xray | boolean | Sets the blur xray mode for the layer. |
| animation | string | Sets a specific animation style for this layer. |
| order | integer | Sets the order relative to other layers. Higher `n` = closer to edge of monitor. Can be negative. |
| above_lock | integer | If non-zero, renders the layer above the lockscreen. `2` = interactive on lockscreen. |
| no_screen_share | boolean | Hides the layer from screen sharing. |

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

Layer rules also return a handle with `set_enabled()` / `is_enabled()`:

```lua
local myLayerRule = hl.layer_rule({
  name  = "my-layer-rule",
  match = { namespace = "waybar" },
  blur  = true,
})
myLayerRule:set_enabled(false)
```
