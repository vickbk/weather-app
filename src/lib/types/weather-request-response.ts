import { fetchWeatherApi } from "openmeteo";
import { weatherHourlyDisplayNameKeys } from "./weather-hourly-display-names";
import { PlaceDisplay } from "./places-types";

export type WeatherResponce = Awaited<
  ReturnType<typeof fetchWeatherApi>
>[number];

export type WeatherRequest = {
  latitude: number;
  longitude: number;
  hourly?: weatherHourlyDisplayNameKeys[];
  start_date?: string;
  end_date?: string;
  selected_city?: PlaceDisplay;
  timezone: string;
};
