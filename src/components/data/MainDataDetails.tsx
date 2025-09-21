import { LoadingStatus } from "@/lib/types/loading-status";
import { WeatherHourlyData } from "@/lib/types/weather-data";

export default function MainDataDetails({
  status,
  data: weatherData,
}: {
  status: LoadingStatus;
  data?: WeatherHourlyData;
}) {
  const data =
    status === "loading"
      ? [
          ["Feels Like", "-"],
          ["Humidity", "-"],
          ["Wind", "-"],
          ["Precipitation", "-"],
        ]
      : [
          ["Feels Like", "18"],
          ["Humidity", "46%"],
          ["Wind", "14km/h"],
          ["Precipitation", "0 mm"],
        ];
  return (
    <section className="data__details grid gc-2 gc-sm-up-4 g-1">
      {data.map(([title, content]: string[]) => (
        <article className="details-element neutral-700 p-1 br-1" key={title}>
          <h3 className="details-element-title">{title}</h3>
          <p className="details-element-content smt-5">{content}</p>
        </article>
      ))}
    </section>
  );
}
