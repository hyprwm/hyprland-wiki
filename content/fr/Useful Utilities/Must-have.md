---
weight: 1
title: Indispensables
---

Cette page documente les logiciels dont l'exécution est **fortement** recommandée
pour une expérience Hyprland fluide.

Les DE comme Plasma ou GNOME s'en occupent automatiquement. Hyprland ne le
fera pas, car vous pourriez vouloir utiliser autre chose.

### Un démon de notification

_Méthode de démarrage :_ Automatiquement, via activation D-Bus, quand une notification est émise. Alternativement,
une entrée de démarrage automatique dans `hyprland.lua` peut être utilisée. Cette dernière option pourrait être préférable, s'il y a plusieurs démons de notification installés sur votre système.

De nombreuses applications (par ex. Discord) peuvent geler si aucun n'est en cours d'exécution.

Exemples : `dunst`, `mako`, `fnott` et `swaync`.

### Pipewire

_Méthode de démarrage :_ Automatique sur systemd, manuelle sinon.

Pipewire n'est pas nécessairement requis, mais le partage d'écran ne fonctionnera pas sans
lui.

Installez `pipewire` et `wireplumber` (**pas** `pipewire-media-session`).

#### Distributions non-systemd

Comme il n'existe pas de méthode véritablement standardisée (en dehors de systemd) pour charger PipeWire
au démarrage d'un shell graphique,[^1] les distributions non-systemd comme Gentoo ou Artix
fournissent un lanceur dédié.

Il peut généralement être trouvé en exécutant `whereis <distro>-pipewire-launcher`. Si un tel
fichier n'existe pas sur votre installation, merci de vous référer à la
documentation de votre distribution pour de l'aide.

[^1]: https://wiki.gentoo.org/wiki/PipeWire#OpenRC

### XDG Desktop Portal

_Méthode de démarrage :_ Automatique sur systemd, manuelle sinon.

XDG Desktop Portal gère beaucoup de choses pour votre bureau, comme les sélecteurs de fichiers,
le partage d'écran, etc.

Voir la [page du portail de bureau Hyprland.](../../Hypr-Ecosystem/xdg-desktop-portal-hyprland)

### Agent d'authentification

_Méthode de démarrage :_ manuelle (démarrage automatique dans la configuration)

Les agents d'authentification sont les éléments qui font apparaître une fenêtre vous demandant un
mot de passe chaque fois qu'une application veut élever ses privilèges.

Voir [hyprpolkitagent](../../Hypr-Ecosystem/hyprpolkitagent)

### Prise en charge de Qt Wayland

_Méthode de démarrage :_ aucune (juste une bibliothèque)

Installez `qt5-wayland` et `qt6-wayland`.

### Polices

_Méthode de démarrage :_ aucune (juste une bibliothèque)

Une police `sans-serif` est requise pour rendre le texte. Sans cela, vous pourriez voir des carrés au lieu de texte. Un choix courant est `noto-fonts`.

Pour que les icônes s'affichent correctement, il est recommandé d'installer une Nerd Font ou FontAwesome. Les Nerd Fonts seront utilisées par défaut si disponibles, puis FontAwesome, avant de se replier sur du texte.
