import Image from "next/image";
import dropdown from "@images/icon-dropdown.svg";
import HourlyDetails from "./hourly/HourlyDetails";
import { useState } from "react";
import { WeatherHourlyData } from "@/lib/types/weather-data";
import { getDataForDisplay } from "@/lib/open-meteo/process-hourlydata";

export default function DataPerHour({ hourly }: { hourly: WeatherHourlyData }) {
  const {
    time,
    temp,
    icon: { image, desc },
  } = getDataForDisplay(hourly);
  const [details, showDetails] = useState(false);
  const [arrow, showArrow] = useState(false);
  return (
    <article
      className="hourly__data sp-5 pi-1 flex flex-wrap sg-5 sm-up-g-2 lg-up-sg-5 center br-1 neutral-600 cursor-p"
      onClick={() => showDetails(!details)}
      onMouseEnter={() => showArrow(true)}
      onMouseLeave={() => showArrow(false)}
    >
      <Image src={image} alt={desc} height={40} />
      <p className="hourly__data-time">{time}</p>
      <p className="mis-auto">{temp}°</p>
      {arrow && <Image src={dropdown} alt="" />}
      {details && <HourlyDetails data={hourly} />}
    </article>
  );
}
