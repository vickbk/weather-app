import { getGMTTimezone } from "../date/get-gmt-timezone";
import getUnitBasedParams from "../open-meteo/get-unit-based-params";
import { PlaceDisplay } from "../types/places-types";
import { WeatherRequest } from "../types/weather-request-response";
import getMemoItem from "./get-item";
import setMemoItem from "./set-item";

export const initialCompareRequest: WeatherRequest = {
  latitude: [] as number[],
  longitude: [] as number[],
  selected_city: [] as PlaceDisplay[],
  timezone: getGMTTimezone(),
  ...getUnitBasedParams(),
};

export const getLastCompareRequest = () => {
  return (
    (getMemoItem("compare-request") as WeatherRequest) || initialCompareRequest
  );
};

export const setLastCompareRequest = (request: {
  latitude: number[];
  longitude: number[];
  selected_city: PlaceDisplay[];
}) => {
  setMemoItem("compare-request", request);
};

export const removeFromLastCompare = (selected: PlaceDisplay) => {
  const { latitude, longitude, selected_city } = getLastCompareRequest();
  const fountAt = selected_city?.indexOf(selected);
  if (fountAt !== -1) {
    setLastCompareRequest({
      latitude: Array.isArray(latitude)
        ? latitude.filter((_, index) => index !== fountAt)
        : [],
      longitude: Array.isArray(longitude)
        ? longitude.filter((_, index) => index !== fountAt)
        : [],
      selected_city: Array.isArray(selected_city)
        ? selected_city.filter((_, index) => index !== fountAt)
        : [],
    });
  }
};
