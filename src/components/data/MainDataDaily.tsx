import Image from "next/image";
import iconRain from "@images/icon-rain.webp";
import { LoadingStatus } from "@/lib/types/loading-status";
import { Skeleton } from "@progress/kendo-react-indicators";

export default function MainDataDaily({ status }: { status: LoadingStatus }) {
  const data =
    status === "loading"
      ? Array(7).fill(null)
      : [
          {
            day: "Tue",
            highest: "20",
            lowest: "14",
            icon: { desc: "", image: iconRain },
          },
        ];
  return (
    <section className="main__data-daily">
      <h4 className="daily-heading mb-1">Daily Forecast</h4>
      <div className="daily-days grid gc-3 gc-sm-up-4 gc-md-up-7 g-1">
        {status === "loading"
          ? data.map(() => (
              <Skeleton className="pbl-7 br-2" animation={{ type: "wave" }} />
            ))
          : data.map(
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
                <article
                  key={day}
                  className="days-day text-center neutral-700 p-1 br-1"
                >
                  <h5 className="day-title">{day}</h5>
                  <Image src={image} alt={desc} height={60} className="mbl-1" />
                  <p className="day-footer flex space-between">
                    <span>{highest}°</span>
                    <span>{lowest}°</span>
                  </p>
                </article>
              )
            )}
      </div>
    </section>
  );
}
