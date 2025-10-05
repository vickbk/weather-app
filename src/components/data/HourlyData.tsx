import Dropdown from "../common/Dropdown";
import DataPerHour from "./DataPerHour";
import { LoadingStatus } from "@/lib/types/loading-status";
import { Skeleton } from "@progress/kendo-react-indicators";
import { WeatherHourlyData } from "@/lib/types/weather-data";
import { useEffect, useRef, useState } from "react";
import HourlyDropDown from "./HourlyDropDown";
import {
  filterOutPassedHoursForCurrentDay,
  groupHourlyDataInDays,
} from "@/lib/open-meteo/process-hourlydata";
import reorderArray from "@/lib/globals/reorder-array";

export default function HourlyData({
  status,
  hourly,
  dayExternalIndex,
  onDayIndexChange,
}: {
  status: LoadingStatus;
  hourly?: WeatherHourlyData[];
  dayExternalIndex?: number;
  onDayIndexChange?: (index: number) => void;
}) {
  const [dropdownCloser, setDropdownCloser] = useState<(() => void) | null>(
    null
  );
  const dailyData = groupHourlyDataInDays(hourly ?? []);
  const [day, setDay] = useState(0);
  const data =
    status === "loading"
      ? Array(8).fill({})
      : filterOutPassedHoursForCurrentDay(dailyData[day].hourly, day);

  const days = reorderArray(
    "Monday,Tuesday,Wednesday,Thursday,Friday,Saturday,Sunday".split(","),
    new Date().getDay() - 1
  );

  useEffect(() => {
    onDayIndexChange?.(day);
  }, [day]);
  useEffect(() => {
    setDay(dayExternalIndex || 0);
  }, [dayExternalIndex]);
  return (
    <article className="data__hourly hourly grid g-1 neutral-700 br-1 p-1">
      <section className="flex space-between center">
        <h4 className="hourly__title">Hourly forecast</h4>
        <Dropdown
          content={
            <HourlyDropDown
              closer={dropdownCloser!}
              daySetter={[day, setDay]}
              days={days}
            />
          }
          specialClass="neutral-600"
          text={status !== "loading" ? days[day] : " - "}
          setCloser={setDropdownCloser}
        />
      </section>
      <section className="hourly__data-holder flex-column g-1">
        {(data as WeatherHourlyData[]).map((hourly, index) =>
          status === "loading" ? (
            <Skeleton
              key={index}
              shape="rectangle"
              className="hourly__loader p-2 br-1"
              animation={{ type: "wave" }}
              style={{ background: "hsl(243, 23%, 30%)" }}
            />
          ) : (
            <DataPerHour key={index} hourly={hourly} />
          )
        )}
      </section>
    </article>
  );
}
