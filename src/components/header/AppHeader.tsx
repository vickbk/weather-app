import icon from "@images/logo.svg";
import Image from "next/image";
import UnitSelector from "./UnitSelector";
import SearchForm from "./SearchForm";

export default function AppHeader() {
  return (
    <header className="header">
      <section className="header__top">
        <Image src={icon} alt="icon image" width={50} height={200} />
        <UnitSelector />
      </section>
      <h1 className="header__title">How's the sky looking today?</h1>
      <SearchForm />
    </header>
  );
}
