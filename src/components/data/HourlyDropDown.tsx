import kendoButtonResetterObject from "@/lib/kendoreact/buttonResetterObject";
import { Button } from "@progress/kendo-react-buttons";
import { UnstyledContext } from "@progress/kendo-react-common";

export default function HourlyDropDown({
  daySetter: [active, setDay],
  days,
  closer,
}: {
  daySetter: [selected: number, (day: number) => void];
  days: string[];
  closer: () => void;
}) {
  return (
    <>
      {days.map((day, key) => (
        <UnstyledContext.Provider
          key={key}
          value={{ ...kendoButtonResetterObject }}
        >
          <Button
            className={`flex space-between sp-5 sbr-5 a-center no-border ${
              active === key && " active"
            }`}
            onClick={() => {
              setDay(key);
              closer();
            }}
          >
            {day}
          </Button>
        </UnstyledContext.Provider>
      ))}
    </>
  );
}
