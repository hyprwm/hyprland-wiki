The NixOS module enables critical components needed to run Hyprland properly,
such as: polkit,
[xdg-desktop-portal-hyprland](https://github.com/hyprwm/xdg-desktop-portal-hyprland),
graphics drivers, fonts, dconf, xwayland, and adding a proper Desktop Entry to
your Display Manager.

Make sure to check out the options of the
[NixOS module](https://github.com/hyprwm/Hyprland/blob/main/nix/module.nix).

Note that the Nixpkgs Hyprland package is not actively maintained, and may be outdated.
As such, installation using the Flake is recommended.

## With flakes

```nix
# flake.nix
{
  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
    hyprland.url = "github:hyprwm/Hyprland";
  };

  outputs = {nixpkgs, hyprland, ...}: {
    nixosConfigurations.HOSTNAME = nixpkgs.lib.nixosSystem {
      # ...
      modules = [
        hyprland.nixosModules.default
        {programs.hyprland.enable = true;}
        # ...
      ];
    };
  };
}
```

Don't forget to replace `HOSTNAME` with your hostname!

## Without flakes

{{< hint >}}
If you're using Hyprland through an overlay, set
`programs.hyprland.package = pkgs.hyprland;`. This also means the `xwayland`
and `nvidiaPatches` options no longer apply.
{{< /hint >}}

```nix
# configuration.nix

{pkgs, ...}: let
  flake-compat = builtins.fetchTarball "https://github.com/edolstra/flake-compat/archive/master.tar.gz";

  hyprland = (import flake-compat {
    src = builtins.fetchTarball "https://github.com/hyprwm/Hyprland/archive/master.tar.gz";
  }).defaultNix;
in {
  imports = [hyprland.nixosModules.default];

  programs.hyprland = {
    enable = true;

    # default options, you don't need to set them
    package = hyprland.packages.${pkgs.system}.default;

    xwayland = {
      enable = true;
      hidpi = true;
    };

    nvidiaPatches = false;
  };
}
```
