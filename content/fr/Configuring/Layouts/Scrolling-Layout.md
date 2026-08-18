---
weight: 22
title: Disposition Scrolling
---

> [!NOTE]
> Vous cherchez l'ancienne syntaxe hyprlang ? Consultez les [pages du wiki 0.54](https://wiki.hypr.land/0.54.0/).
> Depuis Hyprland 0.55, hyprlang est devenu obsolète au profit de lua.

Scrolling est une disposition où les fenêtres sont positionnées sur une bande qui s'étend à l'infini.

<video width="1024" height="566" autoplay muted>
  <source src="https://dl.hypr.land/wiki/demo_scrolling.mp4" type="video/mp4">
</video>

## Configuration

nom de catégorie : `scrolling` (`hl.config({ scrolling = {...} })`)

| nom | description | type | par défaut |
| --- | --- | --- | --- |
|fullscreen_on_one_column|quand activé, une colonne unique sur un espace de travail occupera toujours tout l'écran. | bool | `true` |
| column_width | la largeur par défaut d'une colonne, [0.1 - 1.0]. | float | `0.5` |
| focus_fit_method | Quand une colonne reçoit le focus, quelle méthode utiliser pour l'amener dans la vue. 0 = centrer, 1 = ajuster | int | `1` |
| follow_focus | quand une fenêtre reçoit le focus, la disposition doit-elle se déplacer pour l'amener automatiquement dans la vue | bool | `true` |
| follow_min_visible | quand une fenêtre reçoit le focus, exige qu'au moins une fraction donnée de celle-ci soit visible pour que le focus suive. Une entrée explicite (par ex. raccourcis, clics) suivra toujours. [0.0 - 1.0] | float | `0.4` |
| explicit_column_widths | Une liste de largeurs préconfigurées séparées par des virgules pour colresize +conf/-conf | str | `"0.333, 0.5, 0.667, 1.0"` |
| wrap_focus | Quand activé, fait que `hl.dsp.layout("focus l/r")` reboucle au début et à la fin. | bool | `true` |
| wrap_swapcol | Quand activé, fait que `hl.dsp.layout("swapcol l/r")` reboucle au début et à la fin. | bool | `true` |
| direction | Direction dans laquelle les nouvelles fenêtres apparaissent et dans laquelle la disposition défile. `"left"`/`"right"`/`"down"`/`"up"` | str | `"right"` |

## Règles d'espace de travail

| nom | description | type |
| --- | --- | --- |
| direction | Identique à hl.config({ scrolling{ direction } }) | str |

par ex.

```lua
hl.workspace_rule({ workspace = "2", layout_opts = { direction = "right" } })
```

## Messages de disposition

Paramètres du dispatcher `hl.dsp.layout(msg)` :

| nom | description | paramètres |
| --- | --- | --- |
| move | déplace la disposition horizontalement, soit par un nombre relatif de px logiques (`-200`, `+200`) soit par colonnes (`+col`, `-col`) | données de déplacement |
| colresize | redimensionne la colonne actuelle, soit à une valeur soit par une valeur relative par ex. `0.5`, `+0.2`, `-0.2`, ou fait défiler les valeurs préconfigurées avec `+conf` ou `-conf`. Peut aussi être `all (number)` pour redimensionner toutes les colonnes à une largeur spécifique | float relatif / conf relatif |
| fit | exécute une opération d'ajustement selon l'argument. Disponible : `active`, `visible`, `all`, `toend`, `tobeg`, `expand`. <br> `fit expand` étendra la fenêtre actuelle pour occuper l'espace libre restant sur le moniteur | mode d'ajustement |
| fit_into_view | ajuste la colonne actuellement active pour qu'elle soit entièrement dans la vue | aucun |
| focus | déplace le focus et centre la disposition, tout en rebouclant plutôt que de se déplacer vers les moniteurs voisins. | direction |
| promote | déplace une fenêtre vers sa propre nouvelle colonne | aucun |
| swapcol | Échange la colonne actuelle avec sa voisine de gauche (`l`) ou de droite (`r`). L'échange reboucle (par ex., échanger la première colonne vers la gauche la déplace à la fin). | `l` ou `r` |
| inhibit_scroll | Empêche la vue de défilement de bouger pour l'espace de travail actuellement actif. Le basculement est indépendant pour chaque espace de travail | laissez vide pour basculer, ou `bool` pour activer/désactiver explicitement
| expel | déplace la fenêtre actuelle vers une colonne dédiée | aucun |
| consume | déplace la fenêtre actuelle dans la colonne précédente | aucun |
| consume_or_expel | expulse si elle n'est pas seule, absorbe si elle est seule dans une colonne | `prev` ou `next` |



Exemple de raccourcis clavier pour votre configuration Hyprland :

```lua
hl.bind(mainMod .. " + period", hl.dsp.layout("move +col"))
hl.bind(mainMod .. " + comma", hl.dsp.layout("swapcol l"))
```

## Règles de fenêtre

Avec la règle statique scrolling_width, vous pouvez définir une largeur de colonne de départ pour une fenêtre.

```lua
hl.window_rule({ name = "kitty_starting_width", match = { class = "kitty" }, scrolling_width = 0.5})
```


## Plein écran géré par la disposition - Scrolling

Scrolling dispose d'un comportement de plein écran optionnel géré par la disposition qui utilise le propre gestionnaire de plein écran de Scrolling.

Vous pouvez l'utiliser en utilisant `layout_aware = true` (ou en ne spécifiant pas du tout l'option `layout_aware`) dans vos dispatchs de plein écran lorsque vous êtes sur un espace de travail en disposition scrolling.

Ce comportement de plein écran personnalisé vous permet de faire défiler loin de vos fenêtres en plein écran sans qu'elles ne quittent le mode plein écran.

Cela fonctionne aussi avec les sélecteurs existants liés au plein écran de fenêtre/espace de travail.

En savoir plus sur les [gestionnaires de plein écran](../../Basics/Dispatchers#fullscreen-handlers)
