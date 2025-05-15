import { CellType, UnitType } from "./types";

export const colors: Record<CellType, string> = {
  [CellType.EMPTY]: "green",
  [CellType.TREE]: "darkgreen",
  [CellType.CUT_TREE]: "red",
};

export const unitColors: Record<UnitType, string> = {
  [UnitType.LUMBERJACK]: "orange",
  [UnitType.STORE]: "black",
  [UnitType.LUMBERJACK_FULL]: "brown",
};
