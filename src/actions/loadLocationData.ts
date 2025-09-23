"use server";

import loadData from "@/lib/load-data";
import { WeatherRequest } from "@/lib/types/weather-request-response";

export default async function loadLocationData(
  _: unknown,
  request: WeatherRequest
) {
  try {
    const data = await loadData(request);
    return data;
  } catch (error: any) {
    return { error: error?.message };
  }
}
