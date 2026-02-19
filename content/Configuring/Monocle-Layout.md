---
weight: 14
title: Monocle Layout
---

Monocle is a layout where windows are always taking up the entire available space.

## Quirks

Due to how layouts work, `cyclenext` will not work with Monocle. For cycling monocle
windows, either use `layoutmsg, cyclenext` or `cyclenext, tiled`.

## Layout messages

Dispatcher `layoutmsg` params:

| name | description | params |
| --- | --- | --- |
| cyclenext | cycle to the next window | none | 
| cycleprev | cycle to the previous window | none | 
