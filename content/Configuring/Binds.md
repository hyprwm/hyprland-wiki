---
weight: 5
title: Binds
---

## Basic

```lua
hl.bind(keys, dispatcher)
```

for example,

```lua
hl.bind("SUPER + SHIFT + Q", hl.dsp.exec_cmd("firefox"))
```

will bind opening Firefox to <key>SUPER</key> + <key>SHIFT</key> + <key>Q</key>

> [!NOTE]
> For binding keys without a modkey, leave it empty:
> 
> ```lua
> hl.bind("Print", hl.dsp.exec_cmd("grim"))
> ```

_For a complete mod list, see [Variables](../Variables/#variable-types)._

_The dispatcher list can be found in
[Dispatchers](../Dispatchers/#list-of-dispatchers)._

## Uncommon syms / binding with a keycode

See the
[xkbcommon-keysyms.h header](https://github.com/xkbcommon/libxkbcommon/blob/master/include/xkbcommon/xkbcommon-keysyms.h)
for all the keysyms. The name you should use is the segment after `XKB_KEY_`.

If you want to bind by a keycode, you can put it in the KEY position with
a `code:` prefix, e.g.:

```lua
hl.bind("SUPER + code:28", hl.dsp.exec_cmd("amongus"))
```

This will bind <key>SUPER</key> + <key>t</key> since <key>t</key> is keycode 28.

> [!NOTE]
> If you are unsure of what your key's name or keycode is, you can use [`wev`](https://github.com/jwrdegoede/wev) to find out.

## Misc

### Workspace bindings on non-QWERTY layouts

Keys used for keybinds need to be accessible without any modifiers in your layout.  
For instance, the [French AZERTY](https://en.wikipedia.org/wiki/AZERTY) layout uses <key>SHIFT</key> + _`unmodified key`_ to write `0-9` numbers. As such, the workspace keybinds for this layout need to use the names of the _`unmodified keys`_ , and will not work when using the `0-9` numbers.

> [!NOTE]
> To get the correct name for an `unmodified_key`, refer to [the section on uncommon syms](#uncommon-syms--binding-with-a-keycode)

```lua
-- On a French layout, instead of:
-- hl.bind(mainMod .. " + 1", hl.workspace(1))

-- Use
hl.bind(mainMod .. " + ampersand", hl.workspace(1))
```

For help configuring the French AZERTY layout, see this [article](https://rherault.dev/articles/hyprland-fr-layout).

### Unbind

You can also unbind a key with the `unbind` keyword, e.g.:

```lua
hl.unbind("SUPER + O")
```

This may be useful for dynamic keybindings with `hyprctl`, e.g.:

```bash
hyprctl eval hl.unbind("SUPER + O")
```

> [!NOTE]
> In `unbind`, key is case-sensitive It must exactly match the case of the `bind` you are unbinding.
> 
> ```lua
> hl.bind("SUPER + TAB", hl.focus.workspace("e+1"))
> hl.unbind("SUPER + Tab") -- this will NOT unbind
> hl.unbind("SUPER + TAB") -- this will unbind
> ```

## Bind flags

`hl.bind()` supports flags in this format:

```lua
hl.bind(keys, dispatcher, { flag1 = true, flag2 = true })

```

e.g.:

```lua
hl.bind(keys, hl.dsp.exec_cmd("amongus"), { release = true, locked = true })
```

Available flags:

| Flag | Description |
|------|-------------|
| `locked` | Will also work when an input inhibitor (e.g. a lockscreen) is active. |
| `release` | Will trigger on release of a key. |
| `click` | Will trigger on release of a key or button as long as the mouse cursor stays inside `binds:drag_threshold`. |
| `drag` | Will trigger on release of a key or button as long as the mouse cursor moves outside `binds:drag_threshold`. |
| `long_press` | Will trigger on long press of a key. |
| `repeating` | Will repeat when held. |
| `non_consuming` | Key/mouse events will be passed to the active window in addition to triggering the dispatcher. |
| `mouse`| See the dedicated [Mouse Binds](#mouse-binds) section. |
| `transparent` | Cannot be shadowed by other binds. |
| `ignore_mods` | Will ignore modifiers. |
| `separate` | Will arbitrarily combine keys between each mod/key, see [Keysym combos](#keysym-combos). |
| `description` or `desc` | Will allow you to write a description for your bind. |
| `bypass` | Bypasses the app's requests to inhibit keybinds. |
| `submap_universal` | Will be active no matter the submap. |
| `devices` | Allow binds to be set per device. See [Per-Device Binds](#per-device-binds) |

Example Usage:

```lua
-- Example volume button that allows press and hold, volume limited to 150%
hl.bind("XF86AudioRaiseVolume", hl.dsp.exec_cmd("wpctl set-volume -l 1.5 @DEFAULT_AUDIO_SINK@ 5%+"), { repeating = true })

-- Example volume button that will activate even while an input inhibitor is active
hl.bind("XF86AudioLowerVolume", hl.dsp.exec_cmd("wpctl set-volume @DEFAULT_AUDIO_SINK@ 5%-"), { locked = true } )

-- Open wofi on first press, closes it on second
hl.bind("SUPER + SUPER_L" hl.dsp.exec_cmd("pkill wofi || wofi"), { release = true })

-- Skip player on long press and only skip 5s on normal press
hl.bind("SUPER + XF86AudioNext", hl.dsp.exec_cmd("playerctl next"), { long_press = true })
hl.bind("SUPER + XF86AudioNext", hl.dsp.exec_cmd("playerctl position +5"))
```

### Mouse buttons

You can also bind or unbind mouse buttons by prefacing the mouse keycode with `mouse:`, e.g.:

```lua
hl.bind(SUPER + mouse:272), hl.exec("amongus"))  -- bind `exec amogus` to SUPER + LMB.
```

### Binding modkeys only

To only bind modkeys, you need to use the TARGET modmask (with the
activating mod) and the `r` flag, e.g.:

```lua
-- bind `exec amongus` to SUPER + ALT.
hl.bind("ALT + ALT_L" hl.dsp.exec_cmd("amongus"), { release = true })
```

### Mouse wheel

You can also bind mouse wheel events with `mouse_up` and `mouse_down` (or
`mouse_left` and `mouse_right` if your mouse supports horizontal scrolling):

```lua
hl.bind("SUPER + mouse_down", hl.focus.workspace("e-1"))
```

> [!NOTE]
> You can control the reset time with `hl.config.binds.scroll_event_delay`.

### Switches

Switches are useful for binding events like closing and opening a laptop's lid:

```lua
-- Trigger when the switch is toggled.
hl.bind("switch:[switch name]", hl.dsp.exec_cmd("swaylock"), { locked = true })
-- Trigger when the switch is turning on.
hl.bind("switch:on:[switch name]", hl.dsp.exec_cmd("hyprctl keyword monitor 'eDP-1, disable'"), { locked = true })
-- Trigger when the switch is turning off.
hl.bind("switch:off:[switch name]", hl.dsp.exec_cmd("hyprctl keyword monitor 'eDP-1, 2560x1600, 0x0, 1'"), { locked = true })
```

> [!WARNING]
> Systemd `HandleLidSwitch` settings in `logind.conf` may conflict with Hyprland's laptop lid switch configurations.

> [!NOTE]
> You can view your switches with `hyprctl devices`.

### Multiple binds to one key

You can trigger multiple actions with the same keybind by using a lua lambda function, with different `disapatcher`s and `param`s:

```lua
-- To switch between windows in a floating workspace:
hl.bind("SUPER + Tab", function()
    hl.cyclenext()         -- Change focus to another window
    hl.bringactivetotop()) -- Bring it to the top
end)
```

> [!WARNING]
> The keybinds will be executed top to bottom, in the order they were written in.

### Description

You can describe your keybind with the `description` flag.  
Your description always goes in the flags section.

```lua
hl.bind(keys, dispatcher, { description = "your description here"}
```

For example:

```lua
hl.bind("SUPER + Q", hl.dsp.exec_cmd("kitty"), { description = "Open my favourite terminal" }
```

If you want to access your description you can use `hyprctl binds`.  
For more information have a look at [Using Hyprctl](../Using-hyprctl).

### Per-Device Binds

You can set keybinds to be device specific with the `devices` flag.  
Devices are provided in a whitespace separated list that goes in front of `dispatcher`.  
An `!` can be prepended to the list to exclude the those devices, allowing all other devices to use that bind instead.

```lua
hl.bind(keys, dispatcher(params), { device = { inclusive = true, list = { "device1", "device1" } } })
```

```lua
-- Only example-keyboard-1 can use this bind
hl.bind("SUPER + Q", hl.dsp.exec_cmd("kitty"), { devices = { inclusive = true, list = { "example-keyboard-1" } } })

-- Every keyboard other than razer-keyboard and asus-keyboard can use this bind
hl.bind("SUPER + Q", hl.dsp.exec_cmd("kitty"), { devices = { inclusive = false, list = { "razer-keyboard", "asus-keyboard" } } })
```

You can check device names with `hyprctl devices`.

## Mouse Binds

These are binds that rely on mouse movement. They will have one less arg.  
`hl.config.binds.drag_threshold` can be used to differentiate between clicks and drags with the same button:

```lua
hl.config({
    binds {
        drag_threshold = 10  # Fire a drag event only after dragging for more than 10px
    }
}
hl.bind("ALT + mouse:272", hl.movewindow(), { mouse = true })      -- ALT + LMB: Move a window by dragging more than 10px.
hl.bind("ALT + mouse:272", hl.togglefloating(), { mouse = true })  -- ALT + LMB: Floats a window by clicking
```

Available mouse binds:

| Name | Description | Params |
| ---- | ----------- | ------ |
| movewindow | moves the active window | None |
| resizewindow | resizes the active window | `1` -> Resize and keep window aspect ratio. <br> `2` -> Resize and ignore `keepaspectratio` window rule/prop. <br> None or anything else for normal resize |

Common mouse button key codes (check `wev` for other buttons):

```txt
LMB -> 272
RMB -> 273
MMB -> 274
```

> [!NOTE]
> Mouse binds, despite their name, behave like normal binds.  
> You are free to use whatever keys / mods you please. When held, the mouse function will be
> activated.

### Touchpad

As clicking and moving the mouse on a touchpad is unergonomic, you can also use keyboard keys instead of mouse clicks.

```lua
hl.bind("SUPER + mouse:272", hl.movewindow(), { mouse = true })
hl.bind("SUPER + CTRL_L", hl.movewindow(), { mouse = true })

hl.bind("SUPER + mouse:273", hl.resizewindow(), { mouse = true })
hl.bind("SUPER + ALT_L, hl.resizewindow(), { mouse = true })
```

## Global Keybinds

### Classic

Yes, you heard this right, Hyprland does support global keybinds for _ALL_ apps,
including OBS, Discord, Firefox, etc.

See the [`pass`](../Dispatchers/#list-of-dispatchers) and
[`sendshortcut`](../Dispatchers/#list-of-dispatchers) dispatchers for keybinds.

Let's take OBS as an example: the "Start/Stop Recording" keybind is set to
<key>SUPER</key> + <key>F10</key>, to make it work globally, simply add:

```lua
hl.bind("SUPER + F10", hl.dsp.pass("class:^(com\.obsproject\.Studio)$"))
```

to your config and you're done.

`pass` will pass the `PRESS` and `RELEASE` events by itself, no need for a `bindr`.  
This also means that push-to-talk will work flawlessly with one `pass`, e.g.:

```lua
hl.bind("mouse:276", hl.dsp.pass("class:^(TeamSpeak 3)$"))    # Pass MOUSE5 to TeamSpeak3.
```

You may also add shortcuts, where other keys are passed to the window.

```lua
hl.bind("SUPER + F10", hl.dsp.send_shortcut("SUPER + F4", class:^(TeamSpeak 3)$"))    # Send SUPER + F4 to OBS when SUPER + F10 is pressedl.
```

> [!WARNING]
> This works flawlessly with all native Wayland applications, however, XWayland is a bit wonky.  
> Make sure that what you're passing is a "global Xorg keybind", otherwise passing from a different XWayland app may not work.

### DBus Global Shortcuts

Some applications may already support the GlobalShortcuts portal in
xdg-desktop-portal.  
If that's the case, it's recommended to use the following method instead of `pass`:

Open your desired app and run `hyprctl globalshortcuts` in a terminal.  
This will give you a list of currently registered shortcuts with their description(s).

Choose whichever you like, for example `coolApp:myToggle`, and bind it to
whatever you want with the `global` dispatcher:

```lua
hl.bind("SUPER + SHIFT + A", hl.dsp.global("coolApp:myToggle"))
```

> [!NOTE]
> Please note that this function will _only_ work with
> [XDPH](../../Hypr-Ecosystem/xdg-desktop-portal-hyprland).

## Submaps

Keybind submaps allow you to activate aseparate set of keybinds.  
For example, if you want to enter a `resize` _mode_ that allows you to resize windows with the arrow keys, you can do it like this:

```lua
-- Switch to a submap called `resize`.
hl.bind("ALT + R", hl.dsp.submap("resize")

-- Start a submap called "resize".
hl.dsp.submap("resize", function()

    -- Set repeating binds for resizing the active window.
    hl.bind("right", hl.resize({ x = 10, y = 0, relative = true}), { repeating = true })
    hl.bind("left", hl.resize({ x = -10, y = 0, relative = true}), { repeating = true })
    hl.bind("up", hl.resize({ x = 0, y = 10, relative = true}), { repeating = true })
    hl.bind("down", hl.resize({ x = 10, y = -10, relative = true}), { repeating = true })

    -- Use `reset` to go back to the global submap
    hl.bind("escape", hl.dsp.submap("reset"))

end)

-- Keybinds further down will be global again...
```

> [!WARNING]
> Do not forget a keybind (`escape`, in this case) to reset the keymap while inside it!
> 
> If you get stuck inside a keymap, you can use `hyprctl dispatch 'hl.dsp.submap("reset")'` to go back.  
> If you do not have a terminal open, open a new tty and use the --instance flag to select which instanceof hyprland to operate on (if you only have one running this is 0). For example: `hyprctl dispatch --instace 0 'hl.dsp.submap("reset")'`

You can also set the same keybind to perform multiple actions, such as resize
and close the submap, like so:

```lua
hl.bind("ALT + R", hl.dsp.submap("resize"))

hl.dsp.submap("resize", function()
    hl.bind("right", function()
        hl.window.resize({ x = 10, y = 0, relative = true })
        hl.dsp.submap("reset")
    end)
end)
```

This works because the binds are executed in the order they appear, and
assigning multiple actions per bind is possible.

You can set a keybind that will be active no matter the current submap with the submap universal bind flag.

```lua
hl.bind(mainMod .. " + K", hl.dsp.exec_cmd("kitty"), { submap_universal = true })
```

### Nesting

Submaps can be nested, see the following example:

```lua
hl.bind(mainMod .. " + M", hl.dsp.submap("main_submap"))
hl.dsp.submap(main_submap, function()

    -- ...

    -- nested_one
    hl.bind("1", hl.dsp.submap("nested_one")
    hl.dsp.submap("nested_one", function()

        -- ...

        hl.bind("SHIFT + escape", hl.dsp.submap("reset"))
        hl.bind("escape", hl.dsp.submap("main_submap"))

        -- nested_two
        hl.bind("2", hl.dsp.submap("nested_two"))
        hl.dsp.submap("nested_two", function()

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

Submaps can be automatically closed or sent to another submap by appending ``,`` followed by a submap or _reset_.

```lua
hl.bind("SUPER + a", hl.dsp.submap("submapA")

-- Sets the submap to submapB after pressing a.
hl.dsp.submap("submapA", "submapB", function()
    hl.bind("a", hl.dsp.exec_cmd("someCoolThing.sh"))
end)

-- Reset submap to default after pressing a.
hl.dsp.submap("submapB", "reset", function()
    hl.bind("a", hl.dsp.exec_cmd("someOtherCoolThing.sh")
end)
```

### Catch-All

You can also define a keybind via the special `catchall` keyword, which
activates no matter which key is pressed.  
This can be used to prevent any keys from passing to your active application
while in a submap or to exit it immediately when any unknown key is pressed:

```lua
hl.bind("catchall", hl.dsp.submap("reset"))
```

## Example Binds

### Media

These binds set the expected behavior for regular keyboard media volume keys,
including when the screen is locked:

```lua
hl.bind("XF86AudioRaiseVolume", hl.dsp.exec_cmd("wpctl set-volume @DEFAULT_AUDIO_SINK@ 5%+"), { repeating = true })
hl.bind("XF86AudioLowerVolume", hl.dsp.exec_cmd("wpctl set-volume @DEFAULT_AUDIO_SINK@ 5%-"), { repeating = true })
hl.bind("XF86AudioMute",        hl.dsp.exec_cmd("wpctl set-mute @DEFAULT_AUDIO_SINK@ toggle"), { locked = true })

-- Requires playerctl
hl.bind("XF86AudioPlay", hl.dsp.exec_cmd("playerctl play-pause"), { locked = true })
hl.bind("XF86AudioPrev", hl.dsp.exec_cmd("playerctl previous"),   { locked = true })
hl.bind("XF86AudioNext", hl.dsp.exec_cmd("playerctl next"),       { locked = true })
```
