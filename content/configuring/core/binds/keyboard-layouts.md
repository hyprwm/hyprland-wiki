---
weight: 20
title: Keyboard layouts
---

## Switchable keyboard layouts

> [!WARNING]
> The first layout defined in the input section will be the one used for binds by default.
>
> For example: with `us,ua`, config binds would be e.g. `"SUPER + A"`, while on `ua,us` you'd have `"SUPER + Cyrillic_ef"`.
>
> You can change this behavior globally or per-device by setting `resolve_binds_by_sym = 1`.
> In that case, binds will activate when the symbol typed matches the symbol specified in the bind.
>
> For example: if your layouts are `us,fr` and you have a bind for `"SUPER + A"`, you'd need to press the first letter on the second row while the `us` layout is active, and the first letter on the first row while the `fr` layout is active.

### XKB

One of the methods to change the layout is to set XKB options, for example:

```lua
hl.config({
    input =  {
        kb_layout = "us,cz",
        kb_variant = ",qwerty",
        kb_options = "grp:alt_shift_toggle"
    }
})
```

Variants are set per layout, so the number and order of variants must match those of the layouts you want them to apply to.

### Hyprctl

You can also bind a key to execute `hyprctl switchxkblayout` for more keybind freedom.
See [Using hyprctl](../../advanced-configuration/using-hyprctl).

To find the valid layouts and `kb_options`, you can check out the `/usr/share/X11/xkb/rules/base.lst`.

For example, to get the layout name of a language:

```sh
grep -i 'persian' /usr/share/X11/xkb/rules/base.lst
```

To get the list of keyboard shortcuts you can put in the `kb_options` to toggle keyboard layouts:

```sh
grep 'grp:.*toggle' /usr/share/X11/xkb/rules/base.lst
```

## Misc

### Workspace bindings on non-QWERTY layouts

Keys used for keybinds need to be accessible without any modifiers in your layout.

For instance, the [French AZERTY](https://en.wikipedia.org/wiki/AZERTY) layout uses SHIFT + _`unmodified key`_ to write `0-9` numbers. As such, the workspace keybinds for this layout need to use the names of the _`unmodified keys`_ , and will not work when using the `0-9` numbers.

> [!NOTE]
> To get the correct name for an `unmodified_key`, refer to [the section on uncommon syms](..#uncommon-syms--binding-with-a-keycode).

```lua
-- On a French layout, instead of:
-- hl.bind(mainMod .. " + 1", hl.workspace(1))
-- Use:
hl.bind(mainMod .. " + ampersand", hl.workspace(1))
```

For help configuring the French AZERTY layout, see this [article](https://rherault.dev/articles/hyprland-fr-layout).
