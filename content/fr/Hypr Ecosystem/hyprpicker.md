---
weight: 2
title: hyprpicker
---

[hyprpicker](https://github.com/hyprwm/hyprpicker) est un utilitaire pratique pour sélectionner une couleur depuis votre écran sur Hyprland.

## Configuration

Ne nécessite pas de configuration, seulement des drapeaux de lancement :

| Drapeau | Description | Arguments |
| --- | --- | --- |
| `-a` \| `--autocopy` | Copie automatiquement le résultat dans le presse-papiers (nécessite wl-clipboard) | aucun |
| `-f` \| `--format=` | Spécifie le format de sortie | `cmyk` \| `hex` \| `rgb` \| `hsl` \| `hsv` |
| `-o` \| `--output-format=` | Spécifie comment la couleur de sortie doit être formatée | format de chaîne, par ex. "rgb({0}, {1}, {2})" |
| `-n` \| `--notify` | Envoie une notification de bureau quand une couleur est sélectionnée (nécessite notify-send et un démon de notification comme dunst) | aucun |
| `-b` \| `--no-fancy` | Désactive la sortie « fancy » (c.-à-d. colorée) | aucun |
| `-h` \| `--help` | Affiche le message d'aide | aucun |
| `-r` \| `--render-inactive` | Rend (fige) les affichages inactifs | aucun |
| `-z` \| `--no-zoom` | Désactive la loupe de zoom | aucun |
| `-q` \| `--quiet` | Désactive la plupart des journaux (laisse les erreurs) | aucun |
| `-v` \| `--verbose` | Active plus de journaux | aucun |
| `-t` \| `--no-fractional` | Désactive la prise en charge de la mise à l'échelle fractionnaire | aucun |
| `-d` \| `--disable-hex-preview` | Désactive l'aperçu en direct du code hexadécimal | aucun |
| `-l` \| `--lowercase-hex` | Affiche le code hexadécimal en minuscules | aucun |
| `-s` \| `--scale=scale` | Définit l'échelle de zoom | flottant entre 1.0 et 10.0 |
| `-u` \| `--radius=radius` | Définit le rayon du cercle | int entre 1 et 1000 |
| `-N` \| `--name` | Copie le nom de couleur standard au lieu du format si trouvé (nécessite -a) | aucun |
| `-V` \| `--version` | Affiche les infos de version | aucun |

