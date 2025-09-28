import { UnitsType } from "../types/units-types";

export default function getUnitBasedParams(
  units: UnitsType = {
    temperature: "°C",
    windSpeed: "km/h",
    precipitation: "mm",
    type: "metric",
  }
) {
  return {
    temperature_unit: units.temperature === "°C" ? undefined : "fahrenheit",
    wind_speed_unit: units.windSpeed === "km/h" ? undefined : "mph",
    precipitation_unit: units.precipitation === "mm" ? undefined : "inch",
  } as const;
}
