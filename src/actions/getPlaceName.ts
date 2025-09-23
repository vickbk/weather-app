import { PlaceDisplay, PlaceObject } from "@/lib/types/places-types";

export default function getPlaceName(placeObject: PlaceObject) {
  if (!placeObject || "error" in placeObject) return "Unknown place, Somewhere";
  return placeObject.formatted_address as PlaceDisplay;
}
