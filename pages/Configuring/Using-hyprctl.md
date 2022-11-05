`hyprctl` is a utility for controlling some parts of the compositor from a CLI
or a script. If you install with `make install`, or any package, it should
automatically be installed.

To check if `hyprctl` is installed, simply execute it by issuing `hyprctl` in
the terminal.

If it's not, go to the repo root and `/hyprctl`. Issue a `make all` and then
`sudo cp ./hyprctl /usr/bin`.

# Using Hyprctl

{{< hint type=warning >}}

_hyprctl_ calls will be dispatched by the compositor _synchronously_,
meaning any spam of the utility will cause slowdowns.
It's recommended to use `--batch` for many control calls, and
limiting the amount of info calls.

For live event handling, see the [socket2](../../IPC/).

{{< /hint >}}

## Commands

### Dispatch

issue a `dispatch` to call a keybind dispatcher with an arg.

An arg has to be present, for dispatchers without parameters it can be anything.

Examples:

```sh
hyprctl dispatch exec kitty

hyprctl dispatch pseudo x
```

Returns: `ok` on success, an error message on fail.

See [Dispatchers](./Dispatchers) for a list of dispatchers.

### Keyword

issue a `keyword` to call a config keyword dynamically.

Examples:

```sh
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

Sets the cursor theme and reloads the cursor manager. Will set the theme for
everything except GTK, because GTK.

params: theme and size

e.g.:

```sh
hyprctl setcursor Bibata-Modern-Classic 24
```

### output

Allows you to add and remove fake outputs to your preferred backend.

params: `create` or `remove` and `backend` or `name` respectively.

For _create_:

pass a backend name: `wayland`, `x11`, `headless` or `auto`. On a _real_ hyprland
session, if you're looking for a VNC / RDP type thing, it's 99% going to be `headless`.

For _remove_:

pass the output's name, as found in `hyprctl monitors`. Please be aware you are _not_ 
allowed to remove real displays with this command.

e.g.:
```ini
# will create a 1920x1080 headless display, for example to use with RDP.
hyprctl output create headless

# will remove the above display, provided its name was HEADLESS-1
hyprctl output remove HEADLESS-1
```

## Info

```plain
version - prints the hyprland version, meaning flags, commit and branch of build.
monitors - lists all the outputs with their properties
workspaces - lists all workspaces with their properties
clients - lists all windows with their properties
devices - lists all connected keyboards and mice
activewindow - gets the active window name
layers - lists all the layers
splash - prints the current random splash
getoption [option] - gets the config option status (values)
cursorpos - gets the current cursor pos in global layout coordinates
```

For the getoption command, the option name should be written as `section:option`,
e.g.:

```sh
hyprctl getoption general:border_size

# For nested sections:
hyprctl getoption input:touchpad:disable_while_typing
```

See [Variables](./Variables) for section and options you can use.

## Batch

You can also use `--batch` to specify a batch of commands to execute

e.g.

```sh
hyprctl --batch "keyword general:border_size 2 ; keyword general:gaps_out 20"
```

`;` separates the commands

## Flags

You can specify flags for the request like this:

```sh
hyprctl -j monitors
```

flag list:

```txt
j -> output in JSON
```
