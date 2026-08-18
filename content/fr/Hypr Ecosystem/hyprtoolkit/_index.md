---
weight: 100
title: hyprtoolkit
---

[hyprtoolkit](https://github.com/hyprwm/hyprtoolkit) est une boîte à outils GUI pour développer des applications qui s'exécutent nativement sur Wayland.  
Elle est spécifiquement conçue pour les besoins de Hyprland, mais s'exécutera généralement sur n'importe quel compositeur Wayland
prenant en charge les standards modernes.

Pour la documentation développeur, voir [development](./development)

## Configuration

La configuration générale de la boîte à outils se trouve dans `~/.config/hypr/hyprtoolkit.conf`.  
Elle contient la thématisation et quelques ajustements mineurs et prend en charge les mêmes options de couleur que hyprland.

| Variable | Description | Type | Par défaut |
| --- | --- | --- | --- |
| `background` | Couleur d'arrière-plan. | color | `0xFF181818` |
| `base` | Couleur de base. | color | `0xFF202020` |
| `text` | Couleur du texte. | color | `0xFFDADADA` |
| `alternate_base` | Couleur de base alternative. | color | `0xFF272727` |
| `bright_text` | Couleur de texte vif. | color | `0xFFFFDEDE` |
| `accent` | Couleur d'accent. | color | `0xFF00FFCC` |
| `accent_secondary` | Couleur d'accent secondaire. | color | `0xFF0099F0` |
| `h1_size` | Taille de police pour H1. | int | `19` |
| `h2_size` | Taille de police pour H2. | int | `15` |
| `h3_size` | Taille de police pour H3. | int | `13` |
| `font_size` | Taille de police pour les éléments de texte normaux. | int | `11` |
| `small_font_size` | Taille de police pour les petits éléments de texte. | int | `10` |
| `icon_theme` | Nom du thème d'icônes à utiliser, vide pour « le premier trouvé ». | string | _vide_ |
| `font_family` | Nom de la famille de police à utiliser. | string | `Sans Serif` |
| `font_family_monospace` | Nom de la famille de police à chasse fixe à utiliser. | string | `monospace` |
| `rounding_large` | Grand arrondi en px logiques | int | `10` |
| `rounding_small` | Petit arrondi en px logiques | int | `5` |