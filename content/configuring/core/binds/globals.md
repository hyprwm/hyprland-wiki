---
weight: 50
title: Global hotkeys and binds
---

## Global Keybinds

### Classic

Yes, you heard this right, Hyprland does support global keybinds for _ALL_ apps,
including OBS, Discord, Firefox, etc.

See the [`pass`](../../dispatchers) and
[`send_shortcut`](../../dispatchers) dispatchers for keybinds.

Let's take OBS as an example: the "Start/Stop Recording" keybind is set to
SUPER + F10, to make it work globally, simply add:

```lua
hl.bind("SUPER + F10", hl.dsp.pass({ window = "class:(com\\.obsproject\\.Studio)" }))
```

`pass` will pass the `PRESS` and `RELEASE` events by itself, no need for a `release` flag.  
This also means that push-to-talk will work flawlessly with one `pass`, e.g.:

```lua
hl.bind("mouse:276", hl.dsp.pass({window = "class:(TeamSpeak 3)"}))    # Pass MOUSE5 to TeamSpeak3.
```

You may also add shortcuts, where other keys are passed to the window.

```lua
 -- Send SUPER + F4 to OBS when SUPER + F10 is pressed.
hl.bind("SUPER + F10", hl.dsp.send_shortcut({ mods = "SUPER", key = "F4", window = "class:(TeamSpeak 3)" }))
```

> [!WARNING]
> This works flawlessly with all native Wayland applications. However, Xwayland is a bit wonky.  
> Make sure that what you're passing is a "global Xorg keybind", otherwise passing from a different Xwayland app may not work.

### D-Bus global shortcuts

>[!NOTE]
> This function will _only_ work with
> [XDPH](../../../../hypr-ecosystem/user/xdg-desktop-portal-hyprland).


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
