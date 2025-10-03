import Image from "next/image";
import sunriseIcon from "@images/sunrise-1.png";
import sunsetIcon from "@images/sunset-1.png";

export default function DayTimeElement() {
  return (
    <article className="details-element grid-full-width p-1 neutral-700 br-1">
      <section className="flex space-between">
        <article className="grid sm-up-flex sg-5 pbl-1 a-center">
          <Image src={sunriseIcon} height={50} alt="Sunrise Image" />
          <div>
            <h3 className="details-element-title">Sunrise</h3>
            <p className="details-element-content spbls-3">5:32AM</p>
          </div>
        </article>
        <article className="grid sm-up-flex sg-5 pbl-1 a-center">
          <Image src={sunsetIcon} height={50} alt="Sunset Image" />
          <div>
            <h3 className="details-element-title">Sunset</h3>
            <p className="details-element-content spbls-3">5:32PM</p>
          </div>
        </article>
      </section>
    </article>
  );
}
