import { WeatherIcon } from "@/components/common/WeatherIcons";
import { WeatherHourlyData } from "./weather-data";

export type HourlyData = {
  date: Date;
  hourly: WeatherHourlyData[];
};

export type HourlyDisplayData = {
  time: string;
  temp: string;
  icon: WeatherIcon;
  hourly: WeatherHourlyData;
};
