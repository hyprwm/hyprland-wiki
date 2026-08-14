---
title: Configuring Hyprland with Hjem
weight: 30
---

Hjem ("home" in Danish) is a module system that implements a simple and streamlined way to manage files in your $HOME, such as but not limited to files in your `~/.config`.
Hjem aims to serve as an alternative and easy-to-grasp utility for managing your $HOME purely and safely.

You can read the wonderful [Hjem documentation](https://hjem.feel-co.org/) to learn how to install and use it.

## Writing your hyprland.lua directly inside your Nix config

Here follows an example of how to write your hyprland.lua contents directly inside your Nix config using Hjem, which will allow you using Nix string interpolation.

```lua {filename="hyprland.nix"}
{
    hjem.users.youruser.files.".config/hypr/hyprland.lua".text = /* lua */ ''
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

Instead of writing your `hyprland.lua` contents directly inside your Nix config, you also have the possibility of sourcing a `hyprland.lua` file using Hjem just to link it into its place at `~/.config/hypr/`.
However, you can't use Nix string interpolation this way.

## Hjem-impure

The `hyprland.lua` file is most likely a highly changing file.
What if you want to try a new change in your Hyprland config without having to build switch your NixOS config?
After `hyprland.lua` is deployed by Hjem, it will write a link into `~/.config/hyprland.lua` from the Nix store.
This file is read-only by default, but we can easily get to rewrite it by using a tool called [`hjem-impure`](https://github.com/Rexcrazy804/hjem-impure).

Executing `hjem-impure` replaces every Hjem symlink with writable normal files and directories.
So after that, you can write into your `~/.config/hyprland.lua` file deployed by Hjem.
**This enables experimentation.**
What this mean is that after a NixOS build switch or after a system reboot, the changes that you made in `~/.config/hyprland.lua` **will be gone**.
So after you are happy with some changes, write them into your Nix config for them to be persisted.

## Systemd graphical-session.target

<!-- TODO: Remove when the graphical-session PR merges -->

Systemd is designed to expect `graphical-session.target` to be run when a Wayland compositor such as Hyprland is executed.
This is needed for some programs that depend on `graphical-session.target` to start their services.
The most notable example being the `xdg-desktop-portal.service`, which is needed for screen-sharing, for GTK apps to be able to switch their color scheme, etc.
Another example is the `waybar` service.

In NixOS, we can achieve this making a custom user unit using Hjem:

```toml {filename="hyprland.nix"}
{
    hjem.users.youruser.files.".config/systemd/user/hyprland-session.target".text = /* toml */ ''
      [Unit]
      Description=Custom unit for starting systemd's graphical-session.target
      BindsTo=graphical-session.target
      Wants=graphical-session-pre.target
      After=graphical-session-pre.target
      PropagatesStopTo=graphical-session.target
    ''
}
```

We need to start this unit at Hyprland start, and finish it at Hyprland shutdown:

```lua {filename="hyprland.nix"}
{
    hjem.users.youruser.files.".config/hypr/hyprland.lua".text = /* lua */ ''
      hl.on("hyprland.start", function()
        hl.exec_cmd("systemctl --user start hyprland-session.target")
      end)

      hl.on("hyprland.shutdown", function()
        os.execute("systemctl --user stop graphical-session.target")
        -- uses a blocking exec function to give things time to close
        -- you might also want to kill troublesome/crashing non-systemd background services here:
        -- os.execute("pkill wallpaperthing; systemctl --user stop graphical-session.target")
      end)
    ''
}
```
