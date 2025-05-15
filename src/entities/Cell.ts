import { colors } from "../config";
import {CellType, type Coordinates, type ICell, type IUnit} from "../types";
import {DEFAULT_INVENTORY} from "../constants.ts";


export class Unit implements IUnit {
  inventory
  position

  constructor(position: Coordinates) {
    this.position = position;
    this.inventory = DEFAULT_INVENTORY
  }

  collect(treeWeight: number): void {this.inventory.currentCapacity+= treeWeight}

  isEnoughSpace(treeWeight: number) {return this.inventory.currentCapacity <= this.inventory.maxCapacity - treeWeight;}
}

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
