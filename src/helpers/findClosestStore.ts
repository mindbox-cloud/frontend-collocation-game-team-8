import type { IMatrix, Coordinates } from "../types";

export const findClosestStore = ({
  matrix,
  lumberjackPosition,
}: {
  matrix: IMatrix;
  lumberjackPosition: Coordinates;
}): Coordinates | null => {
  const stores = matrix.getStores();

  if (stores.length === 0) {
    return null;
  }

  const closestStore = stores.reduce<Coordinates | null>((closest, store) => {
    const distanceToCurrentStore = Math.sqrt(
      Math.pow(store.i - lumberjackPosition.i, 2) +
        Math.pow(store.j - lumberjackPosition.j, 2)
    );

    if (!closest) {
      return store;
    }

    const distanceToClosestStore = Math.sqrt(
      Math.pow(closest.i - lumberjackPosition.i, 2) +
        Math.pow(closest.j - lumberjackPosition.j, 2)
    );

    return distanceToCurrentStore < distanceToClosestStore ? store : closest;
  }, null);

  return closestStore;
};
