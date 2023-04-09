Hyprland on Nix can be installed either from Nixpkgs (release version) or from
the [flake](https://github.com/hyprwm/Hyprland/blob/main/flake.nix) (directly
from the main branch).

If you use the flake, it is a good idea to set up [Cachix](./Cachix) before
continuing with installing Hyprland. 

The methods of installation are described below:

## NixOS + Home Manager (recommended)

If you're on NixOS and also use HM, it is a good idea to use Hyprland modules
for both. Make sure the package options are the same for both modules.

Read [Hyprland on NixOS](./Hyprland-on-NixOS) and
[Hyprland on Home Manager](./Hyprland-on-Home-Manager).

## Home Manager only

If you do not plan on using the NixOS module, but want to use the HM module, you
will have to enable all the options the NixOS module enables.

Read [Hyprland on Home Manager](./Hyprland-on-Home-Manager).

## On your own

If you don't plan on using any module, manually enable all the options that the
modules have set.

Read [the sources](https://github.com/hyprwm/Hyprland/tree/main/nix).
