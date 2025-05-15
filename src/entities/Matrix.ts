import type { ICell, IMatrix, MatrixSize } from "../types";
import { getRandomColor } from "../utils/getRandomColor";
import { Cell } from "./Cell";

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
