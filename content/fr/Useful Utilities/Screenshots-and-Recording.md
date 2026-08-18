---
weight: 5
title: Captures d'écran et enregistrement
---

> [!NOTE]
> Vous cherchez l'ancienne syntaxe hyprlang ? Consultez les [pages du wiki 0.54](https://wiki.hypr.land/0.54.0/).
> Depuis Hyprland 0.55, hyprlang est devenu obsolète au profit de lua.

Cette page liste les outils couramment utilisés pour prendre des captures d'écran et enregistrer l'
écran sur Hyprland.

## Utilitaires de capture d'écran

### grim et swappy

[`grim`](https://gitlab.freedesktop.org/emersion/grim) est un outil de capture d'écran Wayland simple. Il
est couramment utilisé avec [`slurp`](https://github.com/emersion/slurp) pour la sélection
de zone et [`swappy`](https://github.com/jtheoof/swappy) pour les annotations.

Par exemple, pour sélectionner une zone et l'ouvrir dans `swappy` :

```lua
hl.bind("Print", hl.dsp.exec_cmd('grim -g "$(slurp)" - | swappy -f -'))
```

Pour copier une zone sélectionnée directement dans le presse-papiers, installez
[`wl-clipboard`](https://github.com/bugaevc/wl-clipboard) et utilisez :

```lua
hl.bind("SUPER + Print", hl.dsp.exec_cmd('grim -g "$(slurp -d)" - | wl-copy'))
```

### Satty

[`Satty`](https://github.com/Satty-org/Satty) est un outil d'annotation de capture d'écran
puissant et moderne inspiré de [`swappy`](https://github.com/jtheoof/swappy) et 
[Flameshot](https://github.com/flameshot-org/flameshot). Il a été créé pour apporter des
améliorations par rapport aux outils de capture d'écran existants et constitue un remplacement quasi direct de swappy.

Par exemple, pour prendre une capture d'écran et l'ouvrir avec `satty`, 
Ctrl-C pour copier dans le presse-papiers et Ctrl-S pour la sauvegarder dans `~/Pictures/Screenshots/` :

```lua
hl.bind("Print", hl.dsp.exec_cmd('grim - | satty -f - --copy-command wl-copy -o "~/Pictures/Screenshots/%Y%m%d_%H%M%S.png"'))
```

### Flameshot

[Flameshot](https://github.com/flameshot-org/flameshot) est un outil de capture d'écran
avec une UI d'annotation intégrée. Sur Wayland, il repose sur la prise en charge des portails pour la capture
d'écran. S'il ne peut pas capturer l'écran, assurez-vous que votre configuration de portail de bureau
fonctionne ou utilisez plutôt `grim` avec `swappy`.

### HyprCapture

[HyprCapture](https://github.com/gfhdhytghd/HyprCapture) est un utilitaire de
capture d'écran et d'enregistrement orienté Hyprland. Il est utile si vous voulez un flux de travail qui est
intégré à Hyprland plutôt que de connecter ensemble plusieurs outils plus petits.

### Capture d'écran WeChat

WeChat a son propre raccourci de capture d'écran. Si Hyprland capture le raccourci en premier,
WeChat ne le recevra pas à moins que le raccourci ne soit explicitement transmis à la fenêtre
WeChat.

Utilisez le dispatcher `pass` pour transmettre <key>Alt</key> + <key>A</key> à WeChat :

```lua
hl.bind("ALT + A", hl.dsp.pass({class = "^(wechat)$"}))
```

Le dispatcher `pass` envoie à la fois les événements de pression et de relâchement à la fenêtre
correspondante, donc un `bindr` séparé n'est pas nécessaire. Cela est utile pour les raccourcis
d'applications qui doivent se comporter comme des raccourcis globaux tout en étant gérés par
l'application elle-même.

Si le raccourci ne fonctionne pas, vérifiez la classe réelle de la fenêtre WeChat :

```sh
hyprctl clients
```

Puis ajustez le matcher en conséquence. Par exemple, si votre paquet signale une
classe différente, remplacez `class:^(wechat)$` par la classe affichée par
`hyprctl clients`.

## Utilitaires d'enregistrement

### OBS Studio

[OBS Studio](https://obsproject.com/) peut enregistrer l'écran via PipeWire et
le portail de bureau. Assurez-vous que `pipewire`, `wireplumber`,
[`xdg-desktop-portal-hyprland`](../../Hypr-Ecosystem/xdg-desktop-portal-hyprland)
et `qt6-wayland` sont installés. Voir [Partage d'écran](../Screen-Sharing) pour
les notes de configuration du portail.

### wf-recorder

[`wf-recorder`](https://github.com/ammen99/wf-recorder) est un enregistreur d'écran
Wayland léger.

Enregistrer l'écran entier :

```sh
wf-recorder -f ~/Videos/recording.mp4
```

Enregistrer une région sélectionnée :

```sh
wf-recorder -g "$(slurp)" -f ~/Videos/recording.mp4
```

Si les outils de capture sont bloqués par le système de permissions de Hyprland, voir
[Permissions](../../Configuring/Advanced-and-Cool/Permissions).
