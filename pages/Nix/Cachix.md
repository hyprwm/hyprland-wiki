NOTE: This page only applies to the flake package. You can safely skip this if
you use the Nixpkgs package.

Hyprland is not built by Hydra and cached in `cache.nixos.org`, like the rest
of the Nixpkgs packages.

Instead of requiring you to build Hyprland (and its dependencies, which may
include `mesa`, `ffmpeg`, etc), we provide a Cachix cache that you can add to
your Nix configuration.

The [Hyprland Cachix](https://app.cachix.org/cache/hyprland) exists to cache the
`hyprland` packages and any dependencies not found in `cache.nixos.org`.

{{< hint >}}
In order for Nix to take advantage of the cache, it has to be enabled **before**
enabling the Hyprland flake package.
{{< /hint >}}

```nix
# configuration.nix
{
  nix.settings = {
    substituters = ["https://hyprland.cachix.org"];
    trusted-public-keys = ["hyprland.cachix.org-1:a7pgxzMz7+chwVL3/pzj6jIBMioiJM7ypFP8PwtkuGc="];
  };
}
```

{{< hint type=important >}}
Do **not** override Hyprland's `nixpkgs` input unless you know what you are
doing.

Doing so will make the cache useless, since you're building from a different
Nixpkgs commit.
{{< /hint >}}

