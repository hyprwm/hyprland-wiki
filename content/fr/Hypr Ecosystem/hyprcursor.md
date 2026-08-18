---
weight: 101
title: hyprcursor
---

[hyprcursor](https://github.com/hyprwm/hyprcursor) est un nouveau format de thème de curseur qui possède de nombreux avantages
par rapport au format xcursor largement utilisé.

## Thèmes Hyprcursor

Vous devrez les obtenir vous-même. Si vous êtes sur le serveur Discord, consultez
`#hyprcursor-themes`.

Placez votre/vos thème(s) dans `~/.local/share/icons` ou `~/.icons`

> [!WARNING]
> Il n'est pas recommandé de placer les thèmes de curseur dans le `/usr/share/icons` à l'échelle du système en raison
> de problèmes de permissions potentiels.

Vous pouvez définir votre thème avec des variables d'environnement, ou avec `hyprctl setcursor`.

Env :

- `HYPRCURSOR_THEME` contrôle le thème.
- `HYPRCURSOR_SIZE` contrôle la taille du curseur.

exemple d'extrait de `hyprland.lua` :

```lua
hl.env("HYPRCURSOR_THEME", "MyCursor")
hl.env("HYPRCURSOR_SIZE", "24")
```

## Créer / Porter des thèmes

Allez sur le [dépôt hyprcursor](https://github.com/hyprwm/hyprcursor)

Consultez les répertoires `docs/` et `hyprcursor-util/` pour les instructions.

## Remarques importantes

Bien que de nombreuses applications prennent en charge les curseurs côté serveur (par ex. Qt, Chromium, Electron,
Écosystème Hypr) certaines applications ne le font toujours pas (par ex. GTK).

Les applications qui ne prennent pas en charge les curseurs côté serveur et hyprcursor se replieront quand même
sur XCursor.

Pour ces applications, vous devez exporter `XCURSOR_THEME` et `XCURSOR_SIZE` vers un
thème XCursor valide, et exécuter 

```sh
gsettings set org.gnome.desktop.interface cursor-theme 'THEME_NAME'
```

pour gtk.  

Si les schémas `gsettings` ne sont pas disponibles pour vous (par ex. sur NixOS vous obtiendrez `No schemas installed`), vous pouvez exécuter à la place : 

```sh
dconf write /org/gnome/desktop/interface/cursor-theme "'THEME_NAME'"
```

Si l'application est un flatpak, exécutez :

```sh
flatpak override --filesystem=~/.themes:ro --filesystem=~/.icons:ro --user
``` 

et placez vos thèmes à la fois dans `/usr/share/themes` et `~/.themes`, 
placez aussi vos icônes et XCursors à la fois dans `/usr/share/icons` et `~/.icons`.

## Je ne veux pas utiliser hyprcursor

Si vous n'avez aucun thème hyprcursor installé, Hyprland se repliera sur XCursor, et utilisera
ce que vous définissez avec `XCURSOR_THEME` et `XCURSOR_SIZE`.

## Mon curseur est une icône hyprland ?

Voir [FAQ](../../FAQ)
