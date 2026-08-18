---
weight: 11
title: FAQ
---

### Erreurs de recherche de symbole (Symbol lookup errors)

Si vous obtenez une erreur comme :
```
<app>: symbol lookup error: <app>: undefined symbol: <symbol>
```
ou
```
<app>: error while loading shared libraries: <lib>: cannot open shared object file: No such file or directory.
```

ou parfois sans erreurs, juste un plantage au démarrage / aléatoirement

Cela signifie que vous avez compilé Hyprland vous-même et que votre pile s'est désynchronisée. Chaque application hypr* dépend d'un tas de bibliothèques. Si vous mettez à jour ces bibliothèques, et que vous ne recompilez pas la pile hypr*, vous obtiendrez ces erreurs ou plantages.

Si vous voulez éviter complètement ces erreurs, _utilisez des paquets et ne compilez pas vous-même_. En compilant vous-même, la responsabilité de maintenir cette cohérence vous incombe, à **vous** !

Quand vous compilez vous-même, vous devez _compiler tous les composants hypr*_, vous ne pouvez pas en utiliser certains depuis des paquets et d'autres depuis les dépôts.

**Pour les utilisateurs d'Arch** : les paquets `-git` comptent comme une compilation personnelle.

L'ordre dans lequel vous **devez** compiler la pile est le suivant :
```
hyprland-protocols
hyprwayland-scanner
hyprutils
hyprgraphics
hyprlang
hyprcursor
aquamarine
xdg-desktop-portal-hyprland
hyprwire
hyprtoolkit
hyprland
```

D'autres éléments, par ex. les hyprapps (hyprlock, hyprsunset, ...) peuvent être compilés dans n'importe quel ordre
après hyprland.

***Ne jamais, en aucune circonstance***, lier symboliquement différentes versions de .so entre elles, cela mènera à des bugs mémoire et des plantages.
Peu importe ce qu'une personne aléatoire vous dit en ligne. Ne le faites pas.

### Mes applications sont pixellisées

Cela signifie simplement qu'elles s'exécutent via XWayland, qui ne peut physiquement pas mettre à l'échelle
par des montants fractionnaires.

Pour forcer leur exécution en mode Wayland natif, voir
[le Tutoriel Principal](../Getting-Started/Master-Tutorial/#force-apps-to-use-wayland).

Si elles ne peuvent pas, voir [la page XWayland](../Configuring/Advanced-and-Cool/XWayland).

### Mon moniteur externe est vide / ne s'affiche pas / ne reçoit aucun signal (portable)

Pour les cartes graphiques Nvidia - Ce problème semble résolu en utilisant les pilotes Nvidia
525.60.11 ou ultérieurs, mais il peut persister avec des pilotes plus anciens.

Pour les systèmes avec du matériel limité (Ex. iGPU, USB-C, hubs USB) - Définissez la variable d'environnement `AQ_NO_MODIFIERS` à `1` dans votre configuration.
Pour diagnostiquer si vous avez exactement le problème ci-dessus, vous pouvez obtenir un [journal DRM](https://wiki.hypr.land/Crashes-and-Bugs/#debugging-drm-issues) et chercher

```plain
Requested display configuration exceeds system DDB limitations
```

En dehors de cela, il existe un moyen de le corriger qui _pourrait_ fonctionner pour vous cependant :

**Option 1 :** Utilisez _uniquement_ le moniteur externe

En utilisant la variable d'environnement `AQ_DRM_DEVICES=/dev/dri/card1` (ou `card0`) vous pouvez forcer Hyprland à
n'utiliser que votre dGPU, ce qui signifie que l'écran de votre portable disparaîtra mais que votre écran
externe fonctionnera.

**Option 2 :** Utilisez toutes les sorties, au prix de l'autonomie de la batterie.

En basculant votre portable pour n'utiliser que le dGPU dans le BIOS, vous _pourriez_ être en mesure
de tout faire fonctionner, au prix d'une consommation de batterie élevée.

_Notez que ces solutions sont très spécifiques au modèle et peuvent fonctionner ou non. Si
elles ne fonctionnent pas, vous n'avez malheureusement pas de chance._

Vous pourriez néanmoins essayer un adaptateur USB-C vers HDMI, peut-être que cela pourrait router le
moniteur externe via l'iGPU.

### Comment faire une capture d'écran ?

**Option 1 :** Installez `grim` et `slurp`.

Utilisez un raccourci clavier (ou exécutez) `grim -g "$(slurp)"`, et sélectionnez une zone. Une capture d'écran
apparaîtra dans votre `~/Pictures/` (Vous pouvez configurer grim et slurp, voir leurs
pages GitHub).

Si vous voulez que ces captures d'écran aillent directement dans votre presse-papiers, envisagez d'utiliser
`wl-copy`, de [`wl-clipboard`](https://github.com/bugaevc/wl-clipboard).
Voici un exemple de commande à lier :
`grim -g "$(slurp -d)" - | wl-copy` Pour un utilitaire plus complet,
essayez notre propre utilitaire de capture d'écran :
[Grimblast](https://github.com/hyprwm/contrib).

Il existe de nombreux outils de capture d'écran, à une recherche de distance dans votre moteur de recherche préféré.

Pour enregistrer des vidéos, [wf-recorder](https://github.com/ammen99/wf-recorder),
[wl-screenrec](https://github.com/russelltg/wl-screenrec) ou
[OBS Studio](https://obsproject.com/) peuvent être utilisés.

### Le partage d'écran / OBS ne fonctionne pas

Consultez [Partage d'écran](../Useful-Utilities/Screen-Sharing).

Installez aussi `qt6-wayland` si vous prévoyez d'utiliser obs.

### Comment changer mon fond d'écran ?

Voir [Fonds d'écran](../Useful-Utilities/Wallpapers).

### Est-ce que c'est lourd ?

Pas tellement plus lourd que Xorg. Si vous voulez une performance maximale, envisagez de
désactiver le flou et les animations.

### Mon moniteur ne fonctionne pas

Essayez de changer le mode dans votre configuration. Si celui que vous préférez ne fonctionne pas, essayez-en un
plus bas. Une bonne façon de lister tous les modes est d'obtenir `wlr-randr` et de faire
`wlr-randr --dryrun`

### Mon moniteur a une luminosité qui scintille quand j'active le VRR

Changez l'option VRR à `2` (plein écran), pour qu'il ne soit utilisé que dans les jeux.
Cela se produit parce que la luminosité de certains moniteurs peut dépendre du taux de
rafraîchissement, et des changements rapides de taux de rafraîchissement (par exemple, quand l'écran
se met à jour momentanément après avoir appuyé sur une touche) provoqueront des changements rapides de
luminosité.

Si vous voulez que le VRR soit toujours activé malgré tout,
le scintillement peut être atténué voire même supprimé en changeant la plage VRR dans l'EDID de votre moniteur.
Plus d'informations sur [l'ArchWiki](https://wiki.archlinux.org/title/Kernel_mode_setting#Forcing_modes_and_EDID).

### Comment mettre à jour ?

Ouvrez un terminal là où vous avez cloné le dépôt.

```bash
git pull
make all && sudo make install
```

Si vous utilisez le paquet AUR (hyprland-git), vous devrez faire une compilation propre (cleanbuild) pour
mettre à jour le paquet. Paru a posé problème par le passé pour les mises à jour, utilisez Yay.

### Comment verrouiller mon écran ?

Utilisez un utilitaire de verrouillage compatible Wayland utilisant les protocoles WLR, par ex. `swaylock`.
Soyez conscient qu'ils n'empêcheront pas le changement de tty en utilisant Ctrl-Alt-F1...F7.

### Comment changer mon curseur de souris ?

Voir [hyprcursor](../Hypr-Ecosystem/hyprcursor)

1. Définissez le curseur GTK en utilisant [nwg-look](https://github.com/nwg-piotr/nwg-look).
2. Ajoutez `hyprctl setcursor [THEME] [SIZE]` à vos exécutions automatiques dans votre configuration et redémarrez Hyprland.

Si vous utilisez flatpak, exécutez `flatpak override --filesystem=~/.themes:ro --filesystem=~/.icons:ro --user` et placez vos thèmes à la fois dans `/usr/share/themes` et `~/.themes`, et placez vos icônes et curseurs à la fois dans `/usr/share/icons` et `~/.icons`.

Pour les applications Qt, Hyprland exporte XCURSOR_SIZE comme 24, qui est la valeur par défaut.
Vous pouvez remplacer cela en exportant XCURSOR_SIZE avec une valeur différente en utilisant `env`.

Vous pouvez aussi essayer d'exécuter `gsettings set org.gnome.desktop.interface cursor-theme 'theme-name'` ou de l'ajouter après les exécutions automatiques dans votre configuration.

Si vous ne voulez pas installer un éditeur de paramètres GTK, modifiez les fichiers de configuration selon la
[spécification XDG (lien Arch Wiki)](https://wiki.archlinux.org/title/Cursor_themes#Configuration).
Assurez-vous aussi de modifier `~/.config/gtk-4.0/settings.ini` et `~/.gtkrc-2.0` si vous n'utilisez _pas_ un outil
(comme `nwg-look`).

### Les paramètres GTK ne fonctionnent pas 

[https://github.com/swaywm/sway/wiki/GTK-3-settings-on-Wayland](https://github.com/swaywm/sway/wiki/GTK-3-settings-on-Wayland)

### Mon \[nom du programme\] se fige

Assurez-vous d'avoir un démon de notification en cours d'exécution, par exemple `dunst`. Vous pouvez les démarrer automatiquement
dans la configuration.

### Les espaces de travail de Waybar ne fonctionnent pas ???

Waybar a un ensemble de mises en garde ou de paramètres dont vous devez être conscient. Voir
[Barres d'état](../Useful-Utilities/Status-Bars) pour des solutions.

### Comment démarrer automatiquement mes applications préférées ?

En utilisant les règles de fenêtre pour assigner des applications à des espaces de travail, vous pouvez ouvrir un tas
d'applications sur divers espaces de travail. La méthode suivante démarrera ces applications
silencieusement (c.-à-d. sans le scintillement d'un espace de travail à l'autre).

Placez ce qui suit dans votre `hyprland.lua` : (exemple)

```lua
hl.on("hyprland.start", function ()
  hl.exec_cmd("kitty")
  hl.exec_cmd("dolphin")
  hl.exec_cmd("dunst")
  hl.exec_cmd("amongus", { workspace = "1 silent" })
end)
```

### Comment déplacer mes espaces de travail préférés vers un nouveau moniteur quand je le branche ?

Vous pouvez écouter l'événement `monitor.added` et y déplacer vos espaces de travail.

### Ma tablette ne fonctionne pas ??

Utilisez [Open Tablet Driver](https://github.com/OpenTabletDriver/OpenTabletDriver)
pour configurer votre tablette. À l'avenir, elle sera prise en charge dans la configuration.
En attendant, OTD est la solution à privilégier.

### Certaines de mes applications mettent très longtemps à s'ouvrir...?

```lua {filename="~/.config/hypr/hyprland.lua"}
hl.on("hyprland.start", function()
  hl.exec_cmd("dbus-update-activation-environment --systemd WAYLAND_DISPLAY XDG_CURRENT_DESKTOP")
end)
```

Assurez-vous que vos portails se lancent _après_ que ceci soit exécuté. Pour certaines personnes,
ils pourraient se lancer avant que cela ne se soit produit.

Dans de tels cas, un script comme celui-ci :

```bash
#!/usr/bin/env bash
sleep 4
killall -e xdg-desktop-portal-hyprland
killall xdg-desktop-portal
/usr/lib/xdg-desktop-portal-hyprland &
sleep 4
/usr/lib/xdg-desktop-portal &
```

lancé au démarrage devrait corriger tous les problèmes. Ajustez les durées de sleep selon
vos goûts.

### Comment exporter des variables d'environnement pour Hyprland ?

Voir [Variables d'environnement](../Configuring/Advanced-and-Cool/Environment-variables)

La fonction `hl.env()` est utilisée à cette fin. Par exemple :

```lua
hl.env("XDG_CURRENT_DESKTOP", "Hyprland")
```

### Comment désactiver le collage par clic du milieu ?

Définir `misc.middle_click_paste` à `false` désactive complètement la fonctionnalité, à l'exception de certains navigateurs (notamment firefox) qui ont leur propre méthode intégrée pour émuler cette fonctionnalité, qui doit être désactivée dans les paramètres du navigateur.

### Mes applications mettent longtemps à démarrer / ne peuvent pas partager l'écran

Voir [La page XDPH](../Hypr-Ecosystem/xdg-desktop-portal-hyprland/#debugging).

Vous avez très probablement plusieurs implémentations de portail / une implémentation qui échoue à se lancer.

### Mes utilitaires de capture d'écran ne fonctionnent pas avec plusieurs écrans

Certains programmes comme Flameshot ont (actuellement) un support Wayland limité, envisagez
d'en utiliser un conçu nativement pour wayland.

### Je ne peux pas lier SUPER comme ma touche de modification sur mon portable

Beaucoup de portables ont une fonction intégrée pour basculer `SUPER` entre le mode
appui simple et le mode maintien. Ceci est généralement indiqué par un cadenas sur la touche `SUPER`.

D'abord, installez et exécutez `wev`, puis appuyez sur `SUPER`. Si vous voyez un événement d'appui de touche
suivi immédiatement d'un événement de relâchement de touche, alors votre touche `SUPER` est probablement
définie en mode appui simple.

Sur la plupart des portables, cela peut être corrigé en appuyant sur `FN+SUPER` et vérifié dans `wev`.
Vous devriez pouvoir maintenir `SUPER` et ne pas voir d'événement de relâchement instantané. Si
`FN+SUPER` ne fonctionne pas, consultez le manuel de votre portable.

### Ma VM ne reçoit pas les raccourcis clavier que j'ai définis dans Hyprland

C'est normal, car Hyprland est prioritaire.

Une solution simple est de créer une submap « passthrough » vide :

```lua
hl.define_submap("passthru", function()
  hl.bind("SUPER + Escape", hl.dsp.submap("reset"))
end)
hl.bind("...", hl.dsp.submap("passthru"))
```

En appuyant sur la combinaison sélectionnée, vous entrerez dans un mode où Hyprland ignore vos
raccourcis clavier et les transmet à la VM. Appuyer sur `SUPER + Escape` quittera ce mode.

### Le sélecteur de fichiers de Steam ne fonctionne pas

Dans les cas où vous avez une bibliothèque Steam sur un autre disque que vous devez
ajouter, le sélecteur de fichiers de Hyprland n'apparaîtrait normalement pas lors de la sélection d'un répertoire
depuis Steam.

Steam a son propre sélecteur de fichiers, cependant, il n'est pas fonctionnel. Installez
`xdg-desktop-portal-gtk` pour afficher le sélecteur de fichiers du bureau.

### Des espaces de travail ou clients disparaissent, ou les dispatchers liés aux moniteurs causent des plantages

Il semble y avoir un bug du noyau qui fait croire au système qu'il y a un moniteur
fantôme supplémentaire, ce qui cause toutes sortes de problèmes, plantages et comportements étranges
comme des espaces de travail ou clients qui disparaissent lors de l'ajout ou du retrait d'un moniteur
externe.

Vérifiez d'abord la liste des moniteurs détectés par Hyprland en exécutant :

```ini
hyprctl monitors
```

Si vous voyez un moniteur qui ne devrait pas être là (généralement nommé `Unknown-1`), vous
pouvez contourner le problème en ajoutant dans votre `hyprland.lua` :

```lua
hl.monitor({ output = "Unknown-1", disabled = true })
```

### J'obtiens une erreur de fichier .so manquant au lancement

Si vous utilisez un paquet -git, ceci est un problème courant lorsque des mises à jour cassant l'ABI sont effectuées.

_**Ne**_ liez _pas_ symboliquement différentes versions de .so, cela causera des plantages !!!

À la place, trouvez tous les paquets hypr* avec `-git` que vous avez installés, retirez-les (retirez aussi possiblement leurs dépendances)
et réinstallez-les simplement à nouveau.

Si vous utilisez yay, assurez-vous de faire un `CleanBuild` sur chaque paquet. Si vous utilisez paru, retirez manuellement le cache des paquets hypr* dans `~/.cache/paru`.

Si vous n'utilisez aucun paquet -git, c'est une erreur dans le packaging de votre distribution et cela devrait être résolu là-bas.

### Mon curseur est une icône hyprland ?

Cela signifie que vous n'avez aucun thème hyprcursor installé, et que hyprland n'a pas non plus trouvé de thème XCursor. Installez un thème de curseur.

### Des espacements intelligents (smart gaps), s'il vous plaît ?

[Ici](../Configuring/Basics/Workspace-Rules/#smart-gaps).

### Je ne peux pas créer de raccourcis pour Discord

Vous avez très probablement `ELECTRON_OZONE_PLATFORM_HINT = wayland` dans votre configuration.

Essayez de lancer Discord comme ceci : `ELECTRON_OZONE_PLATFORM_HINT= discord`.

> [!WARNING]
> Gardez à l'esprit que cela exécutera Discord sous XWayland.

Si cela fonctionne, naviguez vers l'entrée de bureau (desktop entry) de Discord (généralement située dans `/usr/share/applications/`). Dupliquez-la et remplacez `Exec=/usr/bin/discord` par `Exec=env ELECTRON_OZONE_PLATFORM_HINT= /usr/bin/discord`. Vous pouvez aussi lui donner un nouveau nom, par ex. `Name=DiscordX`, pour éviter la confusion entre les deux.

### Les applications plein écran / jeux Steam s'ouvrent avec la résolution du moniteur secondaire

Le problème vient probablement du fait que le moniteur par défaut pour X11 n'est pas votre moniteur principal souhaité ; pour corriger cela, faites ce qui suit :

Ajoutez `xrandr --output [MONITOR_ID] --primary` à vos démarrages automatiques dans la configuration, en remplaçant [MONITOR_ID] par l'ID de votre moniteur principal (par ex. DP-3). Vous pouvez trouver l'ID de votre moniteur en exécutant `hyprctl monitors`.

En ajoutant cela à votre configuration hyprland, cela définira le moniteur par défaut pour les applications X11 sur votre moniteur principal.

### Mon curseur de souris n'arrête pas de s'échapper de la fenêtre du jeu !

Bien que la plupart des jeux devraient pouvoir verrouiller votre curseur de manière transparente, vous pouvez verrouiller le curseur du côté de Hyprland à la place en utilisant la règle de fenêtre `confine_pointer`. Pour appliquer cette règle à toutes les applications plein écran avec le type de contenu 'game', la règle ci-dessous devrait suffire :

```lua
hl.window_rule({ match = { content = "game", fullscreen = true }, confine_pointer = true })
```
