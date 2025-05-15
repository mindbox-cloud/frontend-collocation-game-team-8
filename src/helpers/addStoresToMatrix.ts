import { UnitType, type IMatrix } from "../types";

import { Unit } from "../entities/Unit";
import { DEFAULT_STORE_INVENTORY } from "../constants";

export const addStoresToMatrix = ({
  matrix,
  storeCount,
}: {
  matrix: IMatrix;
  storeCount: number;
}): IMatrix => {
  Array.from({ length: storeCount }, () => {
    const emptyCells = matrix.getEmptyCells();

    const emptyCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];

    const position = {
      i: emptyCell.i,
      j: emptyCell.j,
    };

    matrix.stores.push(
      new Unit(position, DEFAULT_STORE_INVENTORY, UnitType.STORE)
    );
  });

  return matrix;
};
