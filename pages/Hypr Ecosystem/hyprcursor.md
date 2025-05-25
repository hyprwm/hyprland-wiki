---
weight: 101
title: hyprcursor
---

hyprcursor is a new cursor theme format that has many advantages
over the widely used xcursor.

## Hyprcursor themes

You will need to obtain those yourself. If you are on the Discord server, see
`#hyprcursor-themes`.

Put your theme(s) in `~/.local/share/icons` or `~/.icons`

{{< callout type=warning >}}

It's not recommended to put cursor themes in system-wide `/usr/share/icons` due
to potential permission issues.

{{< /callout >}}

You can set your theme with envvars, or with `hyprctl setcursor`.

Env:

- `HYPRCURSOR_THEME` controls the theme.
- `HYPRCURSOR_SIZE` controls the cursor size.

example snippet of `hyprland.conf`:

```ini
env = HYPRCURSOR_THEME,MyCursor
env = HYPRCURSOR_SIZE,24
```

## Creating / Porting Themes

For creating your cursor using hyprcursor-util, follow the instructions below.

1. Get or download a xcursor, e.g., from
[Bibata](https://github.com/ful1e5/Bibata_Cursor/releases)
You could download the
[Bibata-Modern-Ice.tar.xz](https://github.com/ful1e5/Bibata_Cursor/releases/download/v2.0.7/Bibata-Modern-Ice.tar.xz).

2. Extract it: `xz -d Bibata-Modern-Ice.tar.xz && tar -xvf Bibata-Modern-Ice.tar`

3. Now extract using hyprcursor-util: `hyprcursor-util --extract Bibata-Modern-Ice`,
which gives out `extracted_Bibata-Modern-Ice`.

4. Now edit the values of `name`, `description` and `version` on
`extracted_Bibata-Modern-Ice/manifest.hl`, version is for the cursor
you're creating not `hyprcursor-util` version. The values just depends on
what you want, just make sure the `name` is unique if you have other cursors.

Example:
```ini
name = Bibata-Modern-Ice
description = Modern curved edge white cursor
version = 2.0.7
cursors_directory = hyprcursors
```

5. Now create with `hyprcursor-util --create extracted_Bibata-Modern-Ice`
which from the example above would give out `theme_Bibata-Modern-Ice`.
To keep things simple, renaming would be good:
`mv -v theme_Bibata-Modern-Ice BibataModernIce`.

6. Now that it's ready, you can now move it
`mv -v BibataModernIce $HOME/.local/share/icons`,
for it to be recognized by the system as a cursor theme.

7. From the example, on your hyprland config you can now have:
```ini
env = HYPRCURSOR_THEME,BibataModernIce
env = HYPRCURSOR_SIZE,20
```

For this to take effect immediately, you could run `hyprctl setcursor BibataModernIce 20`

For more info go to the [hyprcursor repo](https://github.com/hyprwm/hyprcursor)

See the [docs/](https://github.com/hyprwm/hyprcursor/tree/main/docs) and [hyprcursor-util/](https://github.com/hyprwm/hyprcursor/tree/main/hyprcursor-util) directories for instructions.

## Important notes

Although many apps support server-side cursors (e.g. Qt, Chromium, Electron,
Hypr Ecosystem) some apps still don't (e.g. GTK).

Apps that do not support server-side cursors and hyprcursor will still fall back
to XCursor.

For those apps, you need to export `XCURSOR_THEME` and `XCURSOR_SIZE` to a valid
XCursor theme, and run `gsettings set org.gnome.desktop.interface cursor-theme
'THEME_NAME'` for gtk. If `gsettings` schemas are not available to you (e.g. on
NixOS you will get `No schemas installed`), you can run instead: `dconf write
/org/gnome/desktop/interface/cursor-theme "'THEME_NAME'"`.

If the app is a flatpak, run `flatpak override --filesystem=~/.themes:ro
--filesystem=~/.icons:ro --user` and put your themes in both `/usr/share/themes`
and `~/.themes`, and put your icons and XCursors in both `/usr/share/icons`
and `~/.icons`.

## I don't want to use hyprcursor

If you don't have any hyprcursor themes installed, Hyprland will fall back to XCursor, and use
whatever you define with `XCURSOR_THEME` and `XCURSOR_SIZE`.

## My cursor is a hyprland icon?

See [FAQ](../../FAQ)
