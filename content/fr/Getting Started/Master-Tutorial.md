---
weight: 2
title: Tutoriel principal
---

Si vous découvrez Hyprland pour la première fois, c'est le principal tutoriel à
lire.

Ce tutoriel couvre tout ce dont vous avez besoin pour vous lancer. Il renvoie vers d'autres
pages lorsque nécessaire.

## Installer Hyprland

Voir [Installation](../Installation) et revenez ici une fois que vous avez
installé Hyprland avec succès.

Installez `kitty` (émulateur de terminal par défaut). Il est disponible dans les dépôts de la plupart des
distributions.

## Nvidia ?

> [!NOTE]
> Si vous n'utilisez pas de carte Nvidia, passez cette étape.

Merci de jeter un œil à [la page Nvidia](../../Nvidia) avant de lancer. Elle contient des
informations concernant l'environnement nécessaire et les ajustements requis.

## VM ?

> [!NOTE]
> Si vous n'utilisez pas de VM, passez cette étape.

Dans une VM, assurez-vous d'avoir activé l'accélération 3D dans votre configuration `virtio` (ou
`virt-manager`) sinon Hyprland _**ne fonctionnera pas**_.

Vous pouvez aussi faire un passthrough de GPU pour que cela fonctionne.

Gardez à l'esprit que l'accélération 3D dans les VM peut être assez lente.

## Lancer Hyprland

Hyprland peut être exécuté en tapant `start-hyprland` dans votre tty.

Si vous êtes sous systemd, certains services comme XDG Desktop Portal peuvent **exiger** que vous démarriez une véritable session graphique avec systemd. Systemd fournit aussi des fonctionnalités supplémentaires telles que le support de [xdg-autostart](https://www.freedesktop.org/software/systemd/man/latest/systemd-xdg-autostart-generator.html), le lancement de toute application en tant qu'unité systemd, et la capacité d'activer des services pour les programmes qui dépendent d'une session graphique et fournissent de tels services (par ex. waybar). Voir la [page systemd](../../Useful-Utilities/Systemd-start) pour des instructions plus détaillées.


> [!WARNING]
> Ne lancez **pas** Hyprland avec les permissions `root` (ne faites pas de `sudo`)

Vous pouvez voir quelques drapeaux de lancement en faisant `start-hyprland -- -h`, ceux-ci incluent la définition du
chemin de configuration, l'ignorance d'une vérification pour ce qui précède, etc.

Les gestionnaires de connexion ne sont pas officiellement pris en charge, mais voici une courte liste de
compatibilité :

- SDDM → Fonctionne parfaitement. Installez sddm ⩾ 0.20.0 ou la
  [dernière version git](https://github.com/sddm/sddm) (ou
  [sddm-git](https://aur.archlinux.org/packages/sddm-git) depuis AUR) pour éviter
  le bug SDDM [1476](https://github.com/sddm/sddm/issues/1476) (arrêts de 90s).
- plasma-login-manager → Fonctionne parfaitement, mais dépend de systemd.
- GDM → Fonctionne avec la mise en garde de faire planter Hyprland au premier lancement.
- greetd → Fonctionne parfaitement, particulièrement avec
  [ReGreet](https://github.com/rharish101/ReGreet).
- ly → Fonctionne parfaitement.

## Configurations préétablies façon DE

Voulez-vous simplement obtenir Hyprland préconfiguré comme un DE,
sans créer votre propre configuration à partir de zéro ?

Consultez la [page des configurations préétablies](../Preconfigured-setups)
pour voir quelques options.

Ces dotfiles devraient tout faire pour vous, et disposent également de leurs propres tutoriels.

Si vous choisissez de les utiliser, vous pouvez passer l'étape suivante. Cependant, il est quand même recommandé de lire tous les points ci-dessous.
Ils vous donneront des applications recommandées, des remplacements pour les anciens logiciels X11, des informations sur la configuration des écrans,
etc.

## Dans Hyprland avec la configuration par défaut

Vous êtes techniquement prêt pour votre aventure.

Utilisez <key>SUPER</key> + <key>Q</key> pour lancer kitty. Si vous souhaitez choisir le
terminal par défaut avant de continuer, vous pouvez le faire dans
`~/.config/hypr/hyprland.lua`
([exemple de configuration](https://github.com/hyprwm/Hyprland/blob/main/example/hyprland.lua)).

Si vous voulez la meilleure expérience avec moins de recherches sur Google, continuez à lire.

## Logiciels essentiels

Voir la [page des logiciels indispensables](../../Useful-Utilities/Must-have) pour les
éléments cruciaux permettant à Wayland / Hyprland / d'autres applications de fonctionner correctement.

## Configuration des moniteurs

Voir la [page de configuration de Hyprland](../../Configuring/Basics/Monitors) pour tout apprendre sur
la configuration de vos écrans.

## Applications / remplacements X11

Voir la [page des utilitaires utiles](../../Useful-Utilities)
à ce sujet. Vous pouvez aussi visiter le dépôt
[Awesome-Hyprland](https://github.com/hyprland-community/awesome-hyprland)
pour une liste plus complète.

## Configurer entièrement Hyprland

Rendez-vous sur la
[page de configuration de Hyprland](../../Configuring) pour tout apprendre
sur la configuration de Hyprland selon vos goûts.

## Curseurs

Les curseurs sont réputés pour être pénibles à configurer quand on ne sait pas comment faire. Voir
[cette entrée de FAQ sur le changement de curseur de souris](../../FAQ#how-do-i-change-me-mouse-cursor)

## Thèmes

Puisque Hyprland n'est pas un environnement de bureau à part entière, vous devrez utiliser
des outils comme `lxappearance` ou `nwg-look` (recommandé) pour GTK, et `hyprqt6engine`
pour les applications qt6.

## Forcer les applications à utiliser Wayland

Beaucoup d'applications utiliseront Wayland par défaut. Chromium (et les autres navigateurs basés
dessus, ou Electron) ne le font pas. Vous devez leur passer
`--enable-features=UseOzonePlatform --ozone-platform=wayland` ou utiliser
des fichiers `.conf` lorsque c'est possible. Les navigateurs basés sur Chromium devraient aussi avoir un interrupteur
dans `chrome://flags`. Cherchez _« ozone »_ et sélectionnez Wayland. Si vous êtes sous
NixOS, vous pouvez aussi définir la variable d'environnement `NIXOS_OZONE_WL=1` dans votre
configuration.

Pour la plupart des applications electron, vous devriez mettre ce qui précède dans
`~/.config/electron-flags.conf`. Notez que VSCode est connu pour **ne pas** fonctionner avec
cela.

Quelques variables d'environnement supplémentaires pour forcer le mode Wayland sont documentées
[ici](../../Configuring/Advanced-and-Cool/Environment-variables).

Vous pouvez vérifier si une application s'exécute sous xwayland ou non avec
`hyprctl clients`.
