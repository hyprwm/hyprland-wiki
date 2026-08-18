---
weight: 30
title: Permissions
---

> [!NOTE]
> Vous cherchez l'ancienne syntaxe hyprlang ? Consultez les [pages du wiki 0.54](https://wiki.hypr.land/0.54.0/).
> Depuis Hyprland 0.55, hyprlang est devenu obsolète au profit de lua.

Si vous avez `hyprland-guiutils` installé, vous pouvez utiliser le système de permissions intégré d'Hyprland.

Pour l'instant, il ne comporte que quelques permissions, mais il pourrait en inclure davantage à l'avenir.

## Permissions

Les permissions fonctionnent un peu comme celles d'Android. Si une application essaie de faire quelque chose de sensible avec
le compositeur (Hyprland), Hyprland affichera une notification vous demandant si vous
voulez le lui permettre.

> [!NOTE]
> Avant de configurer les permissions, assurez-vous de les activer en définissant
> `hl.config({ ecosystem = { enforce_permissions = true } })`, car c'est désactivé par défaut.


### Configurer les permissions

> [!IMPORTANT]
> Les permissions configurées dans le fichier de configuration ne sont **pas** rechargées à la volée et nécessitent un
> redémarrage de Hyprland pour des raisons de sécurité.

Les configurer est simple :

```lua
hl.permission({ binary, type, mode })
```

par exemple :
```lua
hl.permission({ binary = "/usr/bin/grim", type = "screencopy", mode = "allow" })
```
Permettra à `/usr/bin/grim` de toujours capturer votre écran sans demander.

```lua
hl.permission({ binary = "/usr/bin/appsuite-.*", type = "screencopy", mode = "allow" })
```
Permettra à toute application dont le chemin commence par `/usr/bin/appsuite-` de capturer votre écran sans demander.

### Modes de permission

Il existe 3 modes :
- `allow` : ne demande pas, autorise simplement l'application à continuer.
- `ask` : affiche une notification à chaque fois que l'application essaie de faire quelque chose de sensible. Ces popups vous permettent de refuser, d'autoriser jusqu'à ce que l'application se ferme, ou d'autoriser jusqu'à ce que Hyprland se ferme.
- `deny` : ne demande pas, refuse toujours l'accès à l'application.


### Liste des permissions

`screencopy` :
 - Par défaut : **ASK**
 - Accès à votre écran _sans_ passer par xdg-desktop-portal-hyprland. Exemples : `grim`, `wl-screenrec`, `wf-recorder`.
 - Si refusé, affichera un écran noir avec un texte « permission refusée ».
 - Pourquoi refuser ? Pour les applications / scripts qui pourraient essayer de manière malveillante de capturer votre écran à votre insu en utilisant directement les protocoles wayland.

`plugin` :
 - Par défaut : **ASK**
 - Accès pour charger un plugin. Peut être soit une regex pour le binaire de l'application, soit un chemin de plugin.
 - N'autorisez _pas_ `hyprctl` à charger vos plugins par défaut (un attaquant pourrait lancer `hyprctl plugin load /tmp/my-malicious-plugin.so`) - utilisez soit `deny` pour désactiver, soit `ask` pour être notifié.

`keyboard` :
 - Par défaut : **ALLOW**
 - Accès pour connecter un nouveau clavier. Regex du nom du périphérique.
 - Si vous voulez désactiver tous les claviers ne correspondant pas à une regex, créez une règle qui définit `DENY` pour `.*` _en tant que dernière règle de permission de clavier_.
 - Pourquoi refuser ? Rubber duckies (clés USB pirates), claviers virtuels/USB malveillants.

`cursorpos` :                                                                                        
 - Par défaut : **ASK**
 - Accès à la position de votre curseur et à l'image du curseur via les protocoles Wayland directement.                                                           
 - Pourquoi refuser ? Empêche les applications de suivre silencieusement la position de votre curseur sans passer par xdg-desktop-portal.

`input-capture` :
 - Par défaut : **ASK**
 - Accès pour capturer tous les événements d'entrée du compositeur (clavier, pointeur, tactile).
 - Pourquoi refuser ? Empêche les applications de capturer de manière malveillante toutes les entrées utilisateur sans votre consentement.

## Notes

Les implémentations de **xdg-desktop-portal** (y compris xdph) sont juste des applications classiques. Elles passeront aussi par les permissions. Vous pourriez vouloir envisager
d'ajouter une règle comme celle-ci :
```lua
hl.permission({ binary = "/usr/(lib|libexec|lib64)/xdg-desktop-portal-hyprland", type = "screencopy", mode = "allow" })
```
si vous n'autorisez pas screencopy pour toutes les applications.

<br/>

NixOS n'a pas de chemins statiques pour les binaires, donc des regex doivent être utilisées. Ces règles d'exemple autorisent `grim` et `xdg-desktop-portal-hyprland` à copier l'écran :
```lua
hl.permission({ binary = "/nix/store/[a-z0-9]{32}-grim-[0-9.]*/bin/grim", type = "screencopy", mode = "allow" })
hl.permission({ binary = "/nix/store/[a-z0-9]{32}-xdg-desktop-portal-hyprland-[0-9.]*/libexec/.xdg-desktop-portal-hyprland-wrapped", type = "screencopy", mode = "allow" })
```

Lors de la configuration avec Nix lui-même, l'interpolation de chaînes peut aussi être utilisée (attention : si le chemin contient des caractères regex spéciaux (par ex. `+`), ils doivent être échappés) :
```lua
hl.permission({ binary = "${lib.getExe pkgs.grim}", type = "screencopy", mode = "allow" })
hl.permission({ binary = "${lib.escapeRegex (lib.getExe config.programs.hyprlock.package)}", type = "screencopy", mode = "allow" })
hl.permission({ binary = "${pkgs.xdg-desktop-portal-hyprland}/libexec/.xdg-desktop-portal-hyprland-wrapped", type = "screencopy", mode = "allow" })
```

<br/>

Sur certains systèmes **BSD**, les chemins pourraient ne pas fonctionner. Dans ce cas, vous pourriez vouloir désactiver complètement les permissions, en définissant
```lua
hl.config({ 
  ecosystem = {
    enforce_permissions = false
  }
})
```
sinon, vous n'avez aucun contrôle par _configuration_ sur les permissions (les popups fonctionneront toujours, bien qu'elles n'afficheront pas les chemins, et « se souvenir » ne sera pas disponible).
