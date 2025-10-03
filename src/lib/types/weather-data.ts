import { PlaceDisplay } from "./places-types";
import { WeatherDailiData } from "./weather-daily-display";
import { weatherHourlyDisplayNameValues } from "./weather-hourly-display-names";

export type WeatherData = {
  lat: number;
  lon: number;
  placeName: PlaceDisplay;
  elevation: number;
  utcSec: number;
  hourly: WeatherHourlyData[];
  daily: WeatherDailiData;
};

export type WeatherHourlyAllData = {
  [key in Exclude<weatherHourlyDisplayNameValues, "time">]?: number;
};

export type WeatherHourlyData = WeatherHourlyAllData & {
  time: Date;
};
