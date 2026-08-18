---
weight: 2
title: Barres d'état
---

## Barres d'état simples

Typiquement, vous pourrez configurer l'ordre et le style des widgets avec peu ou pas de compétences en code.

### Waybar

Waybar est une barre d'état GTK faite spécifiquement pour les compositeurs wlroots et
prend en charge Hyprland par défaut. Pour l'utiliser, il est recommandé d'utiliser le
paquet de votre distribution.

Pour commencer à la configurer, copiez les fichiers de configuration depuis
`/etc/xdg/waybar/` vers `~/.config/waybar/`.

Pour utiliser le module des espaces de travail, remplacez toutes les occurrences de `sway/workspaces`
par `hyprland/workspaces`. Remplacez aussi toutes les occurrences de `sway/mode` par `hyprland/submap`

Pour plus d'infos concernant la configuration, voir
[Le Wiki Waybar](https://github.com/Alexays/Waybar/wiki/Module:-Hyprland).

#### Comment le lancer

Tapez `waybar` dans votre terminal. Pour que Waybar se lance en même temps que
Hyprland, ajoutez `waybar` aux démarrages automatiques de votre configuration hyprland.

Waybar fournit aussi un service systemd. Si vous utilisez Hyprland avec [uwsm](../../Useful-Utilities/Systemd-start), vous pouvez l'activer en utilisant la commande suivante.

```ini
systemctl --user enable --now waybar.service
```

#### FAQ Waybar

##### L'espace de travail actif n'apparaît pas

Remplacez `#workspaces button.focused` par `#workspaces button.active` dans
`~/.config/waybar/style.css`.

##### Défiler à travers les espaces de travail

Comme beaucoup d'options de configuration de `sway/workspaces` sont manquantes,
vous devriez en déduire certaines par vous-même. Dans le cas du défilement, cela devrait
ressembler à ceci :

```json
"hyprland/workspaces": {
     "format": "{icon}",
     "on-scroll-up": "hyprctl dispatch 'hl.dsp.focus({workspace=\"e+1\"})' ",
     "on-scroll-down": "hyprctl dispatch 'hl.dsp.focus({workspace=\"e-1\"})' ",
}
```

#### Le titre de la fenêtre est manquant

Le préfixe pour le module de fenêtre qui fournit le titre est `hyprland` et non `wlr`.
Dans votre configuration Waybar, insérez ce module :

```json
"modules-center": ["hyprland/window"],
```

Si vous utilisez plusieurs moniteurs, vous pourriez vouloir insérer l'option suivante :

```json
"hyprland/window": {
    "separate-outputs": true
},
```

### ashell

[ashell](https://malpenzibo.github.io/ashell/) est une barre d'état Wayland prête à l'emploi pour Hyprland

- Ashell est prête à l'emploi dès l'installation. Installez-la simplement, commencez à l'utiliser, et personnalisez uniquement ce dont vous avez besoin.
- Ashell est fournie avec des modules essentiels comme les espaces de travail, l'heure, la batterie, le réseau, et plus encore. Pas besoin de chercher des plugins ou d'écrire des scripts personnalisés.
- Propulsée par iced. Une bibliothèque GUI multiplateforme pour Rust
- Dispose d'options de configuration plutôt limitées. C'est à la fois une bonne et une mauvaise chose. Vous pouvez obtenir un résultat très correct rapidement et avec peu d'effort, mais certains ajustements poussés façon waybar ne sont pas possibles.


## Shells de bureau

Ceux-ci fournissent bien plus qu'une barre d'état : un lanceur, des notifications, un écran de verrouillage et plus encore
sont livrés dans un seul paquet, vous donnant une expérience façon DE dès l'installation — toujours avec peu
ou pas de code impliqué.

### Noctalia
[Noctalia](https://noctalia.dev/) est un shell de bureau magnifique et minimal pour Wayland.

- Construit sur une pile légère et moderne avec un look calme et distinctif que vous pouvez ajuster pour correspondre à votre installation.
- Thématisation étendue avec des palettes de couleurs prédéfinies et une génération automatique de couleurs à partir de votre fond d'écran.
- Système de notification avec historique et mode Ne Pas Déranger.
- Prise en charge des plugins.
- Construit sur Quickshell.

### DankMaterialShell

[DankMaterialShell](https://danklinux.com/) est un shell de bureau complet inspiré de Material 3 pour
Hyprland et d'autres compositeurs Wayland.

- Livré avec une barre, un lanceur, un centre de notifications, un centre de contrôle et un écran de verrouillage dès l'installation,
  remplaçant waybar, fuzzel, mako, swaylock et compagnie en un seul paquet.
- Thématisation automatique basée sur le fond d'écran qui peut s'étendre aux applications GTK/Qt et terminaux.
- Configurable via une application de paramètres GUI intégrée, extensible avec des plugins et widgets.
- Construit sur Quickshell et Go.

## Systèmes de widgets

Utilisez-les quand vous voulez des menus personnalisés avec une disposition entièrement personnalisable. 
Vous devez essentiellement écrire du code, mais les systèmes de widgets facilitent
considérablement le processus. 
Voici trois choix populaires par ordre alphabétique.

|   | [AGS/Astal](https://aylur.github.io/astal/) | [EWW](https://elkowar.github.io/eww/) | [Quickshell](https://quickshell.outfoxxed.me/) | 
|--------------------------|-------------------|-------------------|-------------------|
| Boîte à outils UI               | GTK 3/4            | GTK 3             | Qt                |
| Langage de config          | JS(X)/TS/langages qui prennent en charge [Gobject Introspection](https://en.wikipedia.org/wiki/List_of_language_bindings_for_GTK) | Yuck (la saveur Lisp d'EWW) | QML |

### AGS/Astal

- [Astal](https://aylur.github.io/astal/) est une suite et un framework pour créer des shells de bureau et des widgets Wayland avec GTK.
- [AGS](https://aylur.github.io/ags/) (Aylur's GTK Shell) est un outil d'échafaudage pour Astal et TypeScript/Javascript(X).
En termes simples, il facilite la création de projets Astal dans ces langages.

Pour bien démarrer avec Astal, voir ses [instructions d'installation](https://aylur.github.io/astal/guide/installation)
et [exemples](https://aylur.github.io/astal/guide/introduction#supported-languages).
Pour AGS, voir sa page [Démarrage rapide](https://aylur.github.io/ags/guide/quick-start.html).

#### Avantages
- Flexibilité de langage : Vous pouvez utiliser votre préféré s'il prend en charge
[Gobject Introspection](https://en.wikipedia.org/wiki/List_of_language_bindings_for_GTK) (bien que JS(X)/TS soient les mieux pris en charge par AGS)
- Fournit un large ensemble de bibliothèques, incluant Réseau (à la fois Wi-Fi et Ethernet) et Bluetooth

#### Inconvénients
- Ne fournit pas de rechargement à chaud dès l'installation

### Eww

[Eww](https://github.com/elkowar/eww) (ElKowar's Wacky Widgets) est un système de
widgets fait en Rust + GTK, qui permet la création de widgets personnalisés
de manière similaire à AwesomeWM. La différence clé est qu'il est indépendant du
gestionnaire de fenêtres/compositeur.

Installez Eww soit en utilisant le gestionnaire de paquets de votre distribution, en cherchant
`eww-wayland`, soit en compilant manuellement. Dans ce dernier cas, vous pouvez suivre les
[instructions](https://elkowar.github.io/eww).

#### Avantages
- Sa syntaxe de configuration façon Lisp est simple comparée à d'autres langages de configuration
- Prend en charge le style avec SCSS dès l'installation

#### Inconvénients
- Forte dépendance à des scripts/programmes externes, car il ne fournit pas beaucoup de bibliothèques
- Performance
  - Ne prend en charge que GTK 3, qui ne prend pas en charge l'accélération GPU
  - Surcharge due à l'utilisation de scripts externes et de recréations inutiles de composants lors de la réévaluation des données

#### Configuration

Il y a quelques exemples listés dans le [Readme](https://github.com/elkowar/eww).
Il est aussi fortement recommandé de lire les
[options de configuration](https://elkowar.github.io/eww/configuration.html).

> [!WARNING]
> Lisez
> [la section Wayland](https://elkowar.github.io/eww/configuration.html#wayland)
> attentivement, sinon Eww ne fonctionnera pas sur Hyprland.

Voici quelques exemples de widgets qui pourraient être utiles pour Hyprland :

<details>
<summary>Widget des espaces de travail</summary>

Ce widget affiche une liste d'espaces de travail 1-10. Chaque espace de travail peut être cliqué
pour y sauter, et défiler sur le widget les parcourt. Il prend en charge
différents styles pour l'espace de travail actuel, les espaces de travail occupés, et les espaces de travail
vides. Il nécessite [bash](https://linux.die.net/man/1/bash),
[awk](https://linux.die.net/man/1/awk),
[stdbuf](https://linux.die.net/man/1/stdbuf),
[grep](https://linux.die.net/man/1/grep),
[seq](https://linux.die.net/man/1/seq),
[socat](https://linux.die.net/man/1/socat),
[jq](https://stedolan.github.io/jq/), et [Python 3](https://www.python.org/).

##### `~/.config/eww.yuck`

```lisp
...
(deflisten workspaces :initial "[]" "bash ~/.config/eww/scripts/get-workspaces")
(deflisten current_workspace :initial "1" "bash ~/.config/eww/scripts/get-active-workspace")
(defwidget workspaces []
  (eventbox :onscroll "bash ~/.config/eww/scripts/change-active-workspace {} ${current_workspace}" :class "workspaces-widget"
    (box :space-evenly true
      (label :text "${workspaces}${current_workspace}" :visible false)
      (for workspace in workspaces
        (eventbox :onclick "hyprctl dispatch workspace ${workspace.id}"
          (box :class "workspace-entry ${workspace.windows > 0 ? "occupied" : "empty"}"
            (label :text "${workspace.id}" :class "workspace-entry ${workspace.id == current_workspace ? "current" : ""}" )
            )
          )
        )
      )
    )
  )
...
```

##### `~/.config/eww/scripts/change-active-workspace`

```sh
#!/usr/bin/env bash
function clamp {
  min=$1
  max=$2
  val=$3
  python -c "print(max($min, min($val, $max)))"
}

direction=$1
current=$2
if test "$direction" = "down"
then
  target=$(clamp 1 10 $(($current+1)))
  echo "jumping to $target"
  hyprctl dispatch workspace $target
elif test "$direction" = "up"
then
  target=$(clamp 1 10 $(($current-1)))
  echo "jumping to $target"
  hyprctl dispatch workspace $target
fi
```

##### `~/.config/eww/scripts/get-active-workspace`

```sh
#!/usr/bin/env bash

hyprctl monitors -j | jq '.[] | select(.focused) | .activeWorkspace.id'

socat -u UNIX-CONNECT:$XDG_RUNTIME_DIR/hypr/$HYPRLAND_INSTANCE_SIGNATURE/.socket2.sock - |
  stdbuf -o0 awk -F '>>|,' -e '/^workspace>>/ {print $2}' -e '/^focusedmon>>/ {print $3}'
```

##### `~/.config/eww/scripts/get-workspaces`

```sh
#!/usr/bin/env bash

spaces (){
  WORKSPACE_WINDOWS=$(hyprctl workspaces -j | jq 'map({key: .id | tostring, value: .windows}) | from_entries')
  seq 1 10 | jq --argjson windows "${WORKSPACE_WINDOWS}" --slurp -Mc 'map(tostring) | map({id: ., windows: ($windows[.]//0)})'
}

spaces
socat -u UNIX-CONNECT:$XDG_RUNTIME_DIR/hypr/$HYPRLAND_INSTANCE_SIGNATURE/.socket2.sock - | while read -r line; do
  spaces
done
```

</details>

<details>
<summary>Widget du titre de la fenêtre active</summary>

Ce widget affiche simplement le titre de la fenêtre active. Il nécessite
[awk](https://linux.die.net/man/1/awk),
[stdbuf](https://linux.die.net/man/1/stdbuf),
[socat](https://linux.die.net/man/1/socat), et
[jq](https://stedolan.github.io/jq/).

##### `~/.config/eww/eww.yuck`

```lisp
...
(deflisten window :initial "..." "sh ~/.config/eww/scripts/get-window-title")
(defwidget window_w []
  (box
    (label :text "${window}"
    )
  )
...
```

##### `~/.config/eww/scripts/get-window-title`

```sh
#!/bin/sh
hyprctl activewindow -j | jq --raw-output .title
socat -u UNIX-CONNECT:$XDG_RUNTIME_DIR/hypr/$HYPRLAND_INSTANCE_SIGNATURE/.socket2.sock - | stdbuf -o0 awk -F '>>|,' '/^activewindow>>/{print $3}'
```

</details>

### Quickshell

[Quickshell](https://quickshell.outfoxxed.me/) est une boîte à outils de shell de bureau flexible basée sur QtQuick.
Notez que bien que Qt soit notoirement difficile à thématiser, Quickshell peut être stylisé indépendamment.

Pour bien démarrer, voir les 
[instructions de configuration](https://quickshell.outfoxxed.me/docs/configuration/getting-started/)
et un [hello world guidé](https://quickshell.outfoxxed.me/docs/configuration/intro/)

#### Avantages
- Fournit des intégrations Wayland/Hyprland avancées, par exemple des aperçus de fenêtre en direct
- Recharge automatiquement la configuration lors des changements dès l'installation

#### Inconvénients
- Qt peut être moins intuitif à utiliser comparé à GTK pour son système de positionnement
- Ne fournit pas encore de service Wi-Fi au moment de l'écriture
- Il est encore en alpha et des changements cassants mineurs sont à prévoir
- Les styles sont déclarés avec des composants plutôt qu'en CSS, ce qui pourrait être moins familier pour certaines personnes

## Astuces

### Flou

Utilisez les [règles de calque](../../Configuring/Basics/Window-Rules/#layer-rules) `blur` et `ignore_alpha`. 
La première active le flou, et la seconde le fait ignorer les régions insuffisamment opaques. 
Idéalement, la valeur utilisée avec `ignore_alpha` est supérieure à l'opacité de l'ombre et inférieure à l'opacité du contenu de la barre/du menu. 
De plus, si elle a des popups transparents, vous pouvez utiliser la règle `blur_popups`.

