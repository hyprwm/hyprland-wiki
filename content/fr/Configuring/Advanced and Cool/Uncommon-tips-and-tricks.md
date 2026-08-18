---
weight: 15
title: Astuces et trucs peu courants
---

## Remapper la touche Verr. Maj.

Vous pouvez personnaliser le comportement de la touche Verr. Maj. (Caps Lock) en utilisant `kb_options`.

Pour voir toutes les options disponibles liées à Caps Lock, exécutez :

```sh
grep 'caps' /usr/share/X11/xkb/rules/base.lst
```

Par exemple, pour remapper Verr. Maj. en Ctrl :

```lua
hl.config({
    input = {
        kb_options = "ctrl:nocaps",
    },
})
```

Vous pouvez trouver d'autres `kb_options` non liées à Caps Lock dans `/usr/share/X11/xkb/rules/base.lst`.


## Minimiser les fenêtres en utilisant des espaces de travail spéciaux

Cette approche utilise des espaces de travail spéciaux pour imiter la fonction « minimiser la fenêtre », en utilisant un seul raccourci clavier pour basculer l'état minimisé. Notez qu'un raccourci clavier ne peut gérer qu'une seule fenêtre.

```lua
hl.bind("SUPER + X", function ()
    if hl.get_workspace("special:minimized") then
        hl.dispatch(hl.dsp.window.move({ workspace = hl.get_active_workspace(), window = "tag:minimized" }))
        hl.dispatch(hl.dsp.window.clear_tags({ window = "tag:minimized" }))
    else
        hl.dispatch(hl.dsp.window.tag({ tag = "minimized", window = hl.get_active_window() }))
        hl.dispatch(hl.dsp.window.move({ workspace = "special:minimized", follow = false }))
    end
end)
```

## Raccourci pour basculer animations/flou/etc

Pour moins de distractions à l'appui d'une touche, ou pour économiser la batterie sur un portable

Ajoutez ce qui suit à votre configuration hyprland :

```lua
hl.bind("SUPER + F1", function ()
    local game_mode = (hl.get_config("animations.enabled") == false)

    if game_mode then
        hl.exec_cmd("hyprctl reload")
        return
    end
    
    hl.config({
        general = {
            gaps_in = 0, gaps_out = 0, -- Disable gaps  
            border_size = 0,
        },

        animations = {
            enabled = false, -- Disable animations
        },
        
        -- Disable blur, shadow and window rounding
        decoration = {
            shadow = { enabled = false },
            blur = { enabled = false },
            rounding = 0,
        }
    })
end)
```

À adapter selon vos goûts bien sûr. Si les animations sont activées, cela désactive tous les jolis effets. Sinon, le script recharge votre configuration pour récupérer vos valeurs par défaut.

## Dispositions par espace de travail

Vous pouvez utiliser des règles d'espace de travail pour définir des dispositions par espace de travail :

```lua
hl.workspace_rule({ workspace = "2", layout = "scrolling" })
hl.workspace_rule({ workspace = "3", layout = "dwindle" })
```

## Faire défiler la disposition pour l'espace de travail actuel

Pour changer la disposition de l'espace de travail actuel, vous pouvez utiliser ce raccourci :

```lua
hl.bind("SUPER + tab", function ()
    local layouts     = { "scrolling", "dwindle", "master", "monocle" }
    local workspace   = hl.get_active_workspace()
	if hl.get_active_special_workspace() then
		workspace = hl.get_active_special_workspace()
	end

    local next_layout = "dwindle"

    if not workspace then
        return
    end

    for i = 1, #layouts do
        if layouts[i] == workspace.tiled_layout then
            local next_layout_idx = (i % #layouts) + 1
            next_layout = layouts[next_layout_idx]
            break
        end
    end

	if workspace.special then
		hl.workspace_rule({ workspace = tostring(workspace.name), layout = next_layout })
	else
		hl.workspace_rule({ workspace = tostring(workspace.id), layout = next_layout })
	end
end)
```

## Raccourcis par disposition

Utilisez ceci pour lier des actions différentes à la même touche de raccourci selon la disposition actuelle :

```lua
local function layout_bind(bind_table)
    return function ()
        local workspace = hl.get_active_special_workspace() or
                          hl.get_active_workspace()

        if not workspace then
            return
        end

        local layout = workspace.tiled_layout
                
        if bind_table[layout] then
            hl.dispatch(bind_table[layout])
        end
    end
end

hl.bind("SUPER + A", layout_bind({
    scrolling = hl.dsp.layout("swapcol l"),  -- Scrolling: swap column with left one
    dwindle   = hl.dsp.layout("swapsplit"),  -- Dwindle: swap window split 
    monocle   = hl.dsp.layout("cycleprev"),  -- Monocle and master: cycle prev window
    master    = hl.dsp.layout("cycleprev"),
}))

hl.bind("SUPER + D", layout_bind({
    scrolling = hl.dsp.layout("swapcol r"),   -- Scrolling: swap column with right one
    dwindle   = hl.dsp.layout("togglesplit"), -- Dwindle: toggle window split 
    monocle   = hl.dsp.layout("cyclenext"),   -- Monocle and master: cycle next window
    master    = hl.dsp.layout("cyclenext"),
}))
```

## Versionnage de la configuration

Certaines mises à jour ajoutent des changements cassants, qui peuvent être anticipés en regardant la version de hyprland.

Vous pouvez rendre vos configurations conditionnelles en utilisant `hl.version()`, par ex. :

```lua
if hl.version() == "0.55.2" then
    hl.config({
        general = {
            changed_property = "value"
        }
    })
else
    hl.notification.create({ 
        text = "Youre using: ".. hl.version(), 
        timeout = 10000
    })
end
```

## Zoom loupe grossissante

Raccourci pour utiliser le zoom du curseur comme une loupe grossissante

```lua
local MAX_ZOOM = 3
local MIN_ZOOM = 1
local ZOOM_TOGGLE_FACTOR = 1.5

---@param offset number
---@return nil
local function zoom(offset)
    local current = hl.get_config("cursor.zoom_factor")
    if offset ~= nil then
        current = current + offset
    elseif current ~= MIN_ZOOM then
        current = MIN_ZOOM
    else
        current = ZOOM_TOGGLE_FACTOR
    end
    current = math.max(MIN_ZOOM, math.min(MAX_ZOOM, current))
    hl.config({ cursor = { zoom_factor = current } })
end

hl.bind("SUPER + Z", zoom)
hl.bind("SUPER + KP_ADD", function()
    zoom(0.5)
end)
hl.bind("SUPER + minus", function()
    zoom(-0.5)
end)

```

## Raccourcis façon Vim

Hyprland a tellement de fonctionnalités que vous pourriez manquer de touches sur votre clavier si vous voulez toutes les lier. Rassurez-vous, vous pouvez utiliser des submaps pour créer des keymaps si vous en voulez plus, et elles sont aussi plus faciles à presser.

Voici un exemple de gestion des groupes de fenêtres de cette façon :

```lua
hl.bind("SUPER + G", hl.dsp.submap("group_management"), { desc = "Enter a group management submap" })

local map = function(key, action, desc)
	hl.bind(key, function()
		hl.dispatch(action)
		hl.dispatch(hl.dsp.submap("reset"))
	end, { desc = desc })
end

hl.define_submap("group_management", function()
	map("g", hl.dsp.group.toggle(), "Toggle window group")

	map("h", hl.dsp.window.move({ into_group = "l" }), "Move window into a group on the left")
	map("j", hl.dsp.window.move({ into_group = "d" }), "Move window into a group on the bottom")
	map("k", hl.dsp.window.move({ into_group = "u" }), "Move window into a group on the top")
	map("l", hl.dsp.window.move({ into_group = "r" }), "Move window into a group on the right")

	map("e", hl.dsp.window.move({ out_of_group = true }), "Move window out of group")

	map("n", hl.dsp.group.next(), "Next window in group")
	map("p", hl.dsp.group.prev(), "Previous window in group")

	map("f", hl.dsp.group.move_window(), "Move window forward in the group order")
	map("b", hl.dsp.group.move_window({ forward = false }), "Move window backward in the group order")

	map("t", hl.dsp.group.lock_active(), "Toggle group lock")

	for i = 1, 10 do
		map(tostring(i % 10), hl.dsp.group.active({ index = i }), "Focus window " .. i .. " in a group")
	end

	hl.bind("escape", hl.dsp.submap("reset"), { desc = "Quit submap" })
end)
```
