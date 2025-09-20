import { fetchWeatherApi } from "openmeteo";
import readWeatherData from "./readWeatherData";

export type WeatherResponce = Awaited<
  ReturnType<typeof fetchWeatherApi>
>[number];

export type WeatherRequest = {
  latitude: number;
  longitude: number;
  hourly?: string;
  start_date?: string;
  end_date?: string;
};

export default async function loadData({
  latitude = 52.52,
  longitude = 13.41,
  hourly = "temperature_2m",
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
    })
  );
}
