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

      shopt -s dotglob

      mkdir -p $out/bin

      cp -r * $out/

      # Replace relative paths in package.json scripts with cwd paths
      sed -i "s|\.\.|\$cwd|g" $out/package.json

      cat << 'EOF' > $out/bin/lint
      #!/usr/bin/env bash
      shopt -s dotglob

      export cwd=$(pwd)

      args=()
      for arg in "$@"; do
        if [[ "$arg" == ../* ]] || [[ "$arg" == ./* ]] || [[ "$arg" == */* && "$arg" != /* ]]; then
          args+=("$(realpath -m "$cwd/$arg")")
        else
          args+=("$arg")
        fi
      done

      cd ${placeholder "out"}

      exec ${pnpm}/bin/pnpm run "''${args[@]}"
      EOF

      chmod +x $out/bin/lint

      runHook postInstall
    '';

    fixupPhase = ''
      runHook preFixup

      wrapProgram $out/bin/lint \
        --suffix PATH : ${lib.makeBinPath [nodejs]}:$out/node_modules/.bin

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
