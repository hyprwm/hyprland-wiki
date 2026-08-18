---
weight: 12
title: hyprland-qt-support
---

[hyprland-qt-support](https://github.com/hyprwm/hyprland-qt-support) fournit un style QML pour les applications qt6 de hypr*. 

## Configuration

Le fichier de configuration se trouve dans `~/.config/hypr/application-style.conf`.


| Variable | Description | Type | Par défaut |
| --- | --- | --- | --- |
| `roundness` | À quel point arrondir les éléments de l'UI. | int \[0 .. 3] | `1` |
| `border_width` | La largeur de la bordure autour des éléments de l'UI. | int \[0 - 3] | `1` |
| `reduce_motion` | Réduit le mouvement des éléments (transitions, effets de survol, etc). | bool | `false` |