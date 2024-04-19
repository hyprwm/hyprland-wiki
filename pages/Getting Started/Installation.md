---
weight: 2
title: Installation
---

# Foreword

Due to their proprietary nature, Nvidia GPUs have limited compatibility with
Hyprland. If you want to try Hyprland on Nvidia regardless (many people have
reported successes), follow the [Nvidia page](../../Nvidia) after installing
Hyprland.

## Distros

Arch, NixOS and openSUSE Tumbleweed are very supported. For any other distro
(not based on Arch/Nix) you might have varying amounts of success. However,
since Hyprland is extremely bleeding-edge, distros like Pop!\_OS, Ubuntu, etc.
might have **major** issues running Hyprland.

## Installation

Installing Hyprland is very easy. Simply install it with your package manager 
(if there is a Hyprland package available) or install/build it yourself.

{{< callout >}}

This project is under development and is constantly changing. If you want to
keep up to date with the latest commits, please consider updating your packages
with `yay -Syu --devel`, or your preferred package manager.

{{< /callout >}}

### Packages

**WARNING:** I do not maintain any packages. If they are broken, try building
from source first.

{{% details title="Arch" closed="true" %}}

```plain
hyprland-git (AUR) - compiles from latest source
hyprland - binary x86 tagged release
```

{{% /details %}}

{{% details title="Nix" closed="true" %}}

Enable Hyprland in your NixOS configuration:

```nix
programs.hyprland.enable = true;
```

For more details, read the [Nix page](../../Nix).

{{% /details %}}

{{% details title="openSUSE*" closed="true" %}}

Hyprland is part of factory, starting with snapshot 20230411. To install it
simply use zypper

```sh
sudo zypper in hyprland
```

or install the "hyprland" package via YaST2 Software.

Alternatively, you can also follow the instructions under
["Manual (Manual Build)"](#manual-manual-build) to build Hyprland yourself.

Note: _Hyprland is not available for Leap, as most libraries (and compiler) that
Hyprland needs are too old._

{{% /details %}}

{{% details title="Fedora*" closed="true" %}}

On Fedora 39 and Rawhide, run:

```sh
sudo dnf install hyprland
sudo dnf install hyprland-devel # If you want to build plugins
```

Builds for Fedora 38 and additional packages are available in the
[solopasha/hyprland](https://copr.fedorainfracloud.org/coprs/solopasha/hyprland)
Copr repository.

If you are on an older version of Fedora, you can also compile it yourself by
following the instructions
[here](https://github.com/hyprwm/Hyprland/discussions/284)

{{% /details %}}

{{% details title="Gentoo*" closed="true" %}}

The hyprland package is available in the main tree:

```sh
emerge --ask gui-wm/hyprland
```

Additional packages like hyprlock, hypridle, xdg-desktop-portal-hyprland,
hyprland-plugins, hyprpaper and hyprpicker are available in the
[GURU](https://wiki.gentoo.org/wiki/Project:GURU) overlay. Community-contributed
scripts are also available in GURU as part of the hyprland-contrib package.

```sh
eselect repository enable guru
emaint sync -r guru

emerge --ask gui-apps/hyprlock
emerge --ask gui-apps/hypridle
emerge --ask gui-libs/xdg-desktop-portal-hyprland
emerge --ask gui-apps/hyprland-plugins
emerge --ask gui-apps/hyprpaper
emerge --ask gui-apps/hyprpicker
emerge --ask gui-wm/hyprland-contrib
```

For USE flags and more details, read the
[Gentoo wiki page](https://wiki.gentoo.org/wiki/Hyprland) about Hyprland.

{{% /details %}}

{{% details title="FreeBSD*" closed="true" %}}

Hyprland and related are in the default repository:

- [hyprland](https://www.freshports.org/x11-wm/hyprland)
- [hyprpaper](https://www.freshports.org/x11/hyprpaper)
- [hyprpicker](https://www.freshports.org/x11/hyprpicker)
- [xdg-desktop-portal-hyprland](https://www.freshports.org/x11/xdg-desktop-portal-hyprland)
- [Other Wayland stuff](https://www.freshports.org/wayland/)

{{% /details %}}

{{% details title="Ubuntu 23.04*" closed="true" %}}

Build Dependencies:

```bash
sudo apt-get install -y meson wget build-essential ninja-build cmake-extras cmake gettext gettext-base fontconfig libfontconfig-dev libffi-dev libxml2-dev libdrm-dev libxkbcommon-x11-dev libxkbregistry-dev libxkbcommon-dev libpixman-1-dev libudev-dev libseat-dev seatd libxcb-dri3-dev libegl-dev libgles2 libegl1-mesa-dev glslang-tools libinput-bin libinput-dev libxcb-composite0-dev libavutil-dev libavcodec-dev libavformat-dev libxcb-ewmh2 libxcb-ewmh-dev libxcb-present-dev libxcb-icccm4-dev libxcb-render-util0-dev libxcb-res0-dev libxcb-xinput-dev xdg-desktop-portal-wlr libtomlplusplus3
```

you will also need to build the latest wayland, wayland-protocols, and
libdisplay-info tagged releases from source

for more info refer to the
[Ubuntu Guide For Installing And Building Hyprland Gist](https://gist.github.com/Vertecedoc4545/3b077301299c20c5b9b4db00f4ca6000)

{{< callout type=warning >}}

Please note that since Ubuntu is generally behind with dependencies, it's not
guaranteed that the build process will work at all. Even if it is, it's likely
that it will break at some point in the future.

Refer to the gist if anything fails.

{{< /callout >}}

{{% /details %}}

{{% details title="Void Linux*" closed="true" %}}

Hyprland is not available for Void Linux from the official repositories
[as Hyprland doesn't build against tagged wlroots](https://github.com/void-linux/void-packages/issues/37544),
however template files are available
[from a third party](https://github.com/Makrennel/hyprland-void) which can build
Hyprland [using xbps-src](https://github.com/void-linux/void-packages).

For further instructions on building with the third party resource, refer to the
[README](https://github.com/Makrennel/hyprland-void/blob/master/README.md).

{{< callout type=warning >}}

As always, when using third party scripts exercise caution and understand what
the script does.

{{< /callout >}}

{{% /details %}}

{{% details title="Slackware*" closed="true" %}}

```plain
hyprland-bin (SlackBuilds) - Prebuilt release for Slackware ready for install
```

Hyprland is not installed by default on the current release of Slackware.

For detailed instructions on installing this build see
[here](https://slackbuilds.org/repository/15.0/desktop/hyprland-bin/)

{{% /details %}}

_**\* Unofficial, no official support is provided. These instructions are
community-driven, and no guarantee is provided for their validity.**_

### Manual (Releases, Linux-only)

Download the most recent release.

copy the binary (Hyprland) to `/usr/bin/`.

copy hyprctl to `/usr/bin/`.

copy hyprpm to `/usr/bin/`.

copy the wlroots .so (`libwlroots.so.XX032`) to `/usr/lib/`.

copy the desktop entry (`example/hyprland.desktop`) to
`/usr/share/wayland-sessions/`

the example config is in `example/hyprland.conf`.

For updating later on, you can overwrite the binaries (hyprctl, hyprland and
libwlroots), you don't need to update anything else.

### Manual (Manual Build)

_Arch dependencies_:

```plain
yay -S gdb ninja gcc cmake meson libxcb xcb-proto xcb-util xcb-util-keysyms libxfixes libx11 libxcomposite xorg-xinput libxrender pixman wayland-protocols cairo pango seatd libxkbcommon xcb-util-wm xorg-xwayland libinput libliftoff libdisplay-info cpio tomlplusplus hyprlang hyprcursor
```

_(Please make a pull request or open an issue if any packages are missing from
the list)_

_openSUSE dependencies_:

```sh
zypper in gcc-c++ git meson cmake "pkgconfig(cairo)" "pkgconfig(egl)" "pkgconfig(gbm)" "pkgconfig(gl)" "pkgconfig(glesv2)" "pkgconfig(libdrm)" "pkgconfig(libinput)" "pkgconfig(libseat)" "pkgconfig(libudev)" "pkgconfig(pango)" "pkgconfig(pangocairo)" "pkgconfig(pixman-1)" "pkgconfig(vulkan)" "pkgconfig(wayland-client)" "pkgconfig(wayland-protocols)" "pkgconfig(wayland-scanner)" "pkgconfig(wayland-server)" "pkgconfig(xcb)" "pkgconfig(xcb-icccm)" "pkgconfig(xcb-renderutil)" "pkgconfig(xkbcommon)" "pkgconfig(xwayland)" "pkgconfig(xcb-errors)" glslang-devel Mesa-libGLESv3-devel tomlplusplus-devel
```

(this should also work on RHEL/Fedora if you remove `Mesa-libGLESv3-devel` and
`pkgconfig(xcb-errors)`)

_FreeBSD dependencies_:

```plain
pkg install git pkgconf gmake gcc evdev-proto cmake wayland-protocols wayland libglvnd libxkbcommon libinput cairo pango pixman libxcb
pkg install meson jq `pkg rquery %dn wlroots` hwdata libdisplay-info libliftoff
export CC=gcc CXX=g++ LDFLAGS="-static-libstdc++ -static-libgcc"
```

_Ubuntu 23.04 dependencies_: refer to the Ubuntu tab above

Please note Hyprland builds `wlroots`. Make sure you have the dependencies of
wlroots installed, you can make sure you have them by installing wlroots
separately (Hyprland doesn't mind)

Also note that Hyprland uses the C++23 standard, so both your compiler and your
C++ library has to support that (`gcc>=13.0.0` or `clang>=15`). On Clang-based
systems libc++ may be used by default, so until libc++ supports C++23 you have
to pass `-stdlib=libstdc++` or switch to GCC.

### CMake (recommended)

```Plain
git clone --recursive https://github.com/hyprwm/Hyprland
cd Hyprland
make all && sudo make install
```

_CMake is always recommended as it's the intended way Hyprland should be
installed._

### Meson

```plain
meson subprojects update --reset
meson setup build
ninja -C build
ninja -C build install --tags runtime,man
```

Refer to [Debugging](../../Contributing-and-Debugging) to see how to build &
debug.

## Crash on launch

See [Crashes and Bugs](../../Crashes-and-Bugs).

## Custom installation (legacy renderer, etc)

cd into the hyprland repo.

for legacy renderer:

```plain
make legacyrenderer && sudo cp ./build/Hyprland /usr/bin && sudo cp ./example/hyprland.desktop /usr/share/wayland-sessions
```

_please note the legacy renderer may not support some graphical features._
<br/><br/> Any other config: (replace \[PRESET\] with your preset, `release`
`debug` `legacyrenderer` `legacyrendererdebug`)

```plain
make [PRESET] && sudo cp ./build/Hyprland /usr/bin && sudo cp ./example/hyprland.desktop /usr/share/wayland-sessions
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

Lastly, copy hyprctl, hyprpm, and wlroots as mentioned
[here](#manual-releases-linux-only)
