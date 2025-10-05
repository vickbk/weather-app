import { LoadingStatus } from "@/lib/types/loading-status";
import MainDataDaily from "./MainDataDaily";
import MainDataDetails from "./MainDataDetails";
import MainDataOverview from "./MainDataOverview";
import getDateOnly from "@/lib/date/get-date-only";
import { WeatherData } from "@/lib/types/weather-data";
import weatherIcons from "../common/WeatherIcons";
import { UnitsType } from "@/lib/types/units-types";
import { useState } from "react";

export default function MainData({
  status,
  data,
  units,
}: {
  status: LoadingStatus;
  data?: WeatherData;
  units: UnitsType;
}) {
  const current = data?.hourly.find(
    ({ time }) => time.getHours() === new Date().getHours()
  );
  const { sunrise = [], sunset = [] } = data?.daily || {};
  const [showMore, setShowMore] = useState(false);
  return (
    <section className="data__main grid g-2">
      <MainDataOverview
        icon={weatherIcons.get(current?.weatherCode ?? 0, current?.time)}
        city={data?.placeName!}
        temp={current?.temp?.toFixed() || "0"}
        date={new Date(getDateOnly())}
        status={status}
      />
      <MainDataDetails
        data={current}
        status={status}
        units={units}
        daily={{ sunrise: sunrise[0], sunset: sunset[0] }}
        moreHandlers={[showMore, setShowMore]}
      />
      <MainDataDaily status={status} data={data} />
    </section>
  );
}
