import weatherHourlyDisplayName from "./types/weather-hourly-display-names";
import { WeatherResponce } from "./types/weather-request-response";

export type WeatherData = {
  lat: number;
  lon: number;
  elevation: number;
  utcSec: number;
  hourly: WeatherHourlyData[];
};

export type WeatherHourlyData = {
  time: Date;
  temp?: number;
};

export default function readWeatherData(
  weatherData: WeatherResponce[],
  hourlyIndexes: string[]
): WeatherData[] {
  return weatherData.map((data) => ({
    lat: data.latitude(),
    lon: data.longitude(),
    elevation: data.elevation(),
    utcSec: data.utcOffsetSeconds(),
    hourly: getHourlyData(data, hourlyIndexes),
  }));
}

function getHourlyData(
  data: WeatherResponce,
  hourlyIndexes: string[]
): WeatherHourlyData[] {
  const hourly = data.hourly()!;
  const timeVal = Number(hourly?.time());
  const timeEndVal = Number(hourly?.timeEnd());
  const intervalVal = hourly?.interval() ?? 1;

  const hourlyData: Record<string, Float32Array | null> = {};
  for (let x = 0; x < hourlyIndexes.length; x++) {
    hourlyData[weatherHourlyDisplayName.get(hourlyIndexes[x])] = hourly
      .variables(x)!
      .valuesArray();
  }
  console.log(hourlyData);

  return Array((timeEndVal - timeVal) / intervalVal)
    .fill(null)
    .map((_, i) => {
      const hourlyObj = Object.fromEntries(
        Object.entries(hourlyData).map(([key, values]) => [key, values?.[i]])
      );
      console.log(hourlyObj);
      return {
        time: new Date(
          (timeVal + i * intervalVal + data.utcOffsetSeconds()) * 1000
        ),
        ...hourlyObj,
      };
    });
}
