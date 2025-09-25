import kendoButtonResetterObject from "@/lib/kendoreact/buttonResetterObject";
import { UnstyledContext } from "@progress/kendo-react-common";
import { useState } from "react";
import checkIcon from "@images/icon-checkmark.svg";
import Image from "next/image";

const CheckComponent = () => <Image src={checkIcon} alt="" />;

export default function HeaderDropDown() {
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
  const [isImperial, setImperial] = useState(false);
  // default to metric (true = metric, false = imperial)
  const [units, setUnits] = useState({
    temperature: true,
    windSpeed: true,
    precipitation: true,
  });
  type unitKeys = keyof typeof units;
  const updateUnits = (type: unitKeys) => {
    setUnits({ ...units, [type]: !units[type] });
  };
  const switchImperial = () => {
    setUnits({
      temperature: !isImperial,
      windSpeed: !isImperial,
      precipitation: !isImperial,
    });
    setImperial(!isImperial);
  };

  return (
    <>
      <UnstyledContext.Provider value={{ ...kendoButtonResetterObject }}>
        <button
          type="button"
          onClick={switchImperial}
          className="no-border sp-5"
        >
          Switch to {!isImperial ? "Metric" : "Imperial"}
        </button>
        {data.map(({ title, values, key }, index) => (
          <div key={index} className="pop-up-header-container grid">
            <p className="sp-5 title">{title}</p>
            {values &&
              values.map((value, idx) => (
                <button
                  key={idx}
                  className={`flex space-between sp-5 sbr-5 no-border a-center${
                    ((units[key] && !idx) || (!units[key] && !!idx)) &&
                    " active"
                  }`}
                  onClick={() => updateUnits(key)}
                >
                  {value}
                  {((units[key] && !idx) || (!units[key] && !!idx)) && (
                    <CheckComponent />
                  )}
                </button>
              ))}
          </div>
        ))}
      </UnstyledContext.Provider>
    </>
  );
}
