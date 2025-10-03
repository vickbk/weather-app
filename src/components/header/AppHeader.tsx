import SearchForm from "./SearchForm";
import { LoadingStatus } from "@/lib/types/loading-status";
import ErrorElement from "../error/ErrorElement";
import getDayTimeSlot from "@/lib/date/get-day-time-slot";
import { SearchTriggers } from "@/lib/types/search-types";
import { UnitsType } from "@/lib/types/units-types";
import TopHeader from "./TopHeader";

export default function AppHeader({
  status,
  triggers,
  units,
  type = "default",
}: {
  status: LoadingStatus;
  triggers: SearchTriggers;
  units: UnitsType;
  type?: "compare" | "default";
}) {
  const timeSlots = {
    day: "today",
    morning: "this morning",
    evening: "this evening",
    night: "tonight",
    compare: "there",
    getTitle() {
      return `How's the sky looking ${
        type === "compare" ? this.compare : this?.[getDayTimeSlot()]
      }?`;
    },
  };

  return (
    <header className="header">
      <TopHeader units={units} unitHandlers={triggers.unitHandlers} />
      {status !== "error" ? (
        <>
          <h1 className="header__title pbl-1 lg-up-pi-1 xl-up-pi-2">
            {timeSlots.getTitle()}
          </h1>
          <SearchForm triggers={triggers} units={units} />
        </>
      ) : (
        <ErrorElement />
      )}
    </header>
  );
}
