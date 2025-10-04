import weatherIcons from "@/components/common/WeatherIcons";
import getDateOnly from "../date/get-date-only";
import { HourlyData, HourlyDisplayData } from "../types/hourly-data-types";
import { WeatherHourlyData } from "../types/weather-data";
import { RefObject } from "react";

export function groupHourlyDataInDays(
  hourly: WeatherHourlyData[]
): HourlyData[] {
  const days: string[] = getHourlydataDates(hourly);
  return days.map((day) => ({
    date: new Date(day),
    hourly: hourly.filter(({ time }) => getDateOnly(time) === day),
  }));
}

export const getHourlydataDates = (hourly: WeatherHourlyData[]) => {
  return Array.from(new Set(hourly.map(({ time }) => getDateOnly(time))));
};

export function filterOutPassedHoursForCurrentDay(
  data: WeatherHourlyData[],
  dayIndex: number
) {
  const now = new Date();
  return dayIndex === 0 ? data.filter(({ time }) => time > now) : data;
}
export function getDataForDisplay({
  time,
  temp,
  weatherCode,
}: WeatherHourlyData) {
  return {
    time: time.toLocaleTimeString("en-US", {
      hour12: true,
      hour: "2-digit",
    }),
    temp: `${temp?.toFixed()}`,
    icon: weatherIcons.get(weatherCode!, time),
  };
}

export const resetHourlyContainerHeight = ({
  dailyReady,
  articleRef,
  headerRef,
  holderRef,
}: {
  dailyReady: boolean;
  articleRef: RefObject<HTMLElement | null>;
  headerRef: RefObject<HTMLElement | null>;
  holderRef: RefObject<HTMLElement | null>;
}) => {
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
