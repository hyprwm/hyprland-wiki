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
all the references to `sway/workspaces` with `wlr/workspaces`.

For more info regarding configuration, see
[The Waybar Wiki](https://github.com/Alexays/Waybar/wiki).

## Waybar popups render behind the windows

In `~/.config/waybar/config`, make sure that you have the `layer` configuration
set to `top` and not `bottom`.

## Active workspace doesn't show up

Replace `#workspaces button.focused` with `#workspaces button.active` in `~/.config/style.css`.

## Scrolling through workspaces

Since there a lot of configuration options from `sway/workspaces` are missing, you
should deduce some of them by yourself. In the case of scrolling, it should look like this:

```json
"wlr/workspaces": {
     "format": "{icon}",
     "on-scroll-up": "hyprctl dispatch workspace e+1",
     "on-scroll-down": "hyprctl dispatch workspace e-1"
}
```

## Clicking on a workspace icon does not work!

On the `wlr/workspaces` module, add `"on-click": "activate"`. That's the purpose of
the `sed` command used before building Waybar: the default way to select a workspace by 
clicking uses the `swaymsg`'s way, and thus it is required to edit
this function to make it work with `hyprctl`.

# Eww

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

# Hybrid

Like Waybar, [Hybrid](https://github.com/vars1ty/HybridBar) is a GTK status bar mainly focused for wlroots compositors.

You can install it from the AUR by the name `hybrid-bar`.

## Configuration

The configuration is done through JSON, more information is available [here](https://github.com/vars1ty/HybridBar).

### Blur

To activate blur, set `blurls=NAMESPACE` in your hyprland configuration, where `NAMESPACE` is the gtk-layer-shell namespace of your HybridBar. The default namespace is `gtk-layer-shell` and can be changed in the HybridBar configuration at 
```json
{
     "hybrid" {
          "namespace": "namespace name"
     }
}
```