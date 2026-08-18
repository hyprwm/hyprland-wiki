---
weight: 40
title: Utiliser hyprctl
---

`hyprctl` est un utilitaire pour contrôler certaines parties du compositeur depuis une CLI
ou un script. Il devrait être automatiquement installé avec Hyprland.

> [!WARNING]
> Les appels à _hyprctl_ seront traités par le compositeur de manière _synchrone_, ce qui signifie
> que tout usage excessif de l'utilitaire causera des ralentissements. Il est recommandé d'utiliser `--batch`
> pour de nombreux appels de contrôle, et de limiter la quantité d'appels d'information.
> 
> Pour la gestion d'événements en direct, voir les [événements](../Expanding-functionality/#events).

## Commandes

### eval

Fournit une chaîne lua à exécuter dynamiquement, retourne "ok" ou toute erreur levée.

```sh
hyprctl eval 'hl.dispatch(hl.dsp.focus({ workspace = "3" }))'
```

### repl

Démarre une session REPL Lua interactive ou fournit une chaîne lua et affiche le résultat via tostring.
Similaire au mode interactif de `lua`. Quittez avec Ctrl+D.

Utilisation :

```sh
hyprctl repl        # lancer une REPL session
hyprctl repl [code] # execute le code et afficher le resultat
```

Exemples :

```sh
» hyprctl repl 'hl.get_active_window().class'
foot

» hyprctl repl
> for i,w in pairs(hl.get_windows()) do print(i, w.class) end
1       foot
2       firefox
3       codium
> hl.notification.create({ text = "Hello World", timeout = 2000})
HL.Notification(0x563c0a1ebe70)
```

### dispatch

Dispatch est un raccourci pour `eval 'hl.dispatch(...)'` :

```sh
hyprctl dispatch 'hl.dsp.focus({ workspace = "3" })'
```

Voir [Dispatchers](../../Basics/Dispatchers) pour une liste de dispatchers.

### reload

Envoie un `reload` pour forcer le rechargement de la configuration. `reload full-reset` recréera l'intégralité du contexte de configuration,
permettant de basculer vers/depuis lua/hyprlang. `full-reset` ne devrait pas être utilisé sauf en cas de réelle nécessité.

### kill

Envoie un `kill` pour entrer dans un mode kill, où vous pouvez tuer une application en cliquant sur
elle. Vous pouvez en sortir avec ESCAPE.

Un peu comme xkill.

### setcursor

Définit le thème de curseur et recharge le gestionnaire de curseur. Définira le thème pour
tout sauf GTK, pourquoi ? à cause de GTK.

Notez que depuis 0.37.0, celle ci n'accepte que les thèmes hyprcursor. Pour les anciens thèmes xcursor,
utilisez les variables d'environnement `XCURSOR_THEME` et `XCURSOR_SIZE`.

paramètres : theme et size

par ex. :

```sh
hyprctl setcursor Bibata-Modern-Classic 24
```

### output

Vous permet d'ajouter et de retirer des sorties factices vers votre backend préféré.

Utilisation :

```sh
hyprctl output create [backend] (name)
```

ou

```sh
hyprctl output remove [name]
```

Où `[backend]` est le nom du backend et `(name)` est un nom optionnel
pour la sortie. Si `(name)` n'est pas spécifié, le schéma de nommage par défaut sera
utilisé (`HEADLESS-2`, `WL-1`, etc.)

> [!NOTE]
> `create` et `remove` peuvent aussi être respectivement `add` ou `destroy`.

Backends disponibles :

- `wayland` : Crée une sortie sous forme de fenêtre Wayland. Cela ne fonctionnera que si
  vous exécutez déjà Hyprland avec le backend Wayland.
- `headless` : Crée une sortie moniteur headless. Si vous exécutez un serveur VNC/RDP/
  Sunshine, vous devriez utiliser celui-ci.
- `auto` : Choisit un backend pour vous. Par exemple, si vous exécutez Hyprland depuis
  le TTY, `headless` sera choisi.

Par exemple, pour créer une sortie headless nommée "test" :

```sh
hyprctl output create headless test
```

Et pour la retirer :

```sh
hyprctl output remove test
```

### switchxkblayout

Définit l'index de disposition xkb pour un clavier.

Par exemple, si vous définissez :

```lua
hl.device({
  name = "my-epic-keyboard-v1",
  kb_layout = "us,pl,de"
})
```

Vous pouvez utiliser cette commande pour basculer entre elles.

```sh
hyprctl switchxkblayout [DEVICE] [CMD]
```

où `CMD` est soit `next` pour la suivante, `prev` pour la précédente, ou `ID` pour une
disposition spécifique (dans le cas ci-dessus, `us` : 0, `pl` : 1, `de` : 2). Vous pouvez trouver le
`DEVICE` en utilisant la commande `hyprctl devices`.

`DEVICE` peut aussi être `current` ou `all`, explicites d'eux-mêmes. Current est le clavier `main` de `devices`.

Exemple de commande pour un clavier typique :

```sh
hyprctl switchxkblayout at-translated-set-2-keyboard next
```

> [!NOTE]
> Si vous voulez une seule variante, c.-à-d. pl/dvorak sur une disposition mais us/qwerty sur l'
> autre, les paramètres xkb peuvent quand même être vides, cependant le nombre de
> paramètres séparés par des virgules doit correspondre. Alternativement, un seul paramètre peut être spécifié
> pour qu'il s'applique aux trois.
> 
> ```lua
> hl.config({
>   input = {
>     kb_layout = "pl,us,ru",
>      kb_variant = "dvorak,,",
>      kb_options = "caps:ctrl_modifier"
>   }
> })
> ```

### seterror

Définit la chaîne d'erreur hyprctl. Sera réinitialisée quand la configuration de Hyprland est rechargée.

```sh
hyprctl seterror 'rgba(66ee66ff)' hello world this is my problem
```

Pour désactiver :

```sh
hyprctl seterror disable
```

### getprop

Récupère la valeur d'une propriété d'une fenêtre.

```sh
hyprctl getprop [window] [property]
```

Où `window` est tel que décrit [ici](../../Basics/Dispatchers#parameter-explanation), et `property` est n'importe laquelle pouvant être définie avec [setprop](../../Basics/Dispatchers/#set_prop).

#### Notes
- Si `animationstyle` n'est pas défini, `(unset)` est retourné.
- `min_size` vaut par défaut `20 20`.
- `max_size` vaut par défaut `inf inf` ou `[null,null]` en JSON.

### notify

Envoie une notification en utilisant le système de notification intégré de Hyprland.

```sh
hyprctl notify [ICON] [TIME_MS] [COLOR] [MESSAGE]
```

Par exemple :

```sh
hyprctl notify -1 10000 "rgb(ff1ea3)" "Hello everyone!"
```

Une icône de `-1` signifie « Pas d'icône »

Une couleur de `0` signifie « Couleur par défaut pour l'icône »

Liste des icônes :

```sh
WARNING = 0
INFO = 1
HINT = 2
ERROR = 3
CONFUSED = 4
OK = 5
```

Optionnellement, vous pouvez spécifier une taille de police pour la notification comme ceci :

```sh
hyprctl notify -1 10000 "rgb(ff0000)" "fontsize:35 This text is big"
```

La taille de police par défaut est 13.

### dismissnotify

Rejette toutes les notifications ou jusqu'à AMOUNT notifications.

```sh
hyprctl dismissnotify # rejette toutes les notifications
hyprctl dismissnotify 2 # rejete les 2 plus anciennes notifications
hyprctl dismissnotify -1 # rejette toutes les notifications (meme sans argument)
```

## Info

```plain
version - prints the Hyprland version along with flags, commit and branch of build.
monitors - lists active outputs with their properties, 'monitors all' lists active and inactive outputs
workspaces - lists all workspaces with their properties
activeworkspace - gets the active workspace and its properties
workspacerules - gets the list of defined workspace rules
clients - lists all windows with their properties
devices - lists all connected keyboards and mice
decorations [window] - lists all decorations and their info
binds - lists all registered binds
activewindow - gets the active window name and its properties
layers - lists all the layers
splash - prints the current random splash
getoption [option] - gets the config option status (values)
cursorpos - gets the current cursor position in global layout coordinates
animations - gets the currently configured info about animations and beziers
instances - lists all running instances of Hyprland with their info
layouts - lists all layouts available (including from plugins)
configerrors - lists all current config parsing errors
rollinglog - prints tail of the log. Also supports -f/--follow option
locked - prints whether the current session is locked.
descriptions - returns a JSON with all config options, their descriptions and types.
submap - prints the current submap the keybinds are in
```

Pour la commande getoption, le nom de l'option doit être écrit comme
`section.option`, par ex. :

```sh
hyprctl getoption general.border_size

# For nested sections:
hyprctl getoption input.touchpad.disable_while_typing
```

Voir [Variables](../../Basics/Variables) pour les sections et options que vous pouvez utiliser.

## Batch

Vous pouvez utiliser l'ancien drapeau `--batch` pour envoyer plusieurs commandes séparées par un `;`.

> [!NOTE]
> Tout point-virgule à l'intérieur de commandes individuelles dans le batch (par ex.
> du code Lua multi-instructions) doit être échappé avec un backslash, et tout
> backslash littéral doit aussi être échappé. Ceci s'ajoute *en plus* de tout échappement
> déjà requis par votre shell.

## Flags

Vous pouvez spécifier des drapeaux pour la requête comme ceci :

```sh
hyprctl -j monitors
```

liste des drapeaux :

```txt
j -> output in JSON
i -> select instance (id or index in hyprctl instances)
r -> force state refresh after issuing commands (e.g. layout or rule changes)
```
