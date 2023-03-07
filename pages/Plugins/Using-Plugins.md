This page will tell you how to use plugins.

{{< toc >}}

## Plugin Disclaimers

{{< hint type=warning >}}
Plugins are written in C++ and will run as a part of Hyprland.

Make sure to _always_ read the source code of the plugins you are going to use
and to trust the source.

Writing a plugin to wipe your computer is easy.

***Never*** trust random `.so` files you receive from other people.
{{< /hint >}}

## Getting plugins

Plugins come as _shared objects_, aka. `.so` files.

Hyprland does not have any "default" plugins, so any plugin you may want
to use you will have to find yourself.

## Installing / Using plugins

{{< hint type=tip >}}
Due to the fact that plugins share C++ objects, your plugins must be
compiled with the same compiler as Hyprland, and on the same architecture.

In rare cases, they might even need to be compiled on the same machine.

Official releases are always compiled with `gcc`.
{{< /hint >}}

It is recommended to create a Hyprland-Plugins directory, then clone
the Hyprland repository.
```sh
mkdir Hyprland-Plugins && cd Hyprland-Plugins
git clone --recursive https://github.com/hyprwm/Hyprland
```

The official Hyprland plugins are hosted in a repo [here.](https://github.com/hyprwm/hyprland-plugins)
For the simplicity of this guide, you can clone this repository in your 
Hyprland-Plugins directory.
```sh
git clone https://github.com/hyprwm/hyprland-plugins.git
```

Before compiling any plugins, you will need to run make protocols in the 
Hyprland repository. 
(These commands assume you are in the Hyprland-Plugins directory)
```sh
cd Hyprland && make protocols
```

You will also need to set the HYPRLAND_HEADERS env variable to the path 
of the cloned Hyprland repository (not the Hyprland-Plugins directory).
You are now ready to compile a plugin! 

Example compilation of borders-plus-plus Hyprland plugin:
```sh
cd hyprland-plugins/borders-plus-plus && make
```

In hyprland, run in a terminal:
```sh
hyprctl plugin load /path/to/the/plugin.so
```

You can also add this to an `exec-once`:
```ini
exec-once = hyprctl plugin load /my/epic/plugin.so
```

## FAQ About Plugins

### My plugin crashes Hyprland!
Oops. Make sure your plugin is compiled on the same machine as Hyprland. If that doesn't help,
ask the plugin's maintainer to fix it.

### How do I list my loaded plugins?
`hyprctl plugin list`

### Can I unload a plugin?
Yes. `hyprctl plugin unload /path/to/plugin.so`

### How do I make my own plugin?
See [here](../Development/Getting-Started).

### Where do I find plugins?
Try looking around [here](https://duckduckgo.com).

### Are plugins safe?
As long as you read the source code of your plugin(s) and can see there's nothing bad going on,
they will be safe.

### Do plugins decrease Hyprland's stability?
Hyprland employs a few tactics to unload plugins that crash. However, those tactics may not
always work. In general, as long as the plugin is well-designed, it should not affect the
stability of Hyprland.
