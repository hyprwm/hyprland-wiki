---
weight: 11
title: Autre
---

Vous trouverez ici des liens vers d'autres projets qui pourraient ne pas correspondre à l'une des
catégories ci-dessus.

### Gestion des espaces de travail

[split-monitor-workspaces](https://github.com/Duckonaut/split-monitor-workspaces) par _Stanisław Zagórowski_ : Espaces de travail façon Awesome
pour Hyprland.

### Switchers de fenêtre

[snappy-switcher](https://github.com/OpalAayan/snappy-switcher) par _OpalAayan_ : Un switcher de fenêtre Alt+Tab animé et ultra rapide pour Hyprland écrit en C (utilisant Pango et Cairo).

### Gestion des dispositions de clavier

[hyprland-per-window-layout](https://github.com/coffebar/hyprland-per-window-layout/)
par _MahouShoujoMivutilde et coffebar_ : Dispositions de clavier par fenêtre pour
Hyprland.

### Prise en charge éditeur pour les fichiers de configuration

[HyprLS](https://github.com/hyprland-community/hyprls) par _gwennlbh_ : Un serveur LSP pour fournir l'autocomplétion et plus encore pour les fichiers de configuration de Hyprland dans neovim, VS Code et d'autres

### Gestion des raccourcis clavier

[hyprKCS](https://github.com/kosa12/hyprKCS) par _kosa12_ : Un gestionnaire de raccourcis
Hyprland rapide et minimal écrit en Rust/GTK4.

### Wrappers IPC

[hyprland-rs](https://github.com/yavko/hyprland-rs) par _yavko_ : Un wrapper soigné
pour l'IPC de Hyprland écrit en Rust.

### Shaders d'écran/température de couleur

- [hyprshade](https://github.com/loqusion/hyprshade) par _loqusion_ : Utilitaire pour
  échanger et planifier des shaders d'écran ; fonctionne aussi comme un
  [ajusteur automatique de température de couleur](https://en.wikipedia.org/wiki/F.lux).
- [gammastep](https://gitlab.com/chinstrap/gammastep) par _Chinstrap_ : Contrôle la température de couleur automatiquement selon l'heure de la journée et la localisation.

### Paramètres sans fil

- [iwgtk](https://github.com/J-Lentz/iwgtk) par _Jesse Lentz_ : Frontend de paramètres WiFi pour `iwd` en GTK
- [blueberry](https://github.com/linuxmint/blueberry) par _Linux Mint_ : Frontend de paramètres Bluetooth en GTK
- [Overskride](https://github.com/kaii-lb/overskride) par _kaii-lb_ : Un client bluetooth simple mais puissant en GTK4
- [nm-applet](https://gitlab.gnome.org/GNOME/network-manager-applet) par _GNOME_ : Applet pour interfacer avec NetworkManager en GTK

### Montage automatique avec `udiskie`

_Méthode de démarrage :_ manuelle (démarrage automatique dans la configuration hyprland)

Les périphériques de stockage de masse USB, comme les clés USB, téléphones mobiles, appareils photo numériques,
etc. ne sont pas montés automatiquement sur le système de fichiers.

Typiquement, ils doivent être montés manuellement, souvent en utilisant root et `umount` pour le faire.

De nombreux DE populaires gèrent cela automatiquement en utilisant des wrappers `udisks2`.

`udiskie` est un frontend udisks2 qui permet de gérer les supports amovibles comme les
CD ou clés USB depuis l'espace utilisateur.

Installez `udiskie` via votre gestionnaire de paquets, ou
[compilez-le manuellement](https://github.com/coldfix/udiskie/wiki/installation)

Rendez-vous dans votre `hyprland.lua` et ajoutez `udiskie` aux démarrages automatiques.

[Voir plus d'usages ici](https://github.com/coldfix/udiskie/wiki/Usage).

### Configuration des moniteurs

[Monique](https://github.com/ToRvaLDz/monique) par _ToRvaLDz_ : Configurateur de moniteur
graphique pour Hyprland et Sway avec disposition par glisser-déposer, système de profils,
et démon de hotplug pour la configuration automatique.

### Autres utilitaires utiles

Le site web [We Are Wayland Now](https://wearewaylandnow.com/) détaille d'autres utilitaires et applications utiles pour Wayland comme les docks, clients e-mail, etc., ainsi que d'autres informations utiles sur la compatibilité sous Wayland.
