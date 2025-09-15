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
    <section className="hourly__data">
      <Image src={image} alt={desc} />
      <p>{time}</p>
      <p>{temp}</p>
    </section>
  );
}
