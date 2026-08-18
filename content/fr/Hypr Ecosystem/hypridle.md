---
weight: 4
title: hypridle
---

[hypridle](https://github.com/hyprwm/hypridle) est le démon de gestion d'inactivité de Hyprland.

## Configuration

La configuration se fait via le fichier de configuration dans `~/.config/hypr/hypridle.conf`.  
Un fichier de configuration est requis ; hypridle ne s'exécutera pas sans.  
Pour exécuter hypridle au démarrage, ajoutez `hypridle` à vos commandes de démarrage automatique dans votre configuration hyprland.
Si Hyprland est démarré avec [uwsm](../../Useful-Utilities/Systemd-start), vous pouvez utiliser `systemctl --user enable --now hypridle.service`.

### General (Général)

Variables dans la catégorie `general` :

| Variable | Description | Type | Par défaut |
| --- | --- | --- | --- |
| `lock_cmd` | commande à exécuter à la réception d'un événement dbus de verrouillage (par ex. `loginctl lock-session`) | string | vide |
| `unlock_cmd` | commande à exécuter à la réception d'un événement dbus de déverrouillage (par ex. `loginctl unlock-session`) | string | vide |
| `on_lock_cmd` | commande à exécuter quand la session est verrouillée par une application d'écran de verrouillage | string | vide |
| `on_unlock_cmd` | commande à exécuter quand la session est déverrouillée par une application d'écran de verrouillage | string | vide |
| `before_sleep_cmd` | commande à exécuter à la réception d'un événement dbus prepare_sleep | string | vide |
| `after_sleep_cmd` | commande à exécuter à la réception d'un événement dbus post prepare_sleep | string | vide |
| `ignore_dbus_inhibit` | si les événements d'inhibition d'inactivité envoyés par dbus doivent être ignorés (par ex. depuis firefox) | bool | `false` |
| `ignore_systemd_inhibit` | si les inhibiteurs `systemd-inhibit --what=idle` doivent être ignorés | bool | `false` |
| `ignore_wayland_inhibit` | si les inhibiteurs d'inactivité du protocole Wayland doivent être ignorés | bool | `false` |
| `inhibit_sleep` | mode d'inhibition de la mise en veille : <br> `0` : désactivé <br> `1` : normal <br> `2` : auto <br> `3` : notification de verrouillage | int | `2` |

> [!NOTE]
> L'option `general:inhibit_sleep` est utilisée pour s'assurer que hypridle peut effectuer certaines tâches avant que le système ne se mette en veille.
> 
> Options :
> - `0` désactive l'inhibition de la mise en veille.
> - `1` fait attendre le système jusqu'à ce que hypridle ait lancé `general:before_sleep_cmd`.
> - `2` (auto) sélectionne soit `3` soit `1` selon que hypridle détecte si vous voulez lancer hyprlock avant la mise en veille.
> - `3` fait attendre votre système jusqu'à ce que la session soit verrouillée par une application d'écran de verrouillage. Cela fonctionne avec toutes les applications de verrouillage de session wayland.

### Listeners (Écouteurs)

Hypridle utilise des écouteurs (listeners) pour définir des actions en cas d'inactivité.

Chaque écouteur a un _timeout_ (en secondes). Après une inactivité de _timeout_ secondes,
`on-timeout` se déclenchera.  
Quand l'action reprend après l'inactivité, `on-resume` se déclenchera.

Exemple d'écouteur :

```ini
listener {
    timeout = 500                            # in seconds.
    on-timeout = notify-send "You are idle!" # command to run when timeout has passed.
    on-resume = notify-send "Welcome back!"  # command to run when activity is detected after timeout has fired.
}
```

Vous pouvez définir autant d'écouteurs que vous le souhaitez.

Variables dans la catégorie `listener` :

| variable | description | type | par défaut |
| --- | --- | --- | --- |
| `timeout` | Temps d'inactivité en secondes. | int | aucune, une valeur doit être spécifiée |
| `on-timeout` | Commande à exécuter quand le timeout est passé. | string | vide |
| `on-resume` | Commande à exécuter quand une activité est détectée après le déclenchement du timeout. | string | vide |
| `ignore_inhibit` | Ignore les inhibiteurs d'inactivité (de tous types) pour cette règle. | bool | `false` |
| `condition_cmd` | Commande exécutée quand le timeout est atteint, _avant_ `on-timeout`. Exécutée via `/bin/sh -c` ; un code de sortie `0` laisse `on-timeout` se déclencher, un code non nul le reporte. | string | vide |
| `condition_retry` | Quand `condition_cmd` reporte, la réexécute toutes les N secondes tant que l'utilisateur reste inactif, déclenchant `on-timeout` dès qu'elle réussit. `0` désactive les nouvelles tentatives (le `on-timeout` reporté est ignoré pour ce cycle d'inactivité). | int | `0` |

#### Timeouts conditionnels

Un écouteur peut conditionner son `on-timeout` à un état externe avec `condition_cmd`. Quand le timeout est
atteint, hypridle exécute d'abord `condition_cmd` ; `on-timeout` ne se déclenche que si elle sort avec `0`. Une
sortie non nulle reporte `on-timeout`.

Définissez `condition_retry` pour continuer à vérifier tant que l'utilisateur reste inactif : hypridle réexécute `condition_cmd`
toutes les `condition_retry` secondes et déclenche `on-timeout` dès qu'elle réussit. Avec `condition_retry = 0`
(par défaut) un `on-timeout` reporté est simplement ignoré jusqu'au prochain cycle d'inactivité. Toute activité utilisateur
réinitialise l'écouteur et annule une nouvelle tentative en attente.

> [!NOTE]
> `condition_cmd` s'exécute de manière synchrone sur la boucle d'événements de hypridle, donc gardez-la rapide — un script qui bloque
> retarde la gestion de l'inactivité. Le minutage des nouvelles tentatives est vérifié sur le tick d'environ 5s de la boucle d'événements de hypridle, donc de très petites
> valeurs de `condition_retry` sont effectivement arrondies à cette granularité.

Exemple — ne pas suspendre pendant qu'une session SSH est connectée :

```ini
listener {
    timeout = 900                                          # 15min.
    on-timeout = systemctl suspend                         # suspend pc.
    condition_cmd = ~/.config/hypr/scripts/can-suspend.sh  # exit 0 = suspend, non-zero = stay awake.
    condition_retry = 30                                   # re-check every 30s while still idle.
}
```

```sh
#!/bin/sh
# ~/.config/hypr/scripts/can-suspend.sh — defer suspend while an SSH session is connected.
ss -tn state established '( sport = :ssh )' | grep -q . && exit 1
exit 0
```

### Exemples

Exemple complet de hypridle avec hyprlock :

```ini
general {
    lock_cmd = pidof hyprlock || hyprlock                                     # avoid starting multiple hyprlock instances.
    before_sleep_cmd = loginctl lock-session                                  # lock before suspend.
    after_sleep_cmd = hyprctl dispatch 'hl.dsp.dpms({ action = "enable" })'  # to avoid having to press a key twice to turn on the display.
}

listener {
    timeout = 150                                # 2.5min.
    on-timeout = brightnessctl -s set 10         # set monitor backlight to minimum, avoid 0 on OLED monitor.
    on-resume = brightnessctl -r                 # monitor backlight restore.
}

# turn off keyboard backlight, comment out this section if you dont have a keyboard backlight.
listener { 
    timeout = 150                                          # 2.5min.
    on-timeout = brightnessctl -sd rgb:kbd_backlight set 0 # turn off keyboard backlight.
    on-resume = brightnessctl -rd rgb:kbd_backlight        # turn on keyboard backlight.
}

listener {
    timeout = 300                                 # 5min
    on-timeout = loginctl lock-session            # lock screen when timeout has passed
}

listener {
    timeout = 330                                                                                  # 5.5min
    on-timeout = hyprctl dispatch 'hl.dsp.dpms({ action = "disable" })'                            # screen off when timeout has passed
    on-resume = hyprctl dispatch 'hl.dsp.dpms({ action = "enable" })' && brightnessctl -r          # screen on when activity is detected after timeout has fired.
}

listener {
    timeout = 1800                                # 30min
    on-timeout = systemctl suspend                # suspend pc
}
```

### Recettes

#### Faire un fondu du rétroéclairage du clavier

`brightnessctl` définit la luminosité instantanément, donc une simple paire `on-timeout`/`on-resume` éteint et allume
le rétroéclairage du clavier de manière abrupte. [hypr-kbd-backlight-fade](https://github.com/queueingqt/hypr-kbd-backlight-fade)
est un petit script qui passe plutôt par des valeurs de luminosité intermédiaires, avec un fondu d'entrée rapide et
de sortie lent, avec un fichier de verrouillage pour que les appels de fondu entrant/sortant qui se chevauchent (par ex. des cycles rapides toucher-puis-inactif) ne
se fassent pas concurrence.

Notez que les lecteurs vidéo et navigateurs maintiennent couramment un verrou d'inhibition d'inactivité Wayland pendant la
lecture vidéo (pas seulement en plein écran), ce qui met en pause **tous** les écouteurs, pas seulement le verrouillage d'écran/la mise en veille. Si
vous voulez que le rétroéclairage du clavier continue de répondre à une véritable saisie pendant qu'une vidéo joue, définissez
`ignore_inhibit = true` spécifiquement sur cet écouteur, plutôt que sur `general:ignore_wayland_inhibit`
qui désactiverait la prise en compte des inhibitions pour tous les écouteurs.
