import type { ICell } from "../types";

export class Cell implements ICell {
  color: string;

  constructor(color: string) {
    this.color = color;
  }
}
