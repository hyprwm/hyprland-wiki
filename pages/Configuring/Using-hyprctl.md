
`hyprctl` is a utility for controlling some parts of the compositor from a CLI
or a script. If you install with `make install`, or any package, it should
automatically be installed.

To check if `hyprctl` is installed, simply execute it by issuing `hyprctl` in
the terminal.

If it's not, go to the repo root and `/hyprctl`. Issue a `make all` and then
`sudo cp ./hyprctl /usr/bin`.

# Commands

## Control

### Dispatch

issue a `dispatch` to call a keybind dispatcher with an arg.

An arg has to be present, for dispatchers without parameters it can be anything.

Examples:

```
hyprctl dispatch exec kitty

hyprctl dispatch pseudo x
```

Returns: `ok` on success, an error message on fail.

### Keyword

issue a `keyword` to call a config keyword dynamically.

Examples:

```
hyprctl keyword bind SUPER,O,pseudo

hyprctl keyword general:border_size 10
```

Returns: `ok` on success, an error message on fail.

### Reload

issue a `reload` to force reload the config.

### kill

issue a `kill` to get into a kill mode, where you can kill an app by clicking on
it. You can exit it with ESCAPE.

Kind of like xkill.

### setcursor

Sets the cursor theme and reloads the cursor manager. Will set the theme for everything except GTK, because GTK.

params: theme and size

e.g.:
```
hyprctl setcursor Bibata-Modern-Classic 24
```

## Info

```
version - prints the hyprland version, meaning flags, commit and branch of build.
monitors - lists all the outputs with their properties
workspaces - lists all workspaces with their properties
clients - lists all windows with their properties
devices - lists all connected keyboards and mice
activewindow - gets the active window name
layers - lists all the layers
splash - prints the current random splash
getoption [option] - gets the config option status (values)
```

# Batch

You can also use `--batch` to specify a batch of commands to execute

e.g.

```
hyprctl --batch "keyword general:border_size 2 ; keyword general:gaps_out 20"
```

`;` separates the commands

# Flags

You can specify flags for the request like this:

```
hyprctl -j monitors
```

flag list:

```
j -> output in JSON
```
