---
weight: 100
title: hyprtoolkit
---

[hyprtoolkit](https://github.com/hyprwm/hyprtoolkit) is a GUI toolkit for developing applications that run natively on Wayland.  
It's specifically made for Hyprland's needs, but will generally run on any Wayland compositor
that supports modern standards.

For developer docs, see [development](./development)

## Configuration

The general toolkit config is at `~/.config/hypr/hyprtoolkit.conf`.  
It contains theming and some minor adjustments.

| Variable | Description | Type | Default |
| --- | --- | --- | --- |
| `background` | Background color. | color | `FF181818` |
| `base` | Base color. | color | `FF202020` |
| `text` | Text color. | color | `FFDADADA` |
| `alternate_base` | Alternative base color. | color | `FF272727` |
| `bright_text` | Bright text color. | color | `FFFFDEDE` |
| `accent` | Accent color. | color | `FF00FFCC` |
| `accent_secondary` | Secondary accent color. | color | `FF0099F0` |
| `h1_size` | Font size for H1. | int | `19` |
| `h2_size` | Font size for H2. | int | `15` |
| `h3_size` | Font size for H3. | int | `13` |
| `font_size` | Font size for regular text elements. | int | `11` |
| `small_font_size` | Font size for small text elements. | int | `10` |
| `icon_theme` | Name of the icon theme to use, empty for "the first found". | string | _empty_ |
| `font_family` | Name of the font family to use. | string | `Sans Serif` |
| `font_family_monospace` | Name of the monospace font family to use. | string | `monospace` |