---
title: Directives pour les PR
---

## Exigences pour les PR

- Code propre, non bricolé
- Changements décrits et _pourquoi_ ils étaient nécessaires
- Respect du style (voir ci-dessous)

## Politique IA

Vous utilisez un outil d'IA ? Merci de consulter notre [politique IA](https://github.com/hyprwm/.github/blob/main/policies/AI_USAGE.md).

## Style de code

Merci de lire ceci si vous soumettez une PR, afin de minimiser le nombre de remarques de style reçues, et de faire gagner
du temps aux mainteneurs.

### Avant de soumettre

Assurez-vous d'avoir exécuté clang-format : `clang-format -i $(find src -type f \( -name "*.cpp" -o -name "*.hpp" \))`

Vérifiez que vos changements ne violent pas `clang-tidy`. C'est généralement intégré à votre IDE.

### Clang-format

Ceci n'est pas négociable. Votre code **doit** être formaté.

### Clang-tidy

Les violations de clang-tidy ne sont pas des exigences strictes, mais merci d'essayer de les minimiser, et de
_seulement_ les ignorer si c'est absolument nécessaire.

Je l'ai ajusté de sorte que dans 99% des cas vous devriez absolument le corriger.

### Tests

Merci de consulter la page [Tests](../Tests) pour des informations sur les tests dans Hyprland, et les projets
associés.

Aucune régression de test n'est _tolérée_, tandis que de nouveaux tests sont _requis_ si possible à tester (par ex.
les éléments graphiques ne sont pas testables).

### Autre

Certaines choses que clang-tidy / clang-format ne détecteront pas :
- Pas de _primitives_ non initialisées (int, float, double, size_t, etc.)
- Pas d'accolades courtes pour les if. Si le corps de votre if/else contient 1 _ligne_ (pas 1 instruction) ne mettez pas de `{}` autour.
- La règle ci-dessus ne s'applique pas aux boucles / etc.
- Envisagez d'ajouter un `;` à l'intérieur des corps de fonction vides
- Chaque fois que vous initialisez des vecteurs, tableaux ou maps avec de nombreux éléments, ajoutez une `,` après le dernier élément pour un style plus propre
- Envisagez de faire des déclarations anticipées (forward-declaring) dans les headers si possible plutôt que d'inclure. Cela accélère les temps de compilation.
- pas de `using namespace std;`, et `using namespace (autre chose)` n'est autorisé que dans les fichiers source, pas dans les headers.
- préférez les guards plutôt que l'imbrication. `if(!valid) return;` est bien meilleur que `if (valid) { /* un milliard de choses */ }`

### Conventions de nommage
Bien que nous ayons utilisé la notation hongroise par le passé, nous nous en éloignons.
Le code actuel, et le nouveau code, devraient utiliser `camelCase` avec un préfixe `m_` si la variable est un membre d'une classe (pas une struct).

De plus :
 - les classes ont un préfixe `C` : `CMyClass`
 - les structs ont un préfixe `S` : `SMyStruct`
 - les interfaces ont un préfixe `I` : `IMyInterface`
 - les pointeurs globaux pour les singletons ont un préfixe `g_` : `g_someManager`
 - les variables constantes sont en MAJUSCULES : `const auto MYVARIABLE = ...`

## Exigences générales de code

### Pas de pointeurs bruts
C'est une règle simple - n'utilisez pas de pointeurs bruts (par ex. `CMyClass*`) sauf si _absolument nécessaire_. Vous avez `UP`, `SP` et `WP` à votre disposition.
Ce sont respectivement des pointeurs unique, partagé et faible (unique, shared et weak).

### Pas de malloc
Sauf absolue nécessité, n'utilisez pas malloc / free. Vous _oublierez_ de libérer la mémoire.

### Évitez les nettoyages douteux
Si une fonction est un allocateur de style C, par ex. `some_c_call_make_new()`, elle nécessitera probablement un `some_c_call_free()`. Dans ces cas, soit :
 - encapsulez la chose dans une classe C++, soit
 - si utilisée uniquement dans une fonction, utilisez un `CScopeGuard` pour toujours la libérer à la sortie de la fonction.

### Utilisez la STL
En général, utilisez la STL plutôt que d'essayer de réinventer la roue.

### Utilisez hyprutils
Hyprutils fournit de nombreux utilitaires bien adaptés spécifiquement à hyprland (et aux autres projets hypr*). Utilisez-les.

### Pas d'inclusions absolues depuis /src
Imaginez ce scénario :
```
src/
   a/
      a.hpp
   b/
      b.hpp
```

Si vous êtes dans `a.hpp` et voulez inclure `b.hpp`, vous _devez_ utiliser `../b/b.hpp`, et _ne pouvez pas_ utiliser `b/b.hpp`. Ce dernier casserait les plugins.

Une exception que vous pourriez remarquer dans le code est que les chemins absolus depuis la racine sont autorisés, par ex. `protocols/some-protocol.hpp`.
