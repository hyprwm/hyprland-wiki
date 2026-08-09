---
title: Contributing and Debugging
weight: 70
---

Everything needed to build and debug Hyprland and other hyprwm programs is
included inside the provided `devShell`s.

To use it in the cloned repo, simply run `nix develop`.

## Build in debug mode

A debug build is already provided through
`hyprland.packages.${pkgs.stdenv.hostPlatform.system}.hyprland-debug`.

Most hyprwm apps also provide their own `-debug` versions. For those that don't,
one can build the debug version from the CLI by using
[overrideAttrs](../advanced/#using-nix-repl) with
`cmakeBuildType = "Debug";` or `mesonBuildType = "debug";`, depending on the
program.

## Bisecting an issue

Follow the
[Bisecting an issue](../../crashes-and-bugs/#bisecting-an-issue)
guide. To build, run `nix build`.

> [!WARNING]
> To build with Tracy support, modify `nix/default.nix` to enable the flag, then run
> `nix build '.?submodules=1'`.

To view logs, pass the `--print-build-logs` (`-L`) flag.

To keep a failed build directory, pass the `--keep-failed` flag.

### Using Cachix to bisect

If you enable [Cachix](../cachix), you can call `nix run github:hyprwm/Hyprland/commit_hash` to execute that commit without compiling it, because cachix stores binaries for every commit from hyprland.

## Building the Wayland stack with ASan

Run `nix develop` first, then follow the
[Building with ASan](../../crashes-and-bugs/#building-the-wayland-stack-with-asan)
guide.

## Getting a debug stacktrace

Debug stacktraces provide useful info on why a program crashed. To get proper
stacktraces from Hyprland, make sure it was [built in debug mode](#build-in-debug-mode).

After a crash, perform the following steps:

```sh
nix shell nixpkgs#gdb # get gdb temporarily
coredumpctl # check the PID of the recent crash
coredumpctl debug <PID> # using the PID found in the previous step
```

The rest of the process is the same as
[here](../../crashes-and-bugs#obtaining-a-debug-stacktrace), from step 3 onwards.

## Manual building

You can build hyprland using cmake instead of using `nix build`. The advantage is being able to do incremental builds (just building whatever little change you made instead of the entire repo).

1. Clone the hyprland repo including its submodules.
2. Enter the directory and execute `nix develop` in your shell.
3. Run `make debug` (check the Makefile for other options).
4. For doing an incremental build (only building any small change you made after the first full build), run the following command (included in the Makefile):  
```bash
cmake --build ./build --config Debug --target all -j`nproc 2>/dev/null || getconf NPROCESSORS_CONF`
```
