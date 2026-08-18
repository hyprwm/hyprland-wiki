---
weight: 3
title: hyprlauncher
---

[hyprlauncher](https://github.com/hyprwm/hyprlauncher) est un lanceur / sélecteur polyvalent et flexible pour hyprland. Il est rapide, simple, et fournit
divers modules.

## Utilisation

Hyprlauncher est _toujours_ un démon(deamon). Le lancer génère un démon qui écoutera les
requêtes. S'il est lancé avec `hyprlauncher -d`, il n'ouvrira pas de fenêtre au premier lancement.

Pour ouvrir hyprlauncher, liez simplement `hyprlauncher` à une touche.

## Configuration

### Thématisation

Le thème suit votre thème [hyprtoolkit](../hyprtoolkit).

### Config

`~/.config/hypr/hyprlauncher.conf`

Catégories de configuration et leurs valeurs :

#### General (Général)

| Option | Description | Type | Par défaut |
| -- | -- | -- | -- |
| `grab_focus` | Si un accaparement complet du focus clavier doit être forcé. | bool | `true` |


#### Cache

| Option | Description | Type | Par défaut |
| -- | -- | -- | -- |
| enabled | Contrôle si les modules conservent un cache des entrées fréquemment utilisées. <br> Cet historique est stocké sur votre disque, en texte brut, dans `~/.local/share/hyprlauncher`. | bool | `true` |

#### Finders (Chercheurs)

Chercheurs disponibles : `math`, `desktop`, `unicode`.

Les préfixes ne peuvent être qu'un seul caractère.

| option | description | type | par défaut |
| -- | -- | -- | -- |
| `default_finder` | Contrôle le chercheur par défaut utilisé. | string | `desktop` |
| `desktop_prefix` | Préfixe à utiliser pour le chercheur desktop. | string | vide |
| `unicode_prefix` | Préfixe à utiliser pour le chercheur unicode. | string | `.` |
| `math_prefix` | Préfixe à utiliser pour le chercheur math. | string | `=` |
| `font_prefix` | Préfixe à utiliser pour le chercheur de police. | string | `'` |
| `desktop_launch_prefix` | Préfixe de lancement pour chaque application desktop, par ex. `uwsm app -- `. | string | vide |
| `desktop_icons` | Si les icônes desktop doivent être activées dans les résultats. | bool | `true` |

#### UI

| option | description | type | par défaut |
| -- | -- | -- | -- |
| window_size | la taille du lanceur | vec2 | `400 260` |

