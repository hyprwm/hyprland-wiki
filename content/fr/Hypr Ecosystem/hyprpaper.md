---
weight: 1
title: hyprpaper
---

[hyprpaper](https://github.com/hyprwm/hyprpaper) est un utilitaire de fond d'écran rapide, contrôlé par IPC, pour Hyprland.

## Installation

{{% details title="Arch" closed="true" %}}

```sh
pacman -S hyprpaper
```

{{% /details %}}

{{% details title="openSUSE" closed="true" %}}

```sh
zypper install hyprpaper
```

{{% /details %}}

{{% details title="Fedora" closed="true" %}}

```sh
sudo dnf install hyprpaper
```

{{% /details %}}

## Configuration

Le fichier de configuration se trouve dans `~/.config/hypr/hyprpaper.conf`. Il n'est pas
requis.

### Définir les fonds d'écran

Les fonds d'écran sont définis comme des catégories spéciales anonymes. Le moniteur peut être laissé vide pour un repli.

| variable | description | valeur |
| --- | --- | --- |
| `monitor` | Moniteur sur lequel afficher ce fond d'écran. Si vide, ce fond d'écran sera utilisé comme repli | ID de moniteur |
| `path` | Chemin vers un fichier image ou un répertoire contenant des fichiers image | chemin |
| `fit_mode` | Détermine comment afficher l'image. Optionnel, par défaut `cover` | `contain`\|`cover`\|`tile`\|`fill` |
| `timeout` | Délai entre chaque changement de fond d'écran (en secondes, si `path` est un répertoire). Optionnel, par défaut 30 secondes | int |
| `order`    | Détermine l'ordre d'affichage des images quand un répertoire est passé à l'option `path`. Optionnel, actuellement seule la valeur `random` est prise en charge | `random`                             |
| `recursive` | Si les sous-répertoires doivent être scannés récursivement quand `path` est un répertoire. Optionnel, par défaut `false` | bool |

```ini
wallpaper {
    monitor = DP-3
    path = ~/myFile.jxl
    fit_mode = cover
}

wallpaper {
    monitor = DP-2
    path = ~/myFile2.jxl
    fit_mode = cover
}

wallpaper {
    monitor = 
    path = ~/fallback.jxl
    fit_mode = cover
}

# ...
```


### Exécuter au démarrage

Pour exécuter hyprpaper au démarrage, éditez `hyprland.lua` et ajoutez `hyprpaper` à vos commandes de démarrage automatique.  
Si vous démarrez Hyprland avec [uwsm](../../Useful-Utilities/Systemd-start), vous pouvez aussi utiliser la commande `systemctl --user enable --now hyprpaper.service`.

### Options diverses

Celles-ci doivent être définies en dehors des sections `wallpaper{...}`.

| variable | description | type | par défaut |
| --- | --- | --- | --- |
| `splash` | active le rendu du splash hyprland par-dessus le fond d'écran | bool | `true` |
| `splash_offset` | à quelle distance vers le haut le splash doit être affiché | float | `20` |
| `splash_opacity` | à quel point le splash est opaque | float | `0.8` |
| `ipc` | si l'IPC doit être activé | bool | `true` |

### Inclusion de sources (Sourcing)

Utilisez le mot-clé `source` pour inclure un autre fichier. Le globbing, l'expansion du tilde et les chemins relatifs sont pris en charge.

```ini
source = ~/.config/hypr/hyprpaper.d/*.conf
```

Merci de noter que c'est LINÉAIRE. C'est-à-dire que les lignes au-dessus de `source =` seront analysées en premier, puis les lignes à l'intérieur des fichiers `~/.config/hypr/hyprpaper.d/*.conf`, puis les lignes en dessous.

## IPC

hyprpaper prend en charge l'IPC via `hyprctl`.

Requêtes prises en charge :

```sh
hyprctl hyprpaper wallpaper '[mon], [path], [fit_mode]'
hyprctl hyprpaper listactive
```

`wallpaper` définit les fonds d'écran comme ceci :
```sh
hyprctl hyprpaper wallpaper '[mon], [path], [fit_mode]'
```
où `fit_mode` est optionnel, et `mon` peut être vide pour un repli, tout comme dans le fichier de configuration. Le fond d'écran de repli ne s'applique qu'aux moniteurs qui n'ont jamais eu de cible de moniteur spécifique assignée.

`listactive` affiche le fond d'écran actuellement actif pour chaque moniteur, par exemple :

```sh
hyprctl hyprpaper listactive
HDMI-A-1: /home/user/wallpapers/wp1.jpg
eDP-1: /home/user/wallpapers/wp2.jpg
```

Notez que d'anciens exemples pourraient mentionner `preload`, `reload`, `unload`, ou `listloaded` ; vérifiez `hyprctl hyprpaper --help` pour les requêtes prises en charge par votre version installée.
