hyprcursor is a new cursor theme format that has many advantages
over the widely used xcursor.

## Hyprcursor themes

You will need to obtain those yourself. If you are on the discord server, see `#hyprcursor-themes`.

Put your theme(s) in `~/.local/share/icons` or `~/.icons`

{{< callout type=warning >}}

It's not recommended to put cursor themes in system-wide `/usr/share/icons` due to
potential permission issues.

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

Go to the [hyprcursor repo](https://github.com/hyprwm/hyprcursor)

See the `docs/` and `hyprcursor-util/` directories for instructions.

## Important notes

Although many apps support server-side cursors (e.g. qt, chromium, electron, hypr ecosystem)
some apps still don't (like gtk)

Apps that do not support server-side cursors and hyprcursor will still fall back to XCursor.

For those apps, you need to export `XCURSOR_THEME` and `XCURSOR_SIZE` to a valid XCursor theme,
and run `gsettings set org.gnome.desktop.interface cursor-theme 'THEME_NAME'` for gtk.

If the app is a flatpak, run `flatpak override --env=~/.themes:ro --env=~/.icons:ro --user` and put
your themes in both `/usr/share/themes` and `~/.themes`, and put your
icons and XCursors in both `/usr/share/icons` and `~/.icons`.

## I don't want to use hyprcursor

If you don't have any hyprcursor themes installed, hyprland will fall back to XCursor, and use
whatever you define with `XCURSOR_THEME` and `XCURSOR_SIZE`.