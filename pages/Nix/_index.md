**NOTE:** Hyprland is NOT supported on NixOS stable. It may (not) compile or
work as intended. Please use the flake.

## Install and configure Hyprland on Nix & NixOS

Make sure to check out the options of the
[Nix module](https://github.com/hyprwm/Hyprland/blob/main/nix/module.nix).

### With flakes

```nix
# flake.nix
{
  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
    hyprland = {
      url = "github:hyprwm/Hyprland";
      # build with your own instance of nixpkgs
      inputs.nixpkgs.follows = "nixpkgs";
    };
  };

  outputs = { self, nixpkgs, hyprland }: {
    nixosConfigurations.HOSTNAME = nixpkgs.lib.nixosSystem {
      # ...
      modules = [
        hyprland.nixosModules.default 
        { programs.hyprland.enable = true; }
        # ...
      ];
    };
  };
```

Don't forget to replace `HOSTNAME` with your hostname!

### Without flakes

**NOTE:** If you're using Hyprland through an overlay, set
`programs.hyprland.package = pkgs.hyprland;`.

```nix
# configuration.nix
{config, pkgs, ...}: let
  flake-compat = builtins.fetchTarball "https://github.com/edolstra/flake-compat/archive/master.tar.gz";
  hyprland = (import flake-compat {
    src = builtins.fetchTarball "https://github.com/hyprwm/Hyprland/archive/master.tar.gz";
  }).defaultNix;
in {
  imports = [
    hyprland.nixosModules.default
  ];

  nixpkgs.overlays = [ hyprland.overlays.default ];

  programs.hyprland = {
    enable = true;
    package = pkgs.hyprland;
  };
}
```

## Home Manager module

You can use the Home Manager module by adding it to your configuration:

```nix
{ config, pkgs, inputs, ... }: {
  imports = [
    inputs.hyprland.homeManagerModules.default
  ];

  wayland.windowManager.hyprland.enable = true;
  # ...
}
```

For a list of available options, check the
[module file](https://github.com/hyprwm/Hyprland/blob/main/nix/hm-module.nix).

## Modules mix'n'match

If you plan on using the HM module alongside the NixOS module, set the NixOS
`programs.hyprland.package = null;`.

If you don't plan on using the NixOS module, but want to use the HM module, you
will have to enable all the options the NixOS module enables.

If you don't plan on using any module, manually enable whatever options the
modules set.

## Cachix

A [Hyprland Cachix](https://app.cachix.org/cache/nix-gaming) exists to cache the
`wlroots` package and speed up builds.

In case you don't plan on changing the Nixpkgs Hyprland builds with, you can use
this cache to speed up your builds.

```nix
# configuration.nix
{
  nix.settings = {
    substituters = ["https://hyprland.cachix.org"];
    trusted-public-keys = ["hyprland.cachix.org-1:a7pgxzMz7+chwVL3/pzj6jIBMioiJM7ypFP8PwtkuGc="];
  };
}
```
