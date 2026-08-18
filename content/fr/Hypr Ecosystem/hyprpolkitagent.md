---
weight: 11
title: hyprpolkitagent
---

[hyprpolkitagent](https://github.com/hyprwm/hyprpolkitagent) est un démon(deamon) d'authentification polkit. Il est requis pour que les applications GUI
puissent demander des privilèges élevés.

S'il n'est pas disponible dans les dépôts de votre distribution, vous pouvez soit [le compiler depuis les sources](https://github.com/hyprwm/hyprpolkitagent)
soit utiliser un agent différent, par ex. [celui de KDE](https://github.com/KDE/polkit-kde-agent-1/).

## Utilisation

Ajoutez `systemctl --user start hyprpolkitagent` au démarrage automatique de votre configuration Hyprland et redémarrez hyprland.
(changez évidemment cela selon ce que vous utilisez si vous n'utilisez pas celui de hypr)

Si Hyprland est démarré avec [uwsm](../../Useful-Utilities/Systemd-start), vous pouvez démarrer automatiquement l'agent polkit avec la commande `systemctl --user enable --now hyprpolkitagent.service`.

Sur les distributions qui utilisent un système d'init différent, comme Gentoo, il peut être
nécessaire d'utiliser
`/usr/lib64/libexec/hyprpolkitagent` à la place.

D'autres chemins possibles incluent
`/usr/lib/hyprpolkitagent` et
`/usr/libexec/hyprpolkitagent`.
