---
weight: 13
title: hyprqt6engine
---

[hyprqt6engine](https://github.com/hyprwm/hyprqt6engine) fournit un thème pour les applications QT6. C'est un remplacement pour qt6ct, compatible avec les applications KDE / KColorScheme.

## Utilisation

Installez, puis définissez `QT_QPA_PLATFORMTHEME=hyprqt6engine`.  
Vous pouvez définir ceci comme `env=` dans Hyprland, ou dans `/etc/environment` pour le définir à l'échelle du système.

## Configuration

Le fichier de configuration se trouve dans `~/.config/hypr/hyprqt6engine.conf`.

### Theme (Thème)

catégorie `theme:`

| Variable | Description | Type | Par défaut |
| --- | --- | --- | --- |
| `color_scheme` | Le chemin complet vers un schéma de couleurs. <br> Peut être un thème qt6ct, ou un KColorScheme. <br> Laissez vide pour les valeurs par défaut. | string | _vide_ |
| `icon_theme` | Nom d'un thème d'icônes à utiliser. | string | _vide_ |
| `style` | Style de widget à utiliser, par ex. Fusion ou kvantum-dark. | string | `Fusion` |
| `font_fixed` | Famille de police pour la police à chasse fixe. | string | `monospace` |
| `font_fixed_size` | Taille de police pour la police à chasse fixe. | int | `11` |
| `font` | Famille de police pour la police normale. | string | `Sans Serif` |
| `font_size` | Taille de police pour la police normale. | int | `11` |

### Misc (Divers)

catégorie `misc:`

| Variable | Description | Type | Par défaut |
| --- | --- | --- | --- |
| `single_click_activate` | Si un simple clic doit activer, ou ouvrir. | bool | `true` |
| `menus_have_icons` | Si les menus contextuels doivent inclure des icônes. | bool | `true` |
| `shortcuts_for_context_menus` | Si les options des menus contextuels doivent afficher leurs raccourcis clavier. | bool | `true` |
