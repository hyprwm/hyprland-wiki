---
weight: 7
title: Connexion au téléphone
---

Cette page liste des utilitaires pour connecter des téléphones à une session Hyprland, incluant
l'intégration d'appareils, l'accès aux fichiers, le mirroring d'écran, et le partage rapide de fichiers en local.

## Intégration du téléphone

### KDE Connect

[KDE Connect](https://kdeconnect.kde.org/) intègre les téléphones avec le bureau.
Il peut partager des fichiers et le contenu du presse-papiers, afficher les notifications du téléphone, faire sonner ou
retrouver un appareil, et exposer des fonctionnalités de saisie à distance.

Installez [hypr-kdeconnect-fix](https://github.com/gfhdhytghd/hypr-kdeconnect-fix) pour faire fonctionner la fonction de saisie à distance de kde connect.

## Accès aux appareils

### Android : adb et MTP

Installez `android-tools` pour `adb`. Activez le débogage USB sur le téléphone, puis vérifiez
que l'appareil est visible :

Pour l'accès via gestionnaire de fichiers par MTP, installez `gvfs-mtp`. Cela permet aux
gestionnaires de fichiers compatibles GVfs de parcourir le stockage Android une fois le téléphone déverrouillé et configuré en mode
transfert de fichiers.

### iOS : libimobiledevice et ifuse

Installez [`libimobiledevice`](https://libimobiledevice.org/) et
[`ifuse`](https://github.com/libimobiledevice/ifuse) pour l'accès aux iPhone et iPad.

Les noms de paquets et la gestion des services varient selon la distribution. Certaines configurations nécessitent aussi
que `usbmuxd` soit en cours d'exécution pour les appareils iOS.

## Mirroring d'écran

### scrcpy

[`scrcpy`](https://github.com/Genymobile/scrcpy) affiche et contrôle les appareils
Android via USB ou TCP/IP en utilisant `adb`. Il est léger et fonctionne bien quand
le débogage USB est activé.

### Escrcpy

[Escrcpy](https://github.com/viarotel-org/escrcpy) est un frontend graphique construit
autour de `scrcpy`. Cela peut être utile si vous préférez gérer plusieurs
appareils Android, les options de mirroring, et les actions courantes depuis une GUI plutôt que des
drapeaux en ligne de commande.

## Partage rapide de fichiers en local

### LocalSend

[LocalSend](https://localsend.org/) est une application de partage de fichiers multiplateforme sur
réseau local. Installez-la sur les deux appareils, gardez-les sur le même réseau,
et envoyez des fichiers sans configurer SSH, SMB, ou de stockage cloud.

### Fyde Drop

[Fyde Drop](https://drop.fydeos.io/) est un outil de partage de fichiers sur réseau local basé sur navigateur.
Ouvrez la page sur les deux appareils et utilisez-la pour des transferts ponctuels rapides quand
vous ne voulez pas installer d'application.
