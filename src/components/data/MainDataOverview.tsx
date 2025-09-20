import getDateOnly from "@/lib/date/get-date-only";
import Image from "next/image";

export default function MainDataOverview({
  city,
  date,
  icon: { image, desc },
  temp,
}: {
  city: `${string}, ${string}`;
  date: Date;
  icon: { image: any; desc: string };
  temp: string;
}) {
  return (
    <article className="main__data-overview pbl-2 pi-1 br-1 sm-up-flex space-between sm-up-pbl-5 a-center">
      <div className="overview-heading">
        <h2 className="overview-heading-town">{city}</h2>
        <time
          dateTime={`${getDateOnly(date)}`}
          className="overview-heading-date"
        >
          {date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "2-digit",
            weekday: "long",
          })}
        </time>
      </div>
      <div className="overview-temp flex sm-up-sg-3 center space-between">
        <Image src={image} alt={desc} width={100} />
        {temp}°
      </div>
    </article>
  );
}
