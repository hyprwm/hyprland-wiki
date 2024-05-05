---
title: Hyprland on Home Manager
---

For a list of available options, check the
[Home Manager options](https://nix-community.github.io/home-manager/options.xhtml#opt-wayland.windowManager.hyprland.enable).

{{< callout >}}

- _(Required) NixOS Module_: enables critical components needed to run Hyprland
  properly
- _(Optional) Home-manager module_: lets you declaratively configure Hyprland
  {{< /callout >}}

## Installation

{{< tabs items="Home Manager,Flakes,Nix stable (with flake-compat)" >}}

{{< tab "Home Manager" >}}

Home Manager has options for Hyprland without needing to import the Flake
module.

```nix
{
  wayland.windowManager.hyprland.enable = true;
}
```

{{< /tab >}}

{{< tab "Flakes" >}}

{{< callout >}}

The flake module is merely an extension to the Home Manager downstream module.
It is mainly used as a staging area for new options, so unless you're a tester
you should use the downstream Home Manager module.

{{< /callout >}}

The following snippet of code tries to show how to bring the Hyprland flake from
the flake input and import it into the module system. Feel free to make any
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

    hyprland.url = "git+https://github.com/hyprwm/Hyprland?submodules=1";
  };

  outputs = {nixpkgs, home-manager, hyprland, ...}: {
    homeConfigurations."user@hostname" = home-manager.lib.homeManagerConfiguration {
      pkgs = nixpkgs.legacyPackages.x86_64-linux;

      modules = [
        hyprland.homeManagerModules.default
        {wayland.windowManager.hyprland.enable = true;}
        # ...
      ];
    };
  };
}
```

{{< /tab >}}

{{< tab "No flakes (with flake-compat)" >}}

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

  hyprland-flake = (import flake-compat {
    # we're not using pkgs.fetchgit as that requires a hash to be provided
    src = builtins.fetchGit {
      url = "https://github.com/hyprwm/Hyprland.git";
      submodules = true;
    };
  }).defaultNix;
in {
  wayland.windowManager.hyprland = {
    enable = true;

    package = hyprland-flake.packages.${pkgs.system}.hyprland;
  }
}
```

{{< /tab >}}

{{< /tabs >}}

## Usage

Once the module is enabled, you can use it to declaratively configure Hyprland.
Here is an example config, made to work with either the upstream Home Manager
module, or the flake-based Home Manager module.

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
        # binds $mod + [shift +] {1..10} to [move to] workspace {1..10}
        builtins.concatLists (builtins.genList (
            x: let
              ws = let
                c = (x + 1) / 10;
              in
                builtins.toString (x + 1 - (c * 10));
            in [
              "$mod, ${ws}, workspace, ${toString (x + 1)}"
              "$mod SHIFT, ${ws}, movetoworkspace, ${toString (x + 1)}"
            ]
          )
          10)
      );
  };
}
```

## Plugins

Hyprland plugins can be added through the `plugins` option:

```nix
wayland.windowManager.hyprland.plugins = [
  inputs.hyprland-plugins.packages.${pkgs.system}.hyprbars
  "/absolute/path/to/plugin.so"
];
```

For examples on how to build Hyprland plugins using Nix, see the
[official plugins](https://github.com/hyprwm/hyprland-plugins).

## Fixing problems with themes

If your themes for mouse cursors, icons or windows don't load correctly, try
setting them with `home.pointerCursor` and `gtk.theme`, which enable a bunch of
compatibility options that should make the themes load in all situations.

Example configuration:

```nix
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
```

## Programs don't work in systemd services, but do on the terminal

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
