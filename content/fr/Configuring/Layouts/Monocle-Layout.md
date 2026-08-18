---
weight: 23
title: Disposition Monocle
---

> [!NOTE]
> Vous cherchez l'ancienne syntaxe hyprlang ? Consultez les [pages du wiki 0.54](https://wiki.hypr.land/0.54.0/).
> Depuis Hyprland 0.55, hyprlang est devenu obsolète au profit de lua.

Monocle est une disposition où les fenêtres occupent toujours tout l'espace disponible.

<video width="1024" height="566" autoplay muted>
  <source src="https://dl.hypr.land/wiki/demo_monocle.mp4" type="video/mp4">
</video>

## Particularités

En raison du fonctionnement des dispositions, `hl.dsp.window.cycle_next()` ne fonctionnera pas avec Monocle. Pour parcourir les
fenêtres en monocle, utilisez plutôt `hl.dsp.layout("cyclenext")` ou `hl.dsp.window.cycle_next({ tiled = true })`.

## Messages de disposition

Paramètres du dispatcher `hl.dsp.layout(msg)` :

| nom | description | paramètres |
| --- | --- | --- |
| cyclenext | passe à la fenêtre suivante | aucun | 
| cycleprev | passe à la fenêtre précédente | aucun | 
