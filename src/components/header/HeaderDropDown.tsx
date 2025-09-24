import kendoButtonResetterObject from "@/lib/kendoreact/buttonResetterObject";
import { UnstyledContext } from "@progress/kendo-react-common";
import { Label } from "@progress/kendo-react-labels";
import { useState } from "react";
import checkIcon from "@images/icon-checkmark.svg";
import Image from "next/image";

const CheckComponent = () => <Image src={checkIcon} alt="" />;

export default function HeaderDropDown() {
  const data = [
    { title: "Temperature", values: ["Celsius (C)", "Fahrenheit (F)"] },
    { title: "Wind Speed", values: ["km/h", "mph"] },
    { title: "Precipitation", values: ["millimeters (mm)", "inches (in)"] },
  ];
  const [isImperial, setImperial] = useState(false);
  return (
    <>
      <UnstyledContext.Provider value={{ ...kendoButtonResetterObject }}>
        <button
          type="button"
          onClick={() => setImperial(!isImperial)}
          className="no-border sp-5"
        >
          Switch to Imperial
        </button>
      </UnstyledContext.Provider>
      {data.map(({ title, values }, index) => (
        <div key={index} className="pop-up-header-container grid">
          <p className="sp-5 title">{title}</p>
          {values &&
            values.map((value, idx) => (
              <Label
                key={idx}
                className={`flex space-between sp-5 sbr-5 a-center${
                  ((isImperial && idx) || (!isImperial && !idx)) && " active"
                }`}
              >
                {value}
                {((isImperial && idx) || (!isImperial && !idx)) && (
                  <CheckComponent />
                )}
              </Label>
            ))}
        </div>
      ))}
    </>
  );
}
