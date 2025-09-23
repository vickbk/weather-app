export async function getGoogleGeoLocationResults(response: Response) {
  if (!response.ok)
    throw new Error(
      `Geocoding failed to process your request:${await response.text()}`
    );
  const { status, error_message, results } = (await response.json()) as {
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
}
