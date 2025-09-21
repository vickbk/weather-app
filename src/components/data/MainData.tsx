import { LoadingStatus } from "@/lib/types/loading-status";
import MainDataDaily from "./MainDataDaily";
import MainDataDetails from "./MainDataDetails";
import MainDataOverview from "./MainDataOverview";
import image from "@images/icon-sunny.webp";
import getDateOnly from "@/lib/date/get-date-only";
import { WeatherHourlyData } from "@/lib/types/weather-data";

export default function MainData({
  status,
  data,
}: {
  status: LoadingStatus;
  data?: WeatherHourlyData;
}) {
  return (
    <section className="data__main grid g-2">
      <MainDataOverview
        icon={{ image, desc: "sunny day" }}
        city="Berlin, Germany"
        temp={data?.temp?.toFixed() || "0"}
        date={new Date(getDateOnly())}
        status={status}
      />
      <MainDataDetails data={data} status={status} />
      <MainDataDaily status={status} />
    </section>
  );
}
