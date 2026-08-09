---
title: Configuring Hyprland with Hjem
weight: 30
---

Hjem ("home" in Danish) is a module system that implements a simple and streamlined way to manage files in your $HOME, such as but not limited to files in your ~/.config. Hjem aims to serve as an alternative and easy-to-grasp utility for managing your $HOME purely and safely.

You can read the wonderful [Hjem documentation](https://hjem.feel-co.org/) to learn how to install and use it.

## Writing your hyprland.lua directly inside your nix config

Here follows an example of how to write your hyprland.lua contents directly inside your nix config using hjem, which will allow you using nix string interpolation.

```lua {filename="hyprland.nix"}
{
    hjem.users.youruser.files.".config/hypr/hyprland.lua".text = /* lua */ ''
      # Your hyprland.lua content goes here.
      # You can use string interpolation for nix to evaluate variables at build time.
      # A snippet of a hyprland.lua config using string interpolation for some variables to be interpreted by nix:
          local monitor1 = "${config.custom.host.monitors."1"}"
          local monitor2 = "${config.custom.host.monitors."2"}"
          hl.monitor({
              output   = monitor2,
              ${lib.optionalString (hostName == "deck") "transform = 3"}
          })
    ''
}
```

## Sourcing a hyprland.lua file at your nix config

Instead of writing your hyprland.lua contents directly inside your nix config, you also have the possibility of sourcing a hyprland.lua file using Hjem just to link it into its place at "~/.config/hypr/". However, you can't use nix string interpolation this way.

## Hjem-impure

The hyprland.lua file is most likely a highly changing file. What if you want to try a new change in your hyprland config without having to build switch your nixos config? After hyprland.lua is deployed by hjem, it will write a link into `~/.config/hyprland.lua` from the nix store. This file is read-only by default, but we can easily get to rewrite it by using a tool called [`hjem-impure`](https://github.com/Rexcrazy804/hjem-impure).

Executing `hjem-impure` replaces every hjem symlink with writable normal files and directories. So after that, you can write into your `~/.config/hyprland.lua` file deployed by hjem. **This enables experimentation.** What this mean is that after a nixos build switch or after a system reboot, the changes that you made in `~/.config/hyprland.lua` **will be gone**. So after you are happy with some changes, write them into your nix config for them to be persisted.
