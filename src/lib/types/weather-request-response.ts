import { fetchWeatherApi } from "openmeteo";

export type WeatherResponce = Awaited<
  ReturnType<typeof fetchWeatherApi>
>[number];

export type WeatherRequest = {
  latitude: number;
  longitude: number;
  hourly?: string[];
  start_date?: string;
  end_date?: string;
};
