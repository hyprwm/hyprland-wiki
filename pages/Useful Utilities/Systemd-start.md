---
weight: 12
title: Systemd startup
---

## UWSM

- [Universal Wayland Session Manager](https://github.com/Vladimir-csp/uwsm) is a recommended way to start Hyprland session on systemd distros. uwsm wraps standalone Wayland compositors into a set of Systemd units and provides robust session management including environment, XDG autostart support, bi-directional binding with login session, and clean shutdown.

## Installation

{{% details title="Arch" closed="true" %}}

uwsm is available in AUR. You can install it either with aur helper, or build PKGBUILD manually. Here's an example for yay.

```sh
yay -S uwsm
```

{{% /details %}}

{{% details title="Nix/NixOS" closed="true" %}}

Available [here](https://github.com/NixOS/nixpkgs/tree/master/pkgs/by-name/uw/uwsm/package.nix)


{{% /details %}}


 {{< callout type=info >}}

For instructions for other distros and manual building, see [building and installing](https://github.com/Vladimir-csp/uwsm?tab=readme-ov-file#installation) section on the project's page.

 {{< /callout >}}

## Launching Hyprland with uwsm


To launch Hyprland with uwsm, add this code in your shell profile.

```
if uwsm check may-start && uwsm select; then
	exec systemd-cat -t uwsm_start uwsm start default
fi
```

This will bring uwsm compositor selection menu after you log in tty. Choose Hyprland entry and you're good to go.

If you want to bypass compositor selection menu and launch Hyprland directly, use this code in your shell profile, instead.

```
if uwsm check may-start; then
    exec uwsm start hyprland.desktop
fi 
```


If you use a display manager, choose `hyprland (uwsm-managed)` entry in a display manager selection menu.


 

 {{< callout type=info >}}
 
 Pay attention to the warnings in [Environment variables](../../Environment-variables#xdg-specifications) and [Dispatchers](../../Dispatchers) sections.
 
 {{< /callout >}}
