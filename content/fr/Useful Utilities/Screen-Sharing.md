---
weight: 4
title: Partage d'écran
---

Le partage d'écran se fait via PipeWire sur Wayland.

## Prérequis

Assurez-vous d'avoir `pipewire`, `wireplumber` et
[`xdg-desktop-portal-hyprland`](../../Hypr-Ecosystem/xdg-desktop-portal-hyprland)
installés, activés et en cours d'exécution si vous ne les avez pas encore.

Assurez-vous que le `bitdepth` défini dans votre configuration
correspond à celui de votre moniteur physique.
Voir [Moniteurs](../../Configuring/Basics/Monitors).

## Partage d'écran

Lisez
[cet excellent gist de Bruno Ancona Sala](https://gist.github.com/brunoanc/2dea6ddf6974ba4e5d26c3139ffb7580)
pour un très bon tutoriel.

## XWayland

Si votre application de partage d'écran s'exécute sous XWayland (comme Discord ou
Skype), elle ne peut voir que d'autres fenêtres XWayland et ne peut pas partager un
écran entier ou une fenêtre Wayland.

L'équipe KDE a implémenté un contournement pour cela appelé
[xwaylandvideobridge](https://invent.kde.org/system/xwaylandvideobridge). Vous
pouvez utiliser
[ce paquet AUR](https://aur.archlinux.org/packages/xwaylandvideobridge-git)
sur Arch Linux. Notez que Hyprland ne prend actuellement pas en charge sa façon de
masquer la fenêtre principale, vous devrez donc créer quelques règles de fenêtre pour obtenir
le même effet. Voir
[cette issue](https://invent.kde.org/system/xwaylandvideobridge/-/issues/1) pour
plus d'informations. Par exemple :

```ini
windowrule {
    name = xwayland-video-bridge-fixes
    match:class = xwaylandvideobridge

    no_initial_focus = true
    no_focus = true
    no_anim = true
    no_blur = true
    max_size = 1 1
    opacity = 0.0
}
```
