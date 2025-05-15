import { type IMatrix, type IUnit } from "../../types";
import { TREE_WEIGHT } from "../../constants";
import { cutTree } from "./cutTree.ts";
import { getNextTreeCell } from "./getNextTreeCell.ts";
import { getNextEmptyCell } from "./getNextEmptyCell.ts";
import { moveLumberjack } from "./moveLumberjack.ts";
import { createPathToStore } from "../createPathToStore.ts";
import { findClosestStore } from "../findClosestStore.ts";
import { unloadTrees } from "./unloadTrees.ts";

const moveToRandomCell = ({
  matrix,
  lumberjack,
}: {
  matrix: IMatrix;
  lumberjack: IUnit;
}) => {
  const nextPosition = getNextEmptyCell({
    matrix,
    currentPosition: lumberjack.position,
  });

  if (nextPosition) {
    moveLumberjack({
      currentPosition: lumberjack.position,
      nextPosition,
      matrix,
    });
  }
};

export const moveLumberjacks = ({ matrix }: { matrix: IMatrix }): IMatrix => {
  const lumberjacks = matrix.getLumberjacks();

  lumberjacks.forEach((lumberjack) => {
    if (lumberjack.isFull) {
      const closestStore = findClosestStore({
        matrix,
        lumberjackPosition: lumberjack.position,
      });

      if (!closestStore) {
        return;
      }

      const pathToStore = createPathToStore({
        matrix,
        lumberjackPosition: lumberjack.position,
        storePosition: closestStore,
      });

      if (!pathToStore.length) {
        moveToRandomCell({
          matrix,
          lumberjack,
        });

        return;
      }

      const store = matrix.getUnitByCoordinates(closestStore);

      if (!store) {
        return;
      }

      if (pathToStore.length === 1) {
        unloadTrees({
          lumberjack,
          store,
        });

        return;
      }

      moveLumberjack({
        currentPosition: lumberjack.position,
        nextPosition: pathToStore[0],
        matrix,
      });

      return;
    }

    const nextTree = getNextTreeCell({
      matrix,
      currentPosition: lumberjack.position,
    });

    if (nextTree && lumberjack.isEnoughSpace(TREE_WEIGHT)) {
      cutTree({
        matrix,
        treePosition: nextTree,
        lumberjack,
      });

      return;
    }

    moveToRandomCell({
      matrix,
      lumberjack,
    });
  });

  return matrix;
};
