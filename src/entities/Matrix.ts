import {
  CellType,
  type Coordinates,
  type ICell,
  type IMatrix,
  type MatrixSize,
} from "../types";

import { EmptyCell } from "./Cell";

export class Matrix implements IMatrix {
  rows: Array<Array<ICell>>;

  constructor(matrixSize: MatrixSize) {
    this.rows = this.generateEmptyMatrix(matrixSize);
  }

  private generateEmptyMatrix(matrixSize: MatrixSize) {
    const matrix = Array.from({ length: matrixSize.rowCount }, () =>
      this.generateRow(matrixSize.columnCount)
    );

    return matrix;
  }

  getEmptyCells() {
    return this.getCoordinatesByType(CellType.EMPTY);
  }

  getLumberjacks() {
    return this.getCoordinatesByType(CellType.LUMBERJACK);
  }

  getTrees() {
    return this.getCoordinatesByType(CellType.TREE);
  }

  getStores() {
    return this.getCoordinatesByType(CellType.STORE);
  }

  getCutTrees() {
    return this.getCoordinatesByType(CellType.CUT_TREE);
  }

  private getCoordinatesByType(type: CellType) {
    const coordinates: Array<Coordinates> = [];

    for (let i = 0; i < this.rows.length; i++) {
      for (let j = 0; j < this.rows[i].length; j++) {
        if (this.rows[i][j].type === type) {
          coordinates.push({ i, j });
        }
      }
    }

    return coordinates;
  }

  private generateRow(columnCount: number) {
    return Array.from({ length: columnCount }, () => this.generateEmptyCell());
  }

  private generateEmptyCell() {
    return new EmptyCell();
  }
}
