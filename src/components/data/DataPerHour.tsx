import Image from "next/image";
import dropdown from "@images/icon-dropdown.svg";
import HourlyDetails from "./hourly/HourlyDetails";
import { useState } from "react";
import { WeatherHourlyData } from "@/lib/types/weather-data";
import { getDataForDisplay } from "@/lib/open-meteo/process-hourlydata";
import { SvgIcon } from "@progress/kendo-react-common";
import {
  arrowDownIcon,
  arrowUpIcon,
  closedCaptionsIcon,
  crosstabIcon,
  dropdownIcon,
} from "@progress/kendo-svg-icons";

export default function DataPerHour({ hourly }: { hourly: WeatherHourlyData }) {
  const {
    time,
    temp,
    icon: { image, desc },
  } = getDataForDisplay(hourly);
  const [details, showDetails] = useState(false);
  return (
    <>
      <button
        className="hourly__data no-border sp-5 pi-1 flex flex-wrap sg-5 sm-up-g-2 lg-up-sg-5 center br-1 neutral-600 cursor-p"
        onClick={() => showDetails(!details)}
      >
        <Image src={image} alt={desc} height={40} />
        <p className="hourly__data-time">{time}</p>
        <p className="mis-auto">{temp}°</p>
        <SvgIcon
          icon={details ? arrowUpIcon : dropdownIcon}
          className="details-dropdown"
        />
      </button>
      {details && <HourlyDetails data={hourly} />}
    </>
  );
}
