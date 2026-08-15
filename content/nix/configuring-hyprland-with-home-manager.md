---
title: Configuring Hyprland with Home Manager
weight: 40
---

For a list of available options, check the
[Home Manager options](https://nix-community.github.io/home-manager/options.xhtml#opt-wayland.windowManager.hyprland.enable).

> [!WARNING]
> **Required:**
> - **NixOS Module:** enables critical components needed to run Hyprland properly.  
>   Without this, you may have issues with missing session files in your
>     Display Manager.
> 
> **Optional**:
> - **Home Manager module:** lets you configure Hyprland declaratively through Home Manager.  
> - Configures Hyprland and adds it to your user's `$PATH`, but
>     does not make certain system-level changes such as adding a desktop session
>     file for your display manager.  
>     This is handled by the NixOS module, once you enable it.

## Installation

{{< tabs items="Home Manager,The Hyprland flake,flake-compat" >}}

{{< tab "Home Manager" >}}

```nix {filename="home.nix"}
{
  wayland.windowManager.hyprland.enable = true;
}
```

{{< /tab >}}

{{< tab "The Hyprland flake" >}}

The following snippet of code tries to show how to bring the Hyprland flake from
the flake input and use its packages with Home Manager. Feel free to make any
adjustment for your setup.

Don't forget to replace `user@hostname` with your username and hostname!

```nix {filename="flake.nix"}
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
            portalPackage = inputs.hyprland.packages.${pkgs.stdenv.hostPlatform.system}.xdg-desktop-portal-hyprland;
          };
        }
        # ...
      ];
    };
  };
}
```

{{< /tab >}}

{{< tab "flake-compat" >}}

This section is for using the Hyprland flake in a NixOS system without support for Nix flakes.

> [!WARNING]
> The flake module is merely an extension to the Home Manager downstream module.
> It is mainly used as a staging area for new options, so unless you're a tester
> you should use the downstream Home Manager module.

The following snippet of code tries to show how to bring the Hyprland flake from
the flake input and use the package in the Home Manager option. Feel free to
make any adjustment for your setup.

```nix {filename="home.nix"}
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
    portalPackage = hyprland.packages.${pkgs.stdenv.hostPlatform.system}.xdg-desktop-portal-hyprland;
  }
}
```

{{< /tab >}}

{{< /tabs >}}

## Usage

Once the module is enabled, you can use it to declaratively configure Hyprland.
Here is an example config:

<!-- TODO this is outdated, needs rewrite -->
```nix {filename="home.nix"}
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

Hyprland plugins are managed differently on Nix than on other distros.  
The most notable change is that `hyprpm` is unsupported, but we have our own way of
building and managing plugins.

> [!WARNING]
> Using plugins using the syntax below requires you to be using Hyprland through
> the [Home Manager module](../configuring-hyprland-with-home-manager) or the
> [upstream NixOS module](../installing-hyprland-on-nixos).

## Using plugins from Nixpkgs

In Nixpkgs, there are Hyprland plugins packaged for the Hyprland version in
Nixpkgs. You can use them like this:

```nix {filename="home.nix"}
{pkgs, ...}: {
  wayland.windowManager.hyprland.plugins = [
    pkgs.hyprlandPlugins.<plugin>
  ];
}
```

You can find which plugins are included using
`nix search nixpkgs#hyprlandPlugins ^`.

## hyprland-plugins

Official plugins made/maintained by vaxry.

To use these plugins, it is recommended to be already using the Hyprland
flake, and **not** the Nixpkgs version.

First, add the flake to your flake inputs:

```nix {filename="flake.nix"}
{
  inputs = {
    hyprland.url = "github:hyprwm/Hyprland";

    hyprland-plugins = {
      url = "github:hyprwm/hyprland-plugins";
      inputs.hyprland.follows = "hyprland";
    };

    # ...
  }
}
```

The `inputs.hyprland.follows` line makes hyprland-plugins use the exact Hyprland
revision you have locked.  
This means there aren't any version mismatches, as long as you update both inputs at once.

The next step is adding the plugins to Hyprland:

```nix {filename="home.nix"}
{inputs, pkgs, ...}: {
  wayland.windowManager.hyprland = {
    enable = true;

    plugins = [
      inputs.hyprland-plugins.packages.${pkgs.stdenv.hostPlatform.system}.<plugin>
    ];
  };
}
```

## FAQ

### Fixing problems with themes

If your themes for mouse cursors, icons or windows don't load correctly, try
setting them with `home.pointerCursor` and `gtk.theme`, which enable a bunch of
compatibility options that should make the themes load in all situations.

Example configuration:

```nix {filename="home.nix"}
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
      package = pkgs.adwaita-icon-theme;
      name = "Adwaita";
    };

    font = {
      name = "Sans";
      size = 11;
    };
  };
}
```

### Using the Home-Manager module with NixOS

If you want to use the Home Manager module while using the Hyprland package you've
defined in your NixOS module, you can now do so as long as you're running
[Home Manager `5dc1c2e40410f7dabef3ba8bf4fdb3145eae3ceb`](https://github.com/nix-community/home-manager/commit/5dc1c2e40410f7dabef3ba8bf4fdb3145eae3ceb)
or later by setting your `package` and `portalPackage` to `null`.

```nix {filename="home.nix"}
{
  wayland.windowManager.hyprland = {
    enable = true;
    # set the Hyprland and XDPH packages to null to use the ones from the NixOS module
    package = null;
    portalPackage = null;
  };
}
```

Make sure **not** to mix versions of Hyprland and XDPH.
If your NixOS config uses Hyprland from the flake, you should also use XDPH from the flake.
If you set the Home Manager Hyprland module package to `null`, you should also set the XDPH package to `null`.

### Programs don't work in systemd services, but do on the terminal

This problem is related to systemd not importing the environment by default. It
will not have knowledge of `PATH`, so it cannot run the commands in the
services. This most commonly affects user-configured services such as
`hypridle` or `swayidle`.

To fix it, add to your config:

```nix {filename="home.nix"}
{
  wayland.windowManager.hyprland.systemd.variables = ["--all"];
}
```

This setting will produce the following entry in the Hyprland config:

```lua {filename="hyprland.lua"}
hl.on("hyprland.start", function()
    hl.exec_cmd("dbus-update-activation-environment --systemd --all")
end)
```

Make sure to use the above command if you do not use the Home Manager module.
