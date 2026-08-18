---
weight: 12
title: Démarrage Systemd
---

## UWSM

- [Universal Wayland Session Manager](https://github.com/Vladimir-csp/uwsm) enveloppe les compositeurs Wayland autonomes dans un ensemble d'unités Systemd et fournit une gestion de session robuste incluant l'environnement, la prise en charge du démarrage automatique XDG, la liaison bidirectionnelle avec la session de connexion, et un arrêt propre.

Merci de noter qu'uwsm est destiné aux utilisateurs avancés et présente ses propres problèmes et bizarreries supplémentaires. [hyprland-session.target](#hyprland-sessiontarget) est une méthode minimale alternative pour gérer une session systemd.

### Installation

{{% details title="Arch" closed="true" %}}

uwsm est disponible dans les dépôts officiels d'Arch.

```sh
pacman -S uwsm libnewt
```

{{% /details %}}

{{% details title="Nix/NixOS" closed="true" %}}

```nix
{
  programs.hyprland.withUWSM  = true;
}
```

L'option ci-dessus génère une nouvelle entrée de bureau, `hyprland-uwsm.desktop`, qui sera disponible dans les gestionnaires de connexion.

Pour plus d'infos, lisez l'[option](https://search.nixos.org/options?channel=unstable&show=programs.uwsm.enable&from=0&size=50&sort=relevance&type=packages&query=uwsm).

> [!WARNING]
> Si vous utilisez le [module Home Manager](../../Nix/Hyprland-on-Home-Manager), assurez-vous de désactiver l'intégration systemd, car elle entre en conflit avec uwsm.
> 
> ```nix
> {
>   wayland.windowManager.hyprland.systemd.enable = false;
> }
> ```

{{% /details %}}

> [!NOTE]
> Pour les instructions concernant d'autres distributions et la compilation manuelle, voir la section [compiler et installer](https://github.com/Vladimir-csp/uwsm?tab=readme-ov-file#installation) sur la page du projet.

### Lancer Hyprland avec uwsm

> [!NOTE]
> Portez attention aux avertissements dans les sections [Variables d'environnement](../../Configuring/Advanced-and-Cool/Environment-variables), [Multi-GPU](../../Configuring/Advanced-and-Cool/Multi-GPU) et [Dispatchers](../../Configuring/Basics/Dispatchers).

#### Dans un tty

{{% details title="Configuration PAM pour GNOME Keyring" closed="true" %}}

Lors du lancement depuis un tty plutôt qu'un gestionnaire de connexion, certaines intégrations de session que les gestionnaires de connexion gèrent normalement pourraient ne pas être configurées. Un exemple courant est [GNOME Keyring](https://wiki.gnome.org/Projects/GnomeKeyring) - si `pam_gnome_keyring.so` n'est pas présent dans votre configuration PAM de connexion, le trousseau ne se déverrouillera pas automatiquement, et les applications pourraient vous demander de le déverrouiller manuellement.

Pour configurer cela, ajoutez les lignes `pam_gnome_keyring.so` au fichier de configuration PAM utilisé par votre méthode de connexion (par ex. `/etc/pam.d/login` pour `login(1)`). Consultez la documentation de votre distribution pour le fichier et la syntaxe corrects. Par exemple, sur Arch Linux :

```ini {hl_lines=[5,8,10]}
#%PAM-1.0

auth       requisite    pam_nologin.so
auth       include      system-local-login
-auth      optional     pam_gnome_keyring.so
account    include      system-local-login
password   include      system-local-login
-password  optional     pam_gnome_keyring.so    use_authtok
session    include      system-local-login
-session   optional     pam_gnome_keyring.so    auto_start
```

Les gestionnaires de connexion (GDM, SDDM, etc.) incluent typiquement déjà cette configuration PAM. Cette étape n'est nécessaire que pour la connexion basée sur console (tty).

{{% /details %}}

Pour lancer Hyprland avec uwsm, ajoutez ce code dans votre profil shell.

```
if uwsm check may-start && uwsm select; then
	exec uwsm start default
fi
```

Cela affichera le menu de sélection de compositeur uwsm après votre connexion au tty1. Choisissez l'entrée `Hyprland` et c'est parti.

Si vous voulez contourner le menu de sélection de compositeur et lancer Hyprland directement, utilisez plutôt ce code dans votre profil shell.

```
if uwsm check may-start; then
    exec uwsm start hyprland.desktop
fi
```

#### Utiliser un gestionnaire de connexion

Si vous utilisez un gestionnaire de connexion, choisissez l'entrée `Hyprland (uwsm-managed)` dans le menu de sélection du gestionnaire de connexion.

### Lancer des applications à l'intérieur de la session

Le concept d'une session gérée par Systemd implique aussi d'exécuter les applications comme des unités. Uwsm [fournit](https://github.com/Vladimir-csp/uwsm#3-applications-and-slices) un utilitaire pour le faire. Exécuter des applications comme processus enfants à l'intérieur de l'unité du compositeur est déconseillé.

Préfixez les commandes de lancement d'application avec `uwsm app --`. Cela prend aussi en charge le lancement d'entrées de bureau (Desktop Entries) par ID ou chemin. Voir `man uwsm` ou `uwsm app --help`.

Des alternatives plus rapides sont : 
- `uwsm-app` : un client shell fonctionnant avec un démon à la demande, partie optionnelle d'uwsm.
- `app2unit` : ([lien](https://github.com/Vladimir-csp/app2unit)), alternative pure shell, ouvreur de fichiers, généralement en avance sur les fonctionnalités.
- `runapp` : ([lien](https://github.com/c4rlo/runapp/)), alternative C++, encore plus rapide, les fonctionnalités peuvent varier.

## hyprland-session.target

Un compositeur Wayland est censé indiquer à systemd qu'il s'agit d'une session graphique. C'est une façon minimale de démarrer la `graphical-session.target` si vous ne voulez pas utiliser UWSM. Cette target démarrera automatiquement les services utilisateur comme les barres et démons de notification, mais certains services comme XDG Desktop Portal (et donc XDPH) pourraient même refuser de démarrer sans elle. Vous pouvez gérer cela vous-même en créant une `hyprland-session.target` qui se lie à la `graphical-session.target`, puis en la lançant dans votre configuration.

Créez d'abord l'unité avec `systemctl --user edit --full --force hyprland-session.target` :

```ini
[Unit]
Description=Hyprland session
BindsTo=graphical-session.target
Wants=graphical-session-pre.target
After=graphical-session-pre.target
PropagatesStopTo=graphical-session.target
```

Puis démarrez-la et arrêtez-la dans votre configuration :

```lua
hl.on("hyprland.start", function()
    hl.exec_cmd("systemctl --user start hyprland-session.target")
end)

hl.on("hyprland.shutdown", function()
    os.execute("systemctl --user stop hyprland-session.target && sleep 0.1")
    -- uses a blocking exec function and sleeps a bit to give things time to close
    -- you might also want to kill troublesome/crashing non-systemd background services here:
    -- os.execute("pkill wallpaperthing; systemctl --user stop hyprland-session.target && sleep 0.1")
end)
```

## Démarrage automatique

Le démarrage automatique XDG est géré par systemd, et sa target est activée automatiquement dans une session gérée par uwsm. Les services utilisateur nécessitent généralement que `graphical-session.target` soit activée par n'importe quelle méthode de cette page.

Certaines applications fournissent des unités utilisateur systemd natives pour être démarrées automatiquement avec. Celles-ci pourraient devoir être activées explicitement via `systemctl --user enable [some-app.service]`. Ou, dans le cas où l'unité manque de section `[Install]`, activée plus directement : `systemctl --user add-wants graphical-session.target [some-app.service]`. Assurez-vous aussi que l'unité possède l'ordonnancement `After=graphical-session.target` (cela peut être ajouté via un drop-in).

Par exemple, au lieu d'avoir `hl.exec_cmd("hyprpaper")` dans votre configuration, exécutez simplement `systemctl --user enable hyprpaper.service` une fois et laissez systemd le lancer pour vous à partir de maintenant.

Plus d'exemples et astuces liés au démarrage automatique peuvent être trouvés [ici](https://github.com/Vladimir-csp/uwsm/tree/master/example-units).
