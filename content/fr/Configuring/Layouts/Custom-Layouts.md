---
weight: 40
title: Dispositions personnalisées
---

> [!NOTE]
> Vous cherchez l'ancienne syntaxe hyprlang ? Consultez les [pages du wiki 0.54](https://wiki.hypr.land/0.54.0/).
> Depuis Hyprland 0.55, hyprlang est devenu obsolète au profit de lua.

Vous pouvez créer des dispositions personnalisées directement dans la configuration lua. Pour cela,
définissez votre disposition avec `hl.layout.register(name, { recalculate, layout_msg? })` puis utilisez-la comme `lua:name`.

Un exemple simple de disposition :

```lua
hl.layout.register("columns", {
    recalculate = function(ctx)
        local n = #ctx.targets
        if n == 0 then
            return
        end

        for i, target in ipairs(ctx.targets) do
            target:place(ctx:column(i, n))
        end
    end,
})
```

Qui peut être utilisée comme `lua:columns`.

Il existe quelques exemples de dispositions dans le dépôt hyprland [ici](https://github.com/hyprwm/Hyprland/tree/main/example/layouts).

`ctx` propose quelques fonctions pratiques, comme `grid_cell`, `column`, `row` et `split`.
Il fournit aussi `area` et `targets`, respectivement pour la zone de travail et la liste des cibles.

Vous pouvez obtenir la fenêtre d'une cible en accédant à son champ `.window`, mais notez bien
qu'elle n'est pas toujours présente, et que certaines cibles de disposition peuvent en
avoir plusieurs, et n'exposer que la « principale ». (par ex. un groupe)

> [!NOTE]
> Préférez :place à :set_box sauf si nécessaire. :place calculera les espacements,
> le pseudo-tuilage, l'espace réservé, et plus encore, pour vous. set_box ne doit être utilisé que si
> un positionnement entièrement manuel est absolument nécessaire.
