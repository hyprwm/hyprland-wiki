# Waybar

Waybar is a GTK status bar made specifically for wlroots compositors.

To use it, it's recommended to use the AUR package `waybar-hyprland-git`.

## Compiling Manually

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

## Eww

In order to use [Eww](https://github.com/elkowar/eww), you first have to install
it, either using your distro's package manager, by searching `eww-wayland`, or
by manually compiling. In the latter case, you can follow the
[instructions](https://elkowar.github.io/eww).

## Configuration

After you've successfully installed Eww, you can move onto configuring it. There
are a few examples listed in the [Readme](https://github.com/elkowar/eww). It's also
highly recommended to read through the
[Configuration options](https://elkowar.github.io/eww/configuration.html).

{{< hint type=important >}}
Read
[the Wayland section](https://elkowar.github.io/eww/configuration.html#wayland)
carefully before asking why your bar doesn't work.
{{< /hint >}}
