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
import addLastVisited from "@/lib/memorization/add-last-visited";
import { getGMTTimezone } from "@/lib/date/get-gmt-timezone";
import { defaultUnits, getUnits } from "@/lib/memorization/units";
import unitSetters from "@/actions/unitSetter";
import getUnitBasedParams from "@/lib/open-meteo/get-unit-based-params";

export default function MainPage() {
  const [locationData, getLocationData, loadingState] = useActionState(
    loadLocationData,
    null
  );
  const [status, setStatus] = useState<LoadingStatus>("loading");
  const [units, setUnits] = useState(defaultUnits);
  const unitHandlers = unitSetters([units, setUnits]);

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
          end_date: getDateOnly(getNextDay(undefined, 6)),
          ...location,
          timezone: getGMTTimezone(),
          ...getUnitBasedParams(units),
        });
      });
    })();
  }, [units]);
  useEffect(() => {
    if (loadingState) setStatus("loading");
    if (locationData && !loadingState) {
      if ("error" in locationData) {
        console.log(locationData.error);
        return setStatus("error");
      }
      locationData.length !== 0 && addLastVisited(locationData[0]);
      setStatus("ready");
    }
  }, [locationData, loadingState]);
  useEffect(() => setUnits(getUnits()), []);
  return (
    <main className="container p-1">
      <div className="container__holder">
        <AppHeader
          status={status}
          triggers={{
            searchTrigger: getLocationData,
            errorTrigger: setStatus,
            unitHandlers,
          }}
          units={units}
        />
        {status === "no-result" && <NoResultsElement />}
        {!["no-result", "error"].includes(status) && (
          <AppData
            status={status}
            data={locationData as WeatherData[]}
            units={units}
          />
        )}
        <Attribution />
      </div>
    </main>
  );
}
