---
weight: 103
title: hyprlang
---

[hyprlang](https://github.com/hyprwm/hyprlang) est une bibliothèque qui implémente l'analyse du langage de configuration hypr.

## Syntaxe

### Style de ligne

Chaque ligne de configuration est une commande suivie d'une valeur.

```ini
COMMAND = VALUE
```

La commande peut être une variable, ou un mot-clé spécial (ceux-ci sont définis par l'application
que vous utilisez).

Les variables sont comme des « options », tandis que les mots-clés sont comme des « commandes ».  
Les options ne peuvent être spécifiées qu'une seule fois (si vous le faites plusieurs fois, la précédente sera écrasée),
tandis que les commandes invoquent un certain comportement à chaque fois qu'elles sont définies.

Les espaces en début et fin de mots ne sont pas nécessaires, et sont
là uniquement pour la lisibilité.

### Catégories

Les catégories peuvent être normales, ou « spéciales ».

Les deux sont spécifiées de la même manière :

```ini
category {
    variable = value
}
```

Les catégories spéciales peuvent avoir d'autres propriétés, comme par exemple contenir une clé :

```ini
special {
    key = A
    variable = value
}
special {
    key = B
    variable = value
}
```

C'est comme définir deux « groupes », un avec la clé A, un autre avec B.  
Hyprland, par exemple, les utilise pour les configurations par périphérique.

### Définir des variables

Les variables peuvent être définies comme ceci :

```ini
$VAR = myData
```

Plus tard, vous pouvez les utiliser comme ceci :

```ini
$SUFFIX = -san
$NAME = Jeremy
greeting = Hello, $NAME$SUFFIX.
```

> [!NOTE]
> Les espaces autour ou séparant les valeurs ne sont pas obligatoires

### Commentaires

Les commentaires commencent avec le caractère `#`.

Si vous voulez y échapper (mettre un vrai `#` et non démarrer un commentaire) vous pouvez utiliser `##`.  
Cela sera transformé en un seul `#` qui _fera_ partie de votre ligne.

### Échapper les erreurs

Si vous utilisez des plugins, vous pourriez vouloir ignorer les erreurs d'options/mots-clés manquants
afin de ne pas obtenir une barre d'erreur avant qu'ils ne soient chargés. Pour ce faire, faites ceci :

```ini
# hyprlang noerror true

bind = MOD, KEY, something, amogus
someoption = blah

# hyprlang noerror false
```

### Options en ligne

Si vous voulez spécifier une option en ligne, sans ouvrir et fermer une catégorie, utilisez le séparateur `:` :

```ini
category:variable = value
```

Si la catégorie est spéciale et nécessite une clé, vous pouvez écrire :

```ini
category[keyvalue]:variable = value
```

C'est la syntaxe utilisée par `hyprctl keyword`, par exemple.

### Opérations arithmétiques

Depuis la 0.6.3, hyprlang prend en charge des opérations arithmétiques _très_ basiques sur les variables en utilisant `{{}}`

Vous pouvez utiliser `+`, `-`, `*`, ou `/`, sur seulement _deux_ variables (ou constantes) à la fois.  
Vous _ne pouvez pas_ les imbriquer, mais vous pouvez utiliser des variables intermédiaires.

Exemple :
```ini
$VAR1 = 2
$VAR2 = {{VAR1 + 3}}
$VAR3 = {{VAR2 * 2}}

someVariable = {{VAR3 / 2}}
someVariable2 = VAR3
```

Cela peut lever des erreurs si c'est fait incorrectement. Assurez-vous que :
- vous n'avez que deux côtés à l'opération (**PAS** `{{a + b + c}}`, cela en a trois)
- les deux côtés existent soit comme des variables numériques, soit sont numériques eux-mêmes
- vous avez des espaces autour de l'opérateur (**PAS** `{{a+b}}`)

### Échappement arithmétique

Depuis la 0.6.4, hyprlang permet d'échapper les expressions arithmétiques, par ex. `{{a + b}}`, en préfixant avec `\`.  
Ils peuvent être utilisés sur n'importe laquelle des positions de départ des accolades d'expression.

Exemple :
```ini
$VAR = \{{10 + 10}}
bind = MOD, KEY, exec, COMMAND "{\{10 + 10}}"
someVariable = \{\{10 + 10}}
```

Cela n'évaluera pas l'expression, et assignera plutôt simplement la valeur brute que vous avez écrite telle quelle.  
Tous les `\` qui ont été utilisés pour échapper seront aussi retirés de la valeur.
Ainsi `\{{hello world}}` se transformera en `{{hello world}}`, sans essayer de l'analyser comme une expression.

### Échapper les échappements

Depuis la 0.6.4, vous pouvez échapper n'importe quel `\` qui aurait été utilisé pour échapper d'autres caractères.

Par exemple, si vous voulez avoir un `\` avant une véritable expression :

```ini
someVariable = \\{{VAR1 + 10}}
```

Si vous voulez avoir un `\` avant l'un des caractères échappables :

```ini
someOtherVariable = \\{ hello \\} 
```

### Conditionnelles

Depuis la 0.6.4, vous pouvez ajouter des conditionnelles à vos configurations.  
Vous pouvez rendre des blocs conditionnels en utilisant la directive `# hyprlang if`.

Quelques exemples :

```ini
# hyprlang if MY_VAR

test = 24

# hyprlang endif

# hyprlang if !MY_VAR

test = 12

# hyprlang endif
```

> [!NOTE] Quelques informations importantes
> - Une variable est `true` si et seulement si elle existe et n'est pas une chaîne vide.
> - Les variables d'environnement sont prises en charge.
> - Les mots-clés dynamiques (avec `hyprctl keyword`) ne redéclencheront **PAS** ces blocs.  
Des changements doivent être faits directement dans les fichiers (ou l'environnement) et dans le cas de ce dernier, ou d'une application hypr* qui ne recharge pas automatiquement sa configuration, un relancement de l'application / `hyprctl reload` (pour hl) sera requis.

## Documentation développeur

Voir la documentation sur [standards.hyprland.org/hyprlang](https://standards.hyprland.org/hyprlang/).
