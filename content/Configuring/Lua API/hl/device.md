# hl.device

#### hl.device(spec)

Configure a named input device.

## Signature

```text
hl.device(spec: HL.DeviceSpec): nil
```

## Parameters

spec
: Device configuration table. `name` is required.

## Returns

nil
: This function stores device configuration and schedules an input-device refresh.

## Examples

```lua
hl.device({
    name = "logitech-usb-receiver",
    sensitivity = -0.2,
    natural_scroll = true,
})
```

## Notes

Spaces in `name` are converted to hyphens before the device configuration is
stored. Unknown fields are reported as configuration errors.

## See also

[`HL.DeviceSpec`](../../types/HL.DeviceSpec#hldevicespec)
: Accepted device configuration fields.
