import { unitColors } from "../config";
import type { IUnit, Coordinates, Inventory, UnitType } from "../types";

export class Unit implements IUnit {
  inventory;
  position;
  type;

  isFull: boolean = false;

  constructor(position: Coordinates, inventory: Inventory, type: UnitType) {
    this.position = position;
    this.inventory = inventory;
    this.type = type;
  }

  get color() {
    if (!this.isFull) {
      return unitColors[this.type];
    }
    return unitColors.lumberjack_full;
  }

  collect(treeWeight: number): void {
    this.inventory.currentCapacity += treeWeight;
  }

  unload(): number {
    const load = this.inventory.currentCapacity;

    this.inventory.currentCapacity = 0;
    this.isFull = false;

    return load;
  }

  isEnoughSpace(treeWeight: number) {
    if (this.isFull) {
      return false;
    }

    const isEnoughSpace =
      this.inventory.currentCapacity <= this.inventory.maxCapacity - treeWeight;

    this.isFull = !isEnoughSpace;

    return isEnoughSpace;
  }
}
