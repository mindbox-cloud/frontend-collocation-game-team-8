import type {IMatrix} from "../types";
import { Unit } from "../entities/Cell";

export const addLumberjacksToMatrix = ({
  matrix,
  lumberjackCount,
}: {
  matrix: IMatrix;
  lumberjackCount: number;
}):  IMatrix => {
  for (let i = 0; i < lumberjackCount; i++) {
    const availableCells = matrix.getAvailableCells();

    const emptyCell = availableCells[Math.floor(Math.random() * availableCells.length)];

    if (emptyCell) {
      const position = {
        i: emptyCell.i,
        j: emptyCell.j,
      };

      matrix.units.push(new Unit(position))
    }
  }

  return matrix;
};
