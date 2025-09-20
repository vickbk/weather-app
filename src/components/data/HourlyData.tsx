import partlyCloudy from "@images/icon-partly-cloudy.webp";
import Dropdown from "../common/Dropdown";
import DataPerHour from "./DataPerHour";
import { LoadingStatus } from "@/lib/types/loading-status";
import { Skeleton } from "@progress/kendo-react-indicators";

export default function HourlyData({ status }: { status: LoadingStatus }) {
  const data =
    status === "loading"
      ? Array(8).fill({})
      : [
          {
            icon: { image: partlyCloudy, desc: "Partly cloudy" },
            time: "3 AM",
            temp: "25",
          },
        ];
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
        {data.map(({ temp, time, icon }, index) =>
          status === "loading" ? (
            <Skeleton
              key={index}
              shape="rectangle"
              className="hourly__loader p-2 mbls-1 br-1"
              animation={{ type: "wave" }}
            />
          ) : (
            <DataPerHour key={icon.desc} temp={temp} time={time} icon={icon} />
          )
        )}
      </section>
    </article>
  );
}
