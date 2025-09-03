{
  description = "Hyprland wiki";

  outputs = {
    nixpkgs,
    systems,
    self,
    ...
  }: let
    inherit (nixpkgs) lib;
    eachSystem = lib.genAttrs (import systems);
    pkgsFor = eachSystem (system: nixpkgs.legacyPackages.${system});
  in {
    packages = eachSystem (system: {
      hyprland-wiki-lint = pkgsFor.${system}.callPackage ./nix {};
      default = self.packages.${system}.hyprland-wiki-lint;
    });

    devShells = eachSystem (system: {
      default = pkgsFor.${system}.mkShell {
        inputsFrom = self.packages.${system}.default;
        packages = [self.packages.${system}.default];
        name = "hyprland-wiki";
      };
    });
  };

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";

    # <https://github.com/nix-systems/nix-systems>
    systems.url = "github:nix-systems/default-linux";
  };
}
