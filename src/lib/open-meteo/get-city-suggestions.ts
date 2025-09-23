"server-only";

import { GeocodingError, GeocodingResults } from "../types/geocoding";

export default async function getCitySuggestion(name: string) {
  const { OPEN_METEO_GEOCODING: url } = process.env;
  const request = await fetch(`${url!}?${new URLSearchParams({ name })}`);
  if (!request.ok) throw new Error(await request.json());
  const results = (await request.json()) as GeocodingError | GeocodingResults;
  if ("error" in results) throw new Error(results.reason);
  return results;
}
