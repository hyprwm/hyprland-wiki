---
weight: 40
title: Lua code snippets
---

## Code snippets

Code snippets provided on this page may be useful for stealing 
some functions or getting inspiration.

<!-- TODO scrap discord/forums for helper functions that may or may not be useful -->

### Per-layout binds

```lua
local function layout_bind(bind_table)
    return function ()
        local workspace = hl.get_active_special_workspace() or
                          hl.get_active_workspace()

        if not workspace then
            return
        end

        local layout = workspace.tiled_layout

        if bind_table[layout] then
            hl.dispatch(bind_table[layout])
        end
    end
end
```

Usage:

```lua
hl.bind("SUPER + A", layout_bind({
    scrolling = hl.dsp.layout("swapcol l"),  -- Scrolling: swap column with left one
    dwindle   = hl.dsp.layout("swapsplit"),  -- Dwindle: swap window split
    monocle   = hl.dsp.layout("cycleprev"),  -- Monocle and master: cycle prev window
    master    = hl.dsp.layout("cycleprev"),
}))

hl.bind("SUPER + D", layout_bind({
    scrolling = hl.dsp.layout("swapcol r"),   -- Scrolling: swap column with right one
    dwindle   = hl.dsp.layout("togglesplit"), -- Dwindle: toggle window split
    monocle   = hl.dsp.layout("cyclenext"),   -- Monocle and master: cycle next window
    master    = hl.dsp.layout("cyclenext"),
}))
```

### Minimize windows using special workspaces

This approach uses special workspaces to mimic the “minimize window” function, by using a single keybind to toggle the minimized state. Note that one keybind can only handle one window.

```lua
hl.bind("SUPER + X", function ()
    if hl.get_workspace("special:minimized") then
        hl.dispatch(hl.dsp.window.move({ workspace = hl.get_active_workspace(), window = "tag:minimized" }))
        hl.dispatch(hl.dsp.window.clear_tags({ window = "tag:minimized" }))
    else
        hl.dispatch(hl.dsp.window.tag({ tag = "minimized", window = hl.get_active_window() }))
        hl.dispatch(hl.dsp.window.move({ workspace = "special:minimized", follow = false }))
    end
end)
```

### Smart gaps

To replicate "smart gaps" / "no gaps when only" from other WMs/Compositors, use this bad boy:

```lua
hl.workspace_rule({ workspace = "w[tv1]", gaps_out = 0, gaps_in = 0 })
hl.workspace_rule({ workspace = "f[1]", gaps_out = 0, gaps_in = 0 })
hl.window_rule({ match = { float = false, workspace = "w[tv1]" }, border_size = 0 })
hl.window_rule({ match = { float = false, workspace = "w[tv1]" }, rounding = 0 })
hl.window_rule({ match = { float = false, workspace = "f[1]" }, border_size = 0 })
hl.window_rule({ match = { float = false, workspace = "f[1]" }, rounding = 0 })
```

#### Smart gaps (ignoring special workspaces)

You can combine workspace selectors for more fine-grained control, for example, to ignore special workspaces:

```lua
hl.workspace_rule({ workspace = "w[tv1]s[false]", gaps_out = 0, gaps_in = 0 })
hl.workspace_rule({ workspace = "f[1]s[false]", gaps_out = 0, gaps_in = 0 })
hl.window_rule({ match = { float = false, workspace = "w[tv1]s[false]" }, border_size = 0 })
hl.window_rule({ match = { float = false, workspace = "w[tv1]s[false]" }, rounding = 0 })
hl.window_rule({ match = { float = false, workspace = "f[1]s[false]" }, border_size = 0 })
hl.window_rule({ match = { float = false, workspace = "f[1]s[false]" }, rounding = 0 })
```

### Float browser's extension windows

All known browsers have the annoying "feature" of setting title to their own name when opening
extensions' windows. This function listens to opened windows and floats the matches:

```lua
hl.on("window.open", function(w)
    if w.class ~= "firefox" then return end
    if w.initial_title ~= "Mozilla Firefox" then return end

    local ff_windows = hl.get_windows({ class = "firefox" })
    if #ff_windows <= 1 then return end

    hl.dispatch(hl.dsp.window.float({ action = "set", window = w }))

    local sub
    sub = hl.on("window.title", function(tw)
        if tw.address ~= w.address then return end
        if tw.title == ""
            or tw.title == "Mozilla Firefox"
            or tw.title == "about:blank"
            or tw.title:match("^about:.*Mozilla Firefox$") then return end

        sub:remove()

        if tw.title:match("^Extension:") then
            hl.dispatch(hl.dsp.window.resize({ x = 800, y = 600, window = tw }))
            hl.dispatch(hl.dsp.window.center({ window = tw }))
            hl.dispatch(hl.dsp.focus({ window = tw }))
        else
            hl.dispatch(hl.dsp.window.float({ action = "unset", window = tw }))
        end
    end)
end)
```

### Config versioning

Some updates add breaking changes, which can be anticipated by looking at the Hyprland version.

You can make your configs conditional using `hl.version()`, e.g.:

```lua
if hl.version() == "0.55.2" then
    hl.config({
        general = {
            changed_property = "value"
        }
    })
else
    hl.notification.create({ 
        text = "You're using: ".. hl.version(), 
        timeout = 10000
    })
end
```

### "Starts with" helper function

```lua
local function starts_with(string, prefix)
    return string:find(prefix, 1, true) == 1
end
```

### Toggle animations/blur/etc hotkey

For less distractions at a keypress, or battery saving on a laptop

Add the following to your Hyprland config:

```lua
hl.bind("SUPER + F1", function ()
    local game_mode = (hl.get_config("animations.enabled") == false)

    if game_mode then
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
end)
```

Edit to your liking of course. If animations are enabled, it disables all the pretty stuff. Otherwise, the script reloads your config to grab your defaults.

### Per workspace layouts

You can use workspace rules to set per-workspace layouts:

```lua
hl.workspace_rule({ workspace = "2", layout = "scrolling" })
hl.workspace_rule({ workspace = "3", layout = "dwindle" })
```

### Cycle layout for current workspace

To change layout for current workspace, you can use this bind:

```lua
hl.bind("SUPER + tab", function ()
    local layouts     = { "scrolling", "dwindle", "master", "monocle" }
    local workspace   = hl.get_active_workspace()
    if hl.get_active_special_workspace() then
        workspace = hl.get_active_special_workspace()
    end

    local next_layout = "dwindle"

    if not workspace then
        return
    end

    for i = 1, #layouts do
        if layouts[i] == workspace.tiled_layout then
            local next_layout_idx = (i % #layouts) + 1
            next_layout = layouts[next_layout_idx]
            break
        end
    end

    if workspace.special then
    hl.workspace_rule({ workspace = tostring(workspace.name), layout = next_layout })
    else
        hl.workspace_rule({ workspace = tostring(workspace.id), layout = next_layout })
    end
end)
```

### Glass magnifier zoom

Bind to use cursor zoom like a glass magnifier

```lua
local MAX_ZOOM = 3
local MIN_ZOOM = 1
local ZOOM_TOGGLE_FACTOR = 1.5

---@param offset number
---@return nil
local function zoom(offset)
    local current = hl.get_config("cursor.zoom_factor")
    if offset ~= nil then
        current = current + offset
    elseif current ~= MIN_ZOOM then
        current = MIN_ZOOM
    else
        current = ZOOM_TOGGLE_FACTOR
    end
    current = math.max(MIN_ZOOM, math.min(MAX_ZOOM, current))
    hl.config({ cursor = { zoom_factor = current } })
end

hl.bind("SUPER + Z", zoom)
hl.bind("SUPER + KP_ADD", function()
    zoom(0.5)
end)
hl.bind("SUPER + minus", function()
    zoom(-0.5)
end)

```

## Vim-like keymaps

Hyprland has so many features that you might run out of keys on your keyboard if you want to bind them all. Rest assured, you can utilize submaps to create keymaps if you want more, and they're also easier to press.

Here's an example of managing window groups this way:

```lua
hl.bind("SUPER + G", hl.dsp.submap("group_management"), { desc = "Enter a group management submap" })

local map = function(key, action, desc)
    hl.bind(key, function()
        hl.dispatch(action)
        hl.dispatch(hl.dsp.submap("reset"))
    end, { desc = desc })
end

hl.define_submap("group_management", function()
    map("g", hl.dsp.group.toggle(), "Toggle window group")

    map("h", hl.dsp.window.move({ into_group = "l" }), "Move window into a group on the left")
    map("j", hl.dsp.window.move({ into_group = "d" }), "Move window into a group on the bottom")
    map("k", hl.dsp.window.move({ into_group = "u" }), "Move window into a group on the top")
    map("l", hl.dsp.window.move({ into_group = "r" }), "Move window into a group on the right")

    map("e", hl.dsp.window.move({ out_of_group = true }), "Move window out of group")

    map("n", hl.dsp.group.next(), "Next window in group")
    map("p", hl.dsp.group.prev(), "Previous window in group")

    map("f", hl.dsp.group.move_window(), "Move window forward in the group order")
    map("b", hl.dsp.group.move_window({ forward = false }), "Move window backward in the group order")

    map("t", hl.dsp.group.lock_active(), "Toggle group lock")

    for i = 1, 10 do
        map(tostring(i % 10), hl.dsp.group.active({ index = i }), "Focus window " .. i .. " in a group")
    end

    hl.bind("escape", hl.dsp.submap("reset"), { desc = "Quit submap" })
end)
```
