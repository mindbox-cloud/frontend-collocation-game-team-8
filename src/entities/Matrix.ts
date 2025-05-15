import {
  CellType,
  type Coordinates,
  type ICell,
  type IMatrix,
  type IUnit,
  type MatrixSize,
} from "../types";

import { EmptyCell } from "./Cell";

export class Matrix implements IMatrix {
  rows: Array<Array<ICell>>;
  lumberjacks: Array<IUnit>;
  stores: Array<IUnit>;

  constructor(matrixSize: MatrixSize) {
    this.rows = this.generateEmptyMatrix(matrixSize);
    this.lumberjacks = [];
    this.stores = [];
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
    return this.lumberjacks;
  }

  getTrees() {
    return this.getCoordinatesByType(CellType.TREE);
  }

  getStores() {
    return this.stores.map((unit) => unit.position);
  }

  getCutTrees() {
    return this.getCoordinatesByType(CellType.CUT_TREE);
  }

  getUnitByCoordinates(coordinates: Coordinates) {
    const allUnits = [...this.lumberjacks, ...this.stores];

    const unit = allUnits.find(
      (unit) =>
        unit.position.i === coordinates.i && unit.position.j === coordinates.j
    );

    return unit || null;
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
    return this.lumberjacks.map((unit) => unit.position);
  }

  getAvailableCells() {
    return [...this.getEmptyCells(), ...this.getCutTrees()].filter((cell) => {
      let available = true;

      this.lumberjacks.forEach((unit) => {
        if (cell.i === unit.position.i && cell.j === unit.position.j) {
          available = false;
        }
      });

      return available;
    });
  }

  private generateRow(columnCount: number) {
    return Array.from({ length: columnCount }, () => this.generateEmptyCell());
  }

  private generateEmptyCell() {
    return new EmptyCell();
  }
}
