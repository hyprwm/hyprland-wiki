You can use the Home Manager module by adding it to your configuration:

For a list of available options, check the
[module file](https://github.com/hyprwm/Hyprland/blob/main/nix/hm-module.nix).


## Installation

The following snippets of code try to show how to bring the Hyprland flake from the flake input and import it into the module system. Feel free to make any adjustment for your setup.

{{< tabs "uniqueid" >}}

{{< tab "Flakes" >}}

Don't forget to replace `user@hostname` with your username and hostname!

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
{{< /tab >}}

{{< tab "No flakes (with flake-compat)" >}}
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
{{< /tab >}}

{{< /tabs >}}


## Usage

Once the module is enabled, you can use it to declaratively configure Hyprland:

```nix
# home.nix
{config, pkgs, ...}: {
  wayland.windowManager.hyprland.extraConfig = ''
    % TODO add some examples that add string interpolation or something cool
  '';
}
