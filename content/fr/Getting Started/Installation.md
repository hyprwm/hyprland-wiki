---
weight: 1
title: Installation
---

> [!WARNING]
> Hyprland n'est pas destiné à être un environnement de bureau complet et convivial. En résumé, c'est un ensemble
> d'outils vous permettant de créer votre propre environnement de bureau.
>
> Les applications, intégrations, shells, etc., sont **votre** responsabilité de choisir, installer et configurer.
>
> Ce wiki est _très_ verbeux. Il est fortement recommandé de le parcourir et de le lire en premier avant de
> supposer que quelque chose ne fonctionne pas ou n'est pas disponible.

> [!NOTE]
> Les GPU NVIDIA ne sont souvent pas utilisables directement, suivez la [page Nvidia](../../Nvidia) après avoir installé
> Hyprland si vous prévoyez d'en utiliser un. Blâmez NVIDIA pour cela.

## Distributions

Nous exécutons et testons officiellement Hyprland sur Arch et NixOS, et nous garantissons que Hyprland y fonctionnera. Pour toute autre distribution
(non basée sur Arch/Nix) vous pourriez avoir des résultats variables. Cependant,
puisque Hyprland est extrêmement à la pointe, les distributions à versions fixes comme Pop!\_OS, Fedora, Ubuntu, etc.
auront des problèmes **majeurs** pour exécuter Hyprland. Les distributions rolling release comme openSUSE, Solus, etc. devraient généralement bien fonctionner.

## Installation

Installer Hyprland est très simple. Installez-le simplement avec votre gestionnaire de paquets.

> [!WARNING]
> Il est **fortement** recommandé d'utiliser **ce que votre distribution vous propose en paquet**, et de **ne pas** compiler manuellement
> ou utiliser les paquets `-git`.
> L'écosystème et les dépendances de Hyprland sont vastes et interdépendants, et compiler manuellement ne fera que potentiellement vous exposer à des versions obsolètes,
> ou incompatibles de ces dépendances.
>
> Si vous obtenez des erreurs de fichiers `.so` incompatibles / manquants, c'est _entièrement votre faute_ pour avoir fait cela !
>
> Cependant, si vous êtes un utilisateur expérimenté et voulez bêta-tester de nouvelles fonctionnalités, vous êtes plus que bienvenu pour exécuter la dernière
> version git head. Mais merci de ne pas venir demander à propos d'erreurs "fichier .so manquant" !

### Paquets

**AVERTISSEMENT :** Je ne maintiens aucun paquet. S'ils sont cassés, essayez d'abord de compiler
depuis les sources.

{{% details title="Arch" closed="true" %}}

Installez une version taguée depuis les paquets arch :

```shell
sudo pacman -S hyprland
```

##### Compiler depuis les sources automatiquement

> [!WARNING]
> Lisez d'abord l'avertissement concernant l'utilisation des paquets `-git` ou la compilation depuis les sources sous [Installation](#installation) !

Installez depuis l'AUR, qui compile la dernière source :

```shell
yay -S hyprland-git
```

Alternativement, installez le paquet `hyprland-meta` pour récupérer et compiler automatiquement les dernières versions git de tous les composants de l'écosystème hypr*.

```shell
yay -S hyprland-meta-git
```

> [!WARNING]
> Avec `-git`, chaque fois qu'une dépendance directe comme `hyprutils` a une mise à jour cassant l'ABI, vous devez recompiler Hyprland et tous les autres outils dépendants.
> Sinon vous obtiendrez une erreur ".so not found".


Si vous décidez d'utiliser la version `git` depuis l'AUR, vous pouvez utiliser le [Chaotic Aur](https://aur.chaotic.cx/) pour obtenir des binaires précompilés.
Sachez que la mise à jour de dépendances comme `hyprutils` pourrait quand même exiger que vous recompiliez tout vous-même car le Chaotic Aur ne le fait pas automatiquement.

> [!NOTE]
> Vous pouvez facilement rétrograder avec [downgrade](https://github.com/archlinux-downgrade/downgrade) pour revenir à une version -git précédente.

{{% /details %}}

{{% details title="Nix" closed="true" %}}

Activez Hyprland dans votre configuration NixOS :

```nix
{
  programs.hyprland.enable = true;
}
```

Pour plus de détails, lisez la [page Nix](../../Nix).

{{% /details %}}

{{% details title="openSUSE*" closed="true" %}}

Hyprland fait partie de factory, à partir du snapshot 20230411. Pour l'installer,
utilisez simplement zypper

```sh
sudo zypper in hyprland
```

ou installez le paquet "hyprland" via YaST2 Software.

Pour que `hyprpm` reconnaisse ses dépendances, vous devrez aussi installer `hyprland-devel` :

```sh
sudo zypper in hyprland-devel
```

Alternativement, vous pouvez aussi suivre les instructions sous
["Manuel (Compilation manuelle)"](#manual) pour compiler Hyprland vous-même.

Note : _Hyprland n'est pas disponible pour Leap, car la plupart des bibliothèques (et le compilateur) dont
Hyprland a besoin sont trop anciennes._

{{% /details %}}

{{% details title="Fedora*" closed="true" %}}

[lionheartp/Hyprland](https://copr.fedorainfracloud.org/coprs/lionheartp/Hyprland),
un dépôt Copr.

Vous pouvez aussi le compiler vous-même en suivant les instructions
[ici](https://github.com/hyprwm/Hyprland/discussions/284)

{{% /details %}}

{{% details title="Debian*" closed="true" %}}

`hyprland` est disponible depuis Debian 14 (Forky) et dans les backports de Debian 13 (Trixie)

```bash
sudo apt install hyprland
```
ou
```bash
sudo apt install -t trixie-backports hyprland
```

> [!NOTE]
> Hyprland n'est pas disponible pour Bookworm car ses paquets sont trop anciens.

{{% /details %}}

{{% details title="Gentoo*" closed="true" %}}

Les paquets hypr sont disponibles dans le [hyproverlay](https://codeberg.org/hyproverlay/hyproverlay). Activez l'overlay avec :

```sh
eselect repository enable hyproverlay
emaint sync -r hyproverlay
```

Hyprland peut être installé avec :

```sh
emerge --ask gui-wm/hyprland
```

Des paquets supplémentaires comme hyprlock, hypridle, xdg-desktop-portal-hyprland,
hyprland-plugins, hyprpaper et hyprpicker sont dans l'overlay. Certains des scripts contribués par la communauté
de [hyprwm/contrib](https://github.com/hyprwm/contrib) sont aussi disponibles dans leur propre paquet
(app-misc/grimblast, app-misc/hdrop, etc.).

```sh
emerge --ask gui-apps/hyprlock
emerge --ask gui-apps/hypridle
emerge --ask gui-libs/xdg-desktop-portal-hyprland
emerge --ask gui-apps/hyprpaper
emerge --ask gui-apps/hyprpicker
```

Pour les flags USE et plus de détails, lisez la
[page du wiki Gentoo](https://wiki.gentoo.org/wiki/Hyprland) à propos de Hyprland.

{{% /details %}}

{{% details title="FreeBSD*" closed="true" %}}

Hyprland et les paquets associés sont dans le dépôt par défaut :

- [hyprland](https://www.freshports.org/x11-wm/hyprland)
- [hyprpaper](https://www.freshports.org/x11/hyprpaper)
- [hyprpicker](https://www.freshports.org/x11/hyprpicker)
- [xdg-desktop-portal-hyprland](https://www.freshports.org/x11/xdg-desktop-portal-hyprland)
- [Autres éléments Wayland](https://www.freshports.org/wayland/)

{{% /details %}}

{{% details title="Ubuntu*" closed="true" %}}

> [!WARNING]
> Le Hyprland d'Ubuntu est **extrêmement** obsolète. Je ne recommande pas du tout d'utiliser les versions packagées. Compilez plutôt toute la pile [manuellement](#manual).

#### Dépôt universe d'Ubuntu 26.04 LTS (Resolute Raccoon)

```bash
sudo add-apt-repository universe && sudo apt update && sudo apt install hyprland
```

#### Dépôt universe d'Ubuntu 24.10 (Oracular Oriole)

```bash
sudo add-apt-repository universe && sudo apt update && sudo apt install hyprland
```

{{% /details %}}

{{% details title="Alpine*" closed="true" %}}

Hyprland est actuellement disponible dans le [dépôt communautaire](https://wiki.alpinelinux.org/wiki/Repositories#Community) d'Alpine
et il est maintenu par la communauté.

La commande suivante installera hyprland et ses dépendances.

```plain
apk add hyprland
```

{{% /details %}}

{{% details title="Void Linux*" closed="true" %}}

Hyprland n'est pas disponible depuis les dépôts officiels de Void Linux [en raison d'un conflit de philosophie de packaging](https://github.com/void-linux/void-packages/issues/37544). Cependant, un [dépôt tiers](https://github.com/Event-Horizon-VL/blackhole-vl) est disponible avec des [paquets binaires](https://mirror.black-hole.dev/x86_64/) construits en CI par GitHub Actions.

Vous pouvez ajouter ce dépôt en exécutant les commandes suivantes :

```sh
sudo cp /usr/share/xbps.d/00-repository-main.conf /etc/xbps.d/
sudo sed -i "1i repository=https://mirror.black-hole.dev/$(xbps-uhelper arch)" /etc/xbps.d/00-repository-main.conf
```
Vous pouvez ensuite installer les paquets comme n'importe quel autre :

```sh
sudo xbps-install -S hyprland
sudo xbps-install -S hyprland-devel # If you want to use plugins
sudo xbps-install -S xdg-desktop-portal-hyprland

xbps-query -Rs hypr # This will require you to have already accepted the repository's fingerprint using xbps-install -S
```
Plus d'informations sont disponibles dans le [README de hyprland-void](https://github.com/Event-Horizon-VL/blackhole-vl/blob/master/README.md), y compris des informations sur la façon de [compiler manuellement](https://github.com/Event-Horizon-VL/blackhole-vl?tab=readme-ov-file#installation) Hyprland pour Void Linux en utilisant les modèles fournis.

{{% /details %}}

{{% details title="Ximper*" closed="true" %}}

Installez depuis Sisyphus :

```bash
epmi hyprland
epmi hyprland-devel # If you want to use plugins
```

Écosystème :

```bash
epmi xdg-desktop-portal-hyprland
epmi hypridle
epmi hyprpaper
epmi hyprpicker
```

{{% /details %}}

{{% details title="Solus*" closed="true" %}}

Pour Solus, exécutez :

```bash
sudo eopkg install hyprland
```

{{% /details %}}

_**\* Non officiel, aucun support officiel n'est fourni. Ces instructions sont
gérées par la communauté, et aucune garantie n'est fournie quant à leur validité.**_

### Manuelle

Dépendances :

> [!NOTE]
> Notez que Hyprland utilise le standard C++26, donc votre compilateur ainsi que votre
> bibliothèque standard C++ doivent le prendre en charge (`gcc>=16` ou `clang>=19`).

{{% details title="Arch" closed="true" %}}

```plain
yay -S ninja gcc cmake meson libxcb xcb-proto xcb-util xcb-util-keysyms libxfixes libx11 libxcomposite libxrender libxcursor pixman wayland-protocols cairo pango libxkbcommon xcb-util-wm xorg-xwayland libinput libliftoff libdisplay-info cpio tomlplusplus hyprlang-git hyprcursor-git hyprwayland-scanner-git hyprwire-git xcb-util-errors hyprutils-git glaze hyprgraphics-git aquamarine-git re2 hyprland-qtutils-git muparser
```

_(Merci de faire une pull request ou d'ouvrir une issue si des paquets manquent
dans la liste)_

{{% /details %}}

{{% details title="openSUSE" closed="true" %}}

```sh
zypper in gcc-c++ git meson cmake "pkgconfig(cairo)" "pkgconfig(egl)" "pkgconfig(gbm)" "pkgconfig(gl)" "pkgconfig(glesv2)" "pkgconfig(libdrm)" "pkgconfig(libinput)" "pkgconfig(libseat)" "pkgconfig(libudev)" "pkgconfig(pango)" "pkgconfig(pangocairo)" "pkgconfig(pixman-1)" "pkgconfig(vulkan)" "pkgconfig(wayland-client)" "pkgconfig(wayland-protocols)" "pkgconfig(wayland-scanner)" "pkgconfig(wayland-server)" "pkgconfig(xcb)" "pkgconfig(xcb-icccm)" "pkgconfig(xcb-renderutil)" "pkgconfig(xkbcommon)" "pkgconfig(xwayland)" "pkgconfig(xcb-errors)" glslang-devel Mesa-libGLESv3-devel tomlplusplus-devel
```

(cela devrait aussi fonctionner sur RHEL/Fedora si vous retirez `Mesa-libGLESv3-devel` et
`pkgconfig(xcb-errors)`)

{{% /details %}}

{{% details title="FreeBSD" closed="true" %}}

```sh
pkg install git pkgconf gmake gcc evdev-proto cmake wayland-protocols wayland libglvnd libxkbcommon libinput cairo pango pixman libxcb
pkg install meson jq hwdata libdisplay-info libliftoff
export CC=gcc CXX=g++ LDFLAGS="-static-libstdc++ -static-libgcc"
```

{{% /details %}}

{{% details title="Ubuntu" closed="true" %}}

#### Ubuntu 26.04 LTS (Resolute Raccoon)

Un script de compilation est disponible sur [gitlab.com/kralos/hyprbuntu](https://gitlab.com/kralos/hyprbuntu).

#### Ubuntu 24.10 (Oracular Oriole)

Pour installer Hyprland depuis les sources, vous aurez besoin des dépendances ci-dessous :

```bash
sudo apt install -y meson wget build-essential ninja-build cmake-extras cmake gettext gettext-base fontconfig libfontconfig-dev libffi-dev libxml2-dev libdrm-dev libxkbcommon-x11-dev libxkbregistry-dev libxkbcommon-dev libpixman-1-dev libudev-dev libseat-dev seatd libxcb-dri3-dev libegl-dev libgles2 libegl1-mesa-dev glslang-tools libinput-bin libinput-dev libxcb-composite0-dev libavutil-dev libavcodec-dev libavformat-dev libxcb-ewmh2 libxcb-ewmh-dev libxcb-present-dev libxcb-icccm4-dev libxcb-render-util0-dev libxcb-res0-dev libxcb-xinput-dev libtomlplusplus3 libre2-dev
```

Vous devrez aussi compiler depuis les sources les dernières versions taguées de wayland, wayland-protocols, et
libdisplay-info.

Pour le partage d'écran, vous pouvez aussi installer `xdg-desktop-portal-wlr` ou `xdg-desktop-portal-hyprland`

```bash
sudo apt install -y xdg-desktop-portal-wlr
```

_Malheureusement, `xdg-desktop-portal-hyprland` n'est toujours pas dans les dépôts Ubuntu donc vous devez le compiler depuis les sources_

Voir
[le readme du dépôt GitHub xdph](https://github.com/hyprwm/xdg-desktop-portal-hyprland). Référez-vous à
[XDPH](../../Hypr-Ecosystem/xdg-desktop-portal-hyprland) et au
[Gist du guide d'installation et de compilation de Hyprland pour Ubuntu](https://gist.github.com/Vertecedoc4545/3b077301299c20c5b9b4db00f4ca6000)
pour plus d'informations.

> [!WARNING]
> Notez que puisqu'Ubuntu a généralement du retard sur les dépendances, il n'est pas
> garanti que le processus de compilation fonctionne du tout. Même si c'est le cas, il est probable
> que cela casse à un moment donné dans le futur.

> [!WARNING]
> Utilisez toujours la dernière version d'Ubuntu pour les dépendances les plus à jour.
>
> Note : Vos résultats peuvent varier, car GDM a quelques bugs avec Hyprland. Consultez le [Tutoriel principal](../Master-Tutorial) pour plus d'infos.
>
> Référez-vous au gist si quelque chose échoue.

{{% /details %}}

> [!WARNING]
> En plus de celles-ci, vous aurez aussi besoin de quelques dépendances hypr\* qui peuvent ou non être
> packagées pour la distribution de votre choix :
>
> - aquamarine
> - hyprlang
> - hyprcursor
> - hyprutils
> - hyprgraphics
> - hyprwayland-scanner (compilation uniquement)

### CMake (recommandé)

```sh
git clone --recursive https://github.com/hyprwm/Hyprland
cd Hyprland
make all && sudo make install
```

_CMake est toujours recommandé car c'est la méthode d'installation prévue pour
Hyprland._

## Plantage au lancement

Voir [Plantages et bugs](../../Crashes-and-Bugs).

## Installation personnalisée (compilation debug, etc.)

1. faites cd dans le dépôt hyprland.
2. pour une compilation debug :

```bash
make debug
sudo make install
```

3. Toute autre configuration : (remplacez `<PRESET>` par votre préréglage : `release`, `debug`)

```bash
make <PRESET> && sudo cp ./build/Hyprland /usr/bin && sudo cp ./example/hyprland.desktop /usr/share/wayland-sessions
```

## Flags de compilation personnalisés

Pour appliquer des flags de compilation personnalisés, vous devrez abandonner make.

Flags de compilation personnalisés pris en charge sur CMake :

```bash
NO_XWAYLAND - Removes XWayland support
NO_SYSTEMD - Removes systemd dependencies
NO_UWSM - Does not install the hyprland-uwsm.desktop file
NO_HYPRPM - Does not build and install hyprpm
```

Les flags peuvent être passés à CMake comme ceci :

```bash
cmake --no-warn-unused-cli -DCMAKE_BUILD_TYPE:STRING=Release -D<FLAG>:STRING=true -B build
```

Changez `<FLAG>` par l'un des flags de compilation personnalisés. Plusieurs flags peuvent être utilisés à
la fois, en ajoutant davantage de `-D<FLAG_2>:STRING=true`.

Le `BUILD_TYPE` peut aussi être changé en `Debug`.

Pour compiler, exécutez :

```bash
cmake --build ./build --config Release --target all -j`nproc 2>/dev/null || getconf NPROCESSORS_CONF`
```

Si vous avez configuré en `Debug`, changez aussi `--config` en `Debug`.

Pour installer, exécutez :

```bash
sudo cmake --install ./build
```

## Exécuter dans une VM

_Vos résultats peuvent varier, ce n'est pas officiellement pris en charge._

Lisez la
[page du wiki Arch sur libvirt](https://wiki.archlinux.org/title/Libvirt) et installez et configurez
`libvirt`, `virsh`, et `virt-viewer`.

```bash
# Install libvirt and qemu things.
sudo pacman -S libvirt virt-viewer qemu-common
# Add yourself to the libvirt group.
sudo usermod -a -G libvirt USER # Replace 'USER' with your username.
# Enable and start libvirtd.
systemctl enable --now libvirtd
```

Allez sur le
[gitlab arch-boxes](https://gitlab.archlinux.org/archlinux/arch-boxes/-/packages)
et téléchargez la dernière image qemu basique d'arch. Vous pouvez aussi la télécharger via l'un
des miroirs d'arch.

```bash
curl https://geo.mirror.pkgbuild.com/images/latest/Arch-Linux-x86_64-basic.qcow2 \
  -o ~/Downloads/arch-qemu.qcow2 # Or download wherever you want.
```

Créez la VM avec virsh.

```bash
# Use virt-install (included with libvirt) to install the vm from the image.
virt-install \
  --graphics spice,listen=none,gl.enable=yes,rendernode=/dev/dri/renderD128 \
  --name hypr-vm \
  --os-variant archlinux \
  --memory 2048 \
  --disk ~/Downloads/arch-qemu.qcow2 \
  --import
```

Connectez-vous avec `virt-viewer`, cela ouvrira une session graphique `virt-viewer` sur
le tty. La connexion par défaut est 'arch' pour l'utilisateur et 'arch' pour le mot de passe.

> [!WARNING]
> Assurez-vous que le flag --attach est utilisé, activer virgl fait que
> nous avons dû désactiver listen. Cela signifie que nous ne pouvons pas établir de connexion directe TCP/UNIX
> par socket vers l'affichage distant. --attach demande à libvirt de fournir un
> socket pré-connecté vers l'affichage.\*

```sh
virt-viewer --attach hypr-vm
```

Enfin, sur l'invité, suivez les instructions ci-dessus pour soit
[installer hyprland-git depuis l'aur](#installation) soit
[compiler manuellement](#manual).
> [!WARNING]
> Assurez-vous d'installer `mesa` comme pilote OpenGL. Les pilotes virgl sont
> inclus dans `mesa`.
