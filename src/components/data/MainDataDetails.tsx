import { LoadingStatus } from "@/lib/types/loading-status";
import { UnitsType } from "@/lib/types/units-types";
import { WeatherHourlyData } from "@/lib/types/weather-data";
import { useState } from "react";

export default function MainDataDetails({
  status,
  data: weatherData,
  units: { windSpeed, precipitation: precipitationUnit },
}: {
  status: LoadingStatus;
  units: UnitsType;
  data?: WeatherHourlyData;
}) {
  const [showMore, setShowMore] = useState(false);
  const { precipitation, humidity, wind, ambientTemp } = weatherData ?? {};
  const data =
    status === "loading"
      ? [
          ["Feels Like", "-"],
          ["Humidity", "-"],
          ["Wind", "-"],
          ["Precipitation", "-"],
        ]
      : [
          ["Feels Like", `${ambientTemp?.toFixed()}°`],
          ["Humidity", `${humidity?.toFixed()}%`],
          ["Wind", `${wind?.toFixed()}${windSpeed}`],
          ["Precipitation", `${precipitation?.toFixed()}${precipitationUnit}`],
          ...(showMore
            ? [
                ["Feels Like", `${ambientTemp?.toFixed()}°`],
                ["Humidity", `${humidity?.toFixed()}%`],
                ["Wind", `${wind?.toFixed()}${windSpeed}`],
                [
                  "Precipitation",
                  `${precipitation?.toFixed()}${precipitationUnit}`,
                ],
              ]
            : []),
        ];
  return (
    <section className="data__details grid gc-2 sm-up-gc-4 g-1">
      {data.map(([title, content]: string[]) => (
        <article className="details-element neutral-700 p-1 br-1" key={title}>
          <h3 className="details-element-title">{title}</h3>
          <p className="details-element-content smt-5">{content}</p>
        </article>
      ))}
      <div className="grid-full-width flex a-center g-1">
        <span className="flex-grow sp-1 neutral-700"></span>
        <button
          type="button"
          onClick={() => setShowMore(!showMore)}
          className="sp-5 neutral-700 no-border sbr-5"
        >
          Show {showMore ? "less" : "more"}
        </button>
        <span className="flex-grow sp-1 neutral-700"></span>
      </div>
    </section>
  );
}
