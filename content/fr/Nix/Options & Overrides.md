---
title: Options & Surcharges
weight: 5
---

Vous pouvez surcharger le paquet via les
mécanismes `.override` ou `.overrideAttrs`.  
Ceci est facilement réalisable sur [NixOS](../Hyprland-on-NixOS) ou
[Home Manager](../Hyprland-on-Home-Manager).

## Options du paquet

Voici les options par défaut avec lesquelles le paquet Hyprland est compilé.  
Elles peuvent être changées en définissant l'option appropriée à `true` ou `false`.

### Package (Paquet)

```nix
(pkgs.hyprland.override { # or inputs.hyprland.packages.${pkgs.stdenv.hostPlatform.system}.hyprland
  enableXWayland = true;  # whether to enable XWayland
  withSystemd = true;     # whether to build with systemd support
})
```

### Modules NixOS & HM

```nix
{
  programs.hyprland = { # or wayland.windowManager.hyprland
    enable = true;
    xwayland.enable = true;
  };
}
```

## Descriptions des options

### XWayland

XWayland est activé par défaut dans le paquet Nix.  
Vous pouvez le désactiver soit dans le paquet lui-même, soit via les options du module.

## Utiliser Nix repl

Si vous utilisez Nix (et non NixOS ou Home Manager) et que vous voulez surcharger,
vous pouvez le faire comme ceci :

```nix
$ nix repl
nix-repl> :lf github:hyprwm/Hyprland
nix-repl> :bl outputs.packages.x86_64-linux.hyprland.override { /* flag here */ }
```

Vous pouvez ensuite exécuter Hyprland depuis le chemin compilé.  
Vous pouvez aussi utiliser `overrideAttrs` pour surcharger les arguments de `mkDerivation`, tels que
`cmakeBuildType` :

```nix
$ nix repl
nix-repl> :lf github:hyprwm/Hyprland
nix-repl> :bl outputs.packages.x86_64-linux.hyprland.overrideAttrs (self: super: { cmakeBuildType = "Debug" })
```
