---
weight: 5
title: Raccourcis (Binds)
---

> [!NOTE]
> Vous cherchez l'ancienne syntaxe hyprlang ? Consultez les [pages du wiki 0.54](https://wiki.hypr.land/0.54.0/).
> Depuis Hyprland 0.55, hyprlang est devenu obsolète au profit de lua.

## Basique

```lua
hl.bind(keys, dispatcher)
```

par exemple,

```lua
hl.bind("SUPER + SHIFT + Q", hl.dsp.exec_cmd("firefox"))
```

liera l'ouverture de Firefox à <key>SUPER</key> + <key>SHIFT</key> + <key>Q</key>

*La liste des dispatchers se trouve dans
[Dispatchers](../Dispatchers/#dispatchers-1).*

Vous pouvez aussi mettre une fonction lua si vous préférez comme dispatcher de raccourci :

```lua
hl.bind("SUPER + SHIFT + X", function()
    -- some logic...
    hl.dispatch(hl.dsp.window.float({ action = "toggle" }))
end)
```

> [!WARNING]
> **Les gestionnaires de raccourcis clavier ne doivent pas bloquer.** Les callbacks lua s'exécutent sur la
> boucle d'événements du compositeur. Évitez `io.popen`, les E/S réseau, les outils de presse-papiers (`wl-paste`,
> `xclip`), les pauses (sleep), et tout autre traitement long à l'intérieur des fonctions de raccourci.
> Préférez `hl.dsp.exec_cmd(...)` pour les commandes externes afin qu'elles s'exécutent en dehors
> du callback du raccourci. Si vous devez sonder le système depuis Lua, limitez l'attente
> (par exemple avec `timeout`). Un appel bloqué ou lent gèle les entrées et l'ensemble du
> bureau jusqu'à ce qu'il se termine.

## Symboles rares / lier avec un keycode

Consultez le
[header xkbcommon-keysyms.h](https://github.com/xkbcommon/libxkbcommon/blob/master/include/xkbcommon/xkbcommon-keysyms.h)
pour tous les keysyms. Le nom à utiliser est le segment après `XKB_KEY_`.

Si vous voulez lier via un keycode, vous pouvez le mettre à la position KEY avec
un préfixe `code:`, par ex. :

```lua
hl.bind("SUPER + code:28", hl.dsp.exec_cmd("amongus"))
```

Cela liera <key>SUPER</key> + <key>t</key> puisque <key>t</key> est le keycode 28.

> [!NOTE]
> Si vous n'êtes pas sûr du nom ou du keycode de votre touche, vous pouvez utiliser [`wev`](https://github.com/jwrdegoede/wev) pour le découvrir.

## Flags des raccourcis

`hl.bind()` prend en charge des flags dans ce format :

```lua
hl.bind(keys, dispatcher, { flag1 = true, flag2 = true })
```

par ex. :

```lua
hl.bind(keys, hl.dsp.exec_cmd("amongus"), { release = true, locked = true })
```

Flags disponibles :

| Flag | Description |
|------|-------------|
| `locked` | Fonctionnera aussi quand un inhibiteur d'entrée (par ex. un écran de verrouillage) est actif. |
| `release` | Se déclenchera au relâchement d'une touche. |
| `click` | Se déclenchera au relâchement d'une touche ou d'un bouton tant que le curseur de la souris reste à l'intérieur de `binds:drag_threshold`. |
| `drag` | Se déclenchera au relâchement d'une touche ou d'un bouton tant que le curseur de la souris se déplace au-delà de `binds:drag_threshold`. |
| `long_press` | Se déclenchera lors d'un appui long sur une touche. |
| `repeating` | Se répétera si maintenu. |
| `non_consuming` | Les événements clavier/souris seront transmis à la fenêtre active en plus de déclencher le dispatcher. |
| `auto_consuming` | Les événements clavier/souris seront transmis à la fenêtre active si le dispatcher échoue. |
| `mouse`| Voir la section dédiée [Raccourcis souris](#mouse-binds). |
| `transparent` | Ne peut pas être masqué par d'autres raccourcis. |
| `ignore_mods` | Ignorera les modificateurs. |
| `description` | Vous permettra d'écrire une description pour votre raccourci. |
| `dont_inhibit` | Contourne les demandes d'inhibition des raccourcis clavier faites par l'application. |
| `submap_universal` | Sera actif quelle que soit la submap. |
| `device` | Permet de définir des raccourcis par appareil. Voir [Raccourcis par appareil](#per-device-binds) |
| `allow_input_capture` | Quand l'entrée est capturée par un client, ce raccourci sera tout de même traité. |

Exemple d'utilisation :

```lua
-- Example volume button that allows press and hold, volume limited to 150%
hl.bind("XF86AudioRaiseVolume", hl.dsp.exec_cmd("wpctl set-volume -l 1.5 @DEFAULT_AUDIO_SINK@ 5%+"), { repeating = true })

-- Example volume button that will activate even while an input inhibitor is active
hl.bind("XF86AudioLowerVolume", hl.dsp.exec_cmd("wpctl set-volume @DEFAULT_AUDIO_SINK@ 5%-"), { locked = true } )

-- Open wofi on first press, closes it on second
hl.bind("SUPER + SUPER_L", hl.dsp.exec_cmd("pkill wofi || wofi"), { release = true })

-- Skip player on long press and only skip 5s on normal press
hl.bind("SUPER + XF86AudioNext", hl.dsp.exec_cmd("playerctl next"), { long_press = true })
hl.bind("SUPER + XF86AudioNext", hl.dsp.exec_cmd("playerctl position +5"))
```

### Boutons de souris

Vous pouvez aussi lier ou délier des boutons de souris en préfixant le keycode de souris par `mouse:`, par ex. :

```lua
hl.bind("SUPER + mouse:272", hl.dsp.exec_cmd("amongus"))  -- bind `exec amogus` to SUPER + LMB.
```

### Lier uniquement des touches de modification

Pour lier uniquement des touches de modification (modkeys), vous devez utiliser le modmask CIBLE (avec
le mod activateur) et le flag `r`, par ex. :

```lua
-- bind `exec amongus` to ALT_L.
hl.bind("ALT + ALT_L", hl.dsp.exec_cmd("amongus"), { release = true })
```

### Molette de souris

Vous pouvez aussi lier les événements de molette de souris avec `mouse_up` et `mouse_down` (ou
`mouse_left` et `mouse_right` si votre souris prend en charge le défilement horizontal) :

```lua
hl.bind("SUPER + mouse_down", hl.dsp.focus({ workspace = "e-1" }))
```

> [!NOTE]
> Vous pouvez contrôler le délai de réinitialisation avec `hl.config.binds.scroll_event_delay`.

### Interrupteurs (Switches)

Les switches sont utiles pour lier des événements comme la fermeture et l'ouverture du capot d'un portable :

```lua
-- Trigger when the switch is toggled.
hl.bind("switch:[switch name]", hl.dsp.exec_cmd("swaylock"), { locked = true })
-- Trigger when the switch is turning on.
hl.bind("switch:on:[switch name]", hl.dsp.exec_cmd("notify-send 'yooo'"), { locked = true })
-- Trigger when the switch is turning off.
hl.bind("switch:off:[switch name]", hl.dsp.exec_cmd("notify-send 'among us'"), { locked = true })
```

> [!WARNING]
> Les paramètres systemd `HandleLidSwitch` dans `logind.conf` peuvent entrer en conflit avec les configurations de switch de capot de portable de Hyprland.

> [!NOTE]
> Vous pouvez voir vos switches avec `hyprctl devices`.

### Plusieurs raccourcis sur une touche

Vous pouvez déclencher plusieurs actions avec le même raccourci en utilisant une fonction lambda lua, avec différents `dispatcher`s et `param`s :

```lua
-- To switch between windows in a floating workspace:
hl.bind("SUPER + Tab", function()
    hl.dispatch(hl.dsp.window.cycle_next())    -- Change focus to another window
    hl.dispatch(hl.dsp.window.bring_to_top()) -- Bring it to the top
end)
```

> [!WARNING]
> Les raccourcis clavier seront exécutés de haut en bas, dans l'ordre où ils ont été écrits.

### Description

Vous pouvez décrire votre raccourci clavier avec le flag `description`.  
Votre description doit toujours se trouver dans la section des flags.

```lua
hl.bind(keys, dispatcher, { description = "your description here"})
```

Par exemple :

```lua
hl.bind("SUPER + Q", hl.dsp.exec_cmd("kitty"), { description = "Open my favourite terminal" })
```

Si vous voulez accéder à votre description, vous pouvez utiliser `hyprctl binds`.  
Pour plus d'informations, consultez [Utiliser Hyprctl](../../Advanced-and-Cool/Using-hyprctl).

### Raccourcis par appareil

Vous pouvez rendre des raccourcis clavier spécifiques à un appareil avec le flag `device`. Ce flag est une table composée d'un flag `inclusive` et d'une liste d'appareils.  
Si `inclusive` est défini à true, seuls les appareils spécifiés dans la liste peuvent déclencher le raccourci. S'il est défini à false, tous les appareils sauf ceux spécifiés peuvent déclencher le raccourci. Si `inclusive` n'est pas présent, il vaut true par défaut.  
Une liste d'appareils est spécifiée dans le champ `list` sous forme de liste de chaînes séparées par des virgules.  
Des tags d'appareil peuvent aussi être utilisés à la place des noms d'appareil. Voir [Appareils](../../Advanced-and-Cool/Devices).

```lua
hl.bind(keys, dispatcher(params), { device = { inclusive = true, list = { "device1", "device2" } } })
```

```lua
-- Only example-keyboard-1 can use this bind
hl.bind("SUPER + Q", hl.dsp.exec_cmd("kitty"), { device = { inclusive = true, list = { "example-keyboard-1" } } })

-- Every keyboard other than razer-keyboard and asus-keyboard can use this bind
hl.bind("SUPER + Q", hl.dsp.exec_cmd("kitty"), { device = { inclusive = false, list = { "razer-keyboard", "asus-keyboard" } } })
```

Vous pouvez vérifier les noms d'appareil avec `hyprctl devices`.

## Raccourcis souris

Ce sont des raccourcis qui reposent sur le mouvement de la souris.

```lua
hl.bind("ALT + mouse:272", hl.dsp.window.drag(), { mouse = true })    -- ALT + LMB: Move a window
hl.bind("ALT + mouse:273", hl.dsp.window.resize(), { mouse = true })  -- ALT + RMB: Resize a window
```

Raccourcis souris disponibles :

| Nom | Description |
| ---- | ----------- |
| `drag()` | déplace la fenêtre active |
| `resize()` | redimensionne la fenêtre active |
| `resize({ keep_aspect_ratio })`| redimensionne la fenêtre active, en remplaçant temporairement la propriété `keep_aspect_ratio` de la fenêtre |

Codes de touches courants des boutons de souris (vérifiez `wev` pour d'autres boutons) :

```txt
LMB -> 272
RMB -> 273
MMB -> 274
```

> [!NOTE]
> Les raccourcis souris, malgré leur nom, se comportent comme des raccourcis normaux.  
> Vous êtes libre d'utiliser les touches / mods de votre choix. Lorsqu'elle est maintenue, la fonction souris sera
> activée.

### Cliquer et glisser

`binds.drag_threshold` peut être utilisé pour différencier les clics des glissements avec le même bouton :

```lua
hl.config({
    binds = {
        drag_threshold = 10 -- Fire a drag event only after dragging for more than 10px
    }
})
hl.bind("ALT + mouse:272", hl.dsp.window.drag(), { mouse = true, drag = true })    -- ALT + LMB (drag): Move a window by dragging more than 10px.
hl.bind("ALT + mouse:272", hl.dsp.window.float(), { mouse = true, click = true })  -- ALT + LMB (click): Floats a window by clicking
```

### Pavé tactile (Touchpad)

Comme cliquer et déplacer la souris sur un pavé tactile n'est pas ergonomique, vous pouvez aussi utiliser des touches du clavier à la place des clics de souris.

```lua
hl.bind("SUPER + mouse:272", hl.dsp.window.drag(), { mouse = true })
hl.bind("SUPER + CTRL_L", hl.dsp.window.drag(), { mouse = true })

hl.bind("SUPER + mouse:273", hl.dsp.window.resize(), { mouse = true })
hl.bind("SUPER + ALT_L", hl.dsp.window.resize(), { mouse = true })
```

## Raccourcis globaux

### Classique

Oui, vous avez bien entendu, Hyprland prend en charge les raccourcis globaux pour *TOUTES* les applications,
y compris OBS, Discord, Firefox, etc.

Voir les dispatchers [`pass`](../Dispatchers/#dispatchers-1) et
[`send_shortcut`](../Dispatchers/#dispatchers-1) pour les raccourcis clavier.

Prenons OBS comme exemple : le raccourci « Start/Stop Recording » est défini sur
<key>SUPER</key> + <key>F10</key>, pour le rendre global, ajoutez simplement :

```lua
hl.bind("SUPER + F10", hl.dsp.pass({ window = "class:^(com\\.obsproject\\.Studio)$" }))
```

à votre configuration et c'est terminé.

`pass` transmettra les événements `PRESS` et `RELEASE` par lui-même, pas besoin d'un `bindr`.  
Cela signifie aussi que le push-to-talk fonctionnera parfaitement avec un seul `pass`, par ex. :

```lua
hl.bind("mouse:276", hl.dsp.pass({window = "class:^(TeamSpeak 3)$"}))    # Pass MOUSE5 to TeamSpeak3.
```

Vous pouvez aussi ajouter des raccourcis, où d'autres touches sont transmises à la fenêtre.

```lua
hl.bind("SUPER + F10", hl.dsp.send_shortcut({ mods = "SUPER", key = "F4", window = "class:^(TeamSpeak 3)$" }))  -- Send SUPER + F4 to OBS when SUPER + F10 is pressed.
```

> [!WARNING]
> Cela fonctionne parfaitement avec toutes les applications Wayland natives, cependant, XWayland est un peu capricieux.  
> Assurez-vous que ce que vous transmettez est un « raccourci global Xorg », sinon la transmission depuis une application XWayland différente pourrait ne pas fonctionner.

### Raccourcis globaux DBus

Certaines applications peuvent déjà prendre en charge le portail GlobalShortcuts dans
xdg-desktop-portal.  
Si c'est le cas, il est recommandé d'utiliser la méthode suivante plutôt que `pass` :

Ouvrez l'application souhaitée et exécutez `hyprctl globalshortcuts` dans un terminal.  
Cela vous donnera une liste des raccourcis actuellement enregistrés avec leur(s) description(s).

Choisissez celui que vous voulez, par exemple `coolApp:myToggle`, et liez-le à
ce que vous voulez avec le dispatcher `global` :

```lua
hl.bind("SUPER + SHIFT + A", hl.dsp.global("coolApp:myToggle"))
```

> [!NOTE]
> Notez que cette fonction ne fonctionnera *que* avec
> [XDPH](../../../Hypr-Ecosystem/xdg-desktop-portal-hyprland).

## Submaps

Les submaps de raccourcis vous permettent d'activer un ensemble distinct de raccourcis clavier.  
Par exemple, si vous voulez entrer dans un *mode* `resize` qui vous permet de redimensionner des fenêtres avec les touches fléchées, vous pouvez le faire ainsi :

```lua
-- Switch to a submap called `resize`.
hl.bind("ALT + R", hl.dsp.submap("resize"))

-- Start a submap called "resize".
hl.define_submap("resize", function()

    -- Set repeating binds for resizing the active window.
    hl.bind("right", hl.dsp.window.resize({ x = 10, y = 0, relative = true}), { repeating = true })
    hl.bind("left", hl.dsp.window.resize({ x = -10, y = 0, relative = true}), { repeating = true })
    hl.bind("up", hl.dsp.window.resize({ x = 0, y = 10, relative = true}), { repeating = true })
    hl.bind("down", hl.dsp.window.resize({ x = 0, y = -10, relative = true}), { repeating = true })

    -- Use `reset` to go back to the global submap
    hl.bind("escape", hl.dsp.submap("reset"))

end)

-- Keybinds further down will be global again...
```

> [!WARNING]
> N'oubliez pas un raccourci clavier (`escape`, dans ce cas) pour réinitialiser la keymap une fois à l'intérieur !
> 
> Si vous vous retrouvez coincé dans une keymap, vous pouvez utiliser `hyprctl dispatch 'hl.dsp.submap("reset")'` pour revenir en arrière.  
> Si vous n'avez pas de terminal ouvert, ouvrez un nouveau tty et utilisez le flag --instance pour sélectionner sur quelle instance de hyprland agir (si vous n'en avez qu'une en cours d'exécution, c'est 0). Par exemple : `hyprctl dispatch --instace 0 'hl.dsp.submap("reset")'`

Vous pouvez aussi définir le même raccourci clavier pour effectuer plusieurs actions, comme redimensionner
et fermer la submap, comme ceci :

```lua
hl.bind("ALT + R", hl.dsp.submap("resize"))

hl.define_submap("resize", function()
    hl.bind("right", function()
        hl.dispatch(hl.dsp.window.resize({ x = 10, y = 0, relative = true }))
        hl.dispatch(hl.dsp.submap("reset"))
    end)
end)
```

Cela fonctionne car les raccourcis sont exécutés dans l'ordre où ils apparaissent, et
assigner plusieurs actions par raccourci est possible.

Vous pouvez définir un raccourci clavier qui sera actif quelle que soit la submap actuelle avec le flag de raccourci submap universel.

```lua
hl.bind(mainMod .. " + K", hl.dsp.exec_cmd("kitty"), { submap_universal = true })
```

### Imbrication

Les submaps peuvent être imbriquées, voir l'exemple suivant :

```lua
hl.bind(mainMod .. " + M", hl.dsp.submap("main_submap"))
hl.define_submap(main_submap, function()

    -- ...

    -- nested_one
    hl.bind("1", hl.dsp.submap("nested_one"))
    hl.define_submap("nested_one", function()

        -- ...

        hl.bind("SHIFT + escape", hl.dsp.submap("reset"))
        hl.bind("escape", hl.dsp.submap("main_submap"))

        -- nested_two
        hl.bind("2", hl.dsp.submap("nested_two"))
        hl.define_submap("nested_two", function()

                -- ...

            hl.bind("SHIFT + escape", hl.dsp.submap("reset"))
            hl.bind("escape", hl.dsp.submap("main_submap"))
        
        -- /nested_two
        end)
    -- /nested_one
    end)
    
    hl.bind("escape", hl.dsp.submap("reset"))
-- /main_submap
end)
```

### Fermer automatiquement une submap lors d'un dispatch

Les submaps peuvent être automatiquement fermées ou envoyées vers une autre submap en ajoutant ``,`` suivi d'une submap ou de *reset*.

```lua
hl.bind("SUPER + a", hl.dsp.submap("submapA"))

-- Sets the submap to submapB after pressing a.
hl.define_submap("submapA", "submapB", function()
    hl.bind("a", hl.dsp.exec_cmd("someCoolThing.sh"))
end)

-- Reset submap to default after pressing a.
hl.dsp.submap("submapB", "reset", function()
    hl.bind("a", hl.dsp.exec_cmd("someOtherCoolThing.sh"))
end)
```

### Catch-All (Fourre-tout)

Vous pouvez aussi définir un raccourci clavier via le mot-clé spécial `catchall`, qui
s'active quelle que soit la touche pressée.  
Cela peut être utilisé pour empêcher toute touche de passer à votre application active
pendant une submap, ou pour en sortir immédiatement lorsqu'une touche inconnue est pressée :

```lua
hl.bind("catchall", hl.dsp.submap("reset"))
```


## Dispositions de clavier commutables

La façon la plus simple d'y parvenir est de le configurer via les paramètres XKB, par
exemple :

```lua
hl.config({
    input =  {
	kb_layout = "us,cz",
	kb_variant = ",qwerty",
	kb_options = "grp:alt_shift_toggle"
    }
})
```

Les variantes sont définies par disposition.

> [!WARNING]
> La première disposition définie dans la section input sera celle utilisée pour les raccourcis par
> défaut.
> 
> Par exemple : `us,ua` -> les raccourcis de configuration seraient par ex. `"SUPER + A"`, tandis que sur `ua,us`
> -> `"SUPER + Cyrillic_ef`
> 
> Vous pouvez changer ce comportement globalement ou par appareil en définissant
> `resolve_binds_by_sym = 1`. Dans ce cas, les raccourcis s'activeront quand le symbole
> saisi correspond au symbole spécifié dans le raccourci.
> 
> Par exemple : si vos dispositions sont `us,fr` et que vous avez un raccourci pour `"SUPER + A"`, vous devrez
> appuyer sur la première lettre de la deuxième rangée lorsque la disposition `us` est active
> et sur la première lettre de la première rangée lorsque la disposition `fr` est active.

Vous pouvez aussi lier une touche pour exécuter `hyprctl switchxkblayout` pour plus de liberté
de raccourcis. Voir [Utiliser hyprctl](../../Advanced-and-Cool/Using-hyprctl).

Pour trouver les dispositions valides et les `kb_options`, vous pouvez consulter le
fichier `/usr/share/X11/xkb/rules/base.lst`. Par exemple :

Pour obtenir le nom de la disposition d'une langue :

```sh
grep -i 'persian' /usr/share/X11/xkb/rules/base.lst
```

Pour obtenir la liste des raccourcis clavier que vous pouvez mettre dans `kb_options` pour basculer entre
les dispositions de clavier :

```sh
grep 'grp:.*toggle' /usr/share/X11/xkb/rules/base.lst
```


## Divers

### Raccourcis d'espace de travail sur des dispositions non-QWERTY

Les touches utilisées pour les raccourcis clavier doivent être accessibles sans aucun modificateur dans votre disposition.  
Par exemple, la disposition [AZERTY français](https://en.wikipedia.org/wiki/AZERTY) utilise <key>SHIFT</key> + *`touche non modifiée`* pour écrire les nombres `0-9`. Ainsi, les raccourcis d'espace de travail pour cette disposition doivent utiliser les noms des *`touches non modifiées`*, et ne fonctionneront pas en utilisant les nombres `0-9`.

> [!NOTE]
> Pour obtenir le nom correct d'une `unmodified_key`, référez-vous à [la section sur les symboles rares](#uncommon-syms--binding-with-a-keycode)

```lua
-- On a French layout, instead of:
-- hl.bind(mainMod .. " + 1", hl.workspace(1))

-- Use
hl.bind(mainMod .. " + ampersand", hl.workspace(1))
```

Pour de l'aide sur la configuration de la disposition AZERTY française, consultez cet [article](https://rherault.dev/articles/hyprland-fr-layout).

### Délier (Unbind)

Vous pouvez aussi délier une touche avec la méthode `hl.unbind`, par ex. :

```lua
hl.unbind("SUPER + O")
```

Cela peut être utile pour des raccourcis clavier dynamiques avec `hyprctl`, par ex. :

```bash
hyprctl eval 'hl.unbind("SUPER + O")'
```

> [!NOTE]
> Dans `unbind`, la touche est sensible à la casse. Elle doit correspondre exactement à la casse du `bind` que vous déliez.
> 
> ```lua
> hl.bind("SUPER + TAB", hl.focus.workspace("e+1"))
> hl.unbind("SUPER + Tab") -- this will NOT unbind
> hl.unbind("SUPER + TAB") -- this will unbind
> ```

## Exemples de raccourcis

### Média

Ces raccourcis définissent le comportement attendu pour les touches multimédia classiques du clavier,
y compris quand l'écran est verrouillé :

```lua
hl.bind("XF86AudioRaiseVolume", hl.dsp.exec_cmd("wpctl set-volume @DEFAULT_AUDIO_SINK@ 5%+"), { repeating = true })
hl.bind("XF86AudioLowerVolume", hl.dsp.exec_cmd("wpctl set-volume @DEFAULT_AUDIO_SINK@ 5%-"), { repeating = true })
hl.bind("XF86AudioMute",        hl.dsp.exec_cmd("wpctl set-mute @DEFAULT_AUDIO_SINK@ toggle"), { locked = true })

-- Requires playerctl
hl.bind("XF86AudioPlay", hl.dsp.exec_cmd("playerctl play-pause"), { locked = true })
hl.bind("XF86AudioPrev", hl.dsp.exec_cmd("playerctl previous"),   { locked = true })
hl.bind("XF86AudioNext", hl.dsp.exec_cmd("playerctl next"),       { locked = true })
```

### Désactiver les raccourcis avec un raccourci maître

Si vous voulez désactiver tous les raccourcis clavier avec un autre raccourci (faire une sorte de raccourci
bascule), vous pouvez simplement utiliser une submap avec un seul raccourci pour en sortir.

```lua
hl.bind(KEYS, hl.dsp.submap("clean"))
hl.define_submap("clean", function()
    hl.bind(KEYS, hl.dsp.submap("reset"))
end)
```

### Remapper la touche Verr. Maj.

Vous pouvez personnaliser le comportement de la touche Verr. Maj. (Caps Lock) en utilisant `kb_options`.

Pour voir toutes les options disponibles liées à Caps Lock, exécutez :

```sh
grep 'caps' /usr/share/X11/xkb/rules/base.lst
```

Par exemple, pour remapper Verr. Maj. en Ctrl :

```lua
hl.config({
    input = {
        kb_options = "ctrl:nocaps"
    }
})
```

Pour échanger Verr. Maj. et Échap. :

```lua
hl.config({
    input =  {
        kb_options = "caps:swapescape"
    }
})
```

Vous pouvez aussi trouver d'autres `kb_options` non liées à Caps Lock dans `/usr/share/X11/xkb/rules/base.lst`.
