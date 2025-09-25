import { LoadingStatus } from "@/lib/types/loading-status";
import HourlyData from "./HourlyData";
import MainData from "./MainData";
import { WeatherData } from "@/lib/types/weather-data";
import { useState } from "react";
import { UnitsType } from "@/lib/types/units-types";

export default function AppData({
  status,
  data,
  units,
}: {
  status: LoadingStatus;
  data?: WeatherData[];
  units: UnitsType;
}) {
  const [daily] = data ?? [];
  const [dailyReady, setDailyReady] = useState(false);

  return (
    <section className="data grid g-2 mt-3">
      <MainData
        status={status}
        data={daily}
        setDailyReady={setDailyReady}
        units={units}
      />
      <HourlyData
        status={status}
        hourly={daily?.hourly}
        dailyReady={dailyReady}
      />
    </section>
  );
}
