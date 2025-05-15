import { Graphics } from "pixi.js";

export const createGraphics = (color: string) => {
  return new Graphics()
    .rect(0, 0, 100, 100) // Create a rectangle with dimensions 200x100
    .fill(color); // Fill the rectangle with a red color
};
