import type { Inventory } from "./types.ts";

export const DEFAULT_LUMBERJACK_INVENTORY: Inventory = {
  maxCapacity: 100,
  currentCapacity: 0,
};

export const TREE_WEIGHT = 25;

export const DEFAULT_STORE_INVENTORY: Inventory = {
  maxCapacity: 1000,
  currentCapacity: 0,
};
