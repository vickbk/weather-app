import { fetchWeatherApi } from "openmeteo";
import readWeatherData from "./readWeatherData";

export type WeatherResponce = Awaited<
  ReturnType<typeof fetchWeatherApi>
>[number];

export default async function loadData() {
  const fetch = await fetchWeatherApi(process.env.OPEN_METEO_WEATHERFORCAST!, {
    latitude: 52.52,
    longitude: 13.41,
    start_date: "2025-08-30",
    end_date: "2025-09-13",
    hourly: "temperature_2m",
  });

  return readWeatherData(fetch);
}
