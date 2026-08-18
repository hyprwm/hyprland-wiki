---
weight: 45
title: Notifications
---

> [!NOTE]
> Vous cherchez l'ancienne syntaxe hyprlang ? Consultez les [pages du wiki 0.54](https://wiki.hypr.land/0.54.0/).
> Depuis Hyprland 0.55, hyprlang est devenu obsolète au profit de lua.

Cette page décrit les notifications légères intégrées de Hyprland.

> [!NOTE]
> Les notifications intégrées d'Hyprland ne sont pas destinées à gérer les notifications de votre système.
> Ce sont des popups bien plus simples, uniquement textuelles, dans le coin de votre moniteur.

## Lua

En lua, les notifications sont exposées via le module `hl.notification`.

### Fonctions

- `hl.notification.create({ text, timeout, icon?, color?, font_size? }) → HL.Notification` → Envoie une notification
- `hl.notification.get()` → Récupère une table de toutes les notifications actives sous forme d'objets `HL.Notification`

## Hyprctl

Depuis hyprctl, vous pouvez créer une notification avec la commande `hyprctl notify` :

```sh
hyprctl notify [ICON] [TIME_MS] [COLOR] [MESSAGE]
```

Voir plus dans [Utiliser Hyprctl](../Using-hyprctl/#notify)
