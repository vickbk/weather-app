import kendoButtonResetterObject from "@/lib/kendoreact/buttonResetterObject";
import { Button } from "@progress/kendo-react-buttons";
import { UnstyledContext } from "@progress/kendo-react-common";
import { useState } from "react";

export default function HourlyDropDown({
  setDay,
}: {
  setDay: (day: string) => void;
}) {
  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  const [active, setActive] = useState(-1); // Just to avoid errors
  return (
    <>
      {days.map((day, key) => (
        <UnstyledContext.Provider value={{ ...kendoButtonResetterObject }}>
          <Button
            key={key}
            className={`flex space-between sp-5 sbr-5 a-center no-border ${
              active === key && " active"
            }`}
            onClick={() => {
              setActive(key);
              setDay(day);
            }}
          >
            {day}
          </Button>
        </UnstyledContext.Provider>
      ))}
    </>
  );
}
