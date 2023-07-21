# Table of contents

{{< toc >}}

# General

If your host machine uses multiple GPUs, you may want to primarily use one GPU
for rendering all the elements for Hyprland including windows, animations, and
another for hardware acceleration for certain applications, etc.

This setup is very common in the likes of gaming laptops, 
GPU-passthrough (without VFIO) capable hosts, and if you have multiple GPUs in
general.

# Detecting GPUs

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

So from the above outputs, we can match the bus IDs and determine that NVIDIA is
`card0` and AMD is `card1`.

# Telling Hyprland which GPU to use

After determining which "card" belongs to which GPU, we now have to tell
Hyprland the GPU we want to use primarily.

{{< hint type=info >}}

It is generally a good idea for laptops to use the integrated GPU as the primary
renderer as this preserves battery life and is practically indistinguishable
from using the dedicated GPU on modern systems in most cases. Hyprland can be
run on integrated GPUs just fine. The same principle applies for desktop setups
with a lower and higher power rating GPUs respectively.

{{< /hint >}}

We can do so by using the `WLR_DRM_DEVICES` variable.

Add the following template to `hyprland.conf`

```ini
env = WLR_DRM_DEVICES,/dev/dri/cardN
```

For our case, we want to use `card1` primarily and use it to render stuff. 

```ini
env = WLR_DRM_DEVICES,/dev/dri/card1:/dev/dri/card0
```

Here, we tell Hyprland to set priorities. If `card1` isn't available for
whatever reason, use `card0`. So if the AMD GPU isn't available, use NVIDIA. The
colon is for setting priorities, essentially.

You should now be able to use an integrated GPU for for lighter GPU loads,
including Hyprland.
