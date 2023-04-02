Some clients are known for being a massive pain under Wayland. Here are great
replacements for them:

## Discord

- [WebCord](https://github.com/SpacingBat3/WebCord) is a Discord client based on
the latest Electron, with support for Wayland Ozone platform, as well as
PipeWire screensharing. It has tons of great features and tries not to infringe
on the Discord ToS.

- [gtkcord4](https://github.com/diamondburned/gtkcord4) is a Discord client written in GTK4.
While it does infringe on Discord's ToS, it's relatively safe and doesn't rely on any webview technologies.

## Spotify

Spotify does not follow window rules. This is because the client sets its class _after_
the window has opened, thus making it "immune" to windowrules. An alternative to
Spotify's GUI client is [spotify-tui](https://github.com/Rigellute/spotify-tui) which can be
launched in a terminal with a custom class. While limited in functionality, it is quite
powerful and could be preferred over the GUI client. Another alternative is [ncspot](https://github.com/hrkfdn/ncspot), a powerful cross-platform ncurses Spotify client written in Rust.

Some users have also reported [installing spotifywm](https://github.com/dasJ/spotifywm) has resolved
the issue.

After following the installation paragraph on the README, start Spotify with:

```bash
LD_PRELOAD=/path/to/spotifywm.so spotify
```

The path **MUST** be the absolute one. If it's not, the hack will not work.

Now you can freely manage your Spotify client. Always use `class` to manage the 
window. For example:

```ini
windowrulev2 = tile, class:^(Spotify)$
windowrulev2 = workspace 9, class:^(Spotify)$
```

Pick your poison. 

## Matrix/Element

[Fractal](https://wiki.gnome.org/Apps/Fractal) is a Matrix client written in GTK4.
Much like Discord, Element is known to have a lot of problems as a result of being
based on Electron. Fractal currently doesn't support VoIP calling, but all other features
are supported, including E2EE and cross-device verification.
