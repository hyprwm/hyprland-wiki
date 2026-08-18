---
weight: 6
title: Dispatchers
---

> [!NOTE]
> Vous cherchez l'ancienne syntaxe hyprlang ? Consultez les [pages du wiki 0.54](https://wiki.hypr.land/0.54.0/).
> Depuis Hyprland 0.55, hyprlang est devenu obsolète au profit de lua.

Gardez à l'esprit que certains dispatchers spécifiques à une disposition seront listés dans les
pages de disposition (voir la barre latérale).

## Dispatchers

Les dispatchers retournent des tables qui décrivent une action que vous souhaitez effectuer. Ils n'exécutent aucune action immédiatement, et leur
contenu n'est pas garanti d'être stable. Leur but est d'être transmis à `hl.bind()` ou `hl.dispatch()`.

### Explication des paramètres

|  Type de param | Description  |
|---|---|
| `action` | `toggle` (par défaut si aucune valeur n'est donnée), `enable`/`on`, `disable`/`off` |

#### Window (fenêtre)

Une fenêtre. Peut être :
 - un objet fenêtre
 - des regex :
   - `class:...`
   - `initialclass:...`
   - `title:...`
   - `initialtitle:...`
   - `tag:...`
 - des sélecteurs exacts :
   - `pid:...`
   - `stableid:...`
   - `address:0x...`
 - `activewindow`
 - `floating`
 - `tiled`

Si aucune fenêtre n'est fournie, la fenêtre active est utilisée.

#### Workspace (espace de travail)

Un espace de travail. Peut être :
 - un objet "espace de travail"
 - un ID d'espace de travail
 - un sélecteur d'espace de travail, voir [ci-dessous](#workspace-selectors)

#### Direction

Une direction simple. `l` / `r` / `u` / `d`

#### Monitor (moniteur)

Un moniteur. Peut être :
 - un objet "moniteur"
 - un ID de moniteur
 - une direction
 - un nom
 - `desc:` et une description
 - `current`
 - relatif : `+1` / `-2`

## Dispatchers

### General (Général)

`hl.dsp.` contient :

| méthode | description |
| --- | --- |
| `exec_cmd(cmd, rules?)` | exécute une commande. Rules peut être une table d'effets de règle de fenêtre à appliquer (voir [ci-dessous](#executing-with-rules)). |
| `exec_raw(cmd)` | exécute une commande brute. Alors que `exec_cmd` fera `sh -c`, celle-ci ne le fera pas. |
| `focus({ direction })` | déplace le focus dans une direction |
| `focus({ monitor })` | déplace le focus vers un moniteur |
| `focus({ workspace, on_current_monitor? })` | déplace le focus vers un espace de travail |
| `focus({ window })` | déplace le focus vers une fenêtre |
| `focus({ urgent_or_last })` | déplace le focus vers une fenêtre urgente, ou la dernière |
| `focus({ last })` | déplace le focus vers la dernière fenêtre |
| `exit()` | quitte Hyprland. Il est recommandé d'utiliser `hyprshutdown` à la place. |
| `submap(name)` | passe à une submap |
| `pass({ window? })` | transmet le raccourci à une fenêtre |
| `send_shortcut({ mods, key, window? })` | envoie un raccourci spécifique à une fenêtre |
| `send_key_state({ mods, key, state, window? })` | identique à ci-dessus, mais vous contrôlez `down` / `up` |
| `layout(message)` | envoie un message de disposition sous forme de chaîne |
| `dpms({ action?, monitor? })` | active/désactive les moniteurs (pas physiquement, comme un écran de veille). |
| `event(string)` | envoie un événement au socket2. |
| `global(string)` | active un raccourci global dbus. Voir [Binds > Raccourcis globaux](../Binds#dbus-global-shortcuts) |
| `force_idle(seconds)` | définit le temps écoulé pour tous les minuteurs d'inactivité, en ignorant les inhibiteurs d'inactivité. Les minuteurs reviennent à un comportement normal dès la prochaine activité. Ne pas utiliser directement avec un raccourci clavier. |
| `no_op()` | ne fait rien. Utile pour des raccourcis conditionnels. |
| `force_renderer_reload()` | force le rechargement du rendu sur tous les moniteurs. |
| `release_input_capture()` | libère toute session active de capture d'entrée. |

### Window (fenêtre)

`hl.dsp.window.` contient :

| méthode | description |
| --- | --- |
| `close({ window? })` | envoie une demande respectueuse de fermeture de la fenêtre. |
| `kill({ window? })` | tue le processus propriétaire de la fenêtre avec un `SIGKILL`. |
| `signal({ signal, window? })` | envoie un signal POSIX au processus propriétaire de la fenêtre. |
| `float({ action?, window? })` | définit l'état flottant d'une fenêtre. |
| `fullscreen({ mode?, action?, layout_aware?, window? })` | définit l'état plein écran d'une fenêtre. `mode` peut être « maximized » et « fullscreen ». `action` peut être `toggle`/`set`/`unset`. `layout_aware` prend `true` (par défaut)/`false`, vous permet de choisir si vous voulez utiliser le comportement plein écran géré par la disposition ou celui par défaut. |
| `fullscreen_state({ internal, client, action?, layout_aware? , window? })` | définit l'état plein écran d'une fenêtre avec plus de précision. `action` peut être `toggle`/`set`/`unset`. `layout_aware` prend `true` (par défaut)/`false`, vous permet de choisir si vous voulez utiliser le comportement plein écran géré par la disposition ou celui par défaut. Voir [Fullscreenstate](#fullscreenstate), [Gestionnaires de plein écran](#fullscreen-handlers) |
| `pseudo({ action?, window? })` | définit l'état de pseudo-tuilage d'une fenêtre. |
| `move({ direction, group_aware?, window? })` | déplace une fenêtre dans une direction. `group_aware = true` fera entrer/sortir les fenêtres des groupes en suivant la direction donnée. |
| `move({ workspace, follow?, window? })` | déplace une fenêtre vers un espace de travail |
| `move({ monitor, follow?, window? })` | déplace une fenêtre vers un moniteur |
| `move({ x, y, relative?, window? })` | déplace une fenêtre de / vers une coordonnée |
| `move({ into_group = direction, window? })` | déplace une fenêtre dans un groupe dans une direction |
| `move({ into_or_create_group = direction, window? })` | déplace une fenêtre dans un groupe dans une direction, ou crée un groupe si aucun groupe n'existe dans cette direction |
| `move({ out_of_group, window? })` | sort une fenêtre d'un groupe. `true` pour sans direction, une direction pour une direction spécifique |
| `swap({ direction })` | échange la fenêtre actuelle avec une autre dans une direction donnée | 
| `swap({ target })` | échange la fenêtre actuelle avec une autre | 
| `swap({ next })` | échange la fenêtre actuelle avec la suivante | 
| `swap({ prev })` | échange la fenêtre actuelle avec la précédente | 
| `center({ window? })` | centre la fenêtre actuelle sur l'écran |
| `cycle_next({ next?, tiled?, floating?, window? })` | met le focus sur la fenêtre suivante |
| `tag({ tag, window? })` | tague une fenêtre |
| `clear_tags({ window? })` | efface tous les tags d'une fenêtre |
| `toggle_swallow()` | bascule la visibilité de toutes les fenêtres avalées |
| `pin({ action?, window? })` | épingle une fenêtre |
| `alter_zorder({ mode, window? })` | mode peut être « top » ou « bottom » |
| `set_prop({ prop, value, window? })` | définit une propriété de fenêtre |
| `deny_from_group({ action? })` | empêche une fenêtre d'entrer dans un groupe |
| `drag()` | démarre un glissement interactif. À utiliser avec les raccourcis souris. |
| `resize()` | démarre un redimensionnement interactif. À utiliser avec les raccourcis souris. |
| `resize({ keep_aspect_ratio })` | démarre un redimensionnement interactif. À utiliser avec les raccourcis souris. Remplace la propriété `keep_aspect_ratio` de la fenêtre. |
| `resize({ x, y, relative?, window? })` | redimensionne une fenêtre |

### Workspace (espace de travail)

`hl.dsp.workspace.` contient :

| méthode | description |
| --- | --- |
| `rename({ workspace, name? })` | renomme un espace de travail |
| `change_id({ workspace, id })` | change l'ID d'un espace de travail. Ne peut pas être un ID déjà utilisé. Doit être > 0. |
| `move({ workspace?, monitor })` | déplace un espace de travail vers un moniteur |
| `swap_monitors({ monitor1, monitor2 })` | échange les espaces de travail actuels de deux moniteurs |
| `toggle_special(special_name)` | bascule un espace de travail spécial par nom |

### Group (groupe)

`hl.dsp.group.` contient :

| méthode | description |
| --- | --- |
| `toggle({ window? })` | bascule un groupe |
| `next({ window? })` | passe à la fenêtre suivante dans un groupe | 
| `prev({ window? })` | passe à la fenêtre précédente dans un groupe | 
| `active({ index, window? })` | passe à une fenêtre dans un groupe, par index | 
| `move_window({ forward?, window? })` | déplace une fenêtre dans l'ordre du groupe | 
| `lock({ action?, window? })` | verrouille un groupe | 
| `lock_active({ action? })` | verrouille le groupe actif | 

### Cursor (curseur)

`hl.dsp.cursor.` contient :

| méthode | description |
| --- | --- |
| `move_to_corner({ corner, window? })` | déplace le curseur vers un coin donné de la fenêtre. Corner va de 0 à 3 |
| `move({ x, y })` | déplace le curseur vers une coordonnée donnée |

> [!WARNING]
> Les utilisateurs de [uwsm](../../../Useful-Utilities/Systemd-start) devraient éviter d'utiliser le dispatcher `exit`, ou de terminer directement le processus Hyprland, car quitter Hyprland de cette façon le retire de sous ses clients et interfère avec la séquence d'arrêt ordonnée. Utilisez `exec, uwsm stop` (ou [d'autres variantes](https://github.com/Vladimir-csp/uwsm#how-to-stop)) qui arrêteront proprement la session graphique (et la session de connexion qui y est liée, le cas échéant). Si vous rencontrez des problèmes avec des unités qui entrent dans des états incohérents, affectant les sessions suivantes, utilisez plutôt `exec, loginctl terminate-user ""` (termine toutes les unités de l'utilisateur).
> 
> Il est également fortement conseillé de remplacer le dispatcher `exit` en conséquence dans la section des raccourcis clavier de `hyprland.lua`.

> [!WARNING]
> Il n'est PAS recommandé de définir DPMS ou forceidle directement avec un raccourci clavier, car cela
> pourrait causer un comportement indéfini. À la place, envisagez quelque chose comme
> 
> ```lua
> hl.bind("...", function()
>                  hl.timer(function()
>                    hl.dispatch(hl.dsp.dpms({ action = "disable" }))
>                  end, {timeout = 500, type = "oneshot"})
>                end)
> ```

### Fenêtres groupées (en onglets)

Hyprland vous permet de créer un groupe à partir de la fenêtre active actuelle avec le
dispatcher `hl.dsp.group.toggle()`.

Un groupe est comme un conteneur « tabbed » d'i3wm. Il prend la place d'une fenêtre, et
vous pouvez basculer entre les fenêtres qu'il contient.

Vous pouvez verrouiller un groupe avec le dispatcher `lock` afin d'empêcher de nouvelles
fenêtres d'entrer dans ce groupe.

Vous pouvez empêcher une fenêtre d'être ajoutée à un groupe ou de devenir un groupe avec le
dispatcher `window.deny_from_group`.

## Sélecteurs d'espace de travail

Vous avez neuf choix :

- ID : par ex. `1`, `2`, ou `3`

- ID relatif : par ex. `+1`, `-3` ou `+100`

- espace de travail sur moniteur, relatif avec `+` ou `-`, absolu avec `~` : par ex. `m+1`,
  `m-2` ou `m~3`

- espace de travail sur moniteur incluant les espaces de travail vides, relatif avec `+` ou `-`,
  absolu avec `~` : par ex. `r+1` ou `r~3`

- espace de travail ouvert, relatif avec `+` ou `-`, absolu avec `~` : par ex. `e+1`,
  `e-10`, ou `e~2`

- Nom : par ex. `name:Web`, `name:Anime` ou `name:Better anime`

- Espace de travail précédent : `previous`, ou `previous_per_monitor`

- Premier espace de travail vide disponible : `empty`, avec le suffixe `m` pour rechercher uniquement
  sur le moniteur, et/ou `n` pour en faire le *prochain* espace de travail vide disponible. par ex.
  `emptynm`

- Espace de travail spécial : `special` ou `special:name` pour les espaces de travail spéciaux nommés.

> [!WARNING]
> Les espaces de travail numériques (par ex. `1`, `2`, `13371337`) ne sont autorisés **QUE** entre 1
> et 2147483647 (inclus).  
> Ni `0` ni les nombres négatifs ne sont autorisés.

## Espace de travail spécial

Un espace de travail spécial est ce que l'on appelle un « scratchpad » ailleurs. Un
espace de travail que vous pouvez activer/désactiver sur n'importe quel moniteur.

> [!NOTE]
> Vous pouvez définir plusieurs espaces de travail spéciaux nommés, mais leur nombre est
> limité à 97 à la fois.

Par exemple, pour déplacer une fenêtre vers un espace de travail spécial nommé, vous pouvez utiliser la syntaxe suivante :

```lua
hl.bind("SUPER + C", hl.dsp.window.move({ workspace = "special:magic" }))
-- To see the hidden window and workspace you can use: 
hl.bind("SUPER + S", hl.dsp.workspace.toggle_special("magic"))
```

## Exécuter avec des règles

Le dispatcher `exec_cmd` prend en charge l'ajout de règles. Notez que certaines fenêtres fonctionneront mieux, d'autres moins bien. Il enregistre le PID du processus généré et l'utilise. Par exemple, si votre processus se forke puis que le fork ouvre une fenêtre, cela ne fonctionnera pas.

Exemple :

```lua
hl.bind("SUPER + E", hl.dsp.exec_cmd("kitty", { float = true, move = {0, 0} }))
```

## set_prop

Les props sont n'importe lequel des *effets dynamiques* des [Règles de fenêtre](../Window-Rules#dynamic-effects).

Par exemple :

```lua
{ prop = "no_anim", value = "1" }
{ prop = "no_anim", value = "1", window = "class:abc" }
```

Certaines props sont dérivées de leurs règles de fenêtre parentes qui prennent plusieurs arguments :
- `border_color` -> `active_border_color`, `inactive_border_color`
- `opacity` -> `opacity`, `opacity_inactive`, `opacity_fullscreen`, `opacity_override`, `opacity_inactive_override`, `opacity_fullscreen_override`

## Fullscreenstate

Le dispatcher `fullscreen_state` découple l'état que Hyprland maintient pour une fenêtre de l'état plein écran communiqué au client.  

`internal` fait référence à l'état maintenu par Hyprland.

`client` fait référence à l'état que reçoit l'application.

| Valeur | État | Description |
| --- | --- | --- |
| -1 | Current | Maintient l'état plein écran actuel. |
| 0 | None | La fenêtre occupe l'espace défini par la disposition actuelle. |
| 1 | Maximized | La fenêtre occupe tout l'espace de travail, en conservant les marges. |
| 2 | Fullscreen | La fenêtre occupe tout l'écran. |

Par exemple :

`{internal = 2, client = 0}` Met l'application en plein écran tout en gardant le client en mode non plein écran.  

Cela peut être utilisé pour empêcher les navigateurs basés sur Chromium de passer en mode présentation lorsqu'ils détectent qu'ils ont été mis en plein écran.  

`{internal = 0, client = 2}` Garde la fenêtre en mode non plein écran, mais le client passe en mode plein écran à l'intérieur de la fenêtre.

### `FSMODE_MAX`

Ce n'est pas un mode accessible à l'utilisateur, mais un état qui survient lorsqu'un client demande `Fullscreen` alors que le mode interne de cette fenêtre est `Maximized`.

Quand cela se produit, la prochaine demande de sortie du plein écran fera passer la fenêtre en `Maximized` à la place.

Un exemple pratique de cela est lorsque vous mettez en plein écran une vidéo que vous regardez sur une fenêtre maximisée.

### Gestionnaires de plein écran

Certaines dispositions, comme scrolling, permettent une gestion optionnelle du plein écran différente de celle par défaut.

Vous pouvez utiliser à la fois les plein écrans gérés par la disposition et ceux gérés par défaut dans ces dispositions en utilisant l'option `layout_aware` dans les dispatchers de plein écran.

Pour voir quel gestionnaire de plein écran une fenêtre donnée utilise, utilisez lua ou hyprctl.
