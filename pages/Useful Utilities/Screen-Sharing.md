Screensharing is done through PipeWire on Wayland.

## Prerequsities

Make sure you have `pipewire` and `wireplumber` installed, enabled and running
if you don't have them yet.

## Screensharing

Read
[this amazing gist by PowerBall253](https://gist.github.com/PowerBall253/2dea6ddf6974ba4e5d26c3139ffb7580)
for a great tutorial.

## Better screensharing

See [the hyprland portal page](../Hyprland-desktop-portal)

## XWayland

If your screensharing application is running under XWayland (like Discord, Skype,...), it can only see other XWayland windows and cannot share an entire screen or a Wayland window.

The KDE-team has implemented a workaround for this called [xwaylandvideobridge](https://invent.kde.org/system/xwaylandvideobridge). There is currently an issue preventing it from working with Hyprland by default, but you can fix that by applying [this patch](https://aur.archlinux.org/cgit/aur.git/plain/cursor-mode.patch?h=xwaylandvideobridge-cursor-mode-2-git) or by using [this AUR package](https://aur.archlinux.org/packages/xwaylandvideobridge-cursor-mode-2-git).

Note that Hyprland currently doesn't support the way it tries to hide the main window, so you will have to create some window-rules to achieve the same effect. See [this issue](https://invent.kde.org/system/xwaylandvideobridge/-/issues/1) for more information. For example:
```ini
windowrulev2 = opacity 0.0 override 0.0 override,class:^(xwaylandvideobridge)$
windowrulev2 = noanim,class:^(xwaylandvideobridge)$
windowrulev2 = nofocus,class:^(xwaylandvideobridge)$
windowrulev2 = noinitialfocus,class:^(xwaylandvideobridge)$
```
