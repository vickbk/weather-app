import HourlyData from "./HourlyData";
import MainData from "./MainData";

export default function AppData() {
  return (
    <section className="data">
      <MainData />
      <HourlyData />
    </section>
  );
}
