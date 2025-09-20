"use client";
import { startTransition, useActionState, useEffect } from "react";
import Attribution from "./Attributions";
import AppData from "./data/AppData";
import AppHeader from "./header/AppHeader";
import getLocation from "@/actions/getLocation";
import getDateOnly from "@/lib/date/get-date-only";
import getNextDay from "@/lib/date/get-next-day";
import loadLocationData from "@/actions/loadLocationData";

export default function MainPage() {
  const [message, getLocationData, loadingData] = useActionState(
    loadLocationData,
    null
  );
  useEffect(() => {
    (async () => {
      const location = await getLocation();
      const fetchRequest = {
        start_date: getDateOnly(),
        end_date: getDateOnly(getNextDay()),
        ...location,
      };
      startTransition(() => getLocationData(fetchRequest));
      console.log({ location, fetchRequest });
    })();
  }, []);
  useEffect(() => {
    if (message && !loadingData) console.log(message);
  }, [message, loadingData]);
  return (
    <main className="container p-1">
      <div>
        <AppHeader />
        <AppData />
        <Attribution />
      </div>
    </main>
  );
}
