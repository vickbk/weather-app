import { WeatherData, WeatherHourlyData } from "@/lib/types/weather-data";
import getDateOnly, { getDayShort } from "@/lib/date/get-date-only";
import weatherIcons, { WeatherCode } from "@/components/common/WeatherIcons";

export default function processDailyData(dailyData: WeatherData[]) {
  const [{ hourly }] = dailyData;

  return getDailyData(getDatesAndSort(hourly), hourly).map(
    ({ day, highest, lowest, weatherCode }) => ({
      highest: `${highest.temp?.toFixed()}`,
      lowest: `${lowest.temp?.toFixed()}`,
      day,
      icon: weatherIcons.get(weatherCode),
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
        lowest: dateData.at(-1)!,
        day: getDayShort(highest.time),
        index: highest.time.getTime(),
        weatherCode: frequentWeatherCode(
          dateData.map((a) => a.weatherCode as WeatherCode)
        ),
      };
    })
    .sort(({ index: a }, { index: b }) => a - b);
}

function getDatesAndSort(hourly: WeatherHourlyData[]) {
  hourly.sort((a, b) => (b.temp ?? 0) - (a.temp ?? 0));
  return Array.from(new Set(hourly?.map(({ time }) => getDateOnly(time))));
}

function frequentWeatherCode(allCodes: WeatherCode[]) {
  const table = Array(allCodes.length).fill(0);
  const allOccurences: Partial<Record<WeatherCode, number>> = {};
  const highest = Math.max(
    ...table.map((_, index) => {
      const current = allCodes[index];

      const value = (allOccurences[current] ?? 0) + 1;
      table[index] = value;
      allOccurences[current] = value;
      return value;
    })
  );
  const [recuring] = Object.entries(allOccurences).find(
    ([, value]) => value === highest
  ) ?? ["0"];
  return +recuring;
}
