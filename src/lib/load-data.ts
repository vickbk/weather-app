import { fetchWeatherApi } from "openmeteo";
import readWeatherData from "./readWeatherData";
import { WeatherRequest } from "./types/weather-request-response";
import getPlaceObject from "@/actions/getPlaceObject";
import getPlaceName from "@/actions/getPlaceName";
import getDateOnly from "./date/get-date-only";
import getNextDay from "./date/get-next-day";
import { PlaceDisplay } from "./types/places-types";

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
    "visibility",
    "uv_index",
    "surface_pressure",
  ],
  start_date = getDateOnly(),
  end_date = getDateOnly(getNextDay()),
  selected_city,
  daily = ["sunrise", "sunset"],
  ...others
}: WeatherRequest) {
  const placeName =
    selected_city ||
    ((!Array.isArray(latitude) &&
      !Array.isArray(longitude) &&
      getPlaceName(
        await getPlaceObject(null, { latitude, longitude })
      )) as PlaceDisplay);

  return readWeatherData({
    weatherData: await fetchWeatherApi(process.env.OPEN_METEO_WEATHERFORCAST!, {
      latitude,
      longitude,
      start_date,
      end_date,
      hourly,
      daily,
      ...others,
    }),
    hourlyIndexes: hourly,
    placeName,
    dailyIndexes: daily,
  });
}
