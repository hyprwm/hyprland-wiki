---
weight: 15
title: hyprshutdown
---

[hyprshutdown](https://github.com/hyprwm/hyprshutdown) est un utilitaire d'arrêt en douceur (graceful shutdown). Il ouvre
une GUI et demande poliment aux applications de se fermer, puis quitte Hyprland. C'est la façon recommandée de quitter hyprland,
car sinon (par ex. `dispatch exit`) les applications mourront au lieu de se fermer normalement.

## Options en ligne de commande

| Option | Description |
|--------|-------------|
| `--vt N` | Bascule vers le VT N après la sortie (corrige l'écran noir NVIDIA+SDDM) |
| `--dry-run` | Affiche l'UI sans réellement fermer les applications ni quitter |
| `--no-exit` | Ferme les applications mais ne quitte pas Hyprland |
| `--top-label`, `-t` | Texte personnalisé pour la boîte de dialogue d'arrêt |
| `--post-cmd`, `-p` | Commande à exécuter après la fermeture de Hyprland |
| `--no-fork` | S'exécute au premier plan (pas de démonisation) |
| `--verbose` | Active la journalisation de débogage |
| `--help`, `-h` | Affiche l'aide |

## Astuces 

Si vous voulez éteindre le système, ou redémarrer, au lieu de vous déconnecter, vous pouvez faire des choses comme ceci :

```sh
hyprshutdown -t 'Shutting down...' --post-cmd 'shutdown -P 0'

hyprshutdown -t 'Restarting...' --post-cmd 'reboot'
```

## Dépannage

### Utilisateurs NVIDIA + SDDM

Si vous rencontrez un écran noir / gel lors de la déconnexion avec un GPU NVIDIA et le gestionnaire de connexion SDDM, utilisez le drapeau `--vt` :

```bash
hyprshutdown --vt 2
```

**Pourquoi c'est nécessaire :** Sur les systèmes NVIDIA avec SDDM, l'affichage ne revient pas automatiquement au terminal virtuel de SDDM (généralement VT2) quand Hyprland se ferme. Le drapeau `--vt` force un changement de VT après la déconnexion.

**Configuration :** Le changement de VT nécessite un sudo sans mot de passe pour `chvt` :

```bash
echo "$USER ALL=(ALL) NOPASSWD: /usr/bin/chvt" | sudo tee /etc/sudoers.d/chvt
sudo chmod 440 /etc/sudoers.d/chvt
```

Ceci est sûr car `chvt` ne fait que changer de terminaux virtuels et ne peut pas être exploité pour une élévation de privilèges.
