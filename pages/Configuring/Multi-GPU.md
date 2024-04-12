---
weight: 16
title: Multi-GPU
---

## General

If your host machine uses multiple GPUs, you may want to primarily use one GPU
for rendering all the elements for Hyprland including windows, animations, and
another for hardware acceleration for certain applications, etc.

This setup is very common in the likes of gaming laptops, GPU-passthrough
(without VFIO) capable hosts, and if you have multiple GPUs in general.

## Detecting GPUs

For this case, the writer is taking the example of their laptop.

Upon running `lspci | grep -E 'VGA|3D'`, One can list all the video devices
available.

```
01:00.0 VGA compatible controller: NVIDIA Corporation TU117M [GeForce GTX 1650 Mobile / Max-Q] (rev a1)
06:00.0 VGA compatible controller: Advanced Micro Devices, Inc. [AMD/ATI] Cezanne [Radeon Vega Series / Radeon Vega Mobile Series] (rev c6)
```

Here it is clear that 2 GPUs are available, the dedicated NVIDIA GTX 1650 Mobile
/ Max-Q and the integrated AMD Cezanne Radeon Vega Series GPU.

Now, run `ls -l /dev/dri/by-path`

```
 total 0
lrwxrwxrwx 1 root root  8 Jul 14 15:45 pci-0000:01:00.0-card -> ../card0
lrwxrwxrwx 1 root root 13 Jul 14 15:45 pci-0000:01:00.0-render -> ../renderD128
lrwxrwxrwx 1 root root  8 Jul 14 15:45 pci-0000:06:00.0-card -> ../card1
lrwxrwxrwx 1 root root 13 Jul 14 15:45 pci-0000:06:00.0-render -> ../renderD129
```

So from the above outputs, we can see that the path for the AMD card is
`pci-0000:06:00.0-card`, due to the matching `06:00.0` from the first command.
Do not use the `card1` symlink indicated here. It is dynamically assigned at
boot and is subject to frequent change, making it unsuitable as a marker for GPU selection.

## Telling Hyprland which GPU to use

After determining which "card" belongs to which GPU, we now have to tell
Hyprland the GPU we want to use primarily.
This is done by setting the `WLR_DRM_DEVICES` environment variable.

{{< callout type=info >}}

It is generally a good idea for laptops to use the integrated GPU as the primary
renderer as this preserves battery life and is practically indistinguishable
from using the dedicated GPU on modern systems in most cases. Hyprland can be
run on integrated GPUs just fine. The same principle applies for desktop setups
with a lower and higher power rating GPUs respectively.

{{< /callout >}}

If you wish to use the integrated GPU to run Hyprland, no further action is
required. wlroots will set `WLR_DRM_DEVICES` to the integrated GPU by default.

If instead you would like to use another GPU, you must first create a symlink to
the card from the previous section.

It is not possible to use `~/.config/hypr/card` as wlroots will not expand it correctly.  

You must include full path e.g `/home/<user>/.config/hypr/card` 
```
ln -sf /dev/dri/pci-0000:06:00.0-card /home/<user>/.config/hypr/card
```

It is not possible to directly use the `/dev/dri/pci-0000:06:00.0-card` path,
as wlroots interprets the colon symbols in the path as separators. Escaping
characters will not rectify this.

Afterwards, you must set the `WLR_DRM_DEVICES` environment variable in
hyprland.conf to this linked card.


```ini
env = WLR_DRM_DEVICES,/home/<user>/.config/hypr/card
```

If you want to set a sequence of fallback cards, symlink another card and set
the var as a colon separated list in order of priority.

```ini
env = WLR_DRM_DEVICES,/home/<user>/.config/hypr/card:/home/<user>/.config/hypr/otherCard
```

Here, we tell Hyprland to set priorities. If `card` isn't available for
whatever reason, use `otherCard`. So if the AMD GPU isn't available, use NVIDIA.

You should now be able to use an integrated GPU for lighter GPU loads,
including Hyprland, or default to your dGPU if you prefer.
