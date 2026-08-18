---
weight: 10
title: Plantages et bugs
---

## Obtenir le journal (log)

D'abord, assurez-vous d'avoir activé les journaux dans la configuration Hyprland. Définissez `debug.disable_logs` à `false`.
puis, pour qu'OpenGL produise des messages d'erreur, définissez `debug.gl_debugging` à `true`.

N'oubliez pas de désactiver ces options une fois la journalisation terminée, car elles impactent les performances.

Si vous êtes dans un TTY, et que la session Hyprland qui a planté était la dernière que vous
avez lancée, le journal peut être affiché avec

```sh
cat $XDG_RUNTIME_DIR/hypr/$(ls -t $XDG_RUNTIME_DIR/hypr/ | head -n 1)/hyprland.log
```

si vous êtes dans une session Hyprland, et que vous voulez le journal de la dernière session, utilisez

```sh
cat $XDG_RUNTIME_DIR/hypr/$(ls -t $XDG_RUNTIME_DIR/hypr/ | head -n 2 | tail -n 1)/hyprland.log
```

## Obtenir le rapport de plantage de Hyprland

Si vous avez `$XDG_CACHE_HOME` défini, le répertoire des rapports de plantage est
`$XDG_CACHE_HOME/hyprland`. Sinon, c'est `$HOME/.cache/hyprland`.

Allez dans le répertoire des rapports de plantage et vous devriez trouver un fichier nommé
`hyprlandCrashReport[XXXX].txt` où `[XXXX]` est le PID du processus qui
a planté.

Joignez ce fichier à votre issue.

## Plantages au lancement

Diagnostiquez le problème d'après le contenu du journal :

- `backend failed to start` -> lancez dans le TTY et référez-vous aux journaux en ROUGE.
- `Monitor X has NO PREFERRED MODE, and an INVALID one was requested` -> votre
  moniteur est cassé (bork).
- Autre -> consultez le coredump. Utilisez `coredumpctl`, trouvez le PID du plus récent et faites
  `coredumpctl info PID`.
- échec sur un pilote (par ex. `radeon`) -> signalez une issue.
- échec sur `Hyprland` -> signalez une issue.

## Plantages autres qu'au lancement

Signalez une issue sur GitHub ou sur le serveur Discord.

## Obtenir une trace de pile (stacktrace) de debug

> Systemd uniquement.

1. Compilez Hyprland en debug (`make debug`).
2. Démarrez Hyprland et faites-le planter.
3. Dans un tty ou un terminal, faites `coredumpctl debug Hyprland`.
   - Si gdb vous demande des symboles, répondez `y`.
   - S'il demande à propos de la pagination, répondez `c`.
4. Une fois que vous arrivez à `(gdb)`, démarrez la journalisation dans un fichier avec `set logging enabled`.
   - Pour un fichier spécifique, utilisez `set logging file output.log`.
5. Exécutez `bt -full`, puis `exit` une fois terminé, et joignez la sortie.

## Obtenir un journal de trace

Lancez Hyprland avec les variables d'environnement `HYPRLAND_TRACE=1 AQ_TRACE=1` définies.

Ces variables activeront une journalisation _très_ verbeuse et il n'est pas recommandé de les activer sauf pour déboguer, car elles
pourraient causer des ralentissements et des fichiers journaux _massifs_.

Essayez de reproduire votre problème aussi vite que possible pour que nous n'ayons pas à parcourir 1 million de lignes de journaux.

## Bugs

Avant tout, **_LISEZ LA [PAGE FAQ](../FAQ)_**

Si votre bug n'y est pas listé, vous pouvez demander sur le serveur Discord ou ouvrir une
[discussion sur GitHub](https://github.com/hyprwm/Hyprland/discussions).

## Faire un bisect sur un problème

Le « bisecting » consiste à trouver le premier commit _git_ qui a introduit un bug ou une
régression spécifique en utilisant une recherche binaire. Cela se fait dans `git` en utilisant la commande `git bisect`.

D'abord, clonez le dépôt Hyprland si ce n'est pas déjà fait :

```sh
git clone --recursive https://github.com/hyprwm/Hyprland
cd Hyprland
```

Démarrez le processus de bisect :

```sh
git bisect start
```

Entrez le hash du premier commit connu comme bon qui ne contenait pas le problème :

```sh
git bisect good [good commit]
```

Puis, entrez le hash du commit connu comme mauvais qui contient le problème. Vous pouvez simplement utiliser HEAD :

```sh
git bisect bad HEAD
```

_git_ va maintenant faire un checkout d'un commit au milieu de la plage spécifiée.
Maintenant, réinitialisez et compilez Hyprland :

```sh
git reset --hard --recurse-submodules
make all
```

...et exécutez l'exécutable compilé depuis le TTY `./build/Hyprland`.

Essayez de reproduire votre problème. Si vous ne pouvez pas (c.-à-d. que le bug n'est pas présent), retournez dans le
dépôt Hyprland et exécutez `git bisect good`. Si vous pouvez le reproduire, exécutez `git bisect bad`.
_git_ fera alors un checkout d'un autre commit et continuera la recherche binaire.
S'il y a une erreur de compilation, exécutez `git bisect skip`.

Réinitialisez, compilez et installez Hyprland à nouveau et répétez cette étape jusqu'à ce que _git_ identifie le
commit qui a introduit le bug :

```
[commit hash] is the first bad commit
```

## Compiler la pile Wayland avec ASan

Si demandé, c'est le niveau de débogage de problèmes mémoire le plus poussé possible.

_Faites cela dans le tty, sans instance Hyprland en cours d'exécution._

Clonez hyprland : `git clone --recursive https://github.com/hyprwm/Hyprland`

`make asan`

Reproduisez votre plantage. Hyprland reviendra au tty.

Maintenant, dans `cwd`, `~` ou `./build`, cherchez le(s) fichier(s) nommé(s)
`asan.log.XXXXX` où XXXXX est un nombre.

Zippez-les tous et joignez-les à votre issue.

## Déboguer les problèmes DRM

DRM (Direct Rendering Manager) est l'architecture noyau sous-jacente permettant de prendre un tampon GPU (quelque chose
sur lequel on peut effectuer un rendu) et de l'afficher à l'écran (via le GPU) au lieu d'une fenêtre.

Les gels, glitches, et autres, peuvent être causés par des problèmes de communication de Hyprland avec DRM, le pilote
ou le noyau. Dans ces cas, un journal DRM est utile.

> [!WARNING]
> Notez bien que ces journaux sont EXTRÊMEMENT verbeux. Merci de reproduire votre/vos bug(s) au plus vite pour éviter d'obtenir un journal de 1 Go.

```sh
echo 0x19F | sudo tee /sys/module/drm/parameters/debug  # enables verbose drm logging
sudo dmesg -C                                           # clears kernel debug logs
dmesg -w > ~/dmesg.log &                                # writes kernel logs in the background to a file at ~/dmesg.log
Hyprland

# ... repro the issue, then quit hyprland


fg # after this, use CTRL+C to stop writing the logs
echo 0 | sudo tee /sys/module/drm/parameters/debug # disables drm logging, don't forget this to avoid slowdowns
```

Après cela, _joignez_ le fichier `dmesg.log`.
