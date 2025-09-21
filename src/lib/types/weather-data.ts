import { weatherHourlyDisplayNameValues } from "./weather-hourly-display-names";

export type WeatherData = {
  lat: number;
  lon: number;
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