import { PlaceDisplay, PlaceObject } from "@/lib/types/places-types";

export default function getPlaceName(
  placeObject: PlaceObject | PlaceObject[]
): PlaceDisplay | PlaceDisplay[] {
  if (!placeObject || "error" in placeObject) return "Unknown place, Somewhere";
  if (Array.isArray(placeObject))
    return placeObject.map((pO) => getPlaceName(pO) as PlaceDisplay);
  return placeObject.formatted_address as PlaceDisplay;
}
