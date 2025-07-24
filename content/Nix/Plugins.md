---
title: Plugins
---

Hyprland plugins are managed differently on Nix than on other distros. The most
notable change is that `hyprpm` is unsupported, but we have our own way of
building plugins.

{{< callout type=warning >}}

Using plugins using the syntax below requires you to be using Hyprland through
the [Home Manager module](../Hyprland-on-Home-Manager).

{{< /callout >}}

## Using plugins from Nixpkgs

In Nixpkgs, there are Hyprland plugins packaged for the Hyprland version in
Nixpkgs. You can use them like this:

```nix {filename="home.nix"}
{pkgs, ...}: {
  wayland.windowManager.hyprland.plugins = [
    pkgs.hyprlandPlugins.<plugin>
  ];
}
```

You can find which plugins are included using
`nix search nixpkgs#hyprlandPlugins ^`.

## hyprland-plugins

Official plugins made/maintained by vaxry.

To use these plugins, it is recommended that you are already using the Hyprland
flake, and **not** the Nixpkgs version.

First, add the flake to your flake inputs:

```nix {filename="flake.nix"}
{
  inputs = {
    hyprland.url = "github:hyprwm/Hyprland";

    hyprland-plugins = {
      url = "github:hyprwm/hyprland-plugins";
      inputs.hyprland.follows = "hyprland";
    };

    # ...
  }
}
```

The `inputs.hyprland.follows` line makes hyprland-plugins use the exact Hyprland
revision you have locked. This means there aren't any version mismatches, as
long as you update both inputs at once.

The next step is adding the plugins to Hyprland:

```nix {filename="home.nix"}
{inputs, pkgs, ...}: {
  wayland.windowManager.hyprland = {
    enable = true;

    plugins = [
      inputs.hyprland-plugins.packages.${pkgs.stdenv.hostPlatform.system}.<plugin>
    ];
  };
}
```

## Building plugins with Nix

The plugins inside Nixpkgs, as well as the ones in `hyprland-plugins`, are built
using a general function, `mkHyprlandPlugin`. Any plugin can be made to work
with it. The general usage is presented below, exemplified through hy3's
derivation:

```nix {filename="plugin.nix"}
{
  lib,
  fetchFromGitHub,
  cmake,
  hyprland,
  hyprlandPlugins,
}:
hyprlandPlugins.mkHyprlandPlugin hyprland {
  pluginName = "hy3";
  version = "0.39.1";

  src = fetchFromGitHub {
    owner = "outfoxxed";
    repo = "hy3";
    rev = "hl0.39.1";
    hash = "sha256-PqVld+oFziSt7VZTNBomPyboaMEAIkerPQFwNJL/Wjw=";
  };

  # any nativeBuildInputs required for the plugin
  nativeBuildInputs = [cmake];

  # set any buildInputs that are not already included in Hyprland
  # by default, Hyprland and its dependencies are included
  buildInputs = [];

  meta = {
    homepage = "https://github.com/outfoxxed/hy3";
    description = "Hyprland plugin for an i3 / sway like manual tiling layout";
    license = lib.licenses.gpl3;
    platforms = lib.platforms.linux;
  };
}
```

```nix {filename="home.nix"}
{pkgs, ...}: {
  wayland.windowManager.hyprland.plugins = [
    (pkgs.callPackage ./plugin.nix {})
  ];
}
```

In a similar manner to `stdenv.mkDerivation`, `mkHyprlandPlugin` takes an
attrset with mostly the same options as `mkDerivation`, as it is essentially a
wrapper around it.

The exception is that it also takes a `hyprland` package before the attrset, in
case you want to build with a different package than the one in Nixpkgs.

This is not always the best way to build for a different version, and it is
recommended that you use an overlay to apply your desired Hyprland package in
Nixpkgs instead.
