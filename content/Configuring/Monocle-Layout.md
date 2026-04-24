---
weight: 14
title: Monocle Layout
---

Monocle is a layout where windows are always taking up the entire available space.

## Quirks

Due to how layouts work, `hl.dsp.window.cycle_next()` will not work with Monocle. For cycling monocle
windows, either use `hl.dsp.layout("cyclenext")` or `hl.dsp.window.cycle_next("tiled")`.

## Layout messages

Dispatcher `hl.layout(msg)` params:

| name | description | params |
| --- | --- | --- |
| cyclenext | cycle to the next window | none | 
| cycleprev | cycle to the previous window | none | 
