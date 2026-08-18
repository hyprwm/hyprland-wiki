---
weight: 4
title: Moniteurs
---

> [!NOTE]
> Vous cherchez l'ancienne syntaxe hyprlang ? Consultez les [pages du wiki 0.54](https://wiki.hypr.land/0.54.0/).
> Depuis Hyprland 0.55, hyprlang est devenu obsolète au profit de lua.

## Général

La configuration générale d'un moniteur ressemble à ceci :

```lua
hl.monitor({
  output = "...",
  mode = "...",
  position = "...",
  scale = ...,
})
```

Un exemple courant :

```lua
hl.monitor({
  output = "DP-1",
  mode = "1920x1080@144",
  position = "0x0",
  scale = 1,
})
```

Cela fera du moniteur sur `DP-1` un écran `1920x1080`, à
144Hz, décalé de `0x0` par rapport au coin supérieur gauche, avec une échelle de 1 (non redimensionné).

Pour lister tous les moniteurs disponibles (actifs et inactifs) :

```bash
hyprctl monitors all
```

Les moniteurs sont positionnés sur une « disposition » virtuelle. `position` correspond à la position,
en pixels, de cet écran dans la disposition (calculée à partir du coin supérieur gauche).

Par exemple :

```lua
hl.monitor({ output = "DP-1", mode = "1920x1080", position = "0x0", scale = 1 })
hl.monitor({ output = "DP-2", mode = "1920x1080", position = "1920x0", scale = 1 })
```

indiquera à Hyprland de placer DP-1 à *gauche* de DP-2, tandis que

```lua
hl.monitor({ output = "DP-1", mode = "1920x1080", position = "1920x0", scale = 1 })
hl.monitor({ output = "DP-2", mode = "1920x1080", position = "0x0", scale = 1 })
```

indiquera à Hyprland de placer DP-1 à *droite*.

`position` peut contenir des valeurs *négatives*, l'exemple ci-dessus pourrait donc également être
écrit ainsi :

```lua
hl.monitor({ output = "DP-1", mode = "1920x1080", position = "0x0", scale = 1 })
hl.monitor({ output = "DP-2", mode = "1920x1080", position = "-1920x0", scale = 1 })
```

Hyprland utilise un système cartésien à Y inversé. Ainsi, une coordonnée y négative
place un moniteur plus haut, et une coordonnée y positive le place plus bas.

Par exemple :

```lua
hl.monitor({ output = "DP-1", mode = "1920x1080", position = "0x0", scale = 1 })
hl.monitor({ output = "DP-2", mode = "1920x1080", position = "0x-1080", scale = 1 })
```

indiquera à Hyprland de placer DP-2 *au-dessus* de DP-1, tandis que

```lua
hl.monitor({ output = "DP-1", mode = "1920x1080", position = "0x0", scale = 1 })
hl.monitor({ output = "DP-2", mode = "1920x1080", position = "0x1080", scale = 1 })
```

indiquera à Hyprland de placer DP-2 *en dessous*.

> [!NOTE]
> La position est calculée avec la résolution mise à l'échelle (et transformée), ce qui signifie
> que si vous voulez que votre moniteur 4K avec une échelle de 2 soit à gauche de votre moniteur 1080p, vous devrez
> utiliser la position `1920x0` pour le second écran (3840 / 2). Si le moniteur est
> également tourné de 90 degrés (vertical), vous devrez utiliser `1080x0`.

> [!WARNING]
> Aucun moniteur ne peut se chevaucher. Cela signifie que si vos positions définies font que des moniteurs
> se chevauchent, vous obtiendrez un avertissement.

> [!NOTE]
> Des avertissements « Invalid scale » apparaîtront si votre échelle ne produit pas de
> pixels logiques valides. Une échelle valide doit diviser votre résolution proprement (sans
> décimales). Par exemple 1920x1080 / 1.5 = 1280x720 -> OK, mais
> quand / 1.4 -> 1371.4286x771.42857 -> pas ok.

Laisser `output` vide définira une règle de repli à utiliser quand aucune autre règle ne
correspond.

Il existe quelques valeurs spéciales pour le champ `mode` :

- `preferred` - utilise la taille et le taux de rafraîchissement préférés de l'écran.
- `highres` - utilise la résolution la plus élevée prise en charge.
- `highrr` - utilise le taux de rafraîchissement le plus élevé pris en charge.
- `maxwidth` - utilise la résolution la plus large prise en charge.

`position` possède également quelques valeurs spéciales :

- `auto` - laisse Hyprland décider d'une position. Par défaut, il place chaque nouveau moniteur à droite des moniteurs existants,
  en utilisant le coin supérieur gauche du moniteur comme point de référence.
- `auto-right/left/up/down` - place le moniteur à droite/gauche, au-dessus ou en dessous des autres moniteurs,
  également basé sur le coin supérieur gauche de chaque moniteur comme référence.
- `auto-center-right/left/up/down` - place le moniteur à droite/gauche, au-dessus ou en dessous des autres moniteurs,
  mais calcule le placement à partir du centre de chaque moniteur plutôt que de son coin supérieur gauche.

_**Remarque :**_ Bien qu'il soit permis de spécifier une direction de moniteur pour votre premier moniteur, cela ne fait rien et il sera
positionné en (0,0). De plus, la direction part toujours du centre, vous pouvez donc spécifier `auto-up` puis `auto-left`,
mais les moniteurs à gauche seront simplement à gauche de l'origine et au-dessus de l'origine. Vous pouvez aussi spécifier des directions en double et les
moniteurs continueront d'aller dans cette direction.

Vous pouvez également utiliser `auto` comme échelle pour laisser Hyprland décider d'une échelle pour vous.
Celle-ci dépend du PPI (pixels par pouce) du moniteur.

Règle recommandée pour brancher rapidement des moniteurs aléatoires :

```lua
hl.monitor({ output = "", mode = "preferred", position = "auto", scale = 1 })
```

Cela fera que tout moniteur qui n'a pas été spécifié avec une règle explicite
sera automatiquement placé à droite du ou des autres, avec sa
résolution préférée.

Pour des règles plus spécifiques, vous pouvez également utiliser la description de la sortie (voir
`hyprctl monitors` pour plus de détails). Si la sortie de `hyprctl monitors` ressemble
à ceci :

```yaml
Monitor eDP-1 (ID 0):
        1920x1080@60.00100 at 0x0
        description: Chimei Innolux Corporation 0x150C (eDP-1)
        make: Chimei Innolux Corporation
        model: 0x150C
        [...]
```

alors la valeur de `description` jusqu'au nom de port `(eDP-1)` (non inclus) peut
être utilisée comme champ `output` avec un préfixe `desc:` :

```lua
hl.monitor({ output = "desc:Chimei Innolux Corporation 0x150C", mode = "preferred", position = "auto", scale = 1.5 })
```

N'oubliez pas de retirer le `(nom de port)` !

### Modelines personnalisées

Vous pouvez configurer une modeline personnalisée en passant une chaîne de modeline comme champ `mode` :

```lua
hl.monitor({
  output = "DP-1",
  mode = "modeline 1071.101 3840 3848 3880 3920 2160 2263 2271 2277 +hsync -vsync",
  position = "0x0",
  scale = 1,
})
```

### Désactiver un moniteur

Pour désactiver un moniteur, définissez `disabled = true` :

```lua
hl.monitor({ output = "name", disabled = true })
```

> [!WARNING]
> Désactiver un moniteur le retire littéralement de la disposition, déplaçant toutes les fenêtres
> et espaces de travail vers les moniteurs restants. Si vous voulez désactiver votre moniteur à la manière d'un
> économiseur d'écran (juste éteindre le moniteur), utilisez le
> [dispatcher](../Dispatchers) `dpms`.

## Zone réservée personnalisée

Une zone réservée est une zone qui reste inoccupée par les fenêtres en mosaïque.
Si votre flux de travail nécessite une zone réservée personnalisée, vous pouvez l'ajouter avec le champ `reserved_area`.
Il accepte soit un entier unique (tous les côtés), soit une table avec des côtés individuels :

```lua
-- all sides
hl.monitor({ output = "name", reserved_area = 10 })

-- individual sides
hl.monitor({ output = "name", reserved_area = { top = 10, bottom = 10, left = 0, right = 0 } })
```

Cela s'ajoute à la zone réservée calculée (par ex. les barres), mais vous ne pouvez utiliser qu'une seule de ces règles par moniteur dans la configuration.

## Champs

Tous les champs au-delà de `output` sont optionnels et reviennent à des valeurs par défaut sensées.

| Champ | Type | Par défaut | Description |
| --- | --- | --- | --- |
| output | string | requis | Nom de la sortie ou préfixe de description `desc:...` |
| mode | string | preferred | Résolution et taux de rafraîchissement, par ex. `1920x1080@144` |
| position | string | auto | Position dans la disposition virtuelle, par ex. `1920x0` |
| scale | string / float | auto | Facteur d'échelle, par ex. `1.5` |
| disabled | boolean | false | Retire le moniteur de la disposition |
| transform | integer | 0 | Transformation de rotation/inversion (0–7) |
| mirror | string | | Nom de la sortie à dupliquer (mirroring) |
| bitdepth | integer | 8 | Profondeur de bits (8 ou 10) |
| cm | string | srgb | Préréglage de gestion des couleurs |
| sdr_eotf | string | default | Fonction de transfert SDR (default, gamma22, srgb) |
| sdrbrightness | float | 1.0 | Luminosité SDR en mode HDR |
| sdrsaturation | float | 1.0 | Saturation SDR en mode HDR |
| vrr | integer | 0 | Mode VRR |
| icc | string | | Chemin absolu vers un profil ICC |
| reserved_area | integer ou table | 0 | Zone réservée - entier pour tous les côtés, ou table avec top/right/bottom/left |
| supports_wide_color | integer | 0 | Force le gamut de couleurs étendu (-1 = désactivé, 0 = auto, 1 = activé) |
| supports_hdr | integer | 0 | Force la prise en charge HDR (-1 = désactivé, 0 = auto, 1 = activé) |
| sdr_min_luminance | float | 0.2 | Luminance minimale SDR pour le mapping SDR→HDR |
| sdr_max_luminance | integer | 80 | Luminance maximale SDR |
| min_luminance | float | -1 | Luminance minimale du moniteur |
| max_luminance | integer | -1 | Luminance maximale possible du moniteur |
| max_avg_luminance | integer | -1 | Luminance moyenne maximale du moniteur |

### Écrans dupliqués (mirroring)

Si vous voulez dupliquer un écran, utilisez le champ `mirror` :

```lua
hl.monitor({ output = "DP-3", mode = "1920x1080@60", position = "0x0", scale = 1, mirror = "DP-2" })
hl.monitor({ output = "", mode = "preferred", position = "auto", scale = 1, mirror = "DP-1" })
```

Veuillez noter que la duplication d'écrans ne « re-rendra » pas tout pour votre
second moniteur, donc si vous dupliquez un écran 1080p vers un écran 4K, la résolution
restera 1080p sur l'écran 4K. Cela signifie également qu'il y aura de la déformation
sur les rapports d'aspect différents (par ex. 16:9 et 16:10).

### Prise en charge du 10 bits

Si vous voulez activer la prise en charge du 10 bits pour votre écran, définissez `bitdepth = 10` :

```lua
hl.monitor({ output = "eDP-1", mode = "2880x1800@90", position = "0x0", scale = 1, bitdepth = 10 })
```

> [!WARNING]
> Les couleurs enregistrées dans Hyprland (par ex. la couleur de bordure) ne prennent *pas* en charge
> le 10 bits.  
> Certaines applications ne prennent *pas* en charge la capture d'écran avec le 10 bits activé.

### Préréglages de gestion des couleurs

Utilisez le champ `cm` pour changer le préréglage de sortie sRGB par défaut :

```lua
hl.monitor({ output = "eDP-1", mode = "2880x1800@90", position = "0x0", scale = 1, bitdepth = 10, cm = "wide" })
```

```plain
auto    - srgb for 8bpc, wide for 10bpc if supported (recommended)
srgb    - sRGB primaries (default)
dcip3   - DCI P3 primaries
dp3     - Apple P3 primaries
adobe   - Adobe RGB primaries
wide    - wide color gamut, BT2020 primaries
edid    - primaries from edid (known to be inaccurate)
hdr     - wide color gamut and HDR PQ transfer function (experimental)
hdredid - same as hdr with edid primaries (experimental)
```

Le HDR en plein écran est possible sans le paramètre cm `hdr` si `render:cm_auto_hdr` est activé.

Utilisez `sdrbrightness` et `sdrsaturation` pour contrôler la luminosité et la saturation SDR en mode HDR.
La valeur par défaut pour les deux est `1.0`. La valeur de luminosité typique devrait se situer dans la plage `1.0 ... 2.0`.

```lua
hl.monitor({
  output = "eDP-1",
  mode = "2880x1800@90",
  position = "0x0",
  scale = 1,
  bitdepth = 10,
  cm = "hdr",
  sdrbrightness = 1.2,
  sdrsaturation = 0.98,
})
```

La fonction de transfert par défaut supposée être utilisée sur un écran SDR pour le contenu sRGB est définie par `sdr_eotf`.
La valeur par défaut (`"default"`) suit `render:cm_sdr_eotf`. Cela peut être changé pour sRGB par morceaux avec `"srgb"`,
ou Gamma 2.2 avec `"gamma22"`.

### Profils ICC

Vous pouvez charger un profil ICC via le champ `icc` (le chemin doit être absolu) :

```lua
hl.monitor({ output = "eDP-1", icc = "/path/to/icc.icm" })
```

Veuillez noter :
- Le chemin doit être absolu.
- L'application d'un ICC forcera automatiquement `sdr_eotf` à `sRGB` pour ce moniteur (pour la précision des couleurs).
- L'application d'un ICC remplace le préréglage CM.
- Les ICC sont fondamentalement incompatibles avec le jeu HDR. Des comportements étranges peuvent survenir.

### VRR

Le VRR par écran peut être configuré avec le champ `vrr`, où la valeur est le mode issu de la
[page des variables](../Variables).

## Rotation

Si vous voulez faire pivoter un moniteur, utilisez le champ `transform` :

```lua
hl.monitor({ output = "eDP-1", mode = "2880x1800@90", position = "0x0", scale = 1, transform = 1 })
```

Liste des transformations :

```plain
0 -> normal (no transforms)
1 -> 90 degrees
2 -> 180 degrees
3 -> 270 degrees
4 -> flipped
5 -> flipped + 90 degrees
6 -> flipped + 180 degrees
7 -> flipped + 270 degrees
```

## Espace de travail par défaut

Voir [Règles d'espace de travail](../Workspace-Rules).

### Lier des espaces de travail à un moniteur

Voir [Règles d'espace de travail](../Workspace-Rules).
