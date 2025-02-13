---
weight: 7
title: hyprsunset
---

hyprsunset is a small utility to provide a blue light filter
for your system.

This method is preferred to screen shaders as it will _not_ be captured via recording / screenshots.

hyprsunset also provides a gamma filter, which can be used to
adjust percieved display brightness on monitors that do not
support software control, or to reduce percieved brightness
below the monitor's minimum.

{{< callout type=warning >}}

`hyprsunset` is supported since Hyprland 0.45.0.

{{< /callout >}}

## Installation

`yay -S hyprsunset`

## Usage

See `hyprsunset --help`.

## IPC

`hyprsunset` supports IPC via hyprctl. Both color temperature and the gamma filter are adjustable:
```sh
# Enable blue-light filter
hyprctl hyprsunset temperature 2500
# Disable blue-light filter
hyprctl hyprsunset identity

# Set gamma to 50%
hyprctl hyprsunset gamma 50
# Increase gamma by 10%
hyprctl hyprsunset gamma +10
```

This can be used by other software to change the temperature throughout the day, or to adjust perceieved
monitor brightness, such as with the following Hyprland keybinds:
```ini
bindel = ,XF86MonBrightnessDown, exec, hyprctl hyprsunset gamma -10
bindel = ,XF86MonBrightnessUp, exec, hyprctl hyprsunset gamma +10
```
