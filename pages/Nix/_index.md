## Hyprland on Nix

{{< hint type=warning >}}

Hyprland is NOT supported on NixOS stable. It may (not) compile or
work as intended. Please use the
[flake](https://github.com/hyprwm/Hyprland/blob/main/flake.nix).

{{< /hint >}}

First of all, it is a good idea to set up [Cachix](./Cachix) before continuing
with installing Hyprland. 

Start off by choosing your appropriate install method on the sidebar.

## Modules mix'n'match

- If you're on NixOS and also use HM it's a good idea to use Hyprland modules
  for both. Make sure the package options are the same for both modules.

- If you don't plan on using the NixOS module, but want to use the HM module, you
  will have to enable all the options the NixOS module enables.

- If you don't plan on using any module, manually enable whatever options the
  modules set.
