import type { IMatrix } from "../types";
import { StoreCell } from "../entities/Cell";

export const addStoresToMatrix = ({
  matrix,
  storeCount,
}: {
  matrix: IMatrix;
  storeCount: number;
}): IMatrix => {
  Array.from({ length: storeCount }, () => {
    const store = new StoreCell();

    const emptyCells = matrix.getEmptyCells();

    const emptyCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];

    const position = {
      i: emptyCell.i,
      j: emptyCell.j,
    };

    matrix.rows[position.i][position.j] = store;
  });

  return matrix;
};
