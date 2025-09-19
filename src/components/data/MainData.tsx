import MainDataDaily from "./MainDataDaily";
import MainDataDetails from "./MainDataDetails";
import MainDataOverview from "./MainDataOverview";
import image from "@images/icon-sunny.webp";

export default function MainData() {
  return (
    <section className="data__main grid g-2">
      <MainDataOverview
        icon={{ image, desc: "sunny day" }}
        city="Berlin, Germany"
        temp="68"
        date={new Date("2025-8-5")}
      />
      <MainDataDetails />
      <MainDataDaily />
    </section>
  );
}
