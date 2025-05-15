import type { IMatrix } from "../types";
import { LumberjackCell } from "../entities/Cell";

export const addLumberjacksToMatrix = ({
  matrix,
  lumberjackCount,
}: {
  matrix: IMatrix;
  lumberjackCount: number;
}): IMatrix => {
  Array.from({ length: lumberjackCount }, () => {
    const lumberjack = new LumberjackCell();

    const emptyCells = matrix.getEmptyCells();

    const emptyCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    if (!emptyCell) {
      return;
    }
    const position = {
      i: emptyCell.i,
      j: emptyCell.j,
    };

    matrix.rows[position.i][position.j] = lumberjack;
  });

  return matrix;
};
