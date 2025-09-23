"use server";

import { getGoogleGeoLocationResults } from "@/lib/google-maps/get-geoLocation-results";
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
    return await getGoogleGeoLocationResults(request);
  } catch (error: any) {
    return { error: error?.message || "An unknown error has occured" };
  }
}
