import getMemoItem from "@/lib/memorization/get-item";
import { Coordinates } from "@/lib/types/places-types";

export default async function getLocation() {
  const coords = new Promise<Coordinates>((resolve, reject) => {
    try {
      const lastVisited = getMemoItem("last-visited");
      if (lastVisited) return resolve(lastVisited as Coordinates);
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          ({ coords: { latitude, longitude } }) =>
            resolve({ latitude, longitude }),
          (error) => failureLocation(error, resolve),
          { enableHighAccuracy: true, maximumAge: 0 }
        );
      } else {
        throw new Error("Geolocation is not supported in this browser");
      }
    } catch (error: any) {
      failureLocation(error, resolve);
    }
  });
  return coords
    .then((a) => a)
    .catch((a) => ({
      error: a,
    }));
}

function failureLocation(
  error: GeolocationPositionError,
  resolve: (value: Coordinates) => void
) {
  console.log(error.message);
  resolve({ latitude: 51.5074, longitude: -0.1278 }); // Default to London coords
}
