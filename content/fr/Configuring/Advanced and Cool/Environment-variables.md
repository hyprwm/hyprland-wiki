---
weight: 70
title: Variables d'environnement
---

> [!NOTE]
> Vous cherchez l'ancienne syntaxe hyprlang ? Consultez les [pages du wiki 0.54](https://wiki.hypr.land/0.54.0/).
> Depuis Hyprland 0.55, hyprlang est devenu obsolète au profit de lua.

> [!NOTE]
> Les utilisateurs de [uwsm](../../../Useful-Utilities/Systemd-start) devraient éviter de placer des variables d'environnement dans le fichier `hyprland.lua`.  
> Utilisez plutôt `~/.config/uwsm/env` pour les variables de thème, xcursor, Nvidia et de toolkit, et `~/.config/uwsm/env-hyprland` pour les variables `HYPR*` et `AQ_*`.  
> Le format est `export KEY=VAL`.
> 
> ```plain
> export XCURSOR_SIZE=24
> ```
> 
> Voir le [readme uwsm](https://github.com/Vladimir-csp/uwsm?tab=readme-ov-file#4-environments-and-shell-profile) pour plus d'informations.

Vous pouvez utiliser la méthode `hl.env()` pour définir des variables d'environnement avant
l'initialisation du serveur d'affichage, par ex. :

```lua
hl.env("GTK_THEME", "Nord")
```

> [!NOTE]
> Lorsque vous référencez des variables d'environnement existantes comme `$XDG_RUNTIME_DIR`, utilisez `os.getenv()`, par ex. :
> `hl.env("SSH_AUTH_SOCK", os.getenv("XDG_RUNTIME_DIR").."/ssh-agent.socket")`

> [!WARNING]
> Merci d'éviter de placer ces variables d'environnement dans `/etc/environment`.  
> Cela ferait que toutes les sessions (y compris les sessions Xorg) récupèrent votre
> environnement spécifique à Wayland sur les distributions Linux traditionnelles.

## Variables d'environnement Hyprland

- `hl.env("HYPRLAND_TRACE", "1")` - Active une journalisation plus détaillée.
- `hl.env("HYPRLAND_NO_RT", "1")` - Désactive la définition de priorité temps réel par Hyprland.
- `hl.env("HYPRLAND_NO_SD_NOTIFY", "1")` - Si systemd, désactive les appels `sd_notify`.
- `hl.env("HYPRLAND_NO_SD_VARS", "1")` - Désactive la gestion des variables dans les environnements d'activation systemd et dbus.
- `hl.env("HYPRLAND_CONFIG", "/path/to/hyprland.lua")` - Spécifie où vous voulez placer votre configuration Hyprland.

## Variables d'environnement Aquamarine <!-- ref https://github.com/hyprwm/aquamarine/blob/main/docs/env.md -->

- `hl.env("AQ_TRACE", "1")` - Active une journalisation plus détaillée.
- `hl.env("AQ_DRM_DEVICES", "...")` - Définit une liste explicite de périphériques DRM (GPU) à utiliser. C'est une liste de chemins séparés par des deux-points, le premier étant le principal.
  Par ex. : `/dev/dri/card1:/dev/dri/card0`
- `hl.env("AQ_FORCE_LINEAR_BLIT", "0")` - Désactive le forçage de modificateurs linéaires explicites sur les tampons Multi-GPU pour potentiellement contourner des problèmes Nvidia.
- `hl.env("AQ_MGPU_NO_EXPLICIT", "1")` - Désactive la synchronisation explicite sur les tampons mgpu.
- `hl.env("AQ_NO_MODIFIERS", "1")` - Désactive les modificateurs pour les tampons DRM.
- `hl.env("AQ_NO_KMS_REQUIREMENT", "1")` - Désactive l'exigence KMS pour démarrer sur des GPU headless.

## Variables de backend de toolkit

- `hl.env("GDK_BACKEND", "wayland,x11,*")` - GTK : utilise Wayland si disponible ; sinon, essaie X11 puis n'importe quel autre backend GDK.
- `hl.env("QT_QPA_PLATFORM", "wayland;xcb")` - Qt : utilise Wayland si disponible, se replie sur
  X11 sinon.
- `hl.env("SDL_VIDEODRIVER", "wayland")` - Exécute les applications SDL2 sur Wayland. Retirez ou définissez à
  `x11` si des jeux fournissant des versions plus anciennes de SDL causent des problèmes de compatibilité
- `hl.env("CLUTTER_BACKEND", "wayland")` - Le paquet Clutter a déjà Wayland activé, cette
  variable forcera les applications Clutter à essayer d'utiliser le backend Wayland

## Spécifications XDG

- `hl.env("XDG_CURRENT_DESKTOP", "Hyprland")`
- `hl.env("XDG_SESSION_TYPE", "wayland")`
- `hl.env("XDG_SESSION_DESKTOP", "Hyprland")`

Les variables d'environnement spécifiques à XDG sont souvent détectées via des portails et
des applications qui peuvent les définir pour vous, cependant ce n'est pas une mauvaise idée de les
définir explicitement.

Si votre [portail de bureau](https://wiki.archlinux.org/title/XDG_Desktop_Portal) ne fonctionne pas correctement sans
raison apparente (pas d'erreurs), il est probable que votre environnement XDG ne soit pas défini correctement.

> [!NOTE]
> Les utilisateurs de [uwsm](../../../Useful-Utilities/Systemd-start) n'ont pas besoin de définir explicitement les variables d'environnement XDG, car uwsm les définit automatiquement.

## Variables Qt

- `hl.env("QT_AUTO_SCREEN_SCALE_FACTOR", "1")` -
  [(D'après la documentation Qt)](https://doc.qt.io/qt-5/highdpi.html) active
  la mise à l'échelle automatique, basée sur la densité de pixels du moniteur
- `hl.env("QT_QPA_PLATFORM", "wayland;xcb")` - Indique aux applications Qt d'utiliser le backend
  Wayland, et de se replier sur X11 si Wayland n'est pas disponible
- `hl.env("QT_WAYLAND_DISABLE_WINDOWDECORATION", "1")` - Désactive les décorations de fenêtre sur les applications
  Qt
- `hl.env("QT_QPA_PLATFORMTHEME", "qt5ct")` - Indique aux applications basées sur Qt de récupérer votre thème
  depuis qt5ct, à utiliser avec Kvantum.

## Spécifique à NVIDIA

Pour forcer GBM comme backend, définissez les variables d'environnement suivantes :

- `hl.env("GBM_BACKEND", "nvidia-drm")`
- `hl.env("__GLX_VENDOR_LIBRARY_NAME", "nvidia")`

> Voir la
> [page Wayland de l'Archwiki](https://wiki.archlinux.org/title/Wayland#Requirements)
> pour plus de détails sur ces variables.

- `hl.env("LIBVA_DRIVER_NAME", "nvidia")` - Accélération matérielle sur les GPU NVIDIA

> Voir la
> [page Accélération matérielle de l'Archwiki](https://wiki.archlinux.org/title/Hardware_video_acceleration)
> pour les détails et valeurs nécessaires avant de définir cette variable.

- `__GL_GSYNC_ALLOWED` - Contrôle si les moniteurs compatibles G-Sync doivent utiliser le taux de
  rafraîchissement variable (VRR)

> Voir la
> [documentation Nvidia](https://download.nvidia.com/XFree86/Linux-32bit-ARM/375.26/README/openglenvvariables.html)
> pour les détails.

- `__GL_VRR_ALLOWED` - Contrôle si l'Adaptive Sync doit être utilisée. Recommandé de la
  définir à "0" pour éviter des problèmes sur certains jeux.

- `hl.env("AQ_NO_ATOMIC", "1")` - utilise l'ancienne interface DRM au lieu du mode de réglage
  atomique. **NON** recommandé.

## Variables liées au thème

- `GTK_THEME` - Définit manuellement un thème GTK, pour ceux qui veulent éviter les outils
  d'apparence tels que lxappearance ou nwg-look.
- `XCURSOR_THEME` - Définit votre thème de curseur. Le thème doit être installé et
  lisible par votre utilisateur.
- `XCURSOR_SIZE` - Définit la taille du curseur. Voir [ici](../../../FAQ) pour savoir pourquoi vous pourriez
  vouloir définir cette variable.
