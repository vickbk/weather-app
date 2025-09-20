import { WeatherResponce } from "./load-data";

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
  weatherData: WeatherResponce[]
): WeatherData[] {
  return weatherData.map((data) => ({
    lat: data.latitude(),
    lon: data.longitude(),
    elevation: data.elevation(),
    utcSec: data.utcOffsetSeconds(),
    hourly: getHourlyData(data),
  }));
}

function getHourlyData(data: WeatherResponce): WeatherHourlyData[] {
  const hourly = data.hourly()!;
  const timeVal = Number(hourly?.time());
  const timeEndVal = Number(hourly?.timeEnd());
  const intervalVal = hourly?.interval() ?? 1;
  const temps = hourly.variables(0)!.valuesArray();

  return Array((timeEndVal - timeVal) / intervalVal)
    .fill(null)
    .map((_, i) => ({
      time: new Date(
        (timeVal + i * intervalVal + data.utcOffsetSeconds()) * 1000
      ),
      temp: temps?.[i],
    }));
}
