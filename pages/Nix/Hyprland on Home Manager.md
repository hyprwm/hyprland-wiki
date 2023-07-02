You can use the Home Manager module by adding it to your configuration:

For a list of available options, check the
[module file](https://github.com/hyprwm/Hyprland/blob/main/nix/hm-module.nix).

## With flakes

```nix
# flake.nix

{
  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";

    home-manager = {
      url = "github:nix-community/home-manager";
      inputs.nixpkgs.follows = "nixpkgs";
    };

    hyprland.url = "github:hyprwm/Hyprland";
  };

  outputs = {nixpkgs, home-manager, hyprland, ...}: {
    homeConfigurations."user@hostname" = home-manager.lib.homeManagerConfiguration {
      pkgs = nixpkgs.legacyPackages.x86_64-linux;

      modules = [
        hyprland.homeManagerModules.default
        {wayland.windowManager.hyprland.enable = true;}
        # ...
      ];
    };
  };
}
```

Don't forget to replace `user@hostname` with your username and hostname!

## Without flakes
### Impure evaluation 
```nix
# home config

{pkgs, ...}: let
  flake-compat = builtins.fetchTarball "https://github.com/edolstra/flake-compat/archive/master.tar.gz";

  hyprland = (import flake-compat {
    src = builtins.fetchTarball "https://github.com/hyprwm/Hyprland/archive/master.tar.gz";
  }).defaultNix;
in {
  imports = [
    hyprland.homeManagerModules.default
  ];

  wayland.windowManager.hyprland = {
    enable = true;

    extraConfig = ''
      bind = SUPER, Return, exec, kitty
      # ...
    '';
  };
}
```
### Pure evaluation
```nix
{ pkgs, ... }:
let
  flake-compat = builtins.fetchGit {
    name = "flake-compat";
    url = "https://github.com/edolstra/flake-compat";
    ref = "refs/heads/master";
    rev = "35bb57c0c8d8b62bbfd284272c928ceb64ddbde9";
  };

  hyprland = (import flake-compat {
    src = builtins.fetchGit {
      name = "hyprland";
      url = "https://github.com/hyprwm/Hyprland";
      ref = "refs/heads/master";
      rev = "738ec900f4d5c5e2b00f90e71221ca380555b874";
    };
  }).defaultNix;

in {
  imports = [
    hyprland.homeManagerModules.default
  ];

  wayland.windowManager.hyprland = {
    enable = true;
    extraConfig = ''
      monitor=,highres,0x0,1
      ...
    '';
  };
}
```
