import { colors } from "../config";
import { CellType, type ICell } from "../types";

export class EmptyCell implements ICell {
  color: string;
  type: CellType;

  constructor() {
    this.color = colors[CellType.EMPTY];
    this.type = CellType.EMPTY;
  }
}

export class TreeCell implements ICell {
  color: string;
  type: CellType;

  constructor() {
    this.color = colors[CellType.TREE];
    this.type = CellType.TREE;
  }
}

export class StoreCell implements ICell {
  color: string;
  type: CellType;

  constructor() {
    this.color = colors[CellType.STORE];
    this.type = CellType.STORE;
  }
}

export class CutTreeCell implements ICell {
  color: string;
  type: CellType;

  constructor() {
    this.color = colors[CellType.CUT_TREE];
    this.type = CellType.CUT_TREE;
  }
}
