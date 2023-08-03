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

Clone and compile plugin(s) of your choice.

{{< hint type=tip >}}
Due to the fact that plugins share C++ objects, your plugins must be
compiled with the same compiler as Hyprland, and on the same architecture.

In rare cases, they might even need to be compiled on the same machine.

Official releases are always compiled with `gcc`.
{{< /hint >}}

Place them somewhere on your system.

In hyprland, run in a terminal:
```sh
hyprctl plugin load /path/to/the/plugin.so
```
You can also use a plugin entry in your configuration file.
```ini
plugin = /my/epic/plugin.so
```
Plugins added to your configuration file will be unloaded if you remove their entries.

{{< hint type=important >}}
The plugin path has to be absolute. (starting from the root of the filesystem)
{{< /hint >}}

## Compiling official plugins

Official plugins can be found at [hyprwm/hyprland-plugins](https://github.com/hyprwm/hyprland-plugins).

Clone the repo and enter it:
```sh
git clone https://github.com/hyprwm/hyprland-plugins && cd hyprland-plugins
```
{{< hint type=tip >}}
If you build Hyprland manually and install using `sudo make install` (NOT meson) you can completely skip
this next step of getting the sources and checking them out.
{{< /hint >}}

### Preparing Hyprland sources for plugins

{{< hint type=note >}}

This step is not required if any of those apply to you:
 - You use the Arch official `hyprland` package
 - You install manually with `sudo make install`

{{< /hint >}}

Inside the repo, clone Hyprland and enter it:
```sh
git clone --recursive https://github.com/hyprwm/Hyprland && cd Hyprland
```

If you are using a release version of Hyprland, checkout it: (in this example it's `v0.24.1`, adjust to your release ver)
```sh
git checkout tags/v0.24.1
```

Prepare Hyprland sources:
```sh
sudo make pluginenv
```

{{< hint type=note >}}
If you are using hyprland-git, make _sure_ the commit you use matches the cloned sources.

You can check the commit you are running with `hyprctl version`, and change the commit in the sources
with `git reset --hard <hash>`. Make sure to remove the `dirty` at the end of the hash from `hyprctl version`
or else git will reject it.
{{< /hint >}}

### Building

Now, enter your plugin of choice's directory, for example:
```sh
cd ../borders-plus-plus
```

Compile it:
```sh
make all
```

Congratulations! A file called `plugin_name.so` should now be in your current directory.
Copy it wherever you please to keep it organized and load with `hyprctl plugin load <path>`.

## FAQ About Plugins

### My plugin crashes Hyprland!
Oops. Make sure your plugin is compiled on the same machine as Hyprland. If that doesn't help,
ask the plugin's maintainer to fix it.

### My plugin no longer works after updating Hyprland!
Make sure to re-compile the plugin after each Hyprland update.
Every hyprland version change (even from one commit to another) requires plugins to be re-compiled.

### How do I list my loaded plugins?
`hyprctl plugin list`

### Can I unload a plugin?
Yes. `hyprctl plugin unload /path/to/plugin.so`

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
