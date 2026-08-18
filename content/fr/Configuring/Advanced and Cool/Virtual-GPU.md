---
weight: 90
title: Virtual-GPU
---

> [!NOTE]
> Vous cherchez l'ancienne syntaxe hyprlang ? Consultez les [pages du wiki 0.54](https://wiki.hypr.land/0.54.0/).
> Depuis Hyprland 0.55, hyprlang est devenu obsolète au profit de lua.

## Général

Si vous possédez un GPU qui appartient à l'une de ces catégories :
- Carte Intel Arc Pro
- Graphique intégré de portable Intel
- Carte NVIDIA Workstation ou Server
- Carte NVIDIA RTX série 2000
- Carte AMD Radeon Instinct

Il est très probable que votre carte graphique prenne en charge le partitionnement virtuel, soit via l'utilisation
de périphériques médiés (mediated devices), soit via SR-IOV. Les moyens d'activer ce partitionnement dépassent le cadre
de ce wiki, et sont très différents selon les fabricants.

Par exemple, une fois le partitionnement activé, voici ce qu'une carte RTX A5000 créera :
```
# lspci -d 10de:
```
```plain
01:00.0 3D controller: NVIDIA Corporation GA102GL [RTX A5000] (rev a1)
01:00.4 3D controller: NVIDIA Corporation GA102GL [RTX A5000] (rev a1)
01:00.5 3D controller: NVIDIA Corporation GA102GL [RTX A5000] (rev a1)
01:00.6 3D controller: NVIDIA Corporation GA102GL [RTX A5000] (rev a1)
01:00.7 3D controller: NVIDIA Corporation GA102GL [RTX A5000] (rev a1)
01:01.0 3D controller: NVIDIA Corporation GA102GL [RTX A5000] (rev a1)
01:01.1 3D controller: NVIDIA Corporation GA102GL [RTX A5000] (rev a1)
01:01.2 3D controller: NVIDIA Corporation GA102GL [RTX A5000] (rev a1)
01:01.3 3D controller: NVIDIA Corporation GA102GL [RTX A5000] (rev a1)
01:01.4 3D controller: NVIDIA Corporation GA102GL [RTX A5000] (rev a1)
01:01.5 3D controller: NVIDIA Corporation GA102GL [RTX A5000] (rev a1)
01:01.6 3D controller: NVIDIA Corporation GA102GL [RTX A5000] (rev a1)
01:01.7 3D controller: NVIDIA Corporation GA102GL [RTX A5000] (rev a1)
01:02.0 3D controller: NVIDIA Corporation GA102GL [RTX A5000] (rev a1)
01:02.1 3D controller: NVIDIA Corporation GA102GL [RTX A5000] (rev a1)
01:02.2 3D controller: NVIDIA Corporation GA102GL [RTX A5000] (rev a1)
01:02.3 3D controller: NVIDIA Corporation GA102GL [RTX A5000] (rev a1)
01:02.4 3D controller: NVIDIA Corporation GA102GL [RTX A5000] (rev a1)
01:02.5 3D controller: NVIDIA Corporation GA102GL [RTX A5000] (rev a1)
01:02.6 3D controller: NVIDIA Corporation GA102GL [RTX A5000] (rev a1)
01:02.7 3D controller: NVIDIA Corporation GA102GL [RTX A5000] (rev a1)
01:03.0 3D controller: NVIDIA Corporation GA102GL [RTX A5000] (rev a1)
01:03.1 3D controller: NVIDIA Corporation GA102GL [RTX A5000] (rev a1)
01:03.2 3D controller: NVIDIA Corporation GA102GL [RTX A5000] (rev a1)
01:03.3 3D controller: NVIDIA Corporation GA102GL [RTX A5000] (rev a1)
```

Vous pourriez vouloir passer l'une de ces partitions de GPU virtuel, aussi appelée vGPU, en passthrough dans une machine virtuelle pour exécuter Hyprland avec accélération matérielle.

> [!NOTE]
> Les procédures suivantes **ne concernent pas les pilotes paravirtualisés comme Virtio-GPU**.
> 
> Virtio-GPU n'est pas une partition virtuelle de votre périphérique matériel, mais un périphérique entièrement émulé par logiciel qui transmet sa tâche à votre GPU hôte. 
> Ayant été développé dans ce but, il fournit une sortie d'écran émulée. Vous pouvez donc, comme beaucoup d'autres déjà, utiliser Hyprland normalement avec.

## Exécuter Hyprland sur un vGPU

Hyprland exige par défaut que votre carte graphique ait **au moins une sortie d'affichage**. 

Cependant, pour tous les fabricants, les vGPU sont des cartes de rendu uniquement et n'ont pas de sortie émulée sous Linux. C'est parce qu'elles ciblent des infrastructures VDI, du rendu 3D, de l'encodage et des cas d'usage de calcul qui sont tous distants. 
Cela est aussi suggéré par leur préfixe « 3D controller », plutôt que « VGA compatible controller ».

**Pour permettre à Hyprland de s'exécuter** sur une carte graphique **sans sortie, vous devez activer le** drapeau d'environnement `AQ_NO_KMS_REQUIREMENT` en exécutant Hyprland :
```lua
hl.env("AQ_NO_KMS_REQUIREMENT", "1")
```

### Utilisation à la fois d'un GPU et d'un vGPU

> [!WARN]
> Les utilisateurs de l'hyperviseur QEMU faisant à la fois un passthrough de vGPU et exposant un périphérique Virtio-GPU dans leur machine virtuelle sont concernés par cette section.

La plupart des pilotes matériels et paravirtualisés exposeront la même carte graphique deux fois sous le répertoire `/dev/dri`. Un nœud sera accessible globalement et fournira des capacités de rendu, tandis que
l'autre sera privilégié et exposera une ou plusieurs sorties d'affichage.

```plain
$ ls -lh /dev/dri/
total 0
drwxr-xr-x  2 root root         80 Apr 20 07:01 by-path/
crw-rw----+ 1 root video  226,   1 Apr 20 07:01 card1           # KMS card with outputs
crw-rw-rw-  1 root render 226, 128 Apr 20 07:01 renderD128      # DRM card, render-only
```

Par défaut, Hyprland ne sélectionnera que les nœuds du système ayant des sorties d'affichage et ignorera le nœud `render`. Mais avec `AQ_NO_KMS_REQUIREMENT` levant cette exigence, le nœud `render` devient un candidat approprié.

Si vous utilisez à la fois un GPU virtuel et un GPU matériel sur la même machine virtuelle, **vous devez définir le** drapeau `AQ_DRM_DEVICES`. Ce drapeau est décrit et expliqué dans [Multi-GPU](../Multi-GPU) :
```lua
hl.env("AQ_NO_KMS_REQUIREMENT", "1")
hl.env("AQ_DRM_DEVICES", "/dev/dri/card0:/dev/dri/card1")
```

En pratique, il n'y a aucun ordre garanti quant à quel nœud sera utilisé comme rendu principal dans une machine virtuelle. Il est important que vous décidiez manuellement de la priorité.

> [!WARN]
> Certains hyperviseurs peuvent exposer des topologies PCI qui peuvent être comprises différemment à chaque démarrage. Pour être sûr de définir le bon nœud, référez-vous à la [section Multi-GPU sur les chemins de périphérique cohérents](../Multi-GPU/#creating-consistent-device-paths-for-specific-cards) pour renommer les nœuds et rendre votre configuration cohérente entre les redémarrages. 

## Accéder à l'affichage virtuel

Quand Hyprland démarre sans aucune sortie d'affichage, il initialisera une sortie headless appelée `HEADLESS-0` avec une résolution et un taux d'image de `1920x1080@60Hz`, que vous pouvez modifier dans votre fichier `hyprland.conf` habituel.

Vous devez utiliser un serveur de bureau à distance, prenant en charge le protocole de capture wlroots, pour accéder à l'affichage et interagir avec Hyprland.

Les serveurs suivants sont connus pour être pris en charge :
- [Sunshine/Moonlight](https://app.lizardbyte.dev/Sunshine/)
- [Apollo/Artemis (Moonlight Noir)](https://github.com/ClassicOldSong/Apollo)
- [Wayvnc](https://github.com/any1/wayvnc)

Une fois que vous démarrez Hyprland, vous pouvez démarrer votre serveur à distance en utilisant `hyprctl` sur le système invité (voir [Utiliser hyprctl](../Using-hyprctl))
```bash
hyprctl --instance 0 dispatch 'exec_raw("Sunshine")'
```

Le serveur d'affichage à distance devrait s'exécuter en dessous du processus Hyprland pour hériter de toutes ses variables d'environnement. Sinon, il ne trouvera pas votre affichage headless.

Si tout est configuré et fonctionne correctement, vous pouvez configurer votre serveur dans votre fichier `hyprland.conf` pour qu'il démarre automatiquement. (Voir la [FAQ](../../Basics/Autostart)) :
```lua
hl.on("hyprland.start", function ()
    hl.exec_cmd("Sunshine")
end)
```

Félicitations pour l'obtention de votre tout nouveau bureau Hyprland virtuel.
