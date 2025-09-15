import { fetchWeatherApi } from "openmeteo";

export default async function loadData() {
  const fetch = await fetchWeatherApi(process.env.OPEN_METEO_URL!, {
    latitude: 52.52,
    longitude: 13.41,
    start_date: "2025-08-30",
    end_date: "2025-09-13",
    hourly: "temperature_2m",
  });
  const response = fetch.map((data) => ({
    lat: data.latitude(),
    lon: data.longitude(),
    elevation: data.elevation(),
    utcSec: data.utcOffsetSeconds(),
    hourly: data.hourly(),
  }));
  return response;
}
