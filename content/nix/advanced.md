---
title: Advanced
weight: 60
---

## Overlays

### default

The `default` Hyprland overlay only contains the Hyprland package along with xdg-desktop-portal-hyprland, and Hyprland's internal dependencies (udis86-hyprland and glaze-hyprland).

This means you need to import all the overlays for the hypr\* dependencies yourself if you want them up to date.
Otherwise, Hyprland will build with the versions available in Nixpkgs.

### hyprland-packages

If you instead want an overlay with all dependencies, import both `hyprland-packages` and `hyprland-extras` overlays.

> [!NOTE]
> The dependencies can sometimes be out of date and impact other hypr\* apps, e.g. <https://github.com/hyprwm/Hyprland/discussions/13396>.
> In such cases, either ping the maintainers to update the lockfiles, or use the `default` overlay.

## Package options

These are the default options that the Hyprland package is built with.
These can be changed by setting the appropriate option to `true` or `false`.
For additional options, see [module options](https://search.nixos.org/options?channel=unstable&from=0&size=50&sort=relevance&type=packages&query=hyprland).

### Package

You can override the package through the `.override` or `.overrideAttrs` mechanisms.

```nix
(pkgs.hyprland.override { # or inputs.hyprland.packages.${pkgs.stdenv.hostPlatform.system}.hyprland
  enableXWayland = true;  # whether to enable Xwayland
  withSystemd = true;     # whether to build with systemd support
})
```

### NixOS & HM modules

```nix
{
  programs.hyprland = { # or wayland.windowManager.hyprland for home manager
    enable = true;
    xwayland.enable = true;
  };
}
```

## Using Nix repl

If you're using Nix (and not NixOS or Home Manager) and you want to override, you can do it like this:

```nix
$ nix repl
nix-repl> :lf github:hyprwm/Hyprland
nix-repl> :bl outputs.packages.x86_64-linux.hyprland.override { /* flag here */ }
```

Then you can run Hyprland from the built path.
You can also use `overrideAttrs` to override `mkDerivation`'s arguments, such as `cmakeBuildType`:

```nix
$ nix repl
nix-repl> :lf github:hyprwm/Hyprland
nix-repl> :bl outputs.packages.x86_64-linux.hyprland.overrideAttrs (self: super: { cmakeBuildType = "Debug" })
```

## Building plugins with Nix

The plugins inside Nixpkgs, as well as the ones in `hyprland-plugins`, are built using a general function: `mkHyprlandPlugin`.
Any plugin can be made to work with it.
The general usage is presented below, exemplified through hy3's derivation:

```nix {filename="plugin.nix"}
{
  lib,
  fetchFromGitHub,
  cmake,
  hyprland,
  hyprlandPlugins,
}:
hyprlandPlugins.mkHyprlandPlugin (finalAttrs: {
  pluginName = "hy3";
  version = "0.39.1";

  src = fetchFromGitHub {
    owner = "outfoxxed";
    repo = "hy3";
    rev = "hl${finalAttrs.version}";
    hash = "sha256-PqVld+oFziSt7VZTNBomPyboaMEAIkerPQFwNJL/Wjw=";
  };

  # any nativeBuildInputs required for the plugin
  nativeBuildInputs = [cmake];

  # set any buildInputs that are not already included in Hyprland
  # by default, Hyprland and its dependencies are included
  buildInputs = [];

  meta = {
    homepage = "https://github.com/outfoxxed/hy3";
    description = "Hyprland plugin for an i3 / sway like manual tiling layout";
    license = lib.licenses.gpl3;
    platforms = lib.platforms.linux;
  };
})
```

```nix {filename="home.nix"}
{pkgs, ...}: {
  wayland.windowManager.hyprland.plugins = [
    (pkgs.callPackage ./plugin.nix {})
  ];
}
```

In a similar manner to `stdenv.mkDerivation`, `mkHyprlandPlugin` takes an attrset with mostly the same options as `mkDerivation`, as it is essentially a wrapper around it.

## Fixing problems with themes

If your themes for your mouse cursors, icons or windows don't load correctly, see the relevant section in [Hyprland with Home Manager](../configuring-hyprland-with-home-manager).

If you prefer not to use Home Manager, you can also resolve the issues with GTK themes using dconf like so:

```nix {filename="configuration.nix"}
{
  programs.dconf.profiles.user.databases = [
    {
      settings."org/gnome/desktop/interface" = {
        gtk-theme = "Adwaita";
        icon-theme = "Flat-Remix-Red-Dark";
        font-name = "Noto Sans Medium 11";
        document-font-name = "Noto Sans Medium 11";
        monospace-font-name = "Noto Sans Mono Medium 11";
      };
    }
  ];
}
```
