---
weight: 50
title: Étendre les fonctionnalités
---

> [!NOTE]
> Vous cherchez l'ancienne syntaxe hyprlang ? Consultez les [pages du wiki 0.54](https://wiki.hypr.land/0.54.0/).
> Depuis Hyprland 0.55, hyprlang est devenu obsolète au profit de lua.

## Utilitaires Lua

Hyprland expose tout un ensemble d'utilitaires lua vous permettant de scripter votre bureau
avec des fonctionnalités personnalisées et plus encore.

### Événements

Avec `hl.on`, vous pouvez définir des callbacks sur des événements. Vous pouvez en enregistrer autant que vous le souhaitez.

```lua
hl.on("window.active", function(w)
  hl.notification.create({ text = "Window focused: " .. w.title, timeout = 5000, icon = "ok" })
end)
```

ou, si vous travaillez avec des événements ayant plusieurs paramètres

```lua
hl.on("workspace.move_to_monitor", function(ws, m)
  hl.notification.create({
    text = "Workspace: " .. ws.name .. " moved to a monitor at x: " .. m.position.x,
    timeout = 4000,
    icon = "ok"
  })
end)
```

Liste des événements :

| Événement | Description | Paramètres |
| --- | --- | --- |
| hyprland.start | Émis une fois au démarrage | Aucun |
| hyprland.shutdown | Émis une fois avant que Hyprland ne se ferme | Aucun |
| window.open | Émis quand une fenêtre est complètement initialisée avec les règles de fenêtre appliquées. | Window |
| window.open_early | Émis quand une fenêtre est créée et mappée, mais **avant** que les règles de fenêtre soient appliquées. | Window |
| window.close | Émis quand une fenêtre est fermée. Elle peut être encore visible pendant son animation de fermeture. | Window |
| window.destroy | Émis quand une fenêtre est retirée du compositeur. Pour les fenêtres avec une animation de fermeture, se déclenche après la fin de l'animation. | Window |
| window.kill | Émis quand une fenêtre est tuée de force via hyprctl kill. | Window |
| window.active | Émis quand la fenêtre active change. | Window, int (raison du focus) |
| window.urgent | Émis quand une fenêtre demande un état `urgent`. | Window |
| window.title | Émis quand le titre d'une fenêtre change. | Window |
| window.class | Émis quand la classe d'une fenêtre change. | Window |
| window.pin | Émis quand une fenêtre est épinglée ou désépinglée. | Window |
| window.fullscreen | Émis quand le statut plein écran d'une fenêtre change. | Window |
| window.update_rules | Émis quand les règles d'une fenêtre sont réévaluées, par ex. quand son titre ou sa classe change. | Window |
| window.move_to_workspace | Émis quand une fenêtre est déplacée vers un espace de travail différent. | Window, Workspace |
| window.bell | Émis quand une fenêtre fait sonner la cloche système, même si elle est coupée. | Window |
| layer.opened | Émis quand une surface de calque est ouverte. | LayerSurface |
| layer.closed | Émis quand une surface de calque est fermée. | LayerSurface |
| monitor.added | Émis quand un moniteur est connecté et prêt. | Monitor |
| monitor.removed | Émis quand un moniteur est déconnecté et retiré. | Monitor |
| monitor.focused | Émis quand le moniteur actif change. | Monitor |
| monitor.layout_changed | Émis quand l'agencement des moniteurs change. Cela se produit lorsqu'un moniteur est ajouté ou retiré, que la résolution ou le taux de rafraîchissement d'un moniteur change, ou que la configuration est rechargée avec des règles différentes. | Aucun |
| workspace.active | Émis quand l'espace de travail actif sur un moniteur change. | Workspace |
| workspace.special_active | Émis quand l'espace de travail spécial ouvert sur un moniteur change. Un Workspace de nil signifie qu'aucun espace de travail spécial n'est ouvert. | Workspace, Monitor |
| workspace.created | Émis quand un espace de travail est créé. | Workspace |
| workspace.removed | Émis quand un espace de travail est retiré. | Workspace |
| workspace.move_to_monitor | Émis quand un espace de travail est déplacé vers un moniteur différent. | Workspace, Monitor |
| config.reloaded | Émis quand la configuration a été rechargée **et appliquée**. | Aucun |
| config.props_refreshed | Émis quand un événement de rafraîchissement de props est exécuté. | Bool : L'événement de rafraîchissement de props est-il exécuté comme prévu (`false` s'il est exécuté prématurément avec la fonction d'aide) |
| keybinds.submap | Émis quand la submap active change. Une chaîne vide signifie que la submap par défaut a été restaurée. | String : Nom de la Submap|
| screenshare.state | Émis quand une session de partage d'écran démarre ou s'arrête. | Bool : Actif, Integer : Type, String : Nom |
| input.keyboard.key | Émis quand une touche est pressée ou relâchée. | Integer : Keycode XKB, Integer : Horodatage Unix auquel l'événement s'est produit, Integer : Peut être relâchée (0), pressée (1), ou répétée (2) |

### Fonctions pratiques

Hyprland expose tout un ensemble de fonctions pratiques :
 - `hl.get_config()`
 - `hl.get_active_window()`
 - `hl.get_windows()`
 - `hl.get_window(selector)`
 - `hl.get_urgent_window()`
 - `hl.get_workspaces()`
 - `hl.get_workspace(selector)`
 - `hl.get_active_workspace()`
 - `hl.get_active_special_workspace()`
 - `hl.get_monitors()`
 - `hl.get_monitor(selector)`
 - `hl.get_active_monitor()`
 - `hl.get_monitor_at({ x = num, y = num })`
 - `hl.get_monitor_at_cursor()`
 - `hl.get_cursor_pos()`
 - `hl.get_last_window()`
 - `hl.get_last_workspace()`
 - `hl.get_layers()`
 - `hl.get_workspace_windows(workspace_selector)`
 - `hl.get_current_submap()`
 - `hl.version()`
 - `hl.exec_cmd()`
 - `hl.exec_scheduled_prop_refresh_immediately()`
 - `hl.get_loaded_plugins()`
 - `hl.is_key_down(key = num|str)`


Utilisez le LSP pour les valeurs de retour (classes et leurs paramètres) de ces fonctions. Voir [ici](../../Start/#autocompletions) pour configurer le LSP pour votre éditeur de code


### Changer dynamiquement une option de configuration :

Vous pouvez utiliser `hl.get_config()` pour obtenir la valeur actuelle d'une option de configuration. Passez une option de configuration comme `"general.layout"`.

Faites attention : le type de retour de `hl.get_config()` sera une représentation du type sous-jacent réel.

Par exemple : si votre `general.gaps_in` est défini comme `gaps_in = 3` dans `hl.config()`, `hl.get_config()` retourne une table de la forme :
```lua
{
  top = 3,
  left = 3,
  right = 3,
  bottom = 3
}
```
car `gaps_in` accepte aussi une table de la forme `{ top?, left?, right?, bottom? }`


Vous pouvez changer la valeur d'une option de configuration avec un raccourci clavier via un script comme :
```lua
-- Toggle gaps_in between 0 and 3 (equivalent to  {3, 3, 3, 3} )
hl.bind(mainMod .. " + SHIFT + G", function()

    local gapsInValueTable = hl.get_config("general.gaps_in")

    if gapsInValueTable.top == 3 then
        hl.config({
            general = {gaps_in = 0}
        })
    else
        hl.config({
            general = {gaps_in = 3}
        })
    end
end)
```

### Rafraîchissement des props

Un rafraîchissement de props est un événement où Hyprland met à jour/rafraîchit un grand nombre de ses options configurables (par ex. dispositions de clavier, configurations de périphérique, états de moniteur, espacements de fenêtre, etc...).

Des événements tels que la création d'une règle d'espace de travail font qu'un événement de rafraîchissement de props est planifié après l'événement actuel.

Hyprland planifie un **seul** événement de rafraîchissement de props à exécuter à la fin de l'événement actuel (par ex. une fonction Lua) afin d'éviter des rafraîchissements de props redondants.


<br>

En pratique, cela signifie que lorsque vous créez une nouvelle règle d'espace de travail qui retire `gaps_in` de l'espace de travail actuel, la valeur de `gaps_in` n'est changée qu'à la fin de votre fonction Lua, et les lignes de code suivantes dans votre fonction Lua après la définition de la règle d'espace de travail n'utilisent pas la valeur mise à jour ; ce n'est qu'après la fin de votre fonction Lua que la valeur `gaps_in` de votre espace de travail actuel est mise à jour pour refléter la nouvelle règle d'espace de travail.

Cela peut poser problème si vous vous attendez à ce que la valeur `gaps_in` de votre espace de travail soit immédiatement mise à jour après la création de la règle d'espace de travail.

<br>

Pour exécuter immédiatement un rafraîchissement de props planifié, utilisez `hl.exec_scheduled_prop_refresh_immediately()`.

Notez qu'étant donné que l'événement planifié est exécuté prématurément, il est retiré de la boucle d'événements ; permettant à un autre rafraîchissement de props d'être mis en file d'attente. Un usage excessif de cette fonction peut causer des ralentissements.

### Minuteurs (Timers)

Vous pouvez créer et gérer des minuteurs via `hl.timer()` :

```lua
local demoTimer = hl.timer(function()
  print("hello from timer")
end, { timeout = 1000, type = "repeat" })

demoTimer:set_enabled(false)

hl.bind("SUPER + X", function()
  -- toggle the timer
  demoTimer:set_enabled(not demoTimer:is_enabled())
end)
```

### Tout combiner

Vous pouvez étendre les fonctionnalités par ex. comme ceci :

```lua
-- bind to toggle floating, unless the window is htop,
-- then only set floating

hl.bind("SUPER + X", function()
  local w = hl.get_active_window()
  if w ~= nil and w.title == "htop" do
    hl.dispatch(hl.dsp.window.float({ action = "set" }))
  else
    hl.dispatch(hl.dsp.window.float({ action = "toggle" }))
  end
end)
```

## Sockets (IPC)

Il est recommandé d'utiliser Lua. Lua sera plus rapide, moins bogué, aura plus d'API,
et est plus intégré.

Cependant, si vous voulez utiliser l'IPC à la place, consultez la page [IPC](../../../IPC).
