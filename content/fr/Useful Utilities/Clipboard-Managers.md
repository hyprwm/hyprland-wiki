---
weight: 9
title: Gestionnaires de presse-papiers
---

_Méthode de démarrage :_ manuelle (dans les démarrages automatiques de la configuration hyprland)

Les gestionnaires de presse-papiers offrent un moyen pratique d'organiser et d'accéder au contenu
précédemment copié, incluant à la fois texte et images.  
Voici quelques exemples courants :

- [`cliphist`](https://github.com/sentriz/cliphist) - Utilise Wayland avec `wl-clipboard` et peut stocker du texte,
des images et toute donnée binaire.

- [`clipman`](https://github.com/chmouel/clipman) - Utilise Wayland avec la prise en charge `wl-clipboard` et ne stocke que du texte.

- [`clipvault`](https://github.com/rolv-apneseth/clipvault) - Utilise Wayland avec `wl-clipboard` et peut stocker du texte, des images et toute donnée binaire.  
Alternative à `cliphist` avec quelques fonctionnalités supplémentaires (par ex. âge maximum pour les entrées, longueur min/max d'entrée).

- [`clipse`](https://github.com/savedra1/clipse) - Utilise Wayland avec `wl-clipboard` et prend en charge le texte et les images. Accessible via une TUI qui peut être liée à une fenêtre flottante dans votre configuration Hyprland. Les fonctionnalités incluent des thèmes personnalisés, des aperçus image/texte, la sélection multiple, les éléments épinglés, le collage automatique, la gestion de contenu sensible et plus encore.

- [`copyq`](https://github.com/hluk/CopyQ) - Prend en charge le texte, les images, et divers autres formats. Il offre un historique consultable, des capacités d'édition, et une interface de script. Vous pouvez aussi organiser les éléments en onglets et synchroniser les presse-papiers entre différents appareils.

- [`wl-clip-persist`](https://github.com/Linus789/wl-clip-persist) - Quand vous copiez quelque chose sur Wayland, les données copiées restent dans le presse-papiers jusqu'à ce que l'application depuis laquelle la copie a été faite soit fermée ; après cela, les données disparaissent et ne peuvent plus être collées.  
Pour corriger ce problème, vous pouvez utiliser `wl-clip-persist` qui préservera les données dans le presse-papiers après la fermeture de l'application.

- [`cursor-clip`](https://github.com/Sirulex/cursor-clip) - Un gestionnaire de presse-papiers Wayland moderne construit avec Rust, GTK4, Libadwaita et Layer Shell qui rend la gestion du presse-papiers plus fiable. Propose une interface d'historique de presse-papiers façon Windows 11 avec un design GNOME natif, toujours positionnée à l'emplacement actuel du curseur de la souris. Prend en charge tous les formats de presse-papiers, y compris texte, images et fichiers. 

## cliphist

Commencez par ajouter les démarrages automatiques suivants à votre configuration :
 - `wl-paste --type text --watch cliphist store`
 - `wl-paste --type image --watch cliphist store`

Notez que n'importe laquelle des lignes ci-dessus peut être désactivée selon vos besoins.

Pour lier `cliphist` à un raccourci et l'afficher sous `rofi`, `dmenu`, `wofi` ou `fuzzel`,
vous pouvez l'éditer dans `hyprland.lua`.

Commandes bash :

{{< tabs items="rofi,dmenu,wofi,fuzzel" >}}

{{< tab >}}
```sh
cliphist list | rofi -dmenu -display-columns 2 | cliphist decode | wl-copy
```
{{< /tab >}}

{{< tab >}}
```sh
cliphist list | dmenu | cliphist decode | wl-copy
```
{{< /tab >}}

{{< tab >}}
```sh
cliphist list | wofi --dmenu --pre-display-cmd "echo '%s' | cut -f 2" | cliphist decode | wl-copy
```
{{< /tab >}}

{{< tab >}}
```sh
cliphist list | fuzzel --dmenu --with-nth 2 | cliphist decode | wl-copy
```
{{< /tab >}}

{{< /tabs >}}

Les raccourcis ci-dessus lient `SUPER + V` pour accéder à l'historique du presse-papiers.  
Pour plus d'infos, merci de vous référer au dépôt GitHub du programme lié ci-dessus.

## clipman

Commencez par ajouter ceci aux démarrages automatiques : `wl-paste -t text --watch clipman store --no-persist`

Si vous souhaitez l'utiliser comme gestionnaire de presse-papiers principal, utilisez plutôt ceci : `wl-paste -p -t text --watch clipman store -P --histpath="~/.local/share/clipman-primary.json"`

Assurez-vous que `~/.local/share/clipman-primary.json` est déjà créé.

Vous pouvez maintenant lier `clipman` comme ceci :

{{< tabs items="rofi,dmenu,wofi,fuzzel" >}}

{{< tab >}}
```lua
hl.bind("SUPER + V", hl.dsp.exec_cmd("clipman pick -t rofi))
```
{{< /tab >}}

{{< tab >}}
```lua
hl.bind("SUPER + V", hl.dsp.exec_cmd("clipman pick -t dmenu"))
```
{{< /tab >}}

{{< tab >}}
```lua
hl.bind("SUPER + V", hl.dsp.exec_cmd("clipman pick -t wofi"))
```
{{< /tab >}}

{{< tab >}}
```lua
hl.bind("SUPER + V", hl.dsp.exec_cmd("clipman pick -t STDOUT | fuzzel --dmenu | wl-copy"))
```
{{< /tab >}}

{{< /tabs >}}

...et ainsi de suite.  
Pour plus d'informations, merci de vous référer au dépôt GitHub du programme lié ci-dessus.

## clipvault

Commencez par ajouter le(s) démarrage(s) automatique(s) suivant(s) à votre `~/.config/hypr/hyprland.lua`

```sh
wl-paste --watch clipvault store # Stores text, image and any other binary data
# wl-paste --type text --watch clipvault store # Stores only text data
# wl-paste --type image --watch clipvault store # Stores only image data
# wl-paste --watch clipvault store --min-entry-length 2 --max-entries 200 --max-entry-age 2d # Store any data, but with additional parameters
```

Notez que vous pouvez décommenter n'importe laquelle des lignes commentées ci-dessus selon vos besoins. Référez-vous à la section
de configuration dans le dépôt GitHub du projet lié ci-dessus pour plus d'informations.

Pour lier `clipvault` à un raccourci et l'afficher en utilisant un sélecteur de votre choix (par ex. `rofi`, `dmenu`, `wofi`, etc.),
vous pouvez ajouter l'une des commandes ci-dessous à un raccourci dans votre `hyprland.lua` :

{{< tabs items="rofi,dmenu,wofi,fuzzel,tofi" >}}

{{< tab >}}
```sh
clipvault list | rofi -dmenu -display-columns 2 | clipvault get | wl-copy
```
{{< /tab >}}

{{< tab >}}
```sh
clipvault list | dmenu | clipvault get | wl-copy
```
{{< /tab >}}

{{< tab >}}
```sh
clipvault list | wofi -S dmenu --pre-display-cmd "echo '%s' | cut -f 2" | clipvault get | wl-copy
```
{{< /tab >}}

{{< tab >}}
```sh
clipvault list | fuzzel --dmenu --with-nth 2 | clipvault get | wl-copy
```
{{< /tab >}}

{{< tab >}}
```sh
clipvault list | tofi | clipvault get | wl-copy
```
{{< /tab >}}

{{< /tabs >}}

Les raccourcis ci-dessus lient `SUPER + V` pour accéder à l'historique du presse-papiers.  
Pour plus d'infos, merci de vous référer au dépôt GitHub du programme lié ci-dessus.

## clipse

Commencez par ajouter ceci à votre démarrage automatique : `clipse -listen`

Vous pouvez lier la TUI à quelque chose d'agréable comme ceci :

```lua
hl.bind("SUPER + V", hl.dsp.exec_cmd("kitty --class clipse -e clipse", { float = true, size = {622, 652}, stay_focused = true }))
```

L'émulateur de terminal `kitty` est recommandé en raison de son rendu d'image le plus compatible, mais vous pouvez remplacer
celui-ci par n'importe quel autre terminal de votre choix. 

La classe est optionnelle, mais il est recommandé d'utiliser une fenêtre flottante pour une sensation plus
traditionnelle, façon GUI.

Pour plus de détails sur `clipse`, merci de vous référer à son dépôt GitHub lié en haut
de la page.

## copyq

Commencez par ajouter ceci à votre démarrage automatique : `copyq --start-server`

Si la fenêtre principale de `copyq` ne peut pas se fermer ou se masquer correctement, essayez d'activer son
option « Hide main window » dans l'onglet de configuration Layout de la boîte de dialogue
Preferences.

## wl-clip-persist

Ajoutez ceci à vos démarrages automatiques.
Aucun autre changement n'est requis. Les mécanismes de base de copier/coller wayland persisteront maintenant même quand la fenêtre source est fermée.

```sh
wl-clip-persist --clipboard regular
```

Peut aussi être appliqué à la sélection primaire (c.-à-d. le clic du milieu pour coller la sélection), mais ce n'est pas recommandé car la sélection primaire [a des effets de bord non intentionnels pour certaines applications GTK.](https://github.com/Linus789/wl-clip-persist#primary-selection-mode-breaks-the-selection-system-3)

```sh
wl-clip-persist --clipboard primary
```

## cursor-clip

Commencez par ajouter ceci à vos démarrages automatiques : `cursor-clip --daemon`

Cela démarre le démon en arrière-plan qui surveille les changements du presse-papiers.

Pour lier `cursor-clip` à un raccourci pour un accès rapide, vous pouvez ajouter un raccourci pour exécuter `cursor-clip` à votre configuration hyprland.

Une fois déclenché, `cursor-clip` positionnera automatiquement sa fenêtre de superposition à l'emplacement actuel de votre souris, offrant une interface d'historique de presse-papiers façon Windows 11. La superposition prend en charge tous les formats de presse-papiers y compris texte, images et fichiers, avec un design GNOME natif construit avec GTK4 et Libadwaita.

Pour plus d'informations, merci de vous référer au dépôt GitHub du programme lié en haut de la page.
