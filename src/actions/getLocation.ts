import getMemoItem from "@/lib/memorization/get-item";
import { Coordinates } from "@/lib/types/places-types";

export default async function getLocation() {
  const coords = new Promise<Coordinates>((resolve, reject) => {
    try {
      const lastVisited = getMemoItem("last-visited");
      if (lastVisited) return resolve(lastVisited as Coordinates);
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (coords) => resolve(retrieveLocation(coords)),
          failureLocation,
          { enableHighAccuracy: true, maximumAge: 0 }
        );
      } else {
        throw new Error("Geolocation is not supported in this browser");
      }
    } catch (error: any) {
      reject(new Error(error?.message));
    }
  });
  return coords
    .then((a) => a)
    .catch((a) => ({
      error: a,
    }));
}

function retrieveLocation({
  coords: { latitude, longitude },
}: GeolocationPosition) {
  return { longitude, latitude };
}

function failureLocation(error: GeolocationPositionError) {
  throw new Error(error.message);
}
