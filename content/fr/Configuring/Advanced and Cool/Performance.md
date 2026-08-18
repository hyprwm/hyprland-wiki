---
weight: 300
title: Performance
---

> [!NOTE]
> Vous cherchez l'ancienne syntaxe hyprlang ? Consultez les [pages du wiki 0.54](https://wiki.hypr.land/0.54.0/).
> Depuis Hyprland 0.55, hyprlang est devenu obsolète au profit de lua.

Cette page documente des astuces et correctifs connus pour améliorer les performances si par hasard
vous rencontrez des problèmes ou si les animations ne vous importent pas tant que ça.

## Mise à l'échelle fractionnaire

La mise à l'échelle fractionnaire de Wayland est bien meilleure qu'avant, mais elle n'est pas parfaite.
Certaines applications ne la prennent pas encore en charge ou le support est expérimental au mieux.
Si vous avez des problèmes avec une utilisation élevée de votre carte graphique ou si Hyprland
semble saccadé, essayez de définir la mise à l'échelle sur des nombres entiers tels que `1` ou `2`
comme dans cet exemple `hl.monitor({ output = "", mode = "preferred", position = "auto", scale = 2 })`.

## FPS faibles/saccades/chutes de FPS sur iGPU Intel avec TLP (principalement les ordinateurs portables)

Les valeurs par défaut de TLP sont plutôt agressives. Définir `INTEL_GPU_MIN_FREQ_ON_AC`
et/ou `INTEL_GPU_MIN_FREQ_ON_BAT` dans `/etc/tlp.conf` à une valeur légèrement
plus élevée (par ex. 500 au lieu de 300) réduira significativement les saccades ou, dans le meilleur
des cas, les supprimera complètement.

## Comment faire pour que Hyprland consomme le moins d'énergie possible sur mon ordinateur portable ?

**_Optimisations utiles_** :

- `hl.config({ decoration = { blur = { enabled = false } } })` et `hl.config({ decoration = { shadow = { enabled = false } } })` pour désactiver
  les effets sophistiqués mais gourmands en batterie.

## Mes jeux fonctionnent mal, particulièrement ceux sous proton

Utiliser `gamescope` a tendance à corriger tous les problèmes avec Wayland/Hyprland.
