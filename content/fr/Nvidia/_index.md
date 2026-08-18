---
weight: 8
title: Nvidia
---

## Avant-propos

Comme les pilotes Nvidia sont encore propriétaires, certains problèmes peuvent survenir
en utilisant des GPU Nvidia sur Hyprland, sur lesquels nous n'avons aucun contrôle.
Bien que Hyprland devrait fonctionner sans problème sur Nvidia, veuillez lire cette
page en entier pour configurer correctement votre système.

Il existe trois configurations de pilote possibles sur Nvidia.

1. Pilotes Nvidia entièrement propriétaires, souvent appelés « Pilotes
   propriétaires »
2. Pilotes Nvidia entièrement propriétaires, à l'exception des modules noyau open
   source, appelés « Pilotes ouverts ».
3. Pilotes open source Nouveau. Une implémentation en salle blanche des pilotes
   Nvidia, appelée simplement « Nouveau », à ne pas confondre avec les « Pilotes
   ouverts ».

Pour un maximum de performance et une prise en charge maximales avec les cartes plus récentes, il est
recommandé d'exécuter l'une des deux premières configurations, car elle contient des
optimisations vitales et une prise en charge de la gestion de l'alimentation pour les GPU plus récents.

> [!WARNING]
> Pour les personnes possédant une carte graphique de la série Nvidia 50xx (5090, 5080, etc.) ou
> plus récente, les modules noyau open source sont **REQUIS** lors de l'utilisation
> des pilotes Nvidia propriétaires.

Selon
[Nvidia](https://developer.nvidia.com/blog/nvidia-transitions-fully-towards-open-source-gpu-kernel-modules/),
il est également recommandé d'utiliser les modules noyau open source pour les
architectures Turing et Ampere. En résumé, cela inclut les séries de cartes grand public 16xx et 20xx
et ultérieures. Les résultats peuvent varier, donc essayez les deux si votre carte
est prise en charge par les deux.

Si aucune des deux configurations de pilote Nvidia propriétaire ne fonctionne correctement sur votre
ordinateur, le pilote Nouveau pourrait bien fonctionner. Ce sera probablement le cas pour les
[cartes plus anciennes](https://wiki.archlinux.org/title/NVIDIA#Unsupported_drivers).

## Configuration du pilote propriétaire

Sur Arch Linux et les autres distributions basées sur Arch, nous recommandons d'utiliser la variante DKMS
des modules noyau, car elle prendra en charge tous les noyaux installés sur votre système.

Si vous n'utilisez que les noyaux `linux` ou `linux-lts` sur votre système, vous pouvez
aussi utiliser les paquets non-dkms si vous le souhaitez.

Pour les pilotes Nvidia entièrement propriétaires, vous pouvez donc utiliser le
paquet `nvidia-dkms`. Et pour ceux qui veulent / doivent utiliser les modules noyau
open source, `nvidia-open-dkms` peut être utilisé.

Ces paquets DKMS reposent sur le fait d'avoir le paquet « headers » installé pour vos
noyaux de choix. Assurez-vous donc d'avoir tous les paquets headers pertinents
installés sur votre système. Par exemple, si vous avez le noyau Zen installé, vous
devez vous assurer que `linux-zen-headers` est également installé.

### Installation supplémentaire

Les paquets suivants doivent aussi être installés pour garantir une expérience fluide avec
les pilotes propriétaires.

1. `nvidia-utils` : Les pilotes graphiques en espace utilisateur. Vous en avez besoin pour presque
   tout sur votre système, et nous ne recommandons pas de faire fonctionner votre ordinateur
   sans. Si vous utilisez aussi les paquets « multilib » ou « lib32 » pour
   le jeu, Steam, Wine, etc., alors vous avez aussi besoin de `lib32-nvidia-utils`.
2. `egl-wayland` (`libnvidia-egl-wayland1` et `libnvidia-egl-gbm1` sur Ubuntu) :
   Ceci est requis pour activer la compatibilité entre l'API EGL et le
   protocole Wayland. Cela devrait déjà être installé sur la plupart des distributions.

### KMS anticipé, modeset et fbdev

Depuis la version du pilote Nvidia 570.86.16, `fbdev` est maintenant activé par défaut
quand `modeset` est aussi activé. Nous avons donc simplement besoin d'activer `modeset`.

Pour l'activer, créez et éditez `/etc/modprobe.d/nvidia.conf`, et ajoutez cette ligne
au fichier :

```conf {filename="/etc/modprobe.d/nvidia.conf"}
options nvidia_drm modeset=1
```

Si vous êtes sur Arch Linux, cette étape a déjà été faite pour vous.

Si vous êtes sur NixOS, c'est aussi
[activé par défaut](https://github.com/NixOS/nixpkgs/blob/0196e5372b8b7a282cb3bbe5cbf446617141ce38/nixos/modules/hardware/video/nvidia.nix#L116)
sur toutes les versions de pilote après la 535.

Le KMS anticipé (Early KMS) permettra aux modules Nvidia de se charger plus tôt dans la séquence de démarrage.
Sur les distributions utilisant `mkinitcpio`, comme Arch, vous pouvez l'activer en éditant
`/etc/mkinitcpio.conf`. Dans le tableau `MODULES`, ajoutez les noms de modules
suivants :

```conf {filename="/etc/mkinitcpio.conf"}
MODULES=(... nvidia nvidia_modeset nvidia_uvm nvidia_drm ...)
```

> [!WARNING]
> Charger les modules Nvidia tôt peut faire que la reprise depuis l'hibernation ne fonctionne plus (c.-à-d. que le système démarrera simplement au lieu de reprendre).
> Si vous rencontrez des problèmes avec cela, essayez de désactiver le KMS anticipé.

> [!WARNING]
> Les applications Electron ou basées sur Chromium peuvent se figer jusqu'à une minute après le démarrage sur les systèmes à graphiques hybrides avec un iGPU Intel et un dGPU Nvidia.
>
> Cela peut être corrigé en chargeant le module `i915` **avant** ceux de Nvidia dans `/etc/mkinitcpio.conf`. Éditez simplement la ligne `MODULES` comme ceci :
>
> ```conf {filename="/etc/mkinitcpio.conf"}
> MODULES=(i915 nvidia nvidia_modeset nvidia_uvm nvidia_drm ...)
> ```

Vous pouvez ensuite recompiler l'initramfs avec `sudo mkinitcpio -P`, et redémarrer.

Après le redémarrage, vous pouvez vérifier que DRM est réellement activé en exécutant
`cat /sys/module/nvidia_drm/parameters/modeset` qui devrait retourner `Y`.

Plus d'informations sont disponibles
[ici](https://wiki.archlinux.org/title/NVIDIA#DRM_kernel_mode_setting).

### Variables d'environnement

Ajoutez ces variables à votre configuration Hyprland :

```lua
hl.env("LIBVA_DRIVER_NAME", "nvidia")
hl.env("__GLX_VENDOR_LIBRARY_NAME", "nvidia")
```

### Pour finir

Installez quelques paquets pour que certaines applications fonctionnent nativement avec Wayland pour
la meilleure compatibilité et performance. Voir
[le Tutoriel principal](https://wiki.hypr.land/Getting-Started/Master-Tutorial/#force-apps-to-use-wayland).

Redémarrez votre ordinateur.

Lancez Hyprland.

Cela _devrait_ fonctionner maintenant.

### Scintillement dans les applications Electron / CEF

Les applications Electron et CEF scintillent parce que :

1. Elles s'exécutent dans XWayland par défaut.
2. Elles n'utilisent pas le protocole `syncobj` par défaut.

Pour activer la prise en charge Wayland native pour la plupart des applications Electron, ajoutez cette
variable d'environnement à votre configuration :

```lua
hl.env("ELECTRON_OZONE_PLATFORM_HINT", "auto")
```

Ceci a été confirmé fonctionner sur Vesktop, VSCodium, Obsidian et fonctionnera probablement
sur d'autres applications Electron également.

D'autres applications Electron ou CEF doivent être lancées avec ces drapeaux :

```sh
--enable-features=UseOzonePlatform --ozone-platform=wayland
```

Pour Spotify, Arch Linux dispose d'un paquet `spotify-launcher` dans ses dépôts
officiels. Utilisez celui-ci plutôt que le paquet `spotify` de l'AUR. Ensuite,
activez les drapeaux Wayland en créant le fichier
`~/.config/spotify-launcher.conf` avec ce contenu :

```sh {filename="~/.config/spotify-launcher.conf"}
[spotify]
extra_arguments = ["--enable-features=UseOzonePlatform", "--ozone-platform=wayland"]
```

Pour Arch Linux, certaines applications CEF / Electron peuvent aussi avoir leurs propres fichiers de drapeaux
dans `$XDG_CONFIG_HOME`. Par exemple, VSCodium les lit depuis
`$XDG_CONFIG_HOME/codium-flags.conf` tandis qu'Obsidian les lit depuis
`$XDG_CONFIG_HOME/obsidian/user-flags.conf`.

Sur NixOS, vous pouvez définir la variable d'environnement `NIXOS_OZONE_WL=1`, qui
configure automatiquement les applications Electron / CEF pour utiliser Wayland.

Depuis Electron 35/Chromium 134, le protocole « syncobj », qui implémente
correctement la synchronisation explicite, est maintenant pris en charge. Cela résout tout le scintillement dans
les applications Electron. Cependant, il doit être _activé manuellement_ en ajoutant le drapeau ci-dessous
à n'importe quelle application Electron/CEF :

```sh
--enable-features=WaylandLinuxDrmSyncobj
```

Utiliser ceci en conjonction avec Wayland natif sur ces applications devrait résoudre tous les
problèmes.

### Accélération matérielle vidéo VA-API

L'accélération matérielle vidéo sur Nvidia et Wayland est possible avec le
[nvidia-vaapi-driver](https://github.com/elFarto/nvidia-vaapi-driver). Cela peut
résoudre des problèmes spécifiques dans les applications Electron.

Les instructions d'installation sont disponibles dans le README. Cependant, un guide rapide
sera donné ici :

1. Installez le paquet. Sur Arch, c'est `libva-nvidia-driver` dans les dépôts
   officiels.

2. Ajoutez cette variable à votre configuration Hyprland :
   ```lua
   hl.env("NVD_BACKEND", "direct")
   ```

   Voir
   [ici](https://github.com/elFarto/nvidia-vaapi-driver?tab=readme-ov-file#upstream-regressions)
   pour plus d'informations sur cette variable d'environnement.

Vous pouvez consulter le README pour le faire fonctionner avec Firefox. Il existe aussi une
prise en charge expérimentale pour Chromium, cependant elle n'a pas eu beaucoup de succès.

### Autres problèmes

#### Multi-moniteur avec graphiques hybrides
Si vous rencontrez des problèmes avec une configuration multi-moniteur sur un appareil à graphiques hybrides
(un portable avec à la fois un GPU Intel et un GPU Nvidia), passer en mode discret uniquement peut aider :

1. Retirez le paquet `optimus-manager` s'il est installé (désactiver le
   service ne fonctionne pas).
2. Changez les paramètres de votre BIOS de graphiques hybrides à graphiques discrets.


#### Le Multi-GPU (ou les graphiques hybrides) ne fonctionne pas pour les moniteurs connectés au GPU Nvidia
Nvidia ne prend pas en charge des fonctionnalités importantes pour le Multi-GPU, ce qui peut résulter en une configuration cassée ou lente.
Voici quelques contournements à essayer :

1. Essayez de changer le GPU principal [avec la variable d'environnement AQ_DRM_DEVICES](../Configuring/Advanced-and-Cool/Multi-GPU/#telling-hyprland-which-gpu-to-use).
2. Essayez de définir la variable d'environnement `AQ_FORCE_LINEAR_BLIT=0` pour ne pas forcer les modificateurs linéaires sur les tampons Multi-GPU.

Cela pourrait ralentir le rendu vers les moniteurs secondaires et rendre Hyprland un peu saccadé dessus,
mais c'est mieux que de ne pas avoir de moniteur secondaire du tout, et c'est le mieux que nous puissions faire sur Nvidia.

#### Scintillement dans les jeux XWayland

Les jeux XWayland peuvent scintiller ou présenter des trames dans le désordre d'une manière qui les rend
injouables. Cela est dû à l'absence de synchronisation implicite dans le
pilote, et/ou à une prise en charge instable de la synchronisation explicite dans les versions plus récentes.

Voici quelques correctifs :

1. Installez les dernières versions de `xorg-xwayland`, `wayland-protocols` et
   du pilote Nvidia. Assurez-vous que `xorg-xwayland` est au moins en version 24.1,
   `wayland-protocols` au moins en version 1.34 et le pilote Nvidia au moins en
   version 555. Ceux-ci activent la synchronisation explicite sur le pilote Nvidia et devraient éviter
   le scintillement.

2. Si votre GPU n'est plus pris en charge par les pilotes 555 ou ultérieurs, installez des pilotes
   Nvidia plus anciens qui ne présentent pas ce problème. Les derniers qui fonctionnent sont
   la série de pilotes 535xx. Ceux-ci peuvent être installés sur Arch via
   [ces paquets AUR](https://aur.archlinux.org/packages?O=0&K=535xx)

#### Problèmes de mise en veille/réveil

Sur Arch Linux et NixOS, les instructions ci-dessous ont déjà été faites pour vous, mais
pour les autres :

- Activez les services `nvidia-suspend.service`, `nvidia-hibernate.service` et
  `nvidia-resume.service`. Ils seront démarrés par systemd en cas de besoin.

Ajoutez `nvidia.NVreg_PreserveVideoMemoryAllocations=1` à vos paramètres noyau si
vous ne l'avez pas déjà fait.

Pour les utilisateurs de Nix, l'équivalent de ce qui précède est

```nix {filename="configuration.nix"}
{
  hardware.nvidia.powerManagement.enable = true;
}
```

> [!WARNING]
> [Charger les modules Nvidia tôt](https://wiki.hypr.land/Nvidia/#early-kms-modeset-and-fbdev) peut faire que la reprise depuis l'hibernation ne fonctionne plus (c.-à-d. que le système démarrera simplement au lieu de reprendre).
> Si vous rencontrez des problèmes avec cela, essayez de désactiver le KMS anticipé.

> [!WARNING]
> Selon Nvidia, les problèmes de mise en veille/réveil devraient être résolus sur le pilote Nvidia
> ouvert. Si cela ne fonctionne toujours pas et que vous utilisez le pilote ouvert, cela pourrait
> valoir la peine d'essayer le pilote entièrement propriétaire.

## Vous avez encore des problèmes ?

Si vous avez encore des problèmes après avoir suivi ce guide, vous pouvez rejoindre le
[Discord Hyprland](https://discord.gg/hQ9XvMUjjr) et demander de l'aide dans le
canal `#hyprland-nvidia`.
