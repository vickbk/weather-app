import Image from "next/image";
import iconRain from "@images/icon-rain.webp";

export default function MainDataDaily() {
  return (
    <section className="main__data-daily">
      <h4 className="daily-heading">Daily Forecast</h4>
      <div className="daily-days">
        {[
          {
            day: "Tue",
            highest: "20",
            lowest: "14",
            icon: { desc: "", image: iconRain },
          },
        ].map(
          ({
            day,
            highest,
            lowest,
            icon: { image, desc },
          }: {
            day: string;
            icon: { image: any; desc: string };
            highest: string;
            lowest: string;
          }) => (
            <article key={day} className="days-day">
              <h5 className="day-title">{day}</h5>
              <Image src={image} alt={desc} />
              <p className="day-footer">
                <span>{highest}</span>
                <span>{lowest}</span>
              </p>
            </article>
          )
        )}
      </div>
    </section>
  );
}
