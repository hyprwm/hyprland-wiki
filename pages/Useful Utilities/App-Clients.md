Some clients are known for being a massive pain under Wayland. Here are great
replacements for them:

## Discord

[WebCord](https://github.com/SpacingBat3/WebCord) is a Discord client based on
the latest Electron, with support for Wayland Ozone platform, as well as
PipeWire screensharing. It has tons of great features and tries not to infringe
on the Discord ToS.

## Spotify

It has been reported that Spotify does not follow window rules. This is possibly
because the client sets is class _after_ the window has opened, thus making it "immune"
to windowrules. An alternative to Spotify's GUI client is
[spotify-tui](https://github.com/Rigellute/spotify-tui) which can be launched in a terminal
with a custom class. While limited in functionality, it is quite powerful and could be
preferred over the GUI client if windowrules are a dealbreaker for you.

Some users have also reported [installing spotifywm](https://github.com/amurzeau/spotifywm) has resolved
the issue. The original repository by [`dasJ`](https://github.com/dasJ/spotifywm) is no longer working because of some changes made in the newer
Spotify version , and until the pull request gets merged, [`amurzeau`](https://github.com/amurzeau/spotifywm)'s fork does the job.

After following the installation paragraph on the README, start Spotify with:
```bash
LD_PRELOADER=/path/to/spotifywm.so spotify
```
The path **MUST** be the absolute one. If it's not, the hack will not work.

Pick your poison.
