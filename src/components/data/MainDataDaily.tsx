import Image from "next/image";
import { LoadingStatus } from "@/lib/types/loading-status";
import { Skeleton } from "@progress/kendo-react-indicators";
import { WeatherData } from "@/lib/types/weather-data";
import { startTransition, useActionState, useEffect, useState } from "react";
import loadLocationData from "@/actions/loadLocationData";
import getDateOnly from "@/lib/date/get-date-only";
import getNextDay from "@/lib/date/get-next-day";
import processDailyData from "@/actions/processDailyData";
import { DailyDataType } from "@/lib/types/daily-data-type";

export default function MainDataDaily({
  status,
  data: weatherData,
}: {
  status: LoadingStatus;
  data?: WeatherData;
}) {
  const [dailyData, loadDaily, loadingState] = useActionState(
    loadLocationData,
    null
  );
  const [data, setData] = useState<null[] | DailyDataType[]>(
    Array(7).fill(null)
  );

  useEffect(() => {
    const { lat: latitude, lon: longitude } = weatherData ?? {};

    if (status === "ready" && latitude && longitude)
      startTransition(() =>
        loadDaily({
          latitude,
          longitude,
          start_date: getDateOnly(getNextDay()),
          end_date: getDateOnly(getNextDay(undefined, 7)),
        })
      );
  }, [status]);

  useEffect(() => {
    if (!loadingState && dailyData) {
      if ("error" in dailyData) {
        console.log(dailyData.error);
        return;
      }

      setData(processDailyData(dailyData));
    }
  }, [dailyData, loadingState]);

  return (
    <section className="main__data-daily">
      <h4 className="daily-heading mb-1">Daily Forecast</h4>
      <div className="daily-days grid gc-3 gc-sm-up-4 gc-md-up-7 g-1">
        {status === "loading" || !data[0]
          ? data.map((_, key) => (
              <Skeleton
                key={key}
                className="pbl-7 br-2"
                animation={{ type: "wave" }}
              />
            ))
          : (data as DailyDataType[]).map(
              ({ day, highest, lowest, icon: { image, desc } }) => (
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
