---
weight: 7
title: Nix
---

To install Hyprland on NixOS, we provide a NixOS and a Home Manager module.

{{< callout title=Note >}}

- _(Required) NixOS Module_: enables critical components needed to run Hyprland
  properly
- _(Optional) Home-manager module_: lets you declaratively configure Hyprland

{{< /callout >}}

## NixOS module

The module is now upstreamed into Nixpkgs, which means all you need in your
configuration is:

```nix
{config, pkgs, ...}: {
  programs.hyprland.enable = true;
  # Optional, hint electron apps to use wayland:
  # environment.sessionVariables.NIXOS_OZONE_WL = "1";
}
```

Note that the command to run hyprland is `Hyprland` (with a capital `H`) and not
`hyprland`.

For more options, see
[module options](https://search.nixos.org/options?channel=unstable&from=0&size=50&sort=relevance&type=packages&query=hyprland).

For other NixOS options, see [Hyprland on NixOS](./hyprland-on-nixos).

## Home-manager module

Read [Hyprland on Home Manager](./hyprland-on-home-manager).

For the adventurous, [@spikespaz](https://github.com/spikespaz) has made a
Hyprland module that can be used in Home Manager and NixOS. It can be found
[here](https://github.com/spikespaz/hyprland-nix).

## Options and overrides

Read [Options & Overrides](./options--overrides).
