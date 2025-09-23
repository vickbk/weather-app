import { LoadingStatus } from "@/lib/types/loading-status";
import MainDataDaily from "./MainDataDaily";
import MainDataDetails from "./MainDataDetails";
import MainDataOverview from "./MainDataOverview";
import getDateOnly from "@/lib/date/get-date-only";
import { WeatherData } from "@/lib/types/weather-data";
import weatherIcons from "../common/WeatherIcons";

export default function MainData({
  status,
  data,
}: {
  status: LoadingStatus;
  data?: WeatherData;
}) {
  const current = data?.hourly.find(
    ({ time }) => time.getHours() === new Date().getHours()
  );
  return (
    <section className="data__main grid g-2">
      <MainDataOverview
        icon={weatherIcons.get(current?.weatherCode ?? 0, current?.time)}
        city={data?.placeName!}
        temp={current?.temp?.toFixed() || "0"}
        date={new Date(getDateOnly())}
        status={status}
      />
      <MainDataDetails data={current} status={status} />
      <MainDataDaily status={status} data={data} />
    </section>
  );
}
