import Dropdown from "../common/Dropdown";
import DataPerHour from "./DataPerHour";
import { LoadingStatus } from "@/lib/types/loading-status";
import { Skeleton } from "@progress/kendo-react-indicators";
import { WeatherHourlyData } from "@/lib/types/weather-data";
import weatherIcons from "../common/WeatherIcons";
import { useEffect, useRef, useState } from "react";

export default function HourlyData({
  status,
  hourly,
}: {
  status: LoadingStatus;
  hourly?: WeatherHourlyData[];
}) {
  const data =
    status === "loading"
      ? Array(8).fill({})
      : hourly
          ?.filter(({ time }) => time > new Date())
          .map(({ time, temp, weatherCode }) => ({
            time: time.toLocaleTimeString("en-US", {
              hour12: true,
              hour: "2-digit",
            }),
            temp: `${temp?.toFixed()}`,
            icon: weatherIcons.get(weatherCode!, time),
          })) ?? [];
  const articleRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLElement>(null);
  const holderRef = useRef<HTMLElement>(null);
  useEffect(() => {
    setTimeout(() => {
      if (articleRef.current && headerRef.current && holderRef.current) {
        const holder = holderRef.current;
        holder.style.maxBlockSize = "600px";
        holder.style.maxBlockSize = `calc(${
          articleRef.current.offsetHeight - headerRef.current.offsetHeight
        }px - 3em)`;
      }
    }, 300);
  }, [hourly]);

  return (
    <article
      ref={articleRef}
      className="data__hourly hourly neutral-700 br-1 p-1"
    >
      <section ref={headerRef} className="flex space-between center">
        <h4 className="hourly__title">Hourly forecast</h4>
        <Dropdown
          specialClass="neutral-600"
          text={status !== "loading" ? "The day" : " - "}
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
