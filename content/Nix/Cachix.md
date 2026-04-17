---
title: Cachix
weight: 4
---

> [!NOTE]
> This page only applies to the flake package.  
> You can safely skip this if you use the Nixpkgs package.

The Hyprland flake is not built by Hydra, so it is not cached in
[cache.nixos.org], like the rest of Nixpkgs.

Instead of requiring you to build Hyprland (and its dependencies, which may
include `mesa`, `ffmpeg`, etc), we provide the
[Hyprland Cachix](https://app.cachix.org/cache/hyprland) cache that you can add
to your Nix configuration.

```nix {filename="flake.nix"}
{
  nixConfig = {
    extra-substituters = [
      "https://hyprland.cachix.org/"
    ];
    extra-trusted-public-keys = [
      "hyprland.cachix.org-1:a7pgxzMz7+chwVL3/pzj6jIBMioiJM7ypFP8PwtkuGc="
    ];
  };
}
```

> [!WARNING]
> Do **not** override Hyprland's `nixpkgs` input unless you know what you are doing.  
> Doing so could cache miss and force a local Hyprland compilation. 

[cache.nixos.org]: https://cache.nixos.org
