---
weight: 1
title: Bien démarrer
---

Cette page documente les bases pour créer votre propre plugin Hyprland à partir de zéro.

## Comment fonctionnent les plugins ?

Les plugins sont essentiellement des objets dynamiques chargés par Hyprland. Ils ont (presque)
un accès complet à chaque partie du processus interne de Hyprland, et en tant que tels, peuvent
modifier et changer bien plus de choses qu'un script.

## Prérequis

Pour écrire un plugin Hyprland, vous aurez besoin :

- De connaissances en C++
- De la capacité de lire
- D'une compréhension approximative du fonctionnement interne de Hyprland (vous _pouvez_ apprendre cela
  en parallèle de votre travail de développement)

## Créer votre premier plugin

Ouvrez votre éditeur de code préféré.

Créez un nouveau répertoire, dans cet exemple nous utiliserons `MyPlugin`.

_**→ Si vous avez les headers Hyprland**_

Si vous installez avec `make install`, vous devriez avoir les headers. Dans ce cas,
aucune action supplémentaire n'est requise.

_**→ Si vous n'avez pas cloné les sources de Hyprland**_

Clonez le code source de Hyprland dans un sous-répertoire, dans notre exemple
`MyPlugin/Hyprland`. Exécutez
`cd Hyprland && make debug && sudo make installheaders && cd ..`.

Maintenant que vous avez configuré les sources de Hyprland, vous pouvez soit repartir de zéro
si vous savez comment faire, soit jeter un œil à quelques plugins simples dans le
[dépôt officiel des plugins](https://github.com/hyprwm/hyprland-plugins) comme par
exemple `csgo-vulkan-fix` ou `hyprwinwrap`.

### Les parties basiques du plugin

En commençant par le haut, vous devrez inclure l'API de plugin :

```cpp
#include <hyprland/src/plugins/PluginAPI.hpp>
```

N'hésitez pas à jeter un œil au header. Il contient un tas de commentaires utiles.

Nous créons aussi un pointeur global pour notre handle :

```cpp
inline HANDLE PHANDLE = nullptr;
```

Nous l'initialiserons dans notre fonction d'initialisation de plugin plus tard. Il sert d'
« ID » interne pour notre plugin.

Ensuite, il y a la méthode de version de l'API :

```cpp
// Do NOT change this function.
APICALL EXPORT std::string PLUGIN_API_VERSION() {
    return HYPRLAND_API_VERSION;
}
```

Cette méthode indiquera à Hyprland quelle version d'API a été utilisée pour compiler ce plugin.
Ne la changez PAS. Elle sera définie à la valeur correcte lors de la compilation.

En passant outre quelques gestionnaires d'exemple, nous avons deux fonctions importantes :

```cpp
APICALL EXPORT PLUGIN_DESCRIPTION_INFO PLUGIN_INIT(HANDLE handle) {
    PHANDLE = handle;

    const std::string COMPOSITOR_HASH = __hyprland_api_get_hash();
    const std::string CLIENT_HASH = __hyprland_api_get_client_hash();

    // ALWAYS add this to your plugins. It will prevent random crashes coming from
    // mismatched header versions.
    if (COMPOSITOR_HASH != CLIENT_HASH) {
        HyprlandAPI::addNotification(PHANDLE, "[MyPlugin] Mismatched headers! Can't proceed.",
                                     CHyprColor{1.0, 0.2, 0.2, 1.0}, 5000);
        throw std::runtime_error("[MyPlugin] Version mismatch");
    }

    // ...

    return {"MyPlugin", "An amazing plugin that is going to change the world!", "Me", "1.0"};
}

APICALL EXPORT void PLUGIN_EXIT() {
    // ...
}
```

La première méthode sera appelée quand votre plugin est initialisé (chargé).

Vous pouvez, et devriez probablement, initialiser tout ce que vous voudriez utiliser
là.

Il vaut la peine de noter que l'ajout de variables de configuration n'est _autorisé_ que dans cette
fonction.

La fonction d'initialisation du plugin est _requise_.

La valeur de retour devrait être la struct `PLUGIN_DESCRIPTION_INFO` qui informe
Hyprland du nom, de la description, de l'auteur et de la version de votre plugin.

Assurez-vous de stocker votre `HANDLE` car il sera requis pour les appels d'API.

La seconde méthode n'est pas requise, et sera appelée quand votre plugin est
déchargé par l'utilisateur.

Si votre plugin est déchargé parce qu'il a commis une faute, cette fonction
ne sera _pas_ appelée.

Vous n'avez pas à décharger les dispositions, retirer les options de configuration, retirer les dispatchers,
les décorations de fenêtre ou désenregistrer les hooks dans la méthode de sortie. Hyprland fera cela
pour vous.

### Configurer un environnement de développement

Pour vous faciliter la vie, c'est une bonne idée de travailler sur une session Hyprland debug
imbriquée. À moins que vous n'ayez besoin de tester des choses nécessitant du matériel réel
(par ex. les gestes de trackpad), vous devriez définitivement utiliser une session imbriquée.

Voir
[la section Contribuer](../../../Contributing-and-Debugging/#development-environment)
pour des instructions sur la configuration d'un environnement de développement.

### Charger / recharger les plugins

Compilez votre plugin, et vous pouvez le charger dans votre session imbriquée avec
```sh
hyprctl plugin load /absolute/path/to/plugin.so
```
et le décharger avec
```sh
hyprctl plugin unload /absolute/path/to/plugin.so
```

Le cycle de développement normal signifierait généralement charger le plugin, vérifier vos changements,
compiler le plugin avec les nouveaux changements, décharger + charger, et répéter.

Vous pouvez avoir une commande sur une seule ligne comme ceci :
```sh
hyprctl plugin unload /absolute/path/to/plugin.so ; hyprctl plugin load /absolute/path/to/plugin.so
```
comme un « rechargement » du plugin.

### Des choses plus avancées

Jetez un œil au header `src/plugins/PluginAPI.hpp`. Il a des commentaires pour chaque
méthode pour vous faire savoir ce qu'elle fait.

Pour plus d'explications sur quelques concepts, voir [Avancé](../Advanced) et
[Directives pour les plugins](../Plugin-Guidelines)
