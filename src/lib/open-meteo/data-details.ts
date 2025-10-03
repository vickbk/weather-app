import { LoadingStatus } from "../types/loading-status";
import { UnitsType } from "../types/units-types";
import { WeatherHourlyData } from "../types/weather-data";

export function getDataDetails({
  status,
  units: { windSpeed, precipitation: precipitationUnit },
  data,
  showMore,
}: {
  status: LoadingStatus;
  units: UnitsType;
  data?: WeatherHourlyData;
  showMore: boolean;
}) {
  const {
    precipitation,
    humidity,
    wind,
    ambientTemp,
    uvIndex,
    visibility,
    surfacePressure,
  } = data ?? {};

  return status === "loading"
    ? [
        ["Feels Like", "-"],
        ["Humidity", "-"],
        ["Wind", "-"],
        ["Precipitation", "-"],
      ]
    : [
        ["Feels Like", `${ambientTemp?.toFixed()}°`],
        ["Humidity", `${humidity?.toFixed()}%`],
        ["Wind", `${wind?.toFixed()}${windSpeed}`],
        ["Precipitation", `${precipitation?.toFixed()}${precipitationUnit}`],
        ...(showMore
          ? [
              ["UV Index", `${uvIndex?.toFixed()}`],
              ["Visibility", `${((visibility ?? 0) / 1000).toFixed()}Km`],
              ["Air Pressure", `${surfacePressure?.toFixed()}hPa`],
            ]
          : []),
      ];
}
