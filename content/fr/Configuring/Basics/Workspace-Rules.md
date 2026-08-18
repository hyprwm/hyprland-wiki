---
weight: 8
title: Règles d'espace de travail
---

> [!NOTE]
> Vous cherchez l'ancienne syntaxe hyprlang ? Consultez les [pages du wiki 0.54](https://wiki.hypr.land/0.54.0/).
> Depuis Hyprland 0.55, hyprlang est devenu obsolète au profit de lua.

Vous pouvez définir des règles d'espace de travail pour obtenir des comportements spécifiques à un espace de travail. Par
exemple, vous pouvez définir un espace de travail où toutes les fenêtres sont dessinées sans bordures
ni espacements.

Pour les règles spécifiques à une disposition, consultez la page de disposition correspondante. Par exemple :
[Disposition Master->Règles d'espace de travail](../../Layouts/Master-Layout#workspace-rules).

## Syntaxe

```lua
hl.workspace_rule(workspace, rule1, rule2, ...)
```

- WORKSPACE est un identifiant d'espace de travail valide (voir
  [Dispatchers->Espaces de travail](../Dispatchers#workspace)). Ce champ est
  obligatoire. Il *peut* s'agir d'un sélecteur d'espace de travail, mais notez que
  les sélecteurs d'espace de travail ne peuvent correspondre qu'à des espaces de travail *existants*.
- RULES est une (ou plusieurs) règle(s) telle(s) que décrite(s) ici dans [rules](#rules).

### Sélecteurs d'espace de travail

Les espaces de travail déjà créés peuvent être ciblés par des sélecteurs
d'espace de travail, par ex. `r[2-4] w[t1]`.

Les sélecteurs ont des propriétés séparées par un espace. Aucun espace n'est autorisé à l'intérieur
des propriétés elles-mêmes.

Propriétés :

- `r[A-B]` - Plage d'ID de A à B inclus
- `s[bool]` - Si l'espace de travail est spécial ou non
- `n[bool]`, `n[s:string]`, `n[e:string]` - actions nommées. `n[bool]` ->
  si un espace de travail est un espace de travail nommé, `s` et `e` sont respectivement
  « commence par » et « se termine par »
- `m[monitor]` - Sélecteur de moniteur
- `w[(flags)A-B]`, `w[(flags)X]` - Propriété pour le nombre de fenêtres sur l'espace de travail.
  A-B est une plage inclusive, X est un nombre spécifique. Les flags peuvent être omis.
  Cela peut être `t` pour uniquement les fenêtres en mosaïque, `f` pour uniquement les fenêtres flottantes, `g` pour compter les groupes
  au lieu des fenêtres, `v` pour compter uniquement les fenêtres visibles, et `p` pour compter
  uniquement les fenêtres épinglées.
- `f[-1]`, `f[0]`, `f[1]`, `f[2]` - état plein écran de l'espace de travail. `-1` : pas de
  plein écran, `0` : plein écran, `1` : maximisé, `2` : plein écran sans que
  l'état plein écran soit envoyé à la fenêtre. Ne correspond qu'aux espaces de travail avec des fenêtres FS couvrantes.

## Règles

| Règle | Description | type |
| --- | --- | --- |
| monitor | Lie un espace de travail à un moniteur. Voir [syntaxe](#syntax) et [Moniteurs](../Monitors). | string |
| default | Si cet espace de travail doit être l'espace de travail par défaut pour le moniteur donné | bool |
| gaps_in | Définit les espacements entre les fenêtres (équivalent à [General->gaps_in](../Variables#general)) | css_gaps | `5` |
| gaps_out | Définit les espacements entre les fenêtres et les bords du moniteur (équivalent à [General->gaps_out](../Variables#general)) | css_gaps | `20` |
| float_gaps | Définit les espacements pour les fenêtres flottantes (équivalent à [General->float_gaps](../Variables#general)) | css_gaps | `0` |
| border_size | Définit la taille de bordure autour des fenêtres (équivalent à [General->border_size](../Variables#general)) | int |
| no_border | Si les bordures doivent être désactivées | bool |
| no_shadow | Si les ombres doivent être désactivées | bool |
| no_wobble | Si l'effet « wobble » doit être désactivé | bool |
| no_rounding | Si les fenêtres arrondies doivent être désactivées | bool |
| decorate | Si les décorations de fenêtre doivent être dessinées ou non | bool |
| persistent | Conserve cet espace de travail actif même s'il est vide et inactif | bool |
| on_created_empty | Une commande à exécuter dès qu'un espace de travail est créé vide (c.-à-d. non créé en y déplaçant une fenêtre). Voir la [syntaxe de commande](../Dispatchers#executing-with-rules) | string |
| default_name | Un nom par défaut pour l'espace de travail. | string |
| layout | La disposition à utiliser pour cet espace de travail. | string |
| animation | Le style d'animation à utiliser pour cet espace de travail. | string |
| layout_opts | Une table d'options spécifiques à la disposition pour cet espace de travail. Les clés et valeurs dépendent de la disposition. | table |

## Exemples

```lua
hl.workspace_rule({ workspace = "3", no_rounding = true, decorate = false })
hl.workspace_rule({ workspace = "name:coding", no_rounding = true, decorate = false, gaps_in = 0, gaps_out = 0, no_border = true, monitor = "DP-1" })
hl.workspace_rule({ workspace = "8", border_size = 8 })
hl.workspace_rule({ workspace = "name:Hello", monitor = "DP-1", default = true })
hl.workspace_rule({ workspace = "name:gaming", monitor = "desc:Chimei Innolux Corporation 0x150C", default = true })
hl.workspace_rule({ workspace = "5", on_created_empty = "[float] firefox" })
hl.workspace_rule({ workspace = "special:scratchpad", on_created_empty = "foot" })
hl.workspace_rule({ workspace = "15", animation = "slidevert", default_name = "slider" })
```

### Espacements intelligents

Pour reproduire les « smart gaps » / « pas d'espacements quand il n'y a qu'une seule fenêtre » d'autres gestionnaires/compositeurs de fenêtres, utilisez ceci :

```lua
hl.workspace_rule({ workspace = "w[tv1]", gaps_out = 0, gaps_in = 0 })
hl.workspace_rule({ workspace = "f[1]", gaps_out = 0, gaps_in = 0 })
hl.window_rule({ match = { float = false, workspace = "w[tv1]" }, border_size = 0 })
hl.window_rule({ match = { float = false, workspace = "w[tv1]" }, rounding = 0 })
hl.window_rule({ match = { float = false, workspace = "f[1]" }, border_size = 0 })
hl.window_rule({ match = { float = false, workspace = "f[1]" }, rounding = 0 })
```

#### Espacements intelligents (en ignorant les espaces de travail spéciaux)

Vous pouvez combiner des sélecteurs d'espace de travail pour un contrôle plus fin, par exemple, pour ignorer les espaces de travail spéciaux :

```lua
hl.workspace_rule({ workspace = "w[tv1]s[false]", gaps_out = 0, gaps_in = 0 })
hl.workspace_rule({ workspace = "f[1]s[false]", gaps_out = 0, gaps_in = 0 })
hl.window_rule({ match = { float = false, workspace = "w[tv1]s[false]" }, border_size = 0 })
hl.window_rule({ match = { float = false, workspace = "w[tv1]s[false]" }, rounding = 0 })
hl.window_rule({ match = { float = false, workspace = "f[1]s[false]" }, border_size = 0 })
hl.window_rule({ match = { float = false, workspace = "f[1]s[false]" }, rounding = 0 })
```

### Dispositions par espace de travail

Utilisez les règles d'espace de travail pour définir une disposition par espace de travail :

```lua
hl.workspace_rule({ workspace = "2", layout = "scrolling" })
```
