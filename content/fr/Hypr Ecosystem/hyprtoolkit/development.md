---
weight: 50
title: Développement
---

Hyprtoolkit est une boîte à outils C++ pur. Elle repose sur du C++ moderne dans le style Hyprland (avec
hyprutils, etc).

Il est recommandé d'être familier avec le C++ avant de développer une application.

## Bien démarrer

_Si vous préférez apprendre par des exemples, consultez le répertoire `tests/` dans le dépôt hyprtoolkit._

Commencez par créer un backend et ouvrir une fenêtre :
```cpp
// in this example we are doing this to skip Hyprtoolkit::
using namespace Hyprtoolkit;

auto backend = CBackend::create();
auto window = CWindowBuilder::begin()->appTitle("Hello")->appClass("hyprtoolkit")->commence();
```

cela créera (mais n'ouvrira pas encore) un handle de fenêtre pour vous.

Hyprtoolkit est une boîte à outils en mode retenu (retained mode), vous pouvez donc définir votre disposition en C++ et l'oublier ensuite.

La première chose dont nous avons besoin est un rectangle d'arrière-plan, en faisant ceci :
```cpp
window->m_rootElement->addChild(CRectangleBuilder::begin()->color([] { return backend->getPalette()->m_colors.background; })->commence());
```

> [!NOTE]
> Souvenez-vous d'utiliser toujours la palette quand c'est possible pour que votre application respecte le thème de l'utilisateur.

Tous les éléments se trouvent sous `hyprtoolkit/elements/`, vous pouvez les parcourir. Ajoutons une disposition simple avec
quelques boutons :

```cpp
auto layout = CColumnLayoutBuilder::begin()->size({CDynamicSize::HT_SIZE_PERCENT, CDynamicSize::HT_SIZE_PERCENT, {1.F, 1.F}})->commence();
layout->setMargin(3);

window->m_rootElement->addChild(layout);

layout->addChild(CButtonBuilder::begin()
                       ->label("Do something")
                       ->onMainClick([](SP<CButtonElement> el) { std::println("Did something!"); })
                       ->size({CDynamicSize::HT_SIZE_AUTO, CDynamicSize::HT_SIZE_AUTO, {1, 1}})
                       ->commence()
                );
layout->addChild(CButtonBuilder::begin()
                       ->label("Do something else")
                       ->onMainClick([](SP<CButtonElement> el) { std::println("Did something else!"); })
                       ->size({CDynamicSize::HT_SIZE_AUTO, CDynamicSize::HT_SIZE_AUTO, {1, 1}})
                       ->commence()
                );
```

Cela ajoute une disposition en colonne (les éléments sont empilés les uns sur les autres) avec deux boutons. Ces boutons ont un dimensionnement automatique, ils s'adapteront donc à leur contenu.

Une fois terminé, ajoutez un callback de fermeture, ouvrez la fenêtre et entrez dans la boucle principale :
```cpp
window->m_events.closeRequest.listenStatic([w = WP<IWindow>{window}] {
    w->close();
    backend->destroy();
});

window->open();

backend->enterLoop();
```

## Système de disposition

Le système de disposition repose sur des modes de positionnement absolu et de disposition. Détaillons les deux :

### Mode absolu

Cela se produit quand le parent de votre élément n'est ni un `ColumnLayout` ni un `RowLayout`. Les enfants sont positionnés à l'intérieur de leur parent, selon leur
mode de position. Vous pouvez le définir avec `setPositionMode` et ajouter des décalages avec `setAbsolutePosition`.

Par exemple :
- `setPositionMode` avec `CENTER` centrera l'enfant à l'intérieur du parent.
- `setPositionMode` avec `ABSOLUTE` le placera dans le coin supérieur gauche.
- Ajouter `setAbsolutePosition` à ce qui précède avec `{200, 200}` le déplacera de 200 px de disposition vers le bas et la droite depuis le coin supérieur gauche du parent.

### Mode disposition

Cela se produit quand le parent de votre élément est une disposition (layout). Celles-ci tenteront de positionner vos éléments enfants. Elles fonctionnent de manière similaire au `flex` de CSS et aux `RowLayout` et `ColumnLayout` de qt,
mais ne feront pas de retour à la ligne (wrap). Si les éléments débordent et ne peuvent pas rétrécir, ils disparaîtront.

RowLayout positionne les éléments côte à côte, tandis que ColumnLayout le fait de haut en bas.

### Taille

Tous les éléments portent un `SizeType`. Cela indique au système de disposition comment dimensionner l'élément.
- `ABSOLUTE` prend des px de disposition comme taille et rend l'élément rigide.
- `PERCENT` prend un pourcentage sous la forme `(0, 0) - (1, 1)` et sera la taille du parent multipliée par le pourcentage.
- `AUTO` ignore le vecteur passé (laissez-le vide) et tentera à la place toujours de contenir les enfants\*

> [!NOTE]
> Certains éléments forceront leur propre dimensionnement, par ex. `Text`.  
Laissez-les en `AUTO` pour éviter toute confusion.

## Éléments

La plupart des éléments sont explicites d'eux-mêmes. Vous pouvez explorer leurs fonctions de builder pour voir quelles options de style / comportement ils prennent en charge.

Chaque élément est créé avec un `Builder` qui est là pour maintenir la stabilité de l'ABI. Après avoir appelé `->commence()`, vous
obtiendrez un `SP` vers l'objet nouvellement créé.

Vous pouvez reconstruire l'objet à tout moment en appelant `->rebuild()` et vous obtiendrez à nouveau un builder.
**Souvenez-vous d'appeler `commence()` une fois terminé pour appliquer les changements !**

Vous n'avez pas besoin de conserver le `SP` après avoir ajouté l'élément à l'arbre avec `addChild`.

## Autre

Autres éléments divers

### Icônes système

Utilisez la fonction `CBackend::systemIcons()` pour obtenir une référence à `ISystemIconFactory` qui vous permet
de rechercher des icônes système par nom.  
Vous pouvez vérifier l'objet résultat obtenu pour voir si l'icône a été trouvée.  
Ensuite, vous pouvez prendre cet objet et l'insérer dans un `ImageElement` pour l'ajouter à votre disposition.

### FD supplémentaires

Si vous avez une application qui dépend d'une autre boucle, par ex : pipewire, dbus, etc. vous devez vous souvenir
que hyprtoolkit est strictement mono-thread pour la disposition et le rendu.  
Vous ne pouvez pas modifier la disposition depuis un autre thread.

Pour cela, utilisez `CBackend::addFd()` pour ajouter un FD à la boucle accompagné d'une fonction qui sera appelée une fois que le fd
est lisible.  
Cette fonction sera appelée depuis le thread principal, donc vous pouvez y faire ce que vous voulez.


