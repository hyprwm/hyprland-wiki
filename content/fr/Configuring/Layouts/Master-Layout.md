---
weight: 21
title: Disposition Master
---

> [!NOTE]
> Vous cherchez l'ancienne syntaxe hyprlang ? Consultez les [pages du wiki 0.54](https://wiki.hypr.land/0.54.0/).
> Depuis Hyprland 0.55, hyprlang est devenu obsolète au profit de lua.

La disposition master fait qu'une (ou plusieurs) fenêtre(s) devienne(nt) la « master », prenant (par
défaut) la partie gauche de l'écran, et met le reste en mosaïque à droite. Vous pouvez
changer l'orientation par espace de travail si vous voulez utiliser autre chose
que la division gauche/droite par défaut.

<video width="1024" height="566" autoplay muted>
  <source src="https://dl.hypr.land/wiki/demo_master.mp4" type="video/mp4">
</video>

## Configuration

nom de catégorie `master` (`hl.config({ master = {...} })`)

| nom | description | type | par défaut |
| --- | --- | --- | --- |
| allow_small_split | active l'ajout de fenêtres master supplémentaires dans un style de division horizontale | bool | `false` |
| special_scale_factor | l'échelle des fenêtres de l'espace de travail spécial. [0.0 - 1.0] | float | `1` |
| mfact | la taille en pourcentage de la fenêtre master, par exemple `mfact = 0.70` signifierait que 70% de l'écran sera la fenêtre master, et 30% l'esclave [0.0 - 1.0] | floatvalue | `0.55 `|
| new_status | `"master"` : la nouvelle fenêtre devient master ; `"slave"` : les nouvelles fenêtres sont ajoutées à la pile esclave ; `"inherit"` : hérite de la fenêtre focalisée | string | `"slave"` |
| new_on_top | si une fenêtre nouvellement ouverte doit être placée en haut de la pile | bool | `false` |
| new_on_active | `"before"`, `"after"` : place la nouvelle fenêtre par rapport à la fenêtre focalisée ; `"none"` : place la nouvelle fenêtre selon la valeur de `new_on_top`.  | string | `"none"` |
| orientation | placement par défaut de la zone master, peut être `"left"`, `"right"`, `"top"`, `"bottom"` ou `"center"` | string | `"left"` |
| slave_count_for_center_master | quand orientation=center est utilisé, ne centre la fenêtre master que lorsqu'au moins ce nombre de fenêtres esclaves sont ouvertes. (Définir à 0 pour always_center_master) | int | `2` |
| center_master_fallback | Définit le repli pour le centrage master quand il y a moins d'esclaves que slave_count_for_center_master, peut être `"left"`, `"right"`, `"top"`, `"bottom"` | string | `"left"` |
| smart_resizing | si activé, la direction de redimensionnement sera déterminée par la position de la souris sur la fenêtre (le coin le plus proche). Sinon, elle est basée sur la position en mosaïque de la fenêtre. | bool | `true` |
| drop_at_cursor | quand activé, glisser-déposer des fenêtres les placera à la position du curseur. Sinon, lorsqu'elles sont déposées du côté de la pile, elles iront en haut/bas de la pile selon new_on_top. | bool | `true` |
| always_keep_position | s'il faut garder la fenêtre master à sa position configurée quand il n'y a pas de fenêtres esclaves | bool | `false` |
| focus_master_on_close | quand activé, fermer une fenêtre donne le focus à la fenêtre master | bool | `false` |

## Messages de disposition

Paramètres du dispatcher `hl.dsp.layout(string)` :

| commande | description | paramètres |
| --- | --- | --- |
| swapwithmaster | échange la fenêtre actuelle avec la master. Si la fenêtre actuelle est la master, l'échange avec le premier enfant. | soit `master` (le nouveau focus est la nouvelle fenêtre master), `child` (le nouveau focus est le nouvel enfant) ou `auto` (par défaut, garde le focus de la fenêtre précédemment focalisée). Ajouter `ignoremaster` ignorera ce dispatcher si master a déjà le focus. |
| focusmaster | donne le focus à la fenêtre master. | soit `master` (le focus reste sur master), `auto` (par défaut ; donne le focus à la première fenêtre non-master si déjà sur master) ou `previous` (se souvient de la fenêtre actuelle en donnant le focus à master, si déjà sur master, donne le focus à la précédente ou se replie sur `auto`). |
| cyclenext | donne le focus à la fenêtre suivante en respectant la disposition | soit `loop` (autorise le rebouclage du bas de la pile vers master) ou `noloop` (force l'arrêt en bas de la pile, comme dans DWM). `loop` est la valeur par défaut si laissé vide. |
| cycleprev | donne le focus à la fenêtre précédente en respectant la disposition | soit `loop` (autorise le rebouclage de master vers le bas de la pile) ou `noloop` (force l'arrêt sur master, comme dans DWM). `loop` est la valeur par défaut si laissé vide. |
| swapnext | échange la fenêtre focalisée avec la fenêtre suivante en respectant la disposition | soit `loop` (autorise l'échange entre le bas de la pile et master) ou `noloop` (ne l'autorise pas, comme dans DWM). `loop` est la valeur par défaut si laissé vide. |
| swapprev | échange la fenêtre focalisée avec la fenêtre précédente en respectant la disposition | soit `loop` (autorise l'échange entre master et le bas de la pile) ou `noloop` (ne l'autorise pas, comme dans DWM). `loop` est la valeur par défaut si laissé vide. |
| addmaster | ajoute une master du côté master. Ce sera la fenêtre active, si ce n'est pas une master, ou la première fenêtre non-master. | aucun |
| removemaster | retire une master du côté master. Ce sera la fenêtre active, si c'est une master, ou la dernière fenêtre master. | aucun |
| orientationleft | définit l'orientation de l'espace de travail actuel sur gauche (zone master à gauche, fenêtres esclaves à droite, empilées verticalement) | aucun |
| orientationright | définit l'orientation de l'espace de travail actuel sur droite (zone master à droite, fenêtres esclaves à gauche, empilées verticalement) | aucun |
| orientationtop | définit l'orientation de l'espace de travail actuel sur haut (zone master en haut, fenêtres esclaves en bas, empilées horizontalement) | aucun |
| orientationbottom | définit l'orientation de l'espace de travail actuel sur bas (zone master en bas, fenêtres esclaves en haut, empilées horizontalement) | aucun |
| orientationcenter | définit l'orientation de l'espace de travail actuel sur centre (zone master au centre, fenêtres esclaves alternant à gauche et à droite, empilées verticalement) | aucun |
| orientationnext | passe à l'orientation suivante pour l'espace de travail actuel (sens horaire) | aucun |
| orientationprev | passe à l'orientation précédente pour l'espace de travail actuel (sens antihoraire) | aucun |
| orientationcycle | passe à l'orientation suivante depuis la liste fournie, pour l'espace de travail actuel | valeurs autorisées : `left`, `top`, `right`, `bottom`, ou `center`. Les valeurs doivent être séparées par un espace. Si laissé vide, cela fonctionnera comme `orientationnext` |
| mfact | change mfact, le ratio de division master | le nouveau ratio de division, un delta float relatif (par ex. `-0.2` ou `+0.2`) ou `exact` suivi de la valeur float exacte entre 0.0 et 1.0 |
| rollnext | fait tourner la fenêtre suivante de la pile pour qu'elle devienne la master, tout en gardant le focus sur master | aucun |
| rollprev | fait tourner la fenêtre précédente de la pile pour qu'elle devienne la master, tout en gardant le focus sur master | aucun |

Les paramètres des commandes sont séparés par un seul espace.

> [!NOTE]
> Exemple d'utilisation :
> 
> ```lua
> hl.bind(KEYS, hl.dsp.layout("cyclenext"))
> -- behaves like xmonads promote feature (https://hackage.haskell.org/package/xmonad-contrib-0.17.1/docs/XMonad-Actions-Promote.html)
> hl.bind(KEYS, hl.dsp.layout("swapwithmaster master"))
> ```

## Règles d'espace de travail

Règles `layout_opts` :

| règle | description | type |
| --- | --- | --- |
| orientation = [o] | Définit l'orientation d'un espace de travail. Pour les orientations disponibles, voir [Configuration->orientation](#config) | string |

Exemple d'utilisation :

```lua
hl.workspace_rule({ workspace = "2", layout_opts =  { orientation = "top" } })
```
