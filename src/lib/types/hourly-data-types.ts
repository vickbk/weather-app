import { WeatherHourlyData } from "./weather-data";

export type HourlyData = {
  date: Date;
  hourly: WeatherHourlyData[];
};
