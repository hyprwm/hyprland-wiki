You can override the package through `.override` or `.overrideAttrs`. This
is easily achievable on [NixOS](../Hyprland-on-NixOS) or
[Home Manager](../Hyprland-on-Home-Manager).

## Package options

These are the default options that the Hyprland package is built with. These
can be changed by setting the appropriate option to `true`/`false`.

### Package

```nix
(pkgs.hyprland.override { # or inputs.hyprland.packages.${pkgs.system}.hyprland
  enableXWayland = true;
})
```

### NixOS & HM modules

```nix
programs.hyprland = { # or wayland.windowManager.hyprland
  enable = true;
  xwayland.enable = true;
};
```

## Options descriptions

### XWayland

XWayland is enabled by default in the Nix package. You can disable it either
in the package itself, or through the module options.

### XWayland HiDPI

See [XWayland](../../Configuring/XWayland).

## Using Nix repl

If you're using Nix (and not NixOS or Home Manager) and you want to override,
you can do it like this

```nix
$ nix repl
nix-repl> :lf "github:hyprwm/Hyprland"
nix-repl> :bl outputs.packages.x86_64-linux.hyprland.override
```

Then you can run Hyprland from the built path.
