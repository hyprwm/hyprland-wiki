---
weight: 3
title: Event list
---

These are all the events that can be listened to using Event Hooks.

## Complete list

{{< callout type=info >}}

`M:` means `std::unordered_map<std::string, std::any>` following props are members.

{{</ callout >}}

| name | description | argument(s) | cancellable |
| --- | --- | --- | --- |
| tick | fired on a tick, meaning once per (1000 / highestMonitorHz) ms | `nullptr` | ✕ |
| activeWindow | fired on active window change | `PHLWINDOW` | ✕ |
| keyboardFocus | fired on keyboard focus change. Contains the newly focused surface | `SP<CWLSurfaceResource>` | ✕ |
| moveWorkspace | fired when a workspace changes its monitor | `std::vector<std::any>{PHLWORKSPACE, PHLMONITOR}` | ✕ |
| focusedMon | fired on monitor focus change | PHLMONITOR | ✕ |
| moveWindow | fired when a window changes workspace | `std::vector<std::any>{PHLWINDOW, PHLWORKSPACE}` | ✕ |
| openLayer | fired when a LS is mapped | `PHLLS` | ✕ |
| closeLayer | fired when a LS is unmapped | `PHLLS` | ✕ |
| openWindow | fired when a window is mapped | `PHLWINDOW` | ✕ |
| closeWindow | fired when a window is unmapped | `PHLWINDOW` | ✕ |
| windowUpdateRules | fired when a window's rules are updated | `PHLWINDOW` | ✕ |
| urgent | fired when a window requests urgent | `PHLWINDOW` | ✕ |
| preMonitorAdded | fired when a monitor is plugged in, before Hyprland handles it | `PHLMONITOR` | ✕ |
| monitorAdded | fired when a monitor is plugged in, after Hyprland has handled it | `PHLMONITOR` | ✕ |
| preMonitorRemoved | fired when a monitor is unplugged, before Hyprland handles it | `PHLMONITOR` | ✕ |
| monitorRemoved | fired when a monitor is unplugged, after Hypralnd has handled it | `PHLMONITOR` | ✕ |
| createWorkspace | fired when a workspace is created | `PHLWORKSPACE` | ✕ |
| destroyWorkspace | fired when a workspace is destroyed | `PHLWORKSPACE` | ✕ |
| fullscreen | fired when a window changes fullscreen state | `PHLWINDOW` | ✕ |
| changeFloatingMode | fired when a window changes float state | `PHLWINDOW` | ✕ |
| workspace | fired on a workspace change (only ones explicitly requested by a user) | `PHLWORKSPACE` | ✕ |
| submap | fired on a submap change | `std::string` | ✕ |
| mouseMove | fired when the cursor moves. Param is coords. | `const Vector2D` | ✔ |
| mouseButton | fired on a mouse button press | `IPointer::SButtonEvent` | ✔ |
| mouseAxis | fired on a mouse axis event | M: `event`:`IPointer::SAxisEvent` | ✔ |
| touchDown | fired on a touch down event | `ITouch::SDownEvent` | ✔ |
| touchUp | fired on a touch up event | `ITouch::SUpEvent` | ✔ |
| touchMove | fired on a touch motion event | `ITouch::SMotionEvent` | ✔ |
| activeLayout | fired on a keyboard layout change. String pointer temporary, not guaranteed after execution of the handler finishes. | `std::vector<std::any>{SP<IKeyboard>, std::string}` | ✕ |
| preRender | fired before a frame for a monitor is about to be rendered | `PHLMONITOR` | ✕ |
| screencast | fired when the screencopy state of a client changes. Keep in mind there might be multiple separate clients. | `std::vector<uint64_t>{state, framesInHalfSecond, owner}` | ✕ |
| render | fired at various stages of rendering to allow your plugin to render stuff. See `src/SharedDefs.hpp` for a list with explanations | `eRenderStage` | ✕ |
| windowtitle | emitted when a window title changes. | `PHLWINDOW` | ✕ |
| configReloaded | emitted after the config is reloaded | `nullptr` | ✕ |
| preConfigReload | emitted before a config reload | `nullptr` | ✕ |
| keyPress | emitted on a key press | M: `event`:`IKeyboard::SButtonEvent`, `keyboard`:`SP<IKeyboard>` | ✔ |
| pin | emitted when a window is pinned or unpinned | `PHLWINDOW` | ✕ |
| swipeBegin | emitted when a touchpad swipe is commenced | `IPointer::SSwipeBeginEvent` | ✔ |
| swipeUpdate | emitted when a touchpad swipe is updated | `IPointer::SSwipeUpdateEvent` | ✔ |
| swipeEnd | emitted when a touchpad swipe is ended | `IPointer::SSwipeEndEvent` | ✔ |
