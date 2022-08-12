# Status Bars

Launch your bar with `exec-once=`.

## Waybar

Waybar is a GTK status bar made specifically for wlroots compositors.

To use it, it's recommended to either use the AUR package `waybar-hyprland-git`, or compile manually with the `USE_EXPERIMENTAL` flag enabled.

To compile manually:

Clone the source, then do:
```sh
sed -i 's/zext_workspace_handle_v1_activate(workspace_handle_);/const std::string command = "hyprctl dispatch workspace " + name_;\n\tsystem(command.c_str());/g' src/modules/wlr/workspace_manager.cpp

meson --prefix=/usr --buildtype=plain --auto-features=enabled --wrap-mode=nodownload build
meson configure -Dexperimental=true build
```

and finally:
```sh
sudo ninja -C build install
```

If you want to use the workspaces module, it's called `wlr/workspaces`.

For more info regarding configuration, see [The Waybar Wiki](https://github.com/Alexays/Waybar/wiki)

## eww

In order to use [eww](https://github.com/elkowar/eww), you first have to
install it, either using your distro's package manager, by searching
`eww-wayland`, or by manually compiling. In the latter case, you need to
have `cargo` and `rustc` installed, then follow the [instructions](https://elkowar.github.io/eww).

### Configuration

After you've successfully installed eww, you can move onto configuring it.
There are a few examples listed in the [Readme](https://github.com/elkowar/eww),
we highly recommend you to also read through the
[Configuration options](https://elkowar.github.io/eww/configuration.html).

**NOTE:** Read
[the wayland section](https://elkowar.github.io/eww/configuration.html#wayland)
carefully before asking why your bar doesn't work.