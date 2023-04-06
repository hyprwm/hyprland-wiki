# Foreword

Due to their proprietary nature, Nvidia GPUs have limited compatibility with
Hyprland. If you want to try Hyprland on Nvidia regardless
(many people have reported successes), follow the [Nvidia page](../../Nvidia)
after installing Hyprland.

## Distros

Arch, NixOS and openSUSE Tumbleweed are very supported. For any other distro
(not based on Arch/Nix) you might have varying amounts of success. However,
since Hyprland is extremely bleeding-edge, distros like Pop!\_OS, Ubuntu, etc.
might have **major** issues running Hyprland.

## Installation

Installing Hyprland is very easy. Either you install it from your local package
provider (if they provide pkgs for Hyprland) or you install/build it yourself.

{{< hint title=note >}}
This project is under development and is constantly
changing. If you want to keep up to date with the latest commits, please
consider updating your packages with `yay -Syu --devel`, or your other preferred
package manager.
{{< /hint >}}

### Packages

**WARNING:** I do not maintain any packages. If they are broken, try building
from source first.

{{< tabs "uniqueid" >}}

{{< tab "Arch Linux" >}}
```plain
hyprland-git (AUR) - compiles from latest source
hyprland - binary x86 tagged release
```

{{< /tab >}}
{{< tab "Nix" >}}Read the [Nix page](../../Nix).{{< /tab >}}
{{< tab "openSUSE" >}}
There are [precompiled packages of Hyprland](https://build.opensuse.org/package/show/X11:Wayland/hyprland)
available in the [X11:Wayland](https://build.opensuse.org/project/show/X11:Wayland) project on OBS.

To install them, follow the instructions at [software.opensuse.org/download.html?project=X11:Wayland&package=hyprland](https://software.opensuse.org//download.html?project=X11%3AWayland&package=hyprland) or use [OPI](https://github.com/openSUSE/opi) to install it.

```sh
opi hyprland
```

Alternatively, you can also follow the instructions under ["Manual (Manual Build)"](#manual-manual-build)
to build Hyprland yourself.

Note: _Hyprland is not available for Leap, as most libraries (and compiler) that Hyprland needs are too old._
{{< /tab >}}
{{< tab "Fedora" >}}<https://github.com/hyprwm/Hyprland/discussions/284>{{< /tab >}}
{{< tab "Gentoo" >}}
The hyprland package is available in the [guru](https://wiki.gentoo.org/wiki/Project:GURU) overlay.

```sh
eselect repository enable guru
emaint sync -r guru
emerge --ask --verbose hyprland
```

{{</ tab >}}
{{< tab "FreeBSD" >}}
Hyprland and related are in the default repository:
- [hyprland](https://www.freshports.org/x11-wm/hyprland)
- [hyprpaper](https://www.freshports.org/x11/hyprpaper)
- [hyprpicker](https://www.freshports.org/x11/hyprpicker)
- [xdg-desktop-portal-hyprland](https://www.freshports.org/x11/xdg-desktop-portal-hyprland)
- [Other Wayland stuff](https://www.freshports.org/wayland/)
{{</ tab >}}

{{< /tabs >}}

### Manual (Releases, Linux-only)

Download the most recent release.

copy the binary (Hyprland) to `/usr/bin/`.

copy hyprctl to `/usr/bin/`.

copy the wlroots .so (`libwlroots.so.XX032`) to `/usr/lib/`.

copy the desktop entry (`examples/hyprland.desktop`) to
`/usr/share/wayland-sessions/`

the example config is in `examples/hyprland.conf`.

For updating later on, you can overwrite the binaries (hyprctl, hyprland and
libwlroots), you don't need to update anything else.

### Manual (Manual Build)

_Arch dependencies_:

```plain
yay -S gdb ninja gcc cmake meson libxcb xcb-proto xcb-util xcb-util-keysyms libxfixes libx11 libxcomposite xorg-xinput libxrender pixman wayland-protocols cairo pango seatd libxkbcommon xcb-util-wm xorg-xwayland libinput libliftoff libdisplay-info
```

_(Please make a pull request or open an issue if any packages are missing from the list)_

_openSUSE dependencies_:

```sh
zypper in gcc-c++ git meson cmake "pkgconfig(cairo)" "pkgconfig(egl)" "pkgconfig(gbm)" "pkgconfig(gl)" "pkgconfig(glesv2)" "pkgconfig(libdrm)" "pkgconfig(libinput)" "pkgconfig(libseat)" "pkgconfig(libudev)" "pkgconfig(pango)" "pkgconfig(pangocairo)" "pkgconfig(pixman-1)" "pkgconfig(vulkan)" "pkgconfig(wayland-client)" "pkgconfig(wayland-protocols)" "pkgconfig(wayland-scanner)" "pkgconfig(wayland-server)" "pkgconfig(xcb)" "pkgconfig(xcb-icccm)" "pkgconfig(xcb-renderutil)" "pkgconfig(xkbcommon)" "pkgconfig(xwayland)" glslang-devel Mesa-libGLESv3-devel "pkgconfig(xcb-errors)"
```

(this should also work on RHEL/Fedora if you remove `Mesa-libGLESv3-devel` and `pkgconfig(xcb-errors)`)

_FreeBSD dependencies_:

```plain
pkg install git pkgconf gmake gcc evdev-proto cmake wayland-protocols wayland libglvnd libxkbcommon libinput cairo pixman libxcb
pkg install meson `pkg rquery %dn wlroots`
export CC=gcc CXX=g++ LDFLAGS="-static-libstdc++ -static-libgcc"
```

Please note Hyprland builds `wlroots`. Make sure you have the dependencies of
wlroots installed, you can make sure you have them by installing wlroots
separately (Hyprland doesn't mind)

Also note that Hyprland uses the C++23 standard, so both your compiler
and your C++ library has to support that (`gcc>=12.1.0` or `clang>=15`).
On Clang-based systems libc++ may be used by default, so until libc++
supports C++23 you have to pass `-stdlib=libstdc++` or switch to GCC.

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
ninja -C _build install --tags runtime,man
```

Refer to [Debugging](../../Contributing-and-Debugging) to see how to build &
debug.

## Crash on launch

See [Crashes and Bugs](../../Crashes-and-Bugs).

## Custom installation (legacy renderer, etc)

cd into the hyprland repo.

for legacy renderer:

```plain
sudo make clear && sudo make config && make protocols && make legacyrenderer && sudo cp ./build/Hyprland /usr/bin && sudo cp ./example/hyprland.desktop /usr/share/wayland-sessions
```

_please note the legacy renderer may not support some graphical features._
<br/><br/> Any other config: (replace \[PRESET\] with your preset, `release`
`debug` `legacyrenderer` `legacyrendererdebug`)

```plain
sudo make clear && sudo make config && make protocols && make [PRESET] && sudo cp ./build/Hyprland /usr/bin && sudo cp ./example/hyprland.desktop /usr/share/wayland-sessions
```

## Custom Build flags

To apply custom build flags, you'll have to ditch make.

Supported custom build flags:

```plain
NO_XWAYLAND - Removes XWayland support
NO_SYSTEMD - Removes systemd dependencies
```

How to?

Go to the root repo.

Clean before everything and config the root:

```plain
make clear && sudo make config && make protocols
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
cmake --build ./build --config Release --target all -j $(nproc)
```

If you configured in `Debug`, change the `--config` to `Debug` as well.

Now, of course, install manually.

```plain
sudo cp ./build/Hyprland /usr/bin && sudo cp ./example/hyprland.desktop /usr/share/wayland-sessions
```
