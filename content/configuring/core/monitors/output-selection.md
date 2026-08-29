---
weight: 10
title: Output selection
---

To select an output, a portname or a description (but not both) can be used.

Output of `hyprctl monitors` looks like the following:

```
Monitor `portname` (ID `ID`)
        `mode` at `position`
        description: `description`
        [...]
```

Both `portname` and `description` can be used to select an output:

```lua
hl.monitor({
    output = "portname",
    mode = "preferred", position = "auto"
})

hl.monitor({
    output = "desc:description",
    mode = "preferred", position = "auto"
})
```

{{% details title="Example" closed="true" %}}

```
Monitor eDP-1 (ID 0):
        1920x1080@60.00100 at 0x0
        description: Chimei Innolux Corporation 0x150C
        [...]
```

In the example, portname is `eDP-1` and description is `Chimei Innolux Corporation 0x150C`, so they can be used as follows:

```lua
hl.monitor({
    output = "eDP-1",
    mode = "preferred", position = "auto"
})

hl.monitor({
    output = "desc:Chimei Innolux Corporation 0x150C",
    mode = "preferred", position = "auto"
})
```

{{% /details %}}
