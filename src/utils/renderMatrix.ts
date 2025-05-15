import { Graphics } from "pixi.js";
import type { IMatrix } from "../components/cell";

export const convertMatrixToGraphic = (
  matrix: IMatrix,
  cellSize: number
): Array<Graphics> => {
  const graphics = matrix.rows.reduce<Array<Graphics>>((acc, row, i) => {
    row.forEach((cell, j) => {
      const newCell = createGraphics({
        x: i * cellSize,
        y: j * cellSize,
        color: cell.color,
        size: cellSize,
      });

      acc.push(newCell);
    });

    return acc;
  }, []);

  return graphics;
};

const createGraphics = ({
  x,
  y,
  size,
  color,
}: {
  x: number;
  y: number;
  size: number;
  color: string;
}) => {
  const obj = new Graphics().rect(0, 0, size, size).fill(color);
  obj.x = x;
  obj.y = y;

  return obj;
};
