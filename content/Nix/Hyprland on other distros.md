---
title: Hyprland on Other Distros
weight: 4
---

If you use Nix on distros other than NixOS, you can still use Hyprland.  
The best option would be through [Home Manager](../Hyprland-on-Home-Manager).

However, if Home Manager is not for you, Hyprland can be installed as a normal
package.  
First, [enable flakes](https://nixos.wiki/wiki/Flakes#Enable_flakes), then, once you
have flakes working, install Hyprland through `nix profile`:

{{< tabs items="From Nixpkgs,From the Flake" >}}

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

{{< /tabs >}}

Since you're using Hyprland outside of NixOS, it won't be able to find graphics
drivers.  
To get around that, you can use
[nixGL](https://github.com/guibou/nixGL).

First, install it:

```sh
nix profile install github:guibou/nixGL --impure
```

`--impure` is needed due to `nixGL`'s reliance on hardware information.

From now on, you can run Hyprland by invoking it with nixGL.

```sh
nixGL Hyprland
```

Or by creating a wrapper script that runs the above command inside.

## Upgrading

In order to upgrade all your packages, you can run:

```sh
nix profile upgrade '.*'
```

Check the
[nix profile](https://nixos.org/manual/nix/stable/command-ref/new-cli/nix3-profile.html)
command documentation for other upgrade options.
