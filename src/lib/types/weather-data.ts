import { PlaceDisplay } from "./places-types";
import { weatherHourlyDisplayNameValues } from "./weather-hourly-display-names";

export type WeatherData = {
  lat: number;
  lon: number;
  placeName: PlaceDisplay;
  elevation: number;
  utcSec: number;
  hourly: WeatherHourlyData[];
};

export type WeatherHourlyAllData = {
  [key in Exclude<weatherHourlyDisplayNameValues, "time">]?: number;
};

export interface WeatherHourlyData extends WeatherHourlyAllData {
  time: Date;
}
