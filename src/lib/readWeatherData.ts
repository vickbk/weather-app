import { WeatherResponce } from "./load-data";

export default function readWeatherData(weatherData: WeatherResponce[]) {
  return weatherData.map((data) => ({
    lat: data.latitude(),
    lon: data.longitude(),
    elevation: data.elevation(),
    utcSec: data.utcOffsetSeconds(),
    hourly: getHourlyData(data),
  }));
}

function getHourlyData(data: WeatherResponce) {
  const hourly = data.hourly()!;
  const timeVal = Number(hourly?.time());
  const timeEndVal = Number(hourly?.timeEnd());
  const intervalVal = hourly?.interval() ?? 1;
  return {
    time: [
      ...Array((timeEndVal - timeVal) / intervalVal)
        .fill(null)
        .map(
          (_, i) =>
            new Date(
              (timeVal + i * intervalVal + data.utcOffsetSeconds()) * 1000
            )
        ),
    ],
    temp: hourly.variables(0)!.valuesArray(),
  };
}
