First of all, it is a good idea to set up [Cachix](./Cachix) before continuing
with installing Hyprland. 

After getting Cachix working, you have a few options ahead:

## NixOS + Home Manager (recommended)

{{< hint type=warning >}}

Hyprland is NOT supported on NixOS stable. It may (not) compile or
work as intended. Please use the
[flake](https://github.com/hyprwm/Hyprland/blob/main/flake.nix).

{{< /hint >}}

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
