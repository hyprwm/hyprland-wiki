---
weight: 50
title: Binds
---

> [!WARNING]
> **Keybind handlers must not block.** Lua callbacks run on the compositor event loop.
> Avoid `io.popen`, network I/O, clipboard tools (`wl-paste`, `xclip`), sleeps, and other long-running work inside bind functions.
> Prefer `hl.dsp.exec_cmd(...)` for external commands so they run outside the bind callback.
> If you must probe the system from Lua, bound the wait (for example with `timeout`).
> A hung or slow call freezes input and the entire desktop until it returns.

> [!TIP]
> If you are unsure of what your key's name/keysym/keycode is, you can use [`wev`](https://github.com/jwrdegoede/wev) to find out.

## Basics

```lua
hl.bind("keys", dispatcher or function() , {bind_flags})
```

The dispatcher list can be found in [Dispatchers](../dispatchers).

{{% details title="Examples" closed="true" %}}

```lua
-- bind SUPER + SHIFT + Q to open Firefox
hl.bind("SUPER + SHIFT + Q", hl.dsp.exec_cmd("firefox"))

-- bind to activate annonymous function with logic inside
hl.bind("SUPER + SHIFT + X", function()
    -- more logic...
    hl.dispatch(hl.dsp.window.float())
end)
```

{{% /details %}}

## Uncommon syms / binding with a keycode

See the [xkbcommon-keysyms.h header](https://github.com/xkbcommon/libxkbcommon/blob/master/include/xkbcommon/xkbcommon-keysyms.h) for all the keysyms.
The name you should use is the segment after `XKB_KEY_`.

To bind a keycode, use `code:` prefix before the key.

```lua
hl.bind("SUPER + code:28", hl.dsp.exec_cmd("amongus"))
```

This will bind SUPER + t since t is keycode 28.

## Binding modkeys only

<!-- NOTE: https://github.com/hyprwm/Hyprland/pull/15568 -->

To bind a modkey, use appropriate sym name.
Usually it is `MOD` key suffixed with `_L` or `_R`.
When keysym is used, order in which keys are pressed does matter because they are not treated as modifiers anymore.

{{% details title="Examples" closed="true" %}}

```lua
-- bind `amongus` to left alt
hl.bind("Alt_L", hl.dsp.exec_cmd("amongus"))

-- bind left super with left ctrl to open kitty
hl.bind("Super_L + Alt_L", hl.dsp.exec_cmd("kitty"))

-- bind left ctrl and right ctrl
hl.bind("Ctrl_L + Ctrl_R", hl.dsp.exec_cmd("kitty"))
```

{{% /details %}}

## Multiple binds to one key

> [!WARNING]
> The keybinds will be executed top to bottom, in the order they were written in.

You can trigger multiple actions with the same keybind by using a Lua lambda function, with different `disapatcher`s and `param`s:

```lua
-- To switch between windows in a floating workspace:
hl.bind("SUPER + Tab", function()
    -- Change focus to another window
    hl.dispatch(hl.dsp.window.cycle_next())
    -- Bring it to the top
    hl.dispatch(hl.dsp.window.bring_to_top())
end)
```

## Unbind

To unbind a key use `hl.unbind("key")` or assign it to a variable and use `:unbind()` or `:remove()` methods.
The key in `hl.unbind` is case-sensitive and must exactly match the case of the `hl.bind` you are unbinding.
Unbind will remove all occurances of the key that were registered before it.

{{% details title="Examples" closed="true" %}}

```lua
hl.bind("SUPER + TAB", hl.focus.workspace("e+1"))
hl.unbind("SUPER + Tab") -- this will NOT unbind
hl.unbind("SUPER + TAB") -- this will unbind

-- assign bind to "lft"
local lft = hl.bind("SUPER + L", hl.dsp.window.move({ direction = "left" }) )

-- unbind "SUPER + L"
lft:unbind()
-- or
lft:remove()
```

{{% /details %}}

## XKB options

<!-- NOTE: maybe there is a better place for this thing, but i couldnt find it -->

To change the behavior of some keys, use `kb_options`.

To view all available options, run:

```sh
cat /usr/share/X11/xkb/rules/base.lst
```

{{% details title="Examples" closed="true" %}}

To remap Caps Lock to Ctrl:

```lua
hl.config({
    input = {
        kb_options = "ctrl:nocaps"
    }
})
```

To swap Caps Lock and Escape:

```lua
hl.config({
    input =  {
        kb_options = "caps:swapescape"
    }
})
```

{{% /details %}}

## Binding quirks

<!-- NOTE: maybe there is a better place for this thing, but i couldnt find it -->

### Conditional binds resolution at "bind" time

When trying to create a bind with condition inside you almost always want to warp it in a function.

For example, this bind:

```lua
hl.bind("SUPER + L", hl.dsp.exec_cmd("foot", {float = not (hl.get_active_window().title == "foot") }) )
```

will be resolved to:

```lua
hl.bind("SUPER + L", hl.dsp.exec_cmd("foot", { float = false }) )
-- or, depending on your focus when config was reloaded
hl.bind("SUPER + L", hl.dsp.exec_cmd("foot", { float = false }) )
```
And it will stay like that until next config reload. 
To change this behavior, dispatcher can be wrapped in a function:

```lua
hl.bind("SUPER + L", function()
    local is_foot = hl.get_active_window().title == "foot"
    hl.dispatch( hl.dsp.exec_cmd("foot", { float = not is_foot }) )
end)
```

Now the condition will be evaluated on each call of the bind.

### Autoconsuming bind and return \{ ok = false \}

After executing a dispatcher, it returns `ok` value that indicates whether dispatcher ran sucessfuly or not.
When `auto_consuming` flag is set, `hl.bind` checks that value to determine the behaviour.

{{% details title="Example" closed="true" %}}

```lua
hl.bind("p", function()
    local window = hl.get_active_window()
    if window and window.title == "some cool app" then
        hl.dispatch(hl.dsp.exec_cmd("another cool app"))
    else
        return { ok = false }
    end
end, {auto_consuming = true})
```

This bind will spawn `"another cool app"` if the active window's title is `"some cool app"`, otherwise it will pass `p` to the active window.

{{% /details %}}
