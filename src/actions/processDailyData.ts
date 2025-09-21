import { WeatherData, WeatherHourlyData } from "@/lib/types/weather-data";
import getDateOnly, { getDayShort } from "@/lib/date/get-date-only";
import iconRain from "@images/icon-rain.webp";

export default function processDailyData(dailyData: WeatherData[]) {
  const [{ hourly }] = dailyData;
  return getDailyData(getDatesAndSort(hourly), hourly).map(
    ({ day, highest, lowest }) => ({
      highest: `${highest.temp?.toFixed()}`,
      lowest: `${lowest.temp?.toFixed()}`,
      day,
      icon: { desc: "", image: iconRain },
    })
  );
}

function getDailyData(dates: string[], hourly: WeatherHourlyData[]) {
  return dates
    .map((date) => {
      const dateData = hourly?.filter(({ time }) => getDateOnly(time) === date);
      const [highest] = dateData;
      return {
        highest,
        lowest: dateData[dateData.length - 1],
        day: getDayShort(highest.time),
        index: highest.time.getDate(),
      };
    })
    .sort(({ index: a }, { index: b }) => a - b);
}

function getDatesAndSort(hourly: WeatherHourlyData[]) {
  hourly.sort((a, b) => (b.temp ?? 0) - (a.temp ?? 0));
  return Array.from(new Set(hourly?.map(({ time }) => getDateOnly(time))));
}
