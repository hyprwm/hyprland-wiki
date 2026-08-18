---
weight: 9
title: IPC
---

Hyprland expose 2 Sockets UNIX, pour contrôler / obtenir des informations sur Hyprland
via du code / des utilitaires bash.

## Signature d'instance Hyprland (HIS)

```sh
echo $HYPRLAND_INSTANCE_SIGNATURE
```

## `$XDG_RUNTIME_DIR/hypr/[HIS]/.socket.sock`

Utilisé pour les requêtes de type hyprctl. Voir la
[page Hyprctl](../Configuring/Advanced-and-Cool/Using-hyprctl) pour les commandes.

en gros, écrivez `[flag(s)]/command args`.

> [!NOTE]
> Hyprland évalue les connexions à ce socket de manière complètement synchrone,
> ce qui signifie que toute connexion non fermée *fera geler Hyprland*
> jusqu'à ce que le délai de cinq secondes soit atteint. Assurez-vous de toujours ouvrir le socket
> immédiatement avant d'écrire des requêtes et de le fermer ensuite.

## `$XDG_RUNTIME_DIR/hypr/[HIS]/.socket2.sock`

Utilisé pour les événements. Hyprland écrira à chaque client connecté des événements en direct comme
ceci :

`EVENT>>DATA\n` (`\n` est un saut de ligne)

par ex. : `workspace>>2`

## Liste des événements

| nom | description | données |
| --- | --- | --- |
| workspace | émis lors d'un changement d'espace de travail. N'est émis QUE lorsqu'un utilisateur demande un changement d'espace de travail, et n'est pas émis lors de mouvements de souris (voir `focusedmon`) | `WORKSPACENAME` |
| workspacev2 | émis lors d'un changement d'espace de travail. N'est émis QUE lorsqu'un utilisateur demande un changement d'espace de travail, et n'est pas émis lors de mouvements de souris (voir `focusedmon`) | `WORKSPACEID,WORKSPACENAME` |
| focusedmon | émis lors du changement du moniteur actif. | `MONNAME,WORKSPACENAME` |
| focusedmonv2 | émis lors du changement du moniteur actif. | `MONNAME,WORKSPACEID` |
| activewindow | émis lors du changement de la fenêtre active. | `WINDOWCLASS,WINDOWTITLE` |
| activewindowv2 | émis lors du changement de la fenêtre active. | `WINDOWADDRESS` |
| fullscreen | émis quand le statut plein écran d'une fenêtre change. | `0/1` (sortie du plein écran / entrée en plein écran) |
| monitorremoved | émis quand un moniteur est retiré (déconnecté) | `MONITORNAME` |
| monitorremovedv2 | émis quand un moniteur est retiré (déconnecté) | `MONITORID,MONITORNAME,MONITORDESCRIPTION` |
| monitoradded | émis quand un moniteur est ajouté (connecté) | `MONITORNAME` |
| monitoraddedv2 | émis quand un moniteur est ajouté (connecté) | `MONITORID,MONITORNAME,MONITORDESCRIPTION` |
| createworkspace | émis quand un espace de travail est créé | `WORKSPACENAME` |
| createworkspacev2 | émis quand un espace de travail est créé | `WORKSPACEID,WORKSPACENAME` |
| destroyworkspace | émis quand un espace de travail est détruit | `WORKSPACENAME` |
| destroyworkspacev2 | émis quand un espace de travail est détruit | `WORKSPACEID,WORKSPACENAME` |
| moveworkspace | émis quand un espace de travail est déplacé vers un moniteur différent | `WORKSPACENAME,MONNAME` |
| moveworkspacev2 | émis quand un espace de travail est déplacé vers un moniteur différent | `WORKSPACEID,WORKSPACENAME,MONNAME` |
| renameworkspace | émis quand un espace de travail est renommé | `WORKSPACEID,NEWNAME` |
| activespecial | émis quand l'espace de travail spécial ouvert dans un moniteur change (la fermeture résulte en un `WORKSPACENAME` vide) | `WORKSPACENAME,MONNAME` |
| activespecialv2 | émis quand l'espace de travail spécial ouvert dans un moniteur change (la fermeture résulte en des valeurs `WORKSPACEID` et `WORKSPACENAME` vides) | `WORKSPACEID,WORKSPACENAME,MONNAME` |
| activelayout | émis lors d'un changement de disposition du clavier actif | `KEYBOARDNAME,LAYOUTNAME` |
| openwindow | émis quand une fenêtre est ouverte | `WINDOWADDRESS`,`WORKSPACENAME`,`WINDOWCLASS`,`WINDOWTITLE` |
| closewindow | émis quand une fenêtre est fermée | `WINDOWADDRESS` |
| kill | émis quand une fenêtre est tuée (via `hyprctl kill`) | `WINDOWADDRESS` |
| movewindow | émis quand une fenêtre est déplacée vers un espace de travail | `WINDOWADDRESS`,`WORKSPACENAME` |
| movewindowv2 | émis quand une fenêtre est déplacée vers un espace de travail | `WINDOWADDRESS`,`WORKSPACEID`,`WORKSPACENAME` |
| openlayer | émis quand une layerSurface est mappée | `NAMESPACE` |
| closelayer | émis quand une layerSurface est démappée | `NAMESPACE` |
| submap | émis quand une submap de raccourci change. Vide signifie par défaut. |`SUBMAPNAME` |
| changefloatingmode | émis quand une fenêtre change son mode flottant. `FLOATING` vaut soit 0 soit 1. | `WINDOWADDRESS`,`FLOATING` |
| urgent | émis quand une fenêtre demande un état `urgent` | `WINDOWADDRESS` |
| screencast | émis quand un état de capture d'écran d'un client change. Gardez à l'esprit qu'il pourrait y avoir plusieurs clients distincts. L'état est 0/1, le propriétaire est moniteur/fenêtre/région | `STATE,OWNER` |
| screencastv2 | émis quand un état de capture d'écran d'un client change. Gardez à l'esprit qu'il pourrait y avoir plusieurs clients distincts. L'état est 0/1, le propriétaire est moniteur/fenêtre/région, le nom est l'identifiant de la cible partagée (nom du moniteur ou titre de la fenêtre) | `STATE,OWNER,NAME` |
| windowtitle | émis quand le titre d'une fenêtre change. | `WINDOWADDRESS` |
| windowtitlev2 | émis quand le titre d'une fenêtre change. | `WINDOWADDRESS,WINDOWTITLE` |
| togglegroup | émis quand la commande `togglegroup` est utilisée. <br> retourne `state,handle` où `state` est un statut de bascule et `handle` est une ou plusieurs adresses de fenêtre séparées par une virgule<br> par ex. `0,64cea2525760,64cea2522380` où `0` signifie qu'un groupe a été détruit et que le reste indique quelles fenêtres en faisaient partie | `0/1,WINDOWADDRESS(ES)` |
| moveintogroup | émis quand la fenêtre est fusionnée dans un groupe. retourne l'adresse d'une fenêtre fusionnée | `WINDOWADDRESS` |
| moveoutofgroup | émis quand la fenêtre est retirée d'un groupe. retourne l'adresse d'une fenêtre retirée | `WINDOWADDRESS` |
| ignoregrouplock | émis quand `ignoregrouplock` est basculé. | `0/1` |
| lockgroups | émis quand `lockgroups` est basculé. | `0/1` |
| configreloaded | émis quand la configuration a fini de recharger | vide |
| pin | émis quand une fenêtre est épinglée ou désépinglée | `WINDOWADDRESS,PINSTATE` |
| minimized | émis quand une application externe de type barre des tâches demande qu'une fenêtre soit minimisée | `WINDOWADDRESS,0/1` |
| bell | émis quand une application demande à faire sonner la cloche système via `xdg-system-bell-v1`. Le paramètre d'adresse de fenêtre peut être vide. | `WINDOWADDRESS` |

> [!WARNING]
> Il n'est pas garanti qu'un événement fullscreen se déclenche une seule fois en on/off successifs. Certaines fenêtres
> peuvent émettre plusieurs demandes de passage en plein écran, résultant en plusieurs
> événements fullscreen.

## Comment utiliser socket2 avec bash

Exemple de script utilisant les événements socket2 avec bash et `socat` :

```sh
#!/bin/sh

handle() {
  case $1 in
    monitoradded*) do_something ;;
    focusedmon*) do_something_else ;;
  esac
}

socat -U - UNIX-CONNECT:$XDG_RUNTIME_DIR/hypr/$HYPRLAND_INSTANCE_SIGNATURE/.socket2.sock | while read -r line; do handle "$line"; done
```
