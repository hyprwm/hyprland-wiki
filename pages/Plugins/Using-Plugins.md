This page will tell you how to use plugins.

{{< toc >}}

## Disclaimers

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

It is _highly_ recommended you use the Hyprland Plugin Manager, `hyprpm`. For manual instructions, see a bit below.

### hyprpm

Find a repository you want to install plugins from. As an example, we will use [hyprland-plugins](https://github.com/hyprwm/hyprland-plugins).

```sh
hyprpm add https://github.com/hyprwm/hyprland-plugins
```

once it finishes, you can list your installed plugins with
```sh
hyprpm list
```

and enable or disable them via `hyprpm enable name` and `hyprpm disable name`.

In order for the plugins to be loaded into hyprland, run `hyprpm reload`.

You can add `exec-once = hyprpm reload` to your hyprland config to have plugins loaded at startup.

In order update your plugins, run `hyprpm update`.

### Manual

Different plugins may have different build methods, refer to their instructions.

If you don't have hyprland headers installed, clone hyprland, checkout to your version,
build hyprland, and run `sudo make installheaders`. Then build your plugin(s).

To load plugins manually, use `hyprctl plugin load path` !NOTE: Path HAS TO BE ABSOLUTE!

You can unload plugins with `hyprctl plugin unload path`.

## FAQ About Plugins

### How do I list my loaded plugins?
`hyprctl plugin list`

### How do I make my own plugin?
See [here](../Development/Getting-Started).

### Where do I find plugins?
Try looking around [here](https://duckduckgo.com).
You can also see a list at [awesome-hyprland](https://github.com/hyprland-community/awesome-hyprland#plugins). Note it may not be complete.

### Are plugins safe?
As long as you read the source code of your plugin(s) and can see there's nothing bad going on,
they will be safe.

### Do plugins decrease Hyprland's stability?
Hyprland employs a few tactics to unload plugins that crash. However, those tactics may not
always work. In general, as long as the plugin is well-designed, it should not affect the
stability of Hyprland.
