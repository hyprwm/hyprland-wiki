# Status Bars

Launch your bar with `exec-once=`.

## Waybar

Waybar is a GTK status bar made specifically for wlroots compositors.

To use it, it's recommended to use the AUR package `waybar-hyprland-git`,
or compile manually with the `USE_EXPERIMENTAL` flag enabled.

### Compiling Manually

To compile manually:

Clone the source, cd into it, then do:

```bash
sed -i 's/zext_workspace_handle_v1_activate(workspace_handle_);/const std::string command = "hyprctl dispatch workspace " + name_;\n\tsystem(command.c_str());/g' src/modules/wlr/workspace_manager.cpp
meson --prefix=/usr --buildtype=plain --auto-features=enabled --wrap-mode=nodownload build
meson configure -Dexperimental=true build
sudo ninja -C build install
```

If you want to use the workspaces module, first, copy the configuration files from 
`/etc/xdg/waybar/` into `~/.config/waybar/`. Then, in `~/.config/waybar/conf/` replace 
all the references to `sway/workspaces/` with `wlr/workspaces`.

For more info regarding configuration, see
[The Waybar Wiki](https://github.com/Alexays/Waybar/wiki).

### Waybar popups render behind the windows

In `~/.config/waybar/config`, make sure that you have the `layer` configuration 
set to `top` and not `bottom`.

### Active workspace doesn't show up

Replace `#workspaces button.focus` with `#wroskapces button.active` in `~/.config/style.css`.

### Scroll through workspaces

Since there are a lot of configurations from `sway/workspaces` missing, you
should deduce some of them by yourself. In the case of scrolling, configure
your module this way:

```json
"wlr/workspaces": {
     "format": "{icon}",
     "on-scroll-up": "hyprctl dispatch workspace e+1",
     "on-scroll-down": "hyprctl dispatch workspace e-1"
},
```

### Clicking on workspace doesn't work!

On the `wlr/workspaces` module, add `"on-click": "activate"`. That's the purpose of
the `sed` command we had to apply before building: the default way to select a
workspace by clicking uses the `swaymsg`'s way, furthermore it is required to edit
this function to make it work with `hyprctl`.

## Eww

In order to use [Eww](https://github.com/elkowar/eww), you first have to install
it, either using your distro's package manager, by searching `eww-wayland`, or
by manually compiling. In the latter case, you can follow the
[instructions](https://elkowar.github.io/eww).

### Configuration

After you've successfully installed Eww, you can move onto configuring it. There
are a few examples listed in the [Readme](https://github.com/elkowar/eww). We
highly recommend you also read through the
[Configuration options](https://elkowar.github.io/eww/configuration.html).

{{< hint type=important >}}
Read
[the Wayland section](https://elkowar.github.io/eww/configuration.html#wayland)
carefully before asking why your bar doesn't work.
{{< /hint >}}
