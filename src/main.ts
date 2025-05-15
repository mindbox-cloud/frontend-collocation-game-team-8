import { Application } from "pixi.js";
import { convertMatrixToGraphic } from "./utils/renderMatrix";
import type { IMatrix } from "./types";
import { Matrix } from "./entities/Matrix";
import { addStoresToMatrix } from "./helpers/addStoresToMatrix";
import { addLumberjacksToMatrix } from "./helpers/addLumberjacksToMatrix";
import { addTreesToMatrix } from "./helpers/addTreesToMatrix";
import { moveLumberjacks } from "./helpers/move/moveLumberjacks";

const config = {
  emptyCellTreeGrowthPossibility:
    Number(localStorage.getItem("emptyCellTreeGrowthPossibility")) || 0.3,
  cutTreeTreeGrowthPossibility:
    Number(localStorage.getItem("cutTreeTreeGrowthPossibility")) || 0.1,
  rowCount: Number(localStorage.getItem("rowCount")) || 10,
  columnCount: Number(localStorage.getItem("columnCount")) || 10,
  storeCount: Number(localStorage.getItem("storeCount")) || 3,
  lumberjackCount: Number(localStorage.getItem("lumberjackCount")) || 3,
};

let matrix: IMatrix = new Matrix({
  rowCount: config.rowCount,
  columnCount: config.columnCount,
});
let elapsed = 0;

const controlPanel = document.createElement("div");
controlPanel.style.position = "fixed";
controlPanel.style.top = "10px";
controlPanel.style.right = "10px";
controlPanel.style.backgroundColor = "rgba(255, 255, 255, 0.8)";
controlPanel.style.padding = "10px";
controlPanel.style.borderRadius = "5px";

const createInput = (
  label: string,
  key: keyof typeof config,
  min = 0,
  max = 1,
  step = 0.1
) => {
  const container = document.createElement("div");
  container.style.marginBottom = "5px";

  const labelElement = document.createElement("label");
  labelElement.textContent = `${label}: `;

  const input = document.createElement("input");
  input.type = "number";
  input.value = String(config[key]);
  input.min = String(min);
  input.max = String(max);
  input.step = String(step);
  input.style.marginLeft = "5px";
  input.style.width = "60px";

  input.addEventListener("change", (e) => {
    localStorage.setItem(key, (e.target as HTMLInputElement).value);
    config[key] = Number((e.target as HTMLInputElement).value);
    restartSimulation();
  });

  container.appendChild(labelElement);
  container.appendChild(input);
  return container;
};

controlPanel.appendChild(
  createInput("Empty Cell Tree Growth", "emptyCellTreeGrowthPossibility")
);
controlPanel.appendChild(
  createInput("Cut Tree Growth", "cutTreeTreeGrowthPossibility")
);
controlPanel.appendChild(createInput("Row Count", "rowCount", 5, 20, 1));
controlPanel.appendChild(createInput("Column Count", "columnCount", 5, 20, 1));
controlPanel.appendChild(createInput("Store Count", "storeCount", 1, 10, 1));
controlPanel.appendChild(
  createInput("Lumberjack Count", "lumberjackCount", 1, 10, 1)
);

document.body.appendChild(controlPanel);

const restartSimulation = () => {
  matrix = new Matrix({
    rowCount: config.rowCount,
    columnCount: config.columnCount,
  });

  addStoresToMatrix({
    matrix,
    storeCount: config.storeCount,
  });

  addLumberjacksToMatrix({
    matrix,
    lumberjackCount: config.lumberjackCount,
  });
};

(async () => {
  const app = new Application();

  await app.init({
    background: "#1099bb",
    width: 1000,
    height: 1000,
    resizeTo: window,
  });

  restartSimulation();

  console.log(matrix);

  convertMatrixToGraphic(matrix, 50).forEach((graphic) => {
    app.stage.addChild(graphic);
  });

  app.ticker.add((time) => {
    elapsed += time.deltaMS;

    if (elapsed >= 1000) {
      app.stage.removeChildren();

      moveLumberjacks({ matrix });

      addTreesToMatrix({
        matrix,
        emptyCellTreeGrowthPossibility: config.emptyCellTreeGrowthPossibility,
        cutTreeTreeGrowthPossibility: config.cutTreeTreeGrowthPossibility,
      });

      convertMatrixToGraphic(matrix, 50).forEach((graphic) => {
        app.stage.addChild(graphic);
      });

      elapsed = 0;
    }
  });
  document.body.appendChild(app.canvas);
})();
