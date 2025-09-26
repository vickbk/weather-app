import { UnitsType } from "../types/units-types";
import getMemoItem from "./get-item";
import setMemoItem from "./set-item";

export const defaultUnits: UnitsType = {
  type: "metric",
  temperature: "°C",
  windSpeed: "km/h",
  precipitation: "mm",
};

export const getUnits = (): UnitsType => {
  return (getMemoItem("units") ||
    saveUnits(defaultUnits) ||
    getUnits()) as UnitsType;
};

export const saveUnits = (units: UnitsType) => {
  setMemoItem("units", units);
};
