export interface Config {
  cellSize: number;
  matrixSize: MatrixSize;
  tickTimeout: Milliseconds;
}

export enum CellType {
  EMPTY = "empty",
  TREE = "tree",
  CUT_TREE = "cut_tree",
}

export enum UnitType {
  LUMBERJACK = "lumberjack",
  LUMBERJACK_FULL = "lumberjack_full",
  STORE = "store",
}

export type Milliseconds = number;
export type MatrixSize = {
  rowCount: number;
  columnCount: number;
};

export interface ICell {
  color: string;
  type: CellType;
}

export interface Coordinates {
  i: number;
  j: number;
}

export interface IMatrix {
  rows: Array<Array<ICell>>;
  getEmptyCells(): Array<Coordinates>;
  getCutTrees(): Array<Coordinates>;
  getLumberjacks(): Array<IUnit>;
  getTrees(): Array<Coordinates>;
  getStores(): Array<Coordinates>;
  getAvailableCells(): Array<Coordinates>;

  getUnitByCoordinates(coordinates: Coordinates): IUnit | null;
  lumberjacks: IUnit[];
  stores: IUnit[];
}

export type Inventory = {
  maxCapacity: number;
  currentCapacity: number;
};

export interface IUnit {
  position: Coordinates;
  inventory: Inventory;
  isEnoughSpace(treeWeight: number): boolean;
  collect(treeWeight: number): void;
  type: UnitType;
  color: string;
  isFull: boolean;
  unload(): number;
}
