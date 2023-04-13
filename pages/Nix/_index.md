To install Hyprland in NixOS, we provide 2 provide a NixOS and HM module.

{{< hint title=note >}}
- *(Required) NixOS Module*: enables critical components needed to run Hyprland properly
- *(Optional) Home-manager module*: lets you declaratively configure Hyprland
{{< /hint >}}

## NixOS module

The module is now upstreamed into nixpkgs, which means all you need in your configuration is:

```nix
{config, pkgs, ...}: {
  programs.hyprland.enable = true;
  # Optional, hint electron apps to use wayland:
  # environment.sessionVariables.NIXOS_OZONE_WL = "1";
}
```


## Home-manager module

Read [Hyprland on Home Manager](./Hyprland-on-Home-Manager).
