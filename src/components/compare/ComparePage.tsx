"use client";
import { defaultUnits } from "@/lib/memorization/units";
import { useActionState, useEffect, useState } from "react";
import Attribution from "../Attributions";
import NoResultsElement from "../error/NoResultsElement";
import AppHeader from "../header/AppHeader";
import unitSetters from "@/actions/unitSetter";
import { LoadingStatus } from "@/lib/types/loading-status";
import loadLocationData from "@/actions/loadLocationData";
import { WeatherData } from "@/lib/types/weather-data";
import ComparePlaces from "./ComparePlaces";
import { WeatherRequest } from "@/lib/types/weather-request-response";
import { PlaceDisplay } from "@/lib/types/places-types";

export default function ComparePage() {
  const [units, setUnits] = useState(defaultUnits);
  const [status, setStatus] = useState<LoadingStatus>("loading");
  const unitHandlers = unitSetters([units, setUnits]);
  const [locationData, getLocationData, loadingState] = useActionState(
    loadLocationData,
    null
  );
  const [places, setPlaces] = useState<WeatherData[]>([]);
  useEffect(() => {
    if (locationData && !loadingState) {
      if ("error" in locationData) return;
      setPlaces(locationData);
      setStatus("ready");
    }
    if (loadingState) setStatus("loading");
  }, [locationData, loadingState]);
  const getSearchParams = (request: WeatherRequest) => {
    const previousRquests = places.map(({ placeName, lat, lon }) => ({
      placeName,
      latitude: lat,
      longitude: lon,
    }));
    const [lats, longs, placeNames]: (number | PlaceDisplay)[][] = Array(3)
      .fill(null)
      .map(() => []);
    [
      ...previousRquests,
      { ...request, placeName: request.selected_city },
    ].forEach(({ placeName, latitude, longitude }) => {
      if (placeNames.includes(placeName as PlaceDisplay)) return;
      lats.push(latitude as number);
      longs.push(longitude as number);
      placeNames.push(placeName as PlaceDisplay);
    });
    getLocationData({
      ...request,
      latitude: lats as number[],
      longitude: longs as number[],
      selected_city: placeNames as PlaceDisplay[],
    });
  };
  return (
    <main className="container p-1">
      <div className="container__holder">
        <AppHeader
          status={status}
          triggers={{
            searchTrigger: getSearchParams,
            errorTrigger: setStatus,
            unitHandlers,
          }}
          units={units}
          type="compare"
        />
        {status === "no-result" && <NoResultsElement />}
        {!["error", "no-result"].includes(status) && (
          <ComparePlaces
            places={status === "loading" ? undefined : places}
            setPlaces={setPlaces}
            status={status}
          />
        )}
        <Attribution />
      </div>
    </main>
  );
}
