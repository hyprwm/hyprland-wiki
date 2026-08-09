---
weight: 40
title: Monocle layout
---

Monocle is a layout where windows are always taking up the entire available space.

<video width="1024" height="566" autoplay muted loop>
  <source src="https://dl.hypr.land/wiki/demo_monocle.mp4" type="video/mp4">
</video>

## Quirks

Due to how layouts work, `hl.dsp.window.cycle_next()` will not work with Monocle. For cycling monocle
windows, either use `hl.dsp.layout("cyclenext")` or `hl.dsp.window.cycle_next({ tiled = true })`.

## Layout messages

Dispatcher `hl.dsp.layout(msg)` params:

| name | description | params |
| --- | --- | --- |
| cyclenext | cycle to the next window | none | 
| cycleprev | cycle to the previous window | none | 
