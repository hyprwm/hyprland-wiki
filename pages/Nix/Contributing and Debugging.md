---
title: Contributing and Debugging
---

Everything needed to build and debug Hyprland is included inside the provided
`devShell`.

To use it in the cloned repo, simply run `nix develop`.

## Build in debug mode

A debug build is already provided through
`hyprland.packages.${pkgs.stdenv.hostPlatform.system}.hyprland-debug`.

## Bisecting an issue

Follow the
[Bisecting an issue](https://wiki.hyprland.org/Crashes-and-Bugs/#bisecting-an-issue)
guide. To build, run `nix build '.?submodules=1'`.

To view logs, pass the `--print-build-logs` (`-L`) flag.

To keep a failed build directory, pass the `--keep-failed` flag.

## Building the Wayland stack with ASan

Run `nix develop` first, then follow the
[Building with ASan](https://wiki.hyprland.org/Crashes-and-Bugs/#bisecting-an-issue)
guide.

## Manual building

Nix works differently than other build systems, so it has its own abstractions
over popular build systems such as Meson, CMake and Ninja.

In order to manually build Hyprland, you can run the following commands, while
in the `nix develop` shell.

For CMake:

```bash
$ cmakeConfigurePhase # to run the CMake configure phase
$ ninjaBuildPhase     # to run the Ninja build phase
$ ninjaInstallPhase   # to run the Ninja install phase
```

For Meson:

```bash
$ mesonConfigurePhase # to run the Meson configure phase
$ ninjaBuildPhase     # to run the Ninja build phase
$ mesonInstallPhase   # to run the Meson install phase
```
