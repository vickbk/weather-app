import { saveUnits } from "@/lib/memorization/units";
import { UnitKeys, UnitsType } from "@/lib/types/units-types";

export default function unitSetters([units, setUnits]: [
  UnitsType,
  (units: UnitsType) => void
]) {
  const keyValues: { [key in Exclude<UnitKeys, "type">]: UnitsType[key][] } = {
    temperature: ["°C", "°F"],
    windSpeed: ["km/h", "mph"],
    precipitation: ["mm", "in"],
  } as const;

  const saveUnitsToLocalStorage = (units: UnitsType) => saveUnits(units);

  return {
    setType: () => {
      const type = units.type === "metric";
      const values = {
        type: type ? "imperial" : "metric",
        temperature: type ? "°F" : "°C",
        windSpeed: type ? "mph" : "km/h",
        precipitation: type ? "in" : "mm",
      } as UnitsType;
      saveUnitsToLocalStorage(values);
      setUnits(values);
    },
    setMetric: (key: UnitKeys, value: UnitsType[UnitKeys]) => {
      //   get the index of the value in keyValues
      const index =
        value &&
        (keyValues[key] as UnitsType[UnitKeys][]).indexOf(
          value as UnitsType[UnitKeys]
        );
      // if index is 0, set type to metric, else set to imperial
      const type = index === 1 ? "imperial" : "metric";
      const values = {
        ...units,
        [key]: value!,
        type,
      } as UnitsType;
      saveUnitsToLocalStorage(values);
      setUnits(values);
    },
  };
}
