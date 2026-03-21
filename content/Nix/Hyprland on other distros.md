---
title: Hyprland on Other Distros
weight: 2
---

Using hyprland via Nix on distros that aren't NixOS is very simple.

First, install nix with your package manager, be that `apt`, `pacman`, `dnf`, etc. The package
is almost always called `nix`.

For example:

```sh
sudo pacman -S nix
```

Then enable the daemon:

```sh
sudo systemctl enable --now nix-daemon
```

Advanced users might want to use [Home Manager](../Hyprland-on-Home-Manager). If you don't know what
this is, just don't.

Before you do anything, [enable flakes](https://nixos.wiki/wiki/Flakes#Enable_flakes), by adding this to `/etc/nix/nix.conf` or `~/.config/nix/nix.conf`:

```ini
experimental-features = nix-command flakes
```

once that is done, install Hyprland through `nix profile`:

{{< tabs items="From hyprnix (Recommended),From Nixpkgs,From the Flake" >}}

{{< tab "From hyprnix (Recommended)" >}}

Installing Hyprland (and other hypr* tools) can be done like so:
```sh
nix profile install github:hyprwm/hyprnix#hyprland
```

Replace `#hyprland` with a different app from the flake to install it (e.g. `#hyprpaper`)

{{< /tab >}}

{{< tab "From Nixpkgs" >}}

You can get Hyprland directly from Nixpkgs:

```sh
nix profile install nixpkgs#hyprland
```

{{< /tab >}}

{{< tab "From the Flake" >}}

> [!NOTE]
> Make sure to enable [Cachix](../Cachix) first.

> [!WARNING]
> This builds the latest, unstable git branch.

```sh
nix profile install github:hyprwm/Hyprland
```

{{< /tab >}}

{{< /tabs >}}

Since you're using Hyprland outside of NixOS, it won't be able to find graphics
drivers. To get around that, you can use [nixGL](https://github.com/guibou/nixGL).

Just install it like so:

```sh
nix profile install github:guibou/nixGL --impure
```

`--impure` is needed due to `nixGL`'s reliance on hardware information.

Since 0.53.2, `start-hyprland` will automatically use `nixGL` if needed. For versions before that,
you must use `nixGL start-hyprland`.

## Upgrading / updating

In order to upgrade all your packages, you can run:

```sh
nix profile upgrade '.*'
```

Check the
[nix profile](https://nixos.org/manual/nix/stable/command-ref/new-cli/nix3-profile.html)
command documentation for other upgrade options if that interests you.
