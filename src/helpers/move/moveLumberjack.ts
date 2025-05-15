import { type Coordinates, type IMatrix } from "../../types";

export const moveLumberjack = ({
  currentPosition,
  nextPosition,
  matrix,
}: {
  currentPosition: Coordinates;
  nextPosition: Coordinates;
  matrix: IMatrix;
}) => {
  const lumberjackIndex = matrix.lumberjacks.findIndex(
    (unit) =>
      unit.position.i === currentPosition.i &&
      unit.position.j === currentPosition.j
  );

  if (lumberjackIndex === -1) {
    return;
  }

  matrix.lumberjacks[lumberjackIndex].position = nextPosition;
};
