import Image from "next/image";
import { LoadingStatus } from "@/lib/types/loading-status";
import { Skeleton } from "@progress/kendo-react-indicators";
import { WeatherData } from "@/lib/types/weather-data";
import { useEffect } from "react";
import processDailyData from "@/actions/processDailyData";
import { DailyDataType } from "@/lib/types/daily-data-type";

export default function MainDataDaily({
  status,
  data: weatherData,
  setDailyReady,
}: {
  status: LoadingStatus;
  data?: WeatherData;
  setDailyReady: (ready: boolean) => void;
}) {
  const data =
    status === "ready" && weatherData
      ? processDailyData([weatherData])
      : Array(7).fill(null);
  useEffect(() => {
    setDailyReady(status === "ready");
  }, [status]);
  return (
    <section className="main__data-daily">
      <h4 className="daily-heading mb-1">Daily Forecast</h4>
      <div className="daily-days grid gc-3 sm-up-gc-4 md-up-gc-7 g-1">
        {status === "loading" || !data[0]
          ? data.map((_, key) => (
              <Skeleton
                key={key}
                className="pbl-7 br-2"
                animation={{ type: "wave" }}
                style={{ background: "hsl(243, 23%, 30%)" }}
              />
            ))
          : (data as DailyDataType[]).map(
              ({ day, highest, lowest, icon: { image, desc } }, key) => (
                <article
                  key={key}
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
