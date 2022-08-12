# Foreword

Nvidia GPUs are widely known as... yeah. If you want to try Hyprland on Nvidia
regardless (many people have reported successes), follow the
[Nvidia page](https://github.com/hyprwm/Hyprland/wiki/Nvidia) after installing
Hyprland.

### Distros

Arch and NixOS are very supported. For any other distro (not based on Arch/Nix)
you might have varying amounts of success. However, since Hyprland is extremely
bleeding-edge, distros like Pop!\_OS, Ubuntu, etc. might have **major** issues
running Hyprland.

# Installation

Installing Hyprland is very easy. Either you install it from your local package
provider (if they provide pkgs for Hyprland) or you install/build it yourself.

{{\< hint title=Note >}} This project is under development and is constantly
changing. If you want to keep up to date with the latest commits, please
consider updating your packages with `yay -Syu --devel`, or your other preferred
package manager. {{\< /hint >}}

## Packages

**WARNING:** I do not maintain any packages. If they are broken, try building
from source first.

{{\< tabs "uniqueid" >}}

{{\< tab "Arch Linux" >}} *If you're on Arch Linux, I* ***heavily*** *recommend
you use the AUR.*

```plain
hyprland-git - compiles from latest source
hyprland - compiles from latest release source
hyprland-bin - compiled latest release
```

{{\< /tab >}}

{{\< tab "Nix" >}}Read the
[Nix page](https://github.com/hyprwm/Hyprland/wiki/Nix).{{\< /tab >}} {{\< tab
"Fedora" >}}<https://github.com/hyprwm/Hyprland/discussions/284>{{\< /tab >}}
{{\< /tabs >}}

## Manual (Releases)

Download the most recent release.

copy the binary (Hyprland) to `/usr/bin/`.

copy hyprctl to `/usr/bin/`.

copy the wlroots .so (`wlroots.so.XX032`) to `/usr/lib/`.

copy the desktop entry (`examples/Hyprland.desktop`) to
`/usr/share/wayland-sessions/`

the example config is in `examples/Hyprland.conf`.

For updating later on, you can overwrite the binaries (hyprctl, hyprland and
libwlroots), you don't need to update anything else.

## Manual (Manual Build)

*Arch dependencies*:

```plain
yay -S gdb ninja gcc cmake libxcb xcb-proto xcb-util xcb-util-keysyms libxfixes libx11 libxcomposite xorg-xinput libxrender pixman wayland-protocols cairo pango
```

(If any are missing hmu)

Please note Hyprland builds `wlroots`. Make sure you have the dependencies of
wlroots installed, you can make sure you have them by installing wlroots
separately (Hyprland doesn't mind)

Also note that Hyprland uses the C++23 standard, so your compiler has to support
that (`gcc>=12.1.0` or `clang>=15`)

### CMake (recommended)

```Plain
git clone --recursive https://github.com/hyprwm/Hyprland
cd Hyprland
sudo make install
```

### Meson

```plain
meson _build
ninja -C _build
ninja -C _build install
```

Refer to [Debugging](../../Contributing-and-Debugging) to see how to build &
debug.

## Crash on launch

See the log, `cat /tmp/hypr/[INSTANCE_SIGNATURE]/hyprland.log`

*If you are unsure of the signature, grab the one that's the most recently
modified.*

Diagnose the issue by what is in the log:

- `sWLRBackend was NULL!` -> launch in the TTY and refer to the wlr logs in RED.
- `Monitor X has NO PREFERRED MODE, and an INVALID one was requested` -> your
  monitor is borked.
- Other -> see the coredump. Use `coredumpctl`, find the latest one's PID and do
  `coredumpctl info PID`.
- failing on a driver (e.g. `radeon`) -> try compiling with
  `make legacyrenderer`. If that doesn't help, report an issue.
- failing on `wlr-xxx` -> try compiling with `make legacyrenderer`. If that
  doesn't help, report an issue, and also refer to the TTY wlr logs in RED like
  in the first point.
- failing on `Hyprland` -> report an issue.

## Custom installation (legacy renderer, etc)

cd into the hyprland repo.

for legacy renderer:

```plain
sudo make clear && sudo make config && make legacyrenderer && sudo cp ./build/Hyprland /usr/bin && sudo cp ./example/hyprland.desktop /usr/share/wayland-sessions
```

_please note the legacy renderer may not support some graphical features._
<br/><br/> Any other config: (replace \[PRESET\] with your preset, `release`
`debug` `legacyrenderer` `legacyrendererdebug`)

```plain
sudo make clear && sudo make config && make [PRESET] && sudo cp ./build/Hyprland /usr/bin && sudo cp ./example/hyprland.desktop /usr/share/wayland-sessions
```

## Custom Build flags

To apply custom build flags, you'll have to ditch make.

Supported custom build flags:

```plain
NO_XWAYLAND - Removes XWayland support
```

How to?

Go to the root repo.

Clean before everything and config the root:

```plain
make clear && sudo make config
```

Then, configure CMake:

```plain
mkdir -p build && cmake --no-warn-unused-cli -DCMAKE_BUILD_TYPE:STRING=Release -D<YOUR_FLAG>:STRING=true -H./ -B./build -G Ninja
```

Change `<YOUR_FLAG>` to one of the custom build flags. You **are allowed to**
use multiple at once, then add another `-D<YOUR_FLAG_2>:STRING=true`

You can of course also change the `BUILD_TYPE` to `Debug`.

Now, build:

```plain
cmake --build ./build --config Release --target all -j 10
```

If you configured in `Debug`, change the `--config` to `Debug` as well.

Now, of course, install manually.

```plain
sudo cp ./build/Hyprland /usr/bin && sudo cp ./example/hyprland.desktop /usr/share/wayland-sessions
```

# Launching

You can launch Hyprland by either going into a TTY and executing `Hyprland`, or
with a login manager.

**!IMPORTANT**: Do **not** launch Hyprland with `root` permissions (don't
`sudo`)

Login managers are not officially supported, but here's a short compatibility
list:

- SDDM → Works flawlessly
- GDM → Works with the caveat of crashing Hyprland on the first launch
- ly → Works with minor to major issues and/or caveats
