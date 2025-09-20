import { LoadingStatus } from "@/lib/types/loading-status";
import HourlyData from "./HourlyData";
import MainData from "./MainData";

export default function AppData({ status }: { status: LoadingStatus }) {
  return (
    <section className="data grid g-2 mt-3">
      <MainData status={status} />
      <HourlyData status={status} />
    </section>
  );
}
