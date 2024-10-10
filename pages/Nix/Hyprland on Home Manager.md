---
title: Hyprland on Home Manager
---

For a list of available options, check the
[Home Manager options](https://nix-community.github.io/home-manager/options.xhtml#opt-wayland.windowManager.hyprland.enable).

{{< callout >}}

- _**(Required)** NixOS Module_: enables critical components needed to run
  Hyprland properly.
  - _Without this, you may have issues with XDG Portals, or missing session
    files in your Display Manager._
- _(Optional) Home Manager module_: lets you configure Hyprland declaratively
  through Home Manager.
  - _This module configures Hyprland and adds it to your user's `$PATH`, but
    does not make certain system-level changes such as adding a desktop session
    file for your display manager. This is handled by the NixOS module once you
    enable it._

  {{< /callout >}}

## Installation

{{< tabs items="Home Manager,Flakes,Nix stable (with flake-compat)" >}}

{{< tab "Home Manager" >}}

```nix
{
  programs.kitty.enable = true; # required for the default Hyprland config
  wayland.windowManager.hyprland.enable = true; # enable Hyprland

  # Optional, hint Electron apps to use Wayland:
  # home.sessionVariables.NIXOS_OZONE_WL = "1";
}
```

{{< /tab >}}

{{< tab "Flakes" >}}

The following snippet of code tries to show how to bring the Hyprland flake from
the flake input and use its packages with Home Manager. Feel free to make any
adjustment for your setup.

Don't forget to replace `user@hostname` with your username and hostname!

```nix
# flake.nix

{
  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";

    home-manager = {
      url = "github:nix-community/home-manager";
      inputs.nixpkgs.follows = "nixpkgs";
    };

    hyprland.url = "github:hyprwm/Hyprland";
  };

  outputs = {nixpkgs, home-manager, hyprland, ...}: {
    homeConfigurations."user@hostname" = home-manager.lib.homeManagerConfiguration {
      pkgs = nixpkgs.legacyPackages.x86_64-linux;

      modules = [
        {
          wayland.windowManager.hyprland = {
            enable = true;
            # set the flake package
            package = inputs.hyprland.packages.${pkgs.stdenv.hostPlatform.system}.hyprland;
          };
        }
        # ...
      ];
    };
  };
}
```

{{< /tab >}}

{{< tab "Nix stable (with flake-compat)" >}}

{{< callout >}}

The flake module is merely an extension to the Home Manager downstream module.
It is mainly used as a staging area for new options, so unless you're a tester
you should use the downstream Home Manager module.

{{< /callout >}}

The following snippet of code tries to show how to bring the Hyprland flake from
the flake input and use the package in the Home Manager option. Feel free to
make any adjustment for your setup.

```nix
# home config

{pkgs, ...}: let
  flake-compat = builtins.fetchTarball "https://github.com/edolstra/flake-compat/archive/master.tar.gz";

  hyprland = (import flake-compat {
    src = builtins.fetchTarball "https://github.com/hyprwm/Hyprland/archive/main.tar.gz";
  }).defaultNix;
in {
  wayland.windowManager.hyprland = {
    enable = true;
    # set the flake package
    package = hyprland.packages.${pkgs.stdenv.hostPlatform.system}.hyprland;
  }
}
```

{{< /tab >}}

{{< /tabs >}}

## Usage

Once the module is enabled, you can use it to declaratively configure Hyprland.
Here is an example config:

```nix
# home.nix

{
  wayland.windowManager.hyprland.settings = {
    "$mod" = "SUPER";
    bind =
      [
        "$mod, F, exec, firefox"
        ", Print, exec, grimblast copy area"
      ]
      ++ (
        # workspaces
        # binds $mod + [shift +] {1..9} to [move to] workspace {1..9}
        builtins.concatLists (builtins.genList (i:
            let ws = i + 1;
            in [
              "$mod, code:1${toString i}, workspace, ${toString ws}"
              "$mod SHIFT, code:1${toString i}, movetoworkspace, ${toString ws}"
            ]
          )
          9)
      );
  };
}
```

## Plugins

Hyprland plugins can be added through the `plugins` option:

```nix
{
  wayland.windowManager.hyprland.plugins = [
    inputs.hyprland-plugins.packages.${pkgs.stdenv.hostPlatform.system}.hyprbars
    "/absolute/path/to/plugin.so"
  ];
}
```

For examples on how to build Hyprland plugins using Nix, see the
[Nix/Plugins](../Plugins) page.

## FAQ

### Fixing problems with themes

If your themes for mouse cursors, icons or windows don't load correctly, try
setting them with `home.pointerCursor` and `gtk.theme`, which enable a bunch of
compatibility options that should make the themes load in all situations.

Example configuration:

```nix
{
  home.pointerCursor = {
    gtk.enable = true;
    # x11.enable = true;
    package = pkgs.bibata-cursors;
    name = "Bibata-Modern-Classic";
    size = 16;
  };

  gtk = {
    enable = true;

    theme = {
      package = pkgs.flat-remix-gtk;
      name = "Flat-Remix-GTK-Grey-Darkest";
    };

    iconTheme = {
      package = pkgs.gnome.adwaita-icon-theme;
      name = "Adwaita";
    };

    font = {
      name = "Sans";
      size = 11;
    };
  };
}
```

### Programs don't work in systemd services, but do on the terminal

This problem is related to systemd not importing the environment by default. It
will not have knowledge of `PATH`, so it cannot run the commands in the
services. This is the most common with user-configured services such as
`hypridle` or `swayidle`.

To fix it, add to your config:

```nix
wayland.windowManager.hyprland.systemd.variables = ["--all"];
```

This setting will produce the following entry in the Hyprland config:

```ini
exec-once = dbus-update-activation-environment --systemd --all
```

Make sure to use the above command if you do not use the Home Manager module.
