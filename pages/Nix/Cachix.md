Hyprland is not built by Hydra and cached in `cache.nixos.org`, like the rest
of the Nixpkgs packages.

Instead of requiring you to build Hyprland (and its dependencies, which may
include `mesa`, `ffmpeg`, etc), we provide a Cachix cache that you can add to
your Nix configuration.

The [Hyprland Cachix](https://app.cachix.org/cache/hyprland) exists to cache the
`hyprland` packages and any dependencies not found in `cache.nixos.org`.

{{< hint >}}
In order for Nix to take advantage of the cache, it has to be enabled **before**
enabling the Hyprland module(s) or adding the package.
{{< /hint >}}

{{< hint type=important >}}
Overriding Hyprland's `nixpkgs` input
(`inputs.hyprland.inputs.nixpkgs.follows = "nixpkgs";`) will make the cache
useless, since you're building from a different Nixpkgs commit.
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
