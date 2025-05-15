import type { Coordinates, MatrixSize } from "../../types";

export class CoordinateCalculator {
  currentPosition: Coordinates;
  matrixSize: MatrixSize;

  constructor(currentPosition: Coordinates, matrixSize: MatrixSize) {
    this.currentPosition = currentPosition;
    this.matrixSize = matrixSize;
  }

  getAvailablePositions(): Array<Coordinates> {
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
