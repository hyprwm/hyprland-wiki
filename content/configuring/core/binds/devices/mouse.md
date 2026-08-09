---
weight: 10
title: Mouse
---

> [!NOTE]
> Mouse binds, despite their name, behave like normal binds.  
> You are free to use whatever keys / mods you please.  
> When held, the mouse function will be activated.

## Mouse buttons

You can bind mouse buttons by prefixing a key with `mouse:`.
Common mouse button key codes (check `wev` for other buttons) are:


Left Mouse Button -> 272  
Right Mouse Button -> 273  
Middle Mouse Button -> 274  

```lua
-- Bind SUPER + LMB to launch kitty terminal.
hl.bind("SUPER + mouse:272", hl.dsp.exec_cmd("kitty"))
```

## Movement

Some dispatchers rely on mouse movement and need to have `mouse` flag set to `true`

<!-- TODO: unify with dispatchers page -->

| Name | Description |
| ---- | ----------- |
| `window.drag()` | moves the active window |
| `window.resize()` | resizes the active window |
| `window.resize({ keep_aspect_ratio })` | resizes the active window, overriding the window’s keep_aspect_ratio prop temporarily |

`binds.drag_threshold` config option can be used to differentiate between clicks and drags with the same button:

```lua
hl.config({
        binds {
            -- Fire a drag event only after dragging for more than 10px
            drag_threshold = 10
        }
})

-- ALT + LMB: Move a window by dragging more than 10px.
hl.bind("ALT + mouse:272", hl.dsp.window.drag(), { mouse = true })
-- ALT + LMB (click): Floats a window by clicking
hl.bind("ALT + mouse:272", hl.dsp.window.float(), { mouse = true, click = true })
-- ALT + LMB: Resizes a window by dragging
hl.bind("ALT + mouse:273", hl.dsp.window.resize(), { mouse = true })
```



You can also bind mouse wheel events with `mouse_up` and `mouse_down` (or
`mouse_left` and `mouse_right` if your mouse supports horizontal scrolling):

```lua
hl.bind("SUPER + mouse_down", hl.dsp.focus({ workspace = "e-1" }))
```

> [!NOTE]
> You can control the reset time with `binds.scroll_event_delay` config pat.
