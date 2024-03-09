hyprcursor is a new cursor theme format that has many advantages
over the widely used xcursor.

## Hyprcursor themes

You will need to obtain those yourself. If you are on the discord server, see `#hyprcursor-themes`.

Put your theme(s) in `~/.local/share/icons` or `~/.icons`

You can set your theme with envvars, or with `hyprctl setcursor`.

Env:
 - `HYPRCURSOR_THEME` controls the theme.
 - `HYPRCURSOR_SIZE` controls the cursor size.

example snippet of `hyprland.conf`:

```ini
env = HYPRCURSOR_THEME,MyCursor
env = HYPRCURSOR_SIZE,24
```