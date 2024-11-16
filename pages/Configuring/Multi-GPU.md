---
weight: 16
title: Multi-GPU
---

## General

If your host machine uses multiple GPUs, you may want to use one GPU
for rendering all the elements for Hyprland including windows, animations, and
another for hardware acceleration for certain applications, etc.

This setup is very common in the likes of gaming laptops, GPU-passthrough
(without VFIO) capable hosts, and if you have multiple GPUs in general.

## Detecting GPUs

For this case, the writer is taking the example of their laptop.

Upon running `lspci | grep -E 'VGA|3D'`, One can list all the video devices
available.

```plain
01:00.0 VGA compatible controller: NVIDIA Corporation TU117M [GeForce GTX 1650 Mobile / Max-Q] (rev a1)
06:00.0 VGA compatible controller: Advanced Micro Devices, Inc. [AMD/ATI] Cezanne [Radeon Vega Series / Radeon Vega Mobile Series] (rev c6)
```

Here it is clear that 2 GPUs are available, the dedicated NVIDIA GTX 1650 Mobile
/ Max-Q and the integrated AMD Cezanne Radeon Vega Series GPU.

Now, run `ls -l /dev/dri/by-path`

```plain
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
This is done by setting the `AQ_DRM_DEVICES` environment variable.

{{< callout type=info >}}

It is generally a good idea for laptops to use the integrated GPU as the primary
renderer as this preserves battery life and is practically indistinguishable
from using the dedicated GPU on modern systems in most cases. Hyprland can be
run on integrated GPUs just fine. The same principle applies for desktop setups
with lower and higher power rating GPUs respectively.

{{< /callout >}}

If you wish to use the integrated GPU to run Hyprland, no further action is
required.

If instead you would like to use another GPU, or the wrong GPU is picked by default,
set `AQ_DRM_DEVICES` to a `:`-separated list of card paths, e.g.

```plain
env = AQ_DRM_DEVICES,/dev/dri/card0:/dev/dri/card1
```

Here, we tell Hyprland to set priorities. If `card0` isn't available for
whatever reason, use `card1`.

You should now be able to use an integrated GPU for lighter GPU loads,
including Hyprland, or default to your dGPU if you prefer.

{{< callout type=info >}}

[uwsm](../../Useful-Utilities/Systemd-start) users are advised to export the `AQ_DRM_DEVICES` variable inside `~/.config/uwsm/env-hyprland`, instead. 
This method ensures that the variable is properly exported to the systemd environment without conflicting with other compositors or desktop environments.

```plain
export AQ_DRM_DEVICES="/dev/dri/card0;/dev/dri/card1"
```

{{< /callout >}}
