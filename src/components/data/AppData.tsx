import HourlyData from "./HourlyData";
import MainData from "./MainData";

export default function AppData() {
  return (
    <section className="data grid g-2 mt-3">
      <MainData />
      <HourlyData />
    </section>
  );
}
