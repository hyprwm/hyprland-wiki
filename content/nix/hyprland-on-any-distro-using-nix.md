---
weight: 10
title: Hyprland on any distro using Nix
---

Using Hyprland via the Nix package manager on distros that aren't NixOS is very simple.

## Installing Nix

The first step is to install Nix itself.
There are two primary ways to install the Nix package manager:

{{% tabs %}}

{{% tab name="From Upstream" %}}

Nix upstream recommends the multi-user installer, which can be found in their [official documentation](https://nixos.org/manual/nix/stable/installation/index.html).
It operates outside of your package manager's control and modifies your shell profiles directly.
Uninstalling this method is harder.
The install script requires a distro that uses systemd.

{{% /tab %}}

{{% tab name="From Your Distro" %}}

Install Nix using your package manager, be that `apt`, `pacman`, `dnf`, etc.
The package is almost always called `nix`.
This integrates cleanly with your OS and is as easy to uninstall as any other package.
However, because it relies on dynamically linked libraries, an incompatible system update could potentially break Nix.
Additionally, you must rely on your distro's maintainers to package and push Nix updates rather than getting them directly from upstream.

For example, to install with pacman:

```sh
sudo pacman -S nix
```

After installing, you must manually enable the daemon.
For users on a systemd distro, use this command:

```sh
sudo systemctl enable --now nix-daemon
```

{{% /tab %}}

{{% /tabs %}}

## Installing Hyprland
Before you do anything, [enable flakes](https://nixos.wiki/wiki/Flakes#Enable_flakes), by adding this to `/etc/nix/nix.conf` or `~/.config/nix/nix.conf`:

```nix
experimental-features = nix-command flakes
```

Once that is done, install Hyprland through `nix profile`:

{{< tabs >}}

{{< tab name="From hyprnix (Recommended)" >}}

Installing Hyprland (and other hypr\* tools) can be done like so:

```sh
sudo nix profile add --profile /nix/var/nix/profiles/default github:hyprwm/hyprnix#hyprland
```

Replace `#hyprland` with a different app from the flake to install it (e.g. `#hyprpaper`)

{{< /tab >}}

{{< tab name="From Nixpkgs" >}}

You can get Hyprland directly from Nixpkgs:

```sh
sudo nix profile install --profile /nix/var/nix/profiles/default nixpkgs#hyprland
```

{{< /tab >}}

{{< tab name="From the Flake" >}}

> [!NOTE]
> Make sure to enable [Cachix](../cachix) first.

> [!WARNING]
> This builds the latest, unstable git branch.

```sh
sudo nix profile add --profile /nix/var/nix/profiles/default github:hyprwm/Hyprland
```

{{< /tab >}}

{{< /tabs >}}

Since you're using Hyprland outside of NixOS, it won't be able to find graphics drivers.
To get around that, you can use [nixGL](https://github.com/guibou/nixGL).

Just install it like so:

```sh
sudo nix profile add --profile /nix/var/nix/profiles/default github:guibou/nixGL --impure
```

`--impure` is needed due to `nixGL`'s reliance on hardware information.

Since 0.53.2, `start-hyprland` will automatically use `nixGL` if needed.
For versions before that, you must use `nixGL start-hyprland`.

Lastly, if you are using a Login Manager, like SDDM or GDM, you need to symlink the `.desktop` file like so:

```sh
sudo mkdir -p /usr/share/wayland-sessions
sudo ln -sf /nix/var/nix/profiles/default/share/wayland-sessions/hyprland.desktop /usr/share/wayland-sessions/hyprland.desktop
```

so that the login manager can find Hyprland.

## Upgrading / updating

In order to upgrade all your packages, you can run:

```sh
sudo nix profile upgrade --profile /nix/var/nix/profiles/default '.*'
```

Check the [Nix profile](https://nixos.org/manual/nix/stable/command-ref/new-cli/nix3-profile.html) command documentation for other upgrade options if that interests you.
