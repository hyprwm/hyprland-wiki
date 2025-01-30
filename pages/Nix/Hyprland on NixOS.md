---
title: Hyprland on NixOS
---

The NixOS module enables critical components needed to run Hyprland properly,
such as polkit,
[xdg-desktop-portal-hyprland](https://github.com/hyprwm/xdg-desktop-portal-hyprland),
graphics drivers, fonts, dconf, xwayland, and adding a proper Desktop Entry to
your Display Manager.

Make sure to check out the options of the
[NixOS module](https://search.nixos.org/options?channel=unstable&from=0&size=50&sort=relevance&type=packages&query=hyprland).

{{< callout >}}

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

{{< tabs items="Nixpkgs,Flakes,Nix stable (flake-compat)" >}}

{{< tab "Nixpkgs" >}}

```nix {filename="configuration.nix"}
{
  programs.hyprland.enable = true; # enable Hyprland

  environment.systemPackages = [
    # ... other packages
    pkgs.kitty # required for the default Hyprland config
  ];

  # Optional, hint Electron apps to use Wayland:
  # environment.sessionVariables.NIXOS_OZONE_WL = "1";
}
```

This will use the Hyprland version included in the Nixpkgs release you're using.

{{< /tab >}}

{{< tab "Flake Package" >}}

{{< callout >}}

Please enable [Cachix](../Cachix) before using the flake package, so you don't
have to compile Hyprland yourself.

{{< /callout >}}

In case you want to use the development version of Hyprland, you can add it like
this:

```nix {filename="flake.nix"}
{
  inputs.hyprland.url = "github:hyprwm/Hyprland";
  # ...

  outputs = {nixpkgs, ...} @ inputs: {
    nixosConfigurations.HOSTNAME = nixpkgs.lib.nixosSystem {
      specialArgs = { inherit inputs; }; # this is the important part
      modules = [
        ./configuration.nix
      ];
    };
  };
}
```

```nix {filename="configuration.nix"}
{inputs, pkgs, ...}: {
  programs.hyprland = {
    enable = true;
    # set the flake package
    package = inputs.hyprland.packages.${pkgs.stdenv.hostPlatform.system}.hyprland;
    # make sure to also set the portal package, so that they are in sync
    portalPackage = inputs.hyprland.packages.${pkgs.stdenv.hostPlatform.system}.xdg-desktop-portal-hyprland;
  };
}
```

Don't forget to change the `HOSTNAME` to your actual hostname!

If you start experiencing lag and FPS drops in games or programs like Blender on
**stable** NixOS when using the Hyprland flake, it is most likely a `mesa`
version mismatch between your system and Hyprland.

You can fix this issue by using `mesa` from Hyprland's `nixpkgs` input:

```nix {filename="configuration.nix"}
{pkgs, inputs, ...}: let
  pkgs-unstable = inputs.hyprland.inputs.nixpkgs.legacyPackages.${pkgs.stdenv.hostPlatform.system};
in {
  hardware.opengl = {
    package = pkgs-unstable.mesa.drivers;

    # if you also want 32-bit support (e.g for Steam)
    driSupport32Bit = true;
    package32 = pkgs-unstable.pkgsi686Linux.mesa.drivers;
  };
}
```

For more details, see
[issue #5148](https://github.com/hyprwm/Hyprland/issues/5148).

{{< /tab >}}

{{< tab "Nix stable" >}}

{{< callout >}}

Please enable [Cachix](../Cachix) before using the flake package, so you don't
have to compile Hyprland yourself.

{{< /callout >}}

```nix {filename="configuration.nix"}
{pkgs, ...}: let
  flake-compat = builtins.fetchTarball "https://github.com/edolstra/flake-compat/archive/master.tar.gz";

  hyprland = (import flake-compat {
    src = builtins.fetchTarball "https://github.com/hyprwm/Hyprland/archive/main.tar.gz";
  }).defaultNix;
in {
  programs.hyprland = {
    enable = true;
    # set the flake package
    package = hyprland.packages.${pkgs.stdenv.hostPlatform.system}.hyprland;
    # make sure to also set the portal package, so that they are in sync
    portalPackage = hyprland.packages.${pkgs.stdenv.hostPlatform.system}.xdg-desktop-portal-hyprland;
  };
}
```

{{< /tab >}}

{{< /tabs >}}

## Fixing problems with themes

If your themes for mouse cursors, icons or windows don't load correctly, see the
relevant section in [Hyprland on Home Manager](../Hyprland-on-Home-Manager).

If you prefer not to use Home Manager, you can also resolve the issues with GTK
themes using dconf like so:

```ini {filename="hyprland.conf"}
exec-once = dconf write /org/gnome/desktop/interface/gtk-theme "'Adwaita'"
exec-once = dconf write /org/gnome/desktop/interface/icon-theme "'Flat-Remix-Red-Dark'"
exec-once = dconf write /org/gnome/desktop/interface/document-font-name "'Noto Sans Medium 11'"
exec-once = dconf write /org/gnome/desktop/interface/font-name "'Noto Sans Medium 11'"
exec-once = dconf write /org/gnome/desktop/interface/monospace-font-name "'Noto Sans Mono Medium 11'"
```
