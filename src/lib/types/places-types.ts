import getPlaceObject from "@/actions/getPlaceObject";

export type PlaceObject = Awaited<ReturnType<typeof getPlaceObject>>;

export type Coordinates = {
  longitude: number;
  latitude: number;
};

export type PlaceDisplay = `${string}, ${string}`;
