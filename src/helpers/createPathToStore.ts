import type { IMatrix, Coordinates } from "../types";
import { isValidCell } from "./isValidCell";
import { reconstructPath } from "./reconstructPath";

export const createPathToStore = ({
  matrix,
  lumberjackPosition,
  storePosition,
}: {
  matrix: IMatrix;
  lumberjackPosition: Coordinates;
  storePosition: Coordinates;
}): Array<Coordinates> => {
  // If positions are the same, return empty path
  if (
    lumberjackPosition.i === storePosition.i &&
    lumberjackPosition.j === storePosition.j
  ) {
    return [];
  }

  // Queue for BFS
  const queue: Array<Coordinates> = [lumberjackPosition];

  // Keep track of visited cells
  const visited: Set<string> = new Set();

  visited.add(`${lumberjackPosition.i},${lumberjackPosition.j}`);

  // Keep track of parent cells to reconstruct the path
  const parent: Map<string, Coordinates> = new Map();

  // Possible moves (up, right, down, left)
  const directions = [
    { i: -1, j: 0 },
    { i: 0, j: 1 },
    { i: 1, j: 0 },
    { i: 0, j: -1 },
  ];

  // BFS to find the shortest path
  while (queue.length > 0) {
    const current = queue.shift()!;

    // Check if we reached the target
    if (current.i === storePosition.i && current.j === storePosition.j) {
      // Reconstruct the path
      return reconstructPath(parent, storePosition);
    }

    // Try all four directions
    for (const dir of directions) {
      const next: Coordinates = {
        i: current.i + dir.i,
        j: current.j + dir.j,
      };

      // Check if the next cell is valid and not visited
      if (isValidCell(next, matrix) && !visited.has(`${next.i},${next.j}`)) {
        visited.add(`${next.i},${next.j}`);
        queue.push(next);
        parent.set(`${next.i},${next.j}`, current);
      }
    }
  }

  // If no path is found, return empty array
  return [];
};
