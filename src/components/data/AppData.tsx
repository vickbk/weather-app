import { LoadingStatus } from "@/lib/types/loading-status";
import HourlyData from "./HourlyData";
import MainData from "./MainData";
import { WeatherData } from "@/lib/types/weather-data";
import { useState } from "react";

export default function AppData({
  status,
  data,
}: {
  status: LoadingStatus;
  data?: WeatherData[];
}) {
  const [daily] = data ?? [];
  const [dailyReady, setDailyReady] = useState(false);

  return (
    <section className="data grid g-2 mt-3">
      <MainData status={status} data={daily} setDailyReady={setDailyReady} />
      <HourlyData
        status={status}
        hourly={daily?.hourly}
        dailyReady={dailyReady}
      />
    </section>
  );
}
