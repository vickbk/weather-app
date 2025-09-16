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
    <article className="main__data-overview">
      <div>
        <h2 className="overview-town">{city}</h2>
        <time
          dateTime={`${date.getFullYear()}-${date.getMonth()}-${date.getUTCDate()}`}
          className="overview-date"
        >
          {date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "2-digit",
            weekday: "long",
          })}
        </time>
      </div>
      <Image src={image} alt={desc} />
    </article>
  );
}
