"use server";

import { Coordinates } from "@/lib/types/places-types";

export default async function getPlaceObject(
  _: unknown,
  { latitude, longitude }: Coordinates
) {
  try {
    const { GOOGLEMAPS_URL: url, GOOGLEMAPS_KEY: key } = process.env;
    const request = await fetch(
      `${url!}?latlng=${latitude},${longitude}&key=${key}`
    );
    if (!request.ok)
      throw new Error(`Geocoding failed to process your request`);
    const { results, status, error_message } = (await request.json()) as {
      results?: google.maps.GeocoderResult[];
      status: google.maps.GeocoderStatus;
      error_message?: string;
    };
    if (status !== "OK")
      throw new Error(
        `Geocoder failed. Error status:${status}; ${error_message}`
      );
    return results?.find(({ types: [firstType] }) =>
      [
        "administrative_area_level_2",
        "locality",
        "administrative_area_level_1",
      ].includes(firstType)
    );
  } catch (error: any) {
    return { error: error?.message || "An unknown error has occured" };
  }
}
