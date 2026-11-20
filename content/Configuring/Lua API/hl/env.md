# hl.env

#### hl.env(name: string, value: string, dbus?: boolean)

Set an environment variable, optionally importing it into the D-Bus activation environment.

## Signature

```text
hl.env(name: string, value: string, dbus?: boolean): nil
```

## Parameters

name
: Environment variable name. Must not be empty.

value
: Environment variable value.

dbus
: If true, also run `dbus-update-activation-environment --systemd` for this variable.

## Returns

nil
: This function mutates the environment and does not return a value.

## Examples

```lua
hl.env("XCURSOR_SIZE", "24")
hl.env("QT_QPA_PLATFORM", "wayland", true)
```

## Notes

On first launch, the D-Bus import command is queued as an exec-once command. Later dynamic parses spawn the command immediately when `dbus` is true.
