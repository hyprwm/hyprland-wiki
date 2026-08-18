---
weight: 80
title: Multi-GPU
---

> [!NOTE]
> Vous cherchez l'ancienne syntaxe hyprlang ? Consultez les [pages du wiki 0.54](https://wiki.hypr.land/0.54.0/).
> Depuis Hyprland 0.55, hyprlang est devenu obsolète au profit de lua.

## Général

Si votre machine hôte utilise plusieurs GPU, vous voudrez peut-être utiliser un GPU
pour rendre tous les éléments de Hyprland, y compris les fenêtres, animations, et
un autre pour l'accélération matérielle de certaines applications, etc.

Cette configuration est très courante dans les portables gaming, les hôtes capables
de GPU-passthrough (sans VFIO), et si vous avez plusieurs GPU en général.

## Détecter les GPU

Pour ce cas, l'auteur prend l'exemple de son propre ordinateur portable.

En exécutant `lspci -d ::03xx`, on peut lister tous les contrôleurs d'affichage PCI
disponibles.

```plain
01:00.0 VGA compatible controller: NVIDIA Corporation TU117M [GeForce GTX 1650 Mobile / Max-Q] (rev a1)
06:00.0 VGA compatible controller: Advanced Micro Devices, Inc. [AMD/ATI] Cezanne [Radeon Vega Series / Radeon Vega Mobile Series] (rev c6)
```

Ici, il est clair que 2 GPU sont disponibles, le GTX 1650 Mobile/Max-Q NVIDIA
dédié et le GPU AMD Cezanne Radeon Vega Series intégré.

Maintenant, exécutez `ls -l /dev/dri/by-path`

```plain
 total 0
lrwxrwxrwx 1 root root  8 Jul 14 15:45 pci-0000:01:00.0-card -> ../card0
lrwxrwxrwx 1 root root 13 Jul 14 15:45 pci-0000:01:00.0-render -> ../renderD128
lrwxrwxrwx 1 root root  8 Jul 14 15:45 pci-0000:06:00.0-card -> ../card1
lrwxrwxrwx 1 root root 13 Jul 14 15:45 pci-0000:06:00.0-render -> ../renderD129
```

Donc d'après les sorties ci-dessus, nous pouvons voir que le chemin pour la carte AMD est
`pci-0000:06:00.0-card`, en raison de la correspondance `06:00.0` avec la première commande.
N'utilisez pas le lien symbolique `card1` indiqué ici. Il est assigné dynamiquement au
démarrage et sujet à des changements fréquents, ce qui le rend inadapté comme marqueur pour la sélection du GPU.

## Indiquer à Hyprland quel GPU utiliser

Après avoir déterminé quelle « carte » appartient à quel GPU, nous pouvons maintenant indiquer à
Hyprland quels GPU utiliser en définissant la variable d'environnement `AQ_DRM_DEVICES`.

> [!NOTE]
> Il est généralement recommandé pour les portables d'utiliser le GPU intégré comme rendu
> principal, car cela préserve la durée de vie de la batterie et est pratiquement indiscernable
> de l'utilisation du GPU dédié sur les systèmes modernes dans la plupart des cas. Hyprland peut être
> exécuté sur des GPU intégrés sans problème. Le même principe s'applique pour les configurations de bureau
> avec des GPU de puissance respectivement plus basse et plus élevée.

Si vous voulez utiliser un autre GPU, ou si le mauvais GPU est choisi par défaut,
définissez `AQ_DRM_DEVICES` à une liste de chemins de cartes séparés par `:`, par ex.

```lua
hl.env("AQ_DRM_DEVICES", "/dev/dri/card0:/dev/dri/card1")
```

Ici, nous indiquons à Hyprland quels GPU il est autorisé à utiliser, par ordre de priorité. 
Par exemple, `card0` sera le rendu principal, mais s'il n'est pas disponible pour
une raison quelconque, alors `card1` devient principal.

Notez que si vous avez un moniteur externe connecté, par exemple, à `card1`,
cette carte doit être incluse dans `AQ_DRM_DEVICES` pour que le moniteur fonctionne, bien qu'
elle n'ait pas besoin d'être le rendu principal.

Vous devriez maintenant pouvoir utiliser un GPU intégré pour des charges GPU plus légères,
y compris Hyprland, ou utiliser par défaut votre dGPU si vous préférez.

> [!NOTE]
> Les utilisateurs de [uwsm](../../../Useful-Utilities/Systemd-start) sont plutôt invités à exporter la variable `AQ_DRM_DEVICES` dans `~/.config/uwsm/env-hyprland`. 
> Cette méthode garantit que la variable est correctement exportée vers l'environnement systemd sans entrer en conflit avec d'autres compositeurs ou environnements de bureau.
> 
> ```plain
> export AQ_DRM_DEVICES="/dev/dri/card0:/dev/dri/card1"
> ```

## Créer des chemins de périphérique cohérents pour des cartes spécifiques

Comme mentionné ci-dessus, il n'est pas recommandé d'utiliser les chemins de périphérique `/dev/dri/card*` car ils
changent périodiquement de périphérique auquel ils sont liés symboliquement. De plus, les deux-points dans les chemins
de périphérique de carte réels ne sont pas utilisables dans la variable d'environnement `AQ_DRM_DEVICES` puisque les deux-points `:` sont
utilisés comme séparateur pour plusieurs chemins.

Il est possible d'utiliser des règles udev pour créer des liens symboliques fiables vers des cartes de périphérique particulières. Par exemple,
pour créer un lien symbolique vers une carte AMD au chemin `/dev/dri/amd-igpu`, nous pouvons créer une règle udev à
`/etc/udev/rules.d/amd-igpu-dev-path.rules` de façon programmatique comme ceci :

```sh
SYMLINK_NAME="amd-igpu"
RULE_PATH="/etc/udev/rules.d/amd-igpu-dev-path.rules"
AMD_IGPU_ID=$(lspci -d ::03xx | grep 'AMD' | cut -f1 -d' ')
UDEV_RULE="$(cat <<EOF
KERNEL=="card*", \
KERNELS=="0000:$AMD_IGPU_ID", \
SUBSYSTEM=="drm", \
SUBSYSTEMS=="pci", \
SYMLINK+="dri/$SYMLINK_NAME"
EOF
)"

echo "$UDEV_RULE" | sudo tee "$RULE_PATH"
```
Puis rechargez les règles udev avec :
```sh
sudo udevadm control --reload
sudo udevadm trigger
```

Il devrait maintenant y avoir un lien symbolique à `/dev/dri/amd-igpu` qui pointe vers votre fichier de carte respectif :
```console
$ ls -l /dev/dri/amd-igpu
lrwxrwxrwx 1 root root 5 /dev/dri/amd-igpu -> card1
```

Ce lien symbolique se mettra automatiquement à jour pour pointer vers le bon fichier de carte s'il venait à changer.

Il est maintenant possible d'utiliser le nouveau lien symbolique dans la variable d'environnement `AQ_DRM_DEVICES` :
```lua
hl.env("AQ_DRM_DEVICES", "/dev/dri/amd-igpu")
```
