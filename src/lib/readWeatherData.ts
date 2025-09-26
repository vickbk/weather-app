import { PlaceDisplay } from "./types/places-types";
import { WeatherData, WeatherHourlyData } from "./types/weather-data";
import weatherHourlyDisplayName from "./types/weather-hourly-display-names";
import { WeatherResponce } from "./types/weather-request-response";

export default function readWeatherData(
  weatherData: WeatherResponce[],
  hourlyIndexes: string[],
  placeName: PlaceDisplay
): WeatherData[] {
  return weatherData.map((data) => {
    const latitude = data.latitude();
    const longitude = data.longitude();
    return {
      lat: latitude,
      lon: longitude,
      placeName,
      elevation: data.elevation(),
      utcSec: data.utcOffsetSeconds(),
      hourly: getHourlyData(data, hourlyIndexes),
    };
  });
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

  return Array((timeEndVal - timeVal) / intervalVal)
    .fill(null)
    .map((_, i) => {
      const hourlyObj = Object.fromEntries(
        Object.entries(hourlyData).map(([key, values]) => [key, values?.[i]])
      );
      return {
        time: new Date((timeVal + i * intervalVal) * 1000),
        ...hourlyObj,
      };
    });
}
