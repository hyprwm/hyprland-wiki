The NixOS module enables critical components needed to run Hyprland properly,
such as: polkit,
[xdg-desktop-portal-hyprland](https://github.com/hyprwm/xdg-desktop-portal-hyprland),
graphics drivers, fonts, dconf, xwayland, and adding a proper Desktop Entry to
your Display Manager.

Make sure to check out the options of the
[NixOS module](https://search.nixos.org/options?channel=unstable&from=0&size=50&sort=relevance&type=packages&query=hyprland).

{{< hint title=Note >}}
- *(Required) NixOS Module*: enables critical components needed to run Hyprland properly
- *(Optional) Home-manager module*: lets you declaratively configure Hyprland
{{< /hint >}}

{{< tabs "uniqueid" >}}

{{< tab "Nixpkgs" >}}

```nix
# configuration.nix

{pkgs, ...}: {
  programs.hyprland.enable = true;
}
```

This will use the Hyprland version that Nixpkgs has.

{{< /tab >}}

{{< tab "Flake package" >}}

{{< hint >}}
Please enable [Cachix](../Cachix) before using the flake package, so you don't
have to compile Hyprland yourself.
{{< /hint >}}

In case you want to use the development version of Hyprland, you can add it
like this:

```nix
# flake.nix

{
  inputs.hyprland.url = "github:hyprwm/Hyprland";
  # ...

  outputs = {nixpkgs, ...} @ inputs: {
    nixosConfigurations.HOSTNAME = nixpkgs.lib.nixosSystem {
      specialArgs = { inherit inputs; }; # this is the important part
      modules = [
        ./configuration.nix
      ];
    };
  } 
}

# configuration.nix

{inputs, pkgs, ...}: {
  programs.hyprland = {
    enable = true;
    package = inputs.hyprland.packages.${pkgs.system}.hyprland;
  };
}
```
Don't forget to change the `HOSTNAME` to your actual hostname!

{{< /tab >}}

{{< tab "Flake package, Nix stable" >}}

{{< hint >}}
Please enable [Cachix](../Cachix) before using the flake package, so you don't
have to compile Hyprland yourself.
{{< /hint >}}

```nix
# configuration.nix

{pkgs, ...}: let
  flake-compat = builtins.fetchTarball "https://github.com/edolstra/flake-compat/archive/master.tar.gz";

  hyprland-flake = (import flake-compat {
    src = builtins.fetchTarball "https://github.com/hyprwm/Hyprland/archive/master.tar.gz";
  }).defaultNix;
in {
  programs.hyprland = {
    enable = true;
    package = hyprland-flake.packages.${pkgs.system}.hyprland;
  };
}
```

{{< /tab >}}
{{< /tabs >}}

## Fixing problems with themes

If your themes for mouse cursor, icons or windows don't load correctly, try setting them with `home-manager`. `home-manager` enables a bunch of compatibility options that should make the themes load in all situations.

Example configuration:
```
  home-manager = {
    useGlobalPkgs = true;
    useUserPackages = true;

    users._username_ = {
      home = {
        stateVersion = "23.05";
        pointerCursor = {
          gtk.enable = true;
          # x11.enable = true;
          package = pkgs.bibata-cursors;
          name = "Bibata-Modern-Amber";
          size = 32;
        };
      };
      gtk = {
        enable = true;
        theme = {
          package = pkgs.flat-remix-gtk;
          name = "Flat-Remix-GTK-Grey-Darkest";
        };
        iconTheme = {
          package = pkgs.libsForQt5.breeze-icons;
          name = "breeze-dark";
        };
        font = {
          name = "Sans";
          size = 11;
        };
      };
    };
  };
   
```
