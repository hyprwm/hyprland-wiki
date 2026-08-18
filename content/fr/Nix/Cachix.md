---
title: Cachix
weight: 4
---

> [!NOTE]
> Cette page ne s'applique qu'au paquet flake.  
> Vous pouvez sans problème l'ignorer si vous utilisez le paquet Nixpkgs.

Le flake Hyprland n'est pas compilé par Hydra, il n'est donc pas mis en cache dans
[cache.nixos.org], contrairement au reste de Nixpkgs.

Plutôt que de vous demander de compiler Hyprland (et ses dépendances, qui peuvent
inclure `mesa`, `ffmpeg`, etc), nous fournissons un cache Cachix que vous pouvez ajouter à
votre configuration Nix.

Le [Cachix Hyprland](https://app.cachix.org/cache/hyprland) existe pour mettre en cache les
paquets `hyprland` et toute dépendance non trouvée dans [cache.nixos.org].

> [!WARNING]
> Pour que Nix profite du cache, il doit être activé **avant**
> d'utiliser le paquet flake Hyprland.

```nix {filename="configuration.nix"}
{
  nix.settings = {
    substituters = ["https://hyprland.cachix.org"];
    trusted-substituters = ["https://hyprland.cachix.org"];
    trusted-public-keys = ["hyprland.cachix.org-1:a7pgxzMz7+chwVL3/pzj6jIBMioiJM7ypFP8PwtkuGc="];
    # Required so non-root users are allowed to use the above substituter/keys.
    # Use @wheel for all sudo users, or list your username explicitly.
    trusted-users = ["root" "@wheel"];
  };
}
```

> [!NOTE]
> Si vous voyez `ignoring the client-specified setting 'trusted-public-keys',
> because it is a restricted setting and you are not a trusted user`, votre utilisateur
> n'est pas dans `trusted-users`. Ajoutez-le comme montré ci-dessus et recompilez.

> [!WARNING]
>  Ne surchargez **pas** l'entrée `nixpkgs` de Hyprland
> à moins de savoir ce que vous faites.  
> Cela rendra le cache inutile, puisque vous compilez depuis un commit
> Nixpkgs différent. 

[cache.nixos.org]: https://cache.nixos.org
