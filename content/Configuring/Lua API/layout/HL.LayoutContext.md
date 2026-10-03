# HL.LayoutContext

#### *class* HL.LayoutContext

Runtime object.

## Attributes

#### HL.LayoutContext.area

* **Type:**
  [`HL.Box`](../../types/HL.Box#hlbox)

Area.

#### HL.LayoutContext.targets

* **Type:**
  list of [`HL.LayoutTarget`](../HL.LayoutTarget#hllayouttarget)

Targets.

## Methods

#### HL.LayoutContext.grid_cell(i, cols, rows=None)

Return a grid cell box from the layout area.

#### HL.LayoutContext.column(i, n)

Return the `i` th column from `n` columns.

#### HL.LayoutContext.row(i, n)

Return the `i` th row from `n` rows.

#### HL.LayoutContext.split(box, side, ratio)

Split `box` and return the requested side.

### Parameters

side
: Accepted values include `left`, `right`, `top`, `bottom`, `up`, and `down`.

ratio
: Split ratio.
