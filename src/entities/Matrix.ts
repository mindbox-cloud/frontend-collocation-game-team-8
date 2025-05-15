import {
  CellType,
  type Coordinates,
  type ICell,
  type IMatrix, type IUnit,
  type MatrixSize,
} from "../types";

import { EmptyCell } from "./Cell";

export class Matrix implements IMatrix {
  rows: Array<Array<ICell>>;
  units: Array<IUnit>

  constructor(matrixSize: MatrixSize) {
    this.rows = this.generateEmptyMatrix(matrixSize);
    this.units = []
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
    return this.units;
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

  getLumberjackCoordinates() {
    return this.units.map(unit => unit.position)
  }

  getAvailableCells() {
    return [...this.getEmptyCells(), ...this.getCutTrees()].filter((cell) => {
      let available = true;

      this.units.forEach((unit) => {
        if(cell.i === unit.position.i && cell.j === unit.position.j){
          available = false;
        }
      })

      return available
    });
  }

  private generateRow(columnCount: number) {
    return Array.from({ length: columnCount }, () => this.generateEmptyCell());
  }

  private generateEmptyCell() {
    return new EmptyCell();
  }
}
