# Table of contents

{{< toc format=html >}}

{{< hint type=warning >}}
Hyprland is NOT supported on NixOS stable. It may (not) compile or
work as intended. Please use the
[flake](https://github.com/hyprwm/Hyprland/blob/main/flake.nix).
{{< /hint >}}

# Install and configure Hyprland on NixOS

Make sure to check out the options of the
[Nix module](https://github.com/hyprwm/Hyprland/blob/main/nix/module.nix).

Do note that the Nixpkgs Hyprland package is not actively maintained, and may be outdated
Installation using the Flake is recommended.

## With flakes

```nix
# flake.nix
{
  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
    hyprland = {
      url = "github:hyprwm/Hyprland";
      # build with your own instance of nixpkgs
      inputs.nixpkgs.follows = "nixpkgs";
    };
  };

  outputs = { self, nixpkgs, hyprland }: {
    nixosConfigurations.HOSTNAME = nixpkgs.lib.nixosSystem {
      # ...
      modules = [
        hyprland.nixosModules.default
        { programs.hyprland.enable = true; }
        # ...
      ];
    };
  };
```

Don't forget to replace `HOSTNAME` with your hostname!

## Without flakes

{{< hint >}}
If you're using Hyprland through an overlay, set
`programs.hyprland.package = pkgs.hyprland;`.
{{< /hint >}}

```nix
# configuration.nix
{config, pkgs, ...}: let
  flake-compat = builtins.fetchTarball "https://github.com/edolstra/flake-compat/archive/master.tar.gz";
  hyprland = (import flake-compat {
    src = builtins.fetchTarball "https://github.com/hyprwm/Hyprland/archive/master.tar.gz";
  }).defaultNix;
in {
  imports = [
    hyprland.nixosModules.default
  ];

  programs.hyprland = {
    enable = true;
    package = hyprland.packages.${pkgs.system}.default;
  };
}
```

# Install and configure through Home Manager

You can use the Home Manager module by adding it to your configuration:

## With flakes

```nix
# flake.nix
{
  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
    home-manager = {
      url = "github:nix-community/home-manager";
      inputs.nixpkgs.follows = "nixpkgs";
    };
    hyprland = {
      url = "github:hyprwm/Hyprland";
      # build with your own instance of nixpkgs
      inputs.nixpkgs.follows = "nixpkgs";
    };
  };

  outputs = { self, nixpkgs, home-manager, hyprland }: {
    homeConfigurations."USER@HOSTNAME"= home-manager.lib.homeManagerConfiguration {
      pkgs = nixpkgs.legacyPackages.x86_64-linux;
      modules = [
        hyprland.homeManagerModules.default
        { wayland.windowManager.hyprland.enable = true; }
        # ...
      ];
    };
  };
```

Don't forget to replace `USER@HOSTNAME` with your username and hostname!

## Without flakes

```nix
# home config
{ config, pkgs, inputs, ... }: let
  flake-compat = builtins.fetchTarball "https://github.com/edolstra/flake-compat/archive/master.tar.gz";
  hyprland = (import flake-compat {
    src = builtins.fetchTarball "https://github.com/hyprwm/Hyprland/archive/master.tar.gz";
  }).defaultNix;
in {
  imports = [
    hyprland.homeManagerModules.default
  ];

  wayland.windowManager.hyprland.enable = true;
  # ...
}
```

For a list of available options, check the
[module file](https://github.com/hyprwm/Hyprland/blob/main/nix/hm-module.nix).

# Modules mix'n'match

- If you plan on using the HM module alongside the NixOS module, set the NixOS
  `programs.hyprland.package = null;`.

- If you don't plan on using the NixOS module, but want to use the HM module, you
  will have to enable all the options the NixOS module enables.

- If you don't plan on using any module, manually enable whatever options the
  modules set.

# Non-NixOS install

## With flakes

First, [enable flakes](https://nixos.wiki/wiki/Flakes#Enable_flakes).

Once you have flakes working, install Hyprland through `nix profile`:

```sh
nix profile install github:hyprwm/Hyprland
```

Since you're using Hyprland outside of NixOS, it won't be able to find graphics
drivers. To get around that, you can use [nixGL](https://github.com/guibou/nixGL).

First, install it, in the same manner you installed Hyprland:

```sh
nix profile install github:guibou/nixGL --impure
```

Impure is needed due to `nixGL`'s reliance on hardware information.

From now on, you can run Hyprland by invoking it with nixGL

```sh
nixGL Hyprland
```

or by creating a wrapper script that runs the above command inside.

## Upgrading

In order to upgrade all your packages, you can run

```sh
nix profile upgrade '.*'
```

Check the
[nix profile](https://nixos.org/manual/nix/stable/command-ref/new-cli/nix3-profile.html)
command documentation for other upgrade options.

# XWayland

XWayland is enabled by default in the Nix package. You can disable it either
in the package itself, or through the Home Manager module.

## Package

```nix
(inputs.hyprland.packages.${pkgs.default}.default.override {
  enableXWayland = false;
})
```

### HM module

```nix
wayland.windowManager.hyprland = {
  enable = true;
  xwayland.enable = false;
}
```

## HiDPI

By default, the Nix package includes a patched wlroots that can render HiDPI
XWayland windows.

In order to enable the functionality, you have to add:

```toml
exec-once=xprop -root -f _XWAYLAND_GLOBAL_OUTPUT_SCALE 32c -set _XWAYLAND_GLOBAL_OUTPUT_SCALE 2
```

This will make XWL programs look as if they were unscaled. To fix this, you
have to export different environment variables to make the specific toolkits
render at the proper scaling. For example

```sh
export GDK_SCALE=2
export XCURSOR_SIZE=32
```

{{< hint >}}
The GDK_SCALE variable won't conflict with wayland-native GTK programs.
{{< /hint >}}

Usually, there's no reason to disable this functionality, as it won't affect
people who don't have HiDPI screens.

If you _do_ insist on disabling it though (e.g. for adding your own patches
to wlroots), you can do so by either using the `hyprland-no-hidpi` package,
or by passing the `hidpiXWayland = false;` flag, the same way as
[disabling XWayland](#package)

# Cachix

A [Hyprland Cachix](https://app.cachix.org/cache/hyprland) exists to cache the
`wlroots` package and speed up builds.

In case you don't plan on changing the Nixpkgs input of Hyprland, you can use
this cache to download the binary directly, instead of building locally.

```nix
# configuration.nix
{
  nix.settings = {
    substituters = ["https://hyprland.cachix.org"];
    trusted-public-keys = ["hyprland.cachix.org-1:a7pgxzMz7+chwVL3/pzj6jIBMioiJM7ypFP8PwtkuGc="];
  };
}
```

# Overrides

You can override the package through `.override` or `.overrideAttrs`. This is
easily achievable through NixOS or Home Manager.

If you're using Nix (and not NixOS or Home Manager) and you want to override,
you can do it like this

```sh
$ nix repl
nix-repl> :lf "github:hyprwm/Hyprland"
nix-repl> :bl outputs.packages.x86_64-linux.hyprland.override { nvidiaPatches = true; } # option = value
```

Then you can run Hyprland from the built path.
