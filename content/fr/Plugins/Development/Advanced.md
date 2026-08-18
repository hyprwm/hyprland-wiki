---
weight: 4
title: Avancé
---

Cette page documente quelques éléments avancés à propos de l'API de plugin Hyprland.

## Accéder aux membres privés

Si vous avez besoin d'accéder à un membre privé d'une classe Hyprland, vous pouvez entourer les inclusions d'une macro qui changera la visibilité en public. Notez que certains fichiers Hyprland incluent la STL, ce qui peut finir par casser si vous tentez cela. Si vous rencontrez ce problème, assurez-vous d'inclure l'import STL fautif avant la section où vous incluez le fichier Hyprland.

```cpp
#define private public
#include <hyprland/src/plugins/PluginAPI.hpp>
#include <hyprland/src/render/OpenGL.hpp>
#include <hyprland/src/desktop/Window.hpp>
#include <hyprland/src/layout/IHyprLayout.hpp>
#undef private
```

## Utiliser les Hooks de fonction

> [!WARNING]
> Les hooks de fonction ne sont disponibles que sur `AMD64` (`x86_64`). Tenter un hook sur
> toute autre architecture fera que Hyprland ignorera simplement votre tentative de hook.

Les hooks de fonction sont intimidants au premier abord, mais lorsqu'ils sont utilisés correctement peuvent être
_extrêmement_ puissants.

Les hooks de fonction vous permettent d'intercepter tout appel à la fonction sur laquelle vous faites un hook.

Regardons un exemple simple :

```cpp
void Events::listener_monitorFrame(void* owner, void* data)
```

Ce sera la fonction sur laquelle nous voulons faire un hook. `Events::` est un namespace, pas une classe, donc
c'est simplement une fonction ordinaire.

```cpp
// make a global instance of a hook class for this hook
inline CFunctionHook* g_pMonitorFrameHook = nullptr;
// create a pointer typedef for the function we are hooking.
typedef void (*origMonitorFrame)(void*, void*);

// our hook
void hkMonitorFrame(void* owner, void* data) {
    (*(origMonitorFrame)g_pMonitorFrameHook->m_pOriginal)(owner, data);
}

APICALL EXPORT PLUGIN_DESCRIPTION_INFO PLUGIN_INIT(HANDLE handle) {
    // stuff...

    // create the hook
    static const auto METHODS = HyprlandAPI::findFunctionsByName(PHANDLE, "listener_monitorFrame");
    g_pMonitorFrameHook = HyprlandAPI::createFunctionHook(handle, METHODS[0].address, (void*)&hkMonitorFrame);

    // init the hook
    g_pMonitorFrameHook->hook();

    // further stuff...
}
```

Nous venons de créer un hook. Maintenant, chaque fois que Hyprland appelle
`Events::listener_monitorFrame`, notre hook sera appelé à la place !

De cette façon, vous pouvez exécuter du code avant / après la fonction, modifier les entrées ou les
résultats, ou même empêcher la fonction de s'exécuter.

`CFunctionHook` peut aussi être dé-hooké quand vous le souhaitez. Exécutez simplement `unhook()`.
Il peut être re-hooké plus tard en appelant à nouveau `hook()`.

### Fonctions membres

Pour les membres, par ex. `CCompositor::focusWindow(CWindow*, wlr_surface*)` vous devrez
aussi ajouter l'argument thisptr à votre hook :

```cpp
typedef void (*origFocusWindow)(void*, CWindow*, wlr_surface*);

void hkFocusWindow(void* thisptr, CWindow* pWindow, wlr_surface* pSurface) {
    // stuff...

    // and if you want to call the original...
    (*(origFocusWindow)g_pFocusWindowHook->m_pOriginal)(thisptr, pWindow, pSurface);
}

APICALL EXPORT PLUGIN_DESCRIPTION_INFO PLUGIN_INIT(HANDLE handle) {
    // stuff...

    static const auto METHODS = HyprlandAPI::findFunctionsByName(PHANDLE, "focusWindow");
    g_pFocusWindowHook = HyprlandAPI::createFunctionHook(handle, METHODS[0].address, (void*)&hkFocusWindow);
    g_pFocusWindowHook->hook();

    // further stuff...
}
```

> [!WARNING]
> Merci de noter que les recherches de méthodes sont lentes et ne devraient pas être utilisées souvent. Les entrées
> _ne changeront pas_ pendant l'exécution, donc c'est une bonne idée de rendre les recherches
> `static`.

### Pourquoi utiliser findFunctionsByName ?

Pourquoi utiliser cela plutôt que par ex. `&CCompositor::focusWindow` ? Deux raisons :

1. Moins de casse. Chaque fois que quelqu'un met à jour Hyprland, cette adresse pourrait devenir
invalide. findFunctionsByName est plus résilient. Tant que la fonction existe,
elle sera trouvée.

2. Gestion des erreurs. Le tableau de méthodes contient, en plus de l'adresse, les
signatures. Vous pouvez les vérifier pour être sûr à 100% d'avoir obtenu la bonne fonction,
ou lever une erreur si elle n'a pas été trouvée.

## Utiliser la configuration

Vous pouvez enregistrer des valeurs de configuration dans la fonction `PLUGIN_INIT` :

```cpp
APICALL EXPORT PLUGIN_DESCRIPTION_INFO PLUGIN_INIT(HANDLE handle) {
    // stuff...
    
    HyprlandAPI::addConfigValue(PHANDLE, "plugin:example:exampleInt", SConfigValue{.intValue = 1});

    // further stuff...
}
```

Les variables de plugin _**doivent**_ être dans la catégorie `plugins:`. Les catégories
suivantes vous appartiennent. C'est généralement une bonne idée de regrouper toutes les variables de
votre plugin dans une sous-catégorie portant le nom du plugin, par ex. `plugins:myPlugin:variable1`.

Pour récupérer les valeurs, appelez `HyprlandAPI::getConfigValue`.

Merci de vous souvenir que le pointeur vers votre valeur de configuration ne changera jamais après
`PLUGIN_INIT`, donc pour grandement optimiser les performances, rendez-le static :

```cpp
static auto* const MYVAR = &HyprlandAPI::getConfigValue(PHANDLE, "plugin:myPlugin:variable1")->intValue;
```

## Pour aller plus loin

Lisez l'API dans `src/plugins/PluginAPI.hpp`, jetez un œil aux
[plugins officiels](https://github.com/hyprwm/hyprland-plugins).

Et, plus important encore, amusez-vous bien !
