"use client";
import { useEffect } from "react";
import Attribution from "./Attributions";
import AppData from "./data/AppData";
import AppHeader from "./header/AppHeader";
import getLocation from "@/actions/getLocation";
import getDateOnly from "@/lib/date/get-date-only";
import getNextDay from "@/lib/date/get-next-day";

export default function MainPage() {
  useEffect(() => {
    (async () => {
      const location = await getLocation();
      const fetchRequest = {
        start_date: getDateOnly(),
        end_date: getDateOnly(getNextDay()),
        ...location,
      };

      console.log({ location, fetchRequest });
    })();
  }, []);
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
