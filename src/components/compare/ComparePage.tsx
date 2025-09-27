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
      setPlaces([...places, ...locationData]);
      setStatus("ready");
    }
    if (loadingState) setStatus("loading");
  }, [locationData, loadingState]);
  const getSearchParams = (request: WeatherRequest) => {
    console.log(request);
    getLocationData(request);
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
