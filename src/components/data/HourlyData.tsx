import partlyCloudy from "@images/icon-partly-cloudy.webp";
import Dropdown from "../common/Dropdown";
import DataPerHour from "./DataPerHour";

export default function HourlyData() {
  return (
    <article className="data__hourly neutral-700 br-1 p-1">
      <section className="hourly">
        <div className="flex space-between center">
          <h4 className="hourly__title">Hourly forecast</h4>
          <Dropdown specialClass="neutral-600" text="The day" />
        </div>
        {[
          {
            icon: { image: partlyCloudy, desc: "Partly cloudy" },
            time: "3 AM",
            temp: "25",
          },
        ].map(({ temp, time, icon }) => (
          <DataPerHour key={icon.desc} temp={temp} time={time} icon={icon} />
        ))}
      </section>
    </article>
  );
}
