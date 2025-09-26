import Dropdown from "../common/Dropdown";
import DataPerHour from "./DataPerHour";
import { LoadingStatus } from "@/lib/types/loading-status";
import { Skeleton } from "@progress/kendo-react-indicators";
import { WeatherHourlyData } from "@/lib/types/weather-data";
import weatherIcons from "../common/WeatherIcons";
import { useEffect, useRef, useState } from "react";
import HourlyDropDown from "./HourlyDropDown";
import { groupHourlyDataInDays } from "@/lib/open-meteo/process-hourlydata";
import reorderArray from "@/lib/globals/reorder-array";

export default function HourlyData({
  status,
  hourly,
  dailyReady,
}: {
  status: LoadingStatus;
  hourly?: WeatherHourlyData[];
  dailyReady: boolean;
}) {
  const [dropdownCloser, setDropdownCloser] = useState<(() => void) | null>(
    null
  );
  const dailyData = groupHourlyDataInDays(hourly ?? []);
  const [day, setDay] = useState(0);

  const getDataForDay = () => {
    const { hourly } = dailyData[day] ?? {};
    return (
      hourly
        // if selected day is today, filter out hours that have already passed
        ?.filter(({ time }) => (day === 0 ? time > new Date() : true))
        // map to displayable format
        .map(({ time, temp, weatherCode }) => ({
          time: time.toLocaleTimeString("en-US", {
            hour12: true,
            hour: "2-digit",
          }),
          temp: `${temp?.toFixed()}`,
          icon: weatherIcons.get(weatherCode!, time),
        })) ?? []
    );
  };

  const data = status === "loading" ? Array(8).fill({}) : getDataForDay() ?? [];

  const [articleRef, headerRef, holderRef] = Array(3)
    .fill(null)
    .map(() => useRef<HTMLElement>(null));
  const days = reorderArray<string>(
    "Monday,Tuesday,Wednesday,Thursday,Friday,Saturday,Sunday".split(","),
    new Date().getDay() - 1
  );
  const resetArticleHeight = () => {
    if (
      dailyReady &&
      articleRef.current &&
      headerRef.current &&
      holderRef.current
    ) {
      holderRef.current.style.maxBlockSize = "600px";
      holderRef.current.style.maxBlockSize = `calc(${
        articleRef.current.offsetHeight - headerRef.current.offsetHeight
      }px - 3em)`;
    }
  };
  useEffect(resetArticleHeight, [dailyReady]);

  useEffect(() => {
    window.addEventListener("resize", resetArticleHeight);
    return () => window.removeEventListener("resize", resetArticleHeight);
  }, []);
  return (
    <article
      ref={articleRef}
      className="data__hourly hourly neutral-700 br-1 p-1"
    >
      <section ref={headerRef} className="flex space-between center">
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
      <section ref={holderRef} className="hourly__data-holder grid mbls-1 g-1">
        {data.map(({ temp, time, icon }, index) =>
          status === "loading" ? (
            <Skeleton
              key={index}
              shape="rectangle"
              className="hourly__loader p-2 br-1"
              animation={{ type: "wave" }}
            />
          ) : (
            <DataPerHour key={index} temp={temp} time={time} icon={icon} />
          )
        )}
      </section>
    </article>
  );
}
