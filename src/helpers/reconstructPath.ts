import type { Coordinates } from "../types";

export const reconstructPath = (
  parent: Map<string, Coordinates>,
  target: Coordinates
): Array<Coordinates> => {
  const path: Array<Coordinates> = [];
  let current = target;

  // Start from the target and work backwards
  while (parent.has(`${current.i},${current.j}`)) {
    path.unshift(current);
    current = parent.get(`${current.i},${current.j}`)!;
  }

  return path;
};
