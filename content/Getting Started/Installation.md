---
weight: 1
title: Installation
---

> [!WARNING]
> Hyprland is not meant to be a full and user-friendly Desktop Environment. In a nutshell, it's a set of
> tools to allow you to create your own Desktop Environment.
> 
> Apps, integrations, shells, etc, are **your** responsibility to pick, install and configure.
> 
> This wiki is _very_ verbose. It's highly recommended to scour and read the wiki first before
> assuming something is not working or not available.

> [!NOTE]
> NVIDIA GPUs are often not usable out-of-the-box, follow the [Nvidia page](../../Nvidia) after installing
> Hyprland if you plan to use one. Blame NVIDIA for this.

## Distros

We officially run and test Hyprland on Arch and NixOS, and we guarantee Hyprland will work there. For any other distro
(not based on Arch/Nix) you might have varying amounts of success. However,
since Hyprland is extremely bleeding-edge, distros like Pop!\_OS, Ubuntu, etc.
will have **major** issues running Hyprland. Rolling release distros like Fedora, openSUSE, etc. will likely be fine.

## Installation

Installing Hyprland is very easy. Simply install it with your package manager.

> [!WARNING]
> It is **heavily** recommended you use **what the distro packages for you**, and **not** compiling manually
> or using `-git` packages.
> Hyprland's ecosystem and dependencies are vast and intertwined, and compiling manually will only potentially expose you to outdated,
> or incompatible versions of these dependencies.
> 
> If you get `.so` file mismatch / missing errors, it's _entirely your fault_ for doing this!
> 
> However, if you are an experienced user and want to beta-test new features, you're more than welcome to run the latest
> git head. Please don't come asking about ".so file missing" errors though!

### Packages

**WARNING:** I do not maintain any packages. If they are broken, try building
from source first.

{{% details title="Arch" closed="true" %}}

Install a tagged release from the arch packages:

```shell
sudo pacman -S hyprland
```

or install from the AUR, which compiles the latest source:

```shell
yay -S hyprland-git
```

Alternatively, install the `hyprland-meta` package to automatically fetch and compile the latest git versions of all components within the hypr* ecosystem.

```shell
yay -S hyprland-meta-git
```

> [!WARNING]
> With `-git` everytime a direct dependency like `hyprutils` has an ABI breaking update you need to recompile Hyprland and all other dependent tools.
> Otherwise you get a ".so not found" error.


If you decide to use the `git` version from the AUR, you can use the [Chaotic Aur](https://aur.chaotic.cx/) to get pre-built binaries.
Be aware that updating dependencies like `hyprutils` might still require you to recompile everything yourself as the Chaotic Aur does not do that automatically.

> [!NOTE]
> You can downgrade easily with [downgrade](https://github.com/archlinux-downgrade/downgrade) to get to a previous -git version. 

{{% /details %}}

{{% details title="Nix" closed="true" %}}

Enable Hyprland in your NixOS configuration:

```nix
{
  programs.hyprland.enable = true;
}
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

For `hyprpm` to recognize it's dependencies, you'll also need to install `hyprland-devel`:

```sh
sudo zypper in hyprland-devel
```

Alternatively, you can also follow the instructions under
["Manual (Manual Build)"](#manual-manual-build) to build Hyprland yourself.

Note: _Hyprland is not available for Leap, as most libraries (and compiler) that
Hyprland needs are too old._

{{% /details %}}

{{% details title="Fedora*" closed="true" %}}

On Fedora 40+, run:

```sh
sudo dnf install hyprland
sudo dnf install hyprland-devel # If you want to build plugins (use hyprpm)
```

Faster updates and additional packages are available in the
[solopasha/hyprland](https://copr.fedorainfracloud.org/coprs/solopasha/hyprland)
Copr repository.

If you are on an older version of Fedora, you can also compile it yourself by
following the instructions
[here](https://github.com/hyprwm/Hyprland/discussions/284)

{{% /details %}}
{{% details title="Debian*" closed="true" %}}

> [!WARNING]
> Debian's Hyprland is **extremely** outdated. I do not recommend using the packaged versions at all. Build the entire stack manually instead.

Hyprland recently made it into the SID repository and can be installed with

```sh
sudo apt install hyprland
```

Alternatively, you can also follow the instructions under
["Manual (Manual Build)"](#manual-manual-build) to build Hyprland yourself.

> [!NOTE]
> Hyprland is not available for Bookworm as its packages are too old.

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

{{% details title="Ubuntu*" closed="true" %}}

> [!WARNING]
> Debian and Ubuntu's Hyprland is **extremely** outdated. I do not recommend using the packaged versions at all. Build the entire stack manually instead.

Hyprland made it into the Ubuntu 24.10 Oracular Oriole universe repo and can be installed with

```bash
sudo add-apt-repository universe && sudo apt-get update && sudo apt-get install -y hyprland
```

> [!NOTE]
> NOTE: Above is for Ubuntu 24.10 (Unreleased) version

For installing Hyprland from Source, install first the dependencies below:

```bash
sudo apt install -y meson wget build-essential ninja-build cmake-extras cmake gettext gettext-base fontconfig libfontconfig-dev libffi-dev libxml2-dev libdrm-dev libxkbcommon-x11-dev libxkbregistry-dev libxkbcommon-dev libpixman-1-dev libudev-dev libseat-dev seatd libxcb-dri3-dev libegl-dev libgles2 libegl1-mesa-dev glslang-tools libinput-bin libinput-dev libxcb-composite0-dev libavutil-dev libavcodec-dev libavformat-dev libxcb-ewmh2 libxcb-ewmh-dev libxcb-present-dev libxcb-icccm4-dev libxcb-render-util0-dev libxcb-res0-dev libxcb-xinput-dev libtomlplusplus3 libre2-dev
```

You will also need to build the latest wayland, wayland-protocols, and
libdisplay-info tagged releases from source.

For screensharing, you can also install `xdg-desktop-portal-wlr` or `xdg-desktop-portal-hyprland`

```bash
sudo apt install -y xdg-desktop-portal-wlr
```

_Unfortunately, `xdg-desktop-portal-hyprland` still not in Ubuntu Repo so you have to build it from source_

See
[The xdph GitHub repo's readme](https://github.com/hyprwm/xdg-desktop-portal-hyprland). Refer to
[XDPH](../../Hypr-Ecosystem/xdg-desktop-portal-hyprland) and
[Ubuntu Guide For Installing And Building Hyprland Gist](https://gist.github.com/Vertecedoc4545/3b077301299c20c5b9b4db00f4ca6000)
for more information.

> [!WARNING]
> Please note that since Ubuntu is generally behind with dependencies, it's not
> guaranteed that the build process will work at all. Even if it is, it's likely
> that it will break at some point in the future.

> [!WARNING]
> Always use the latest version of Ubuntu for the most up to date dependencies.
> 
> Note: Your mileage may vary, as GDM has some bugs with Hyprland. Check the [Master Tutorial](../Master-Tutorial) for more info.
> 
> Refer to the gist if anything fails.
> 
> <!-- For some reason uncommenting the line below creates an unwanted <pre><div></pre> in the page. -->
> <!--  -->

{{% /details %}}

{{% details title="Void Linux*" closed="true" %}}

Hyprland is not available from Void Linux's official repositories
due to the void developers being salty and personally disliking our main developer.
However, a [third party repository](https://github.com/Makrennel/hyprland-void)
is available with
[binary packages](https://github.com/Makrennel/hyprland-void/tree/repository-x86_64-glibc)
built in CI by GitHub Actions.

You can add this repository by creating a file such as
`/etc/xbps.d/hyprland-void.conf` with the following contents:

```plain {filename="/etc/xbps.d/hyprland-void.conf"}
repository=https://raw.githubusercontent.com/Makrennel/hyprland-void/repository-x86_64-glibc
```

Then you can install the packages as you would any other:

```sh
sudo xbps-install -S hyprland
sudo xbps-install -S hyprland-devel # If you want to use plugins
sudo xbps-install -S xdg-desktop-portal-hyprland

xbps-query -Rs hypr # This will require you to have already accepted the repository's fingerprint using xbps-install -S
```

More information is available in the
[hyprland-void README](https://github.com/Makrennel/hyprland-void/blob/master/README.md),
including information about how you can
[manually build](https://github.com/Makrennel/hyprland-void?tab=readme-ov-file#manually-building)
Hyprland for Void Linux using the templates provided.

{{% /details %}}

{{% details title="Slackware*" closed="true" %}}

```plain
hyprland-bin (SlackBuilds) - Prebuilt release for Slackware ready for install
```

Hyprland is not installed by default on the current release of Slackware.

For detailed instructions on installing this build see
[here](https://slackbuilds.org/repository/15.0/desktop/hyprland-bin/)

{{% /details %}}

{{% details title="Alpine*" closed="true" %}}

Hyprland is currently available in Alpine's [community repository](https://wiki.alpinelinux.org/wiki/Repositories#Community)
and it is maintained by the community.

The following command will install hyprland and its dependencies.

```plain
apk add hyprland
```

{{% /details %}}

{{% details title="Ximper*" closed="true" %}}

Install from the Sisyphus:

```bash
epmi hyprland
epmi hyprland-devel # If you want to use plugins
```

Ecosystem:

```bash
epmi xdg-desktop-portal-hyprland
epmi hypridle
epmi hyprpaper
epmi hyprpicker
```

{{% /details %}}

{{% details title="Solus*" closed="true" %}}

For Solus, run:

```bash
sudo eopkg install hyprland
```

{{% /details %}}

_**\* Unofficial, no official support is provided. These instructions are
community-driven, and no guarantee is provided for their validity.**_

### Manual

Dependencies:

> [!NOTE]
> Please note that Hyprland uses the C++26 standard, so both your compiler and your
> C++ standard library has to support that (`gcc>=15` or `clang>=19`).

{{% details title="Arch" closed="true" %}}

```plain
yay -S ninja gcc cmake meson libxcb xcb-proto xcb-util xcb-util-keysyms libxfixes libx11 libxcomposite libxrender libxcursor pixman wayland-protocols cairo pango libxkbcommon xcb-util-wm xorg-xwayland libinput libliftoff libdisplay-info cpio tomlplusplus hyprlang-git hyprcursor-git hyprwayland-scanner-git xcb-util-errors hyprutils-git glaze hyprgraphics-git aquamarine-git re2 hyprland-qtutils-git
```

_(Please make a pull request or open an issue if any packages are missing from
the list)_

{{% /details %}}

{{% details title="openSUSE" closed="true" %}}

```sh
zypper in gcc-c++ git meson cmake "pkgconfig(cairo)" "pkgconfig(egl)" "pkgconfig(gbm)" "pkgconfig(gl)" "pkgconfig(glesv2)" "pkgconfig(libdrm)" "pkgconfig(libinput)" "pkgconfig(libseat)" "pkgconfig(libudev)" "pkgconfig(pango)" "pkgconfig(pangocairo)" "pkgconfig(pixman-1)" "pkgconfig(vulkan)" "pkgconfig(wayland-client)" "pkgconfig(wayland-protocols)" "pkgconfig(wayland-scanner)" "pkgconfig(wayland-server)" "pkgconfig(xcb)" "pkgconfig(xcb-icccm)" "pkgconfig(xcb-renderutil)" "pkgconfig(xkbcommon)" "pkgconfig(xwayland)" "pkgconfig(xcb-errors)" glslang-devel Mesa-libGLESv3-devel tomlplusplus-devel
```

(this should also work on RHEL/Fedora if you remove `Mesa-libGLESv3-devel` and
`pkgconfig(xcb-errors)`)

{{% /details %}}

{{% details title="FreeBSD" closed="true" %}}

```sh
pkg install git pkgconf gmake gcc evdev-proto cmake wayland-protocols wayland libglvnd libxkbcommon libinput cairo pango pixman libxcb
pkg install meson jq hwdata libdisplay-info libliftoff
export CC=gcc CXX=g++ LDFLAGS="-static-libstdc++ -static-libgcc"
```

{{% /details %}}

{{% details title="Ubuntu" closed="true" %}}

refer to the Ubuntu tab above

{{% /details %}}

> [!WARNING]
> Additionally to those, you will also need a few hypr\* dependencies which may or may not be
> packaged for your distro of choice:
> 
> - aquamarine
> - hyprlang
> - hyprcursor
> - hyprutils
> - hyprgraphics
> - hyprwayland-scanner (build-only)

### CMake (recommended)

```sh
git clone --recursive https://github.com/hyprwm/Hyprland
cd Hyprland
make all && sudo make install
```

_CMake is always recommended as it's the intended way Hyprland should be
installed._

### Meson

```sh
meson subprojects update --reset
meson setup build
ninja -C build
ninja -C build install --tags runtime,man
```

Custom build flags can be found in [`meson_options.txt`](https://github.com/hyprwm/Hyprland/blob/main/meson_options.txt).

Refer to [Debugging](../../Contributing-and-Debugging) to see how to build &
debug.

## Crash on launch

See [Crashes and Bugs](../../Crashes-and-Bugs).

## Custom installation (debug build, etc)

1. cd into the hyprland repo.
2. for debug build:

```bash
make debug
sudo make install
```

3. Any other config: (replace `<PRESET>` with your preset: `release`, `debug`)

```bash
make <PRESET> && sudo cp ./build/Hyprland /usr/bin && sudo cp ./example/hyprland.desktop /usr/share/wayland-sessions
```

## Custom Build flags

To apply custom build flags, you'll have to ditch make.

Supported custom build flags on CMake:

```bash
NO_XWAYLAND - Removes XWayland support
NO_SYSTEMD - Removes systemd dependencies
NO_UWSM - Does not install the hyprland-uwsm.desktop file
NO_HYPRPM - Does not build and install hyprpm
```

Flags can be passed to CMake like this:

```bash
cmake --no-warn-unused-cli -DCMAKE_BUILD_TYPE:STRING=Release -D<FLAG>:STRING=true -B build
```

Change `<FLAG>` to one of the custom build flags. Multiple flags can be used at
once, by adding more `-D<FLAG_2>:STRING=true`.

The `BUILD_TYPE` can also be changed to `Debug`.

To build, run:

```bash
cmake --build ./build --config Release --target all -j`nproc 2>/dev/null || getconf NPROCESSORS_CONF`
```

If you configured in `Debug`, change the `--config` to `Debug` as well.

To install, run:

```bash
sudo cmake --install ./build
```

## Running In a VM

_YMMV, this is not officially supported._

Read through the
[libvirt Arch wiki page](https://wiki.archlinux.org/title/Libvirt) and get
`libvirt`, `virsh`, and `virt-viewer` setup and installed.

```bash
# Install libvirt and qemu things.
sudo pacman -S libvirt virt-viewer qemu-common
# Add yourself to the libvirt group.
sudo usermod -a -G libvirt USER # Replace 'USER' with your username.
# Enable and start libvirtd.
systemctl enable --now libvirtd
```

Go to the
[arch-boxes gitlab](https://gitlab.archlinux.org/archlinux/arch-boxes/-/packages)
and download the latest arch qemu basic image. You can also download via any of
arch's mirrors.

```bash
curl https://geo.mirror.pkgbuild.com/images/latest/Arch-Linux-x86_64-basic.qcow2 \
  -o ~/Downloads/arch-qemu.qcow2 # Or download wherever you want.
```

Create the VM with virsh.

```bash
# Use virt-install (included with libvirt) to install the vm from the image.
virt-install \
  --graphics spice,listen=none,gl.enable=yes,rendernode=/dev/dri/renderD128 \
  --name hypr-vm \
  --os-variant archlinux \
  --memory 2048 \
  --disk ~/Downloads/arch-qemu.qcow2 \
  --import
```

Connect with `virt-viewer`, this will open a `virt-viewer` graphical session on
the tty. The default login is 'arch' for user and 'arch' for password.

> [!WARNING]
> Make sure the --attach flag is used, enabling virgl makes it so that
> we had to disable listen. This means that we can't make a direct TCP/UNIX
> socket connection to the remote display. --attach asks libvirt to provide a
> pre-connected socket to the display.\*

```sh
virt-viewer --attach hypr-vm
```

Finally on the guest follow the instructions above for either
[installing hyprland-git from the aur](#installation) or
[building manually](#manual-manual-build).
> [!WARNING]
> Make sure you install `mesa` as the OpenGL driver. The virgl drivers are
> included in `mesa`.
