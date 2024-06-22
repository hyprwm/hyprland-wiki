---
weight: 7
title: Nix
---

To install Hyprland on NixOS, we provide a NixOS and a Home Manager module.

{{< callout title=Note >}}

- _(Required) NixOS Module_: enables critical components needed to run Hyprland
  properly. Without this, you may have issues with XDG Portals, or missing
  session files in your Display Manager.
- _(Optional) Home Manager Module_: lets you declaratively configure Hyprland

{{< /callout >}}

## NixOS module

```nix
{
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

For the adventurous, [@spikespaz](https://github.com/spikespaz) has made a
Hyprland module that can be used in Home Manager and NixOS. It can be found
[here](https://github.com/spikespaz/hyprland-nix).

## Options and overrides

Read [Options & Overrides](./Options-Overrides).
