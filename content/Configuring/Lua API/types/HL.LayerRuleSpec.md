# HL.LayerRuleSpec

#### *class* HL.LayerRuleSpec

Table accepted by [`hl.layer_rule()`](../../hl/layer_rule#hllayer_rule).

## Shape

```text
{
    name = string?,
    enabled = boolean?,
    match = table<string, string | boolean>?,

    no_anim = boolean?,
    blur = boolean?,
    blur_popups = boolean?,
    ignore_alpha = number?,
    dim_around = boolean?,
    xray = boolean?,
    animation = string?,
    order = integer?,
    above_lock = integer?,
    no_screen_share = boolean?,
}
```

## Fields

name
: Rule name. Named rules are reused by later calls with the same name.

enabled
: Whether the rule is enabled. Defaults to `true`.

match
: Match table. Keys are rule match property names; values may be strings or
  booleans.

no_anim
: Disable animation for matched layers.

blur
: Enable blur for matched layers.

blur_popups
: Enable popup blur for matched layers.

ignore_alpha
: Alpha ignore threshold. Parsed as a float from `0` to `1`.

dim_around
: Dim around the layer.

xray
: Enable xray behavior.

animation
: Animation name.

order
: Layer rule ordering value.

above_lock
: Above-lock behavior. Parsed as an integer from `0` to `2`.

no_screen_share
: Prevent screen sharing.

## Additional fields

Unknown static fields are looked up in the dynamic layer effect registry.

<!-- TODO: Confirm public descriptions for each layer effect. -->

## Used by

[`hl.layer_rule()`](../../hl/layer_rule#hllayer_rule)
: Register a layer rule.
