# hl.config

#### hl.config(config)

Set Hyprland configuration values from a nested Lua table.

`hl.config` walks the table recursively. Nested keys are joined with
dots, so `{ general = { gaps_in = 5 } }` sets
`general.gaps_in`. If a full dotted key exists, it is treated as the
target config key; otherwise nested tables are traversed.

## Signature

```text
hl.config(config: table): nil
```

## Parameters

config
: Nested configuration table. Leaf fields must correspond to valid
  [`HL.ConfigKey`](../../types/HL.ConfigKey#hlconfigkey) entries.

## Returns

nil
: This function applies configuration and does not return a value.

## Examples

Set common options using nested tables:

```lua
hl.config({
    general = {
        gaps_in = 5,
        gaps_out = 12,
        border_size = 2,
        layout = "dwindle",
    },
    input = {
        kb_layout = "us",
        repeat_rate = 35,
        repeat_delay = 250,
    },
})
```

Set a deeply nested value:

```lua
hl.config({
    decoration = {
        blur = {
            enabled = true,
            size = 8,
            passes = 2,
        },
    },
})
```

Use a dotted key directly:

```lua
hl.config({
    ["general.gaps_in"] = 5,
    ["decoration.blur.enabled"] = true,
})
```

## Notes

Unknown keys are reported as configuration errors. During dynamic parsing,
changing a value can schedule the appropriate Hyprland refresh.

<!-- TODO: Add a short section explaining exact value coercion for config value
types once the individual LuaConfig* parsers are documented. -->

## See also

[`HL.ConfigKey`](../../types/HL.ConfigKey#hlconfigkey)
: Known configuration key names.

[`HL.ConfigValueTypes`](../../types/HL.ConfigValueTypes#hlconfigvaluetypes)
: Type mapping for known configuration values.

[`hl.get_config()`](../get_config#hlget_config)
: Read a configuration value by key.
