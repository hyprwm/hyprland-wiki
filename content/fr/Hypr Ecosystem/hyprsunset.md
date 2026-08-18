---
weight: 10
title: hyprsunset
---

[hyprsunset](https://github.com/hyprwm/hyprsunset) est un petit utilitaire fournissant un filtre de lumière bleue
pour votre système.

Cette méthode est préférée aux shaders d'écran car elle ne sera _pas_ capturée via un enregistrement / des captures d'écran.

hyprsunset fournit aussi un filtre gamma, qui peut être utilisé pour
ajuster la luminosité perçue de l'écran sur les moniteurs qui ne
prennent pas en charge le contrôle logiciel, ou pour réduire la luminosité perçue
en dessous du minimum du moniteur.

> [!WARNING]
> `hyprsunset` est pris en charge depuis Hyprland 0.45.0.

## Installation

{{< tabs items="Arch Linux" >}}

{{< tab "Arch Linux" >}}

```sh
pacman -S hyprsunset
```

{{< /tab >}}

{{< /tabs >}}


## Configuration

La configuration se fait via le fichier de configuration dans `~/.config/hypr/hyprsunset.conf`.  
Ce fichier n'est pas requis pour exécuter hyprsunset, bien que recommandé.

Hyprsunset utilise des profils pour déterminer quand changer la température et le gamma.  
Vous pouvez définir autant de profils que vous le souhaitez.  
Chaque profil est activé à l'heure spécifiée et réinitialise toutes les options définies par les autres profils.

Au démarrage, hyprsunset appliquera le profil actuel.  
Par exemple, en lançant hyprsunset avec la configuration d'exemple suivante à 20:00, il activera le premier profil, ne changeant essentiellement rien.  
Une fois que l'horloge atteint 21:00, hyprsunset appliquera automatiquement le nouveau profil.

**Exemple de configuration**
```ini
max-gamma = 150

profile {
    time = 7:30
    identity = true
}

profile {
    time = 21:00
    temperature = 5500
    gamma = 0.8
}
```

| Variable | Description | Type | Par défaut |
| -- | -- | -- | -- |
| `max-gamma` | La valeur gamma maximale possible. <br> Le maximum absolu est `200`%. <br> Surtout utile pour contrôler hyprsunset via IPC. | int | `100` |

### Profile (Profil)

| Variable | Description | Type | Par défaut |
| -- | -- | -- | -- |
| `time` | L'heure à laquelle le profil doit être activé. <br> Doit être au format {heures}:{minutes} | string | `00:00` |
| `temperature` | La température de l'écran. Plus bas signifie plus chaud. | int | `6000` |
| `gamma` | La luminosité perçue de l'écran. <br> Cela vous permettra de baisser la luminosité au-delà du minimum de votre écran. | float | `1.0` |
| `identity` | Quand défini, la valeur de temperature est ignorée et le seul effet de hyprsunset est le changement de luminosité apparente par gamma. | bool | `false` |


## Utilisation

Pour démarrer automatiquement hyprsunset, ajoutez : `hyprsunset` au démarrage automatique de votre `hyprland.lua`.
Si Hyprland est démarré avec [uwsm](../../Useful-Utilities/Systemd-start), vous pouvez utiliser `systemctl --user enable --now hyprsunset.service`.

Hyprsunset peut aussi être contrôlé en fournissant des arguments à la commande.  
En spécifiant `hyprsunset --temperature 5000` vous remplacerez le paramètre de température de la configuration active actuelle. Ceci sera cependant remplacé une fois qu'un nouveau profil sera activé.

Pour plus d'informations sur les arguments cli, exécutez `hyprsunset --help`

## IPC

`hyprsunset` prend en charge l'IPC via hyprctl.  
La température de couleur et le filtre gamma sont tous deux ajustables :

```sh
# Enable blue-light filter
hyprctl hyprsunset temperature 2500
# Disable blue-light filter
hyprctl hyprsunset identity

# Set gamma to 50%
hyprctl hyprsunset gamma 50
# Increase gamma by 10%
hyprctl hyprsunset gamma +10

# Reset config to current profile
hyprctl hyprsunset reset
# Reset value to current profile
hyprctl hyprsunset reset temperature
hyprctl hyprsunset reset gamma
hyprctl hyprsunset reset identity

# Print current profile
hyprctl hyprsunset profile
```

Cela peut être utilisé par d'autres logiciels pour changer la température tout au long de la journée, ou pour ajuster la luminosité
perçue du moniteur, comme avec les raccourcis clavier Hyprland suivants :
```lua
hl.bind("XF86MonBrightnessUp", hl.dsp.exec_cmd("hyprctl hyprsunset gamma +10"), { repeating = true, locked = true, })
hl.bind("XF86MonBrightnessDown", hl.dsp.exec_cmd("hyprctl hyprsunset gamma -10"), { repeating = true, locked = true, })
```

> [!WARNING]
> Utiliser le contrôle gamma dégradera la précision des couleurs. Si votre moniteur prend en charge le contrôle logiciel, il est fortement recommandé d'utiliser celui-ci à la place.
