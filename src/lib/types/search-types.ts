import { LoadingStatus } from "./loading-status";
import { UnitHandlersType } from "./units-types";
import { WeatherRequest } from "./weather-request-response";

export type SearchTriggers = {
  searchTrigger: (payload: WeatherRequest) => void;
  errorTrigger: (error: LoadingStatus) => void;
  unitHandlers: UnitHandlersType;
};
