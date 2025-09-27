import errorProneTransition from "../globals/error-prone-transition";
import { getLastCompareRequest } from "../memorization/compare-request";
import { LoadingStatus } from "../types/loading-status";
import { WeatherRequest } from "../types/weather-request-response";

export default function loadLastComparison(
  getLocationData: (payload: WeatherRequest) => void,
  setStatus: (status: LoadingStatus) => void
) {
  const lastRequest = getLastCompareRequest();
  const { latitude } = lastRequest;
  if (latitude && Array.isArray(latitude) && latitude.length !== 0)
    return errorProneTransition(
      () => {
        getLocationData(lastRequest);
      },
      setStatus,
      "error"
    );
  setStatus("no-result");
}
