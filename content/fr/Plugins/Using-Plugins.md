---
weight: 1
title: Utiliser les plugins
---

> [!NOTE]
> Vous cherchez l'ancienne syntaxe hyprlang ? Consultez les [pages du wiki 0.54](https://wiki.hypr.land/0.54.0/).
> Depuis Hyprland 0.55, hyprlang est devenu obsolète au profit de lua.

Cette page vous expliquera comment utiliser les plugins.

## Avertissements

> [!WARNING]
> Les plugins sont écrits en C++ et s'exécuteront comme partie de Hyprland.  
> Assurez-vous de _toujours_ lire le code source des plugins que vous allez utiliser
> et de faire confiance à la source.  
> Écrire un plugin pour effacer votre ordinateur est facile.
> 
> Ne faites _**jamais**_ confiance à des fichiers `.so` aléatoires que vous recevez d'autres personnes.

## Obtenir des plugins

Les plugins se présentent sous forme d'_objets partagés_, c.-à-d. de fichiers `.so`.

Hyprland n'a aucun plugin « par défaut », donc tout plugin que vous voudriez utiliser
vous devrez le trouver vous-même.

## Installer / Utiliser des plugins

Il est _fortement_ recommandé d'utiliser le gestionnaire de plugins Hyprland, `hyprpm`. Pour
des instructions manuelles, voir [ici](#manual).

### hyprpm

> [!NOTE]
> Si vous utilisez la [gestion des permissions](../../Configuring/Advanced-and-Cool/Permissions),
> vous devriez autoriser hyprpm à charger des plugins en ajoutant ceci à votre configuration :
> 
> ```lua
> hl.permission("/usr/(bin|local/bin)/hyprpm", "plugin", "allow")
> ```
> 
> sinon vous obtiendrez une popup demandant la permission à chaque fois que hyprpm essaie de charger un plugin.

Assurez-vous d'avoir les dépendances requises : `cpio`, `cmake`, `git`, `meson` et `gcc`.
Vous pourriez aussi avoir besoin des paquets `-dev` des dépendances de Hyprland si votre distribution sépare
les binaires et les headers (par ex. Fedora ou Debian). 

Trouvez un dépôt depuis lequel vous voulez installer des plugins. Comme exemple, nous allons utiliser
[hyprland-plugins](https://github.com/hyprwm/hyprland-plugins).

```sh
hyprpm add https://github.com/hyprwm/hyprland-plugins
```

Une fois terminé, vous pouvez lister vos plugins installés avec :

```sh
hyprpm list
```

Ensuite, activez ou désactivez-les via `hyprpm enable name` et `hyprpm disable name`.

Pour que les plugins soient chargés dans Hyprland, exécutez `hyprpm reload`.

Vous pouvez ajouter `hyprpm reload` aux démarrages automatiques de votre configuration Hyprland pour faire
charger les plugins au démarrage. Ajoutez optionnellement le drapeau `-n` pour obtenir une notification
indiquant que le plugin a été chargé avec succès (petit plus visuel). Notez que peu importe si
`-n` est présent ou non, la commande `reload` générera une notification pour
les événements d'avertissement et d'erreur.

Pour mettre à jour vos plugins, exécutez `hyprpm update`.

Pour toutes les options de `hyprpm`, exécutez `hyprpm -h`.

### Manuelle

Différents plugins peuvent avoir différentes méthodes de compilation, référez-vous à leurs instructions.

Si vous n'avez pas les headers Hyprland installés, clonez Hyprland, basculez vers votre
version, compilez Hyprland, et exécutez `sudo make installheaders`. Puis compilez votre/vos
plugin(s).

Pour charger des plugins manuellement, utilisez `hyprctl plugin load path`.

Vous pouvez décharger des plugins avec `hyprctl plugin unload path`.

> [!WARNING]
> Le chemin doit être absolu !

## FAQ sur les plugins

### Comment les utiliser dans ma configuration ?


Exemple :

```lua
function M.setup_vkfix()
    if hl.plugin.csgo_vulkan_fix ~= nil then
        hl.plugin.csgo_vulkan_fix.vkfix_app({ app = "cs2", w = 2304, h = 1440 })
        hl.config({
            plugin = {
                csgo_vulkan_fix = {
                    fix_mouse = false
                }
            }
        })
    end
end
```

Le `if` est là pour que nous n'obtenions pas d'erreur si le plugin n'est pas encore chargé.


### Mon Hyprland plante !

Oh non. Oups. Cela signifie généralement qu'un plugin est cassé. `hyprpm disable`-le.

### Comment lister mes plugins chargés ?

`hyprctl plugin list`

### Comment créer mon propre plugin ?

Voir [ici](../Development/Getting-Started).

### Où trouver des plugins ?

Vous pouvez trouver nos plugins mis en avant sur
[hypr.land/plugins](https://hypr.land/plugins/). Vous pouvez aussi voir une liste
sur
[awesome-hyprland](https://github.com/hyprland-community/awesome-hyprland#plugins).
Notez qu'elle pourrait ne pas être complète. Enfin, vous pouvez essayer de chercher sur github
le mot-clé `"hyprland plugin"`.

### Les plugins sont-ils sûrs ?

Tant que vous lisez le code source de votre/vos plugin(s) et pouvez voir qu'il n'y a
rien de malveillant, ils seront sûrs.

### Les plugins réduisent-ils la stabilité de Hyprland ?

Hyprland emploie quelques tactiques pour décharger les plugins qui plantent. Cependant, ces
tactiques ne fonctionnent pas toujours. En général, tant que le plugin est bien conçu,
il ne devrait pas affecter la stabilité de Hyprland.
