# HL.Workspace

#### *class* HL.Workspace

Runtime object.

## Attributes

#### HL.Workspace.active

* **Type:**
  boolean

Active.

#### HL.Workspace.config_name

* **Type:**
  string

Config name.

#### HL.Workspace.fullscreen_mode

* **Type:**
  integer

Fullscreen mode.

#### HL.Workspace.fullscreen_window

* **Type:**
  [`HL.Window`](../HL.Window#hlwindow) | nil

Fullscreen window.

#### HL.Workspace.groups

* **Type:**
  integer | nil

Groups.

#### HL.Workspace.has_fullscreen

* **Type:**
  boolean

Has fullscreen.

#### HL.Workspace.has_urgent

* **Type:**
  boolean

Has urgent.

#### HL.Workspace.id

* **Type:**
  integer

Id.

#### HL.Workspace.is_empty

* **Type:**
  boolean

Is empty.

#### HL.Workspace.is_persistent

* **Type:**
  boolean

Is persistent.

#### HL.Workspace.last_window

* **Type:**
  [`HL.Window`](../HL.Window#hlwindow) | nil

Last window.

#### HL.Workspace.monitor

* **Type:**
  [`HL.Monitor`](../HL.Monitor#hlmonitor) | nil

Monitor.

#### HL.Workspace.name

* **Type:**
  string

Name.

#### HL.Workspace.special

* **Type:**
  boolean

Special.

#### HL.Workspace.tiled_layout

* **Type:**
  string

Tiled layout.

#### HL.Workspace.visible

* **Type:**
  boolean

Visible.

#### HL.Workspace.windows

* **Type:**
  integer

Windows.

## Methods

#### HL.Workspace.get_groups(...)

Get groups.

<!-- TODO: Document method parameters. -->
* **Returns:**
  any

#### HL.Workspace.get_windows(...)

Get windows.

<!-- TODO: Document method parameters. -->
* **Returns:**
  any

## See also

<!-- TODO: Add related functions and types. -->

## Method notes

[`HL.Workspace.get_windows()`](#HL.Workspace.get_windows)

> Return windows on this workspace.

[`HL.Workspace.get_groups()`](#HL.Workspace.get_groups)

> Return groups on this workspace.
<!-- TODO: Confirm exact return shapes from LuaWorkspace.cpp. -->
