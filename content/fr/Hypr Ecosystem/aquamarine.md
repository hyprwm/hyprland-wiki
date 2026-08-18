---
weight: 105
title: aquamarine
---

[aquamarine](https://github.com/hyprwm/aquamarine) est une bibliothèque de backend de rendu Linux très légère.

Elle n'est pas un remplacement ou un concurrent d'une quelconque autre bibliothèque de compositeur wayland (par ex. wlroots, libweston), mais implémente à la place uniquement les backends de rendu bas niveau KMS/DRM/etc.

## Configuration

Les options de configuration sont transmises via des variables d'environnement commençant par `AQ_` à une application qui utilise aquamarine, par ex. Hyprland.

### Variables

| Nom | Description |
| --- | --- |
| `AQ_TRACE` | Active la journalisation de trace (très, très verbeuse). |
| `AQ_DRM_DEVICES` | Une liste de périphériques DRM (c.-à-d. GPU) à utiliser, séparés par des deux-points. <br> Le premier sera utilisé comme principal. <br> Exemple : `/dev/dri/card1:/dev/dri/card0`. |
| `AQ_NO_MODIFIERS` | Désactive les modificateurs pour les tampons DRM. |
| `AQ_MGPU_NO_EXPLICIT` | Désactive la transmission de fences explicites pour les scanouts multi-GPU |
| `AQ_NO_ATOMIC` | **(FORTEMENT DÉCONSEILLÉ)** Désactive le mode de réglage atomique (atomic modesetting). |

## Documentation

La documentation arrivera bientôt.
