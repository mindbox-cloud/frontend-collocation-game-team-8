import { CellType, type Coordinates, type IMatrix } from "../types";

export const isValidCell = (
  coordinates: Coordinates,
  matrix: IMatrix
): boolean => {
  const { i, j } = coordinates;

  // Check if within bounds
  if (i < 0 || j < 0 || i >= matrix.rows.length || j >= matrix.rows[0].length) {
    return false;
  }

  // Check if the cell is walkable (not a tree)
  const cell = matrix.rows[i][j];
  return cell.type !== CellType.TREE;
};
