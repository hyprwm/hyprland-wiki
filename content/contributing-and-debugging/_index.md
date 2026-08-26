---
weight: 140
title: Contributing and debugging
---

PR, code styling and code FAQs are [here](./pr-guidelines).

For issues, please see [the guidelines](https://github.com/hyprwm/Hyprland/blob/main/docs/ISSUE_GUIDELINES.md).

## Getting Vouched

Before you submit a PR, you need to be vouched, or your PR will be closed automatically.

Please make a vouch request over [here](https://github.com/hyprwm/.github/discussions) if you wish to do so.

## Build in debug mode

### Required packages

See [manual build](../getting-started/installation#manual-build) for deps.

### Clone the repository

Submodules must be included when cloning the repo: `git clone --recurse-submodules https://github.com/hyprwm/Hyprland.git`

### Building

#### VSCode

Install the C/C++ and CMake Tools extensions and use that.

The Hyprland repo contains a [launch.json](https://github.com/hyprwm/Hyprland/blob/main/example/launch.json) file that you can copy to your `.vscode/` folder in the repo root.

With that, you can build in debug, go to the debugging tab and hit `(gdb) Launch`.

#### Generic

`make debug` to build, `gdb build/Hyprland` to launch and attach a debugger.

### Nix

Check out [the Nix contributing and debugging page](../nix/contributing-and-debugging).

## Development environment

### Setup

Make a copy of your config in `~/.config/hypr` called `hyprlandd.lua`.
`Debug` builds automatically use `hyprlandd.lua` in the default search path, but `--config ~/path/to/conf.lua` can be passed to override the configuration file location.

#### Recommended debug config changes

- Remove _all_ autoexec directives from your config.
- Change default modifier for binds (e.g. `SUPER` → `ALT`)

#### Launch the dev env

Launch the output `Hyprland` binary in `./build/` _when logged into a Hyprland session_.
A new window should open with Hyprland running inside of it.
You can now test stuff in this nested session without worrying about nuking your actual session.

I'd also recommend launching Hyprland with a debugger, like `gdb`.
Your IDE (if you use one) can likely do it for you, otherwise `gdb ./build/Hyprland` should suffice.
Now when Hyprland crashes, GDB will stop and allow you to inspect the current state with commands like `bt`, `frame`, `print`, etc.
An IDE will allow you to do so graphically.

## LSP and Formatting

If you want proper LSP support in an editor that doesn't automatically set it up, use clangd.
You'll probably notice there will be a bunch of warnings because we haven't generated compile commands, to do this run:

```sh
cmake -S . -B build/ -G Ninja -DCMAKE_EXPORT_COMPILE_COMMANDS=ON
```

Also, before submitting a PR please format with clang-format.
To do this only on your changes, run `git-clang-format` in your project's root directory.

## Logs, dumps, etc.

You can use the logs and the GDB debugger, but running Hyprland in debug compile as a driver and using it for a while might give more insight to the more random bugs.

When Hyprland crashes, use `coredumpctl` and then `coredumpctl info PID` to see the dump. See the instructions below for more info about `coredumpctl`.

You can also use the amazing command

```sh
watch -n 0.1 "grep -v \"arranged\" $XDG_RUNTIME_DIR/hypr/$HYPRLAND_INSTANCE_SIGNATURE/hyprland.log | tail -n 40"
```

for live logs.
(Replace `hyprland` with `hyprlandd` for debug builds.)

### How do I get a coredump?

See [`ISSUE_GUIDELINES.md`](https://github.com/hyprwm/Hyprland/blob/main/docs/ISSUE_GUIDELINES.md).
