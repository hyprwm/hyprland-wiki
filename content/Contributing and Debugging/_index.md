---
weight: 13
title: Contributing and Debugging
---

PR, code styling and code FAQs are [here](./PR-Guidelines)

For issues, please see
[the guidelines](https://github.com/hyprwm/Hyprland/blob/main/docs/ISSUE_GUIDELINES.md)

## Build in debug mode

### Required packages

See [manual build](https://wiki.hyprland.org/Getting-Started/Installation/#manual-manual-build) for deps.

### Recommended, CMake

Install the VSCode C/C++ and CMake Tools extensions and use that.

I've attached a
[example/launch.json](https://github.com/hyprwm/Hyprland/blob/main/example/launch.json)
that you can copy to your .vscode/ folder in the repo root.

With that, you can build in debug, go to the debugging tab and hit
`(gdb) Launch`.

_note:_ You probably want to set `watchdog_timeout = 0` in the debug {} section
of your config. Otherwise Hyprland will notice its hanging when you hit a
breakpoint and it will crash after you continue out of it.

### Custom, CLI

`make debug`

Attach and profile in your preferred way.

### Meson

```console
meson setup build -Dbuildtype=debug
ninja -C build
```

### Nix

To build the package in debug mode, you have to override it like this:

```nix
hyprland.override {
  debug = true;
};
```

This code can go in the `package` attribute of the NixOS/Home Manager modules.

## Running

When running Hyprland in Debug mode, the config is
`~/.config/hypr/hyprlandd.conf` and the logs can be found at
`$XDG_RUNTIME_DIR/hypr/[INSTANCE SIGNATURE]/hyprlandd.log`.

## Nesting Hyprland

Hyprland can run nested in a window. For that, make sure you did the following:

- built in debug
- removed all `exec=` and `exec-once=` keywords from your debug config
  (`hyprlandd.conf`)
- made sure no keybinds overlap (use a different mod for your keybinds
  altogether)

## LSP and Formatting

If you want proper LSP support in an editor that doesn't automatically set it
up, use clangd. You'll probably notice there will be a bunch of warnings
because we haven't generated compile commands, to do this run:

```sh
cmake -S . -B build/ -G Ninja -DCMAKE_EXPORT_COMPILE_COMMANDS=ON
```

Also, before submitting a PR please format with clang-format, to run this only
on your changes run `git-clang-format` in your projects root directory.

## Logs, dumps, etc

You can use the logs and the GDB debugger, but running Hyprland in debug compile
as a driver and using it for a while might give more insight to the more random
bugs.

When Hyprland crashes, use `coredumpctl` and then `coredumpctl info PID` to see
the dump. See the instructions below for more info about `coredumpctl`.

You can also use the amazing command

```sh
watch -n 0.1 "grep -v \"arranged\" $XDG_RUNTIME_DIR/hypr/$HYPRLAND_INSTANCE_SIGNATURE/hyprland.log | tail -n 40"
```

for live logs. (replace `hyprland` with `hyprlandd` for debug builds)

### How do I get a coredump?

See
[`ISSUE_GUIDELINES.md`](https://github.com/hyprwm/Hyprland/blob/main/docs/ISSUE_GUIDELINES.md).
