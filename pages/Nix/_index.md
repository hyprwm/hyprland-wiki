---
weight: 7
title: Nix
---

To install Hyprland on NixOS, we provide a NixOS and a Home Manager module.

{{< callout title=Note >}}

- _**(Required)** NixOS Module_: enables critical components needed to run
  Hyprland properly
  - _Without this, you may have issues with missing session files in your
    Display Manager._
- _(Optional) Home Manager module_: lets you configure Hyprland declaratively
  through Home Manager.
  - _This module configures Hyprland and adds it to your user's `$PATH`, but
    does not make certain system-level changes such as adding a desktop session
    file for your display manager. This is handled by the NixOS module once you
    enable it._

{{< /callout >}}

## NixOS module

```nix {filename="configuration.nix"}
{
  programs.hyprland.enable = true;
  # Optional, hint electron apps to use wayland:
  # environment.sessionVariables.NIXOS_OZONE_WL = "1";
}
```

For more options, see
[module options](https://search.nixos.org/options?channel=unstable&from=0&size=50&sort=relevance&type=packages&query=hyprland).

For other NixOS options, see [Hyprland on NixOS](./Hyprland-on-NixOS).

## Home Manager module

Read [Hyprland on Home Manager](./Hyprland-on-Home-Manager).

For the adventurous, [@spikespaz](https://github.com/spikespaz) has made a
Hyprland module that can be used in Home Manager and NixOS. It can be found
[here](https://github.com/hyprland-community/hyprnix).

## Options and overrides

Read [Options & Overrides](./Options-Overrides).
