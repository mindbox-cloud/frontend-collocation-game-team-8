import { TreeCell } from "../entities/Cell";
import type { IMatrix } from "../types";

export const addTreesToMatrix = ({
  matrix,
  emptyCellTreeGrowthPossibility,
  cutTreeTreeGrowthPossibility,
}: {
  matrix: IMatrix;
  emptyCellTreeGrowthPossibility: number;
  cutTreeTreeGrowthPossibility: number;
}): IMatrix => {
  const emptyCells = matrix.getEmptyCells();

  Array.from({ length: emptyCells.length }, () => {
    const tree = new TreeCell();

    const emptyCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];

    if (!emptyCell) {
      return;
    }

    const position = {
      i: emptyCell.i,
      j: emptyCell.j,
    };

    if (Math.random() < emptyCellTreeGrowthPossibility) {
      matrix.rows[position.i][position.j] = tree;
    }
  });

  const cutTrees = matrix.getCutTrees();

  if (cutTrees.length > 0) {
    Array.from({ length: cutTrees.length }, () => {
      const tree = new TreeCell();

      const cutTree = cutTrees[Math.floor(Math.random() * cutTrees.length)];

      if (!cutTree) {
        return;
      }

      const position = {
        i: cutTree.i,
        j: cutTree.j,
      };

      if (Math.random() < cutTreeTreeGrowthPossibility) {
        matrix.rows[position.i][position.j] = tree;
      }
    });
  }

  return matrix;
};
