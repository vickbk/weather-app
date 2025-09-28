import { PlaceDisplay } from "../types/places-types";
import { WeatherData } from "../types/weather-data";
import { WeatherRequest } from "../types/weather-request-response";

export default function getSearchParams(
  request: WeatherRequest,
  places: WeatherData[]
) {
  const previousRquests = places.map(({ placeName, lat, lon }) => ({
    placeName,
    latitude: lat,
    longitude: lon,
  }));
  const [lats, longs, placeNames]: (number | PlaceDisplay)[][] = Array(3)
    .fill(null)
    .map(() => []);
  [
    ...previousRquests,
    { ...request, placeName: request.selected_city },
  ].forEach(({ placeName, latitude, longitude }) => {
    if (placeNames.includes(placeName as PlaceDisplay)) return;
    lats.push(latitude as number);
    longs.push(longitude as number);
    placeNames.push(placeName as PlaceDisplay);
  });
  return {
    latitude: lats as number[],
    longitude: longs as number[],
    selected_city: placeNames as PlaceDisplay[],
  };
}
