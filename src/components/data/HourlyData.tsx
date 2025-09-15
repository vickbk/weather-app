import partlyCloudy from "@images/icon-partly-cloudy.webp";
import Dropdown from "../common/Dropdown";
import DataPerHour from "./DataPerHour";

export default function HourlyData() {
  return (
    <article className="data__hourly">
      <section className="hourly__data">
        <p>Hourly forecast</p>
        <Dropdown text="The day" />
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
