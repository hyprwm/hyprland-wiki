To install Hyprland on NixOS, we provide a NixOS and a Home Manager module.

{{< hint title=note >}}
- *(Required) NixOS Module*: enables critical components needed to run Hyprland properly
- *(Optional) Home-manager module*: lets you declaratively configure Hyprland
{{< /hint >}}

## NixOS module

The module is now upstreamed into Nixpkgs, which means all you need in your configuration is:

```nix
{config, pkgs, ...}: {
  programs.hyprland.enable = true;
  # Optional, hint electron apps to use wayland:
  # environment.sessionVariables.NIXOS_OZONE_WL = "1";
}
```

For more options, see
[module options](https://search.nixos.org/options?channel=unstable&from=0&size=50&sort=relevance&type=packages&query=hyprland).

For other NixOS options, see [Hyprland on NixOS](./Hyprland-on-NixOS).

## Home-manager module

Read [Hyprland on Home Manager](./Hyprland-on-Home-Manager).
