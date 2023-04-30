# Building on Ubuntu 23.04 {#Ubuntu-guide}
you will probaly have this exact script as `build-ubuntu-23.sh` in the `sources` in the `next releases` or `master` branch
by the moment you can donwload it and run it with:

> ```bash
> wget https://raw.githubusercontent.com/Vertecedoc4545/Hyprland-ubuntu/3b8a64c064b209cdc865cde2b17f4a101c9304f2/build-ubuntu-23.sh ##temporal link 
> chmod +x build-ubuntu-23.sh
> ./build-ubuntu-23.sh
> ```

Nvidia building : [Here](#NVIDIA)
> _Warning_: you wil get the error ___you have one or more incompatible xdg portals implementations___, as is a work in progress issue, can lead into bugs

## Dependencies:
all of this dependencies are needed, for faster speds in package instaling using nala is recomended

```bash
sudo apt-get install -y nala
```
so


``` bash
sudo apt-get install -y nala
sudo nala install -y \ 
meson wget build-essential ninja-build cmake-extras cmake gettext gettext-base fontconfig libfontconfig-dev libffi-dev libxml2-dev libdrm-dev libxkbcommon-x11-dev libxkbregistry-dev libxkbcommon-dev libpixman-1-dev libudev-dev libseat-dev seatd libxcb-dri3-dev libvulkan-dev libvulkan-volk-dev  vulkan-validationlayers-dev libvkfft-dev libgulkan-dev libegl-dev libgles2 libegl1-mesa-dev glslang-tools libinput-bin libinput-dev libxcb-composite0-dev libavutil-dev libavcodec-dev libavformat-dev libxcb-ewmh2 libxcb-ewmh-dev libxcb-present-dev libxcb-icccm4-dev libxcb-render-util0-dev libxcb-res0-dev libxcb-xinput-dev libpango1.0-dev xdg-desktop-portal-wlr
```

or if you don't want to use the new fresh apt replacement do:


```bash
sudo apt-get install -y \
meson wget build-essential ninja-build cmake-extras cmake gettext gettext-base fontconfig libfontconfig-dev libffi-dev libxml2-dev libdrm-dev libxkbcommon-x11-dev libxkbregistry-dev libxkbcommon-dev libpixman-1-dev libudev-dev libseat-dev seatd libxcb-dri3-dev libvulkan-dev libvulkan-volk-dev  vulkan-validationlayers-dev libvkfft-dev libgulkan-dev libegl-dev libgles2 libegl1-mesa-dev glslang-tools libinput-bin libinput-dev libxcb-composite0-dev libavutil-dev libavcodec-dev libavformat-dev libxcb-ewmh2 libxcb-ewmh-dev libxcb-present-dev libxcb-icccm4-dev libxcb-render-util0-dev libxcb-res0-dev libxcb-xinput-dev xdg-desktop-portal-wlr

```

## Building libs from source
as in the offitial repos most of our dependencies are in the required version and building these three from source won't damage the system 

we need to vuild these libraries as in the base system a previous non usefull version is installed

first get all of our sources for building and extarct them


```bash
wget https://gitlab.freedesktop.org/wayland/wayland-protocols/-/releases/1.31/downloads/wayland-protocols-1.31.tar.xz
tar -xvJf wayland-protocols-1.31.tar.xz

wget https://gitlab.freedesktop.org/wayland/wayland/-/releases/1.22.0/downloads/wayland-1.22.0.tar.xz
tar -xzvJf wayland-1.22.0.tar.xz

wget https://gitlab.freedesktop.org/emersion/libdisplay-info/-/releases/0.1.1/downloads/libdisplay-info-0.1.1.tar.xz
tar -xvJf libdisplay-info-0.1.1.tar.xz

wget https://gitlab.freedesktop.org/emersion/libliftoff/-/releases/v0.4.1/downloads/libliftoff-0.4.1.tar.gz
tar -xvf libliftoff-0.4.1.tar.gz

```
so now we got all of our working directories

## build wayland 1.22.0

```bash
cd wayland-1.22.0
mkdir build &&
cd    build &&

meson setup ..            \
      --prefix=/usr       \
      --buildtype=release \
      -Ddocumentation=false &&
ninja
sudo ninja install

cd ../..
```

## bulild wayland protocols

```bash
cd wayland-protocols-1.31

mkdir build &&
cd    build &&

meson setup --prefix=/usr --buildtype=release &&
ninja

sudo ninja install

cd ../..

```

## Lets build libdisplay-info

```bash
cd libdisplay-info-0.1.1/

mkdir build &&
cd    build &&

meson setup --prefix=/usr --buildtype=release &&
ninja

sudo ninja install

cd ../..
```
### lets build libliftoff


```bash
cd libliftoff-0.4.1/

mkdir build &&
cd    build &&

meson setup --prefix=/usr --buildtype=release &&
ninja

sudo ninja install

cd ../..

```
## Lets build hyperland!!!

modify **config.mk** and change PREFIX=/usr/local to PREFIX=/usr
or use this command

```bash 
sed -i 's/\/usr\/local/\/usr/g' config.mk
```

also in that file you could use your custom cflags as for example adding -O3 or -Ofast optimization even -Og etc..

### then only do:

```bash
sudo make install

```

***enjoy Hyprland !!***


# Nvidia building {#NVIDIA}

in ubuntu 23.04 the only thing you need to do at system level is:

- add `nvidia_drm.modeset=1` to `/etc/default/grub` in `GRUB_CMDLINE_LINUX_DEFAULT=`, and thats it
- then you need to run `sudo update-grub` and `reboot`

after that we need to apply the patches:

```bash
sed 's/glFlush();/glFinish();/g' -i subprojects/wlroots/render/gles2/renderer.c
```
then we can run the `build-ubuntu-23.sh` or manually follow the [ubuntu 23.04 install guide](#Ubuntu-guide)

the rest of documentation is in the NVIDIA PAGE