---
weight: 15
title: Uncommon tips & tricks
---

## Remapping Caps Lock

You can customize the behavior of the Caps Lock key using kb_options.

To view all available options related to Caps Lock, run:

```sh
grep 'caps' /usr/share/X11/xkb/rules/base.lst
```

For example, to remap Caps lock to Ctrl:

```lua
hl.config({
    input = {
        kb_options = "ctrl:nocaps",
    },
})
```

You can find additional `kb_options` unrelated to Caps Lock in `/usr/share/X11/xkb/rules/base.lst`.


## Minimize windows using special workspaces

This approach uses special workspaces to mimic the “minimize window” function, by using a single keybind to toggle the minimized state. Note that one keybind can only handle one window.

```lua
hl.bind("SUPER + X", function ()
    hl.dispatch(hl.dsp.workspace.toggle_special("minimize"))
    hl.dispatch(hl.dsp.window.move({workspace = "+0"}))
    hl.dispatch(hl.dsp.workspace.toggle_special("minimize"))
    hl.dispatch(hl.dsp.window.move({workspace = "special:minimize"}))
    hl.dispatch(hl.dsp.workspace.toggle_special("minimize"))
end)
```

## Toggle animations/blur/etc hotkey 

For increased performance in games, or for less distractions at a keypress

Add the following to your hypland config:

```lua
hl.bind("SUPER + F1", function ()
    local game_mode = (hl.get_config("animations.enabled") == false)

    if game_mode then
        hl.notification.create({ text = "Gamemode [OFF]", color = "rgb(d20f39)", timeout = 5000, })
        hl.exec_cmd("hyprctl reload")
        return
    end
    
    hl.config({
        general = {
            gaps_in = 0, gaps_out = 0, -- Disable gaps  
            border_size = 0,
        },

        animations = {
            enabled = false, -- Disable animations
        },
        
        -- Disable blur, shadow and window rounding
        decoration = {
            shadow = { enabled = false },
            blur = { enabled = false },
            rounding = 0,
        }
    })

    hl.notification.create({ text = "Gamemode [ON]", color = "rgb(40a02b)", timeout = 5000, })
end)
```

Edit to your liking of course. If animations are enabled, it disables all the pretty stuff. Otherwise, the script reloads your config to grab your defaults.

## Per workspace layouts

You can use workspace rules to set per-workspace layouts:

```lua
hl.workspace_rule({ workspace = "2", layout = "scrolling" })
hl.workspace_rule({ workspace = "3", layout = "dwindle" })
```

## Config versioning

Some updates add breaking changes, which can be anticipated by looking at the hyprland version.

You can use `hl.version()` to get it:

```lua
hl.version() -- Returns a string
```

You can make your configs conditional, e.g.:

```lua
if hl.version() == "0.55.2" then
    hl.config({
        general = {
            changed_property = "value"
        }
    })
else
    hl.notification.create({ 
        text = "Youre using: ".. hl.version(), 
        timeout = 10000
    })
end
```