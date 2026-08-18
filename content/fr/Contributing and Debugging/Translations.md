---
title: Traductions
---

Certaines parties de l'écosystème Hyprland sont localisées. De plus en plus disposent de frameworks
de localisation. Ceci est une courte page montrant comment contribuer des traductions aux applications Hyprland.

## Trouver le fichier de traduction

Vous trouverez ici une liste de fichiers de traduction pour les hyprapps prêtes à être traduites :

- [hyprland](https://github.com/hyprwm/Hyprland/blob/main/src/i18n/Engine.cpp)
- [hyprlauncher](https://github.com/hyprwm/hyprlauncher/blob/main/src/i18n/Engine.cpp)
- [hyprpwcenter](https://github.com/hyprwm/hyprpwcenter/blob/main/src/i18n/Engine.cpp)

_d'autres arrivent, cette liste sera mise à jour_

## Traduire

Les traductions sont en C++, mais elles sont simples, et ne nécessitent pas beaucoup d'expertise.
Vous soumettez une traduction via une MR traditionnelle sur Github.

### Traductions basiques (inconditionnelles)

Vous enregistrez une traduction pour une clé et votre code de langue. Par exemple, pour la clé `TXT_KEY_HELLO`, et la langue
`pl_PL` (polonais), vous pouvez faire :
```cpp
registerEntry("pl_PL", TXT_KEY_HELLO, "Siemka!");
```

Certaines traductions ont des variables, incluses comme ceci :
```cpp
registerEntry("pl_PL", TXT_KEY_HELLO, "Siemka, {name}!");
```

### Traductions conditionnelles

Dans certaines langues, vous pourriez vouloir changer votre traduction selon, par ex., la quantité. (pomme vs pommes). Dans ce
cas, c'est un peu plus compliqué, mais cela ressemble à ceci :

```cpp
registerEntry("pl_PL", TXT_KEY_HELLO, [](const Hyprutils::I18n::translationVarMap& vars) {
    int peopleAmount = std::stoi(vars.at("count"));
    if (peopleAmount == 1)
        return "Mam {count} dziewczynkę anime.";
    int last = peopleAmount % 10;
    int lastTwo = peopleAmount % 100;
    if (last >= 2 && last <= 4 && !(lastTwo >= 12 && lastTwo <= 14))
        return "Mam {count} dziewczynki anime.";
    return "Mam {count} dziewczynek anime.";
});
```

Comme vous pouvez le voir, vous pouvez changer la chaîne retournée selon une variable. Notez que toutes les variables
sont des chaînes, vous devez donc appeler une fonction standard comme `std::stoi` pour obtenir un entier.

### Replis (Fallbacks)

En général, si vous traduisez vers une langue avec des variantes régionales, si les traductions sont identiques,
vous n'avez pas besoin de deux entrées.

L'ordre des replis est le suivant :

`xy_ZT` -> `xy_XY` -> `xy_ANYTHING` -> `repli global`, généralement `en_US`.

Ainsi, si vous écrivez quelque chose pour `de_DE`, et que l'utilisateur a `de_AT`, si `de_AT` est manquant,
`de_DE` sera utilisé.
