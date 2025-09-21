import Image from "next/image";

export default function DataPerHour({
  icon: { image, desc },
  time,
  temp,
}: {
  icon: { image: any; desc: string };
  time: string;
  temp: string;
}) {
  return (
    <section className="hourly__data sp-5 pi-1 flex sg-5 center br-1 neutral-600">
      <Image src={image} alt={desc} height={40} />
      <p className="hourly__data-time">{time}</p>
      <p className="mis-auto">{temp}°</p>
    </section>
  );
}
