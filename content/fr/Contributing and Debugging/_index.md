---
weight: 13
title: Contribuer et déboguer
---

Les PR, le style de code et les FAQ sur le code sont [ici](./PR-Guidelines)

Pour les problèmes (issues), veuillez consulter
[les directives](https://github.com/hyprwm/Hyprland/blob/main/docs/ISSUE_GUIDELINES.md)

## Compiler en mode debug

### Paquets requis

Voir [compilation manuelle](https://wiki.hypr.land/Getting-Started/Installation/#manual-manual-build) pour les dépendances.

### Recommandé, CMake

Installez les extensions VSCode C/C++ et CMake Tools et utilisez-les.

J'ai joint un
[example/launch.json](https://github.com/hyprwm/Hyprland/blob/main/example/launch.json)
que vous pouvez copier dans votre dossier .vscode/ à la racine du dépôt.

Avec cela, vous pouvez compiler en debug, aller dans l'onglet de débogage et cliquer sur
`(gdb) Launch`.

### Personnalisé, CLI

`make debug`

Attachez-vous et profilez de la manière que vous préférez.

### Nix

Pour compiler le paquet en mode debug, vous devez le surcharger comme ceci :

```nix
hyprland.override {
  debug = true;
};
```

Ce code peut être placé dans l'attribut `package` des modules NixOS/Home Manager.

## Environnement de développement

### Configuration

Faites une copie de votre configuration dans `~/.config/hypr` nommée `hyprlandd.lua`. Les
compilations `Debug` utilisent automatiquement `hyprlandd.lua`, mais vous pouvez aussi passer `--config ~/path/to/conf.lua`
pour une surcharge sur un fichier release / différent.

#### Changements de configuration debug recommandés

- retirez _toutes_ les directives d'exécution automatique de votre configuration.
- changez le modificateur par défaut pour les raccourcis (par ex. `SUPER` -> `ALT`)

#### Lancer l'environnement de dev

Lancez le binaire `Hyprland` généré dans `./build/` _en étant connecté à une session
Hyprland_.

Une nouvelle fenêtre devrait s'ouvrir avec Hyprland s'exécutant à l'intérieur. Vous pouvez maintenant tester des choses
dans la session imbriquée sans vous soucier de détruire votre session
réelle, tout en pouvant facilement la déboguer. Je recommanderais aussi de lancer Hyprland
avec une sorte de débogueur, comme `gdb`. Votre IDE (si vous en utilisez un) peut probablement le faire
pour vous, sinon `gdb ./build/Hyprland` devrait suffire. Cela vous aidera à déboguer les
plantages.

Avec gdb, quand Hyprland plante, gdb s'arrêtera et vous permettra d'inspecter l'état actuel
avec des commandes comme `bt`, `frame`, `print`, etc. Un IDE vous permettra de le faire
graphiquement.

## LSP et formatage

Si vous voulez un support LSP correct dans un éditeur qui ne le configure pas
automatiquement, utilisez clangd. Vous remarquerez probablement qu'il y aura un tas d'avertissements
parce que nous n'avons pas généré de compile commands ; pour le faire, exécutez :

```sh
cmake -S . -B build/ -G Ninja -DCMAKE_EXPORT_COMPILE_COMMANDS=ON
```

De plus, avant de soumettre une PR, veuillez formater avec clang-format ; pour l'exécuter uniquement
sur vos changements, lancez `git-clang-format` à la racine de votre projet.

## Journaux, dumps, etc.

Vous pouvez utiliser les journaux et le débogueur GDB, mais exécuter Hyprland en compilation debug
comme pilote et l'utiliser pendant un moment pourrait donner plus d'informations sur les
bugs les plus aléatoires.

Quand Hyprland plante, utilisez `coredumpctl` puis `coredumpctl info PID` pour voir
le dump. Voir les instructions ci-dessous pour plus d'infos sur `coredumpctl`.

Vous pouvez aussi utiliser la commande géniale

```sh
watch -n 0.1 "grep -v \"arranged\" $XDG_RUNTIME_DIR/hypr/$HYPRLAND_INSTANCE_SIGNATURE/hyprland.log | tail -n 40"
```

pour des journaux en direct. (remplacez `hyprland` par `hyprlandd` pour les compilations debug)

### Comment obtenir un coredump ?

Voir
[`ISSUE_GUIDELINES.md`](https://github.com/hyprwm/Hyprland/blob/main/docs/ISSUE_GUIDELINES.md).

## Obtenir un vouch

Avant de soumettre une PR, vous devez être vouched (parrainé), sinon votre PR sera automatiquement fermée.

Maintenant que vous avez lu tout ce qui précède, vous êtes prêt à faire une demande de vouch.

Merci de faire une demande de vouch [ici](https://github.com/hyprwm/.github/discussions) si vous le souhaitez.
