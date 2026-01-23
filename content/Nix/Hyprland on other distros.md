---
title: Hyprland on Other Distros
weight: 4
---

If you use Nix on distros other than NixOS, you can still use Hyprland.  
The best option for advanced users would be through [Home Manager](../Hyprland-on-Home-Manager).

However, for most people, Home Manager is too complicated and not worth it outside NixOS. In those cases,
Hyprland can be installed as a normal package.  
First, install nix with your system's package manager (usually just called `nix`),
then [enable flakes](https://nixos.wiki/wiki/Flakes#Enable_flakes), by adding this to `/etc/nix/nix.conf` or `~/.config/nix/nix.conf`:

```ini
experimental-features = nix-command flakes
```

once that is done, install Hyprland through `nix profile`:

{{< tabs items="From Nixpkgs,From the Flake,From hyprnix (Experimental)" >}}

{{< tab "From Nixpkgs" >}}

The easiest method is to get Hyprland directly from Nixpkgs:

```sh
nix profile install nixpkgs#hyprland
```

{{< /tab >}}

{{< tab "From the Flake" >}}

> [!NOTE]
> Make sure to enable [Cachix](../Cachix) first.

```sh
nix profile install github:hyprwm/Hyprland
```

{{< /tab >}}

{{< tab "From hyprnix (Experimental)" >}}

Installing Hyprland (and other hypr* tools) can be done like so:
```sh
nix profile install github:hyprwm/hyprnix#hyprland
```

Replace `#hyprland` with a different app from the flake to install it (e.g. `#hyprpaper`)

{{< /tab >}}

{{< /tabs >}}

Since you're using Hyprland outside of NixOS, it won't be able to find graphics
drivers.  
To get around that, you can use
[nixGL](https://github.com/guibou/nixGL).

Just install it like so:

```sh
nix profile install github:guibou/nixGL --impure
```

`--impure` is needed due to `nixGL`'s reliance on hardware information.

Since 0.53.2, `start-hyprland` will automatically use `nixGL` if needed. For versions before that,
you must use `nixGL start-hyprland`.

## Upgrading

In order to upgrade all your packages, you can run:

```sh
nix profile upgrade '.*'
```

Check the
[nix profile](https://nixos.org/manual/nix/stable/command-ref/new-cli/nix3-profile.html)
command documentation for other upgrade options.
