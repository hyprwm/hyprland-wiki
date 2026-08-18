---
weight: 2
title: Directives pour les plugins
---

Cette page documente les directives recommandées pour créer un plugin stable et
soigné.

## Rendre votre plugin compatible avec hyprpm

Pour que votre plugin soit installable par `hyprpm`, vous avez besoin d'un manifeste.

`hyprpm` analysera les manifestes `hyprload` sans problème, mais il est recommandé d'utiliser
le manifeste hyprpm, plus puissant.

Créez un fichier à la racine de votre dépôt nommé `hyprpm.toml`.

### Métadonnées du dépôt

Au début, placez quelques métadonnées à propos de votre plugin :

```toml {filename="hyprpm.toml"}
[repository]
name = "MyPlugin"
authors = ["Me"]
commit_pins = [
    ["3bb9c7c5cf4f2ee30bf821501499f2308d616f94", "efee74a7404495dbda70205824d6e9fc923ccdae"],
    ["d74607e414dcd16911089a6d4b6aeb661c880923", "efee74a7404495dbda70205824d6e9fc923ccdae"]
]
```

`name` et `authors` sont requis. `commit_pins` est optionnel. Voir
[commit pins](#commit-pins) pour plus d'infos.

### Plugins

Pour chaque plugin, créez une catégorie comme celle-ci :

```toml {filename="hyprpm.toml"}
[plugin-name]
description = "An epic plugin that will change the world!"
authors = ["Me"]
output = "plugin.so"
build = [
    "make all"
]
```

`description`, `authors` sont optionnels. `output` et `build` sont requis.

`build` sont les commandes que `hyprpm` exécutera à la racine du dépôt pour compiler
le plugin. Chaque commande réinitialisera le répertoire de travail (cwd) à la racine du dépôt.

`output` est le chemin vers le fichier `.so` de sortie depuis la racine du dépôt.

### Commit pins

Les commit pins vous permettent de gérer le versionnage de votre plugin. Ce sont des paires de
`hash,hash`, où le premier hash est le hash de commit Hyprland, et le second est
le hash de commit correspondant de votre plugin.

Par exemple, dans le manifeste ci-dessus, `d74607e414dcd16911089a6d4b6aeb661c880923`
correspond à la version `0.33.1` de Hyprland, ce qui signifie que si quelqu'un
utilise `0.33.1`, `hyprpm` réinitialisera votre plugin au hash de commit
`efee74a7404495dbda70205824d6e9fc923ccdae`.

Il est recommandé d'ajouter un pin pour chaque version de Hyprland. Si aucun pin ne correspond,
la dernière version git sera utilisée.

## Formatage

Bien que les plugins Hyprland ne soient évidemment pas _tenus_ de suivre le formatage, les
conventions de nommage, etc. de Hyprland, cela pourrait être une bonne idée de garder votre code
cohérent. Voir
[`.clang-format`](https://github.com/hyprwm/Hyprland/blob/main/.clang-format) dans
le dépôt Hyprland.

## Utilisation de l'API

Il est toujours conseillé d'utiliser les entrées de l'API autant que possible, car elles ont
une stabilité garantie tant que la version correspond.

Il est, bien sûr, possible d'utiliser les méthodes internes en incluant simplement les
headers appropriés, mais cela ne devrait pas être traité comme la façon par défaut de faire les choses.

Les méthodes internes de Hyprland peuvent être changées, retirées ou ajoutées sans aucun préavis.
Il vaut cependant la peine de noter que les méthodes qui « semblent » fondamentales, comme
par exemple `focusWindow` ou `mouseMoveUnified`, le sont probablement, et sont peu susceptibles de
changer leur façon générale de fonctionner.

## Hooks de fonction

Les hooks de fonction permettent à votre plugin d'intercepter tous les appels à une fonction de votre
choix. Ils doivent être traités comme un dernier recours, car ce sont la chose la plus facile
à casser entre les mises à jour.

Préférez toujours utiliser les Hooks d'événement (Event Hooks).

## Threads

La boucle d'événements Wayland est strictement mono-thread. Il n'est pas recommandé de
créer des threads dans votre code, sauf s'ils sont complètement détachés du processus Hyprland.
(par ex. sauvegarder un fichier)
