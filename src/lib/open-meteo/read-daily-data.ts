import WeatherDailyDisplay, {
  WeatherDailiData,
  WeatherDailyDisplayKeys,
  WeatherDailyDisplayValues,
} from "../types/weather-daily-display";
import { WeatherResponce } from "../types/weather-request-response";

export default function getDailyData(
  data: WeatherResponce,
  dailyIndexes: WeatherDailyDisplayKeys[]
): WeatherDailiData {
  const daily = data.daily()!;

  const dailyData: Partial<Record<WeatherDailyDisplayValues, Date[]>> = {};
  // for each daily key requested, add it to the @object dailyData with the corresponding values
  for (let x = 0; x < dailyIndexes.length; x++) {
    const dailyVar = daily.variables(x)!;
    dailyData[
      WeatherDailyDisplay.get(dailyIndexes[x]) as WeatherDailyDisplayValues
    ] = Array(dailyVar.valuesInt64Length())
      .fill(null)
      .map((_, i) => new Date(Number(dailyVar.valuesInt64(i)) * 1000));
  }

  return dailyData;
}
