You can override the package through `.override` or `.overrideAttrs`. This is
easily achievable through NixOS or Home Manager.

## Package options

These are the default options that the Hyprland package is built with. These
can be changed by setting the appropriate option to `true`/`false`.

### Package

```nix
(pkgs.hyprland.override { # or inputs.hyprland.packages.${pkgs.stdenv.hostPlatform.system}.default
  enableXWayland = true;
  hidpiXWayland = false;
  nvidiaPatches = false;
})
```

### NixOS & HM modules

```nix
programs.hyprland = { # or wayland.windowManager.hyprland
  enable = true;
  xwayland = {
    enable = true;
    hidpi = false;
  };
  nvidiaPatches = false;
};
```

## Options descriptions

### XWayland

XWayland is enabled by default in the Nix package. You can disable it either
in the package itself, or through the module options.

### XWayland HiDPI

The `hyprland-hidpi` Nix package includes a patched wlroots that can render
HiDPI XWayland windows.

In order to enable HiDPI when using the NixOS or Home Manager modules, you can
set `programs.hyprland.xwayland.hidpi = true`, or
`wayland.windowManager.hyprland.xwayland.hidpi = true`, respectively.

Now that the required package to achieve HiDPI is installed, an XWayland
instruction is needed to set the scale:

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

### Plugins

Hyprland plugins can be added through the home manager module.

```nix
wayland.windowManager.hyprland.plugins = [
  inputs.hyprland-plugins.packages.${pkgs.system}.hyprbars
  "/absolute/path/to/plugin.so"
];
```

For examples on how to build hyprland plugins using nix see the
[official plugins](https://github.com/hyprwm/hyprland-plugins).

### Nvidia Patches

Nvidia is notorious for not working by default with wlroots. That's why we
patch wlroots.

In the NixOS and Home Manager modules, you can enable the Nvidia patches using
`programs.hyprland.nvidiaPatches` and `wayland.windowManager.hyprland.nvidiaPatches`,
respectively.

## Using Nix repl

If you're using Nix (and not NixOS or Home Manager) and you want to override,
you can do it like this

```console
$ nix repl
nix-repl> :lf "github:hyprwm/Hyprland"
nix-repl> :bl outputs.packages.x86_64-linux.hyprland.override {nvidiaPatches = true;} # option = value
```

Then you can run Hyprland from the built path.
