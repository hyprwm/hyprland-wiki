This page documents the basics of making your own Hyprland plugin from scratch.

{{< toc >}}

## How do plugins work?

Plugins are basically dynamic objects loaded by Hyprland. They have
(almost) full access to every part of Hyprland's internal process, and as such,
can modify and change way more than a script.

## Prerequisites

In order to write a Hyprland plugin, you will need:
 - Knowledge of C++
 - The ability to read
 - A rough understanding of the Hyprland internals (you _can_ learn this alongside your development work)

## Making your first plugin

Open your favorite code editor.

Make a new directory, in this example we will use `MyPlugin`.

***→ If you have the Hyprland source already cloned***

Make sure you have ran `make pluginenv` in the source.
If you use the source to build hyprland, `make install` and `make config` will
already do that for you, so there is no need.

***→ If you don't have the Hyprland source cloned***

Clone the Hyprland source code to a subdirectory, in our example `MyPlugin/Hyprland`.
Run `cd Hyprland && make pluginenv && cd ..`.

Now that you have the Hyprland sources set up, copy the contents of `example/examplePlugin/` to your working directory.

Your `MyPlugin` directory now should contain `main.cpp`, `globals.hpp`, `exampleLayout.cpp`, etc.

This plugin has quite a few examples of the things you can do, but we will focus on the basics for now.

### The basic parts of the plugin

Starting from the top, you will have to include the plugin API:
```cpp
#include <src/plugins/PluginAPI.hpp>
```
Feel free to take a look at the header. It contains a bunch of useful comments.

We also create a global pointer for our handle:
```cpp
inline HANDLE PHANDLE = nullptr;
```
we will initialize it in our plugin init function later. It serves as an internal "ID" of our plugin.

Then, there is the API version method:
```cpp
// Do NOT change this function.
APICALL EXPORT std::string PLUGIN_API_VERSION() {
    return HYPRLAND_API_VERSION;
}
```
This method will tell Hyprland what API version was used to compile this plugin. Do NOT change it.
It will be set automatically when compiling to the correct value.

Skipping over some example handlers, we have two important functions:
```cpp
APICALL EXPORT PLUGIN_DESCRIPTION_INFO PLUGIN_INIT(HANDLE handle) {
    PHANDLE = handle;

    // ...

    return {"MyPlugin", "An amazing plugin that is going to change the world!", "Me", "1.0"};
}

APICALL EXPORT void PLUGIN_EXIT() {
    // ...
}
```
The first method will be called when your plugin gets initialized (loaded)

You can, and probably should, initialize everything you may want to use in there.

It's worth noting that adding config variables is _only_ allowed in this function.

The plugin init function is _required_.

The return value should be the `PLUGIN_DESCRIPTION_INFO` struct which lets Hyprland know about your
plugin's name, description, author and version.

Make sure to store your `HANDLE` as it's going to be required for API calls.



The second method is not required, and will be called when your plugin is being unloaded by the user.

If your plugin is being unloaded because it committed a fault, this function will _not_ be called.

You do not have to unload layouts, remove config options, remove dispatchers, window decorations or unregister hooks
in the exit method. Hyprland will do that for you.

### Setting up a development environment
In order to make your life easier, it's a good idea to work on a nested debug Hyprland session.

Enter your Hyprland directory and run `sudo make config && make protocols && make debug`

Make a copy of your config in `~/.config/hypr` called `hyprlandd.conf`.

Remove _all_ `exec=` or `exec-once=` directives from your config.

*recommended*: Change the modifier for your keybinds (e.g. `SUPER` -> `ALT`)

Add this line:
```ini
monitor = WL-1, 1920x1080, 0x0, 1
```

Launch the output `Hyprland` binary in `./build/` _when logged into a Hyprland session_.

A new window should open with Hyprland running inside of it. You can now run your plugin in the nested session without worrying
about nuking your actual session, and also being able to debug it easily.

See more info in [the Contributing Section](https://wiki.hyprland.org/Contributing-and-Debugging/#nesting-hyprland)

### More advanced stuff

Take a look at the `src/plugins/PluginAPI.hpp` header. It has comments to every method to let you know what it is.

For more explanation on a few concepts, see [Advanced](../Advanced) and [Plugin Guidelines](../Plugin-Guidelines)