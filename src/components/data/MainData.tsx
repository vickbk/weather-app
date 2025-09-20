import { LoadingStatus } from "@/lib/types/loading-status";
import MainDataDaily from "./MainDataDaily";
import MainDataDetails from "./MainDataDetails";
import MainDataOverview from "./MainDataOverview";
import image from "@images/icon-sunny.webp";
import getDateOnly from "@/lib/date/get-date-only";

export default function MainData({ status }: { status: LoadingStatus }) {
  return (
    <section className="data__main grid g-2">
      <MainDataOverview
        icon={{ image, desc: "sunny day" }}
        city="Berlin, Germany"
        temp="68"
        date={new Date(getDateOnly())}
        status={status}
      />
      <MainDataDetails status={status} />
      <MainDataDaily status={status} />
    </section>
  );
}
