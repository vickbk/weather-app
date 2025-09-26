import { WeatherData } from "../types/weather-data";
import { WeatherRequest } from "../types/weather-request-response";
import setMemoItem from "./set-item";

export default function addLastVisited({ lat, lon, placeName }: WeatherData) {
  setMemoItem("last-visited", {
    latitude: lat,
    longitude: lon,
    selected_city: placeName,
  } as WeatherRequest);
}
