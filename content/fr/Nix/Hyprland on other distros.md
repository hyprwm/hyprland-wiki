---
title: Hyprland sur d'autres distributions
weight: 2
---

Utiliser hyprland via Nix sur des distributions qui ne sont pas NixOS est très simple.

D'abord, installez nix avec votre gestionnaire de paquets, que ce soit `apt`, `pacman`, `dnf`, etc. Le paquet
s'appelle presque toujours `nix`.

Par exemple :

```sh
sudo pacman -S nix
```

Puis activez le démon(daemon) :

```sh
sudo systemctl enable --now nix-daemon
```

Les utilisateurs avancés voudront peut-être utiliser [Home Manager](../Hyprland-on-Home-Manager). Si vous ne savez pas ce que
c'est, abstenez-vous simplement.

Avant de faire quoi que ce soit, [activez les flakes](https://nixos.wiki/wiki/Flakes#Enable_flakes), en ajoutant ceci à `/etc/nix/nix.conf` ou `~/.config/nix/nix.conf` :

```ini
experimental-features = nix-command flakes
```

une fois cela fait, installez Hyprland via `nix profile` :

{{< tabs items="From hyprnix (Recommended),From Nixpkgs,From the Flake" >}}

{{< tab "From hyprnix (Recommended)" >}}

Installer Hyprland (et d'autres outils hypr*) peut se faire comme ceci :
```sh
sudo nix profile add --profile /nix/var/nix/profiles/default github:hyprwm/hyprnix#hyprland
```

Remplacez `#hyprland` par une autre application du flake pour l'installer (par ex. `#hyprpaper`)

{{< /tab >}}

{{< tab "From Nixpkgs" >}}

Vous pouvez obtenir Hyprland directement depuis Nixpkgs :

```sh
sudo nix profile install --profile /nix/var/nix/profiles/default nixpkgs#hyprland
```

{{< /tab >}}

{{< tab "From the Flake" >}}

> [!NOTE]
> Assurez-vous d'abord d'activer [Cachix](../Cachix).

> [!WARNING]
> Ceci compile la dernière branche git instable.

```sh
sudo nix profile add --profile /nix/var/nix/profiles/default github:hyprwm/Hyprland
```

{{< /tab >}}

{{< /tabs >}}

Puisque vous utilisez Hyprland en dehors de NixOS, il ne pourra pas trouver les pilotes
graphiques. Pour contourner cela, vous pouvez utiliser [nixGL](https://github.com/guibou/nixGL).

Installez-le simplement comme ceci :

```sh
sudo nix profile add --profile /nix/var/nix/profiles/default github:guibou/nixGL --impure
```

`--impure` est nécessaire en raison de la dépendance de `nixGL` aux informations matérielles.

Depuis la 0.53.2, `start-hyprland` utilisera automatiquement `nixGL` si nécessaire. Pour les versions antérieures,
vous devez utiliser `nixGL start-hyprland`.

Enfin, si vous utilisez un gestionnaire de connexion, comme SDDM ou GDM, vous devez créer un lien symbolique vers le fichier `.desktop`
comme ceci :

```sh
sudo mkdir -p /usr/share/wayland-sessions
sudo ln -sf /nix/var/nix/profiles/default/share/wayland-sessions/hyprland.desktop /usr/share/wayland-sessions/hyprland.desktop
```

afin que le gestionnaire de connexion puisse trouver Hyprland.

## Mise à niveau / mise à jour

Pour mettre à niveau tous vos paquets, vous pouvez exécuter :

```sh
sudo nix profile upgrade --profile /nix/var/nix/profiles/default '.*'
```

Consultez la documentation de la commande
[nix profile](https://nixos.org/manual/nix/stable/command-ref/new-cli/nix3-profile.html)
pour d'autres options de mise à niveau si cela vous intéresse.
