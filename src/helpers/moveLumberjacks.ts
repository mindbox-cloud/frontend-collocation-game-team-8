import { CutTreeCell } from "../entities/Cell";
import {
  CellType,
  type Coordinates,
  type IMatrix, type IUnit,
  type MatrixSize,
} from "../types";
import {TREE_WEIGHT} from "../constants.ts";

class CoordinateCalculator {
  currentPosition: Coordinates;
  matrixSize: MatrixSize;

  constructor(currentPosition: Coordinates, matrixSize: MatrixSize) {
    this.currentPosition = currentPosition;
    this.matrixSize = matrixSize;
  }

  getNextPositions(): Array<Coordinates> {
    return [
      this.getUpperPosition(),
      this.getLowerPosition(),
      this.getLeftPosition(),
      this.getRightPosition(),
      this.getUpLeftPosition(),
      this.getUpRightPosition(),
      this.getDownLeftPosition(),
      this.getDownRightPosition(),
    ].filter((position): position is Coordinates => position !== null);
  }

  private getUpperPosition(): Coordinates | null {
    if (this.currentPosition.i === 0) {
      return null;
    }

    return {
      i: this.currentPosition.i - 1,
      j: this.currentPosition.j,
    };
  }

  private getLowerPosition(): Coordinates | null {
    if (this.currentPosition.i === this.matrixSize.rowCount - 1) {
      return null;
    }

    return {
      i: this.currentPosition.i + 1,
      j: this.currentPosition.j,
    };
  }

  private getLeftPosition(): Coordinates | null {
    if (this.currentPosition.j === 0) {
      return null;
    }

    return {
      i: this.currentPosition.i,
      j: this.currentPosition.j - 1,
    };
  }

  private getRightPosition(): Coordinates | null {
    if (this.currentPosition.j === this.matrixSize.columnCount - 1) {
      return null;
    }

    return {
      i: this.currentPosition.i,
      j: this.currentPosition.j + 1,
    };
  }

  private getUpLeftPosition(): Coordinates | null {
    if (this.currentPosition.i === 0 || this.currentPosition.j === 0) {
      return null;
    }

    return {
      i: this.currentPosition.i - 1,
      j: this.currentPosition.j - 1,
    };
  }

  private getUpRightPosition(): Coordinates | null {
    if (
      this.currentPosition.i === 0 ||
      this.currentPosition.j === this.matrixSize.columnCount - 1
    ) {
      return null;
    }

    return {
      i: this.currentPosition.i - 1,
      j: this.currentPosition.j + 1,
    };
  }

  private getDownLeftPosition(): Coordinates | null {
    if (
      this.currentPosition.i === this.matrixSize.rowCount - 1 ||
      this.currentPosition.j === 0
    ) {
      return null;
    }

    return {
      i: this.currentPosition.i + 1,
      j: this.currentPosition.j - 1,
    };
  }

  private getDownRightPosition(): Coordinates | null {
    if (
      this.currentPosition.i === this.matrixSize.rowCount - 1 ||
      this.currentPosition.j === this.matrixSize.columnCount - 1
    ) {
      return null;
    }

    return {
      i: this.currentPosition.i + 1,
      j: this.currentPosition.j + 1,
    };
  }
}

export const moveLumberjack = ({
  currentPosition,
  nextPosition,
  matrix,
}: {
  currentPosition: Coordinates;
  nextPosition: Coordinates;
  matrix: IMatrix;
}) => {
  const lumberjackIndex = matrix.units.findIndex(unit => unit.position.i === currentPosition.i && unit.position.j === currentPosition.j);

  if (lumberjackIndex === -1) {return}

  matrix.units[lumberjackIndex].position = nextPosition
};

export const getNextEmptyCell = ({
  matrix,
  currentPosition,
}: {
  matrix: IMatrix;
  currentPosition: Coordinates;
}) => {
  const coordinateCalculator = new CoordinateCalculator(currentPosition, {
    rowCount: matrix.rows.length,
    columnCount: matrix.rows[0].length,
  });

  const nextPositions = coordinateCalculator
    .getNextPositions()
    .filter((nextPosition) => {
      const cell = matrix.rows[nextPosition.i][nextPosition.j];
      return cell.type === CellType.EMPTY || cell.type === CellType.CUT_TREE;
    });

  if (nextPositions.length === 0) {
    return null;
  }

  return nextPositions[Math.floor(Math.random() * nextPositions.length)];
};

export const getNextTreeCell = ({
  matrix,
  currentPosition,
}: {
  matrix: IMatrix;
  currentPosition: Coordinates;
}) => {
  const coordinateCalculator = new CoordinateCalculator(currentPosition, {
    rowCount: matrix.rows.length,
    columnCount: matrix.rows[0].length,
  });

  const nextPositions = coordinateCalculator
    .getNextPositions()
    .filter((nextPosition) => {
      const cell = matrix.rows[nextPosition.i][nextPosition.j];
      return cell.type === CellType.TREE;
    });

  if (nextPositions.length === 0) {
    return null;
  }

  return nextPositions[Math.floor(Math.random() * nextPositions.length)];
};

export const cutTree = ({
  matrix,
  treePosition,
  lumberjack
}: {
  matrix: IMatrix;
  treePosition: Coordinates;
  lumberjack: IUnit
}) => {
  matrix.rows[treePosition.i][treePosition.j] = new CutTreeCell();
  lumberjack.collect(TREE_WEIGHT)
};

export const moveLumberjacks = ({ matrix }: { matrix: IMatrix }): IMatrix => {
  const lumberjacks = matrix.getLumberjacks();

  lumberjacks.forEach((lumberjack) => {
    const nextTree = getNextTreeCell({
      matrix,
      currentPosition: lumberjack.position,
    });

    if (nextTree && lumberjack.isEnoughSpace(TREE_WEIGHT)) {
      cutTree({
        matrix,
        treePosition: nextTree,
        lumberjack
      });

      return;
    }

    const nextPosition = getNextEmptyCell({
      matrix,
      currentPosition: lumberjack.position,
    });

    if (nextPosition) {
      moveLumberjack({
        currentPosition: lumberjack.position,
        nextPosition,
        matrix,
      });
    }
  });

  return matrix;
};
