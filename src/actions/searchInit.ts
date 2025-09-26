"use server";

import getFormFields from "@/lib/get-form-fields";
import { getGoogleGeoLocationResults } from "@/lib/google-maps/get-geoLocation-results";
import getPlaceName from "./getPlaceName";
import { PlaceDisplay } from "@/lib/types/places-types";

export default async function searchInit(_: unknown, formData: FormData) {
  const { name, latitude, longitude, ...units } = getFormFields<{
    name: PlaceDisplay;
    latitude: string;
    longitude: string;
    temperature_unit: "fahrenheit";
    precipitation_unit: "inch";
    wind_speed_unit: "mph";
    timezone: string;
  }>(formData);
  try {
    if (latitude && longitude)
      return {
        selected_city: name,
        latitude: +latitude,
        longitude: +longitude,
        ...units,
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
      ...units,
    };
  } catch (error: any) {
    return { error: error.message };
  }
}
