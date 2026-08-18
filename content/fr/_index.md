---
cascade:
  type: docs
title: Wiki Hyprland
---

Bonjour, cher voyageur ! Bienvenue sur le Wiki d'Hyprland !

Parcourez les pages à gauche et consultez celles dont vous pourriez avoir besoin.

***Ce wiki est versionné !*** Par défaut, vous consultez le wiki correspondant au _dernier commit git d'Hyprland_.
Cliquez sur le sélecteur de version et sélectionnez votre version si vous utilisez une version étiquetée
(ce qui est très probablement le cas, vous pouvez le vérifier avec `hyprctl version`).




## Informations sur Wayland (particulièrement utiles pour les utilisateurs d'Xorg)

Un compositeur Wayland est un serveur d'affichage entièrement autonome, tout comme Xorg lui-même. Il
**n'est** pas possible de mélanger et d'associer des compositeurs Wayland comme vous pourriez le faire sur Xorg avec des gestionnaires de fenêtres et des compositeurs. Il n'est pas non plus entièrement possible, ni recommandé, d'essayer d'utiliser toutes les applications Xorg sous Wayland. Consultez
[cette page](Useful-Utilities) pour obtenir une liste de programmes Wayland
natifs/compatibles recommandés.

Les **compositeurs** Wayland ne doivent pas être confondus avec les **gestionnaires de fenêtres** Xorg.

## IMPORTANT

Si vous rencontrez des problèmes, veuillez essayer de [lire la FAQ](FAQ) et les sections de configuration
— il y a de fortes chances que votre problème y soit décrit quelque part. Si ce n'est pas le cas, vous pouvez
essayer de [rechercher dans les issues](https://github.com/hyprwm/Hyprland/issues).