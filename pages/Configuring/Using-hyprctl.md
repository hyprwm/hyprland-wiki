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

To pass an argument starting with `-` or `--`, such as command line options to
`exec` programs, pass `--` as an option. This will disable any subsequent
parsing of options by _hyprctl_.

Examples:

```sh
hyprctl dispatch exec kitty

hyprctl dispatch -- exec kitty --single-instance

hyprctl dispatch pseudo x
```

Returns: `ok` on success, an error message on fail.

See [Dispatchers](../Dispatchers) for a list of dispatchers.

### Keyword

issue a `keyword` to call a config keyword dynamically.

Examples:

```sh
hyprctl keyword bind SUPER,O,pseudo

hyprctl keyword general:border_size 10

hyprctl keyword monitor DP-3,1920x1080@144,0x0,1
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

### switchxkblayout

Sets the xkb layout index for a keyboard.

For example, if you set:
```ini
device:my-epic-keyboard-v1 {
    kb_layout=us,pl,de
}
```

You can use this command to switch between them.

```sh
hyprctl switchxkblayout [DEVICE] [CMD]
```
where `CMD` is either `next` for next, `prev` for previous, or `ID`
for a specific one (in the above case, `us`: 0, `pl`: 1, `de`: 2). 
You can find the `DEVICE` using `hyprctl devices` command.

example command for a typical keyboard:

```sh
hyprctl switchxkblayout at-translated-set-2-keyboard next
```

{{< hint >}}

If you want a single variant ie. pl/dvorak on one layout but us/qwerty on the other, xkb parameters can still be blank, however the amount of comma-separated parameters have to match. Alternatively, a single parameter can be specified for it to apply to all three.

```ini
input {
    kb_layout = pl,us,ru
    kb_variant = dvorak,,
    kb_options = caps:ctrl_modifier
}
```

{{< /hint >}}

### seterror

Sets the hyprctl error string. Will reset when Hyprland's config is reloaded.

```sh
hyprctl seterror 'rgba(66ee66ff)' hello world this is my problem
```

or disable:
```sh
hyprctl seterror disable
```

### setprop

Sets a window prop. Can be locked by adding `lock` at the end. If `lock` is not added,
will be unlocked. Locking means a dynamic windowrule _cannot_ override this setting.

Prop List:
| prop | comment |
| --- | --- |
| animationstyle | string, cannot be locked |
| rounding | int, -1 means not overriden |
| bordersize | int, -1 means not overriden |
| forcenoblur | 0/1 |
| forceopaque | 0/1|
| forceopaqueoverriden | 0/1 |
| forceallowsinput | 0/1, forceinput rule |
| forcenoanims | 0/1 |
| forcenoborder | 0/1 |
| forcenodim | 0/1 |
| forcenoshadow | 0/1 |
| windowdancecompat | 0/1 |
| nomaxsize | 0/1 |
| dimaround | 0/1 |
| keepaspectratio | 0/1 |
| alphaoverride | 0/1, makes the next setting be override instead of multiply |
| alpha | float 0.0 - 1.0 |
| alphainactiveoverride | 0/1, makes the next setting be override instead of multiply |
| alphainactive | float 0.0 - 1.0 |
| activebordercolor | color, -1 means not set |
| inactivebordercolor | color, -1 means not set |

```sh
hyprctl setprop address:0x13371337 forcenoanims 1 lock  # with locking
hyprctl setprop address:0x13371337 nomaxsize 0          # without locking
```

### notify

Sends a notification using the built-in Hyprland notification system.

```sh
hyprctl notify [ICON] [TIME_MS] [COLOR] [MESSAGE]
```

For example:
```sh
hyprctl notify -1 10000 "rgb(ff1ea3)" "Hello everyone!"
```

Icon of `-1` means "No icon"

Color of `0` means "Default color for icon"

Icon list:
```
WARNING = 0
INFO = 1
HINT = 2
ERROR = 3
CONFUSED = 4
OK = 5
```

## Info

```plain
version - prints the hyprland version, meaning flags, commit and branch of build.
monitors - lists all the outputs with their properties
workspaces - lists all workspaces with their properties
activeworkspace - gets the active window name and it's properties
clients - lists all windows with their properties
devices - lists all connected keyboards and mice
binds - lists all registered binds
activewindow - gets the active window name and it's properties
layers - lists all the layers
splash - prints the current random splash
getoption [option] - gets the config option status (values)
cursorpos - gets the current cursor pos in global layout coordinates
animations - gets the current config'd info about animations and beziers
instances - lists all running instances of hyprland with their info
```

For the getoption command, the option name should be written as `section:option`,
e.g.:

```sh
hyprctl getoption general:border_size

# For nested sections:
hyprctl getoption input:touchpad:disable_while_typing
```

See [Variables](../Variables) for section and options you can use.

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
i -> select instance (id or index in hyprctl instances)
```
