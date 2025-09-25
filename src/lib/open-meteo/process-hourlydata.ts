import getDateOnly from "../date/get-date-only";
import { WeatherHourlyData } from "../types/weather-data";

export function groupHourlyDataInDays(hourly: WeatherHourlyData[]) {
  const days: string[] = getHourlydataDates(hourly);
  return days.map((day) => ({
    date: new Date(day),
    hourly: hourly.filter(({ time }) => getDateOnly(time) === day),
  }));
}

export const getHourlydataDates = (hourly: WeatherHourlyData[]) => {
  return Array.from(new Set(hourly.map(({ time }) => getDateOnly(time))));
};
