---
title: Hyprland on NixOS
weight: 11
---

## Installing Hyprland on NixOS

You can install Hyprland from:
+ The Nixpkgs repository if you want a proper released version from Hyprland.
+ The Hyprland flake if you want the latest git commit available at the moment.
+ Flake-compat: in case you want to use the Hyprland flake but you don't want to enable the use of flakes in your NixOS system.

{{< tabs items="Nixpkgs repository,The Hyprland flake,flake-compat" >}}

{{< tab "Nixpkgs repository" >}}

```nix {filename="configuration.nix"}
{
  programs.hyprland.enable = true;
}
```

This will use the Hyprland version included in the Nixpkgs release you're using.

{{< /tab >}}

{{< tab "The Hyprland flake" >}}

> [!NOTE]
> If you don't want to compile Hyprland yourself, make sure to enable [Cachix](../cachix).

In case you want to use the _development_ version of Hyprland, you can add it like
this:

```nix {filename="flake.nix"}
{
  inputs.hyprland.url = "github:hyprwm/Hyprland";
  # ...

  outputs = {nixpkgs, ...} @ inputs: {
    nixosConfigurations.HOSTNAME = nixpkgs.lib.nixosSystem {
      specialArgs = { inherit inputs; }; # this is the important part
      modules = [
        ./configuration.nix
      ];
    };
  };
}
```

Don't forget to change the `HOSTNAME` to your actual hostname!

```nix {filename="configuration.nix"}
{inputs, pkgs, ...}: {
  programs.hyprland = {
    enable = true;
    # set the flake package
    package = inputs.hyprland.packages.${pkgs.stdenv.hostPlatform.system}.hyprland;
    # make sure to also set the portal package, so that they are in sync
    portalPackage = inputs.hyprland.packages.${pkgs.stdenv.hostPlatform.system}.xdg-desktop-portal-hyprland;
  };
}
```

If you start experiencing lag and FPS drops in games or programs like Blender on
**stable** NixOS when using the Hyprland flake, it is most likely a `mesa`
version mismatch between your system and Hyprland.

You can fix this issue by using `mesa` from Hyprland's `nixpkgs` input:

```nix {filename="configuration.nix"}
{pkgs, inputs, ...}: let
  pkgs-unstable = inputs.hyprland.inputs.nixpkgs.legacyPackages.${pkgs.stdenv.hostPlatform.system};
in {
  hardware.graphics = {
    package = pkgs-unstable.mesa;

    # if you also want 32-bit support (e.g for Steam)
    enable32Bit = true;
    package32 = pkgs-unstable.pkgsi686Linux.mesa;
  };
}
```

For more details, see
[issue #5148](https://github.com/hyprwm/Hyprland/issues/5148).

{{< /tab >}}

{{< tab "flake-compat" >}}

This section is for using the Hyprland flake in a NixOS system without support for Nix flakes.

> [!NOTE]
> If you don't want to compile Hyprland yourself, make sure to enable [Cachix](../Cachix).

```nix {filename="configuration.nix"}
{pkgs, ...}: let
  flake-compat = builtins.fetchTarball "https://github.com/edolstra/flake-compat/archive/master.tar.gz";

  hyprland = (import flake-compat {
    src = builtins.fetchTarball "https://github.com/hyprwm/Hyprland/archive/main.tar.gz";
  }).defaultNix;
in {
  programs.hyprland = {
    enable = true;
    # set the flake package
    package = hyprland.packages.${pkgs.stdenv.hostPlatform.system}.hyprland;
    # make sure to also set the portal package, so that they are in sync
    portalPackage = hyprland.packages.${pkgs.stdenv.hostPlatform.system}.xdg-desktop-portal-hyprland;
  };
}
```

{{< /tab >}}

{{< /tabs >}}

## Configuring Hyprland on NixOS

You need to choose one of the three ways for configuring Hyprland in Nix: Hjem, home manager, or the upstream module.

### Hjem

Read [Configuring Hyprland with Hjem](../configuring-hyprland-with-hjem).

### Home Manager

Read [Configuring Hyprland with Home Manager](../configuring-hyprland-with-home-manager).

For the adventurous, [@spikespaz](https://github.com/spikespaz) has made a
Hyprland module that can be used in Home Manager and NixOS. It can be found
[here](https://github.com/hyprland-community/hyprnix).

### The upstream module

The [upstream module](https://github.com/hyprwm/Hyprland/blob/main/nix/module.nix)
provides options similar to the ones in the Home Manager module.

To use it, simply add

```nix
{inputs, ...}: {
  imports = [inputs.hyprland.nixosModules.default];

  programs.hyprland = {
    # usual Nixpkgs module options
    plugins = [
      #...
    ];
    settings = {
      # ...
    };
  };
}
```
