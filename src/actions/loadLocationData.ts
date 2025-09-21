"use server";

import loadData, { WeatherRequest } from "@/lib/load-data";

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
