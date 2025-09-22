import { Coordinates } from "@/lib/types/places-types";

export default async function getLocation() {
  const coords = new Promise<Coordinates>((resolve, reject) => {
    try {
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
  console.log({ longitude, latitude });
  return { longitude, latitude };
}

function failureLocation(error: GeolocationPositionError) {
  throw new Error(error.message);
}
