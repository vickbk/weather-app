import icon from "@images/logo.svg";
import Image from "next/image";
import UnitSelector from "./UnitSelector";
import SearchForm from "./SearchForm";
import { LoadingStatus } from "@/lib/types/loading-status";
import ErrorElement from "../error/ErrorElement";
import getDayTimeSlot from "@/lib/date/get-day-time-slot";
import { SearchTriggers } from "@/lib/types/search-types";

export default function AppHeader({
  status,
  triggers,
}: {
  status: LoadingStatus;
  triggers: SearchTriggers;
}) {
  const timeSlots = {
    day: "today",
    morning: "this morning",
    evening: "this evening",
    night: "tonight",
    getTitle() {
      return `How's the sky looking ${this?.[getDayTimeSlot()]}?`;
    },
  };
  return (
    <header className="header">
      <section className="header__top flex space-between center">
        <Image
          src={icon}
          height={30}
          alt="icon image"
          className="header__top-image"
        />
        <UnitSelector />
      </section>
      {status !== "error" ? (
        <>
          <h1 className="header__title pbl-1">{timeSlots.getTitle()}</h1>
          <SearchForm triggers={triggers} />
        </>
      ) : (
        <ErrorElement />
      )}
    </header>
  );
}
