{
  lib,
  stdenv,
  nodejs,
  pnpm_10,
  makeWrapper,
}: let
  pnpm = pnpm_10;
in
  stdenv.mkDerivation (finalAttrs: {
    pname = "hyprland-wiki-lint";
    version = "1.0.0";

    src = ../lint;

    nativeBuildInputs = [
      nodejs
      pnpm.configHook
      makeWrapper
    ];

    installPhase = ''
      runHook preInstall

      mkdir -p $out/bin

      cat << EOF > $out/bin/lint
      #!/usr/bin/env bash
      ${pnpm}/bin/pnpm run \$1
      EOF

      chmod +x $out/bin/lint

      runHook postInstall
    '';

    fixupPhase = ''
      runHook preFixup

      wrapProgram $out/bin/lint \
      --suffix PATH : ${lib.makeBinPath [nodejs]}

      runHook postFixup
    '';

    pnpmDeps = pnpm.fetchDeps {
      inherit (finalAttrs) pname version src;
      fetcherVersion = 2;
      hash = "sha256-CkNet6goNLABfAaBagXGCyU3UUR0izdMNptV5Qz/meQ=";
    };

    meta = {
      homepage = "https://github.com/hyprwm/hyprland-wiki";
      description = "remark with plugins used to format the Hyprland wiki source files";
      mainProgram = "lint";
      license = lib.licenses.mit;
      platforms = lib.platforms.linux;
    };
  })
