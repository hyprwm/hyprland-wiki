---
title: Hyprland sur NixOS
weight: 1
---

Le module NixOS active les composants critiques nécessaires pour faire fonctionner Hyprland correctement,
tels que polkit,
[xdg-desktop-portal-hyprland](https://github.com/hyprwm/xdg-desktop-portal-hyprland),
les pilotes graphiques, les polices, dconf, xwayland, et l'ajout d'une entrée de bureau appropriée à
votre gestionnaire de connexion.

Assurez-vous de consulter les options du
[module NixOS](https://search.nixos.org/options?channel=unstable&from=0&size=50&sort=relevance&type=packages&query=hyprland).

> [!WARNING]
> **Requis :**
> - **Module NixOS :** active les composants critiques nécessaires pour faire fonctionner Hyprland correctement.  
>   Sans cela, vous pourriez avoir des problèmes de fichiers de session manquants dans votre
>     gestionnaire de connexion.
> 
> **Optionnel** :
> - **Module Home Manager :** vous permet de configurer Hyprland de manière déclarative via Home Manager.  
> - Configure Hyprland et l'ajoute au `$PATH` de votre utilisateur, mais
>     ne fait pas certains changements au niveau système comme ajouter un fichier
>     de session de bureau pour votre gestionnaire de connexion.  
>     Ceci est géré par le module NixOS, une fois que vous l'activez.

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

Cela utilisera la version de Hyprland incluse dans la release Nixpkgs que vous utilisez.

{{< /tab >}}

{{< tab >}}

> [!NOTE]
> Si vous ne voulez pas compiler Hyprland vous-même, assurez-vous d'activer [Cachix](../Cachix).

Si vous voulez utiliser la version _développement_ de Hyprland, vous pouvez l'ajouter comme
ceci :

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

N'oubliez pas de changer `HOSTNAME` par votre nom d'hôte réel !

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

Si vous utilisez le module Home Manager, vous devrez aussi/plutôt ajouter ces lignes là-bas

Si vous commencez à rencontrer du lag et des chutes de FPS dans des jeux ou des programmes comme Blender sur
NixOS **stable** en utilisant le flake Hyprland, c'est très probablement une incompatibilité de
version de `mesa` entre votre système et Hyprland.

Vous pouvez corriger ce problème en utilisant le `mesa` de l'entrée `nixpkgs` de Hyprland :

```nix {filename="configuration.nix"}
{pkgs, inputs, ...}: let
  pkgs-unstable = inputs.hyprland.inputs.nixpkgs.legacyPackages.${pkgs.stdenv.hostPlatform.system};
in {
  hardware.graphics = {
    package = pkgs-unstable.mesa;

    # if you also want 32-bit support (e.g for Steam)
    enable32Bit = true;
    package32 = pkgs-unstable.pkgsi686Linux.mesa;
  };
}
```

Pour plus de détails, voir
[issue #5148](https://github.com/hyprwm/Hyprland/issues/5148).

{{< /tab >}}

{{< tab "Nix stable" >}}

> [!NOTE]
> Si vous ne voulez pas compiler Hyprland vous-même, assurez-vous d'activer [Cachix](../Cachix).

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

## Corriger les problèmes de thèmes

Si vos thèmes pour vos curseurs de souris, icônes ou fenêtres ne se chargent pas correctement, consultez la
section correspondante dans [Hyprland sur Home Manager](../Hyprland-on-Home-Manager).

Si vous préférez ne pas utiliser Home Manager, vous pouvez aussi résoudre les problèmes avec les thèmes
GTK en utilisant dconf comme ceci :

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

## Module upstream

Le [module upstream](https://github.com/hyprwm/Hyprland/blob/main/nix/module.nix)
fournit des options similaires à celles du [module Home Manager](../Hyprland-on-Home-Manager).

Pour l'utiliser, ajoutez simplement

```nix
{inputs, ...}: {
  imports = [inputs.hyprland.nixosModules.default];

  programs.hyprland = {
    # usual Nixpkgs module options
    plugins = [
      #...
    ];
    settings = {
      # ...
    };
  };
}
```
