import icon from "@images/logo.svg";
import Image from "next/image";
import UnitSelector from "./UnitSelector";
import SearchForm from "./SearchForm";
import { LoadingStatus } from "@/lib/types/loading-status";
import ErrorElement from "../error/ErrorElement";

export default function AppHeader({ status }: { status: LoadingStatus }) {
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
          <h1 className="header__title pbl-1">How's the sky looking today?</h1>
          <SearchForm />
        </>
      ) : (
        <ErrorElement />
      )}
    </header>
  );
}
