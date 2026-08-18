---
weight: 7
title: xdg-desktop-portal-hyprland
---

Un XDG Desktop Portal est un programme qui permet à d'autres applications de communiquer avec
le compositeur via D-Bus.

Un portail implémente certaines fonctionnalités, telles que l'ouverture de sélecteurs de fichiers ou
le partage d'écran.

[xdg-desktop-portal-hyprland](https://github.com/hyprwm/xdg-desktop-portal-hyprland)
est l'implémentation xdg-desktop-portal de Hyprland. Elle permet le partage d'écran,
les raccourcis globaux, etc.

> [!NOTE]
> Tout au long de ce document, `xdg-desktop-portal-hyprland` sera désigné par
> XDPH.

> [!WARNING]
> XDPH n'implémente pas de sélecteur de fichiers. Pour cela, il est recommandé d'installer
> `xdg-desktop-portal-gtk` aux côtés de XDPH.

## Installation

{{< tabs items="Arch Linux,NixOS,Gentoo,Manual" >}}

{{< tab "Arch Linux" >}}

```sh
pacman -S xdg-desktop-portal-hyprland
```

ou, pour la version -git :

```sh
yay -S xdg-desktop-portal-hyprland-git
```

{{< /tab >}}

{{< tab "NixOS" >}}

Sur NixOS, XDPH est déjà activé par le
[module NixOS pour Hyprland](../../Nix/Hyprland-on-NixOS), via
`programs.hyprland.enable = true;`.

{{< /tab >}}

{{< tab "Gentoo" >}}

### Démasquer les dépendances

```plain {filename="/etc/portage/profile/package.unmask"}
dev-qt/qtbase
dev-qt/qtwayland
dev-qt/qtdeclarative
dev-qt/qtshadertools
```

### Appliquer les useflags nécessaires

```plain {filename="/etc/portage/package.use"}
dev-qt/qtbase opengl egl eglfs gles2-only
dev-qt/qtdeclarative opengl
sys-apps/xdg-desktop-portal screencast
```

### Démasquer les dépendances et xdph

```plain {filename="/etc/portage/package.accept_keywords"}
gui-libs/xdg-desktop-portal-hyprland 
dev-qt/qtbase
dev-qt/qtwayland
dev-qt/qtdeclarative
dev-qt/qtshadertools
```

au fait, ce sont les useflags que j'ai testés, vous pourriez aussi en tester d'autres.

### Installation

```sh
eselect repository enable guru
emaint sync -r guru
emerge --ask --verbose gui-libs/xdg-desktop-portal-hyprland
```

{{< /tab >}}

{{< tab "Manual" >}}

Voir
[le readme du dépôt GitHub](https://github.com/hyprwm/xdg-desktop-portal-hyprland).

{{</ tab >}}

{{< /tabs >}}

## Utilisation

> [!WARNING]
> Le `xdg-desktop-portal.service` de systemd peut nécessiter une `graphical-session.target` active,
> que Hyprland ne démarre pas par défaut. Voir [systemd](../../Useful-Utilities/Systemd-start) pour configurer cela.

XDPH est automatiquement démarré par D-Bus, une fois que Hyprland démarre.

Pour vérifier que tout va bien, essayez de partager n'importe quoi en écran, ou ouvrez OBS et
sélectionnez la source PipeWire.  
Si XDPH est en cours d'exécution, un menu Qt apparaîtra vous demandant quoi partager.

XDPH fonctionnera sur d'autres compositeurs wlroots, mais les fonctionnalités disponibles uniquement sur
Hyprland ne fonctionneront pas (par ex. le partage de fenêtre).

Pour une option radicale, vous pouvez utiliser ce script et le démarrer automatiquement :

```sh
#!/bin/sh
sleep 1
killall -e xdg-desktop-portal-hyprland
killall xdg-desktop-portal
/usr/lib/xdg-desktop-portal-hyprland &
sleep 2
/usr/lib/xdg-desktop-portal &
```

Ajustez les chemins s'ils sont incorrects.

## Le sélecteur de partage n'utilise pas le thème du système

Essayez l'un ou les deux :

```sh
dbus-update-activation-environment --systemd --all
systemctl --user import-environment QT_QPA_PLATFORMTHEME
```

Si ça fonctionne, ajoutez-le à votre configuration dans les démarrages automatiques.

## Utiliser le sélecteur de fichiers KDE avec XDPH

XDPH n'implémente pas de sélecteur de fichiers et utilise celui de GTK comme repli par
défaut (voir `/usr/share/xdg-desktop-portal/hyprland-portals.conf`). Si vous voulez
utiliser le sélecteur de fichiers KDE mais laisser XDPH gérer tout le reste, créez un fichier
`~/.config/xdg-desktop-portal/hyprland-portals.conf` avec le contenu suivant :

```ini {filename="~/.config/xdg-desktop-portal/hyprland-portals.conf"}
[preferred]
default = hyprland;gtk
org.freedesktop.impl.portal.FileChooser = kde
```

Vous pouvez en apprendre plus à ce sujet dans la
[documentation xdg-desktop-portal de l'Arch Wiki](https://wiki.archlinux.org/title/XDG_Desktop_Portal).
Notez que certaines applications comme Firefox pourraient nécessiter une configuration supplémentaire pour
utiliser le sélecteur de fichiers KDE.

## Débogage

Si vous obtenez des temps de lancement d'application longs, ou si le partage d'écran ne fonctionne pas, consultez les
journaux.

`systemctl --user status xdg-desktop-portal-hyprland`

Si vous voyez un plantage, il est probable qu'il vous manque soit `qt6-wayland` soit
`qt5-wayland`.

Si le portail ne démarre pas automatiquement, ne fonctionne pas lorsqu'il est démarré manuellement,
et ne produit aucun journal d'erreur, il est très probable que vos [variables d'environnement XDG](../../Configuring/Advanced-and-Cool/Environment-variables/#xdg-specifications)
sont mal configurées

## Configuration

Exemple :

```ini
screencopy {
    max_fps = 60
}
```

Le fichier de configuration `~/.config/hypr/xdph.conf` permet ces variables :

### catégorie screencopy

| Variable | Description | Type | Par défaut |
| -- | -- | -- | -- |
| `max_fps`  | Fps maximum d'une session de partage d'écran. <br> `0` signifie pas de limite. | int | `120` |
| `allow_token_by_default`  | Si activé, cochera la case « Autoriser le jeton de restauration » par défaut. | bool  | `false` |
| `custom_picker_binary`  | Si non vide, utilisera ce **binaire** comme votre sélecteur de partage. <br> Merci de noter qu'il doit se conformer à la disposition de sélection stdout de `hyprland-share-picker`. | string  | `"hyprland-share-picker"` |
| `force_shm` | Si activé, ignorera DMA-BUF et utilisera toujours SHM pour le partage d'écran. SHM est plus lent que DMA-BUF (particulièrement à hautes résolutions) mais peut contourner les échecs d'allocation DMA-BUF sur les systèmes multi-GPU. | bool | `false` |
| `cursor_mode` | Mode de curseur par défaut pour les clients qui ne spécifient pas de mode, par ex. les navigateurs. Tout mode implémenté pour [XDG ScreenCast Portal](https://flatpak.github.io/xdg-desktop-portal/docs/doc-org.freedesktop.portal.ScreenCast.html#org-freedesktop-portal-screencast-availablecursormodes), c.-à-d. `1`=masqué ou `2`=intégré. Par défaut, valeur par défaut du protocole (masqué). | int | `0` |
