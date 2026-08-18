---
title: Contribuer et déboguer
weight: 7
---

Tout ce qui est nécessaire pour compiler et déboguer Hyprland et les autres programmes hyprwm est
inclus dans les `devShell`s fournis.

Pour l'utiliser dans le dépôt cloné, exécutez simplement `nix develop`.

## Compiler en mode debug

Une compilation debug est déjà fournie via
`hyprland.packages.${pkgs.stdenv.hostPlatform.system}.hyprland-debug`.

La plupart des applications hyprwm fournissent aussi leurs propres versions `-debug`. Pour celles qui n'en ont pas,
on peut compiler la version debug depuis la CLI en utilisant
[overrideAttrs](../Options-Overrides/#using-nix-repl) avec
`cmakeBuildType = "Debug";` ou `mesonBuildType = "debug";`, selon le
programme.

## Faire un bisect sur un problème

Suivez le guide
[Faire un bisect sur un problème](https://wiki.hypr.land/Crashes-and-Bugs/#bisecting-an-issue).
Pour compiler, exécutez `nix build`.

> [!WARNING]
> Pour compiler avec le support Tracy, modifiez `nix/default.nix` pour activer le drapeau, puis exécutez
> `nix build '.?submodules=1'`.

Pour voir les journaux, passez le drapeau `--print-build-logs` (`-L`).

Pour conserver un répertoire de compilation échoué, passez le drapeau `--keep-failed`.

## Compiler la pile Wayland avec ASan

Exécutez d'abord `nix develop`, puis suivez le
[Compiler avec ASan](https://wiki.hypr.land/Crashes-and-Bugs/#building-the-wayland-stack-with-asan)
guide.

## Obtenir une trace de pile de debug

Les traces de pile de debug fournissent des informations utiles sur pourquoi un programme a planté. Pour obtenir des
traces de pile correctes depuis Hyprland, assurez-vous qu'il a été [compilé en mode debug](#build-in-debug-mode).

Après un plantage, effectuez les étapes suivantes :

```sh
nix shell nixpkgs#gdb # get gdb temporarily
coredumpctl # check the PID of the recent crash
coredumpctl debug <PID> # using the PID found in the previous step
```

Le reste du processus est identique à
[ici](../../Crashes-and-Bugs#obtaining-a-debug-stacktrace), à partir de l'étape 3.

## Compilation manuelle

Nix fonctionne différemment des autres systèmes de compilation, il possède donc ses propres abstractions
par-dessus des systèmes de compilation populaires comme Meson, CMake et Ninja.

Pour compiler Hyprland manuellement, vous pouvez exécuter les commandes suivantes, tout en
étant dans le shell `nix develop`.

Pour CMake :

```bash
cmakeConfigurePhase # to run the CMake configure phase
buildPhase     # to run the build phase
installPhase   # to run the install phase
```

Pour Meson :

```bash
mesonConfigurePhase # to run the Meson configure phase
ninjaBuildPhase     # to run the Ninja build phase
mesonInstallPhase   # to run the Meson install phase
```
