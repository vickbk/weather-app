import { fetchWeatherApi } from "openmeteo";
import { weatherHourlyDisplayNameKeys } from "./weather-hourly-display-names";
import { PlaceDisplay } from "./places-types";
import { UnitRequestParams } from "./units-types";

export type WeatherResponce = Awaited<
  ReturnType<typeof fetchWeatherApi>
>[number];

export interface WeatherRequest extends UnitRequestParams {
  latitude: number | number[];
  longitude: number | number[];
  hourly?: weatherHourlyDisplayNameKeys[];
  start_date?: string;
  end_date?: string;
  selected_city?: PlaceDisplay | PlaceDisplay[];
  timezone: string;
}
