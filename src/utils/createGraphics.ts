import { Graphics } from "pixi.js";

export const createGraphics = (color: string) => {
  return new Graphics().rect(0, 0, 100, 100).fill(color);
};
