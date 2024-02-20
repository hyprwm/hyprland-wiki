---
weight: 10
title: Crashes and Bugs
---

## Getting the log

If you are in a TTY, and the hyprland session that crashed was the last one you
launched, the log will be printed with

```sh
cat /tmp/hypr/$(ls -t /tmp/hypr/ | head -n 1)/hyprland.log
```

feel free to save it to a file, save, copy, etc.

if you are in a Hyprland session, and you want the log of the last session, use

```sh
cat /tmp/hypr/$(ls -t /tmp/hypr/ | head -n 2 | tail -n 1)/hyprland.log
```

## Obtaining the Hyprland Crash Report

If you have `$XDG_CACHE_HOME` set, the crash report directory is
`$XDG_CACHE_HOME/hyprland`. If not, it's `$HOME/.cache/hyprland`.

Go to the crash report directory and you should find a file named
`hyprlandCrashReport[XXXX].txt` where `[XXXX]` is the PID of the process that
crashed.

Attach that file to your issue.

## Crashes at launch

Diagnose the issue by what is in the log:

- `sWLRBackend was NULL!` -> launch in the TTY and refer to the wlr logs in RED.
- `Monitor X has NO PREFERRED MODE, and an INVALID one was requested` -> your
  monitor is bork.
- Other -> see the coredump. Use `coredumpctl`, find the latest one's PID and do
  `coredumpctl info PID`.
- failing on a driver (e.g. `radeon`) -> try compiling with
  `make legacyrenderer`, if that doesn't help, report an issue.
- failing on `wlr-xxx` -> try compiling with `make legacyrenderer`, if that
  doesn't help, report an issue, and also refer to the TTY wlr logs in RED like
  in the first point.
- failing on `Hyprland` -> report an issue.

## Crashes not at launch

Report an issue on GitHub or on the Discord server.

## Bugs

First of all, **_READ THE [FAQ PAGE](../faq)_**

If your bug is not listed there, you can ask on the Discord server or open an
issue on GitHub.

## Building the Wayland stack with ASan

If requested, this is the deepest level of memory issue debugging possible.

_Do this in the tty, with no Hyprland instances running_

Clone hyprland: `git clone --recursive https://github.com/hyprwm/Hyprland`

`make asan`

Reproduce your crash. Hyprland will exit back to the tty.

Now, in either `cwd`, `~` or `./build`, search for file(s) named
`asan.log.XXXXX` where XXXXX is a number.

Zip all of them up and attach to your issue.
