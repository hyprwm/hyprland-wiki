---
title: Tests
---

Hyprland et quelques autres projets sous l'ombrelle hypr* ont des _tests_ qui
essaient de détecter les bugs et régressions avant que le code ne soit fusionné.

Compiler en Debug construira par défaut les tests.

## Exécuter les tests

### GTests

Les GTests sont des GoogleTests qui sont des _tests unitaires_. Ces tests vérifient simplement comment
certains éléments se comportent quand ils peuvent s'exécuter seuls.

Dans tous les projets hypr*, les GTests sont exécutés par ctest. Exécutez :

```sh
ctest -j$(nproc) -C Debug --test-dir=build
```

Et assurez-vous que vos tests passent.

### Le hyprtester de Hyprland

Une grande partie du code de hyprland ne peut pas être testée unitairement, nous avons donc notre propre binaire Hyprtester
qui exécute hyprland, émet des commandes et attend des résultats.

#### Exécuter tous les tests

Pour exécuter Hyprtester, lancez ce qui suit dans une compilation debug :

```sh
./build/hyprtester/hyprtester -c hyprtester/test.lua -b ./build/Hyprland -p hyprtester/plugin/hyprtestplugin.so
```
ou invoquez la cible Makefile correspondante :
```sh
make test
```

*Cela prendra un certain temps !* À la fin, un résumé des résultats sera affiché
indiquant combien de tests ont réussi, et combien ont échoué.

L'objectif pour les tests échoués est d'atteindre **0**.

#### Exécuter des tests sélectionnés

Quand vous ne voulez exécuter que des tests spécifiques, listez simplement leurs noms (sans le nom du groupe/fichier)
sur la ligne de commande, par ex. :

```sh
./build/hyprtester/hyprtester dwindleSplit focusMasterPrevious processSpawning -c hyprtester/test.lua -b ./build/Hyprland -p hyprtester/plugin/hyprtestplugin.so
```
ou invoquez la cible Makefile avec la variable supplémentaire `TESTS` définie :
```sh
make TESTS="dwindleSplit focusMasterPrevious processSpawning" test
```

## Soumettre de nouveaux tests

Les nouveaux tests doivent être soit un GTest, si l'élément testé peut être testé unitairement,
soit faire partie de hyprtester.

Pour les deux types de tests, vous pouvez consulter les répertoires de tests dans le projet. Les GTests se trouvent dans `tests/`,
tandis que les tests hyprtester se trouvent dans `hyprtester/`.

### Que tester

Si vous soumettez une nouvelle fonctionnalité, c'est évidemment votre fonctionnalité. Pour un correctif, essayez d'écrire un
cas de test qui échouerait avant votre correctif.

Pour les nouveaux tests, vous pouvez inspecter le rapport de couverture.

D'abord, exécutez _à la fois_ ctest et hyprtester. Puis, exécutez (depuis la racine du dépôt) :

```sh
gcovr -r . build --html --html-details -o build/coverage.html --gcov-ignore-parse-errors="negative_hits.warn" && xdg-open ./build/coverage.html
```

cela prendra un certain temps, puis ouvrira un rapport dans votre navigateur. Vous pouvez voir quels fichiers ont été testés dans
quelle mesure, et cliquer sur les fichiers pour voir une répartition ligne par ligne.

S'il y a des chemins non testés, nous serions très heureux de recevoir des tests pour ceux-ci.
