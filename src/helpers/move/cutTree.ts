import { TREE_WEIGHT } from "../../constants";
import { CutTreeCell } from "../../entities/Cell";
import type { IMatrix, Coordinates, IUnit } from "../../types";

export const cutTree = ({
  matrix,
  treePosition,
  lumberjack,
}: {
  matrix: IMatrix;
  treePosition: Coordinates;
  lumberjack: IUnit;
}) => {
  matrix.rows[treePosition.i][treePosition.j] = new CutTreeCell();
  lumberjack.collect(TREE_WEIGHT);
};
