# HL.DeviceSpec

#### *class* HL.DeviceSpec

Table accepted by [`hl.device()`](../../hl/device#hldevice).

## Shape

```text
{
    name = string,
    -- device-specific input options
}
```

## Fields

name
: Device name. Required. Spaces are converted to hyphens before storage.

## Additional fields

All other fields are input-device configuration keys. The available fields are
listed by the generated stub and include keyboard, pointer, touchpad, tablet,
touch, and virtual-keyboard options such as `kb_layout`, `sensitivity`,
`natural_scroll`, `tap_to_click`, `region_size`, `output`, and
`enabled`.

<!-- TODO: Expand this into grouped field sections using the DEVICE_FIELDS source table. -->

## Used by

[`hl.device()`](../../hl/device#hldevice)
: Configure a named input device.
