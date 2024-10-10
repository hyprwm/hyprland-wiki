---
title: Contributing and Debugging
---

Everything needed to build and debug Hyprland and other hyprwm programs is
included inside the provided `devShell`s.

To use it in the cloned repo, simply run `nix develop`.

## Build in debug mode

A debug build is already provided through
`hyprland.packages.${pkgs.stdenv.hostPlatform.system}.hyprland-debug`.

Most hyprwm apps also provide their own `-debug` versions. For those that don't,
one can build the debug version from the CLI by using
[overrideAttrs](../Options-Overrides/#using-nix-repl) with
`cmakeBuildType = "debug";` or `mesonBuildType = "debug";`, depending on the
program.

## Bisecting an issue

Follow the
[Bisecting an issue](https://wiki.hyprland.org/Crashes-and-Bugs/#bisecting-an-issue)
guide. To build, run `nix build`.

{{< callout >}}

To build with Tracy support, modify `nix/default.nix` to enable the flag, then run
`nix build '.?submodules=1'`.

{{< /callout >}}

To view logs, pass the `--print-build-logs` (`-L`) flag.

To keep a failed build directory, pass the `--keep-failed` flag.

## Building the Wayland stack with ASan

Run `nix develop` first, then follow the
[Building with ASan](https://wiki.hyprland.org/Crashes-and-Bugs/#building-the-wayland-stack-with-asan)
guide.

## Manual building

Nix works differently than other build systems, so it has its own abstractions
over popular build systems such as Meson, CMake and Ninja.

In order to manually build Hyprland, you can run the following commands, while
in the `nix develop` shell.

For CMake:

```bash
$ cmakeConfigurePhase # to run the CMake configure phase
$ ninjaBuildPhase     # to run the Ninja build phase (or buildPhase when ninja is not available)
$ ninjaInstallPhase   # to run the Ninja install phase (or installPhase when ninja is not available)
```

For Meson:

```bash
$ mesonConfigurePhase # to run the Meson configure phase
$ ninjaBuildPhase     # to run the Ninja build phase
$ mesonInstallPhase   # to run the Meson install phase
```
