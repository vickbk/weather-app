export type Coordinates = {
  longitude: number;
  latitude: number;
};

export default async function getLocation() {
  return new Promise<Coordinates>((resolve, reject) => {
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
      reject({ error: error?.message });
    }
  });
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
