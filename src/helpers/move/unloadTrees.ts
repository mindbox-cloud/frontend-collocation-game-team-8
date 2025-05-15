import type { IUnit } from "../../types";

export const unloadTrees = ({
  lumberjack,
  store,
}: {
  lumberjack: IUnit;
  store: IUnit;
}) => {
  store.collect(lumberjack.unload());
};
