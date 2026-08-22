---
weight: 50
title: Screenshots and recording
---

This page lists commonly used tools for taking screenshots and recording the screen on Hyprland.

## Screenshot utilities

### Grim and swappy

[Grim](https://gitlab.freedesktop.org/emersion/grim) is a simple Wayland screenshot tool.
It is commonly used with [`slurp`](https://github.com/emersion/slurp) for area selection and [`swappy`](https://github.com/jtheoof/swappy) for annotations.

{{% details title="Examples" closed="true" %}}

```lua
-- Select an area and open it in `swappy`:
hl.bind("Print", hl.dsp.exec_cmd('grim -g "$(slurp)" - | swappy -f -'))

-- Copy a selected area directly to the clipboard, install [`wl-clipboard`](https://github.com/bugaevc/wl-clipboard) and use:
hl.bind("SUPER + Print", hl.dsp.exec_cmd('grim -g "$(slurp -d)" - | wl-copy'))
```

{{% /details %}}

### Satty

[Satty](https://github.com/Satty-org/Satty) is a powerful and modern screenshot annotation tool inspired by [`swappy`](https://github.com/jtheoof/swappy) and [Flameshot](https://github.com/flameshot-org/flameshot).
It's been created to provide improvements over existing screenshot tools and is an almost drop-in replacement for swappy.

For example, to take a screenshot and open it with `satty`, Ctrl-C to copy to clipboard and Ctrl-S to save it to `~/Pictures/Screenshots/`:

```lua
hl.bind("Print", hl.dsp.exec_cmd('grim - | satty -f - --copy-command wl-copy -o "~/Pictures/Screenshots/%Y%m%d_%H%M%S.png"'))
```

### Waytator

[Waytator](https://github.com/faetalize/waytator) is a screenshot annotator and lightweight image editor made in C.

```lua
hl.bind("Print", hl.dsp.exec_cmd("grim -t ppm - | waytator"))
```

### Flameshot

[Flameshot](https://github.com/flameshot-org/flameshot) is a screenshot tool with a built-in annotation UI.
On Wayland, it relies on portal support for screen capture.
If it cannot capture the screen, make sure your desktop portal setup is working or use `grim` with `swappy` instead.

### HyprCapture

[HyprCapture](https://github.com/gfhdhytghd/HyprCapture) is a Hyprland-oriented screenshot and recording utility.
It is useful if you want a workflow that is integrated with Hyprland instead of wiring several smaller tools together.

### WeChat screenshot

WeChat has its own screenshot shortcut.
If Hyprland catches the keybind first, WeChat will not receive it unless the keybind is explicitly passed to the WeChat window.

Use the `pass` dispatcher to forward `ALT + A` to WeChat:

```lua
hl.bind("ALT + A", hl.dsp.pass({ class = "wechat" }))
```

## Recording utilities

If capture tools are blocked by Hyprland's permission system, see [Permissions](../../configuring/core/advanced-configuration/permissions).

### OBS Studio

[OBS Studio](https://obsproject.com/) can record the screen through PipeWire and the desktop portal.
Make sure `pipewire`, `wireplumber`, [`xdg-desktop-portal-hyprland`](../../hypr-ecosystem/user/xdg-desktop-portal-hyprland) and `qt6-wayland` are installed.
See [Screen sharing](../screen-sharing) for portal setup notes.

### wf-recorder

[wf-recorder](https://github.com/ammen99/wf-recorder) is a lightweight Wayland screen recorder.

{{% details title="Examples" closed="true" %}}

```sh
# Record the whole screen:
wf-recorder -f ~/Videos/recording.mp4

# Record a selected region:
wf-recorder -g "$(slurp)" -f ~/Videos/recording.mp4
```

{{% /details %}}

### wl-screenrec

[wl-screenrec](https://github.com/russelltg/wl-screenrec) is a high performance wlroots screen recording, featuring hardware encoding

{{% details title="Examples" closed="true" %}}

```sh
# Record the whole screen:
wl-screenrec -f ~/Videos/recording.mp4

# Record a selected region:
wl-screenrec -g "$(slurp)" -f ~/Videos/recording.mp4

```
{{% /details %}}

### GPU Screen Recorder

[GPU Screen Recorder](https://git.dec05eba.com/gpu-screen-recorder/about/) is a screen recorder that has minimal impact on system performance by recording your monitor using the GPU only, similar to shadowplay on windows.

```sh
# Record the whole screen with audio in 60 FPS:
gpu-screen-recorder -w screen -f 60 -a default_output -o ~/Videos/recording.mp4
```
