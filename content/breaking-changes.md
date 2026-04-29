---
title: Breaking changes
weight: 1
---

## 10.04.2025

with https://github.com/hyprwm/Hyprland/pull/9945 `cursor:warp_on_change_workspace` no longer controls warps for special workspaces. Use  `warp_on_toggle_special` for more fine control.

[Source](https://github.com/hyprwm/Hyprland/issues/8424#issuecomment-2792673580)

## 18.03.2025

with https://github.com/hyprwm/Hyprland/commit/ec4bea7901bdb1f36d33354c02e36d7e03b1ac1e windowrule v1 syntax is nuked. `windowrule` and `windowrulev2` will behave the same (v2) and `windowrulev2` is deprecated in favor of `windowrule`

[Source](https://github.com/hyprwm/Hyprland/issues/8424#issuecomment-2731363425)

## 14.03.2025

with #9437 `render:allow_early_buffer_release` is gone. It's not needed anymore.

[Source](https://github.com/hyprwm/Hyprland/issues/8424#issuecomment-2724826338)

## 31.01.2025

with https://github.com/hyprwm/Hyprland/pull/9217 `opengl:force_introspection` is gone.

[Source](https://github.com/hyprwm/Hyprland/issues/8424#issuecomment-2627706895)

## 30.12.2024

With https://github.com/hyprwm/Hyprland/pull/8871 `master:always_center_master` has been replaced with a more flexible `master:slave_count_for_center_master`

[Source](https://github.com/hyprwm/Hyprland/issues/8424#issuecomment-2564862718)

## 27.12.2024

With https://github.com/hyprwm/Hyprland/pull/8812, hyprland now depends on [glaze](https://github.com/stephenberry/glaze)

[Source](https://github.com/hyprwm/Hyprland/issues/8424#issuecomment-2563764189)

## 16.12.2024

With the move to RE2, your regexes now require a full match instead of any match.

For example, in the case of `jeremy`:
 - `jeremy`: OK
 - `^(jeremy)$`: OK
 - `jer`: Used to match, now won't. You'll need to do `.*jer.*` to make it act like before. (Consider _not_ doing that though, make a better regex.) 

[Source](https://github.com/hyprwm/Hyprland/issues/8424#issuecomment-2546828791)

## 16.12.2024

with #8736 hyprland now depends on re2

[Source](https://github.com/hyprwm/Hyprland/issues/8424#issuecomment-2546335475)

## 03.12.2024

with https://github.com/hyprwm/Hyprland/pull/8635 hyprland now depends on hyprgraphics>=0.1.1

[Source](https://github.com/hyprwm/Hyprland/issues/8424#issuecomment-2515601448)

## 14.11.2024

With https://github.com/hyprwm/Hyprland/pull/8399, `dumb_copy` is now gone in favor of `cursor:use_cpu_buffer`. This should allow Nvidia users to have hardware cursors without the hitches dumb copy would cause.

Please note it's a bit experimental atm

[Source](https://github.com/hyprwm/Hyprland/issues/8424#issuecomment-2477328413)

## 11.11.2024

For people that have been using `hyprland-systemd.desktop` to launch Hyprland as a systemd service:
We have removed the systemd session file, and replaced it with the more complete approach of using [uwsm](https://github.com/Vladimir-csp/uwsm) to handle the session. There's a new session file called `hyprland-uwsm.desktop`. Follow the [wiki instructions](https://wiki.hyprland.org/Useful-Utilities/Systemd-start/) to set up uwsm, and everything will work just fine.

(NixOS users, we'll have you covered soon too. In the meantime, take a look at [my](https://github.com/fufexan/dotfiles/commit/a6084b9eec934ab9cbb452eb9accd2c20bb38444) [dots](https://github.com/fufexan/dotfiles/commit/b946c18a1232e9529b28348a131faeb7f85668a3) if you want to use uwsm)

For the technically inclined, here are the discussions that led to this change:
- https://github.com/hyprwm/Hyprland/pull/8339
- https://github.com/hyprwm/Hyprland/pull/8376
- https://github.com/hyprwm/hyprland-wiki/pull/850

[Source](https://github.com/hyprwm/Hyprland/issues/8424#issuecomment-2468421611)
