---
weight: 12
title: Self Hosting
---

Follow this brief guide to download and host locally your own version of the Hyprland Wiki.  
You can either choose a specific version, or grab the latest to date and keep it updated with just a couple of commands.

## Dependencies

You'll need the follwing programs:

{{< tabs items="Arch,NixOS" >}}

{{< tab >}}

```shell
sudo pacman -Sy git hugo awk findutils
```

{{< /tab >}}

{{< tab >}}

```shell
TODO!
```

{{< /tab >}}

{{< /tabs >}}

## Cloning

Clone the official repository:

```shell
git clone https://github.com/hyprwm/hyprland-wiki.git
cd hyprland-wiki
```

## Selecting a version

### Latest
If you just cloned it, you're already set.  
If you want to make sure you're up to date, run:

```shell
git pull
```

### Specific

{{< callout type=info >}}

As of now, only versions that go as far back as `v0.37.0` are available to download.

{{< /callout >}}

To download a specific version, run:

```shell
git log --follow --pretty=format:"%H | %ad | %s"     \
    --date=short -- pages/version-selector.md |      \
    fzf --delimiter='|' | \ awk -F'|' '{print $1}' | \
    xargs git checkout
```
You'll be presented with a list of availabe versions to choose from, e.g.:

```plain
bb360509e1b5d008f5c96a26473600dc8ca4f8e8 | 2025-07-24 | pages -> content
4021d03a25752e8e2269bf833b10078446f8b66a | 2025-07-16 | versions: add 0.50
a670976b7967439b66b43f1bad3192d7bdda35e6 | 2025-05-08 | selector: add 0.49.0
6ac038ad503d3aec9f6f16a0238f7f5da6818c84 | 2025-03-23 | versions: add 0.48.0
...
```
Just select one, and it will be checked out locally.

## Serving

Finally, to serve locally, run:

```shell
hugo serve
```