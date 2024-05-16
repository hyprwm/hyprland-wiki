---
title: Hyprland on NixOS
---

The NixOS module enables critical components needed to run Hyprland properly,
such as: polkit,
[xdg-desktop-portal-hyprland](https://github.com/hyprwm/xdg-desktop-portal-hyprland),
graphics drivers, fonts, dconf, xwayland, and adding a proper Desktop Entry to
your Display Manager.

Make sure to check out the options of the
[NixOS module](https://search.nixos.org/options?channel=unstable&from=0&size=50&sort=relevance&type=packages&query=hyprland).

{{< callout >}}

- _(Required) NixOS Module_: enables critical components needed to run Hyprland
  properly
- _(Optional) Home-manager module_: lets you declaratively configure Hyprland

{{< /callout >}}

{{< tabs items="Nixpkgs,Flakes,Nix stable (flake-compat)" >}}

{{< tab "Nixpkgs" >}}

```nix
# configuration.nix

{pkgs, ...}: {
  programs.hyprland.enable = true;
}
```

This will use the Hyprland version that Nixpkgs has.

{{< /tab >}}

{{< tab "Flake Package" >}}

{{< callout >}}

Please enable [Cachix](../Cachix) before using the flake package, so you don't
have to compile Hyprland yourself.

{{< /callout >}}

In case you want to use the development version of Hyprland, you can add it like
this:

```nix
# flake.nix

{
  inputs.hyprland.url = "git+https://github.com/hyprwm/Hyprland?submodules=1";
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

# configuration.nix

{inputs, pkgs, ...}: {
  programs.hyprland = {
    enable = true;
    package = inputs.hyprland.packages.${pkgs.system}.hyprland;
  };
}
```

Don't forget to change the `HOSTNAME` to your actual hostname!

If you start experiencing lag and FPS drops in games or programs like Blender on
**stable** NixOS when using the Hyprland flake, it most likely is a `mesa`
version mismatch between your system and Hyprland.

You can fix this issue by using `mesa` from Hyprland's `nixpkgs` input:

```nix
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

```nix
# configuration.nix

{pkgs, ...}: let
  flake-compat = builtins.fetchTarball "https://github.com/edolstra/flake-compat/archive/master.tar.gz";

  hyprland = (import flake-compat {
    # we're not using pkgs.fetchgit as that requires a hash to be provided
    src = builtins.fetchGit {
      url = "https://github.com/hyprwm/Hyprland.git";
      submodules = true;
    };
  }).defaultNix;
in {
  programs.hyprland = {
    enable = true;
    package = hyprland.packages.${pkgs.system}.hyprland;
  };
}
```

{{< /tab >}}

{{< /tabs >}}

## Fixing problems with themes

If your themes for mouse cursors, icons or windows don't load correctly, see the
relevant section in [Hyprland on Home Manager](../Hyprland-on-Home-Manager).
