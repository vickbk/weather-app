import { LoadingStatus } from "@/lib/types/loading-status";
import HourlyData from "./HourlyData";
import MainData from "./MainData";
import { WeatherData } from "@/lib/types/weather-data";

export default function AppData({
  status,
  data,
}: {
  status: LoadingStatus;
  data?: WeatherData[];
}) {
  const [daily] = data ?? [];

  return (
    <section className="data grid g-2 mt-3">
      <MainData status={status} data={daily} />
      <HourlyData status={status} />
    </section>
  );
}
