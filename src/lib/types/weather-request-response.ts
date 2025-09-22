import { fetchWeatherApi } from "openmeteo";
import { weatherHourlyDisplayNameKeys } from "./weather-hourly-display-names";

export type WeatherResponce = Awaited<
  ReturnType<typeof fetchWeatherApi>
>[number];

export type WeatherRequest = {
  latitude: number;
  longitude: number;
  hourly?: weatherHourlyDisplayNameKeys[];
  start_date?: string;
  end_date?: string;
};
