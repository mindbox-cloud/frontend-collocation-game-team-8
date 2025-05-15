import { Application } from "pixi.js";
import { convertMatrixToGraphic } from "./utils/renderMatrix";
import type { IMatrix } from "./types";
import { Matrix } from "./entities/Matrix";
import { addStoresToMatrix } from "./helpers/addStoresToMatrix";
import { addLumberjacksToMatrix } from "./helpers/addLumberjacksToMatrix";
import { addTreesToMatrix } from "./helpers/addTreesToMatrix";
import { moveLumberjacks } from "./helpers/moveLumberjacks";

let matrix: IMatrix;

let elapsed = 0;

(async () => {
  const app = new Application();

  await app.init({
    background: "#1099bb",
    width: 1000,
    height: 1000,
    resizeTo: window,
  });

  matrix = new Matrix({
    rowCount: 10,
    columnCount: 10,
  });

  addStoresToMatrix({
    matrix,
    storeCount: 3,
  });

  addLumberjacksToMatrix({
    matrix,
    lumberjackCount: 3,
  });

  console.log(matrix);

  convertMatrixToGraphic(matrix, 50).forEach((graphic) => {
    app.stage.addChild(graphic);
  });

  app.ticker.add((time) => {
    elapsed += time.deltaMS;

    if (elapsed >= 1000) {
      app.stage.removeChildren();

      addTreesToMatrix({
        matrix,
        emptyCellTreeGrowthPossibility: 0.3,
        cutTreeTreeGrowthPossibility: 0.1,
      });

      moveLumberjacks({ matrix });

      convertMatrixToGraphic(matrix, 50).forEach((graphic) => {
        app.stage.addChild(graphic);
      });

      elapsed = 0;
    }
  });
  document.body.appendChild(app.canvas);
})();
