import { fetchWeatherApi } from "openmeteo";
import readWeatherData from "./readWeatherData";
import { WeatherRequest } from "./types/weather-request-response";

export default async function loadData({
  latitude = 52.52,
  longitude = 13.41,
  hourly = [
    "temperature_2m",
    "wind_speed_10m",
    "relative_humidity_2m",
    "apparent_temperature",
    "precipitation_probability",
    "precipitation",
    "rain",
    "wind_speed_80m",
    "wind_speed_120m",
    "wind_speed_180m",
    "weather_code",
  ],
  start_date,
  end_date,
}: WeatherRequest) {
  return readWeatherData(
    await fetchWeatherApi(process.env.OPEN_METEO_WEATHERFORCAST!, {
      latitude,
      longitude,
      start_date,
      end_date,
      hourly,
    }),
    hourly
  );
}
