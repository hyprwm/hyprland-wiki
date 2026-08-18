---
weight: 11
title: Démarrage automatique
---

> [!NOTE]
> Vous cherchez l'ancienne syntaxe hyprlang ? Consultez les [pages du wiki 0.54](https://wiki.hypr.land/0.54.0/).
> Depuis Hyprland 0.55, hyprlang est devenu obsolète au profit de lua.

Le démarrage automatique d'applications peut être fait en exécutant des éléments sur l'événement `hyprland.start` :

```lua
hl.on("hyprland.start", function () 
  hl.exec_cmd(terminal)
  hl.exec_cmd("nm-applet")
  hl.exec_cmd("waybar & hyprpaper & firefox") -- Execute waybar, hyprpaper, firefox
end)
```

`hl.exec_cmd()` génère un processus asynchrone, il n'y a donc pas besoin d'ajouter `& disown` à la fin.

Dans le même ordre d'idées, vous pouvez générer des processus à la fermeture en écoutant `hyprland.shutdown`.

Pour en savoir plus sur `hl.on`, consultez [Étendre les fonctionnalités](../../Advanced-and-Cool/Expanding-functionality)
et [systemd](../../../Useful-Utilities/Systemd-start#autostart) pour le démarrage automatique des services utilisateur.
