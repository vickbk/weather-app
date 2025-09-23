"use client";
import { startTransition, useActionState, useEffect, useState } from "react";
import Attribution from "./Attributions";
import AppData from "./data/AppData";
import AppHeader from "./header/AppHeader";
import getLocation from "@/actions/getLocation";
import getDateOnly from "@/lib/date/get-date-only";
import getNextDay from "@/lib/date/get-next-day";
import loadLocationData from "@/actions/loadLocationData";
import { LoadingStatus } from "@/lib/types/loading-status";
import { WeatherData } from "@/lib/types/weather-data";
import NoResultsElement from "./error/NoResultsElement";

export default function MainPage() {
  const [locationData, getLocationData, loadingState] = useActionState(
    loadLocationData,
    null
  );
  const [status, setStatus] = useState<LoadingStatus>("loading");

  useEffect(() => {
    (async () => {
      const location = await getLocation();
      if ("error" in location) {
        console.log(location.error);
        setStatus("error");
        return;
      }
      startTransition(() => {
        getLocationData({
          start_date: getDateOnly(),
          end_date: getDateOnly(getNextDay()),
          ...location,
        });
      });
    })();
  }, []);
  useEffect(() => {
    if (loadingState) setStatus("loading");
    if (locationData && !loadingState) {
      if ("error" in locationData) {
        console.log(loadLocationData);
        setStatus("error");
        return;
      }
      setStatus("ready");
    }
  }, [locationData, loadingState]);
  return (
    <main className="container p-1">
      <div className="container__holder">
        <AppHeader
          status={status}
          triggers={{ searchTrigger: getLocationData, errorTrigger: setStatus }}
        />
        {status === "no-result" && <NoResultsElement />}
        {!["no-result", "error"].includes(status) && (
          <AppData status={status} data={locationData as WeatherData[]} />
        )}
        <Attribution />
      </div>
    </main>
  );
}
