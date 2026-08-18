---
title: Hyprland sur Home Manager
weight: 3
---

Pour une liste des options disponibles, consultez les
[options Home Manager](https://nix-community.github.io/home-manager/options.xhtml#opt-wayland.windowManager.hyprland.enable).

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

## Installation

{{< tabs items="Home Manager,Flakes,Nix stable (with flake-compat)" >}}

{{< tab "Home Manager" >}}

```nix {filename="home.nix"}
{
  programs.kitty.enable = true; # required for the default Hyprland config
  wayland.windowManager.hyprland.enable = true; # enable Hyprland

  # Optional, hint Electron apps to use Wayland:
  # home.sessionVariables.NIXOS_OZONE_WL = "1";
}
```

{{< /tab >}}

{{< tab "Flakes" >}}

L'extrait de code suivant tente de montrer comment récupérer le flake Hyprland depuis
l'entrée de flake et utiliser ses paquets avec Home Manager. N'hésitez pas à faire
tout ajustement pour votre configuration.

N'oubliez pas de remplacer `user@hostname` par votre nom d'utilisateur et votre nom d'hôte !

```nix {filename="flake.nix"}
{
  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";

    home-manager = {
      url = "github:nix-community/home-manager";
      inputs.nixpkgs.follows = "nixpkgs";
    };

    hyprland.url = "github:hyprwm/Hyprland";
  };

  outputs = {nixpkgs, home-manager, hyprland, ...}: {
    homeConfigurations."user@hostname" = home-manager.lib.homeManagerConfiguration {
      pkgs = nixpkgs.legacyPackages.x86_64-linux;

      modules = [
        {
          wayland.windowManager.hyprland = {
            enable = true;
            # set the flake package
            package = inputs.hyprland.packages.${pkgs.stdenv.hostPlatform.system}.hyprland;
            portalPackage = inputs.hyprland.packages.${pkgs.stdenv.hostPlatform.system}.xdg-desktop-portal-hyprland;
          };
        }
        # ...
      ];
    };
  };
}
```

{{< /tab >}}

{{< tab "Nix stable (with flake-compat)" >}}

> [!WARNING]
> Le module flake est simplement une extension au module Home Manager downstream.
> Il est principalement utilisé comme zone de test pour les nouvelles options, donc à moins que vous ne soyez un testeur
> vous devriez utiliser le module Home Manager downstream.

L'extrait de code suivant tente de montrer comment récupérer le flake Hyprland depuis
l'entrée de flake et utiliser le paquet dans l'option Home Manager. N'hésitez pas à
faire tout ajustement pour votre configuration.

```nix {filename="home.nix"}
{pkgs, ...}: let
  flake-compat = builtins.fetchTarball "https://github.com/edolstra/flake-compat/archive/master.tar.gz";

  hyprland = (import flake-compat {
    src = builtins.fetchTarball "https://github.com/hyprwm/Hyprland/archive/main.tar.gz";
  }).defaultNix;
in {
  wayland.windowManager.hyprland = {
    enable = true;
    # set the flake package
    package = hyprland.packages.${pkgs.stdenv.hostPlatform.system}.hyprland;
    portalPackage = hyprland.packages.${pkgs.stdenv.hostPlatform.system}.xdg-desktop-portal-hyprland;
  }
}
```

{{< /tab >}}

{{< /tabs >}}

## Utilisation

Une fois le module activé, vous pouvez l'utiliser pour configurer Hyprland de manière déclarative.
Voici un exemple de configuration :

```nix {filename="home.nix"}
{
  wayland.windowManager.hyprland.settings = {
    "$mod" = "SUPER";
    bind =
      [
        "$mod, F, exec, firefox"
        ", Print, exec, grimblast copy area"
      ]
      ++ (
        # workspaces
        # binds $mod + [shift +] {1..9} to [move to] workspace {1..9}
        builtins.concatLists (builtins.genList (i:
            let ws = i + 1;
            in [
              "$mod, code:1${toString i}, workspace, ${toString ws}"
              "$mod SHIFT, code:1${toString i}, movetoworkspace, ${toString ws}"
            ]
          )
          9)
      );
  };
}
```

## Plugins

Les plugins Hyprland peuvent être ajoutés via l'option `plugins` :

```nix {filename="home.nix"}
{
  wayland.windowManager.hyprland.plugins = [
    inputs.hyprland-plugins.packages.${pkgs.stdenv.hostPlatform.system}.hyprbars
    "/absolute/path/to/plugin.so"
  ];
}
```

Pour des exemples sur comment compiler des plugins Hyprland en utilisant Nix, voir la
page [Nix/Plugins](../Plugins).

## FAQ

### Corriger les problèmes de thèmes

Si vos thèmes pour les curseurs de souris, icônes ou fenêtres ne se chargent pas correctement, essayez de
les définir avec `home.pointerCursor` et `gtk.theme`, qui activent tout un tas d'options de
compatibilité qui devraient faire charger les thèmes dans toutes les situations.

Exemple de configuration :

```nix {filename="home.nix"}
{
  home.pointerCursor = {
    gtk.enable = true;
    # x11.enable = true;
    package = pkgs.bibata-cursors;
    name = "Bibata-Modern-Classic";
    size = 16;
  };

  gtk = {
    enable = true;

    theme = {
      package = pkgs.flat-remix-gtk;
      name = "Flat-Remix-GTK-Grey-Darkest";
    };

    iconTheme = {
      package = pkgs.adwaita-icon-theme;
      name = "Adwaita";
    };

    font = {
      name = "Sans";
      size = 11;
    };
  };
}
```

### Utiliser le module Home-Manager avec NixOS

Si vous voulez utiliser le module Home Manager tout en utilisant le paquet Hyprland que vous avez
défini dans votre module NixOS, vous pouvez maintenant le faire tant que vous utilisez
[Home Manager `5dc1c2e40410f7dabef3ba8bf4fdb3145eae3ceb`](https://github.com/nix-community/home-manager/commit/5dc1c2e40410f7dabef3ba8bf4fdb3145eae3ceb)
ou ultérieur en définissant vos `package` et `portalPackage` à `null`.

```nix {filename="home.nix"}
{
  wayland.windowManager.hyprland = {
    enable = true;
    # set the Hyprland and XDPH packages to null to use the ones from the NixOS module
    package = null;
    portalPackage = null;
  };
}
```

Assurez-vous de **ne pas** mélanger les versions de Hyprland et XDPH.
Si votre configuration NixOS utilise Hyprland depuis le flake, vous devriez aussi utiliser XDPH depuis le flake.
Si vous définissez le paquet du module Hyprland de Home Manager à `null`, vous devriez aussi définir le paquet XDPH à `null`.

### Les programmes ne fonctionnent pas dans les services systemd, mais fonctionnent dans le terminal

Ce problème est lié au fait que systemd n'importe pas l'environnement par défaut. Il
n'aura pas connaissance de `PATH`, il ne peut donc pas exécuter les commandes dans les
services. C'est le plus courant avec les services configurés par l'utilisateur comme
`hypridle` ou `swayidle`.

Pour corriger cela, ajoutez à votre configuration :

```nix {filename="home.nix"}
{
  wayland.windowManager.hyprland.systemd.variables = ["--all"];
}
```

Ce paramètre produira l'entrée suivante dans la configuration Hyprland :

```ini {filename="hyprland.conf"}
exec-once = dbus-update-activation-environment --systemd --all
```

Assurez-vous d'utiliser la commande ci-dessus si vous n'utilisez pas le module Home Manager.

#### NixOS UWSM

Si vous utilisez le module NixOS avec UWSM (`programs.hyprland.withUWSM =
true`), vous pouvez [définir des variables d'environnement][uwsm-env] comme ceci :

```nix {filename="home.nix"}
{
  xdg.configFile."uwsm/env".source = "${config.home.sessionVariablesPackage}/etc/profile.d/hm-session-vars.sh"; 
}
```

[uwsm-env]: https://github.com/Vladimir-csp/uwsm?tab=readme-ov-file#4-environments-and-shell-profile "Environments and shell profile - UWSM"
