import { CellType } from "./types";

export const colors: Record<CellType, string> = {
  [CellType.EMPTY]: "green",
  [CellType.TREE]: "darkgreen",
  [CellType.CUT_TREE]: "red",
  [CellType.STORE]: "black",
  [CellType.LUMBERJACK]: "orange",
};
