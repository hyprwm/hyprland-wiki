---
weight: 3
title: Event list
---

These are all the events that can be listened to using Event Hooks.

## Complete list

{{< callout type=info >}}

M: means std::unordered_map<std::string, std::any> following props are members.

{{</ callout >}}

| name | description | argument(s) | cancellable |
| --- | --- | --- | --- |
| tick | fired on a tick, meaning once per (1000 / highestMonitorHz) ms | nullptr | ✕ |
| activeWindow | fired on active window change | CWindow* | ✕ |
| keyboardFocus | fired on keyboard focus change. Contains the newly focused surface | wlr_surface* | ✕ |
| moveWorkspace | fired when a workspace changes its monitor | std::vector<std::any>{CWorkspace*, PHLWORKSPACE} | ✕ |
| focusedMon | fired on monitor focus change | CMonitor* | ✕ |
| moveWindow | fired when a window changes workspace | std::vector<std::any>{CWindow*, PHLWORKSPACE} | ✕ |
| openLayer | fired when a LS is mapped | CLayerSurface* | ✕ |
| closeLayer | fired when a LS is unmapped | CLayerSurface* | ✕ |
| openWindow | fired when a window is mapped | CWindow* | ✕ |
| closeWindow | fired when a window is unmapped | CWindow* | ✕ |
| urgent | fired when a window requests urgent | CWindow* | ✕ |
| minimize | fired when a window requests a minimize status change. Second param is 1 or 0 | std::vector<void*>{CWindow*, uint64_t} | ✕ |
| monitorAdded | fired when a monitor is plugged in | CMonitor* | ✕ |
| monitorRemoved | fired when a monitor is unplugged | CMonitor* | ✕ |
| createWorkspace | fired when a workspace is created | CWorkspace* | ✕ |
| destroyWorkspace | fired when a workspace is destroyed | CWorkspace* | ✕ |
| fullscreen | fired when a window changes fullscreen state | CWindow* | ✕ |
| changeFloatingMode | fired when a window changes float state | CWindow* | ✕ |
| workspace | fired on a workspace change (only ones explicitly requested by a user) | CWorkspace* | ✕ |
| submap | fired on a submap change | std::string | ✕ |
| mouseMove | fired when the cursor moves. Param is coords. | const Vector2D | ✔ |
| mouseButton | fired on a mouse button press | wlr_pointer_button_event* | ✔ |
| mouseAxis | fired on a mouse axis event | M: `event`:`wlr_pointer_axis_event*` | ✔ |
| touchDown | fired on a touch down event | wlr_touch_down_event* | ✔ |
| touchUp | fired on a touch up event | wlr_touch_up_event* | ✔ |
| touchMove | fired on a touch motion event | wlr_touch_motion_event* | ✔ |
| activeLayout | fired on a keyboard layout change. String pointer temporary, not guaranteed after execution of the handler finishes. | std::vector<void*>{SKeyboard*, std::string*} | ✕ |
| preRender | fired before a frame for a monitor is about to be rendered | CMonitor* | ✕ |
| screencast | fired when the screencopy state of a client changes. Keep in mind there might be multiple separate clients. | std::vector<uint64_t>{state, framesInHalfSecond, owner} | ✕ |
| render | fired at various stages of rendering to allow your plugin to render stuff. See `src/SharedDefs.hpp` for a list with explanations | eRenderStage | ✕ |
| windowtitle | emitted when a window title changes. | CWindow* | ✕ |
| configReloaded | emitted after the config is reloaded | nullptr | ✕ |
| preConfigReload | emitted before a config reload | nullptr | ✕ |
| keyPress | emitted on a key press | M: `event`:`wlr_keyboard_key_event*`, `keyboard`:`SKeyboard*` | ✔ |
| pin | emitted when a window is pinned or unpinned | CWindow* | ✕ |
