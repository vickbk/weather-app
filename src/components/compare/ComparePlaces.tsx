import { LoadingStatus } from "@/lib/types/loading-status";
import { WeatherData } from "@/lib/types/weather-data";
import HourlyData from "../data/HourlyData";
import { Skeleton } from "@progress/kendo-react-indicators";
import { removeFromLastCompare } from "@/lib/memorization/compare-request";
import { PlaceDisplay } from "@/lib/types/places-types";
import { useState } from "react";
import DayTimeElement from "../common/DayTimeElement";

export default function ComparePlaces({
  places,
  setPlaces,
  status,
}: {
  places?:
    | WeatherData[]
    | { placeName: PlaceDisplay; hourly: undefined; daily: undefined }[];
  setPlaces: (places: WeatherData[]) => void;
  status: LoadingStatus;
}) {
  places =
    places ||
    Array(3)
      .fill(null)
      .map(() => ({ placeName: "a, b", hourly: undefined, daily: undefined }));
  const deleteItem = (selected: PlaceDisplay) => {
    setPlaces(
      (places as WeatherData[]).filter(
        ({ placeName }) => placeName !== selected
      )
    );
    removeFromLastCompare(selected);
  };
  const [dayExternalIndex, onDayIndexChange] = useState(0);
  return (
    <section className="pbl-3 grid gc-1 md-up-gc-2 lg-up-gc-3 g-2">
      {places.map(({ placeName, hourly, daily }, key) => (
        <section
          key={key}
          className="neutral-700 br-1 flex-column space-between"
        >
          {status === "loading" ? (
            <Skeleton
              shape="rectangle"
              animation={{ type: "wave" }}
              style={{ background: "hsl(243, 23%, 30%)" }}
              className="p-2 m-1"
            />
          ) : (
            <h2 className="sp-5 flex flex-grow sg-5 space-between a-center">
              {placeName}{" "}
              {status === "ready" && (
                <button
                  className="orange-500 hv-out-orange-500 hv-b-neutral-700 no-border sbr-5 spbl-2 spi-5"
                  onClick={() => deleteItem(placeName)}
                >
                  Remove
                </button>
              )}
            </h2>
          )}

          <HourlyData
            status={status}
            hourly={hourly}
            dayExternalIndex={dayExternalIndex}
            onDayIndexChange={onDayIndexChange}
            externalChanges={{ dailyReady: true, showMore: true }}
          />
          <DayTimeElement
            daily={{
              sunrise: daily?.sunrise?.[dayExternalIndex],
              sunset: daily?.sunset?.[dayExternalIndex],
            }}
          />
        </section>
      ))}
    </section>
  );
}
