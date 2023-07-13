# Table of contents

{{< toc >}}

# General

If your host machine uses multiple GPUs, you may want to primarily use a GPU for rendering all the elements for Hyprland including windows, animations, hardware acceleration for certain applications, etc.

This setup is very common in the likes of gaming laptops, GPU-passthrough(without VFIO) capable hosts, and if you have multiple GPUs in general.

# Detecting GPUs

For this case, the writer is taking the example of their laptop. Here are some of the details for the same

Upon running `lspci | grep VGA`, I can list all the video devices installed on this laptop

```
01:00.0 VGA compatible controller: NVIDIA Corporation TU117M [GeForce GTX 1650 Mobile / Max-Q] (rev a1)
06:00.0 VGA compatible controller: Advanced Micro Devices, Inc. [AMD/ATI] Cezanne [Radeon Vega Series / Radeon Vega Mobile Series] (rev c6)
```

Here it is clear that the writer has 2 GPUs, the dedicated NVIDIA GTX 1650 Mobile / Max-Q and the integrated AMD Cezanne Radeon Vega Series GPU.

So this would indicate, Linux should be detecting 2 GPUs, and thus 2 "cards" in `/dev/dri/`. Let us verify this using `ls /dev/dri/`

```
by-path  card0  card1  renderD128  renderD129
```

Here, `card0` and `card1` correspond to `renderD128` and `renderD129` respectively. So for every card you have installed on your host device the format would be something like this:

` cardN  renderD(128+N)`

We now need to determine which of these `card0` and card1` correspond to the AMD and NVIDIA GPU.

For this, we now run `udevadm info -a -n /dev/dri/card0 | grep DRIVER` to determine what GPU does `card0` correspond to

```
DRIVER==""
DRIVERS=="nvidia"
DRIVERS=="pcieport"
DRIVERS==""
```

This indicated that `card0` belongs to NVIDIA and thus, `card1` must belong to AMD. We can now move to the next section.

## If you have the same vendor for multiple GPUs

In this case, you now have to individually match the PCIe IDs with the udevadm info command used earlier with lspci

As the writer doesn't possess such a setup, we will try to be as thorough as possible with the details

Run `lspci | grep VGA` and note the numeric values that occur at the start of each VGA device

```
01:00.0 VGA compatible controller: NVIDIA Corporation TU117M [GeForce GTX 1650 Mobile / Max-Q] (rev a1)
06:00.0 VGA compatible controller: Advanced Micro Devices, Inc. [AMD/ATI] Cezanne [Radeon Vega Series / Radeon Vega Mobile Series] (rev c6)
```

Here, the number we need for NVIDIA is `01:00.0` and for AMD it is `06:00.0`. Note these down.

Now, run `udevadm info -a -n /dev/dri/card0 | grep "/devices"`

```
looking at device '/devices/pci0000:00/0000:00:08.1/0000:06:00.0/drm/card1':
looking at parent device '/devices/pci0000:00/0000:00:08.1/0000:06:00.0':
looking at parent device '/devices/pci0000:00/0000:00:08.1':
looking at parent device '/devices/pci0000:00':
```

Notice the first line of the output and the `0000:06:00.0` 3rd from last. This corresponds perfectly to the output we received from `lspci | grep VGA`. Repeat this same process for all your other GPUs and determine which `card` correspond to which PCIe device.

After doing so move to the next section.

# Telling Hyprland which GPU to use

After determining which "card" belongs to which GPU, we now have to tell Hyprland the GPU we want to use primarily.

{{< hint type=info >}}

It is generally a good idea for laptops to use the integrated GPU as the primary renderer as this preserves battery life and is practically indistinguishable from using the dedicated GPU on modern systems in most cases. Hyprland can be run on integrated GPUs smoothly. The same principle applies for desktop setups with a lower and higher power rating GPUs respectively.

{{< /hint >}}

We can do so by using `WLR_DRM_DEVICES` variable.

```ini

env = WLR_DRM_DEVICES,/dev/dri/cardN

```

For our case, we want to use `card1` primarily and use it to render stuff. So in our case

```ini

env = WLR_DRM_DEVICES,/dev/dri/card1:/dev/dri/card0

```

Here, we tell Hyprland to set priorities. If `card1` isn't available for whatever reason, use `card0`. So if the AMD GPU isn't available, use NVIDIA. The colon is for setting priorities, essentially.

After setting this, now we confirm whether the settings applied actually work or not.

To test whether the NVIDIA card is rendering anything, lets check the output of `nvidia-smi`

```
Fri Jul 14 01:14:46 2023       
+-----------------------------------------------------------------------------+
| NVIDIA-SMI 525.125.06   Driver Version: 525.125.06   CUDA Version: 1
2.0     |
|-------------------------------+----------------------+----------------------+
| GPU  Name        Persistence-M| Bus-Id        Disp.A | Volatile Uncorr. ECC |
| Fan  Temp  Perf  Pwr:Usage/Cap|         Memory-Usage | GPU-Util  Compute M. |
|                               |                      |               MIG M. |
|===============================+======================+======================|
|   0  NVIDIA GeForce ...  Off  | 00000000:01:00.0 Off |                  N/A |
| N/A   52C    P8     2W /  30W |      3MiB /  4096MiB |      0%      Default |
|                               |                      |                  N/A |
+-------------------------------+----------------------+----------------------+
+-----------------------------------------------------------------------------+
| Processes:                                                                  |
|  GPU   GI   CI        PID   Type   Process name                  GPU Memory |
|        ID   ID                                                   Usage      |
|=============================================================================|
|    0   N/A  N/A      2869      G   /usr/bin/Hyprland                   1MiB |     
+-----------------------------------------------------------------------------+
```

This is with running a browser and some other stuff. We can confidentally say NVIDIA is not doing anything and is idling.


