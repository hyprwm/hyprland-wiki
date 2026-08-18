---
weight: 7
title: Clients d'applications
---

Certains clients sont réputés pour être un problème majeur sous Wayland. Voici d'excellents
remplacements pour ceux-ci :

## Discord

- [WebCord](https://github.com/SpacingBat3/WebCord) est un client Discord basé sur
  la dernière version d'Electron, avec prise en charge de la plateforme Wayland Ozone, ainsi que
  du partage d'écran PipeWire. Il possède des tonnes de fonctionnalités géniales et tente de ne pas
  enfreindre les CGU de Discord.

- [Vesktop](https://github.com/Vencord/Vesktop) Comme WebCord, Vesktop est un client Discord personnalisé avec des performances et une prise en charge de Wayland améliorées. Il dispose aussi d'un partage d'écran intégré, et prend en plus en charge les plugins et thèmes personnalisés. Vesktop prend même en charge le partage audio correct lorsque vous partagez votre écran. Notez que Vesktop repose sur Vencord, une modification de client Discord personnalisée, qui viole les conditions d'utilisation de Discord. À utiliser à vos propres risques.

- [dissent](https://github.com/diamondburned/dissent) est un client Discord
  écrit en GTK4. Bien qu'il enfreigne les CGU de Discord, il est relativement sûr
  et ne repose sur aucune technologie de webview.

## Matrix/Element

[Fractal](https://wiki.gnome.org/Apps/Fractal) est un client Matrix écrit en
GTK4. Tout comme Discord, Element est réputé avoir beaucoup de problèmes en raison
du fait qu'il est basé sur Electron. Fractal ne prend actuellement pas en charge les appels VoIP, mais
toutes les autres fonctionnalités sont prises en charge, y compris le chiffrement de bout en bout (E2EE) et la vérification multi-appareils.
