import { LoadingStatus } from "@/lib/types/loading-status";
import { UnitsType } from "@/lib/types/units-types";
import { WeatherHourlyData } from "@/lib/types/weather-data";
import DayTimeElement from "../common/DayTimeElement";
import MoreTrigger from "./data-details/MoreTriggrer";
import { getDataDetails } from "@/lib/open-meteo/data-details";
import DetailElement from "./data-details/DetailElement";

export default function MainDataDetails({
  status,
  data: weatherData,
  units,
  daily,
  moreHandlers: [showMore, setShowMore],
}: {
  status: LoadingStatus;
  units: UnitsType;
  daily: { sunrise?: Date; sunset?: Date };
  data?: WeatherHourlyData;
  moreHandlers: [boolean, (showMore: boolean) => void];
}) {
  const data = getDataDetails({ showMore, data: weatherData, status, units });

  return (
    <section className="data__details grid gc-2 sm-up-gc-4 g-1">
      {data.map(([title, content]: string[]) => (
        <DetailElement title={title} content={content} key={title} />
      ))}
      {showMore && <DayTimeElement daily={daily} />}
      {status !== "loading" && (
        <MoreTrigger showMore={showMore} setShowMore={setShowMore} />
      )}
    </section>
  );
}
