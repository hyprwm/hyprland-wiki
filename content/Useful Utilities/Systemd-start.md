---
weight: 12
title: Systemd startup
---

## UWSM

- [Universal Wayland Session Manager](https://github.com/Vladimir-csp/uwsm) wraps standalone Wayland compositors into a set of Systemd units and provides robust session management including environment, XDG autostart support, bi-directional binding with login session, and clean shutdown.

Please note uwsm is for advanced users and has its issues and additional quirks.

### Installation

{{% details title="Arch" closed="true" %}}

uwsm is available in Arch official repositories.

```sh
pacman -S uwsm libnewt
```

{{% /details %}}

{{% details title="Nix/NixOS" closed="true" %}}

```nix
{
  programs.hyprland.withUWSM  = true;
}
```

The above option generates a new desktop entry, `hyprland-uwsm.desktop`, which will be available in display managers.

For more info, read the [option](https://search.nixos.org/options?channel=unstable&show=programs.uwsm.enable&from=0&size=50&sort=relevance&type=packages&query=uwsm).

> [!WARNING]
> If you use the [Home Manager module](../../Nix/Hyprland-on-Home-Manager), make sure to disable the systemd integration, as it conflicts with uwsm.
> 
> ```nix
> {
>   wayland.windowManager.hyprland.systemd.enable = false;
> }
> ```

{{% /details %}}

> [!NOTE]
> For instructions for other distros and manual building, see [building and installing](https://github.com/Vladimir-csp/uwsm?tab=readme-ov-file#installation) section on the project's page.

### Launching Hyprland with uwsm

> [!NOTE]
> Pay attention to the warnings in [Environment variables](../../Configuring/Advanced-and-Cool/Environment-variables), [Multi-GPU](../../Configuring/Advanced-and-Cool/Multi-GPU) and [Dispatchers](../../Configuring/Basics/Dispatchers) sections.

#### In tty

{{% details title="GNOME Keyring PAM setup" closed="true" %}}

When launching from a tty instead of a display manager, some session integrations that display managers normally handle may not be configured. One common example is [GNOME Keyring](https://wiki.gnome.org/Projects/GnomeKeyring) - if `pam_gnome_keyring.so` is not present in your PAM login configuration, the keyring will not auto-unlock, and applications may prompt you to unlock it manually.

To set this up, add the `pam_gnome_keyring.so` lines to the PAM configuration file used by your login method (e.g. `/etc/pam.d/login` for `login(1)`). Consult your distribution's documentation for the correct file and syntax. For example, on Arch Linux:

```ini {hl_lines=[5,8,10]}
#%PAM-1.0

auth       requisite    pam_nologin.so
auth       include      system-local-login
-auth      optional     pam_gnome_keyring.so
account    include      system-local-login
password   include      system-local-login
-password  optional     pam_gnome_keyring.so    use_authtok
session    include      system-local-login
-session   optional     pam_gnome_keyring.so    auto_start
```

Display managers (GDM, SDDM, etc.) typically include this PAM configuration already. This step is only needed for console-based (tty) login.

{{% /details %}}

To launch Hyprland with uwsm, add this code in your shell profile.

```
if uwsm check may-start && uwsm select; then
	exec uwsm start default
fi
```

This will bring uwsm compositor selection menu after you log in tty1. Choose `Hyprland` entry and you're good to go.

If you want to bypass compositor selection menu and launch Hyprland directly, use this code in your shell profile, instead.

```
if uwsm check may-start; then
    exec uwsm start hyprland.desktop
fi
```

#### Using a display manager

If you use a display manager, choose `Hyprland (uwsm-managed)` entry in a display manager selection menu.

### Launching applications inside session

The concept of a session managed by Systemd implies also running applications as units. Uwsm [provides](https://github.com/Vladimir-csp/uwsm#3-applications-and-slices) a helper to do it. Running applications as child processes inside compositor's unit is discouraged.

Prefix application startup commands with `uwsm app --`. It also supports launching Desktop Entries by IDs or paths. See `man uwsm` or `uwsm app --help`.

Faster alternatives are: 
- `uwsm-app`: a shell client working with on-demand daemon, optional part of uwsm.
- `app2unit`: ([link](https://github.com/Vladimir-csp/app2unit)), pure shell alternative, file opener, usually ahead on features.
- `runapp`: ([link](https://github.com/c4rlo/runapp/)), C++ alternative, even faster, features may vary.

## hyprland-session.target

This previously required manual setup, but is now integrated into Hyprland and handled automatically. If you have a custom `hyprland-session.target` taken from a previous version of this article, it can be cleaned up via `systemctl --user revert hyprland-session.target`. Also, any leftover `systemctl` commands in your config, such as the following, should be *removed*:

```lua
hl.on("hyprland.start", function()
    hl.exec_cmd("systemctl --user start hyprland-session.target")
end)

hl.on("hyprland.shutdown", function()
    os.execute("systemctl --user stop graphical-session.target")
end)
```

> [!NOTE]
> Under Systemd, a single user is not expected to have multiple graphical sessions (i.e. compositors) running simultaneously. If you do this, note that exiting one Hyprland instance will stop `graphical-session.target` and may impact your other remaining sessions.
> Setting `HYPRLAND_NO_SD_TARGET` will avoid this, but also prevent *starting* `hyprland-session.target` and `graphical-session.target` in the first place. You may want to adopt some variation of the lua event listeners above in order to make your session behave as desired.

## Autostart

XDG Autostart is handled by systemd, and its target is activated in uwsm-managed session automatically. User services usually require `graphical-session.target` to be activated by any method on this page.

Some applications provide native systemd user units to be autostarted with. Those might need to be enabled explicitly via `systemctl --user enable [some-app.service]`. Or, in case the unit is missing `[Install]` section, enabled more directly: `systemctl --user add-wants graphical-session.target [some-app.service]`. Also ensure the unit has `After=graphical-session.target` ordering (it can be added via drop-in).

For example, instead of having `hl.exec_cmd("hyprpaper")` in your config, simply run `systemctl --user enable hyprpaper.service` once and have systemd launch it for you from now on.

More autostart-related examples and tricks can be found [here](https://github.com/Vladimir-csp/uwsm/tree/master/example-units).
