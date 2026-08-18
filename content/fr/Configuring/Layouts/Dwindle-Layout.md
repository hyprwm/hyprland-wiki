---
weight: 20
title: Disposition Dwindle
---

> [!NOTE]
> Vous cherchez l'ancienne syntaxe hyprlang ? Consultez les [pages du wiki 0.54](https://wiki.hypr.land/0.54.0/).
> Depuis Hyprland 0.55, hyprlang est devenu obsolète au profit de lua.

Dwindle est une disposition à la BSPWM, où chaque fenêtre sur un espace de travail est membre d'
un arbre binaire.

<video width="1024" height="566" autoplay muted>
  <source src="https://dl.hypr.land/wiki/demo_dwindle.mp4" type="video/mp4">
</video>

## Particularités

Les divisions Dwindle ne sont PAS PERMANENTES. La division est déterminée dynamiquement selon le
rapport L/H du nœud parent. Si L > H, c'est côte à côte. Si H > L, c'est
en haut et en bas. Vous pouvez les rendre permanentes en activant `preserve_split`.

## Configuration

nom de catégorie : `dwindle`

| nom | description | type | par défaut |
| --- | --- | --- | --- |
| force_split | 0 -> la division suit la souris, 1 -> divise toujours à gauche (nouveau = gauche ou haut), 2 -> divise toujours à droite (nouveau = droite ou bas) | int | `0` |
| preserve_split | si activé, la division (côté/haut) ne changera pas peu importe ce qui arrive au conteneur. | bool | `false` |
| smart_split | si activé, permet un contrôle plus précis sur la direction de division de fenêtre en fonction de la position du curseur. La fenêtre est conceptuellement divisée en quatre triangles, et le triangle du curseur détermine la direction de division. Cette fonctionnalité active aussi preserve_split. | bool | `false` |
| smart_resizing | si activé, la direction de redimensionnement sera déterminée par la position de la souris sur la fenêtre (le coin le plus proche). Sinon, elle est basée sur la position en mosaïque de la fenêtre. | bool | `true` |
| permanent_direction_override | si activé, fait persister la direction de présélection jusqu'à ce que soit ce mode soit désactivé, soit une autre direction soit spécifiée, soit une non-direction soit spécifiée (autre chose que l,r,u/t,d/b) | bool | `false` |
| special_scale_factor | spécifie le facteur d'échelle des fenêtres sur l'espace de travail spécial [0 - 1] | float | `1` |
| split_width_multiplier | spécifie le multiplicateur de largeur de division automatique. Multiplier la taille de fenêtre est utile sur les moniteurs ultra-larges où la largeur de fenêtre L > H même après plusieurs divisions. | float | `1.0` |
| use_active_for_splits | s'il faut préférer la fenêtre active ou la position de la souris pour les divisions | bool | `true` |
| default_split_ratio | le ratio de division par défaut à l'ouverture de fenêtre. 1 signifie une division égale 50/50. [0.1 - 1.9] | float | `1.0` |
| split_bias | spécifie quelle fenêtre recevra le ratio de division. 0 -> directionnel (la fenêtre du haut ou de gauche), 1 -> la fenêtre actuelle | int | `0` |
| precise_mouse_move | bindm movewindow déposera la fenêtre plus précisément selon la position de votre souris. | bool | `false` |

```lua
hl.config({
  dwindle = {
      force_split                  = 0,
      preserve_split               = false,
      smart_split                  = false,
      smart_resizing               = true,
      permanent_direction_override = false,
      special_scale_factor         = 1,
      split_width_multiplier       = 1.0,
      use_active_for_splits        = true,
      default_split_ratio          = 1.0,
      split_bias                   = 0,
      precise_mouse_move           = false,
  },
})
```

## Dispatchers

| dispatcher | description | paramètres |
| --- | --- | --- |
| window.pseudo | bascule le mode pseudo de la fenêtre donnée | laisser vide / `"active"` pour la fenêtre actuelle, ou `"window"` pour une fenêtre spécifique |

```lua
hl.bind("SUPER + P", hl.dsp.window.pseudo())
```

## Messages de disposition

Paramètres du dispatcher `hl.dsp.layout(msg)` :

| paramètre | description | arguments |
| --- | --- | --- |
| splitratio | change le ratio de division | float [0.1-1.9] |
| togglesplit | bascule la division (haut/côté) de la fenêtre actuelle. `preserve_split` doit être activé pour que le basculement fonctionne. | aucun |
| swapsplit | échange les deux moitiés de la division de la fenêtre actuelle. | aucun |
| rotatesplit | fait pivoter la division de la fenêtre actuelle d'un angle optionnellement spécifié. L'angle doit être un multiple de 90. Les nombres positifs vont dans le sens horaire, les négatifs dans le sens antihoraire. Par défaut : 90. | [angle] |
| preselect | une surcharge ponctuelle pour la direction de division. (valide pour la prochaine fenêtre à ouvrir, fonctionne uniquement sur les fenêtres en mosaïque) | direction |
| movetoroot | déplace la fenêtre sélectionnée (fenêtre active si non spécifié) vers la racine de l'arbre de son espace de travail. Le comportement par défaut maximise la fenêtre dans son sous-arbre actuel. Si `unstable` est fourni comme second argument, la fenêtre sera échangée avec l'autre sous-arbre à la place. Il n'est pas possible de fournir uniquement le second argument, mais `movetoroot active unstable` obtiendra le même résultat. | [window, [ string ]] |

>[!NOTE]
>`splitratio` utilise par défaut un delta positif, donc `"splitratio 0.5"` fera que la division
>actuelle se déplace vers la droite de 0.5. Vous pouvez aussi le rendre explicitement un delta positif avec 
>`"splitratio +0.5"`. 
>
>De même, `"splitratio -0.5"` la déplacera vers la gauche de 0.5. 
>
>Enfin, nous pouvons utiliser le mot-clé `exact` après une valeur pour définir précisément le ratio de division à 
>cette valeur. `"splitratio 1.0 exact"` mettra *toujours* la division exactement au centre.

Exemple d'utilisation :

```lua
hl.bind("SUPER + A", hl.dsp.layout("togglesplit"))
```
