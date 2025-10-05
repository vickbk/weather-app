import Image from "next/image";
import sunriseIcon from "@images/sunrise-1.png";
import sunsetIcon from "@images/sunset-1.png";

export default function DayTimeElement({
  daily: { sunrise, sunset },
}: {
  daily: { sunrise?: Date; sunset?: Date };
}) {
  return (
    <article className="details-element grid-full-width p-1 neutral-700 br-1">
      <section className="flex space-between flex-wrap">
        {(
          [
            [sunrise, sunriseIcon, "Sunrise"],
            [sunset, sunsetIcon, "Sunset"],
          ] as const
        ).map(([time, icon, title], key) => (
          <article className="grid sm-up-flex sg-5 pbl-1 a-center" key={key}>
            <Image src={icon} height={50} alt={`${title} Image`} />
            <div>
              <h3 className="details-element-title">{title}</h3>
              <p className="details-element-content spbls-3">
                {time
                  ? time.toLocaleTimeString("en-US", {
                      hour12: true,
                      hour: "2-digit",
                      minute: "2-digit",
                    })
                  : "-"}
              </p>
            </div>
          </article>
        ))}
      </section>
    </article>
  );
}
