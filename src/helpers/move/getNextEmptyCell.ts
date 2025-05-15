import { type IMatrix, type Coordinates, CellType } from "../../types.ts";
import { CoordinateCalculator } from "./CoordinateCalculator.ts";

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
    .getAvailablePositions()
    .filter((nextPosition) => {
      const cell = matrix.rows[nextPosition.i][nextPosition.j];
      const unit = matrix.getUnitByCoordinates(nextPosition);

      if (unit) {
        return false;
      }

      return cell.type === CellType.EMPTY || cell.type === CellType.CUT_TREE;
    });

  if (nextPositions.length === 0) {
    return null;
  }

  return nextPositions[Math.floor(Math.random() * nextPositions.length)];
};
