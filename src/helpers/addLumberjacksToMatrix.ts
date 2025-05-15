import { UnitType, type IMatrix } from "../types";
import { Unit } from "../entities/Unit";
import { DEFAULT_LUMBERJACK_INVENTORY } from "../constants";

export const addLumberjacksToMatrix = ({
  matrix,
  lumberjackCount,
}: {
  matrix: IMatrix;
  lumberjackCount: number;
}): IMatrix => {
  for (let i = 0; i < lumberjackCount; i++) {
    const availableCells = matrix.getAvailableCells();

    const emptyCell =
      availableCells[Math.floor(Math.random() * availableCells.length)];

    if (emptyCell) {
      const position = {
        i: emptyCell.i,
        j: emptyCell.j,
      };

      matrix.lumberjacks.push(
        new Unit(position, DEFAULT_LUMBERJACK_INVENTORY, UnitType.LUMBERJACK)
      );
    }
  }

  return matrix;
};
