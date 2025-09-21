import { LoadingStatus } from "@/lib/types/loading-status";
import HourlyData from "./HourlyData";
import MainData from "./MainData";
import { WeatherData } from "@/lib/readWeatherData";

export default function AppData({
  status,
  data,
}: {
  status: LoadingStatus;
  data?: WeatherData[];
}) {
  const [daily] = data ?? [];
  console.log(daily);
  return (
    <section className="data grid g-2 mt-3">
      <MainData status={status} />
      <HourlyData status={status} />
    </section>
  );
}
