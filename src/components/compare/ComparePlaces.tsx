import { LoadingStatus } from "@/lib/types/loading-status";
import { WeatherData } from "@/lib/types/weather-data";
import HourlyData from "../data/HourlyData";
import { Skeleton } from "@progress/kendo-react-indicators";
import { removeFromLastCompare } from "@/lib/memorization/compare-request";
import { PlaceDisplay } from "@/lib/types/places-types";
import { useState } from "react";
import DayTimeElement from "../common/DayTimeElement";
import { SvgIcon } from "@progress/kendo-react-common";
import { xIcon } from "@progress/kendo-svg-icons";

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
    <section className="compare pbl-3 grid gc-1 md-up-gc-2 lg-up-gc-3 g-2">
      {places.map(({ placeName, hourly, daily }, key) => (
        <section key={key} className="neutral-700 br-1 flex-column">
          {status === "loading" ? (
            <Skeleton
              shape="rectangle"
              animation={{ type: "wave" }}
              style={{ background: "hsl(243, 23%, 30%)" }}
              className="p-2 m-1"
            />
          ) : (
            <h2 className="compare__title sp-5 smbls-5 flex sg-5 space-between a-center">
              <span className="compare__title-text">{placeName}</span>{" "}
              {status === "ready" && (
                <button
                  className="neutral-700 hv-out-orange-500 a-out-orange-500 no-border br-5 sp-2 spi-4"
                  onClick={() => deleteItem(placeName)}
                >
                  <SvgIcon
                    icon={xIcon}
                    color="hsl(28, 100%, 52%)"
                    size={"xlarge"}
                  />
                </button>
              )}
            </h2>
          )}

          <HourlyData
            status={status}
            hourly={hourly}
            dayExternalIndex={dayExternalIndex}
            onDayIndexChange={onDayIndexChange}
          />
          <div className="mbls-auto"></div>
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
