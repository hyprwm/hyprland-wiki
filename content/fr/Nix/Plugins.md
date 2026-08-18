---
title: Plugins
weight: 6
---

Les plugins Hyprland sont gérés différemment sur Nix que sur les autres distributions.  
Le changement le plus notable est que `hyprpm` n'est pas pris en charge, mais nous avons notre propre façon de
compiler et gérer les plugins.

> [!WARNING]
> Utiliser des plugins avec la syntaxe ci-dessous requiert d'utiliser Hyprland via
> le [module Home Manager](../Hyprland-on-Home-Manager) ou le
> [module NixOS upstream](../Hyprland-on-NixOS#upstream-module).

## Utiliser des plugins depuis Nixpkgs

Dans Nixpkgs, il existe des plugins Hyprland packagés pour la version de Hyprland dans
Nixpkgs. Vous pouvez les utiliser comme ceci :

```nix {filename="home.nix"}
{pkgs, ...}: {
  wayland.windowManager.hyprland.plugins = [
    pkgs.hyprlandPlugins.<plugin>
  ];
}
```

Vous pouvez trouver quels plugins sont inclus en utilisant
`nix search nixpkgs#hyprlandPlugins ^`.

## hyprland-plugins

Plugins officiels créés/maintenus par vaxry.

Pour utiliser ces plugins, il est recommandé d'utiliser déjà le flake
Hyprland, et **pas** la version Nixpkgs.

D'abord, ajoutez le flake à vos entrées de flake :

```nix {filename="flake.nix"}
{
  inputs = {
    hyprland.url = "github:hyprwm/Hyprland";

    hyprland-plugins = {
      url = "github:hyprwm/hyprland-plugins";
      inputs.hyprland.follows = "hyprland";
    };

    # ...
  }
}
```

La ligne `inputs.hyprland.follows` fait que hyprland-plugins utilise exactement la révision
Hyprland que vous avez verrouillée.  
Cela signifie qu'il n'y a aucune incompatibilité de version, tant que vous mettez à jour les deux entrées en même temps.

L'étape suivante consiste à ajouter les plugins à Hyprland :

```nix {filename="home.nix"}
{inputs, pkgs, ...}: {
  wayland.windowManager.hyprland = {
    enable = true;

    plugins = [
      inputs.hyprland-plugins.packages.${pkgs.stdenv.hostPlatform.system}.<plugin>
    ];
  };
}
```

## Compiler des plugins avec Nix

Les plugins dans Nixpkgs, ainsi que ceux dans `hyprland-plugins`, sont compilés
en utilisant une fonction générale : `mkHyprlandPlugin`.  
N'importe quel plugin peut être adapté pour fonctionner avec. L'utilisation générale est présentée ci-dessous, illustrée à travers la
dérivation de hy3 :

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

D'une manière similaire à `stdenv.mkDerivation`, `mkHyprlandPlugin` prend un
attrset avec principalement les mêmes options que `mkDerivation`, puisque c'est essentiellement un
wrapper autour de celui-ci.
