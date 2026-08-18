---
weight: 11
title: Périphériques
---

> [!NOTE]
> Vous cherchez l'ancienne syntaxe hyprlang ? Consultez les [pages du wiki 0.54](https://wiki.hypr.land/0.54.0/).
> Depuis Hyprland 0.55, hyprlang est devenu obsolète au profit de lua.

Pour les configurations globales de périphériques, consultez la page [Variables](../../Basics/Variables). Cette page
se concentrera sur les configurations par périphérique.

Une configuration de base par périphérique se fait via la fonction `hl.device()` :

```lua
hl.device({
    name = "my-epic-keyboard",
    sensitivity = -0.5
})
```

Le `name` peut être facilement obtenu en vérifiant la sortie de `hyprctl devices`.

À l'intérieur, placez vos options de configuration. Toutes les options de la catégorie `input`
(et toutes les sous-catégories, par ex. `input.touchpad`) peuvent y être placées, **SAUF** :

- `force_no_accel`
- Les options qui configurent la gestion de fenêtre, telles que : `follow_mouse`,
  `follow_mouse_threshold`, `float_switch_override_focus`, `mouse_refocus`,
  `special_fallthrough`, etc.


Vous pouvez aussi utiliser le paramètre `output` pour les tablettes afin de les lier à des sorties.
N'oubliez pas d'utiliser le nom de la `Tablet` et non `Tablet Pad` ou `Tablet Tool`.

Propriétés supplémentaires présentes uniquement dans les configurations par périphérique :

- `enabled` -> (uniquement pour les souris / touchpads / périphériques tactiles / claviers)
  - active / désactive le périphérique (connecte / déconnecte du curseur à l'écran)
  - par défaut : activé
- `keybinds` -> (uniquement pour les périphériques qui envoient des événements de touche)
  - active / désactive les raccourcis clavier pour le périphérique
  - par défaut : activé
- `tags` -> (uniquement pour les claviers / pointeurs)
  - fournit un regroupement et des noms alternatifs pour les raccourcis spécifiques à un périphérique (voir [Raccourcis par appareil](../../Basics/Binds#per-device-binds)). liste de tags séparés par des virgules
  - par défaut : ""

> [!NOTE]
> Les dispositions par périphérique n'altéreront par défaut pas la keymap des raccourcis clavier, donc par exemple
> avec une keymap globale `us` et une keymap par périphérique `fr`, les raccourcis clavier
> se comporteront toujours comme si vous étiez sur `us`.
> 
> Vous pouvez changer ce comportement en définissant `resolve_binds_by_sym = 1`. Dans ce cas,
> vous devrez taper le symbole spécifié dans le raccourci pour l'activer.
