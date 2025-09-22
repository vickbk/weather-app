"use server";

import getCitySuggestion from "@/lib/open-meteo/get-city-suggestions";

export default async function getPlaceSuggestions(_: unknown, place: string) {
  try {
    return await getCitySuggestion(place);
  } catch (error: any) {
    return { error: error?.message };
  }
}
