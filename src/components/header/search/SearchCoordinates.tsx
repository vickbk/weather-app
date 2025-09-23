import { Coordinates } from "@/lib/types/places-types";

export default function SearchCoordinates({
  coordinates: { latitude, longitude },
}: {
  coordinates: Coordinates;
}) {
  return (
    <>
      <input type="hidden" name="latitude" value={latitude} />
      <input type="hidden" name="longitude" value={longitude} />
    </>
  );
}
