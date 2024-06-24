---
weight: 12
title: Using hyprctl
---

`hyprctl` is a utility for controlling some parts of the compositor from a CLI
or a script. If you install with `make install`, or any package, it should
automatically be installed.

To check if `hyprctl` is installed, simply execute it by issuing `hyprctl` in
the terminal.

If it's not, go to the repo root and `/hyprctl`. Issue a `make all` and then
`sudo cp ./hyprctl /usr/bin`.

{{< callout type=warning >}}

_hyprctl_ calls will be dispatched by the compositor _synchronously_, meaning
any spam of the utility will cause slowdowns. It's recommended to use `--batch`
for many control calls, and limiting the amount of info calls.

For live event handling, see the [socket2](../../IPC/).

{{< /callout >}}

## Commands

### dispatch

Issue a `dispatch` to call a keybind dispatcher with an arg.

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

### keyword

issue a `keyword` to call a config keyword dynamically.

Examples:

```sh
hyprctl keyword bind SUPER,O,pseudo

hyprctl keyword general:border_size 10

hyprctl keyword monitor DP-3,1920x1080@144,0x0,1
```

Returns: `ok` on success, an error message on fail.

### reload

Issue a `reload` to force reload the config.

### kill

Issue a `kill` to get into a kill mode, where you can kill an app by clicking on
it. You can exit it with ESCAPE.

Kind of like xkill.

### setcursor

Sets the cursor theme and reloads the cursor manager. Will set the theme for
everything except GTK, because GTK.

Please note that since 0.37.0, this only accepts hyprcursor themes. For legacy xcursor themes,
use the `XCURSOR_THEME` and `XCURSOR_SIZE` env vars.

params: theme and size

e.g.:

```sh
hyprctl setcursor Bibata-Modern-Classic 24
```

### output

Allows you to add and remove fake outputs to your preferred backend.

Usage:

```sh
hyprctl output create [backend] (name)
```
or
```sh
hyprctl output remove [name]
```

Where `[backend]` is the name of the backend and `(name)` is an optional name for the output. If `(name)` is not
specified, the default naming scheme will be used (`HEADLESS-2`, `WL-1`, etc.)

{{< callout type=info >}}

`create` and `remove` can also be `add` or `destroy`, respectively.

{{< /callout >}}

Available backends: 
- `wayland`: Creates an output as a Wayland window. This will only work if you're already running Hyprland with the Wayland backend.
- `headless`: Creates a headless monitor output. If you're running a VNC/RDP/Sunshine server, you should use this.
- `auto`: Picks a backend for you. For example, if you're running Hyprland from the TTY, `headless` will be chosen.

For example, to create a headless output named "test":

```sh
hyprctl output create headless test
```

And to remove it:

```sh
hyprctl output remove test
```

### switchxkblayout

Sets the xkb layout index for a keyboard.

For example, if you set:

```ini
device {
    name=my-epic-keyboard-v1
    kb_layout=us,pl,de
}
```

You can use this command to switch between them.

```sh
hyprctl switchxkblayout [DEVICE] [CMD]
```

where `CMD` is either `next` for next, `prev` for previous, or `ID` for a
specific one (in the above case, `us`: 0, `pl`: 1, `de`: 2). You can find the
`DEVICE` using `hyprctl devices` command.

Example command for a typical keyboard:

```sh
hyprctl switchxkblayout at-translated-set-2-keyboard next
```

{{< callout type=info >}}

If you want a single variant ie. pl/dvorak on one layout but us/qwerty on the
other, xkb parameters can still be blank, however the amount of comma-separated
parameters have to match. Alternatively, a single parameter can be specified for
it to apply to all three.

```ini
input {
    kb_layout = pl,us,ru
    kb_variant = dvorak,,
    kb_options = caps:ctrl_modifier
}
```

{{< /callout >}}

### seterror

Sets the hyprctl error string. Will reset when Hyprland's config is reloaded.

```sh
hyprctl seterror 'rgba(66ee66ff)' hello world this is my problem
```

To disable:

```sh
hyprctl seterror disable
```

### setprop

Sets a window prop. Can be locked by adding `lock` at the end. If `lock` is not
added, will be unlocked. Locking means a dynamic windowrule _cannot_ override
this setting.

Usage:
```sh
hyprctl setprop <mode:regex> <property> <value> [lock]
```

Regex supports different modes. The supported modes are:
```ini
class - class
title - title
initialclass - initialClass
initialtitle - initialTitle
active - active window
address - address prefixed with 0x
pid - process ID
floating - first floating window on the current workspace
tiled - first tiled window on the current workspace
```

If no mode is specified `class` is used by default.

{{< callout type=info >}}

To get more information about a window, you can use `hyprctl clients`.

{{< /callout >}}

{{< callout type=warning >}}

Please beware that `hyprctl clients` will display the fields as **initialClass** and **initialTitle** while the regex mode uses `initialclass` and `initialtitle`.

{{< /callout >}}

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
| nofocus | 0/1 |
| windowdancecompat | 0/1 |
| nomaxsize | 0/1 |
| minsize | vec2 (`x y`) |
| maxsize | vec2 (`x y`) |
| dimaround | 0/1 |
| keepaspectratio | 0/1 |
| alphaoverride | 0/1, makes the next setting be override instead of multiply |
| alpha | float 0.0 - 1.0 |
| alphainactiveoverride | 0/1, makes the next setting be override instead of multiply |
| alphainactive | float 0.0 - 1.0 |
| alphafullscreenoverride | 0/1, makes the next setting be override instead of multiply |
| alphafullscreen | float 0.0 - 1.0 |
| activebordercolor | gradient, -1 means not set |
| inactivebordercolor | gradient, -1 means not set |

For example:
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

Optionally, you can specify a font size of the notification like so:

```sh
hyprctl notify -1 10000 "rgb(ff0000)" "fontsize:35 This text is big"
```

The default font-size is 13.

### dismissnotify

Dismisses all or up to AMOUNT notifications.

```sh
hyprctl dismissnotify # dismiss all notifications
hyprctl dismissnotify 2 # dismiss the oldest 2 notifications
hyprctl dismissnotify -1 # dismiss all notifications (same as no arguments)
```

## Info

```plain
version - prints the Hyprland version along with flags, commit and branch of build.
monitors - lists active outputs with their properties, 'monitors all' lists active and inactive outputs
workspaces - lists all workspaces with their properties
activeworkspace - gets the active workspace and its properties
workspacerules - gets the list of defined workspace rules
clients - lists all windows with their properties
devices - lists all connected keyboards and mice
decorations [window] - lists all decorations and their info
binds - lists all registered binds
activewindow - gets the active window name and its properties
layers - lists all the layers
splash - prints the current random splash
getoption [option] - gets the config option status (values)
cursorpos - gets the current cursor position in global layout coordinates
animations - gets the currently configured info about animations and beziers
instances - lists all running instances of Hyprland with their info
layouts - lists all layouts available (including from plugins)
configerrors - lists all current config parsing errors
rollinglog - prints tail of the log. Also supports -f/--follow option
locked - prints whether the current session is locked.
```

For the getoption command, the option name should be written as
`section:option`, e.g.:

```sh
hyprctl getoption general:border_size

# For nested sections:
hyprctl getoption input:touchpad:disable_while_typing
```

See [Variables](../Variables) for sections and options you can use.

## Batch

You can also use `--batch` to specify a batch of commands to execute.

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
