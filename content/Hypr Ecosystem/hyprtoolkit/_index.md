---
weight: 100
title: hyprtoolkit
---

Hyprtoolkit is a GUI toolkit for developing applications that run natively on Wayland.
It's specifically made for Hyprland's needs, but will generally run on any Wayland compositor
that supports modern standards.

For developer docs, see [development](./development)

## Configuration

The general toolkit config is at `~/.config/hypr/hyprtoolkit.conf`. It contains theming and some minor adjustments.

| variable | description | type | default |
| --- | --- | --- | --- |
| background | background color | color | FF181818 |
| base | base color | color | FF202020 |
| text | text color | color | FFDADADA |
| alternate_base | alternative base color | color | FF272727 |
| bright_text | bright text color | color | FFFFDEDE |
| accent | accent color | color | FF00FFCC |
| accent_secondary | secondary accent color | color | FF0099F0 |
| h1_size | font size for H1 | int | 19 |
| h2_size | font size for H2 | int | 15 |
| h3_size | font size for H3 | int | 13 |
| font_size | font size for regular text elements | int | 11 |
| small_font_size | font size for small text elements | int | 10 |
| icon_theme | name of the icon theme to use, empty for "the first found" | string | empty |
