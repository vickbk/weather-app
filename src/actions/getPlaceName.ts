"use server";

export default async function getPlaceName(
  _: unknown,
  {
    latitude,
    longitude,
  }: {
    latitude: number;
    longitude: number;
  }
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
    return results?.find(({ types }) =>
      [
        "administrative_area_level_2",
        "locality",
        "administrative_area_level_1",
      ].includes(types[0])
    );
  } catch (error: any) {
    return { error: error?.message || "An unknown error has occured" };
  }
}
