## Table of contents
{{< toc format=html >}}

**NOTE:** Hyprland is NOT supported on NixOS stable. It may (not) compile or
work as intended. Please use the
[flake](https://github.com/hyprwm/Hyprland/blob/main/flake.nix).

## Install and configure Hyprland on NixOS

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

{{< hint >}}
If you're using Hyprland through an overlay, set
`programs.hyprland.package = pkgs.hyprland;`.
{{< /hint >}}

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
  
  programs.hyprland = {
    enable = true;
    package = hyprland.packages.${pkgs.system}.default;
  };
}
```

## Install and configure through Home Manager

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

- If you plan on using the HM module alongside the NixOS module, set the NixOS
`programs.hyprland.package = null;`.

- If you don't plan on using the NixOS module, but want to use the HM module, you
will have to enable all the options the NixOS module enables.

- If you don't plan on using any module, manually enable whatever options the
modules set.

## Non-NixOS install

### With flakes

First, [enable flakes](https://nixos.wiki/wiki/Flakes#Enable_flakes).

Once you have flakes working, install Hyprland through `nix profile`:

```sh
$ nix profile install github:hyprwm/Hyprland
```

Since you're using Hyprland outside of NixOS, it won't be able to find graphics
drivers. To get around that, you can use [nixGL](https://github.com/guibou/nixGL).

First, install it, in the same manner you installed Hyprland:
```sh
$ nix profile install github:guibou/nixGL
```

From now on, you can run Hyprland by invoking it with nixGL
```sh
$ nixGL Hyprland
```
or by creating a wrapper script that runs the above command inside.

### Upgrading

In order to upgrade, you can run
```sh
$ nix profile upgrade '.*'
```
in order to upgrade all your packages.

Check the
[nix profile](https://nixos.org/manual/nix/stable/command-ref/new-cli/nix3-profile.html)
command documentation for other upgrade options.

## Cachix

A [Hyprland Cachix](https://app.cachix.org/cache/hyprland) exists to cache the
`wlroots` package and speed up builds.

In case you don't plan on changing the Nixpkgs input of Hyprland, you can use
this cache to download the binary directly, instead of building locally.

```nix
# configuration.nix
{
  nix.settings = {
    substituters = ["https://hyprland.cachix.org"];
    trusted-public-keys = ["hyprland.cachix.org-1:a7pgxzMz7+chwVL3/pzj6jIBMioiJM7ypFP8PwtkuGc="];
  };
}
```
