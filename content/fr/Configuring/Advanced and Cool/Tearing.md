---
weight: 15
title: Tearing
---

> [!NOTE]
> Vous cherchez l'ancienne syntaxe hyprlang ? Consultez les [pages du wiki 0.54](https://wiki.hypr.land/0.54.0/).
> Depuis Hyprland 0.55, hyprlang est devenu obsolète au profit de lua.

Le screen tearing (déchirement d'écran) est utilisé pour réduire la latence et/ou les saccades dans les jeux.

## Activer le tearing

Pour activer le tearing :

- Définissez `general.allow_tearing` à `true`. C'est un « interrupteur maître »
- Ajoutez un effet de règle de fenêtre `immediate` à votre jeu de choix. Cela garantit que
  Hyprland le fera « déchirer » (tear).

> [!WARNING]
> Notez que le tearing ne sera effectif que lorsque le jeu est en plein écran
> et est la seule chose visible à l'écran.

Extrait d'exemple :

```lua
hl.config({
  general = {
    allow_tearing = true
  }
})

hl.window_rule({
  match = { class = "cs2" }, immediate = true
})
```

> [!WARNING]
> Si vous rencontrez des problèmes graphiques, vous n'aurez peut-être pas de chance. Le support du tearing est
> expérimental.  
> Voir les coupables probables ci-dessous.

## Problèmes courants

### Pas de tearing du tout

Assurez-vous que vos règles de fenêtre correspondent et que vous avez activé l'interrupteur maître.

Assurez-vous aussi que rien d'autre que votre jeu ne s'affiche sur votre moniteur. Pas de
notifications, superpositions, écrans de verrouillage, barres, autres fenêtres, etc. (sur un autre
moniteur, ce n'est pas un problème)

### Les applications qui devraient déchirer se figent

Cela signifie presque certainement que votre pilote GPU ne prend pas en charge le tearing.

Merci de _ne pas_ signaler de problèmes si c'est le coupable.

### Artefacts graphiques (pixels colorés aléatoires, etc.)

Probablement un problème avec votre pilote graphique.

Merci de _ne pas_ signaler de problèmes si c'est le coupable. Malheureusement, c'est très
probablement la faute de votre pilote GPU.
