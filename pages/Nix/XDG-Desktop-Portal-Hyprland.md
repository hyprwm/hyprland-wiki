`xdg-desktop-portal-hyprland` (xdph) is a fork of `xdg-desktop-portal-wlr`
(xdpw), which supports window sharing and region sharing (currently broken),
apart from output (per-screen) sharing.

Due to the internal workings, `xdph` depends on the Hyprland package for
getting the window list. However, we cannot make a cross-dependency betwen
the Hyprland flake and the `xdph` flake.

The best solution we found to make everything work properly was to override
the Hyprland package that `xdph` builds with.

In the Hyprland flake, it's done like this:
```nix
xdg-desktop-portal-hyprland = inputs.xdph.packages.${prev.system}.default.override {
  hyprland-share-picker = inputs.xdph.packages.${prev.system}.hyprland-share-picker.override {inherit hyprland;};
};
```

{{< hint >}}
A similar override is done inside the [NixOS module](../Hyprland-on-NixOS), so
you do not have to tinker with it if you use the module.
{{< /hint >}}

If you don't use the module, you will want to do a similar override in your
configuration.
