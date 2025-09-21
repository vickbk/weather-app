"use client";
import { startTransition, useActionState, useEffect, useState } from "react";
import Attribution from "./Attributions";
import AppData from "./data/AppData";
import AppHeader from "./header/AppHeader";
import getLocation from "@/actions/getLocation";
import getDateOnly from "@/lib/date/get-date-only";
import getNextDay from "@/lib/date/get-next-day";
import loadLocationData from "@/actions/loadLocationData";
import getPlaceName from "@/actions/getPlaceName";
import { LoadingStatus } from "@/lib/types/loading-status";

export default function MainPage() {
  const [locationData, getLocationData, loadingState] = useActionState(
    loadLocationData,
    null
  );
  const [place, placeGetter, placeLoader] = useActionState(getPlaceName, null);
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
        placeGetter(location);
      });
    })();
  }, []);
  useEffect(() => {
    if (locationData && !loadingState) {
      if ("error" in locationData) {
        console.log(loadLocationData);
        setStatus("error");
        return;
      }
      console.log(locationData);
      setStatus("ready");
    }
    if (place && !placeLoader) console.log(place);
  }, [locationData, loadingState, place, placeLoader]);
  return (
    <main className="container p-1">
      <div>
        <AppHeader status={status} />
        {status !== "error" && <AppData status={status} />}
        <Attribution />
      </div>
    </main>
  );
}
