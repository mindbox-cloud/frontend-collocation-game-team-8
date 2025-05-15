export interface Config {
  cellSize: number;
  matrixSize: MatrixSize;
  tickTimeout: Milliseconds;
}

export type Milliseconds = number;
export type MatrixSize = {
  rowCount: number;
  columnCount: number;
};

export interface ICell {
  color: string;
}

export interface IMatrix {
  rows: Array<Array<ICell>>;
}
