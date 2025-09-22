import Dropdown from "../common/Dropdown";
import DataPerHour from "./DataPerHour";
import { LoadingStatus } from "@/lib/types/loading-status";
import { Skeleton } from "@progress/kendo-react-indicators";
import { WeatherHourlyData } from "@/lib/types/weather-data";
import weatherIcons from "../common/WeatherIcons";

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

  return (
    <article className="data__hourly neutral-700 br-1 p-1">
      <section className="hourly">
        <div className="flex space-between center">
          <h4 className="hourly__title">Hourly forecast</h4>
          <Dropdown
            specialClass="neutral-600"
            text={status !== "loading" ? "The day" : " - "}
          />
        </div>
        <div className="hourly__data-holder grid mbls-1 g-1">
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
        </div>
      </section>
    </article>
  );
}
