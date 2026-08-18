---
weight: 60
title: XWayland
---

> [!NOTE]
> Vous cherchez l'ancienne syntaxe hyprlang ? Consultez les [pages du wiki 0.54](https://wiki.hypr.land/0.54.0/).
> Depuis Hyprland 0.55, hyprlang est devenu obsolète au profit de lua.

XWayland est le mécanisme de pont entre les anciens programmes Xorg et les compositeurs
Wayland.

## XWayland en HiDPI

XWayland paraît actuellement pixellisé sur les écrans HiDPI, en raison de l'incapacité de Xorg à
gérer la mise à l'échelle.

Ce problème est atténué par l'option
[`hl.config({ xwayland = { force_zero_scaling = true } })`](../../Basics/Variables/#xwayland),
qui force les fenêtres XWayland à ne pas être mises à l'échelle.

Cela éliminera l'aspect pixellisé, mais ne mettra pas correctement à l'échelle les applications.
Pour cela, chaque toolkit a son propre mécanisme.

```lua
-- change monitor to high resolution, the last argument is the scale factor
hl.monitor({ output = "", mode = "highres", position = "auto", scale = "2" })

-- unscale XWayland
hl.config({
  xwayland = {
    force_zero_scaling = true
  }
})

-- toolkit-specific scale
hl.env("GDK_SCALE", "2")
hl.env("XCURSOR_SIZE", "32")
```

La variable GDK_SCALE n'entrera pas en conflit avec les programmes GTK natifs Wayland.

> [!WARNING]
> Les patchs XWayland HiDPI ne sont plus pris en charge. Ne les utilisez pas.

## Socket Unix domain abstrait

Les applications X11 utilisent des sockets Unix domain pour communiquer avec XWayland. Sur Linux, libX11 préfère
utiliser le socket Unix domain abstrait. Ce type de socket utilise un espace de noms abstrait
séparé, indépendant du système de fichiers hôte. Cela rend les sockets abstraits plus flexibles
mais plus difficiles à [isoler](https://github.com/hyprwm/Hyprland/pull/8874)
pour certains types de bacs à sable comme Flatpak. Cependant, supprimer le socket abstrait
présente [potentiellement](https://gitlab.gnome.org/GNOME/mutter/-/issues/1613) des problèmes
de sécurité et de compatibilité.

En gardant cela à l'esprit, nous ajoutons l'option [`xwayland:create_abstract_socket`](../../Basics/Variables/#xwayland).
Quand le socket abstrait est désactivé, seul le socket Unix domain
classique sera créé.

_\* Les sockets Unix domain abstraits ne sont disponibles que sur les systèmes basés sur Linux_
