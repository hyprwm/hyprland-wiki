# Getting the log

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

# Crashes at launch

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

# Crashes not at launch

Report an issue on GitHub or on the Discord server.

# Bugs

First of all, **_READ THE [FAQ PAGE](../FAQ)_**

If your bug is not listed there, you can ask on the Discord server or open an
issue on GitHub.

# Building the Wayland stack with ASan

If requested, this is the deepest level of memory issue debugging possible.

Prepare yourself mentally, and then:

recommended to do in tty

clone wayland (`git clone --recursive https://gitlab.freedesktop.org/wayland/wayland`)
clone hyprland (`git clone --recursive https://github.com/hyprwm/Hyprland`)

edit your config to have a terminal that will launch:
```
bind = SUPER, Q, exec, LD_PRELOAD=/usr/lib/libasan.so kitty
```
(I put kitty, on `SUPER+Q` can be anything)

add this env to reset ASAN_OPTIONS for children:
```
env = ASAN_OPTIONS,
```

wayland:
```
meson ./build --prefix=/usr --buildtype=debug -Db_sanitize=address
sudo ninja -C build install
```

hyprland:
```
cmake --no-warn-unused-cli -DCMAKE_BUILD_TYPE:STRING=Debug -DWITH_ASAN:STRING=True -S . -B ./build -G Ninja
cmake --build ./build --config Debug --target all -j`nproc 2>/dev/null || getconf NPROCESSORS_CONF`
cd ./subprojects/wlroots
rm -rf ./build
meson ./build --prefix=/usr --buildtype=debug -Db_sanitize=address
ninja -C build
cd ../..
sudo make install
```

Exit Hyprland to a TTY, cd to the cloned hyprland, and launch it:
```
ASAN_OPTIONS="detect_odr_violation=0,log_path=asan.log" ./build/Hyprland -c ~/.config/hypr/hyprland.conf
```

open your terminal

to open any app just add `LD_PRELOAD=/usr/lib/libasan.so` to the beginning of the cmd

Do whatever you used to do in order to crash the compositor.

Go to `~` or `cwd` and look for `asan.log.XXXXX` files. Zip all and attach to the issue.

once you are done, to revert your horribleness of no app opening without the ld preload just go to the cloned wayland and do
```
sudo rm -rf ./build
meson ./build --prefix=/usr --buildtype=release
sudo ninja -C build install
```

To revert the changes to hyprland and wlroots, do inside the cloned hyprland:
```
make all && sudo make install
```