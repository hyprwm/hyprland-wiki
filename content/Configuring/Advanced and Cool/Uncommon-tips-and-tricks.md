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

## Per workspace layouts

You can use workspace rules to set per-workspace layouts:

```lua
hl.workspace_rule({ workspace = "2", layout = "scrolling" })
hl.workspace_rule({ workspace = "3", layout = "dwindle" })
```