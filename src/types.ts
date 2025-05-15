export interface Config {
  cellSize: number;
  matrixSize: MatrixSize;
  tickTimeout: Milliseconds;
}

export enum CellType {
  EMPTY = "empty",
  TREE = "tree",
  CUT_TREE = "cut_tree",
  STORE = "store",
  LUMBERJACK = "lumberjack",
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
  getLumberjacks(): Array<Coordinates>;
  getTrees(): Array<Coordinates>;
  getStores(): Array<Coordinates>;
}
