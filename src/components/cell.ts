import { getRandomColor } from "../utils/getRandomColor";

type Milliseconds = number;
type MatrixSize = {
  rowCount: number;
  columnCount: number;
};

export interface ICell {
  color: string;
}

export interface IMatrix {
  rows: Array<Array<ICell>>;
}

export class Cell implements ICell {
  color: string;

  constructor(color: string) {
    this.color = color;
  }
}

export class Matrix implements IMatrix {
  rows: Array<Array<ICell>>;

  constructor(matrixSize: MatrixSize) {
    this.rows = this.generateMatrix(matrixSize);
  }

  private generateMatrix(matrixSize: MatrixSize) {
    const matrix = Array.from({ length: matrixSize.rowCount }, () =>
      this.generateRow(matrixSize.columnCount)
    );

    return matrix;
  }

  private generateRow(columnCount: number) {
    return Array.from({ length: columnCount }, () => this.generateCell());
  }

  private generateCell() {
    return new Cell(getRandomColor());
  }
}

export interface Config {
  cellSize: number;
  matrixSize: MatrixSize;
  tickTimeout: Milliseconds;
}
