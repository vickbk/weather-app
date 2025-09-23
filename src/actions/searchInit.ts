"use server";

import getFormFields from "@/lib/get-form-fields";
import { getGoogleGeoLocationResults } from "@/lib/google-maps/get-geoLocation-results";
import getPlaceName from "./getPlaceName";

export default async function searchInit(_: unknown, formData: FormData) {
  const { name, latitude, longitude } = getFormFields<{
    name: string;
    latitude: string;
    longitude: string;
  }>(formData);
  try {
    if (latitude && longitude)
      return {
        selected_city: name,
        latitude: +latitude,
        longitude: +longitude,
      };

    const { GOOGLEMAPS_GEOCODE_API: url, GOOGLEMAPS_KEY } = process.env;
    const request = await fetch(
      `${url!}?${new URLSearchParams({
        address: name,
        key: GOOGLEMAPS_KEY!,
      })}`
    );
    const geoLocationData = await getGoogleGeoLocationResults(request);
    const { lat, lng } = geoLocationData?.geometry.location || {};
    return {
      selected_city: getPlaceName(geoLocationData),
      latitude: lat! as unknown as number,
      longitude: lng! as unknown as number,
    };
  } catch (error: any) {
    return { error: error.message };
  }
}
