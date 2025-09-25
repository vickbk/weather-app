import getUnitBasedParams from "../open-meteo/get-unit-based-params";

export type UnitsType = {
  type: "imperial" | "metric";
  temperature: "°F" | "°C";
  windSpeed: "mph" | "km/h";
  precipitation: "in" | "mm";
};

export type UnitKeys = Exclude<keyof UnitsType, "type">;

export type UnitValues = UnitsType[UnitKeys];

export type UnitKeysWithType = keyof UnitsType;

export type UnitHandlersType = {
  setType: () => void;
  setMetric: (key: UnitKeys, value: UnitValues) => void;
};

export type UnitRequestParams = ReturnType<typeof getUnitBasedParams>;
