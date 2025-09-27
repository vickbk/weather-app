import checkIcon from "@images/icon-checkmark.svg";
import Image from "next/image";
import {
  UnitHandlersType,
  UnitKeys,
  UnitsType,
  UnitValues,
} from "@/lib/types/units-types";

const CheckComponent = () => <Image src={checkIcon} alt="" />;

export default function HeaderDropDown({
  unitHandlers: { setMetric, setType },
  units: { type, ...unitValues },
  closer,
}: {
  unitHandlers: UnitHandlersType;
  units: UnitsType;
  closer: () => void;
}) {
  const data = [
    {
      title: "Temperature",
      values: ["Celsius (°C)", "Fahrenheit (°F)"],
      key: "temperature",
    },
    { title: "Wind Speed", values: ["km/h", "mph"], key: "windSpeed" },
    {
      title: "Precipitation",
      values: ["millimeters (mm)", "inches (in)"],
      key: "precipitation",
    },
  ] as const;
  // default to metric (true = metric, false = imperial)
  const units: Record<UnitKeys, UnitValues[]> = {
    temperature: ["°C", "°F"],
    windSpeed: ["km/h", "mph"],
    precipitation: ["mm", "in"],
  };

  return (
    <>
      <button
        type="button"
        onClick={() => {
          setType();
          closer();
        }}
        className="no-border pop-up-main sp-5 sbr-5"
      >
        Switch to {type === "imperial" ? "Metric" : "Imperial"}
      </button>
      {data.map(({ title, values, key }, index) => (
        <div key={index} className="pop-up-header-container grid">
          <p className="sp-5 title">{title}</p>
          {values &&
            values.map((value, idx) => (
              <button
                key={idx}
                className={`flex space-between sp-5 sbr-5 no-border a-center${
                  units[key].indexOf(unitValues[key]) === idx && " active"
                }`}
                onClick={() => {
                  setMetric(key, units[key][idx]);
                }}
              >
                {value}
                {units[key].indexOf(unitValues[key]) === idx && (
                  <CheckComponent />
                )}
              </button>
            ))}
        </div>
      ))}
    </>
  );
}
