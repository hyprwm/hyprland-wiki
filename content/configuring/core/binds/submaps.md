---
weight: 40
title: Submaps
---

## Submaps

Keybind submaps allow you to activate a separate set of keybinds.

For example, if you want to enter a "resize mode" that allows you to resize windows with the arrow keys, you can do it like this:

```lua
-- Switch to a submap called `resize`.
hl.bind("ALT + R", hl.dsp.submap("resize"))

-- Start a submap called "resize".
hl.define_submap("resize", function()

    -- Set repeating binds for resizing the active window.
    hl.bind("right", hl.dsp.window.resize({ x = 10, y = 0, relative = true}), { repeating = true })
    hl.bind("left", hl.dsp.window.resize({ x = -10, y = 0, relative = true}), { repeating = true })
    hl.bind("up", hl.dsp.window.resize({ x = 0, y = 10, relative = true}), { repeating = true })
    hl.bind("down", hl.dsp.window.resize({ x = 0, y = -10, relative = true}), { repeating = true })

    -- Use `reset` to go back to the global submap
    hl.bind("escape", hl.dsp.submap("reset"))

end)

-- Keybinds further down will be global again...
```

> [!WARNING]
> Do not forget a keybind (`escape`, in this case) to reset the keymap while inside it!
>
> If you get stuck inside a keymap, you can use `hyprctl dispatch 'hl.dsp.submap("reset")'` to go back.
> If you do not have a terminal open, open a new TTY and use the `--instance` flag to select which instance of Hyprland to operate on (if you only have one running this is 0).
> For example: `hyprctl dispatch --instance 0 'hl.dsp.submap("reset")'`.

You can also set the same keybind to perform multiple actions, such as resize and close the submap, like so:

```lua
hl.bind("ALT + R", hl.dsp.submap("resize"))

hl.define_submap("resize", function()
    hl.bind("right", function()
        hl.dispatch(hl.dsp.window.resize({ x = 10, y = 0, relative = true }))
        hl.dispatch(hl.dsp.submap("reset"))
    end)
end)
```

This works because the binds are executed in the order they appear, and assigning multiple actions per bind is possible.

You can set a keybind that will be active no matter the current submap with the submap universal bind flag.

```lua
hl.bind(mainMod .. " + K", hl.dsp.exec_cmd("kitty"), { submap_universal = true })
```

### Nesting

Submaps can be nested, see the following example:

```lua
hl.bind(mainMod .. " + M", hl.dsp.submap("main_submap"))
hl.define_submap(main_submap, function()

    -- ...

    -- nested_one
    hl.bind("1", hl.dsp.submap("nested_one"))
    hl.define_submap("nested_one", function()

        -- ...

        hl.bind("SHIFT + escape", hl.dsp.submap("reset"))
        hl.bind("escape", hl.dsp.submap("main_submap"))

        -- nested_two
        hl.bind("2", hl.dsp.submap("nested_two"))
        hl.define_submap("nested_two", function()

                -- ...

            hl.bind("SHIFT + escape", hl.dsp.submap("reset"))
            hl.bind("escape", hl.dsp.submap("main_submap"))

        -- /nested_two
        end)
    -- /nested_one
    end)

    hl.bind("escape", hl.dsp.submap("reset"))
-- /main_submap
end)
```

### Automatically close a submap on dispatch

Submaps can be automatically closed or sent to another submap, by providing either a submap name or `"reset"` as the second argument to `hl.define_submap()`.

```lua
hl.bind("SUPER + a", hl.dsp.submap("submapA"))

-- Sets the submap to submapB after pressing a.
hl.define_submap("submapA", "submapB", function()
    hl.bind("a", hl.dsp.exec_cmd("someCoolThing.sh"))
end)

-- Reset submap to default after pressing a.
hl.dsp.submap("submapB", "reset", function()
    hl.bind("a", hl.dsp.exec_cmd("someOtherCoolThing.sh"))
end)
```

### Catch-All

You can also define a keybind via the special `catchall` keyword, which activates no matter which key is pressed.
This can be used to prevent any keys from passing to your active application while in a submap or to exit it immediately when any unknown key is pressed:

```lua
hl.bind("catchall", hl.dsp.submap("reset"))
```

### Disabling keybinds with one master keybind

If you want to disable all keybinds with another keybind (making a keybind toggle of sorts), you can just use a submap with only a keybind to exit it.

```lua
hl.bind(KEYS, hl.dsp.submap("clean"))
hl.define_submap("clean", function()
    hl.bind(KEYS, hl.dsp.submap("reset"))
end)
```
