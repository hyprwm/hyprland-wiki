---
weight: 7
title: Nix
---

Pour installer Hyprland sur NixOS, nous fournissons un module NixOS et un module Home Manager.

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

## Module NixOS

```nix {filename="configuration.nix"}
{
  programs.hyprland.enable = true;
  # Optional, hint electron apps to use wayland:
  # environment.sessionVariables.NIXOS_OZONE_WL = "1";
}
```

Pour les autres options NixOS, voir [Hyprland sur NixOS](./Hyprland-on-NixOS).  
Pour des options supplémentaires, voir
[les options du module](https://search.nixos.org/options?channel=unstable&from=0&size=50&sort=relevance&type=packages&query=hyprland).


## Module Home Manager

Lisez [Hyprland sur Home Manager](./Hyprland-on-Home-Manager).

Pour les plus aventureux, [@spikespaz](https://github.com/spikespaz) a créé un
module Hyprland utilisable dans Home Manager et NixOS. Vous pouvez le trouver
[ici](https://github.com/hyprland-community/hyprnix).

## Options et surcharges

Lisez [Options & Surcharges](./Options-Overrides).

## Overlays

### default

L'overlay Hyprland `default` ne contient que le paquet Hyprland accompagné de xdg-desktop-portal-hyprland, et des dépendances internes de Hyprland (udis86-hyprland et glaze-hyprland).

Cela signifie que vous devez importer vous-même tous les overlays pour les dépendances hypr* si vous voulez qu'elles soient à jour. Sinon, Hyprland compilera avec les versions disponibles dans Nixpkgs.

### hyprland-packages

Si vous voulez plutôt un overlay avec toutes les dépendances, importez à la fois les overlays `hyprland-packages` et `hyprland-extras`.

> [!NOTE]
> Les dépendances peuvent parfois être obsolètes et impacter d'autres applications hypr*. Par ex. <https://github.com/hyprwm/Hyprland/discussions/13396>. Dans de tels cas, notifiez (ping) les mainteneurs pour qu'ils mettent à jour les fichiers de verrouillage, ou utilisez l'overlay `default`.
