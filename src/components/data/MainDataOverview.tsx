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
    <article className="main__data-overview pb-2 pi-1 br-1">
      <div className="overview-heading mb-2">
        <h2 className="overview-heading-town smb-3">{city}</h2>
        <time
          dateTime={`${date.getFullYear()}-${date.getMonth()}-${date.getUTCDate()}`}
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
      <div className="overview-temp flex center space-between">
        <Image src={image} alt={desc} width={100} />
        {temp}°
      </div>
    </article>
  );
}
