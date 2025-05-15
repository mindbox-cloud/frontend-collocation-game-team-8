import { Application, Graphics } from "pixi.js";
import { Matrix, type IMatrix } from "./components/cell";
import { convertMatrixToGraphic } from "./utils/renderMatrix";

// Asynchronous IIFE
let matrix: IMatrix;

let elapsed = 0;

(async () => {
  // Create a PixiJS application.
  const app = new Application();

  // Intialize the application.
  await app.init({ background: "#1099bb", resizeTo: window });

  matrix = new Matrix({
    rowCount: 10,
    columnCount: 10,
  });

  convertMatrixToGraphic(matrix, 100).forEach((graphic) => {
    app.stage.addChild(graphic);
  });

  app.ticker.add((time) => {
    elapsed += time.deltaMS;

    if (elapsed >= 1000) {
      matrix = new Matrix({
        rowCount: 10,
        columnCount: 10,
      });

      app.stage.removeChildren();

      convertMatrixToGraphic(matrix, 100).forEach((graphic) => {
        app.stage.addChild(graphic);
      });

      elapsed = 0;
    }
  });
  document.body.appendChild(app.canvas);
})();
