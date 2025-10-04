import { WeatherHourlyData } from "@/lib/types/weather-data";
import DetailElement from "../data-details/DetailElement";
import { getDataDetails } from "@/lib/open-meteo/data-details";
import { useEffect, useState } from "react";
import { getUnits } from "@/lib/memorization/units";

export default function HourlyDetails({ data }: { data: WeatherHourlyData }) {
  const [details, setDetails] = useState([["", ""]]);
  useEffect(() => {
    setDetails(
      getDataDetails({
        showMore: true,
        data,
        units: getUnits(),
        status: "ready",
      })
    );
  }, []);
  return (
    <section className="flex-grow grid sg-5 gc-2">
      {details.map(([title, content]) => (
        <DetailElement title={title} content={content} />
      ))}
    </section>
  );
}
