---
weight: 1
title: Using plugins
---

This page will tell you how to use plugins.

## Disclaimers

{{< callout type=warning >}}

Plugins are written in C++ and will run as a part of Hyprland.

Make sure to _always_ read the source code of the plugins you are going to use
and to trust the source.

Writing a plugin to wipe your computer is easy.

_**Never**_ trust random `.so` files you receive from other people.

{{< /callout >}}

## Getting plugins

Plugins come as _shared objects_, aka. `.so` files.

Hyprland does not have any "default" plugins, so any plugin you may want to use
you will have to find yourself.

## Installing / Using plugins

It is _highly_ recommended you use the Hyprland Plugin Manager, `hyprpm`. For
manual instructions, see [here](#manual).

### hyprpm

{{< callout type=info >}}

If you are using [permission management](../../Configuring/Permissions),
you should allow hyprpm to load plugins by adding this to your config:

```ini
permission = /usr/(bin|local/bin)/hyprpm, plugin, allow
```

otherwise you'll get a popup asking for permission every time hyprpm tries to load a plugin.

{{< /callout >}}

Make sure you have the required dependencies: `cpio`, `cmake`, `git`, `meson` and `gcc`.
You might also need `-dev` packages of Hyprland's dependencies if your distro splits
binaries and headers (e.g. Fedora or Debian). 

Find a repository you want to install plugins from. As an example, we will use
[hyprland-plugins](https://github.com/hyprwm/hyprland-plugins).

```sh
hyprpm add https://github.com/hyprwm/hyprland-plugins
```

Once it finishes, you can list your installed plugins with:

```sh
hyprpm list
```

Then, enable or disable them via `hyprpm enable name` and `hyprpm disable name`.

In order for the plugins to be loaded into Hyprland, run `hyprpm reload`.

You can add `exec-once = hyprpm reload -n` to your Hyprland config to have
plugins loaded at startup. `-n` will make hyprpm send a notification for good and bad events (e.g. update needed, plugin loaded successfully) or use `-nn` to get notified only on failed events.

To update your plugins, run `hyprpm update`.

For all options of `hyprpm`, run `hyprpm -h`.

### Manual

Different plugins may have different build methods, refer to their instructions.

If you don't have Hyprland headers installed, clone Hyprland, checkout to your
version, build Hyprland, and run `sudo make installheaders`. Then build your
plugin(s).

To load plugins manually, use `hyprctl plugin load path`.

You can unload plugins with `hyprctl plugin unload path`.

{{< callout >}}

Path has to be absolute!

{{< /callout >}}

## FAQ About Plugins

### My Hyprland crashes!

Oh no. Oopsie. Usually means a plugin is broken. `hyprpm disable` it.

### How do I list my loaded plugins?

`hyprctl plugin list`

### How do I make my own plugin?

See [here](../Development/Getting-Started).

### Where do I find plugins?

You can find our featured plugins at
[hyprland.org/plugins](https://hyprland.org/plugins/). You can also see a list
at
[awesome-hyprland](https://github.com/hyprland-community/awesome-hyprland#plugins).
Note that it may not be complete. Lastly, you can try searching around github
for the `"hyprland plugin"` keyword.

### Are plugins safe?

As long as you read the source code of your plugin(s) and can see there's
nothing bad going on, they will be safe.

### Do plugins decrease Hyprland's stability?

Hyprland employs a few tactics to unload plugins that crash. However, those
tactics may not always work. In general, as long as the plugin is well-designed,
it should not affect the stability of Hyprland.
