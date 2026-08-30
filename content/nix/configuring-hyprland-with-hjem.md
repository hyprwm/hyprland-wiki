---
weight: 30
title: Configuring Hyprland with Hjem
---

Hjem ("home" in Danish) is a module system that implements a simple and streamlined way to manage files in your `$HOME`, such as but not limited to files in your `~/.config`.
Hjem aims to serve as an alternative and easy-to-grasp utility for managing your `$HOME` purely and safely.

You can read the wonderful [Hjem documentation](https://hjem.feel-co.org/) to learn how to install and use it.

## Writing your hyprland.lua directly inside your Nix config

Here follows an example of how to write your `hyprland.lua` contents directly inside your Nix config using Hjem, which will allow you to use Nix string interpolation.

```lua {filename="hyprland.nix"}
{
    hjem.users.youruser.xdg.config.files."hypr/hyprland.lua".text = /* lua */ ''
      # Your hyprland.lua content goes here.
      # You can use string interpolation for Nix to evaluate variables at build time.
      # A snippet of a hyprland.lua config using string interpolation for some variables to be interpreted by Nix:
          local monitor1 = "${config.custom.host.monitors."1"}"
          local monitor2 = "${config.custom.host.monitors."2"}"
          hl.monitor({
              output   = monitor2,
              ${lib.optionalString (hostName == "deck") "transform = 3"}
          })
    ''
}
```

## Sourcing a hyprland.lua file at your Nix config

Instead of writing your `hyprland.lua` contents directly inside your Nix config, you also have the possibility of sourcing an already existing `hyprland.lua` file using Hjem, to link it into its place at `~/.config/hypr/`.
If using version control, make sure this `hyprland.lua` is in the same repository as your config.
However, you can't use Nix string interpolation this way.

```nix {filename="hyprland.nix"}
{
    hjem.users.youruser.xdg.config.files."hypr/hyprland.lua".source = ./relative/path/to/file;
}
```

If you have already split your `hyprland.lua` into multiple files, you may source them the same way.

```nix {filename="hyprland.nix"}
{
    hjem.users.youruser.xdg.config.files = {
        "hypr/hyprland.lua".source = ./relative/path/to/hyprland.lua;
        "hypr/rules.lua".source = ./relative/path/to/rules.lua;
        "hypr/keybinds.lua".source = ./relative/path/to/keybinds.lua;
        "hypr/animations.lua".source = ./relative/path/to/animations.lua;
    };
}
```

For multi-file examples such as the one above, you may prefer to just link a whole directory. 
While you can do that in Hjem, it comes with the caveat that it makes the whole directory read-only.
This can be undesirable as it blocks any new files from being made inside that directory, breaking certain apps.
If you would like to recursively link only the files from inside a directory, [FindFiles](#findfiles) will interest you.

## Hjem-impure

Your `hyprland.lua` file will most likely change frequently.
What if you want to try a new change in your Hyprland config without having to build switch your NixOS config?
After `hyprland.lua` is deployed by Hjem, it will write a link into `~/.config/hyprland.lua` from the Nix store.
This file is read-only by default, but we can easily get to rewrite it by using a tool called [`hjem-impure`](https://github.com/Rexcrazy804/hjem-impure).

Executing `hjem-impure` replaces every Hjem symlink with writable normal files and directories.
So after that, you can write into your `~/.config/hyprland.lua` file deployed by Hjem.
**This enables experimentation.**
What this means is that, after a NixOS build switch or after a system reboot, the changes that you made in `~/.config/hyprland.lua` **will be gone**.
So after you are happy with your changes, write them into your Nix config for them to be persisted.

## FindFiles

[FindFiles](https://github.com/Michael-C-Buckley/findFiles.nix) is a small Nix library that allows you to easily link whole directories from inside your configuration to the correct locations.
It combines with a home management tool such as Hjem, which manages the linking itself, but it recursively finds files inside a directory.
This way you are linking every file in a folder instead of the folder itself all with one line of code.
Normal directory linking with Hjem links the whole folder, meaning the folder becomes read-only.
It works well with Hjem-impure if you desire hot reloading.
An example of what you can do with FindFiles:
- Have a config directory inside your repository and have it overlay on your entire `~/.config`.
- Have a Hyprland directory that gets auto-placed at `~/.config/hypr/`.
