You can override the package through `.override` or `.overrideAttrs`. This is
easily achievable through NixOS or Home Manager.

## Package options

These are the default options that the Hyprland package is built with. These
can be changed by setting the appropriate option to `true`/`false`.

### Package

```nix
(pkgs.hyprland.override { # or inputs.hyprland.packages.${pkgs.stdenv.hostPlatform.system}.default
  enableXWayland = true;
  hidpiXWayland = true;
  nvidiaPatches = false;
})
```

### NixOS & HM modules

```nix
programs.hyprland = { # or wayland.windowManager.hyprland
  enable = true;
  xwayland = {
    enable = true;
    hidpi = true;
  };
  nvidiaPatches = false;
};
```

## Options descriptions

### XWayland

XWayland is enabled by default in the Nix package. You can disable it either
in the package itself, or through the module options.

### XWayland HiDPI

By default, the Nix package includes a patched wlroots that can render HiDPI
XWayland windows.

In order to enable the functionality, you have to add:

```toml
exec-once = xprop -root -f _XWAYLAND_GLOBAL_OUTPUT_SCALE 32c -set _XWAYLAND_GLOBAL_OUTPUT_SCALE 2
```

This will make XWayland programs look as if they were unscaled. To fix this, you
have to set different environment variables to make the specific toolkits
render at the proper scaling. For example, add this to your `hyprland.conf`:

```ini
env = GDK_SCALE,2
env = XCURSOR_SIZE,48
```

{{< hint >}}
The GDK_SCALE variable won't conflict with wayland-native GTK programs.
{{< /hint >}}

Usually, there's no reason to disable this functionality, as it won't affect
people who don't have HiDPI screens.

If you _do_ insist on disabling it though (e.g. for adding your own patches
to wlroots), you can do so by either using the `hyprland-no-hidpi` package,
or by passing the `hidpiXWayland = false;` flag, the same way as
[disabling XWayland](#package).

### Nvidia Patches

Nvidia is notorious for not working by default with wlroots. That's why we
patch wlroots.

## Using Nix repl

If you're using Nix (and not NixOS or Home Manager) and you want to override,
you can do it like this

```sh
$ nix repl
nix-repl> :lf "github:hyprwm/Hyprland"
nix-repl> :bl outputs.packages.x86_64-linux.hyprland.override {nvidiaPatches = true;} # option = value
```

Then you can run Hyprland from the built path.
