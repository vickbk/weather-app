import { GeocodingResults } from "../types/geocoding";
import { WeatherRequest } from "../types/weather-request-response";
import getMemoItem from "./get-item";
import setMemoItem from "./set-item";

export function addRecentSearch(recent: WeatherRequest) {
  if (typeof window === "undefined") return;
  const recentSearches = (getMemoItem("recent-searches") ||
    []) as WeatherRequest[];
  if (
    recentSearches.find(
      ({ selected_city }) => selected_city === recent.selected_city
    )
  )
    return;
  recentSearches.unshift(recent);
  if (recentSearches.length > 5) recentSearches.pop();
  setMemoItem("recent-searches", recentSearches);
}

export function getRecentSearches(place: string) {
  if (typeof window === "undefined") return null;
  return convertToGeocodingResult(
    ((getMemoItem("recent-searches") || []) as WeatherRequest[]).filter(
      ({ selected_city }) =>
        selected_city!.toLowerCase().includes(place.toLowerCase())
    )
  );
}

function convertToGeocodingResult(
  searches: WeatherRequest[]
): GeocodingResults | null {
  if (searches.length === 0) return null;
  return {
    generationtime_ms: 0,
    results: searches.map(({ selected_city, latitude, longitude }) => {
      const [city, country] = selected_city!.split(", ");
      return {
        name: city,
        country: country!,
        latitude: latitude!,
        longitude: longitude!,
      };
    }),
  };
}
