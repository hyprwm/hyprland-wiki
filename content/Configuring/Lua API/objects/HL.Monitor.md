# HL.Monitor

#### *class* HL.Monitor

Runtime object representing an active monitor.

`HL.Monitor` objects are returned by monitor query functions such as
[`hl.get_monitor()`](../../hl/get_monitor#hlget_monitor), [`hl.get_active_monitor()`](../../hl/get_active_monitor#hlget_active_monitor), and
[`hl.get_monitors()`](../../hl/get_monitors#hlget_monitors).

## Attributes

#### HL.Monitor.active_special_workspace

* **Type:**
  [`HL.Workspace`](../HL.Workspace#hlworkspace) or nil

Active special workspace on this monitor, if any.

#### HL.Monitor.active_workspace

* **Type:**
  [`HL.Workspace`](../HL.Workspace#hlworkspace) or nil

Active workspace on this monitor, if any.

#### HL.Monitor.description

* **Type:**
  string

Human-readable monitor description.

#### HL.Monitor.dpms_status

* **Type:**
  boolean

Whether DPMS is enabled for this monitor.

#### HL.Monitor.focused

* **Type:**
  boolean or nil

Whether this monitor is focused.

#### HL.Monitor.height

* **Type:**
  integer

Monitor height in pixels.

#### HL.Monitor.id

* **Type:**
  integer

Numeric monitor ID.

#### HL.Monitor.is_mirror

* **Type:**
  boolean

Whether this monitor is mirroring another output.

#### HL.Monitor.mirrors

* **Type:**
  [`HL.Monitor`](#HL.Monitor) or table

Monitor or monitors mirrored by this output.

#### HL.Monitor.name

* **Type:**
  string

Monitor output name.

#### HL.Monitor.position

* **Type:**
  integer or table

Monitor position.

#### HL.Monitor.refresh_rate

* **Type:**
  number

Monitor refresh rate.

#### HL.Monitor.scale

* **Type:**
  number

Monitor scale factor.

#### HL.Monitor.size

* **Type:**
  integer or table

Monitor size.

#### HL.Monitor.transform

* **Type:**
  integer

Monitor transform value.

#### HL.Monitor.vrr_active

* **Type:**
  boolean

Whether variable refresh rate is currently active.

#### HL.Monitor.width

* **Type:**
  integer

Monitor width in pixels.

#### HL.Monitor.x

* **Type:**
  integer

X position.

#### HL.Monitor.y

* **Type:**
  integer

Y position.

## Examples

Get the active monitor:

```lua
local monitor = hl.get_active_monitor()

if monitor then
    print(monitor.name)
    print(monitor.width, monitor.height)
end
```

Use a monitor object as a selector:

```lua
local monitor = hl.get_monitor("DP-1")

if monitor then
    local workspace = hl.get_active_workspace(monitor)
end
```

## See also

[`hl.get_monitor()`](../../hl/get_monitor#hlget_monitor)
: Get one monitor by selector.

[`hl.get_monitors()`](../../hl/get_monitors#hlget_monitors)
: Get all current monitor objects.

[`hl.get_active_monitor()`](../../hl/get_active_monitor#hlget_active_monitor)
: Get the currently active monitor.

[`HL.MonitorSelector`](../../types/HL.MonitorSelector#hlmonitorselector)
: Selector type accepted by monitor query functions.

[`HL.MonitorSpec`](../../types/HL.MonitorSpec#hlmonitorspec)
: Input table used to configure monitors with [`hl.monitor()`](../../hl/monitor#hlmonitor).
